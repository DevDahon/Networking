import {esc,button,input,wire} from '../components/ui.js';
import {createStepPlayback} from './playback.js';
import {reserveSimulationSpace} from '../components/simulationSpace.js';
import {osiLayers,journeySteps} from './osiModel.js';
import {packetPosition} from '../components/packetMotion.js';

const sending={
 7:'The messaging service creates the message “Hello!” for Computer B.',
 6:'The text “Hello!” is encoded as bytes that the receiver can interpret.',
 5:'The logical conversation gives the related messages a shared context.',
 4:'Transport identifies the receiving application and provides the chosen delivery service.',
 3:'Network addresses identify the destination computer; routes guide delivery when needed.',
 2:'A frame carries the data across the local link toward the next device.',
 1:'The frame’s bits travel as signals through the connection.'
};
const receiving={
 1:'Computer B receives signals and reconstructs their bits.',
 2:'The receiving interface checks the frame and passes its contents upward.',
 3:'The computer processes the packet addressed to it.',
 4:'Transport delivers the data to the correct receiving application.',
 5:'The message is interpreted within the logical conversation.',
 6:'The received bytes are decoded into the text “Hello!”.',
 7:'The messaging service makes “Hello!” available to the receiving application.'
};
export function osiResponsibilityPlan(){
 return [...osiLayers.map(l=>({...l,side:'sender',text:sending[l.number]})),...[...osiLayers].reverse().map(l=>({...l,side:'receiver',text:receiving[l.number]}))].map(l=>({
  title:`${l.side==='sender'?'Sending':'Receiving'} · Layer ${l.number}: ${l.name}`,
  text:l.text,focus:[l.side==='sender'?0:2],route:l.side==='sender'&&l.number===1?[0,1,2]:[],ok:true,facts:[],layer:l.number,side:l.side
 }));
}
export function osiResponsibilitiesVisual(slide,stage,progress){
 const point=packetPosition(slide.diagram.nodes,stage.route,progress);
 const stack=(x,side)=>osiLayers.map((l,i)=>{const active=stage.layer===l.number&&stage.side===side;return `<g data-layer="${l.number}" data-side="${side}" aria-current="${active?'step':'false'}"><rect x="${x}" y="${198+i*29}" width="240" height="25" rx="5" fill="${active?'#dbeafe':'#f8fafc'}" stroke="${active?'#2563eb':'#e2e8f0'}"/><text x="${x+120}" y="${216+i*29}" text-anchor="middle" font-size="15" fill="#0f172a">${l.number} · ${esc(l.name)}</text></g>`;}).join('');
 return `<svg class="classroom-example osi-whole-diagram" viewBox="0 0 1000 420" role="img" aria-label="${esc(stage.title)}: Hello travels down the sender’s seven responsibilities and up the receiver’s seven responsibilities"><path d="M210 145H790" stroke="#94a3b8" stroke-width="3"/>${slide.diagram.nodes.map((n,i)=>`<g data-example-node="${i}" transform="translate(${n.x},${n.y})"><rect x="-75" y="-28" width="150" height="56" rx="9" fill="${stage.focus.includes(i)?'#ccfbf1':'#eff6ff'}" stroke="#0d9488"/><text text-anchor="middle" y="5" font-size="17" fill="#0f172a">${esc(n.label)}</text></g>`).join('')}<text x="210" y="187" text-anchor="middle" font-size="15">Sender ↓</text><text x="790" y="187" text-anchor="middle" font-size="15">Receiver ↑</text>${stack(90,'sender')}${stack(670,'receiver')}<text x="500" y="275" text-anchor="middle" font-size="26" fill="#1d4ed8">“Hello!”</text><text x="500" y="305" text-anchor="middle" font-size="15" fill="#475569">Same message at both ends</text>${point?`<circle data-example-packet cx="${point.x}" cy="${point.y}" r="8" fill="#f59e0b" stroke="#92400e" stroke-width="2"/>`:''}</svg>`;
}

export function encapsulationState(message,index){
 const bytes=new TextEncoder().encode(message);
 const depth=[0,1,2,3,3,3,2,1,0][index];
 return {message:index===8?new TextDecoder().decode(bytes):message,bytes:Array.from(bytes),depth};
}
const explanations=[
 'Computer A creates your message. No delivery wrappers have been added yet.',
 'Transport adds application port numbers so Computer B can identify the receiving application.',
 'Network adds source and destination addresses identifying the computers.',
 'Ethernet adds local-link addresses around the packet and error-check information at the end.',
 'The complete frame travels as signals. The binary preview below shows only your message bytes.',
 'Computer B reconstructs and checks the Ethernet frame, then removes its local-link information.',
 'Computer B processes the destination network address, then passes the contents to Transport.',
 'Transport uses the destination port to deliver the message to the receiving application.',
 'The receiving application recovers your original message. The delivery wrappers have been removed.'
];
export function encapsulationWalkthrough(root){
 let index=0,message='Hello!';
 const player=createStepPlayback({length:()=>9,getIndex:()=>index,setIndex:n=>{index=n;},render:draw});
 function markup(i){
  const state=encapsulationState(message,i);
  let payload=`<div class="ink-free-payload"><b>${i===8?'Received message':'Your message'}</b><span data-message>${esc(state.message)}</span></div>`;
  const wrappers=[['Transport information','Application ports: 50000 → 5000'],['Network addresses','192.168.1.10 → 192.168.1.20'],['Local-link information','Ethernet addresses: Computer A → Computer B']];
  for(let n=0;n<state.depth;n++)payload=`<div class="osi-wrapper wrapper-${n}"><div><b>${wrappers[n][0]}</b><span>${wrappers[n][1]}</span></div>${payload}${n===2?'<small>Ethernet error-check information (not calculated here)</small>':''}</div>`;
  const parts=journeySteps[i];
  return `<form class="encapsulation-message control-row">${input('Message (up to 24 characters)','encapsulation-message',message)}<button type="submit">Use message</button></form><div class="journey-heading"><span>${i<4?'Computer A':i===4?'Connection':'Computer B'}</span><b>${i<4?'Adding delivery information':i===4?'Sending as signals':'Removing delivery information'}</b><span>${i+1} / 9 · ${player.status}</span></div><div class="encapsulation-path"><div class="${i<4?'active':''}">Computer A<br><small>Sender ↓</small></div><span>→ connection →</span><div class="${i>4?'active':''}">Computer B<br><small>Receiver ↑</small></div></div><div class="osi-wrapper-view" aria-label="Delivery wrappers">${payload}</div>${i===4?`<p class="osi-binary-preview"><b>Message bits${state.bytes.length>8?' (first 8 bytes)':''}:</b> ${state.bytes.slice(0,8).map(n=>n.toString(2).padStart(8,'0')).join(' ')}</p>`:''}<div class="step-card" aria-live="polite"><b>${esc(parts.unit)}</b><p>${explanations[i]}</p></div><div class="control-row">${button('Previous','previous')}${button('Next step','advance','primary')}${button('Reset','reset')}${button(player.running?'Pause autoplay':'Autoplay','toggle')}</div><p class="small">Illustrative Transmission Control Protocol (TCP), Internet Protocol (IP), and Ethernet delivery on one local network. Ports are example values; wrappers are explanatory, not real transmitted packets. Text uses Universal Character Set Transformation Format, 8-bit (UTF-8) encoding.</p>`;
 }
 function draw(){
  root.innerHTML=markup(index);reserveSimulationSpace(root,Array.from({length:9},(_,i)=>markup(i)));
  const field=root.querySelector('[name="encapsulation-message"]');field.maxLength=24;
  field.onfocus=()=>{player.pause();root.querySelector('.journey-heading>span:last-child').textContent=`${index+1} / 9 · ${player.status}`;root.querySelector('[data-action="toggle"]').textContent='Autoplay';};
  root.querySelector('form').onsubmit=e=>{e.preventDefault();const value=field.value;if(!value.trim()){field.setCustomValidity('Enter a short message.');field.reportValidity();return;}field.setCustomValidity('');message=value.slice(0,24);player.reset();draw();};
  field.oninput=()=>field.setCustomValidity('');
  wire(root,{previous:()=>{player.previous();draw();},advance:()=>{player.next();draw();},reset:()=>{player.reset();draw();},toggle:()=>{if(player.running){player.pause();draw();}else player.resume();}});
  root.querySelector('[data-action="previous"]').disabled=index===0;root.querySelector('[data-action="advance"]').disabled=index===8;
 }
 draw();return ()=>player.dispose();
}
