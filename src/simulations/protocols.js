import {reserveSimulationSpace} from '../components/simulationSpace.js';
import {esc,button,select,wire,networkSVG} from '../components/ui.js';
import {createStepPlayback} from './playback.js';
import {protocolCatalog,arpJourney,webJourney,mailJourney} from './protocolModels.js';

function journey(root,{initial,choices,build,labels,note}){
 root.classList.add('protocol-journey');
 const settings={...initial};let index=0;
 const playback=createStepPlayback({length:()=>build(settings).length,getIndex:()=>index,setIndex:value=>{index=value;},render:draw});
 function draw(){
  const steps=build(settings);index=Math.min(index,steps.length-1);const current=steps[index];
  const markup=stepIndex=>{const current=steps[stepIndex];
   return `<div class="control-row">${choices.map(c=>select(c.label,c.name,c.options,settings[c.name])).join('')}</div>${networkSVG(labels(settings,stepIndex),current.active)}<div class="step-card" aria-live="polite"><b>Stage ${stepIndex+1} of ${steps.length} · ${playback.status}</b><h3>${esc(current.title)}</h3><p>${esc(current.text)}</p>${current.ok===false?'<span class="protocol-fault">Modeled fault stops this operation at this stage.</span>':''}</div><div class="control-row">${button('Play / replay','play','primary')}${button('Pause','pause')}${button('Resume','resume')}${button('Previous step','previous')}${button('Next step','advance')}${button('Reset sequence','reset')}${select('Animation speed','speed',[['0.5','0.5×'],['1','1×'],['2','2×']],playback.speed)}</div><p class="small">${esc(note)} No real packets, mail, or configuration changes are sent.</p>`;
  };
  root.innerHTML=markup(index);
  reserveSimulationSpace(root,steps.map((_,i)=>markup(i)));
  for(const c of choices)root.querySelector(`[name="${c.name}"]`).onchange=e=>{playback.pause();settings[c.name]=e.target.value;playback.reset();draw();};
  root.querySelector('[name="speed"]').onchange=e=>playback.setSpeed(e.target.value);
  root.querySelector('[data-action="previous"]').disabled=index===0;
  root.querySelector('[data-action="advance"]').disabled=index===steps.length-1;
  wire(root,{play:()=>playback.replay(),pause:()=>{playback.pause();draw();},resume:()=>playback.resume(),previous:()=>{playback.previous();draw();},advance:()=>{playback.next();draw();},reset:()=>{playback.reset();draw();}});
 }
 draw();return ()=>playback.dispose();
}
export function protocolArp(root){return journey(root,{
 initial:{destination:'192.168.2.20'},choices:[{label:'IPv4 destination','name':'destination',options:[['192.168.1.20','Local peer · 192.168.1.20/24'],['192.168.2.20','Remote host · 192.168.2.20/24']]}],
 build:s=>arpJourney(s.destination),labels:s=>['PC A', 'Ethernet LAN',s.destination==='192.168.1.20'?'Local peer':'Gateway'],note:'Conceptual cold-cache IPv4/Ethernet example. ARP resolves the local next hop, not the remote server’s MAC. Reset preserves the selected destination.'
 });}
export function protocolWeb(root){return journey(root,{
 initial:{dns:'yes',certificate:'yes',service:'yes'},choices:[
  {label:'DNS resolver','name':'dns',options:[['yes','Responding'],['no','No response']]},
  {label:'TLS certificate','name':'certificate',options:[['yes','Valid for this name'],['no','Validation fails']]},
  {label:'Application service','name':'service',options:[['yes','HTTP 200'],['no','HTTP 503']]}
 ],build:s=>webJourney({dns:s.dns==='yes',certificate:s.certificate==='yes',service:s.service==='yes'}),labels:()=>['Browser','Resolver / gateway','Web server'],note:'Simplified HTTP/1.1 over TCP/TLS, with working LAN and IP routing assumed. HTTP/3 uses QUIC over UDP instead. A fault changes the actual modeled sequence; reset preserves selected conditions.'
 });}
export function protocolMail(root){return journey(root,{
 initial:{reader:'IMAP',keep:'yes'},choices:[
  {label:'Recipient mailbox protocol','name':'reader',options:['IMAP','POP3']},
  {label:'POP3 retention setting','name':'keep',options:[['yes','Leave a server copy'],['no','Delete after retrieval']]}
 ],build:s=>mailJourney({reader:s.reader,keepCopy:s.keep==='yes'}),labels:(_settings,index)=>[index>=4?'Recipient client':'Sender client','Submission server','Recipient server'],note:'Illustrative submission, relay, and retrieval. The retention option affects POP3 only; IMAP access in this example keeps the server copy. Relay TLS depends on negotiated policy.'
 });}

export function protocolDirectory(root){let selected='DNS',binding=0;
 function draw(){
  const p=protocolCatalog.find(p=>p.id===selected),endpoint=p.ports[binding];
  root.innerHTML=`<div class="device-tabs protocol-tabs" role="group" aria-label="Seventeen protocols and services">${protocolCatalog.map(p=>`<button data-protocol="${p.id}" aria-pressed="${p.id===selected}">${p.id}</button>`).join('')}</div><div class="protocol-profile"><div><span class="osi-map-label">${esc(p.layer)}</span><h3>${p.id} · ${p.name}</h3><p>${p.purpose}</p><p><b>Practical use:</b> ${p.use}</p></div><div><h3>Common transport endpoints</h3>${p.ports.length?`<div class="protocol-bindings">${p.ports.map((b,i)=>`<button data-binding="${i}" aria-pressed="${binding===i}"><b>${b.transport} ${b.number}</b><span>${b.role}</span></button>`).join('')}</div>`:'<p class="callout">No single TCP/UDP service port belongs to this protocol itself.</p>'}</div></div>${endpoint?networkSVG(endpointLabels(p,endpoint)):''}<div class="feedback" aria-live="polite">${esc(p.detail)}</div><p class="small">These are common conventions, not guarantees of the service actually listening. Port numbers are scoped by transport; TCP 53 and UDP 53 are distinct endpoints. Client source ports are often temporary. The diagrams show illustrative endpoints, not real connections.</p>`;
  root.querySelectorAll('[data-protocol]').forEach(b=>b.onclick=()=>{selected=b.dataset.protocol;binding=0;draw();});
  root.querySelectorAll('[data-binding]').forEach(b=>b.onclick=()=>{binding=Number(b.dataset.binding);draw();});
 }
 draw();
}
function endpointLabels(protocol,binding){
 if(protocol.id==='DHCP')return binding.number===67?['Client UDP 68','Local network','Server UDP 67']:['Server UDP 67','Local network','Client UDP 68'];
 if(protocol.id==='FTP'&&binding.number===20)return ['Server TCP 20','Active-mode data','Client data port'];
 return [`Client ${binding.transport} 53000`,'IP delivery',`${protocol.id} ${binding.transport} ${binding.number}`];
}
