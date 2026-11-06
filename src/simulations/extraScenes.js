import {topologyCoordinates,topologyConnections} from '../components/topologyDiagram.js';
import {renderTopologyNode,getSavedNodeStyle} from '../components/networkSymbols.js';
import {reserveSimulationSpace} from '../components/simulationSpace.js';
import {esc,button,input,select,wire,networkSVG,result} from '../components/ui.js';
import {createStepPlayback} from './playback.js';
import {layouts} from './models.js';
import {transferModel,serviceAvailability,topologyPath,layerEvidence,hopFrames,mediaProfiles,mediaBudget,pairIntegrity,bitwiseAddress,partitionSubnet,asymmetricSubnet,guestPolicy,traceProbe} from './extraModels.js';
export const demoTable=(headings,rows)=>`<div class="table-wrap"><table><thead><tr>${headings.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(cell=>`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')||`<tr><td colspan="${headings.length}">No entries</td></tr>`}</tbody></table></div>`;
const metrics=rows=>`<div class="result-grid">${rows.map(([k,v])=>`<div><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('')}</div>`;
const field=(name,label,value,options)=>({name,label,value,...(options?{options}:{})});
const step=(title,text,ok=true)=>({title,text,ok});
function scene(root,spec){
 root.classList.add('extra-scene');let config={...spec.defaults},index=0,plan;
 const playback=createStepPlayback({length:()=>plan.steps.length,getIndex:()=>index,setIndex:value=>{index=value;},render:draw});
 const fields=()=>typeof spec.fields==='function'?spec.fields(config):spec.fields;
 function apply(changed){
  playback.pause();
  if(changed){const el=root.querySelector(`[name="${changed}"]`);if(el)config[changed]=el.value;}
  for(const f of fields()){const el=root.querySelector(`[name="${f.name}"]`);if(el)config[f.name]=f.number?Number(el.value):el.value;}
  spec.change?.(changed,config);playback.reset();draw();
 }
 function draw(){
  let error='';try{plan=spec.build(config);}catch(e){error=e.message;plan={steps:[]};}
  index=Math.max(0,Math.min(index,plan.steps.length-1));const current=plan.steps[index];
  const hasInputs=fields().some(f=>!f.options);
  const markup=stepIndex=>{const current=plan.steps[stepIndex];
   return `<form class="control-row extra-config">${fields().map(f=>f.options?select(f.label,f.name,f.options,config[f.name]):input(f.label,f.name,config[f.name],f.number?'number':'text')).join('')}${hasInputs?'<button type="submit">Apply configuration</button>':''}</form>${error?result(error,false):`${spec.visual?spec.visual(config,stepIndex,plan):networkSVG(plan.labels||['Source','Network','Destination'],Math.min(2,stepIndex))}<div class="step-card" aria-live="polite"><b>Step ${stepIndex+1} of ${plan.steps.length} · <span class="extra-play-state">${playback.status}</span></b><h3>${esc(current.title)}</h3><p>${esc(current.text)}</p>${current.ok===false?'<span class="extra-blocked">Modeled limit or blocked operation</span>':''}</div>`}<div class="control-row extra-playback">${button('Play / replay','play','primary')}${button('Pause','pause')}${button('Resume','resume')}${button('Previous step','previous')}${button('Next step','advance')}${button('Reset sequence','reset')}${select('Animation speed','speed',[['0.5','0.5×'],['1','1×'],['2','2×']],playback.speed)}</div><p class="small">${esc(spec.note)} Configuration changes pause playback. No real equipment, traffic, or files are accessed.</p>`;
  };
  root.innerHTML=markup(index);
  if(!error)reserveSimulationSpace(root,plan.steps.map((_,i)=>markup(i)));
  root.querySelector('form').onsubmit=e=>{e.preventDefault();apply();};
  for(const f of fields()){
   const el=root.querySelector(`[name="${f.name}"]`);
   if(el&&f.options){
    el.onchange=()=>apply(f.name);
    el.oninput=()=>apply(f.name);
   }
  }
  root.querySelector('form').onfocusin=()=>{playback.pause();const indicator=root.querySelector('.extra-play-state');if(indicator)indicator.textContent='Paused';};
  root.querySelector('[name="speed"]').onchange=e=>playback.setSpeed(e.target.value);
  root.querySelectorAll('.extra-playback button').forEach(b=>b.disabled=!!error);
  root.querySelector('[data-action="previous"]').disabled=!!error||index===0;
  root.querySelector('[data-action="advance"]').disabled=!!error||index===plan.steps.length-1;
  wire(root,{play:()=>playback.replay(),pause:()=>{playback.pause();draw();},resume:()=>playback.resume(),previous:()=>{playback.previous();draw();},advance:()=>{playback.next();draw();},reset:()=>{playback.reset();draw();}});
 }
 draw();return ()=>playback.dispose();
}
export function transferDemo(root){return scene(root,{
 defaults:{size:10,rate:100,latency:20,link:'up'},fields:[{...field('size','File size (decimal MB)'),number:true},field('rate','Link rate (Mb/s)',null,[10,100,1000]),{...field('latency','One-way delay (ms)'),number:true},field('link','Link state',null,[['up','Connected'],['down','Disconnected']])],
 build:c=>{const m=transferModel(c);return {...m,steps:m.ok?Array.from({length:5},(_,i)=>step(i===0?'Prepare the transfer':i===4?'Complete the idealized transfer':'Transmit data',`${(m.size*i/4).toFixed(2)} of ${m.size} MB delivered. Ideal transmission time is size × 8 ÷ rate = ${m.serialization.toFixed(3)} s; add ${(m.latency/1000).toFixed(3)} s one-way delay. ${i===4?'This simplified total omits protocol overhead, congestion, and processing.':''}`)):[step('Link unavailable','A valid file size and link rate cannot move data across a disconnected link.',false)]};},
 visual:(_c,i,m)=>`${networkSVG(['Sender','Link','Receiver'],i===4?2:i>0?1:0)}${metrics([['Delivered',`${m.ok?(m.size*i/4).toFixed(2):0} MB`],['Ideal serialization',`${m.serialization.toFixed(3)} s`],['One-way delay',`${m.latency} ms`],['Ideal total',`${m.total.toFixed(3)} s`]])}<progress class="extra-progress" max="4" value="${m.ok?i:0}" aria-label="Modeled transfer progress"></progress>`,
 note:'Real arithmetic in an ideal one-way transfer model: 1 MB = 1,000,000 bytes and 1 Mb/s = 1,000,000 bits/s. Playback time is teaching time, not a speed measurement.'
 });}
export function availabilityDemo(root){return scene(root,{
 defaults:{architecture:'server',resource:'A',peerA:'on',peerB:'on',server:'on'},
 fields:c=>[
  field('architecture','Service architecture',null,[['server','Client-server'],['peer','Peer-to-peer']]),
  field('resource','Requested file',null,['A','B']),
  ...(c.architecture==='server'
    ? [field('server','Dedicated server',null,[['on','Online'],['off','Offline']])]
    : [field('peerA','Peer A',null,[['on','Online'],['off','Offline']]),
       field('peerB','Peer B',null,[['on','Online'],['off','Offline']])])
 ],
 build:c=>{const m=serviceAvailability(c);return {labels:['Requesting client',m.host,`File ${c.resource}`],steps:[step('Identify the resource owner',`File ${c.resource} is hosted by ${m.host}. Coverage and link medium do not choose the service architecture.`),step('Request the resource',m.text,m.online),step('Compare the failure scope',m.scope,m.online)]};},note:'A connected requesting client and working LAN are assumed. Peers A/B own their own files in peer mode; the dedicated server owns both in server mode.'
 });}
function topologyDrawing(c,index,plan){
 const m=layouts[c.kind],xy=topologyCoordinates(c.kind,m.nodes.length),visited=plan.path.slice(0,index+1);
 const nodeStyle=getSavedNodeStyle();
 return `<svg class="extra-topology" viewBox="0 0 800 340" role="img" aria-label="${esc(visited.map(i=>m.nodes[i]).join(' → ')||'No reachable path')}">${topologyConnections(c.kind,m.edges,xy,{failed:Number(c.failed),path:visited})}${m.nodes.map((n,i)=>renderTopologyNode({x:xy[i][0],y:xy[i][1],label:n,style:nodeStyle,status:visited.includes(i)?'connected':'default',dataAttrs:`data-trace-node="${i}"`})).join('')}</svg><p class="small">${esc(m.note)}</p>`;
}
export function pathTraceDemo(root){return scene(root,{
 defaults:{kind:'Star',source:1,target:4,failed:-1},fields:c=>[field('kind','Topology',null,Object.keys(layouts)),field('source','Source node',null,layouts[c.kind].nodes.map((n,i)=>[i,n])),field('target','Destination node',null,layouts[c.kind].nodes.map((n,i)=>[i,n])),field('failed','Failed link',null,[[-1,'None'],...layouts[c.kind].edges.map(([a,b],i)=>[i,`${layouts[c.kind].nodes[a]} ↔ ${layouts[c.kind].nodes[b]}`])])],change:(name,c)=>{if(name==='kind')c.failed=-1;},
 build:c=>{const path=topologyPath(c.kind,c.source,c.target,c.failed);return {path,steps:path.length?path.map((node,i)=>step(i===path.length-1?'Destination reached':'Follow an available connection',`${layouts[c.kind].nodes[node]} · ${i+1} of ${path.length} nodes on a shortest available abstract path. ${i===0?'Source and destination may also be the same node.':''}`)):[step('No path under these assumptions','The selected failure prevents modeled connectivity. Changing addresses does not repair this graph’s disconnected path.',false)]};},visual:topologyDrawing,note:'Abstract graph traversal, not actual Ethernet forwarding or routing convergence. Classic unprotected ring/bus assumptions are retained; changing the topology recomputes the path.'
 });}
export function layerBoundaryDemo(root){return scene(root,{
 defaults:{fault:'none'},fields:[field('fault','Demonstrated failing boundary',null,[['none','Healthy model'],['1','Physical link'],['2','Local frame delivery'],['3','IP path'],['4','TCP connection'],['7','Application response']])],
 build:c=>{const evidence=layerEvidence(c.fault);return {evidence,steps:evidence.map(e=>step(e.name,`OSI-related Layer ${e.layer}: ${e.status}. ${e.status==='Not established by this test'?'A lower boundary has failed; this result does not independently diagnose the higher layer.':'Use this functional observation to decide the next investigation.'}`,e.status==='Pass in this model'))};},
 visual:(_c,index,p)=>demoTable(['Observed function','OSI relationship','Evidence so far'],p.evidence.map((e,i)=>[e.name,e.layer,i<=index?e.status:'Not inspected'])),note:'Single-fault functional model. Session/Presentation responsibilities are not separately probed here; actual symptoms and implementations can span several OSI layers.'
 });}
export function nextHopFrameDemo(root){return scene(root,{
 defaults:{destination:'remote',transport:'TCP'},fields:[field('destination','IP destination',null,[['local','Local LAN'],['remote','Different subnet']]),field('transport','Transport example',null,['TCP','UDP'])],
 build:c=>{const frames=hopFrames(c);return {frames,steps:frames.map(f=>step(f.hop,`IP destination stays ${f.destinationIP}. This frame’s destination is ${f.destinationMAC}; transport is ${f.transport}. MAC framing changes between links, while this no-NAT model retains source/destination IPs.`))};},
 visual:(_c,index,p)=>`${networkSVG(p.frames.length>1?['PC A','Router','PC B']:['PC A','Switch','PC B'],index===0?0:1)}${demoTable(['Field','Current value'],Object.entries(p.frames[index]))}`,note:'Conceptual no-NAT path with valid ARP/neighbor state and working routes assumed. TCP example targets HTTPS; UDP example targets DNS. Labels are schematic MAC identities, not captured frames.'
 });}
export function mediumBudgetDemo(root){return scene(root,{
 defaults:{profile:'cat5e',distance:30,speed:1000,damaged:'no'},fields:[field('profile','Rated teaching profile',null,Object.entries(mediaProfiles).map(([k,v])=>[k,v.label])),{...field('distance','Channel length (m)'),number:true},field('speed','Required rate (Mb/s)',null,[100,1000,10000]),field('damaged','Cable condition',null,[['no','Intact'],['yes','Damaged']])],
 build:c=>{const m=mediaBudget(c);return {...m,steps:[step('Inspect the configured profile',`${m.profile.label}: rated ${m.profile.speed} Mb/s and ${m.profile.reach} m for this comparison.`),step('Check reach',`${m.distance} m ${m.distanceOK?'is within':'exceeds'} the configured ${m.profile.reach} m reach.`,m.distanceOK),step('Check required rate',`${m.speed} Mb/s ${m.speedOK?'is within':'exceeds'} this configured ${m.profile.speed} Mb/s rate.`,m.speedOK),step('Interpret the limits',m.ok?'Within the selected teaching profile limits; real installed performance still needs appropriate verification.':'The required rate, reach, or cable condition does not meet this profile. Software settings alone cannot certify the physical channel.',m.ok)]};},
 visual:(_c,_i,m)=>metrics([['Required reach',`${m.distance} m`],['Rated reach',`${m.profile.reach} m`],['Required rate',`${m.speed} Mb/s`],['Rated rate',`${m.profile.speed} Mb/s`]]),note:'Copper examples use the discussed 100 m channel conventions. The 1 Gb/s, 1 km fiber pair is an explicit assumed optics profile, not a universal fiber limit. This is a suitability comparison, not cable certification.'
 });}
export function pairScanDemo(root){return scene(root,{
 defaults:{preset:'standard'},fields:[field('preset','Cable wiring example',null,[['standard','Standard B–B'],['split','Same split-pair order at both ends'],['miswire','Crossed conductors'],['open','Open conductor'],['short','Conductor bridge / short']])],
 build:c=>{const m=pairIntegrity(c.preset);return {...m,steps:[...m.mapping.map((pins,i)=>step(`Trace conductor at pin ${i+1}`,`End 1 pin ${i+1} (${m.a[i]||'open'}) → ${pins.length?`end 2 pin ${pins.join(', ')}`:'no path'}.`,pins.length===1)),step('Compare continuity and pair integrity',`${m.text} ${m.split?'The pair-group check also detects split physical pairs.':'The selected pair grouping has no split-pair indication in this model.'}`,!m.open&&!m.short&&!m.split&&(m.straight||m.crossover))]};},
 visual:(_c,index,m)=>demoTable(['End 1 pin','Conductor','End 2 path','Scan'],m.a.map((w,i)=>[i+1,w||'Open',m.mapping[i].join(', ')||'Open',i<=index?'Inspected':'Pending'])),note:'Paths derive from conductor mappings. The split-pair check compares color-pair membership at 1–2, 3–6, 4–5, and 7–8. Correct continuity can coexist with split pairs; this does not measure bandwidth or all possible physical faults.'
 });}
export function bitwiseDemo(root){return scene(root,{
 defaults:{ip:'192.168.10.70',prefix:26},fields:[field('ip','IPv4 address'),{...field('prefix','CIDR prefix (0–32)'),number:true}],
 build:c=>{const m=bitwiseAddress(c.ip,c.prefix);return {...m,steps:[step('Write the address bits',`${c.ip} is represented by 32 address bits.`),step('Write the mask bits',`/${m.prefix} uses ${m.prefix} leading network ones and ${32-m.prefix} host zeros.`),step('Apply bitwise AND',`Address AND mask = ${m.network}. Network bits are retained; host bits become zero.`),step('Interpret the range',`Broadcast: ${m.broadcast||'not applicable'}. Usable: ${m.first} through ${m.last}; ${m.usable} addresses under this prefix convention.`)]};},
 visual:(_c,index,m)=>`${demoTable(['Value','Binary / decimal'],[['IPv4',m.binary],['Mask',index>=1?m.maskBits:'Not yet shown'],['AND result',index>=2?m.and:'Not yet shown'],['Network',index>=2?m.network:'Not yet shown']])}<div class="binary"><span>${m.binary.slice(0,m.prefix)}</span><strong>${m.binary.slice(m.prefix)}</strong></div>`,note:'Real IPv4 bit arithmetic. /31 is interpreted as a point-to-point prefix and /32 as a single address; ordinary network/broadcast subtraction is not applied to those cases.'
 });}
export function partitionDemo(root){return scene(root,{
 defaults:{ip:'192.168.10.70',parent:24,child:26},fields:[field('ip','Address inside parent'),{...field('parent','Parent prefix'),number:true},{...field('child','Child prefix'),number:true}],
 build:c=>{const p=partitionSubnet(c.ip,c.parent,c.child);return {...p,steps:[step('Identify the parent block',`${p.parent.network}/${p.parent.prefix} contains ${p.parent.total} addresses.`),...p.children.map((s,i)=>step(`Reveal child subnet ${i+1} of ${p.count}`,`${s.network}/${s.prefix}: ${s.total} total, ${s.usable} usable; ${s.first} through ${s.last}. Broadcast ${s.broadcast||'not applicable'}.`))]};},
 visual:(_c,index,p)=>`<div class="extra-subnets">${p.children.map((s,i)=>`<div class="${index>i?'revealed':''}"><b>Child ${i+1}</b><span>${index>i?`${s.network}/${s.prefix}`:'Not revealed'}</span><small>${s.total} addresses</small></div>`).join('')}</div>${metrics([['Parent',`${p.parent.network}/${p.parent.prefix}`],['Children',p.count],['Parent address count',p.parent.total],['Child address total',p.children.reduce((n,s)=>n+s.total,0)]])}`,note:'Real equal-size subnet partitioning, limited to 16 displayed children for readability. Child blocks cover the parent exactly without overlap; subdivision alone is not a security policy.'
 });}
export function asymmetricDemo(root){return scene(root,{
 defaults:{a:'192.168.1.10',aPrefix:24,b:'192.168.1.200',bPrefix:25},fields:[field('a','PC A address'),{...field('aPrefix','PC A prefix'),number:true},field('b','PC B address'),{...field('bPrefix','PC B prefix'),number:true}],
 build:c=>{const m=asymmetricSubnet(c);return {...m,steps:[step('PC A decides how to send',`${m.a}/${m.sa.prefix} considers ${m.b} ${m.aLocal?'local: use local-link delivery':'remote: a route/gateway is needed'}.`,m.aLocal),step('PC B independently decides how to reply',`${m.b}/${m.sb.prefix} considers ${m.a} ${m.bLocal?'local: use local-link delivery':'remote: a route/gateway is needed'}.`,m.bLocal),step('Check the round trip',m.ok?'Both hosts agree on local delivery. The modeled connected LAN permits the exchange.':'At least one host needs a route that this isolated model does not provide; a complete round trip fails despite valid individual addresses.',m.ok)]};},
 visual:(_c,_i,m)=>`${networkSVG(['PC A','One LAN, no router','PC B'])}${demoTable(['Host','Own network','Peer decision'],[['A',`${m.sa.network}/${m.sa.prefix}`,m.aLocal?'Local':'Needs route'],['B',`${m.sb.network}/${m.sb.prefix}`,m.bLocal?'Local':'Needs route']])}`,note:'Both directions are calculated using each host’s own prefix. This isolated-LAN model assumes an intact link and permitted traffic, with no gateway or alternate route.'
 });}
export function guestIsolationDemo(root){return scene(root,{
 defaults:{source:'guest',destination:'staff',associated:'yes',isolation:'on',wan:'up',host:'on'},fields:[field('source','Client network',null,[['guest','Guest Wi-Fi'],['staff','Staff LAN']]),field('destination','Destination',null,[['staff','Staff file host'],['internet','Internet service'],['gateway','Local gateway']]),field('associated','Guest association',null,[['yes','Associated'],['no','Disconnected']]),field('isolation','Guest isolation',null,[['on','Enabled'],['off','Disabled']]),field('wan','WAN service',null,[['up','Available'],['down','Unavailable']]),field('host','Staff file host',null,[['on','Online'],['off','Offline']])],
 build:c=>{const m=guestPolicy(c);return {...m,steps:[step('Check local attachment',m.linkOK?'The selected client has a modeled local link.':'The guest is disconnected, so it cannot use a local or remote service.',m.linkOK),step('Evaluate the selected path',m.isolated?'Guest-to-staff access is blocked by the configured isolation policy.':m.pathOK?'The selected destination has a modeled path.':'WAN service is unavailable; this does not itself stop local gateway access.',m.linkOK&&!m.isolated&&m.pathOK),step('Observe service reachability',m.ok?'The selected operation is reachable under the modeled link, policy, and service conditions.':'The modeled link, isolation, WAN path, or host availability blocks this operation.',m.ok)]};},
 visual:(c,_i,m)=>`${networkSVG([c.source==='guest'?'Guest client':'Staff client','Router / AP',c.destination==='internet'?'WAN service':c.destination==='staff'?'Staff host':'Gateway'])}${metrics([['Local link',m.linkOK?'Available':'Disconnected'],['Isolation block',m.isolated?'Yes':'No'],['Selected route',m.pathOK?'Available':'Unavailable'],['Host/service',m.serviceOK?'Available':'Unavailable']])}`,note:'An explicit guest-isolation policy model, not a real VLAN/firewall configuration. File identity/permissions, radio interference, NAT, and upstream details are outside this view.'
 });}
export function ttlTraceDemo(root){return scene(root,{
 defaults:{hide:'no',broken:'no'},fields:[field('hide','Router 2 Time Exceeded replies',null,[['no','Visible'],['yes','Suppressed, forwarding continues']]),field('broken','Link beyond router 2',null,[['no','Working'],['yes','Unavailable']])],
 build:c=>{const probes=Array.from({length:c.broken==='yes'?3:4},(_,i)=>traceProbe(i+1,c));return {probes,steps:probes.map(p=>step(`Probe with initial TTL ${p.ttl}`,`${p.status} · ${p.address}. ${p.text}`,p.status!=='Unreachable'))};},
 visual:(_c,index,p)=>`${networkSVG(['Source','Routers / IP path','Destination'],Math.min(2,index))}${demoTable(['Initial TTL','Returned address','Modeled evidence'],p.probes.slice(0,index+1).map(probe=>[probe.ttl,probe.address,probe.status]))}`,note:'A deterministic ICMP-Echo-style trace over three routers to a documentation-address destination. TTL-expiry replies, hidden replies, and an explicit link-down report are distinct modeled outcomes. No random timings or real probes are used.'
 });}
