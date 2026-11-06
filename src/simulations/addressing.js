import {esc,button,input,select,result,wire,read} from '../components/ui.js';
import {subnet,classify,connectivity,T568A,T568B,cableTest,ipv4} from '../utils/network.js';

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

 function draw(){
  root.innerHTML=`
   <div class="control-row">
    ${select('Reference standard','standard',['A','B'],standard)}
    ${button('Load reference at end 1','load1')}
    ${button('Load reference at end 2','load2')}
    ${button('Clear both ends','reset')}
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

   <p class="callout">Front contact view: contacts face you, latch behind, cable enters downward. Pin 1 is left. Reference T568${standard}: ${(standard==='A'?T568A:T568B).join(' · ')}</p>

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

   <div class="feedback" role="status">${esc(message)}</div>

   <div id="wire-map">${wireMapHtml}</div>

   <div class="step-card">
    <b>Crimping sequence · ${step+1}/6</b>
    <p>${stages[step]}</p>
    ${button('Previous step','prev')}
    ${button(step===5?'Replay sequence':'Next step','next')}
   </div>
  `;

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
   reset:()=>{wireMapHtml='';ends=[Array(8).fill(''),Array(8).fill('')];step=0;message='Both ends cleared; select a reference standard to demonstrate termination.';draw();},
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
      <p class="small">A basic wire map cannot certify signal performance. Duplicate conductor selections model an accidental conductor bridge/short.</p>
     </div>
    `;
    draw();
   },
   open:()=>{ends[1][0]='';message='End 2 pin 1 disconnected. Run the tester to trace the missing path.';draw();},
   short:()=>{ends[1][1]=ends[1][0]||'Orange';ends[1][0]=ends[1][1];message='End 2 pins 1 and 2 share one conductor. Run the tester.';draw();},
   prev:()=>{step=Math.max(0,step-1);draw();},
   next:()=>{step=(step+1)%6;draw();}
  });
 }

 draw();
}

export function addressExplorer(root,isSubnet=false){let ip='192.168.10.70',prefix=isSubnet?26:24,octet=192;
 root.innerHTML=`<form class="control-row" id="calculate">${input('IPv4 address','ip',ip)}${input('CIDR prefix (0–32)','prefix',prefix,'number')}<button class="primary" type="submit">Calculate</button></form><div class="presets">${[24,25,26,27,28,30,31,32].map(p=>`<button data-prefix="${p}">/${p}</button>`).join('')}</div><div id="calculation" aria-live="polite"></div>${!isSubnet?`<div class="octet-demonstration"><h3>Binary octet viewer</h3><p>Toggle bits to show how enabled weights sum to the decimal value.</p><div id="bits"></div></div>`:''}`;
 function calculate(){ip=read(root,'ip');prefix=read(root,'prefix');try{const s=subnet(ip,prefix);root.querySelector('#calculation').innerHTML=`<p class="callout">${esc(classify(ip))}</p><div class="binary" aria-label="Network and host binary sections"><span>${s.binary.slice(0,s.prefix)}</span><strong>${s.binary.slice(s.prefix)}</strong></div><p class="small">Blue: ${s.prefix} network bit${s.prefix===1?'':'s'} · Teal: ${32-s.prefix} host bit${32-s.prefix===1?'':'s'}</p><div class="result-grid">${Object.entries({'Subnet mask':s.mask,'Network address':s.network,'Broadcast':s.broadcast||'Not applicable','Total addresses':s.total,'Usable addresses':s.usable,'First usable':s.first,'Last usable':s.last,'Convention':s.prefix===31?'Point-to-point RFC 3021':s.prefix===32?'Single address / host route':'Ordinary IPv4 broadcast subnet'}).map(([k,v])=>`<div><span>${k}</span><b>${v}</b></div>`).join('')}</div><details><summary>Explain the calculation</summary><ol><li>Keep ${s.prefix} bits for the network; ${32-s.prefix} bits remain.</li><li>Block size = 2^${32-s.prefix} = ${s.total} addresses.</li><li>Round the numeric input down to its block boundary: ${s.network}.</li><li>${s.prefix<31?`Last address is broadcast ${s.broadcast}; remove the two endpoints for ${s.usable} usable hosts.`:'This prefix uses its special convention; do not subtract two.'}</li></ol></details>`;}catch(e){root.querySelector('#calculation').innerHTML=result(e.message,false);}}
 root.querySelector('form').onsubmit=e=>{e.preventDefault();calculate();};root.querySelectorAll('[data-prefix]').forEach(b=>b.onclick=()=>{root.querySelector('[name="prefix"]').value=b.dataset.prefix;calculate();});
 if(!isSubnet) {const bits=root.querySelector('#bits');function drawBits(){bits.innerHTML=`<div class="bit-row">${[128,64,32,16,8,4,2,1].map(w=>`<button data-weight="${w}" aria-pressed="${!!(octet&w)}"><b>${octet&w?1:0}</b><small>${w}</small></button>`).join('')}</div><h2>${octet.toString(2).padStart(8,'0')} = ${octet}</h2>`;bits.querySelectorAll('button').forEach(b=>b.onclick=()=>{octet^=+b.dataset.weight;drawBits();});}drawBits();}calculate();}

export function staticIP(root){let configs=[{ip:'192.168.1.10',mask:'255.255.255.0',gateway:'192.168.1.1',dns:'192.168.1.1'},{ip:'192.168.1.20',mask:'255.255.255.0',gateway:'192.168.1.1',dns:'192.168.1.1'}];
 root.innerHTML=`<div class="config-grid">${configs.map((c,i)=>`<fieldset><legend>PC ${i+1}</legend>${Object.entries(c).map(([k,v])=>input({ip:'IPv4 address',mask:'Subnet mask',gateway:'Default gateway (optional)',dns:'DNS resolver (optional)'}[k],`${i}-${k}`,v)).join('')}</fieldset>`).join('')}</div><div class="control-row">${select('Physical link','link',[['up','Connected'],['down','Disconnected']],'up')}${select('Routing model','routing',[['none','One LAN; no inter-subnet router'],['router','Router with both subnet interfaces/routes']],'none')}${button('Test numeric-IP connectivity','test','primary')}${button('Load different-subnet example','different')}</div><p class="small">DNS is validated as an address but is not used by numeric-IP ping. Router mode assumes the configured local gateways exist and routes work in both directions; ACLs and NAT are outside this model.</p><div id="connectivity"></div>`;
 wire(root,{different:()=>{root.querySelector('[name="1-ip"]').value='192.168.2.20';root.querySelector('[name="1-gateway"]').value='192.168.2.1';test();},test});
 function test(){configs=configs.map((c,i)=>Object.fromEntries(Object.keys(c).map(k=>[k,read(root,`${i}-${k}`)])));const r=connectivity(...configs,read(root,'routing')==='router',read(root,'link')==='up');root.querySelector('#connectivity').innerHTML=result(r.text,r.ok);}test();}
