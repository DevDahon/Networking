import {reserveSimulationSpace} from '../components/simulationSpace.js';
import {esc,button,input,select,result,wire,read,networkSVG} from '../components/ui.js';
import {DHCP,classify,subnet} from '../utils/network.js';
import {faults,diagnosticState,diagnose} from './models.js';
import {createPlayback,playbackBar,syncPlaybackRow} from './playback.js';

export function dhcp(root){
 let server=new DHCP(),stage=-1,client='PC 1',offered='',log='Ready. A lease is committed only at Acknowledgment.',history=[];
 let values={start:'192.168.1.100',end:'192.168.1.102',gateway:'192.168.1.1',dns:'192.168.1.1'};
 const playback=createPlayback({advance,render:draw});

 const doraSteps = [
  {name:'Discover',direction:'Client -> Broadcast (255.255.255.255:67)',src:'0.0.0.0:68',dst:'255.255.255.255:67',msg:'DHCPDISCOVER',desc:'Client has no IP configuration yet. It broadcasts looking for any available DHCP server on the local subnet.'},
  {name:'Offer',direction:'Server -> Client / Broadcast (255.255.255.255:68)',src:'192.168.1.1:67',dst:'255.255.255.255:68',msg:'DHCPOFFER',desc:'DHCP server reserves an unassigned IP from its pool and proposes it with subnet mask, gateway, DNS, and lease time.'},
  {name:'Request',direction:'Client -> Broadcast (255.255.255.255:67)',src:'0.0.0.0:68',dst:'255.255.255.255:67',msg:'DHCPREQUEST',desc:'Client broadcasts its formal acceptance of the offered address so all listening DHCP servers know which offer won.'},
  {name:'ACK',direction:'Server -> Client (Unicast / Broadcast)',src:'192.168.1.1:67',dst:'192.168.1.100:68',msg:'DHCPACK',desc:'Server commits the binding to its lease database and officially authorizes the client to use the parameters.'}
 ];

 function advance(){
  history.push({stage,offered,log,leases:JSON.parse(JSON.stringify(server.leases))});
  try{
   if(stage===3){stage=-1;history=[];}
   if(!server.online)throw new Error('No DHCP server response. No new lease can be acquired; the client may eventually use link-local configuration.');
   stage++;
   if(stage===0)log=`Discover: ${client} broadcasts to locate a DHCP server.`;
   if(stage===1){offered=server.leases[client]?.ip||server.available();if(!offered){stage=-1;throw new Error('Pool exhausted: no available address to offer.');}log=`Offer: server proposes ${offered} to ${client}; it is not an active lease yet.`;}
   if(stage===2)log=`Request: ${client} requests the offered ${offered}.`;
   if(stage===3){const lease=server.request(client);log=`ACK: ${client} holds ${lease.ip} until teaching time ${lease.expires}s.`;return false;}
  }catch(e){log=e.message;return false;}
  return true;
 }

 function stopExchange(){playback.stop();history=[];stage=-1;}

 function draw(){
  const curStep = stage >= 0 ? doraSteps[stage] : null;

  root.innerHTML=`
   <details><summary>Configure the DHCP pool</summary>
    <form id="pool" class="control-row">
     ${Object.entries(values).map(([k,v])=>input(k,k,v)).join('')}
     <button type="submit">Apply pool / clear leases</button>
    </form>
   </details>

   <div class="control-row">
    ${select('Client','client',['PC 1','PC 2','PC 3','PC 4'],client)}
    ${button('Release lease','release')}
    ${button('Renew lease','renew')}
    ${button('+30 teaching seconds','time')}
    ${button(server.online?'Take server offline':'Bring server online','online')}
   </div>

   <div class="sim-workbench-grid">
    <div class="sim-visual-panel">
     ${networkSVG([client,server.online?'DHCP Server (192.168.1.1)':'Server offline','Lease Pool (192.168.1.100–102)'],stage<0?0:stage===1||stage===3?1:0,null,stage<0?100:250,{badge:curStep?`${curStep.msg} (${curStep.src.split(':')[1]}→${curStep.dst.split(':')[1]})`:'Idle (No Lease)',broadcast:stage===0||stage===2,direction:stage===1||stage===3?'reverse':stage>=0?'forward':null,fault:!server.online||/exhausted|No DHCP/i.test(log)})}

     <div class="dora">
      ${['Discover','Offer','Request','ACK'].map((s,i)=>`<span class="${i===stage?'current':''}">${i+1} · ${s}</span>`).join('')}
     </div>

     ${curStep ? `
      <div class="result-grid" style="margin:0;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));">
       <div><b>Message Type:</b><br><code style="color:var(--blue);font-weight:700;">${curStep.msg}</code></div>
       <div><b>Direction:</b><br><span style="font-size:12px;">${curStep.direction}</span></div>
       <div><b>Source & Dest Ports:</b><br><code style="font-size:12px;">${curStep.src} &rarr; ${curStep.dst}</code></div>
       <div><b>Educational Summary:</b><br><span style="font-size:12px;">${curStep.desc}</span></div>
      </div>
     ` : ''}
    </div>

    <div class="sim-details-panel">
     ${result(log,!/exhausted|No DHCP|No active|error/i.test(log))}

     <p class="small">${playback.running?'Automatic playback running':stage===3?'Exchange complete':'Playback paused'} · Clock ${server.time}s · Lease 60 teaching seconds · Mask ${subnet(server.gateway,server.prefix).mask} · Gateway ${esc(server.gateway)} · DNS ${esc(server.dns)}</p>

     <div class="table-wrap">
      <table>
       <thead>
        <tr><th>Client</th><th>Address</th><th>Remaining lease</th></tr>
       </thead>
       <tbody>
        ${Object.entries(server.leases).map(([c,l])=>`<tr><td>${c}</td><td>${l.ip}</td><td>${l.expires-server.time}s</td></tr>`).join('')||'<tr><td colspan="3">No active leases</td></tr>'}
       </tbody>
      </table>
     </div>
    </div>
   </div>

   ${playbackBar(playback)}
  `;

  // Reserve the pending lease row before playback can commit it.
  const pending=root.cloneNode(true),table=pending.querySelector('tbody');
  if(Object.keys(server.leases).length&&!server.leases[client])table.insertAdjacentHTML('beforeend','<tr><td>PC 4</td><td>192.168.1.100</td><td>60s</td></tr>');
  const feedback=pending.querySelector('.feedback');
  if(feedback)feedback.textContent=`ACK: ${client} holds 192.168.255.254 until teaching time ${server.time+60}s. The lease and address configuration are confirmed.`;
  reserveSimulationSpace(root,[root.innerHTML,pending.innerHTML]);

  syncPlaybackRow(root,playback);
  root.querySelector('[name="client"]').onchange=e=>{client=e.target.value;stopExchange();log=`${client} selected. Start a new exchange.`;draw();};
  root.querySelector('[name="speed"]').onchange=e=>playback.setSpeed(e.target.value);
  root.querySelector('#pool').onsubmit=e=>{
   e.preventDefault();
   stopExchange();
   try{
    const draft=Object.fromEntries(Object.keys(values).map(k=>[k,read(root,k)]));
    const next=new DHCP(draft.start,draft.end,draft.gateway,24,draft.dns);
    values=draft;server=next;log='Pool applied; active leases cleared.';
   }catch(e){
    log=`Configuration error: ${e.message}`;
   }
   draw();
  };

  wire(root,{
   play:()=>{if(stage<0||stage===3){stopExchange();log='Automatic DORA begins with Discover; the lease is committed at ACK.';}playback.play();},
   pause:()=>{playback.pause();draw();},
   resume:()=>{playback.play();},
   stop:()=>{stopExchange();log='Exchange stopped; active leases are preserved. Use Release or Apply pool to change them.';draw();},
   release:()=>{stopExchange();server.release(client);log=`${client} released its lease; the address is available again.`;draw();},
   renew:()=>{stopExchange();try{if(!server.leases[client])throw new Error('No active lease to renew. Start Discover.');const lease=server.request(client);log=`Request / ACK: ${client} renewed ${lease.ip} to ${lease.expires}s.`;}catch(e){log=e.message;}draw();},
   time:()=>{stopExchange();server.tick();log='Clock advanced 30 seconds; expired leases removed and pending exchange reset.';draw();},
   online:()=>{stopExchange();server.online=!server.online;log=server.online?'Server reachable again.':'Server offline. Existing leases remain valid until expiry; new requests/renewals fail.';draw();}
  });
 }
 draw();
 return ()=>playback.dispose();
}

export function router(root){
 let applied={lan:'192.168.10.1',start:'192.168.10.100',end:'192.168.10.103',ssid:'Networking-Lab',security:'WPA3-Personal',password:'Classroom-Only-2026',dhcp:'on'};
 let band = '5';
 let server=new DHCP(applied.start,applied.end,applied.lan);
 let clients=[];
 let message='Apply your settings, then connect a client.';
 let clientMode='Wired Ethernet',clientSSID=applied.ssid,clientPass='';

 const bandDetails = {
  '2.4': {title:'2.4 GHz Band',tradeoffs:'Greater range & wall penetration; lower throughput (up to 300 Mbps); crowded spectrum.'},
  '5': {title:'5 GHz Band',tradeoffs:'High throughput (up to 1.3+ Gbps); less interference; shorter range and reduced wall penetration.'},
  '6': {title:'6 GHz Band (Wi-Fi 6E)',tradeoffs:'Ultra-wide clean channels (up to 2.4+ Gbps); zero legacy device interference; short indoor range.'}
 };

 function draw(){
  root.innerHTML=`
   <div style="background:var(--bg-elevated);border:1px solid var(--border-color);border-radius:10px;padding:12px 16px;margin-bottom:14px;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between;">
    <div>
     <span style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-muted);display:block;">SOHO Gateway Status</span>
     <b style="font-size:15px;color:var(--text-primary);">Integrated Router / AP / Switch / NAT</b>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:12px;font-size:12px;">
     <span><b>WAN IP:</b> <code>203.0.113.10/24</code></span>
     <span><b>Gateway:</b> <code>203.0.113.1</code></span>
     <span><b>NAT:</b> <span style="color:#16a34a;font-weight:700;">Active</span></span>
     <span><b>Internet:</b> <span style="color:#16a34a;font-weight:700;">Connected</span></span>
    </div>
   </div>

   <form id="router" class="router-console">
    <div>
     <span class="eyebrow">LAN configuration · /24 model</span>
     ${input('Router LAN IPv4','lan',applied.lan)}
     ${select('DHCP service','dhcp',[['on','Enabled'],['off','Disabled']],applied.dhcp)}
     ${input('Pool start','start',applied.start)}
     ${input('Pool end','end',applied.end)}
    </div>
    <div>
     <span class="eyebrow">Wireless configuration</span>
     ${input('SSID','ssid',applied.ssid)}
     ${select('Wi-Fi Frequency Band','band',[['2.4','2.4 GHz (Longer range)'],['5','5 GHz (Higher throughput)'],['6','6 GHz / Wi-Fi 6E (Clean spectrum)']],band)}
     ${select('Security','security',['WPA3-Personal','WPA2-Personal (AES)'],applied.security)}
     ${input('Wi-Fi passphrase (8–63 characters)','password',applied.password,'password')}
     <button class="primary" type="submit">Apply configuration</button>
    </div>
   </form>

   <div style="font-size:12px;color:var(--text-secondary);background:var(--bg-surface);padding:8px 12px;border-radius:6px;border:1px solid var(--border-color);margin:10px 0;">
    <b>${bandDetails[band].title}:</b> ${bandDetails[band].tradeoffs}
   </div>

   <div class="control-row">
    ${select('Client connection','medium',['Wired Ethernet','Wireless Wi-Fi'],clientMode)}
    ${input('Client SSID','clientssid',clientSSID)}
    ${input('Client passphrase','clientpass',clientPass,'password')}
    ${button('Connect a new client','connect','primary')}
   </div>

   <div class="sim-workbench-grid">
    <div class="sim-visual-panel">
     ${networkSVG(['LAN Clients','Router / NAT','WAN Gateway'], clients.length > 0 ? 1 : 0, null, null, {
      badge: `${band} GHz · ${applied.security}`,
      sublabels: [`${clients.length} connected`, applied.lan, '203.0.113.1']
     })}

     ${clients.length > 0 ? `
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:8px;">
       <span style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;align-self:center;margin-right:4px;">Connected LAN Topology:</span>
       ${clients.map(c => `<span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;background:${c.ip ? 'rgba(20,184,166,0.12)' : 'rgba(245,158,11,0.12)'};color:${c.ip ? '#0d9488' : '#d97706'};border:1px solid ${c.ip ? 'rgba(20,184,166,0.35)' : 'rgba(245,158,11,0.35)'};">${c.medium.includes('Wi-Fi') ? `📶 ${band}G` : '🔌 ETH'} · ${c.name} (${c.ip || 'No IP'})</span>`).join('')}
      </div>
     ` : ''}
    </div>

    <div class="sim-details-panel">
     ${result(message,!/failed|Invalid|error|disabled/i.test(message))}

     <div class="table-wrap">
      <table>
       <thead>
        <tr><th>Client</th><th>Link</th><th>Assigned address</th><th>Local status</th></tr>
       </thead>
       <tbody>
        ${clients.map(c=>`<tr><td>${c.name}</td><td>${c.medium}</td><td>${c.ip||'No lease'}</td><td>${c.ip?'Gateway reachable':'No configured IP connectivity'}</td></tr>`).join('')||'<tr><td colspan="4">No clients connected</td></tr>'}
       </tbody>
      </table>
     </div>
    </div>
   </div>
  `;

  const bandSelect = root.querySelector('[name="band"]');
  if(bandSelect){
   bandSelect.onchange = e => {
    band = e.target.value;
    draw();
   };
  }

  root.querySelector('form').onsubmit=e=>{
   e.preventDefault();
   try{
    const v=Object.fromEntries(Object.keys(applied).map(k=>[k,read(root,k)]));
    if(!classify(v.lan).startsWith('Private'))throw new Error('Use a private LAN address.');
    if(!v.ssid.trim()||v.ssid.length>32)throw new Error('SSID must contain 1–32 characters in this teaching model.');
    if(v.password.length<8||v.password.length>63)throw new Error('Use an 8–63 character passphrase; choose a long unique phrase in practice.');
    const next=new DHCP(v.start,v.end,v.lan,24,v.lan);
    next.online=v.dhcp==='on';
    server=next;applied=v;clients=[];
    message='Settings applied. Reconnect clients to acquire configuration.';
   }catch(e){
    message=`Invalid configuration: ${e.message}`;
   }
   draw();
  };

  wire(root,{
   connect:()=>{
    clientMode=read(root,'medium');
    clientSSID=read(root,'clientssid');
    clientPass=read(root,'clientpass');
    const medium=clientMode,name=`Client ${clients.length+1}`;
    if(medium==='Wireless Wi-Fi'&&(read(root,'clientssid')!==applied.ssid||read(root,'clientpass')!==applied.password)){
     message='Wireless authentication failed: SSID or passphrase does not match.';
     draw();
     return;
    }
    try{
     if(applied.dhcp==='off'){
      clients.push({name,medium,ip:null});
      message='Link established but DHCP is disabled. No static configuration is supplied in this router model.';
     }else{
      const l=server.request(name);
      clients.push({name,medium,ip:l.ip});
      message=`${name} connected with ${l.ip}/24; local gateway ${applied.lan} is reachable in this model.`;
     }
    }catch(e){
     message=e.message;
    }
    draw();
   }
  });
 }
 draw();
}

function windowsSharingDialogSvg(tab){
 const isFolder = tab === 'folder';
 const isSecurity = tab === 'security';
 const isPrinter = tab === 'printer';
 const title = isPrinter ? 'ClassroomPrinter Properties' : 'ClassFiles Properties';

 const body = isFolder ? `
   <rect x="20" y="78" width="380" height="106" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
   <text x="32" y="96" font-size="11" font-weight="700" fill="#0f172a">Network File and Folder Sharing</text>
   <text x="32" y="114" font-size="10.5" fill="#475569">ClassFiles is shared on this network.</text>
   <text x="32" y="132" font-size="10" fill="#64748b">Network Path:</text>
   <rect x="32" y="138" width="248" height="22" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
   <text x="40" y="153" font-size="11" font-family="monospace" font-weight="600" fill="#1d4ed8">\\\\HOST-PC\\ClassFiles</text>
   <rect x="292" y="137" width="96" height="24" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
   <text x="340" y="153" text-anchor="middle" font-size="10.5" font-weight="600" fill="#334155">Share...</text>

   <rect x="20" y="196" width="380" height="132" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
   <text x="32" y="214" font-size="11" font-weight="700" fill="#0f172a">Advanced Sharing Settings</text>
   <rect x="32" y="226" width="13" height="13" rx="2" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
   <path d="M35 232.5 L37.5 235.5 L42 229.5" fill="none" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
   <text x="53" y="236.5" font-size="11" font-weight="600" fill="#0f172a">Share this folder</text>

   <text x="32" y="261" font-size="10.5" fill="#334155">Share name:</text>
   <rect x="118" y="246" width="268" height="21" rx="3" fill="#ffffff" stroke="#2563eb" stroke-width="1.2"/>
   <text x="126" y="260" font-size="11" font-family="monospace" font-weight="600" fill="#0f172a">ClassFiles</text>

   <rect x="32" y="281" width="128" height="24" rx="4" fill="#eff6ff" stroke="#2563eb" stroke-width="1.3"/>
   <text x="96" y="297" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1d4ed8">Permissions...</text>
   <text x="172" y="297" font-size="10" fill="#475569">Everyone: Read · Teacher: Change</text>

   <text x="32" y="348" font-size="10" fill="#475569">Tip: Open the Security tab next to match local NTFS rules.</text>
 ` : isSecurity ? `
   <text x="22" y="84" font-size="10.5" font-weight="600" fill="#334155">Group or user names:</text>
   <rect x="20" y="92" width="380" height="72" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
   <text x="32" y="110" font-size="10.5" fill="#334155">SYSTEM</text>
   <rect x="22" y="116" width="376" height="21" rx="2" fill="#eff6ff"/>
   <text x="32" y="130" font-size="10.5" font-weight="700" fill="#1d4ed8">ClassStudents (HOST-PC\\ClassStudents)</text>
   <text x="32" y="151" font-size="10.5" fill="#334155">Administrators (HOST-PC\\Administrators)</text>

   <rect x="312" y="170" width="88" height="22" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
   <text x="356" y="185" text-anchor="middle" font-size="10.5" font-weight="600" fill="#334155">Edit...</text>

   <text x="22" y="188" font-size="10.5" font-weight="600" fill="#334155">Permissions for ClassStudents</text>
   <rect x="20" y="198" width="380" height="154" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
   <rect x="20" y="198" width="380" height="22" fill="#f8fafc"/>
   <line x1="20" y1="220" x2="400" y2="220" stroke="#e2e8f0"/>
   <text x="292" y="213" text-anchor="middle" font-size="10" font-weight="700" fill="#475569">Allow</text>
   <text x="358" y="213" text-anchor="middle" font-size="10" font-weight="700" fill="#475569">Deny</text>

   ${[
    ['Full control', false],
    ['Modify', false],
    ['Read & execute', true],
    ['List folder contents', true],
    ['Read', true],
    ['Write', false]
   ].map(([label, checked], idx) => {
    const y = 236 + idx * 19;
    return `
     <text x="32" y="${y}" font-size="10.5" fill="#1e293b">${label}</text>
     <rect x="286" y="${y - 9}" width="11" height="11" rx="2" fill="${checked ? '#eff6ff' : '#ffffff'}" stroke="${checked ? '#2563eb' : '#94a3b8'}" stroke-width="1.3"/>
     ${checked ? `<path d="M288.5 ${y - 3.5} L290.8 ${y - 1} L294.8 ${y - 6}" fill="none" stroke="#2563eb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
     <rect x="352" y="${y - 9}" width="11" height="11" rx="2" fill="#ffffff" stroke="#94a3b8"/>
    `;
   }).join('')}
 ` : `
   <rect x="20" y="78" width="380" height="134" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
   <text x="32" y="96" font-size="11" font-weight="700" fill="#0f172a">Share This Printer on the Local Network</text>
   <rect x="32" y="108" width="13" height="13" rx="2" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
   <path d="M35 114.5 L37.5 117.5 L42 111.5" fill="none" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
   <text x="53" y="118.5" font-size="11" font-weight="600" fill="#0f172a">Share this printer</text>

   <text x="32" y="144" font-size="10.5" fill="#334155">Share name:</text>
   <rect x="118" y="129" width="268" height="22" rx="3" fill="#ffffff" stroke="#2563eb" stroke-width="1.2"/>
   <text x="126" y="144" font-size="11" font-family="monospace" font-weight="600" fill="#0f172a">ClassroomPrinter</text>

   <rect x="32" y="164" width="13" height="13" rx="2" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
   <path d="M35 170.5 L37.5 173.5 L42 167.5" fill="none" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
   <text x="53" y="174.5" font-size="10.5" fill="#334155">Render print jobs on client computers</text>

   <rect x="32" y="186" width="150" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
   <text x="107" y="199" text-anchor="middle" font-size="9.8" font-weight="600" fill="#334155">Additional Drivers...</text>

   <rect x="20" y="224" width="380" height="114" rx="5" fill="#f8fafc" stroke="#cbd5e1"/>
   <text x="32" y="242" font-size="11" font-weight="700" fill="#0f172a">Same Pattern: Permissions & Client Connection</text>
   <text x="32" y="262" font-size="10.5" fill="#334155">1. Use the Security tab to grant Print access to users.</text>
   <text x="32" y="280" font-size="10.5" fill="#334155">2. Share network path:</text>
   <rect x="32" y="288" width="354" height="22" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
   <text x="40" y="303" font-size="11" font-family="monospace" font-weight="600" fill="#1d4ed8">\\\\HOST-PC\\ClassroomPrinter</text>
   <text x="32" y="326" font-size="10" fill="#64748b">Client PC: Settings -> Printers -> Add a printer by name</text>
 `;

 return `<svg class="win-sharing-dialog-svg" viewBox="0 0 420 400" role="img" aria-label="${esc(title)} showing Windows file and printer sharing configuration">
   <rect x="2" y="2" width="416" height="396" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
   <rect x="2" y="2" width="416" height="32" rx="8" fill="#f1f5f9"/>
   <rect x="2" y="24" width="416" height="10" fill="#f1f5f9"/>
   <line x1="2" y1="34" x2="418" y2="34" stroke="#cbd5e1" stroke-width="1"/>
   <text x="14" y="22" font-size="11.5" font-weight="600" fill="#0f172a">${esc(title)}</text>
   <text x="400" y="22" text-anchor="middle" font-size="13" fill="#64748b">×</text>

   <rect x="18" y="45" width="70" height="21" rx="3" fill="#f1f5f9" stroke="#e2e8f0"/>
   <text x="53" y="59" text-anchor="middle" font-size="10" fill="#64748b">General</text>

   <rect x="92" y="44" width="76" height="22" rx="4" fill="${(isFolder||isPrinter)?'#ffffff':'#f1f5f9'}" stroke="${(isFolder||isPrinter)?'#cbd5e1':'#e2e8f0'}"/>
   ${(isFolder||isPrinter)?'<rect x="93" y="62" width="74" height="5" fill="#ffffff"/>':''}
   <text x="130" y="59" text-anchor="middle" font-size="10.5" font-weight="${(isFolder||isPrinter)?'700':'500'}" fill="${(isFolder||isPrinter)?'#0f172a':'#64748b'}">Sharing</text>

   <rect x="172" y="44" width="78" height="22" rx="4" fill="${isSecurity?'#ffffff':'#f1f5f9'}" stroke="${isSecurity?'#cbd5e1':'#e2e8f0'}"/>
   ${isSecurity?'<rect x="173" y="62" width="76" height="5" fill="#ffffff"/>':''}
   <text x="211" y="59" text-anchor="middle" font-size="10.5" font-weight="${isSecurity?'700':'500'}" fill="${isSecurity?'#0f172a':'#64748b'}">Security</text>

   <rect x="254" y="45" width="90" height="21" rx="3" fill="#f1f5f9" stroke="#e2e8f0"/>
   <text x="299" y="59" text-anchor="middle" font-size="10" fill="#64748b">${isPrinter ? 'Ports' : 'Customize'}</text>
   <line x1="16" y1="66" x2="404" y2="66" stroke="#cbd5e1"/>

   ${body}

   <line x1="16" y1="358" x2="404" y2="358" stroke="#e2e8f0"/>
   <rect x="234" y="366" width="78" height="24" rx="4" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
   <text x="273" y="382" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8">OK</text>
   <rect x="320" y="366" width="78" height="24" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
   <text x="359" y="382" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">Cancel</text>
  </svg>`;
}

export function fileSharing(root){
 let activeTab='folder';
 const steps=[
  'Enable Private Sharing: Open Network and Sharing Center -> Advanced sharing settings, ensure the network profile is Private, and turn on Network discovery plus File and printer sharing.',
  'Open Properties -> Sharing: Right-click the folder in File Explorer (or right-click the printer in Printers & scanners -> Printer properties), then select the Sharing tab.',
  'Enable Share & Set Name: For a folder, click Advanced Sharing... and check "Share this folder" (e.g., ClassFiles). For a printer, check "Share this printer" (e.g., ClassroomPrinter).',
  'Set Matching Permissions: Click Permissions to assign Read or Change access, then verify the Security tab (NTFS rules for folders, Print permission for printers)—the stricter rule always wins.',
  'Connect from Client PC: On another PC in the same LAN, open Run (Win + R) and enter \\\\HOST-PC\\ClassFiles for files or add \\\\HOST-PC\\ClassroomPrinter under Printers & scanners to verify access.'
 ];

 function render(){
  const tabs=[
   ['folder','Folder: Sharing tab'],
   ['security','Security (NTFS) tab'],
   ['printer','Printer: Sharing tab']
  ];
  root.innerHTML=`<div class="static-guide-grid">
   <div class="static-guide-visual">
    <div class="static-dialog-card">
     <div class="sharing-dialog-tabs" role="tablist" aria-label="Windows Sharing Dialog Views">
      ${tabs.map(([id,label])=>`<button type="button" role="tab" aria-selected="${activeTab===id}" class="sharing-tab-btn${activeTab===id?' active':''}" data-sharing-tab="${id}">${esc(label)}</button>`).join('')}
     </div>
     ${windowsSharingDialogSvg(activeTab)}
    </div>
   </div>
   <div class="static-guide-steps">
    <ol class="teaching-points static-procedure-list">
     ${steps.map((step,i)=>{const colon=step.indexOf(': ');const title=step.slice(0,colon);const body=step.slice(colon+2);return `<li><span class="point-index">${String(i+1).padStart(2,'0')}</span><p><strong>${esc(title)}:</strong> ${esc(body)}</p></li>`;}).join('')}
    </ol>
   </div>
  </div>`;

  root.querySelectorAll('[data-sharing-tab]').forEach(btn=>{
   btn.onclick=()=>{activeTab=btn.dataset.sharingTab;render();};
  });
 }

 render();
 return ()=>{};
}

export function troubleshooting(root){
 let selected=0,state=diagnosticState(0),history=[],command='ipconfig /all';
 const commands=['ipconfig','ipconfig /all','ping 192.168.1.1','ping 192.168.1.200','ping 203.0.113.20','tracert 203.0.113.20','nslookup classroom.example','arp -a','ipconfig /release','ipconfig /renew','ping 127.0.0.1','help'];

 const methodSteps = [
  {step:'1. Physical',label:'Check Link / Media',cmd:'ipconfig',hint:'Verifies cable connection or Wi-Fi radio status.'},
  {step:'2. IP Config',label:'Check IP & Subnet',cmd:'ipconfig /all',hint:'Checks for APIPA (169.254.x.x), wrong subnet, or missing gateway.'},
  {step:'3. Loopback',label:'Test TCP/IP Stack',cmd:'ping 127.0.0.1',hint:'Confirms internal network software and NIC driver integrity.'},
  {step:'4. Gateway',label:'Test Local Gateway',cmd:'ping 192.168.1.1',hint:'Checks communication with the local router on the LAN.'},
  {step:'5. Remote IP',label:'Test Remote Path',cmd:'ping 203.0.113.20',hint:'Tests routing beyond the local gateway across the WAN.'},
  {step:'6. DNS',label:'Test Name Resolution',cmd:'nslookup classroom.example',hint:'Verifies that domain names resolve to IP addresses.'}
 ];

 function runCommand(cmd){
  const c = (cmd || '').trim();
  if(!c) return;
  if(c.toLowerCase()==='cls'||c.toLowerCase()==='clear'){
   history=[];
   draw();
   return;
  }
  command = c;
  history.push(`> ${c}\n${diagnose(state,c)}`);
  draw();
 }

 function draw(){
  root.innerHTML=`
   <div class="control-row">
    ${select('Demonstrated fault','scenario',faults.map((f,i)=>[i,f]),selected)}
    ${button('Restore fault','reset')}
    ${button('Apply targeted repair','repair','primary')}
   </div>

   <div class="sim-workbench-grid">
    <div class="sim-visual-panel">
     <div class="feedback" role="status">${state.fault<0?'Configuration restored. Repeat the original diagnostic command to observe the repair.':`Current fault: ${faults[selected]}. Inspect the settings and compare local, remote, name, and service behavior.`}</div>

     ${networkSVG(['Host (.10)','Switch / AP','Gateway (.1.1)'])}

     <div class="methodology-bar" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:10px;padding:12px;">
      <span style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-muted);display:block;margin-bottom:8px;">Standard 6-Step Troubleshooting Sequence</span>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;">
       ${methodSteps.map(m=>`
        <button type="button" class="method-step-btn" data-method-cmd="${esc(m.cmd)}" style="text-align:left;padding:8px 10px;background:var(--bg-elevated);border:1px solid var(--border-color);border-radius:8px;cursor:pointer;">
         <b style="font-size:12px;color:var(--blue);display:block;">${m.step}</b>
         <span style="font-size:11px;color:var(--text-primary);display:block;font-weight:600;">${m.label}</span>
         <code style="font-size:10px;color:var(--text-muted);">${m.cmd}</code>
        </button>
       `).join('')}
      </div>
     </div>

     <p class="small">Model: PC .10/24, peer .200/24, gateway/DNS 192.168.1.1; remote documentation target 203.0.113.20. ICMP is permitted.</p>
    </div>

    <div class="sim-details-panel">
     <div class="terminal-container">
      <div class="terminal-header-bar">
       <div class="terminal-dots"><span></span><span></span><span></span></div>
       <div class="terminal-title">Command Prompt - Lab Workstation (192.168.1.10)</div>
      </div>
      <pre class="terminal" role="log" aria-live="polite">${esc(history.at(-1)||'Select or type a command below to inspect this state. No real probes are sent.')}</pre>
      <form class="terminal-prompt-form control-row" id="terminal-prompt-form">
       <span class="terminal-prompt-label">C:\\Users\\Student&gt;</span>
       <input type="text" name="command" id="command" class="terminal-prompt-input" value="${esc(command)}" placeholder="Type command (ping, ipconfig, tracert, nslookup, help)..." autocomplete="off" spellcheck="false" />
       <button type="submit" class="primary" data-action="run">Execute modeled command</button>
      </form>
      <div class="quick-cmd-list">
       <span class="quick-cmd-label">Quick commands:</span>
       ${commands.map(c=>`<button type="button" class="quick-cmd" data-cmd="${esc(c)}"><code>${esc(c)}</code></button>`).join('')}
      </div>
     </div>
    </div>
   </div>
  `;

  root.querySelector('[name="scenario"]').onchange=e=>{
   selected=Number(e.target.value);
   state=diagnosticState(selected);
   history=[];
   draw();
  };

  const inputCmd=root.querySelector('[name="command"]');
  if(inputCmd){
   inputCmd.oninput=e=>{command=e.target.value;};
   inputCmd.onchange=e=>{command=e.target.value;};
  }

  const form=root.querySelector('#terminal-prompt-form');
  if(form){
   form.onsubmit=e=>{
    e.preventDefault();
    runCommand(read(root,'command'));
   };
  }

  root.querySelectorAll('.quick-cmd').forEach(btn=>{
   btn.onclick=()=>{
    command=btn.dataset.cmd;
    runCommand(command);
   };
  });

  root.querySelectorAll('.method-step-btn').forEach(btn=>{
   btn.onclick=()=>{
    command=btn.dataset.methodCmd;
    runCommand(command);
   };
  });

  wire(root,{
   run:()=>{runCommand(read(root,'command'));},
   reset:()=>{state=diagnosticState(selected);history=[];draw();},
   repair:()=>{state=diagnosticState(-1);draw();}
  });
 }

 draw();
}
