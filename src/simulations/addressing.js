import {esc,button,input,select,result,wire,read} from '../components/ui.js';
import {reserveSimulationSpace} from '../components/simulationSpace.js';
import {subnet,classify,T568A,T568B,cableTest,ipv4} from '../utils/network.js';
import {createStepPlayback,playbackBar,syncPlaybackRow} from './playback.js';
import {renderSubnetDrill} from './subnetDrill.js';

const colors={'Green':'#15803d','Orange':'#c2410c','Blue':'#1d4ed8','Brown':'#92400e'};

export function cable(root){
 let standard='B',ends=[Array(8).fill(''),Array(8).fill('')],step=0;
 let message='Select conductors at both ends, then inspect the calculated paths.';
 let wireMapHtml='';
 const stages=[
  'Cut cable cleanly and strip the jacket carefully (approx. 20–25 mm).',
  'Untwist pairs and arrange conductors according to the selected standard. Preserve pair twists near termination.',
  'Trim conductors evenly to approx. 12 mm; insert contacts facing you, latch behind, cable down.',
  'Inspect through transparent housing: all 8 conductors must reach the end, jacket clamped under strain relief.',
  'Crimp using an 8P8C crimping tool with steady pressure; keep fingers clear of jaws.',
  'Connect both ends to a wire-map LAN tester and record the pin-to-pin continuity results.'
 ];
 const playback=createStepPlayback({length:()=>stages.length,getIndex:()=>step,setIndex:n=>{step=n;},render:draw});

 function draw(){
  const markup=s=>`
   <div class="control-row">
    ${select('Reference standard','standard',['A','B'],standard)}
    ${button('Load reference at end 1','load1')}
    ${button('Load reference at end 2','load2')}
    ${button('Clear both ends','clear')}
   </div>

   <div class="presets-row">
    <span class="presets-label">Wiring presets:</span>
    <div class="presets">
     <button type="button" data-preset="b-straight">T568B Straight</button>
     <button type="button" data-preset="a-straight">T568A Straight</button>
     <button type="button" data-preset="crossover">Crossover (A–B)</button>
     <button type="button" data-preset="rollover">Rollover</button>
     <button type="button" data-preset="open3">Open (Pin 3)</button>
     <button type="button" data-preset="short12">Short (Pins 1–2)</button>
    </div>
   </div>

   <p class="small"><b>Front contact view:</b> contacts face you, latch behind, cable enters downward. Pin 1 is left. Reference T568${standard}: ${(standard==='A'?T568A:T568B).join(' · ')}</p>

   <div class="sim-workbench-grid">
    <div class="sim-visual-panel">
     <div class="cable-ends">
      ${ends.map((end,e)=>`
       <fieldset>
        <legend>End ${e+1} · 8P8C contact view</legend>
        <div class="connector">
         ${end.map((w,i)=>`
          <label class="pin">
           <b>${i+1}</b>
           <span class="wire-color" style="background:${w.startsWith('White')?`repeating-linear-gradient(45deg,white,white 6px,${colors[w.split('/')[1]]} 6px,${colors[w.split('/')[1]]} 10px)`:colors[w]||'#e2e8f0'}"></span>
           <select aria-label="End ${e+1} pin ${i+1}" id="end-${e+1}-pin-${i+1}" name="end-${e+1}-pin-${i+1}" data-end="${e}" data-pin="${i}">
            <option value="">Open</option>
            ${T568B.map(c=>`<option ${w===c?'selected':''}>${c}</option>`).join('')}
           </select>
          </label>
         `).join('')}
        </div>
       </fieldset>
      `).join('')}
     </div>
     <div class="control-row">
      ${button('Validate color order','validate')}
      ${button('Run continuity test','test','primary')}
      ${button('Create an open at end 2 pin 1','open')}
      ${button('Create short at end 2 pins 1–2','short')}
     </div>
    </div>
    <div class="sim-details-panel">
     <div class="feedback" role="status">${esc(message)}</div>
     <div id="wire-map">${wireMapHtml}</div>
     <div class="step-card">
      <b>Crimping sequence · ${s+1}/6 · ${playback.status}</b>
      <p>${stages[s]}</p>
     </div>
    </div>
   </div>

   ${playbackBar(playback)}
  `;
  root.innerHTML=markup(step);
  const testedVariant=root.cloneNode(true);
  const testedMap=testedVariant.querySelector('#wire-map');
  if(testedMap&&!wireMapHtml)testedMap.innerHTML='<div class="wire-map-results"><div class="wire-map"><span>End 1 pin 1 &rarr; 1</span></div><div class="lan-tester-visual" style="margin:14px 0;height:210px;padding:14px;"></div></div>';
  reserveSimulationSpace(root,[...stages.map((_,idx)=>markup(idx)),testedVariant.innerHTML]);
  root.querySelector('[name="speed"]').onchange=e=>playback.setSpeed(e.target.value);
  syncPlaybackRow(root,playback);

  // Wire select changes
  root.querySelectorAll('[data-end]').forEach(s=>{
   s.onchange=()=>{
    ends[+s.dataset.end][+s.dataset.pin]=s.value;
    const color=s.value.startsWith('White')?`repeating-linear-gradient(45deg,white,white 6px,${colors[s.value.split('/')[1]]} 6px,${colors[s.value.split('/')[1]]} 10px)`:colors[s.value]||'#e2e8f0';
    s.closest('.pin').querySelector('.wire-color').style.background=color;
    draw();
   };
  });

  // Standard select
  root.querySelector('[name="standard"]').onchange=e=>{
   standard=e.target.value;
   draw();
  };

  // Preset buttons
  root.querySelectorAll('[data-preset]').forEach(btn=>{
   btn.onclick=()=>{
    const p=btn.dataset.preset;
    if(p==='b-straight'){ends[0]=[...T568B];ends[1]=[...T568B];message='T568B Straight-Through preset applied at both ends.';}
    else if(p==='a-straight'){ends[0]=[...T568A];ends[1]=[...T568A];message='T568A Straight-Through preset applied at both ends.';}
    else if(p==='crossover'){ends[0]=[...T568A];ends[1]=[...T568B];message='Crossover preset: End 1 is T568A, End 2 is T568B.';}
    else if(p==='rollover'){ends[0]=[...T568B];ends[1]=[...T568B].reverse();message='Rollover / Cisco Console preset loaded: pins 1 through 8 are reversed (1->8, 2->7...).';}
    else if(p==='open3'){ends[0]=[...T568B];ends[1]=[...T568B];ends[1][2]='';message='Open Fault preset: End 2 Pin 3 (White/Green) is disconnected.';}
    else if(p==='short12'){ends[0]=[...T568B];ends[1]=[...T568B];ends[1][1]=ends[1][0];message='Short Circuit preset: End 2 pins 1 and 2 bridged together.';}
    draw();
   };
  });

  wire(root,{
   load1:()=>{ends[0]=[...(standard==='A'?T568A:T568B)];message='End 1 loaded. Inspect all eight labels before testing.';draw();},
   load2:()=>{ends[1]=[...(standard==='A'?T568A:T568B)];message='End 2 loaded. Test both ends together.';draw();},
   clear:()=>{wireMapHtml='';ends=[Array(8).fill(''),Array(8).fill('')];step=0;playback.reset();message='Both ends cleared; select a reference standard to demonstrate termination.';draw();},
   reset:()=>{wireMapHtml='';ends=[Array(8).fill(''),Array(8).fill('')];step=0;playback.reset();message='Both ends cleared; select a reference standard to demonstrate termination.';draw();},
   validate:()=>{
    const ref=standard==='A'?T568A:T568B;
    message=ends.flatMap((end,e)=>end.flatMap((w,i)=>w===ref[i]?[]:[`End ${e+1}, pin ${i+1}: expected ${ref[i]}, found ${w||'open'}.`])).join(' ')||`Both ends correctly follow T568${standard}.`;
    draw();
   },
    test:()=>{
     const t=cableTest(...ends);
     message=t.text;
     wireMapHtml=`
      <div class="wire-map-results">
       <div class="wire-map">
        ${t.mapping.map((pins,i)=>{
         const isOk=pins.length===1&&pins[0]===i+1;
         const isOpen=!pins.length;
         const isShort=pins.length>1;
         const cls=isOpen?'wire-open':isShort?'wire-short':isOk?'wire-pass':'wire-swapped';
         return `<span class="${cls}">End 1 pin ${i+1} &rarr; ${pins.length?pins.join(', '):'OPEN'}</span>`;
        }).join('')}
       </div>
       <div class="lan-tester-visual" style="margin: 14px 0; background: var(--bg-surface, #f8fafc); border: 1px solid var(--border-color, #cbd5e1); border-radius: 10px; padding: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <span style="font-size: 11px; font-weight: 800; color: #2563eb; text-transform: uppercase;">Hardware Wire-Map LAN Cable Tester (Sequential 1→8 Scan)</span>
          <span style="font-size: 11px; font-weight: 700; color: ${t.pass ? '#16a34a' : '#dc2626'};">${t.pass ? 'PASS (1-to-1 Straight)' : 'FAIL / FAULT DETECTED'}</span>
        </div>
        <div style="display: flex; gap: 20px; justify-content: center; align-items: stretch; flex-wrap: wrap;">
          <div style="background: #1e293b; color: white; border-radius: 8px; padding: 12px; width: 155px; text-align: center;">
            <b style="font-size: 11px; color: #94a3b8; display: block; margin-bottom: 8px;">MASTER UNIT (TX 1→8)</b>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
              ${[1,2,3,4,5,6,7,8].map((p, idx) => `
                <div class="tester-pin-row" style="display: flex; align-items: center; gap: 6px; font-size: 11px; animation-delay: ${idx * 0.14}s;">
                  <span class="tester-led led-pass" style="width: 10px; height: 10px; border-radius: 50%; background: #22c55e; display: inline-block; box-shadow: 0 0 5px #22c55e; animation-delay: ${idx * 0.14}s;"></span>
                  <span>Pin ${p}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: 11px; color: #64748b;">
            <span>4-Pair UTP/STP</span>
            <div class="tester-pulse-bar" style="width: 84px; height: 5px; background: linear-gradient(90deg, #2563eb, #0d9488); margin: 5px 0; border-radius: 3px;"></div>
            <span>Sequential Pulse</span>
          </div>
          <div style="background: #1e293b; color: white; border-radius: 8px; padding: 12px; width: 165px; text-align: center;">
            <b style="font-size: 11px; color: #94a3b8; display: block; margin-bottom: 8px;">REMOTE UNIT (RX 1→8)</b>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
              ${t.mapping.map((pins, i) => {
                const isOk = pins.length === 1 && pins[0] === i + 1;
                const isOpen = !pins.length;
                const isShort = pins.length > 1;
                const ledColor = isOpen ? '#64748b' : isShort ? '#ef4444' : isOk ? '#22c55e' : '#f59e0b';
                const glow = isOpen ? 'none' : `0 0 5px ${ledColor}`;
                return `
                  <div class="tester-pin-row" style="display: flex; align-items: center; gap: 6px; font-size: 11px; animation-delay: ${i * 0.14}s;">
                    <span class="tester-led" style="width: 10px; height: 10px; border-radius: 50%; background: ${ledColor}; display: inline-block; box-shadow: ${glow}; animation-delay: ${i * 0.14}s;"></span>
                    <span>Pin ${i+1}${isOpen ? ' (Open)' : isShort ? ' (Short)' : !isOk ? ` (Pin ${pins[0]})` : ''}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
       </div>
      </div>
     `;
     draw();
    },
   open:()=>{ends[1][0]='';message='End 2 pin 1 disconnected. Run the tester to trace the missing path.';draw();},
   short:()=>{ends[1][1]=ends[1][0]||'Orange';ends[1][0]=ends[1][1];message='End 2 pins 1 and 2 share one conductor. Run the tester.';draw();},
   play:()=>{playback.play();},
   pause:()=>{playback.pause();draw();},
   resume:()=>{playback.resume();},
   stop:()=>{step=0;playback.stop();draw();}
  });
 }

 draw();
 return ()=>playback.dispose();
}

export function addressExplorer(root,isSubnet=false){
 let ip=isSubnet?'192.168.10.70':'192.168.1.10',prefix=26,octet=192,activeTab='calc';

 function render(){
  if(isSubnet){
   root.innerHTML=`<div class="drill-tab-switcher"><button type="button" class="tab-btn ${activeTab==='calc'?'active':''}" data-tab="calc">Subnet Calculator</button><button type="button" class="tab-btn ${activeTab==='drill'?'active':''}" data-tab="drill">Practice Problem Generator</button></div><div id="subnet-tab-pane"></div>`;
   root.querySelectorAll('.tab-btn').forEach(b=>{
    b.onclick=()=>{
     activeTab=b.dataset.tab;
     render();
    };
   });
   const pane=root.querySelector('#subnet-tab-pane');
   if(activeTab==='drill'){
    renderSubnetDrill(pane);
    return;
   }
   drawSubnetCalculator(pane);
  } else {
   drawAddressExplorer(root);
  }
 }

 function drawAddressExplorer(target){
  const presets=['192.168.1.10','10.0.0.1','172.16.5.20','127.0.0.1','8.8.8.8'];
  target.innerHTML=`
   <div class="sim-workbench-grid">
    <div class="sim-visual-panel">
     <form class="control-row" id="inspect-address">
      ${input('IPv4 address','ip',ip)}
      <button class="primary" type="submit">Inspect Address</button>
     </form>
     <div class="presets">
      <span class="presets-label">Quick examples:</span>
      ${presets.map(p=>`<button type="button" data-ip="${p}">${p}</button>`).join('')}
     </div>
     <div id="address-display" aria-live="polite"></div>
    </div>
    <div class="sim-details-panel">
     <div class="octet-demonstration">
      <h3>Binary octet viewer</h3>
      <p>Toggle bits to show how enabled weights sum to the decimal value.</p>
      <div id="bits"></div>
     </div>
    </div>
   </div>
  `;

  function inspect(){
   ip=read(target,'ip');
   try{
    ipv4(ip);
    const octets=ip.split('.').map(Number);
    const bins=octets.map(o=>o.toString(2).padStart(8,'0'));
    const classification=classify(ip);

    target.querySelector('#address-display').innerHTML=`
     <div class="feedback">${esc(classification)}</div>
     <div class="binary" aria-label="32-bit binary representation">
      ${bins.map((b,idx)=>`<span style="margin:0 4px;" title="Octet ${idx+1}: ${octets[idx]}">${b}</span>`).join(' . ')}
     </div>
     <p class="small">32 bits total · Four 8-bit octets</p>
     <div class="result-grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr));">
      ${octets.map((val,idx)=>{
       const weights=[128,64,32,16,8,4,2,1].filter(w=>val&w).join(' + ')||'0';
       return `<div><span>Octet ${idx+1}</span><b>${val}</b><code style="font-size:12px;color:var(--text-muted);">${bins[idx]}</code><small style="display:block;margin-top:4px;font-size:11px;color:var(--text-secondary);">${weights} = ${val}</small></div>`;
      }).join('')}
     </div>
     <details style="margin-top:12px;">
      <summary>Why four 8-bit octets?</summary>
      <p style="margin-top:8px;font-size:14px;color:var(--text-secondary);line-height:1.5;">An IPv4 address has exactly 32 bits divided into four 8-bit bytes (octets). Each octet ranges from 0 (<code>00000000</code>) to 255 (<code>11111111</code>). Together, they provide over 4.29 billion unique addresses.</p>
     </details>
    `;
   }catch(e){
    target.querySelector('#address-display').innerHTML=result(e.message,false);
   }
  }

  target.querySelector('form').onsubmit=e=>{e.preventDefault();inspect();};
  target.querySelectorAll('[data-ip]').forEach(b=>b.onclick=()=>{
   target.querySelector('[name="ip"]').value=b.dataset.ip;
   inspect();
  });

  const bits=target.querySelector('#bits');
  function drawBits(){
   bits.innerHTML=`<div class="bit-row">${[128,64,32,16,8,4,2,1].map(w=>`<button type="button" data-weight="${w}" aria-pressed="${!!(octet&w)}"><b>${octet&w?1:0}</b><small>${w}</small></button>`).join('')}</div><h2>${octet.toString(2).padStart(8,'0')} = ${octet}</h2>`;
   bits.querySelectorAll('button').forEach(b=>b.onclick=()=>{octet^=+b.dataset.weight;drawBits();});
  }
  drawBits();
  inspect();
 }

 function drawSubnetCalculator(target){
  target.innerHTML=`<form class="control-row" id="calculate">${input('IPv4 address','ip',ip)}${input('CIDR prefix (0–32)','prefix',prefix,'number')}<button class="primary" type="submit">Calculate</button></form><div class="cidr-slider-row"><label for="cidr-range" class="cidr-slider-label">Interactive Bit-Boundary Slider: <strong id="cidr-slider-val">/${prefix}</strong></label><input type="range" id="cidr-range" min="8" max="32" value="${Math.max(8,Math.min(32,Number(prefix)||24))}" class="cidr-range-input" aria-label="Drag to adjust CIDR prefix boundary"></div><div class="presets">${[24,25,26,27,28,30,31,32].map(p=>`<button type="button" data-prefix="${p}">/${p}</button>`).join('')}</div><div id="calculation" aria-live="polite"></div>`;

  function calculate(){
   ip=read(target,'ip');prefix=read(target,'prefix');
   const slider=target.querySelector('#cidr-range');
   const sliderLabel=target.querySelector('#cidr-slider-val');
   if(slider&&!Number.isNaN(Number(prefix)))slider.value=String(Math.max(8,Math.min(32,Number(prefix))));
   if(sliderLabel)sliderLabel.textContent=`/${prefix}`;
   try{
    const s=subnet(ip,prefix);
    const netPct=Math.round((s.prefix/32)*100);
    target.querySelector('#calculation').innerHTML=`<div class="sim-workbench-grid"><div class="sim-visual-panel"><div class="feedback">${esc(classify(ip))}</div><div class="bit-split-bar" aria-label="Proportional 32-bit network and host split"><div class="bit-split-net" style="width:${netPct}%">Network: ${s.prefix} bits</div><div class="bit-split-host" style="width:${100-netPct}%">Host: ${32-s.prefix} bits</div></div><div class="binary" aria-label="Network and host binary sections"><span>${s.binary.slice(0,s.prefix)}</span><span class="bit-boundary-marker" aria-hidden="true">|</span><strong>${s.binary.slice(s.prefix)}</strong></div><p class="small">Blue: ${s.prefix} network bit${s.prefix===1?'':'s'} · Teal: ${32-s.prefix} host bit${32-s.prefix===1?'':'s'}</p><details><summary>Explain the calculation</summary><ol><li>Keep ${s.prefix} bits for the network; ${32-s.prefix} bits remain.</li><li>Block size = 2^${32-s.prefix} = ${s.total} addresses.</li><li>Round the numeric input down to its block boundary: ${s.network}.</li><li>${s.prefix<31?`Last address is broadcast ${s.broadcast}; remove the two endpoints for ${s.usable} usable hosts.`:'This prefix uses its special convention; do not subtract two.'}</li></ol></details></div><div class="sim-details-panel"><div class="result-grid">${Object.entries({'Subnet mask':s.mask,'Network address':s.network,'Broadcast':s.broadcast||'Not applicable','Total addresses':s.total,'Usable addresses':s.usable,'First usable':s.first,'Last usable':s.last,'Convention':s.prefix===31?'Point-to-point RFC 3021':s.prefix===32?'Single address / host route':'Ordinary IPv4 broadcast subnet'}).map(([k,v])=>`<div><span>${k}</span><b>${v}</b></div>`).join('')}</div></div></div>`;
   }catch(e){
    target.querySelector('#calculation').innerHTML=result(e.message,false);
   }
  }

  target.querySelector('form').onsubmit=e=>{e.preventDefault();calculate();};
  const rangeEl=target.querySelector('#cidr-range');
  if(rangeEl){
   rangeEl.oninput=e=>{
    target.querySelector('[name="prefix"]').value=e.target.value;
    calculate();
   };
  }
  target.querySelectorAll('[data-prefix]').forEach(b=>b.onclick=()=>{target.querySelector('[name="prefix"]').value=b.dataset.prefix;calculate();});
  calculate();
 }

 render();
}

function windowsIpv4PropertiesSvg(){
 return `<div class="static-dialog-card">
  <svg class="win-ipv4-dialog-svg" viewBox="0 0 420 430" role="img" aria-label="Windows Internet Protocol Version 4 (TCP/IPv4) Properties dialog showing static IPv4, subnet mask, default gateway, and DNS server fields">
   <rect x="2" y="2" width="416" height="426" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
   <rect x="2" y="2" width="416" height="32" rx="8" fill="#f1f5f9"/>
   <rect x="2" y="24" width="416" height="10" fill="#f1f5f9"/>
   <line x1="2" y1="34" x2="418" y2="34" stroke="#cbd5e1" stroke-width="1"/>
   <text x="14" y="22" font-size="11.5" font-weight="600" fill="#0f172a">Internet Protocol Version 4 (TCP/IPv4) Properties</text>
   <text x="400" y="22" text-anchor="middle" font-size="13" fill="#64748b">×</text>

   <rect x="16" y="44" width="66" height="22" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
   <rect x="17" y="62" width="64" height="5" fill="#ffffff"/>
   <text x="49" y="59" text-anchor="middle" font-size="10.5" font-weight="600" fill="#0f172a">General</text>
   <rect x="84" y="46" width="124" height="20" rx="3" fill="#f1f5f9" stroke="#e2e8f0"/>
   <text x="146" y="60" text-anchor="middle" font-size="10" fill="#64748b">Alternate Configuration</text>
   <line x1="16" y1="66" x2="404" y2="66" stroke="#cbd5e1"/>

   <text x="18" y="84" font-size="10" fill="#475569">You can get IP settings assigned automatically if your network</text>
   <text x="18" y="97" font-size="10" fill="#475569">supports this capability. Otherwise, set your IPv4 values below.</text>

   <circle cx="28" cy="118" r="6" fill="#ffffff" stroke="#64748b" stroke-width="1.5"/>
   <text x="42" y="122" font-size="11" fill="#334155">Obtain an IP address automatically</text>

   <circle cx="28" cy="141" r="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>
   <circle cx="28" cy="141" r="3" fill="#2563eb"/>
   <text x="42" y="145" font-size="11" font-weight="600" fill="#0f172a">Use the following IP address:</text>

   <rect x="38" y="154" width="356" height="82" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
   <text x="50" y="175" font-size="11" fill="#334155">IP address:</text>
   <rect x="186" y="160" width="194" height="20" rx="3" fill="#ffffff" stroke="#2563eb" stroke-width="1.2"/>
   <text x="283" y="174" text-anchor="middle" font-size="11.5" font-family="monospace" font-weight="600" fill="#0f172a">192 . 168 .   1 .  10</text>

   <text x="50" y="200" font-size="11" fill="#334155">Subnet mask:</text>
   <rect x="186" y="185" width="194" height="20" rx="3" fill="#ffffff" stroke="#94a3b8"/>
   <text x="283" y="199" text-anchor="middle" font-size="11.5" font-family="monospace" font-weight="600" fill="#0f172a">255 . 255 . 255 .   0</text>

   <text x="50" y="225" font-size="11" fill="#334155">Default gateway:</text>
   <rect x="186" y="210" width="194" height="20" rx="3" fill="#ffffff" stroke="#94a3b8"/>
   <text x="283" y="224" text-anchor="middle" font-size="11.5" font-family="monospace" font-weight="600" fill="#0f172a">192 . 168 .   1 .   1</text>

   <circle cx="28" cy="256" r="6" fill="#ffffff" stroke="#64748b" stroke-width="1.5"/>
   <text x="42" y="260" font-size="11" fill="#334155">Obtain DNS server address automatically</text>

   <circle cx="28" cy="279" r="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>
   <circle cx="28" cy="279" r="3" fill="#2563eb"/>
   <text x="42" y="283" font-size="11" font-weight="600" fill="#0f172a">Use the following DNS server addresses:</text>

   <rect x="38" y="292" width="356" height="58" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
   <text x="50" y="313" font-size="11" fill="#334155">Preferred DNS server:</text>
   <rect x="186" y="298" width="194" height="20" rx="3" fill="#ffffff" stroke="#94a3b8"/>
   <text x="283" y="312" text-anchor="middle" font-size="11.5" font-family="monospace" font-weight="600" fill="#0f172a">192 . 168 .   1 .   1</text>

   <text x="50" y="338" font-size="11" fill="#334155">Alternate DNS server:</text>
   <rect x="186" y="323" width="194" height="20" rx="3" fill="#ffffff" stroke="#94a3b8"/>
   <text x="283" y="337" text-anchor="middle" font-size="11.5" font-family="monospace" font-weight="600" fill="#0f172a">  8 .   8 .   8 .   8</text>

   <rect x="22" y="362" width="12" height="12" rx="2" fill="#ffffff" stroke="#64748b"/>
   <text x="42" y="372" font-size="10.5" fill="#475569">Validate settings upon exit</text>

   <rect x="306" y="356" width="88" height="24" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
   <text x="350" y="372" text-anchor="middle" font-size="10.5" font-weight="600" fill="#334155">Advanced...</text>

   <line x1="16" y1="388" x2="404" y2="388" stroke="#e2e8f0"/>
   <rect x="234" y="396" width="78" height="24" rx="4" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
   <text x="273" y="412" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8">OK</text>
   <rect x="320" y="396" width="78" height="24" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
   <text x="359" y="412" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">Cancel</text>
  </svg>
 </div>`;
}

export function staticIP(root){
 const steps=[
  'Open Network Connections: Press Win + R, type ncpa.cpl, and press Enter to view your network adapters.',
  'Open TCP/IPv4 Properties: Right-click Ethernet (or Wi-Fi), click Properties, select Internet Protocol Version 4 (TCP/IPv4), and click Properties.',
  'Assign Static IPv4 Values: Select "Use the following IP address", then type IP address (192.168.1.10), Subnet mask (255.255.255.0), and Default gateway (192.168.1.1).',
  'Configure DNS & Save: Select "Use the following DNS server addresses", enter Preferred DNS (192.168.1.1) and optional Alternate DNS (8.8.8.8), then click OK to apply.',
  'Verify Connectivity: Open Command Prompt, run ipconfig /all to check the saved settings, then run ping 192.168.1.1 and ping a local peer.'
 ];
 root.innerHTML=`<div class="static-guide-grid"><div class="static-guide-visual">${windowsIpv4PropertiesSvg()}</div><div class="static-guide-steps"><ol class="teaching-points static-procedure-list">${steps.map((step,i)=>{const colon=step.indexOf(': ');const title=step.slice(0,colon);const body=step.slice(colon+2);return `<li><span class="point-index">${String(i+1).padStart(2,'0')}</span><p><strong>${esc(title)}:</strong> ${esc(body)}</p></li>`;}).join('')}</ol></div></div>`;
 return ()=>{};
}
