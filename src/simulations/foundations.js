import {topologyCoordinates,topologyConnections} from '../components/topologyDiagram.js';
import {reserveSimulationSpace} from '../components/simulationSpace.js';
import {animatePacket,packetPosition} from '../components/packetMotion.js';
import {esc,button,select,result,wire,read,networkSVG} from '../components/ui.js';
import {layouts,reachable} from './models.js';
import {topologyPath} from './extraModels.js';
import {createStepPlayback} from './playback.js';
import {renderTopologyNode,getSavedNodeStyle,setSavedNodeStyle} from '../components/networkSymbols.js';
import {renderPhysicalDeviceSvg,renderHowItWorksSvg} from '../components/deviceIllustrations.js';
function renderCommunicationSVG({ scenario, medium, step, totalSteps, packetPos, activeHop, isComplete }) {
  const isRouted = scenario === 'routed';
  const isFiber = medium === 'Fiber optics';
  const isWifi = medium === 'Wi-Fi radio';
  const mediumColor = isWifi ? '#8b5cf6' : isFiber ? '#06b6d4' : '#2563eb';
  const packetFill = isWifi ? '#a855f7' : isFiber ? '#0284c7' : '#0d9488';

  if (!isRouted) {
    const pcAActive = step === 0;
    const switchActive = step === 2;
    const pcBActive = step === 3 || isComplete;
    const link1Active = activeHop === 0;
    const link2Active = activeHop === 1;

    return `
      <svg class="network-diagram transmission-diagram" viewBox="0 0 840 210" role="img" aria-label="PC A to PC B data transmission diagram">
        <defs>
          <filter id="comm-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.18"/>
          </filter>
        </defs>

        <!-- Connection 1: PC A to Switch -->
        <g class="connection-group">
          <line x1="175" y1="100" x2="365" y2="100"
            stroke="${link1Active ? mediumColor : '#cbd5e1'}"
            stroke-width="${link1Active ? 5 : 4}"
            ${isWifi ? 'stroke-dasharray="8 6"' : ''}/>
          ${isFiber ? `<line x1="175" y1="100" x2="365" y2="100" stroke="#e0f2fe" stroke-width="1.8"/>` : ''}
          ${link1Active ? `
            <path d="M255 94 l6 6 -6 6 M270 94 l6 6 -6 6 M285 94 l6 6 -6 6"
              stroke="${mediumColor}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          ` : ''}
          ${isWifi ? `
            <path d="M185 85 A 20 20 0 0 1 185 115" stroke="#a855f7" stroke-width="2" fill="none" opacity="0.6"/>
            <path d="M355 85 A 20 20 0 0 0 355 115" stroke="#a855f7" stroke-width="2" fill="none" opacity="0.6"/>
          ` : ''}
        </g>

        <!-- Connection 2: Switch to PC B -->
        <g class="connection-group">
          <line x1="475" y1="100" x2="665" y2="100"
            stroke="${link2Active ? mediumColor : '#cbd5e1'}"
            stroke-width="${link2Active ? 5 : 4}"
            ${isWifi ? 'stroke-dasharray="8 6"' : ''}/>
          ${isFiber ? `<line x1="475" y1="100" x2="665" y2="100" stroke="#e0f2fe" stroke-width="1.8"/>` : ''}
          ${link2Active ? `
            <path d="M555 94 l6 6 -6 6 M570 94 l6 6 -6 6 M585 94 l6 6 -6 6"
              stroke="${mediumColor}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          ` : ''}
          ${isWifi ? `
            <path d="M485 85 A 20 20 0 0 1 485 115" stroke="#a855f7" stroke-width="2" fill="none" opacity="0.6"/>
            <path d="M655 85 A 20 20 0 0 0 655 115" stroke="#a855f7" stroke-width="2" fill="none" opacity="0.6"/>
          ` : ''}
        </g>

        <!-- Device 1: PC A (Sender) -->
        <g transform="translate(130, 100)" class="device-node ${pcAActive ? 'device-active' : ''}" filter="url(#comm-shadow)">
          <rect x="-44" y="-32" width="88" height="54" rx="8"
            fill="${pcAActive ? '#eff6ff' : '#ffffff'}"
            stroke="${pcAActive ? '#2563eb' : '#94a3b8'}"
            stroke-width="${pcAActive ? 3 : 2}"/>
          <rect x="-37" y="-25" width="74" height="40" rx="4" fill="${pcAActive ? '#dbeafe' : '#f8fafc'}"/>
          <path d="M-26 -15h52M-26 -5h38M-26 5h24" stroke="${pcAActive ? '#2563eb' : '#cbd5e1'}" stroke-width="2"/>
          <path d="M-8 22h16M0 22v12M-18 34h36" stroke="${pcAActive ? '#2563eb' : '#94a3b8'}" stroke-width="2.5"/>
          <rect x="-42" y="-48" width="84" height="18" rx="9" fill="#2563eb"/>
          <text x="0" y="-35" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">PC A · SENDER</text>
          <text y="56" font-size="12" font-weight="700" fill="#0f172a" text-anchor="middle">192.168.1.10</text>
          <text y="70" font-size="10" fill="#64748b" text-anchor="middle">MAC: 00:1A:..:01</text>
        </g>

        <!-- Device 2: Switch (Intermediate Device) -->
        <g transform="translate(420, 100)" class="device-node ${switchActive ? 'device-active' : ''}" filter="url(#comm-shadow)">
          <rect x="-55" y="-28" width="110" height="56" rx="8"
            fill="${switchActive ? '#f0fdfa' : '#ffffff'}"
            stroke="${switchActive ? '#0d9488' : '#94a3b8'}"
            stroke-width="${switchActive ? 3 : 2}"/>
          <circle cx="-38" cy="-14" r="3.5" fill="#22c55e"/>
          <circle cx="-24" cy="-14" r="3.5" fill="#22c55e"/>
          <circle cx="-10" cy="-14" r="3.5" fill="#22c55e"/>
          <circle cx="10" cy="-14" r="3.5" fill="#22c55e"/>
          <circle cx="24" cy="-14" r="3.5" fill="#22c55e"/>
          <circle cx="38" cy="-14" r="3.5" fill="#22c55e"/>
          <rect x="-44" y="2" width="12" height="14" rx="2" fill="#0f766e"/>
          <rect x="-24" y="2" width="12" height="14" rx="2" fill="#0f766e"/>
          <rect x="12" y="2" width="12" height="14" rx="2" fill="#0f766e"/>
          <rect x="32" y="2" width="12" height="14" rx="2" fill="#0f766e"/>
          <text x="-38" y="24" font-size="8" fill="#64748b" text-anchor="middle">P1</text>
          <text x="38" y="24" font-size="8" fill="#64748b" text-anchor="middle">P2</text>
          <path d="M-10 6h20m-5 -4 5 4-5 4 M10 14h-20m5-4-5 4 5 4" stroke="${switchActive ? '#0d9488' : '#64748b'}" stroke-width="1.8"/>
          <rect x="-48" y="-46" width="96" height="18" rx="9" fill="#0d9488"/>
          <text x="0" y="-33" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">SWITCH (L2)</text>
          <text y="54" font-size="12" font-weight="700" fill="#0f172a" text-anchor="middle">FastEthernet Switch</text>
          <text y="68" font-size="10" fill="${switchActive ? '#0d9488' : '#64748b'}" font-weight="${switchActive ? 700 : 400}" text-anchor="middle">${switchActive ? 'Forwarding: P1 → P2' : 'Layer 2 Switch'}</text>
        </g>

        <!-- Device 3: PC B (Receiver) -->
        <g transform="translate(710, 100)" class="device-node ${pcBActive ? 'device-active' : ''}" filter="url(#comm-shadow)">
          <rect x="-44" y="-32" width="88" height="54" rx="8"
            fill="${pcBActive ? '#f0fdf4' : '#ffffff'}"
            stroke="${pcBActive ? '#16a34a' : '#94a3b8'}"
            stroke-width="${pcBActive ? 3 : 2}"/>
          <rect x="-37" y="-25" width="74" height="40" rx="4" fill="${pcBActive ? '#dcfce7' : '#f8fafc'}"/>
          ${isComplete || step === 3
            ? `<path d="M-12 0l8 8 16 -16" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
            : `<path d="M-26 -15h52M-26 -5h38M-26 5h24" stroke="#cbd5e1" stroke-width="2"/>`
          }
          <path d="M-8 22h16M0 22v12M-18 34h36" stroke="${pcBActive ? '#16a34a' : '#94a3b8'}" stroke-width="2.5"/>
          <rect x="-46" y="-48" width="92" height="18" rx="9" fill="#16a34a"/>
          <text x="0" y="-35" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">PC B · RECEIVER</text>
          <text y="56" font-size="12" font-weight="700" fill="#0f172a" text-anchor="middle">192.168.1.20</text>
          <text y="70" font-size="10" fill="${pcBActive ? '#16a34a' : '#64748b'}" font-weight="${pcBActive ? 700 : 400}" text-anchor="middle">${isComplete || step === 3 ? 'Data Received ✓' : 'MAC: 00:1A:..:02'}</text>
        </g>

        <!-- Moving Packet / Signal -->
        <g class="packet-marker-group" transform="translate(${packetPos.x}, ${packetPos.y})">
          <circle class="packet" data-network-packet cx="0" cy="0" r="11"
            fill="${packetFill}" stroke="#ffffff" stroke-width="2.5"
            filter="drop-shadow(0 3px 6px rgba(0,0,0,0.35))"/>
          <path d="M-3 -3 L1 0 L-3 3" stroke="#ffffff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <rect class="packet-tag-bg" x="-26" y="-27" width="52" height="15" rx="4" fill="#0f172a" opacity="0.88"/>
          <text class="packet-tag" x="0" y="-16" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">DATA PKT</text>
        </g>
      </svg>
    `;
  } else {
    const pcAActive = step === 0;
    const switchActive = step === 2;
    const routerActive = step === 3;
    const pcBActive = step === 4 || isComplete;
    const link1Active = activeHop === 0;
    const link2Active = activeHop === 1;
    const link3Active = activeHop === 2;

    return `
      <svg class="network-diagram transmission-diagram" viewBox="0 0 840 210" role="img" aria-label="Cross-network routed data transmission diagram">
        <defs>
          <filter id="comm-shadow-r" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.18"/>
          </filter>
        </defs>

        <!-- Subnet boundaries labels -->
        <rect x="30" y="8" width="370" height="22" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
        <text x="215" y="23" font-size="11" font-weight="700" fill="#1e40af" text-anchor="middle">SUBNET A: 192.168.1.0/24</text>
        <rect x="440" y="8" width="370" height="22" rx="4" fill="#f0fdf4" stroke="#bbf7d0"/>
        <text x="625" y="23" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">SUBNET B: 192.168.2.0/24</text>

        <!-- Links -->
        <line x1="140" y1="105" x2="255" y2="105" stroke="${link1Active ? mediumColor : '#cbd5e1'}" stroke-width="${link1Active ? 5 : 4}"/>
        <line x1="345" y1="105" x2="455" y2="105" stroke="${link2Active ? mediumColor : '#cbd5e1'}" stroke-width="${link2Active ? 5 : 4}"/>
        <line x1="545" y1="105" x2="675" y2="105" stroke="${link3Active ? mediumColor : '#cbd5e1'}" stroke-width="${link3Active ? 5 : 4}"/>

        <!-- PC A -->
        <g transform="translate(100, 105)" filter="url(#comm-shadow-r)">
          <rect x="-40" y="-28" width="80" height="50" rx="6" fill="${pcAActive ? '#eff6ff' : '#ffffff'}" stroke="${pcAActive ? '#2563eb' : '#94a3b8'}" stroke-width="${pcAActive ? 3 : 2}"/>
          <rect x="-35" y="-44" width="70" height="16" rx="8" fill="#2563eb"/>
          <text x="0" y="-32" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">PC A · SENDER</text>
          <text y="48" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">192.168.1.10</text>
        </g>

        <!-- Switch -->
        <g transform="translate(300, 105)" filter="url(#comm-shadow-r)">
          <rect x="-45" y="-25" width="90" height="50" rx="6" fill="${switchActive ? '#f0fdfa' : '#ffffff'}" stroke="${switchActive ? '#0d9488' : '#94a3b8'}" stroke-width="${switchActive ? 3 : 2}"/>
          <rect x="-40" y="-41" width="80" height="16" rx="8" fill="#0d9488"/>
          <text x="0" y="-29" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">LAN SWITCH</text>
          <text y="48" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Layer 2 Switch</text>
        </g>

        <!-- Router -->
        <g transform="translate(500, 105)" filter="url(#comm-shadow-r)">
          <rect x="-48" y="-25" width="96" height="50" rx="25" fill="${routerActive ? '#fff7ed' : '#ffffff'}" stroke="${routerActive ? '#ea580c' : '#94a3b8'}" stroke-width="${routerActive ? 3 : 2}"/>
          <path d="M-14 0h28m-6 -5 6 5-6 5 M0 -10v20m-5 -6 5 6 5 -6" stroke="${routerActive ? '#ea580c' : '#7c2d12'}" stroke-width="2"/>
          <rect x="-45" y="-41" width="90" height="16" rx="8" fill="#ea580c"/>
          <text x="0" y="-29" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">ROUTER (L3)</text>
          <text y="48" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Gateway 192.168.1.1</text>
        </g>

        <!-- PC B -->
        <g transform="translate(720, 105)" filter="url(#comm-shadow-r)">
          <rect x="-40" y="-28" width="80" height="50" rx="6" fill="${pcBActive ? '#f0fdf4' : '#ffffff'}" stroke="${pcBActive ? '#16a34a' : '#94a3b8'}" stroke-width="${pcBActive ? 3 : 2}"/>
          ${isComplete || step === 4
            ? `<path d="M-10 0l6 6 12 -12" stroke="#16a34a" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
            : `<path d="M-22 -12h44M-22 -4h32M-22 4h20" stroke="#cbd5e1" stroke-width="2"/>`
          }
          <rect x="-40" y="-44" width="80" height="16" rx="8" fill="#16a34a"/>
          <text x="0" y="-32" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">PC B · RECEIVER</text>
          <text y="48" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">192.168.2.20</text>
        </g>

        <!-- Packet -->
        <g class="packet-marker-group" transform="translate(${packetPos.x}, ${packetPos.y})">
          <circle class="packet" data-network-packet cx="0" cy="0" r="11" fill="${packetFill}" stroke="#ffffff" stroke-width="2.5" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.35))"/>
          <path d="M-3 -3 L1 0 L-3 3" stroke="#ffffff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <rect class="packet-tag-bg" x="-26" y="-27" width="52" height="15" rx="4" fill="#0f172a" opacity="0.88"/>
          <text class="packet-tag" x="0" y="-16" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">IP PKT</text>
        </g>
      </svg>
    `;
  }
}

export function communication(root){
  let step=0,medium='Copper Ethernet',scenario='local',progress=0,lastStep=0,releaseMotion=()=>{};
  const mq=window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const reduced=Boolean(mq?.matches&&typeof mq.addEventListener!=='function');
  const isTestEnv=typeof navigator!=='undefined'&&/jsdom/i.test(navigator.userAgent||'');

  const localNodes=[{x:130,y:100},{x:420,y:100},{x:710,y:100}];
  const routedNodes=[{x:100,y:105},{x:300,y:105},{x:500,y:105},{x:720,y:105}];

  const localStages=[
    {status:'Preparing Data',title:'Step 1 / 4',text:'Sender PC A (192.168.1.10) formats “Class begins at 9” using an agreed protocol. Comparing subnet masks identifies destination 192.168.1.20 as local; PC A frames the IP packet with PC B’s MAC address.',route:[0],hop:-1},
    {status:'Transmitting Packet',title:'Step 2 / 4',text:`The medium carries encoded signals across the link. The frame leaves PC A and travels across the ${medium} connection to Port 1 of the local Switch.`,route:[0,1],hop:0},
    {status:'Packet Received – Forwarding',title:'Step 3 / 4',text:`The Switch receives the frame on Port 1, looks up the destination MAC address in its forwarding table, and forwards the packet out Port 2 across the ${medium} link toward PC B.`,route:[1,2],hop:1},
    {status:'Data Successfully Received',title:'Step 4 / 4',text:'Receiver PC B interprets the message using the same protocol. PC B verifies the destination addressing, extracts the payload, and presents “Class begins at 9” to the receiving application.',route:[2],hop:-1}
  ];

  const routedStages=[
    {status:'Preparing Data',title:'Step 1 / 5',text:'PC A (192.168.1.10/24) has data for PC B (192.168.2.20/24). Comparing network prefixes indicates a remote subnet. PC A addresses the frame to its Default Gateway Router MAC.',route:[0],hop:-1},
    {status:'Transmitting Packet',title:'Step 2 / 5',text:`The frame leaves PC A and propagates across the local ${medium} channel to the local LAN Switch.`,route:[0,1],hop:0},
    {status:'Packet Received – Forwarding',title:'Step 3 / 5',text:'The Switch receives the frame and forwards it across the gateway link to the Router interface (192.168.1.1).',route:[1,2],hop:1},
    {status:'Packet Received – Forwarding',title:'Step 4 / 5',text:'The Router consults its Layer 3 routing table for 192.168.2.0/24, decrements TTL, rewrites the Layer 2 header, and forwards the packet across the subnet boundary.',route:[2,3],hop:2},
    {status:'Data Successfully Received',title:'Step 5 / 5',text:'PC B on the remote network receives the frame, verifies destination IP 192.168.2.20, and successfully delivers the message to the application.',route:[3],hop:-1}
  ];

  function getStages(){return scenario==='local'?localStages:routedStages;}
  function getNodes(){return scenario==='local'?localNodes:routedNodes;}

  const playback=createStepPlayback({
    length:()=>getStages().length,
    getIndex:()=>step,
    setIndex:value=>{step=value;},
    render:draw
  });

  function draw(){
    releaseMotion();
    if(step!==lastStep){progress=0;lastStep=step;}
    const stages=getStages();
    const nodes=getNodes();
    step=Math.max(0,Math.min(step,stages.length-1));
    const current=stages[step];

    let packetPos;
    if(current.route.length===1){
      packetPos={x:nodes[current.route[0]].x,y:nodes[current.route[0]].y};
    } else {
      const pt=packetPosition(nodes,current.route,progress);
      packetPos=pt||{x:nodes[current.route[0]].x,y:nodes[current.route[0]].y};
    }

    const isRunning=playback.running;
    const isCompleted=playback.completed;
    const displayedStatus=isCompleted?'Data Successfully Received':isRunning&&step===0?'Preparing Data':step===0&&!isRunning?'Ready to Send':current.status;
    const statusType=displayedStatus==='Data Successfully Received'?'success':displayedStatus==='Ready to Send'?'ready':displayedStatus==='Preparing Data'?'prep':displayedStatus==='Transmitting Packet'?'transit':'forward';

    const markup=stepIndex=>{
      const cur=stages[stepIndex];
      return `
        <div class="control-row">
          ${select('Network path & topology','scenario',[['local','Same Local Network: PC A → Switch → PC B'],['routed','Cross-Network: PC A → Switch → Router → PC B']],scenario)}
          ${select('Transmission medium','medium',['Copper Ethernet','Fiber optics','Wi-Fi radio'],medium)}
        </div>

        <div class="communication-flow" style="--packet-duration:${2/playback.speed}s;--packet-play:${stepIndex===2&&playback.running?'running':'paused'}">
          ${renderCommunicationSVG({
            scenario,
            medium,
            step:stepIndex,
            totalSteps:stages.length,
            packetPos,
            activeHop:cur.hop,
            isComplete:isCompleted
          })}
        </div>

        <div class="step-card" aria-live="polite">
          <b>Step ${stepIndex + 1} / ${stages.length} · ${playback.status}</b>
          <span class="status-pill status-${statusType}" style="float:right;">${displayedStatus}</span>
          <p style="clear:both;margin-top:8px;">${cur.text}</p>
          <div class="transmission-meta">
            <span><b>Medium:</b> ${medium}: ${medium==='Fiber optics'?'light pulses':medium==='Wi-Fi radio'?'radio signals':'electrical signals'} carry the message.</span>
            <span><b>Displayed Path:</b> ${scenario==='local'?'PC A (192.168.1.10) → Switch → PC B (192.168.1.20)':'PC A (192.168.1.10) → Switch A → Router → PC B (192.168.2.20)'}</span>
          </div>
        </div>

        <div class="control-row">
          ${button(stepIndex===0&&!isRunning?'Send Data':'Play / replay','play','primary')}
          ${button('Pause','pause')}
          ${button('Resume','resume')}
          ${button('Previous step','prev')}
          ${button('Next step','next')}
          ${button('Reset','reset')}
          ${select('Animation speed','speed',[['0.5','0.5×'],['1','1×'],['2','2×']],playback.speed)}
        </div>

        <p class="small">A conceptual network transmission demonstration. Packets follow actual network topology links hop-by-hop. Physical signals move during transmission stages; reduced-motion disables that motion.</p>
      `;
    };

    root.innerHTML=markup(step);
    reserveSimulationSpace(root,stages.map((_,i)=>markup(i)));

    const svg=root.querySelector('.transmission-diagram');
    if(svg&&current.route.length>1){
      const marker=svg.querySelector('[data-network-packet]');
      if(marker){
        const pt=packetPosition(nodes,current.route,progress);
        if(pt){marker.setAttribute('cx',pt.x);marker.setAttribute('cy',pt.y);}
      }
      if((playback.running||(!isTestEnv&&progress===0))&&!reduced){
        releaseMotion=animatePacket(svg,nodes,current.route,{
          progress,
          duration:(isTestEnv?2000:1800)/playback.speed,
          onProgress:value=>{
            progress=value;
            const pt=packetPosition(nodes,current.route,value);
            if(pt){
              const m=svg.querySelector('[data-network-packet]');
              const tag=svg.querySelector('.packet-tag');
              const tagBg=svg.querySelector('.packet-tag-bg');
              if(m){m.setAttribute('cx',pt.x);m.setAttribute('cy',pt.y);}
              if(tag){tag.setAttribute('x',pt.x);tag.setAttribute('y',pt.y-16);}
              if(tagBg){tagBg.setAttribute('x',pt.x-26);tagBg.setAttribute('y',pt.y-27);}
            }
          }
        });
      }
    }

    const scenSelect=root.querySelector('[name="scenario"]');
    if(scenSelect)scenSelect.onchange=e=>{scenario=e.target.value;step=0;progress=0;playback.reset();draw();};

    const medSelect=root.querySelector('[name="medium"]');
    if(medSelect)medSelect.onchange=e=>{medium=e.target.value;playback.pause();draw();};

    const spdSelect=root.querySelector('[name="speed"]');
    if(spdSelect)spdSelect.onchange=e=>{playback.setSpeed(e.target.value);draw();};

    root.querySelector('[data-action="prev"]').disabled=step===0;
    root.querySelector('[data-action="next"]').disabled=step===stages.length-1;

    wire(root,{
      play:()=>{progress=0;playback.replay();},
      pause:()=>{playback.pause();draw();},
      resume:()=>playback.resume(),
      prev:()=>{playback.previous();draw();},
      next:()=>{playback.next();draw();},
      reset:()=>{playback.reset();progress=0;medium='Copper Ethernet';scenario='local';playback.setSpeed(1);draw();}
    });
  }

  draw();
  return ()=>{releaseMotion();playback.dispose();};
}

export function coverage(root){
  let scope='LAN',arch='Client-server',boundary='Intranet';
  const descriptions={
    PAN:'Personal Area Network (PAN) — around one person (~10m): phone ↔ smartwatch ↔ headset. Often Bluetooth.',
    LAN:'Local Area Network (LAN) — within a single room, office, or building: workstations ↔ Ethernet switch/WAP.',
    WLAN:'Wireless Local Area Network (WLAN) — local coverage without cables using Wi-Fi radio (IEEE 802.11) via Access Points (WAPs).',
    MAN:'Metropolitan Area Network (MAN) — across a town, city, or large campus: interconnected municipal or university branch sites.',
    WAN:'Wide Area Network (WAN) — across regions, nations, or continents: campus networks joined by carrier and satellite links.'
  };
  const boundaries={
    Intranet:{title:'Intranet (Private Internal)',desc:'Strictly restricted to authorized internal members (employees, faculty, students). Behind boundary firewalls; inaccessible from the public Internet.',example:'School grade portal, internal file servers, staff payroll.'},
    Extranet:{title:'Extranet (Controlled External Access)',desc:'Securely opened to designated external partners, vendors, suppliers, or clients via encrypted tunnels (VPN) or federated credentials.',example:'Vendor inventory ordering portal, inter-university research repository.'},
    Internet:{title:'Internet (Global Public Network)',desc:'World-spanning, public, decentralized network of networks communicating via TCP/IP and global routing protocols (BGP). Untrusted boundary.',example:'Public web browsing, Wikipedia, cloud services, streaming.'}
  };
  function draw(){
    root.innerHTML=`
      <div class="control-row">
        ${select('Geographic coverage (Scope)','scope',Object.keys(descriptions).map(key=>[key,`${key} — ${{PAN:'Personal Area Network',LAN:'Local Area Network',WLAN:'Wireless Local Area Network',MAN:'Metropolitan Area Network',WAN:'Wide Area Network'}[key]}`]),scope)}
        ${select('Service architecture','arch',['Peer-to-peer','Client-server'],arch)}
        ${select('Network boundary model','boundary',Object.keys(boundaries).map(k=>[k,boundaries[k].title]),boundary)}
      </div>
      <div class="coverage-view">
        <span class="coverage-orbit">${scope}</span>
        <h2>${descriptions[scope]}</h2>
      </div>
      ${networkSVG(arch==='Client-server'?['Client A','Server (Central)','Client B']:['Peer A (Client/Server)','Peer B (Client/Server)','Peer C (Client/Server)'])}
      <div class="result-grid" style="margin-top:16px;">
        <div style="background:var(--bg-surface);padding:14px;border-radius:10px;border:1px solid var(--border-color);">
          <span style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--text-muted);display:block;margin-bottom:6px;">Architecture Model</span>
          <b style="font-size:15px;color:var(--text-primary);display:block;margin-bottom:4px;">${arch}</b>
          <p style="font-size:13px;color:var(--text-secondary);margin:0;line-height:1.5;">${arch==='Client-server'?'Dedicated server handles requests, manages authentication, and hosts shared services centrally. Highly scalable with centralized backup.':'Every computer acts as both a consumer (client) and provider (server) of resources. Low upfront cost and simple to assemble, but difficult to manage and secure at scale.'}</p>
        </div>
        <div style="background:var(--bg-surface);padding:14px;border-radius:10px;border:1px solid var(--border-color);">
          <span style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--text-muted);display:block;margin-bottom:6px;">Boundary & Access Scope</span>
          <b style="font-size:15px;color:var(--text-primary);display:block;margin-bottom:4px;">${boundaries[boundary].title}</b>
          <p style="font-size:13px;color:var(--text-secondary);margin:0 0 6px 0;line-height:1.5;">${boundaries[boundary].desc}</p>
          <small style="font-size:12px;color:var(--text-muted);display:block;"><b>Example:</b> ${boundaries[boundary].example}</small>
        </div>
      </div>
      <p class="small" style="margin-top:12px;">Geographic scope (PAN/LAN/WLAN/MAN/WAN), service architecture (P2P vs Client-Server), and access boundaries (Intranet/Extranet/Internet) are three orthogonal dimensions describing any network.</p>
    `;
    root.querySelector('[name="scope"]').onchange=e=>{scope=e.target.value;draw();};
    root.querySelector('[name="arch"]').onchange=e=>{arch=e.target.value;draw();};
    root.querySelector('[name="boundary"]').onchange=e=>{boundary=e.target.value;draw();};
  }
  draw();
}
export function topology(root){
  let kind='Star',failed=-1,dead=-1,source=1,target=4,custom=[],step=0,nodeStyle=getSavedNodeStyle();
  let releaseMotion=()=>{};

  function getModel(){
    return kind==='Build your own'
      ? {nodes:['A','B','C','D','E'],edges:custom,note:'Abstract graph builder. Add links, simulate faults, and trace paths; this is not an Ethernet loop simulation.'}
      : layouts[kind];
  }

  function getPath(model){
    if(kind==='Build your own'){
      if(source===target)return [source];
      if(source===dead||target===dead)return [];
      const queue=[[source]],seen=new Set([source]);
      while(queue.length){
        const p=queue.shift(),last=p.at(-1);
        if(last===target)return p;
        model.edges.forEach(([a,b],i)=>{
          if(i===failed||a===dead||b===dead)return;
          const next=a===last?b:b===last?a:-1;
          if(next>=0&&!seen.has(next)){
            seen.add(next);
            queue.push([...p,next]);
          }
        });
      }
      return [];
    }
    return topologyPath(kind,source,target,failed,dead);
  }

  const playback=createStepPlayback({
    length:()=>{
      const model=getModel();
      const path=getPath(model);
      return Math.max(1,path.length);
    },
    getIndex:()=>step,
    setIndex:value=>{step=value;},
    render:draw
  });

  function draw(){
    releaseMotion();
    const model=getModel();
    if(source>=model.nodes.length)source=0;
    if(target>=model.nodes.length)target=Math.min(model.nodes.length-1,4);

    const path=getPath(model);
    step=Math.max(0,Math.min(step,Math.max(0,path.length-1)));
    const visited=path.length>0?path.slice(0,step+1):[];

    const connected=reachable(model.nodes,model.edges,source,failed,dead,kind);
    const xy=topologyCoordinates(kind,model.nodes.length);

    const stepTitle=path.length===0
      ? 'No reachable path under current conditions'
      : step===path.length-1
        ? `Destination reached: ${model.nodes[target]}`
        : step===0
          ? `Source node: ${model.nodes[source]}`
          : `Hop ${step+1}: ${model.nodes[path[step]]}`;

    const stepText=path.length===0
      ? `The selected failure prevents communication between ${model.nodes[source]} and ${model.nodes[target]}. Changing addresses does not repair a disconnected physical or logical path.`
      : step===path.length-1
        ? `Successfully reached ${model.nodes[target]}. ${path.length} node(s) on shortest available path: ${path.map(i=>model.nodes[i]).join(' → ')}.`
        : `${model.nodes[path[step]]} → ${model.nodes[path[step+1]]} · Step ${step+1} of ${path.length} along the available path.`;

    const packetPos=path.length>0?xy[path[step]]:null;

    root.innerHTML=`
      <div class="control-row">
        ${select('Topology','kind',[...Object.keys(layouts),'Build your own'],kind)}
        ${select('Failed cable','failed',[[-1,'None'],...model.edges.map(([a,b],i)=>[i,`${model.nodes[a]} ↔ ${model.nodes[b]}`])],failed)}
        ${select('Failed device','dead',[[-1,'None'],...model.nodes.map((n,i)=>[i,n])],dead)}
        ${select('Node display','nodeStyle',[['symbols','Device symbols'],['boxes','Labeled boxes']],nodeStyle)}
        ${button('Reset faults','reset')}
      </div>

      <div class="control-row">
        ${select('Trace from','source',model.nodes.map((n,i)=>[i,n]),source)}
        ${select('Trace to','target',model.nodes.map((n,i)=>[i,n]),target)}
        ${button('Play trace','play','primary')}
        ${button('Pause','pause')}
        ${button('Resume','resume')}
        ${button('Previous step','prev')}
        ${button('Next step','next')}
        ${button('Reset trace','resetTrace')}
        ${select('Animation speed','speed',[['0.5','0.5×'],['1','1×'],['2','2×']],playback.speed)}
      </div>

      <svg class="topology-diagram" viewBox="0 0 800 340" role="img" aria-label="${esc(kind)} topology; path: ${esc(visited.map(i=>model.nodes[i]).join(' → ')||'No reachable path')}">
        ${topologyConnections(kind,model.edges,xy,{failed,dead,path:visited})}
        ${model.nodes.map((n,i)=>renderTopologyNode({
          x:xy[i][0],
          y:xy[i][1],
          label:n,
          style:nodeStyle,
          status:i===dead?'dead':visited.includes(i)?'connected':connected.includes(i)?'default':'unreachable',
          dataAttrs:`data-node-index="${i}" data-trace-node="${i}"`
        })).join('')}
        ${packetPos?`<circle class="packet" data-network-packet cx="${packetPos[0]}" cy="${packetPos[1]}" r="8" fill="#0d9488" stroke="#ffffff" stroke-width="2.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>`:''}
      </svg>

      <p class="callout">${model.note}</p>

      ${model.dataFlow ? `
        <div class="result-grid" style="margin: 12px 0; font-size: 13px; text-align: left;">
          <div><b>Data Movement:</b><br>${esc(model.dataFlow)}</div>
          <div><b>Practical Use:</b><br>${esc(model.example)}</div>
          <div style="grid-column: 1 / -1; margin-top: 4px;">
            <b style="color:#16a34a;">Advantages:</b> ${esc(model.pros)}<br>
            <b style="color:#dc2626;">Disadvantages:</b> ${esc(model.cons)}
          </div>
        </div>
      ` : ''}

      <div class="step-card" aria-live="polite">
        <b>Path trace · Step ${path.length?step+1:0} of ${path.length} · <span class="extra-play-state">${playback.status}</span></b>
        <h3>${esc(stepTitle)}</h3>
        <p>${esc(stepText)}</p>
        ${path.length===0?'<span class="extra-blocked" style="display:inline-block;margin-top:6px;color:#dc2626;font-weight:600;">Selected failure prevents communication between these devices.</span>':''}
      </div>

      ${result(`Reachable from ${model.nodes[source]}: ${connected.map(i=>model.nodes[i]).join(', ')||'none'}. ${model.nodes.length-connected.length} node(s) outside the source component.`,connected.length===model.nodes.length)}

      ${kind==='Build your own'?`
        <div class="control-row">
          ${select('From','from',model.nodes,'A')}
          ${select('To','to',model.nodes,'B')}
          ${button('Add connection','add','primary')}
          ${button('Clear builder','clear')}
        </div>
      `:''}
    `;

    ['kind','failed','dead','source','target','nodeStyle','speed'].forEach(n=>{
      const el=root.querySelector(`[name="${n}"]`);
      if(!el)return;
      el.onchange=e=>{
        playback.pause();
        if(n==='kind'){
          kind=e.target.value;
          failed=dead=-1;
          source=kind==='Star'?1:0;
          target=layouts[kind]?.nodes.length?layouts[kind].nodes.length-1:4;
          step=0;
        }else if(n==='failed'){
          failed=+e.target.value;
          step=0;
        }else if(n==='dead'){
          dead=+e.target.value;
          step=0;
        }else if(n==='source'){
          source=+e.target.value;
          step=0;
        }else if(n==='target'){
          target=+e.target.value;
          step=0;
        }else if(n==='nodeStyle'){
          nodeStyle=e.target.value;
          setSavedNodeStyle(nodeStyle);
        }else if(n==='speed'){
          playback.setSpeed(e.target.value);
        }
        draw();
      };
    });

    const prevBtn=root.querySelector('[data-action="prev"]');
    if(prevBtn)prevBtn.disabled=path.length===0||step===0;
    const nextBtn=root.querySelector('[data-action="next"]');
    if(nextBtn)nextBtn.disabled=path.length===0||step===path.length-1;
    const playBtn=root.querySelector('[data-action="play"]');
    if(playBtn)playBtn.disabled=path.length===0;

    wire(root,{
      reset:()=>{failed=dead=-1;step=0;playback.reset();draw();},
      resetFaults:()=>{failed=dead=-1;step=0;playback.reset();draw();},
      resetTrace:()=>{step=0;playback.reset();draw();},
      play:()=>{step=0;playback.replay();},
      pause:()=>{playback.pause();draw();},
      resume:()=>playback.resume(),
      prev:()=>{playback.previous();draw();},
      previous:()=>{playback.previous();draw();},
      next:()=>{playback.next();draw();},
      advance:()=>{playback.next();draw();},
      clear:()=>{custom=[];failed=dead=-1;step=0;playback.reset();draw();},
      add:()=>{
        const a=model.nodes.indexOf(read(root,'from')),b=model.nodes.indexOf(read(root,'to'));
        if(a!==b&&!custom.some(([x,y])=>x===a&&y===b||x===b&&y===a))custom.push([a,b]);
        step=0;
        playback.reset();
        draw();
      }
    });
  }

  draw();
  return ()=>{
    releaseMotion();
    playback.dispose();
  };
}
const devices={
  NIC:{
    desc:'A host interface card for converting digital data to signals and receiving transmissions.',
    ports:'One Ethernet RJ45 port or internal Wi-Fi radio interface.',
    layer:'Layer 1 & Layer 2 (Physical & Data Link)',
    handling:'Converts internal computer bus data into physical transmission signals; filters incoming frames by hardware MAC address.',
    diagram:['Host Computer','NIC Interface','Local Network']
  },
  Hub:{
    desc:'Legacy multiport physical layer repeater that broadcasts all incoming bits to every connected port.',
    ports:'Multiple equal shared repeater ports (typically 4–8 ports).',
    layer:'Layer 1 (Physical)',
    handling:'Receives bits on an ingress port and blindly repeats them to ALL other ports; does not learn MAC addresses; creates one shared collision domain.',
    diagram:['PC 1 (Sender)','Repeater Hub (Floods all)','PC 2 & PC 3 (Receive)']
  },
  Switch:{
    desc:'Intelligent multiport bridge that learns MAC addresses and forwards frames only to target ports.',
    ports:'LAN Ethernet ports (8, 16, 24, or 48 ports); micro-segmented per port.',
    layer:'Layer 2 (Data Link)',
    handling:'Learns source MAC addresses into its MAC table; forwards unicast frames directly to destination port; floods unknown unicast/broadcast; isolates collision domains.',
    diagram:['PC on Port 1','Layer 2 Switch','PC on Port 3']
  },
  Router:{
    desc:'Inter-network gateway that forwards IP packets between different subnets and networks.',
    ports:'LAN interfaces and separate WAN / uplink ports.',
    layer:'Layer 3 (Network)',
    handling:'Inspects destination IP address, consults its routing table, strips and reconstructs Layer 2 frames, and forwards across subnets; breaks broadcast domains.',
    diagram:['Local LAN Subnet','Router / Gateway','Remote WAN / Internet']
  },
  Modem:{
    desc:'Modulator-demodulator that converts digital network data to analog signals for ISP transmission media.',
    ports:'Provider broadband line (cable/DSL/fiber coax) and customer Ethernet interface.',
    layer:'Layer 1 & Layer 2 (Physical / Carrier Interface)',
    handling:'Modulates digital host signals into analog frequencies for telephone/cable lines, and demodulates incoming carrier signals.',
    diagram:['Home Router','Modem','ISP Central Office']
  },
  AP:{
    desc:'Wireless Access Point bridging radio-frequency wireless stations to a wired local area network.',
    ports:'Radio antennas (2.4/5/6 GHz) and wired Gigabit Ethernet uplink port.',
    layer:'Layer 2 (Data Link Bridge: 802.11 to 802.3)',
    handling:'Receives 802.11 wireless radio frames, converts them into 802.3 Ethernet frames, and injects them onto the wired local switch.',
    diagram:['Wi-Fi Laptop','Access Point','Wired LAN Switch']
  },
  Repeater:{
    desc:'Signal amplifier that regenerates incoming electrical or optical signals to extend transmission reach.',
    ports:'Input and output medium connectors.',
    layer:'Layer 1 (Physical)',
    handling:'Cleans, retimes, and amplifies signals degraded by distance and attenuation; does not inspect packet headers or filter traffic.',
    diagram:['Cable Segment A','Signal Repeater','Cable Segment B']
  },
  Bridge:{
    desc:'Two-port or multi-port link-layer device that connects and filters traffic between two LAN segments.',
    ports:'Two or more link-layer segment interfaces.',
    layer:'Layer 2 (Data Link)',
    handling:'Maintains a MAC address table to forward traffic across segments only when destination is on the opposite side, reducing congestion.',
    diagram:['LAN Segment 1','Network Bridge','LAN Segment 2']
  },
  Firewall:{
    desc:'Security enforcement boundary inspecting and filtering network traffic according to security rules.',
    ports:'Inside (trusted LAN), Outside (untrusted WAN), and optional DMZ interfaces.',
    layer:'Layers 3, 4 & 7 (Network, Transport & Application stateful filtering)',
    handling:'Evaluates IP addresses, TCP/UDP ports, and connection states; permits established sessions and drops unauthorized incoming probes.',
    diagram:['Internal Trusted Host','Stateful Firewall','External Untrusted Web']
  },
  Server:{
    desc:'High-capacity compute host running network service daemons, web servers, databases, and centralized network resources.',
    ports:'Redundant 10GbE / Gigabit Ethernet interfaces with link aggregation (NIC teaming) and dedicated IPMI management.',
    layer:'Layers 4–7 (Transport ports 80/443/53/25, Session, Presentation, Application services)',
    handling:'Listens on standardized TCP/UDP ports, processes incoming requests through service daemons, coordinates concurrent client sessions, and returns data.',
    diagram:['Client Workstation','LAN / Backbone','Enterprise Server']
  }
};

export function deviceExplorer(root){
  let name='Switch',port=1,viewMode='hardware';
  function draw(){
    const key=name.toLowerCase();
    const d=devices[name];
    root.innerHTML=`
      <div class="device-tabs">
        ${Object.keys(devices).map(n=>`<button data-device="${n}" aria-pressed="${n===name}">${n}</button>`).join('')}
      </div>

      <div class="control-row" style="margin: 12px 0 6px;">
        <button type="button" class="${viewMode==='hardware'?'primary':''}" data-view-mode="hardware">Physical Hardware View</button>
        <button type="button" class="${viewMode==='flow'?'primary':''}" data-view-mode="flow">Operational Data Flow Demonstration</button>
      </div>

      <div class="device-explorer-layout" style="margin: 14px 0;">
        <div class="device-explorer-card" style="background: white; border: 1px solid var(--border); border-radius: 12px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="eyebrow" style="font-size: 11px; font-weight: 800; color: #2563eb;">${viewMode==='hardware'?'PHYSICAL HARDWARE VIEW':'OPERATIONAL DATA FLOW DEMONSTRATION'}</span>
            <span style="font-size: 11px; color: #64748b; font-weight: 600;">${name==='AP'?'Access Point':name} Equipment</span>
          </div>
          ${viewMode==='hardware'?renderPhysicalDeviceSvg(key):renderHowItWorksSvg(key)}
          ${viewMode==='hardware'?`
          <div class="device-face" style="margin: 14px 0 0; padding: 12px;">
            <span style="font-size: 14px;">${name==='AP'?'Wi-Fi access point':name} Port Selector</span>
            <div class="ports">${Array.from({length:name==='Switch'||name==='Hub'?8:name==='Router'||name==='Server'?2:1},(_,i)=>`<button data-port="${i+1}" aria-label="Inspect ${name} port ${i+1}">${name==='Router'?(i?'WAN':'LAN'):name==='Server'?(i?'10G-2':'10G-1'):i+1}</button>`).join('')}</div>
          </div>`:''}
        </div>
      </div>

      <h2>${esc(d.desc)}</h2>
      <p><b>Hardware Interfaces:</b> ${esc(d.ports)}</p>
      
      <div class="result-grid" style="margin: 14px 0; font-size: 13px; text-align: left;">
        <div><b>OSI Layer:</b><br>${esc(d.layer)}</div>
        <div><b>Traffic Handling Behavior:</b><br>${esc(d.handling)}</div>
      </div>

      <p class="callout">Port ${port} selected. ${name==='Switch'?'Known destination on port 3: frame forwards to port 3. Unknown destination: flood other LAN ports.':name==='Router'?'Packet to a remote subnet: consult routing table and forward through the appropriate interface.':name==='Hub'?'Bits received on this port repeat out the other ports.':'Inspect the actual model’s labels; this is a schematic, not a product photograph.'}</p>
      ${networkSVG(d.diagram, port > 1 ? 2 : 0)}

      <details style="margin-top: 14px;">
        <summary><b>Traffic Forwarding Comparison: Hub vs Switch vs Router vs Access Point</b></summary>
        <div style="margin-top: 10px; font-size: 13px; line-height: 1.6; color: #475569;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border);">
                <th style="padding: 6px 8px;">Device</th>
                <th style="padding: 6px 8px;">OSI Layer</th>
                <th style="padding: 6px 8px;">Forwarding Basis</th>
                <th style="padding: 6px 8px;">Collision Domains</th>
                <th style="padding: 6px 8px;">Broadcast Domains</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding: 6px 8px;"><b>Hub</b></td>
                <td style="padding: 6px 8px;">Layer 1 (Physical)</td>
                <td style="padding: 6px 8px;">Electrical repetition (Floods all)</td>
                <td style="padding: 6px 8px;">1 shared collision domain</td>
                <td style="padding: 6px 8px;">1 broadcast domain</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding: 6px 8px;"><b>Switch</b></td>
                <td style="padding: 6px 8px;">Layer 2 (Data Link)</td>
                <td style="padding: 6px 8px;">MAC Address Table</td>
                <td style="padding: 6px 8px;">1 per port (Isolated)</td>
                <td style="padding: 6px 8px;">1 per VLAN / subnet</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding: 6px 8px;"><b>Router</b></td>
                <td style="padding: 6px 8px;">Layer 3 (Network)</td>
                <td style="padding: 6px 8px;">IP Routing Table</td>
                <td style="padding: 6px 8px;">1 per port (Isolated)</td>
                <td style="padding: 6px 8px;">1 per subnet (Breaks broadcasts)</td>
              </tr>
              <tr>
                <td style="padding: 6px 8px;"><b>Access Point</b></td>
                <td style="padding: 6px 8px;">Layer 2 (Bridge)</td>
                <td style="padding: 6px 8px;">802.11 Radio ↔ 802.3 Ethernet</td>
                <td style="padding: 6px 8px;">Shared airtime domain</td>
                <td style="padding: 6px 8px;">Bridges into wired LAN domain</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    `;

    root.querySelectorAll('[data-device]').forEach(b=>b.onclick=()=>{
      name=b.dataset.device;
      port=1;
      draw();
    });
    root.querySelectorAll('[data-view-mode]').forEach(b=>b.onclick=()=>{
      viewMode=b.dataset.viewMode;
      draw();
    });
    root.querySelectorAll('[data-port]').forEach(b=>b.onclick=()=>{
      port=+b.dataset.port;
      draw();
    });
  }
  draw();
}
const layers=[['Application','User-facing protocol services','HTTP, DNS; TCP/IP Application'],['Presentation','Representation, encoding, encryption concepts','Text encoding, data representation; TCP/IP Application'],['Session','Dialog/session management concepts','Session coordination; TCP/IP Application'],['Transport','Process-to-process delivery','TCP segments, UDP datagrams; TCP/IP Transport'],['Network','Logical addressing and routing','IPv4 / IPv6 packets; TCP/IP Internet'],['Data Link','Local frames and media access','Ethernet frames, MAC; TCP/IP Link'],['Physical','Signals and bit transmission','Copper electrical signals, fiber light, radio; TCP/IP Link']];
export function osi(root){let layer=0,step=0,transport='TCP';const wraps=['Application data','TCP header + data (segment)','IP header + segment (packet)','Ethernet header + packet + trailer (frame)','Signals on the medium','Receiver removes link framing','Receiver processes IP and transport','Application receives data'];function draw(){root.innerHTML=`<div class="osi-grid"><div>${layers.map((l,i)=>`<button data-layer="${i}" aria-pressed="${i===layer}"><b>${7-i}</b> ${l[0]}</button>`).join('')}</div><div><span class="eyebrow">OSI ${7-layer} · ${layers[layer][0]}</span><h2>${layers[layer][1]}</h2><p>${layers[layer][2]}</p><p class="callout">Conceptual models organize responsibilities. Protocol implementations need not perform seven literal separate steps.</p></div></div><div class="step-card" aria-live="polite"><b>Encapsulation journey · ${step+1}/8</b><p>${wraps[step]}</p></div><div class="control-row">${button('Previous step','prev')}${button(step===7?'Replay':'Next step','next','primary')}${select('Transport loss demonstration','transport',['TCP','UDP'],transport)}${button('Lose data unit 2','loss')}</div><div id="loss"></div>`;root.querySelector('[name="transport"]').onchange=e=>{transport=e.target.value;};root.querySelectorAll('[data-layer]').forEach(b=>b.onclick=()=>{layer=+b.dataset.layer;draw();});wire(root,{prev:()=>{step=Math.max(0,step-1);draw();},next:()=>{step=(step+1)%8;draw();},loss:()=>root.querySelector('#loss').innerHTML=result(read(root,'transport')==='TCP'?'Units 1 and 3 arrive. TCP detects missing bytes through acknowledgment/sequence behavior and retransmits; the application receives ordered bytes.':'Datagrams 1 and 3 arrive. UDP itself neither retransmits datagram 2 nor restores ordering. The application decides how to handle the loss.')});}draw();}
const media={
  UTP:['Four unshielded twisted copper pairs in a PVC/LSZH jacket.','Cat 5e (1 Gb/s at 100 m), Cat 6 (10 Gb/s at 55 m), Cat 6A (10 Gb/s at 100 m).','#d97706'],
  STP:['Twisted pairs with foil/braided shielding (F/UTP, S/FTP); protects against severe EMI.','Used in industrial, electrical, and data center pathways with proper grounding.','#64748b'],
  Fiber:['Ultra-pure glass core and cladding transmitting modulated light pulses.','Single-mode (laser, 40+ km) and Multimode (LED/VCSEL, 300–550 m); complete immunity to EMI.','#0d9488'],
  Coaxial:['Central copper conductor, dielectric insulator, metallic shield, and outer jacket.','Broadband cable TV/DOCSIS internet and legacy 10BASE2/10BASE5 bus networks.','#2563eb'],
  Wireless:['Radio frequency electromagnetic waves over 2.4 GHz, 5 GHz, and 6 GHz spectrum bands.','Enables user mobility; subject to path loss, solid obstacles, and shared-medium contention.','#8b5cf6']
};

function renderSignalingSvg(mediumName) {
  if (mediumName === 'UTP' || mediumName === 'STP') {
    return `
      <svg class="network-diagram signaling-diagram" viewBox="0 0 600 90" role="img" aria-label="Copper differential electrical signaling">
        <rect x="0" y="0" width="600" height="90" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="14" y="20" font-size="10" font-weight="700" fill="#1e293b">Copper Differential Electrical Signaling (Tx+ / Tx-)</text>
        <path d="M 60 40 H 120 V 28 H 180 V 40 H 240 V 28 H 300 V 40 H 360 V 28 H 420 V 40 H 540" fill="none" stroke="#2563eb" stroke-width="2.5"/>
        <text x="548" y="38" font-size="9" font-weight="700" fill="#2563eb">+V (Data)</text>
        <path d="M 60 62 H 120 V 74 H 180 V 62 H 240 V 74 H 300 V 62 H 360 V 74 H 420 V 62 H 540" fill="none" stroke="#ea580c" stroke-width="2.5"/>
        <text x="548" y="72" font-size="9" font-weight="700" fill="#ea580c">-V (Inverse)</text>
        <text x="300" y="82" font-size="9" fill="#64748b" text-anchor="middle">Noise cancellation: Differential receiver computes (+V) - (-V), eliminating coupled EMI noise.</text>
      </svg>
    `;
  }
  if (mediumName === 'Fiber') {
    return `
      <svg class="network-diagram signaling-diagram" viewBox="0 0 600 90" role="img" aria-label="Fiber-optic total internal reflection light signaling">
        <rect x="0" y="0" width="600" height="90" rx="8" fill="#0f172a" stroke="#334155"/>
        <text x="14" y="20" font-size="10" font-weight="700" fill="#38bdf8">Optical Signaling: Total Internal Reflection in Glass Core</text>
        <rect x="50" y="32" width="500" height="38" rx="2" fill="#1e293b" stroke="#0284c7" stroke-dasharray="4 2"/>
        <path d="M 50 51 L 110 35 L 190 67 L 270 35 L 350 67 L 430 35 L 510 67 L 550 51" fill="none" stroke="#22d3ee" stroke-width="3" stroke-linecap="round"/>
        <circle cx="110" cy="35" r="4" fill="#67e8f9"/>
        <circle cx="270" cy="35" r="4" fill="#67e8f9"/>
        <circle cx="430" cy="35" r="4" fill="#67e8f9"/>
        <text x="300" y="83" font-size="9" fill="#94a3b8" text-anchor="middle">Immune to EMI/RFI: Modulated photon pulses travel via critical-angle reflection at ~200,000 km/s in silica.</text>
      </svg>
    `;
  }
  if (mediumName === 'Wireless') {
    return `
      <svg class="network-diagram signaling-diagram" viewBox="0 0 600 90" role="img" aria-label="Wireless RF electromagnetic wave propagation">
        <rect x="0" y="0" width="600" height="90" rx="8" fill="#faf5ff" stroke="#e9d5ff"/>
        <text x="14" y="20" font-size="10" font-weight="700" fill="#7e22ce">Radio Frequency (RF) Electromagnetic Wave Propagation (2.4 / 5 / 6 GHz)</text>
        <path d="M 70 70 V 42 M 62 42 L 70 32 L 78 42" stroke="#7e22ce" stroke-width="2.5" fill="none"/>
        <path d="M 90 42 A 20 20 0 0 1 90 62" stroke="#a855f7" stroke-width="2.5" fill="none"/>
        <path d="M 115 36 A 35 35 0 0 1 115 68" stroke="#c084fc" stroke-width="2.5" fill="none"/>
        <path d="M 145 28 A 55 55 0 0 1 145 76" stroke="#d8b4fe" stroke-width="2.5" fill="none"/>
        <path d="M 180 20 A 75 75 0 0 1 180 84" stroke="#e9d5ff" stroke-width="2.5" fill="none"/>
        <path d="M 520 70 V 42 M 512 42 L 520 32 L 528 42" stroke="#7e22ce" stroke-width="2.5" fill="none"/>
        <text x="300" y="83" font-size="9" fill="#6b21a8" text-anchor="middle">Shared airtime medium: RF signals propagate spherically through space; subject to path loss and obstacles.</text>
      </svg>
    `;
  }
  return `
    <svg class="network-diagram signaling-diagram" viewBox="0 0 600 90" role="img" aria-label="Coaxial shielded high-frequency transmission">
      <rect x="0" y="0" width="600" height="90" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="14" y="20" font-size="10" font-weight="700" fill="#1e293b">Coaxial RF Transmission: Shielded Single Center Conductor</text>
      <rect x="50" y="32" width="500" height="38" rx="4" fill="#334155" stroke="#1e293b"/>
      <rect x="54" y="38" width="492" height="26" fill="#e2e8f0"/>
      <line x1="54" y1="51" x2="546" y2="51" stroke="#ea580c" stroke-width="5"/>
      <text x="300" y="83" font-size="9" fill="#475569" text-anchor="middle">Outer metallic braid shield reflects external interference; center copper conductor carries high-bandwidth RF.</text>
    </svg>
  `;
}

export function mediaExplorer(root){let name='UTP',tool=0;const steps=['Stripper: adjust to jacket thickness; remove only the required jacket (approx. 20–25 mm) without nicking or cutting insulated conductors.','Crimper: insert a fully seated 8P8C modular plug and compress using the proper die; keep fingers clear.','Tester: connect main and remote units; compare all conductor paths 1 through 8, then identify open, short, or crossed faults.','Punch-down tool: seat the conductor in a compatible IDC slot with the cutting blade facing the waste side.'];
function draw(){
  const isTwisted = name==='UTP'||name==='STP';
  const isWireless = name==='Wireless';
  const svgContent = isTwisted
    ? `<circle cx="120" cy="100" r="85" fill="#e2e8f0" stroke="#475569" stroke-width="5"/>${[[85,65],[150,65],[85,135],[150,135]].map(([x,y],i)=>`<g><circle cx="${x}" cy="${y}" r="25" fill="white" stroke="${['#16a34a','#ea580c','#2563eb','#92400e'][i]}" stroke-width="7"/><circle cx="${x+10}" cy="${y+8}" r="10" fill="${['#16a34a','#ea580c','#2563eb','#92400e'][i]}"/></g>`).join('')}`
    : isWireless
    ? `<circle cx="120" cy="100" r="85" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="3"/><circle cx="120" cy="100" r="65" fill="none" stroke="#8b5cf6" stroke-width="3" stroke-dasharray="8 6"/><circle cx="120" cy="100" r="40" fill="none" stroke="#8b5cf6" stroke-width="4" stroke-dasharray="6 4"/><circle cx="120" cy="100" r="18" fill="#8b5cf6"/><path d="M120 30 L120 170 M50 100 L190 100" stroke="#c4b5fd" stroke-width="2" stroke-dasharray="4 4"/>`
    : `<circle cx="120" cy="100" r="85" fill="#e2e8f0" stroke="#475569" stroke-width="5"/><circle cx="120" cy="100" r="57" fill="white" stroke="${media[name][2]}" stroke-width="13"/><circle cx="120" cy="100" r="20" fill="${media[name][2]}"/>`;

  root.innerHTML=`
    ${select('Cable or transmission medium','media',Object.keys(media),name)}
    <div class="media-section">
      <svg viewBox="0 0 240 200" role="img" aria-label="${name} schematic cross-section">${svgContent}</svg>
      <div>
        <h2>${name}</h2>
        <p>${media[name][0]}</p>
        <p>${media[name][1]}</p>
      </div>
    </div>

    <div style="margin: 14px 0;">
      ${renderSignalingSvg(name)}
    </div>

    <div class="step-card">
      <b>Installation tool walkthrough · ${tool+1}/4</b>
      <p>${steps[tool]}</p>
    </div>
    <div class="control-row">
      ${button('Previous tool','prev')}
      ${button('Next tool','next')}
    </div>

    <details style="margin-top: 14px;">
      <summary><b>Media Characteristics & Category Reference Guide</b></summary>
      <div style="margin-top: 10px; font-size: 13px; line-height: 1.6; color: #475569;">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border);">
              <th style="padding: 6px 8px;">Medium / Category</th>
              <th style="padding: 6px 8px;">Max Speed</th>
              <th style="padding: 6px 8px;">Max Distance</th>
              <th style="padding: 6px 8px;">EMI Immunity</th>
              <th style="padding: 6px 8px;">Primary Application</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 6px 8px;"><b>Cat 5e UTP</b></td>
              <td style="padding: 6px 8px;">1 Gb/s (1000BASE-T)</td>
              <td style="padding: 6px 8px;">100 meters</td>
              <td style="padding: 6px 8px;">Moderate (Twisted pair cancellation)</td>
              <td style="padding: 6px 8px;">Standard desktop office drops</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 6px 8px;"><b>Cat 6 UTP</b></td>
              <td style="padding: 6px 8px;">10 Gb/s (up to 55m)</td>
              <td style="padding: 6px 8px;">100m (1 Gb/s), 55m (10 Gb/s)</td>
              <td style="padding: 6px 8px;">High (Tighter pair twists)</td>
              <td style="padding: 6px 8px;">Modern commercial Gigabit installations</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 6px 8px;"><b>Cat 6A UTP/STP</b></td>
              <td style="padding: 6px 8px;">10 Gb/s (10GBASE-T)</td>
              <td style="padding: 6px 8px;">100 meters full reach</td>
              <td style="padding: 6px 8px;">Very High (Alien crosstalk shield)</td>
              <td style="padding: 6px 8px;">Data centers, switch uplinks, PoE+</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 6px 8px;"><b>Single-mode Fiber</b></td>
              <td style="padding: 6px 8px;">100+ Gb/s</td>
              <td style="padding: 6px 8px;">Up to 40+ kilometers</td>
              <td style="padding: 6px 8px;">Total (Optically isolated)</td>
              <td style="padding: 6px 8px;">Campus backbones, WAN, telecommunications</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 6px 8px;"><b>Multimode Fiber</b></td>
              <td style="padding: 6px 8px;">10–40 Gb/s</td>
              <td style="padding: 6px 8px;">300–550 meters</td>
              <td style="padding: 6px 8px;">Total (Optically isolated)</td>
              <td style="padding: 6px 8px;">Intra-building server room backbones</td>
            </tr>
            <tr>
              <td style="padding: 6px 8px;"><b>Wi-Fi (802.11ax/be)</b></td>
              <td style="padding: 6px 8px;">Up to 9.6 Gb/s shared</td>
              <td style="padding: 6px 8px;">30–50 meters indoor</td>
              <td style="padding: 6px 8px;">Susceptible to RF noise & walls</td>
              <td style="padding: 6px 8px;">Mobile client access, laptops, smartphones</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
    <p class="callout">A suitable fiber link with matching transceivers can meet a 180 m building path; a standard 100 m copper channel cannot span it directly.</p>
  `;

  root.querySelector('[name="media"]').onchange=e=>{name=e.target.value;draw();};
  wire(root,{
    prev:()=>{tool=Math.max(0,tool-1);draw();},
    next:()=>{tool=(tool+1)%4;draw();}
  });
}
draw();}
