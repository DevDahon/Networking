import {reserveSimulationSpace} from '../components/simulationSpace.js';
import {esc,button,input,select,result,wire,read,networkSVG} from '../components/ui.js';
import {DHCP,sharing,classify,subnet} from '../utils/network.js';
import {faults,diagnosticState,diagnose} from './models.js';
import {createPlayback} from './playback.js';

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

 function stopExchange(){playback.pause();history=[];stage=-1;}

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
    ${button(stage<0?'Start Discover':'Next DORA step','step','primary')}
    ${button('Previous DORA step','previous')}
    ${button('Play / replay DORA','play')}
    ${button('Pause','pause')}
    ${button('Resume','resume')}
    ${select('Animation speed','speed',[['0.5','0.5×'],['1','1×'],['2','2×']],playback.speed)}
   </div>

   ${networkSVG([client,server.online?'DHCP Server (192.168.1.1)':'Server offline','Lease Pool (192.168.1.100–102)'],stage<0?0:stage===1||stage===3?1:0,null,stage<0?100:250,{badge:curStep?`${curStep.msg} (${curStep.src.split(':')[1]}→${curStep.dst.split(':')[1]})`:'Idle (No Lease)',broadcast:stage===0||stage===2,direction:stage===1||stage===3?'reverse':stage>=0?'forward':null,fault:!server.online||/exhausted|No DHCP/i.test(log)})}

   <div class="dora">
    ${['Discover','Offer','Request','ACK'].map((s,i)=>`<span class="${i===stage?'current':''}">${i+1} · ${s}</span>`).join('')}
   </div>

   ${curStep ? `
    <div class="result-grid" style="margin:12px 0;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));">
     <div><b>Message Type:</b><br><code style="color:var(--blue);font-weight:700;">${curStep.msg}</code></div>
     <div><b>Direction:</b><br><span style="font-size:12px;">${curStep.direction}</span></div>
     <div><b>Source & Dest Ports:</b><br><code style="font-size:12px;">${curStep.src} &rarr; ${curStep.dst}</code></div>
     <div><b>Educational Summary:</b><br><span style="font-size:12px;">${curStep.desc}</span></div>
    </div>
   ` : ''}

   ${result(log,!/exhausted|No DHCP|No active|error/i.test(log))}

   <div class="control-row">
    ${button('Release lease','release')}
    ${button('Renew lease','renew')}
    ${button('+30 teaching seconds','time')}
    ${button(server.online?'Take server offline':'Bring server online','online')}
    ${button('Reset exchange','reset')}
   </div>

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

   <p class="small">Manual and automatic steps share the same exchange state. Previous DORA step restores the preceding exchange and lease table. Changing client/pool/time cancels that history. Renewal is Request/ACK, not full initial DORA.</p>
  `;

  // Reserve the pending lease row before playback can commit it.
  const pending=root.cloneNode(true),table=pending.querySelector('tbody');
  if(Object.keys(server.leases).length&&!server.leases[client])table.insertAdjacentHTML('beforeend','<tr><td>PC 4</td><td>192.168.1.100</td><td>60s</td></tr>');
  const feedback=pending.querySelector('.feedback');
  if(feedback)feedback.textContent=`ACK: ${client} holds 192.168.255.254 until teaching time ${server.time+60}s. The lease and address configuration are confirmed.`;
  reserveSimulationSpace(root,[root.innerHTML,pending.innerHTML]);

  root.querySelector('[data-action="previous"]').disabled=!history.length;
  root.querySelector('[data-action="resume"]').disabled=stage===3;
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
   step:()=>{playback.pause();advance();draw();},
   previous:()=>{playback.pause();const saved=history.pop();if(saved){stage=saved.stage;offered=saved.offered;log=saved.log;server.leases=saved.leases;}draw();},
   play:()=>{stopExchange();log='Automatic DORA begins with Discover; the lease is committed at ACK.';playback.play();},
   pause:()=>{playback.pause();draw();},
   resume:()=>{if(stage!==3)playback.play();},
   release:()=>{stopExchange();server.release(client);log=`${client} released its lease; the address is available again.`;draw();},
   renew:()=>{stopExchange();try{if(!server.leases[client])throw new Error('No active lease to renew. Start Discover.');const lease=server.request(client);log=`Request / ACK: ${client} renewed ${lease.ip} to ${lease.expires}s.`;}catch(e){log=e.message;}draw();},
   time:()=>{stopExchange();server.tick();log='Clock advanced 30 seconds; expired leases removed and pending exchange reset.';draw();},
   online:()=>{stopExchange();server.online=!server.online;log=server.online?'Server reachable again.':'Server offline. Existing leases remain valid until expiry; new requests/renewals fail.';draw();},
   reset:()=>{stopExchange();log='Exchange reset; active leases are preserved. Use Release or Apply pool to change them.';draw();}
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

   ${networkSVG(['LAN Clients (Wired/Wi-Fi)','Router / NAT Gateway','WAN / Internet Gateway'], clients.length > 0 ? 1 : 0, null, 0, {
    badge: `${band} GHz · ${applied.security}`,
    sublabels: [`${clients.length} connected`, applied.lan, '203.0.113.1']
   })}

   ${clients.length > 0 ? `
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0;padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-color);border-radius:8px;">
     <span style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;align-self:center;margin-right:4px;">Connected LAN Topology:</span>
     ${clients.map(c => `<span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;background:${c.ip ? 'rgba(20,184,166,0.12)' : 'rgba(245,158,11,0.12)'};color:${c.ip ? '#0d9488' : '#d97706'};border:1px solid ${c.ip ? 'rgba(20,184,166,0.35)' : 'rgba(245,158,11,0.35)'};">${c.medium.includes('Wi-Fi') ? `📶 ${band}G` : '🔌 ETH'} · ${c.name} (${c.ip || 'No IP'})</span>`).join('')}
    </div>
   ` : ''}

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

   <p class="small">This console never configures a physical router. Applying a LAN/pool change disconnects modeled clients. WAN service, NAT translation tables, guest isolation, radio interference, and vendor interfaces are conceptual here.</p>
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

export function fileSharing(root){
 let created=false;
 let mappedDrive=false;
 let discovery='on';

 function draw(){
  const sharePerms=['None','Read / viewer','Change / editor'];
  const ntfsPerms=['None','Read / viewer','Modify / editor'];

  root.innerHTML=`
   <div class="control-row">
    ${select('Sharing host','host',['PC 1','PC 2','PC 3'],'PC 1')}
    ${select('Client','client',['PC 1','PC 2','PC 3'],'PC 2')}
    ${input('Folder share name','folder','ClassFiles')}
    ${button('Publish simulated folder','publish','primary')}
   </div>

   ${networkSVG(['PC 1 (Sharing Host)','LAN Switch','PC 2 / PC 3 (Clients)'], 1, null, 0, {
    badge: 'SMB / TCP 445',
    sublabels: ['File & Print Host', 'L2 Switch Fabric', 'UNC / Mapped Client']
   })}

   <div class="config-grid">
    <fieldset>
     <legend>Folder & File Permissions</legend>
     ${select('Share permission','share',[[0,'None'],[1,'Read / viewer'],[2,'Change / editor']],1)}
     ${select('File-system permission','ntfs',[[0,'None'],[1,'Read / viewer'],[2,'Modify / editor']],1)}
     ${select('Requested action','action',['Read','Write'],'Read')}
    </fieldset>
    <fieldset>
     <legend>Host, Network & Device Settings</legend>
     ${select('Network Discovery','discovery',[['on','Turned ON (Host visible in Network)'],['off','Turned OFF (Requires direct UNC path)']],discovery)}
     ${select('Host link / power','online',[['yes','Online'],['no','Offline']],'yes')}
     ${select('Client account','auth',[['yes','Authenticated and authorized identity'],['no','Not authenticated']],'yes')}
     ${select('Printer permission','print',[['yes','Print allowed'],['no','Print denied']],'yes')}
    </fieldset>
   </div>

   <div id="perm-pipeline-box" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:8px;padding:10px 14px;margin:10px 0;font-size:12px;color:var(--text-secondary);"></div>

   <div class="control-row">
    ${button('Access folder','access','primary')}
    ${button('Map Network Drive (Z:)','map')}
    ${button('Use shared printer','printer')}
    ${button('Remove share','remove')}
   </div>

   <div id="access-result" aria-live="polite"></div>

   <p class="small">Simplified single-identity model with no explicit-deny ACLs, groups, or inheritance. Share and NTFS restrictions both apply. Printer model assumes a ready spooler and compatible installed driver.</p>
  `;

  function updatePermPipeline(){
   const box = root.querySelector('#perm-pipeline-box');
   if(!box) return;
   const sLvl = Number(read(root,'share') ?? 1);
   const nLvl = Number(read(root,'ntfs') ?? 1);
   const effLvl = Math.min(sLvl, nLvl);
   const labels = ['None (Denied)','Read-Only (Viewer)','Read + Write (Editor)'];
   const hostName = read(root,'host') || 'PC 1';
   const folderName = read(root,'folder') || 'ClassFiles';
   box.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
     <b>Effective Network Permission Pipeline (Most Restrictive Wins):</b>
     <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;background:${created ? 'rgba(20,184,166,0.14)' : 'rgba(148,163,184,0.15)'};color:${created ? '#0d9488' : 'var(--text-muted)'};">
      ${created ? `Shared: \\\\${hostName}\\${folderName}` : 'Share Not Published'}
     </span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:6px 0;">
     <span style="padding:4px 10px;border-radius:6px;background:var(--bg-panel);border:1px solid var(--border-color);font-weight:600;">Share: <b>${sharePerms[sLvl]}</b></span>
     <span style="font-weight:800;color:var(--text-muted);">&cap;</span>
     <span style="padding:4px 10px;border-radius:6px;background:var(--bg-panel);border:1px solid var(--border-color);font-weight:600;">NTFS: <b>${ntfsPerms[nLvl]}</b></span>
     <span style="font-weight:800;color:var(--text-muted);">&rarr;</span>
     <span style="padding:4px 12px;border-radius:6px;background:${effLvl === 0 ? 'rgba(239,68,68,0.14)' : effLvl === 1 ? 'rgba(59,130,246,0.14)' : 'rgba(22,163,74,0.14)'};color:${effLvl === 0 ? '#dc2626' : effLvl === 1 ? '#2563eb' : '#16a34a'};font-weight:800;border:1px solid currentColor;">
      Effective: ${labels[effLvl]}
     </span>
    </div>
    <div style="margin-top:6px;">
     ${mappedDrive ? `<span style="color:#16a34a;font-weight:700;">&bull; Drive Z: is currently mapped to \\\\${hostName}\\${folderName}</span>` : '<span>&bull; No network drive mapped.</span>'}
    </div>
   `;
  }

  updatePermPipeline();

  ['share','ntfs','folder'].forEach(name => {
   const el = root.querySelector(`[name="${name}"]`);
   if(el) el.addEventListener('change', updatePermPipeline);
  });

  root.querySelector('[name="discovery"]').onchange = e => {
   discovery = e.target.value;
   updatePermPipeline();
   show(`Network discovery is ${discovery==='on'?'enabled: other PCs can see this host in Network Places':'disabled: host is hidden from network browsing; direct UNC path required'}.`, true);
  };

  root.querySelector('[name="host"]').onchange=()=>{
   created=false;
   mappedDrive=false;
   updatePermPipeline();
   show('Host changed. Publish the folder on the selected host before remote access.');
  };

  wire(root,{
   publish:()=>{
    if(!read(root,'folder').trim()){
     show('Enter a share name.',false);
     return;
    }
    created=true;
    updatePermPipeline();
    show('Published '+String.fromCharCode(92,92)+read(root,'host')+String.fromCharCode(92)+read(root,'folder')+' in the simulation.');
   },
   remove:()=>{
    created=false;
    mappedDrive=false;
    updatePermPipeline();
    show('The simulated folder share has been removed.');
   },
   map:()=>{
    if(!created){
     show('Cannot map drive: folder has not been shared on the network.', false);
     return;
    }
    if(read(root,'host')===read(root,'client')){
     show('Cannot map network drive to own local computer in this model.', false);
     return;
    }
    mappedDrive=true;
    updatePermPipeline();
    show(`Successfully mapped drive Z: to \\\\${read(root,'host')}\\${read(root,'folder')} (net use Z: \\\\${read(root,'host')}\\${read(root,'folder')}). Available in File Explorer.`, true);
   },
   access:()=>{
    if(read(root,'host')===read(root,'client')){
     show('Choose a different PC to test remote share access.',false);
     return;
    }
    const t=sharing({
     share:read(root,'share'),
     ntfs:read(root,'ntfs'),
     action:read(root,'action'),
     online:read(root,'online')==='yes',
     shared:created,
     authenticated:read(root,'auth')==='yes'
    });
    show(t,t.startsWith('Allowed'));
   },
   printer:()=>{
    const ok=read(root,'host')!==read(root,'client')&&read(root,'online')==='yes'&&read(root,'auth')==='yes'&&read(root,'print')==='yes';
    show(ok?'Print job accepted by the modeled shared printer. Host online, authenticated account, and print permission verified.':'Print denied: use a remote client and check host availability, authentication, and printer permission.',ok);
   }
  });
 }

 function show(t,ok=true){
  root.querySelector('#access-result').innerHTML=result(t,ok);
 }

 draw();
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

   <p class="callout">${state.fault<0?'Configuration restored. Repeat the original diagnostic command to observe the repair.':`Current fault: ${faults[selected]}. Inspect the settings and compare local, remote, name, and service behavior.`}</p>

   <div class="methodology-bar" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:10px;padding:12px;margin:12px 0;">
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

   ${networkSVG(['Host (.10)','Switch / AP','Gateway (.1.1)'])}

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

   <p class="small">${history.length} command(s) run in this session. The latest result is shown above. Outputs derive from the current faulty or repaired state; real command wording, timing, and filtering vary.</p>
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
