import {osiResponsibilitiesVisual} from './osiWalkthroughs.js';
import {reserveSimulationSpace} from '../components/simulationSpace.js';
import {animatePacket} from '../components/packetMotion.js';
import {cableExample} from '../components/cableExample.js';
import {classroomExample} from '../components/classroomExample.js';
import {esc,button,select,wire} from '../components/ui.js';
import {createPlayback} from './playback.js';
import {exampleOptions,examplePlan} from './exampleModels.js';
import {getSavedNodeStyle,setSavedNodeStyle} from '../components/networkSymbols.js';

export function automaticExample(root,slide,topic){
 let index=0,config={scenario:'healthy',source:'3',nodeStyle:getSavedNodeStyle()},steps,disposed=false;
 let releaseMotion=()=>{},motionKey='',progress=0,completed=false;
 const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches||false;
 const options=exampleOptions(topic,slide),hasSource=slide.diagram.nodes.length===7,showTopology=Boolean(slide.topologyKind);
 const player=createPlayback({advance:()=>{
  // Every step, including a return message, gets its full animation interval.
  if(index===steps.length-1){completed=true;return false;}
  index++;return true;
 },render:draw});
 root.classList.add('automatic-example');
 function diagram(){
  const copy={...slide,diagram:{...slide.diagram,nodes:slide.diagram.nodes.map(n=>({...n}))}};
  if(topic==='10-static-ip'||slide.title==='Example: two manually configured classroom computers')copy.diagram.nodes[2].detail=config.scenario==='fault'?'192.168.1.200/25':'192.168.1.20/24';
  if(slide.title==='Example: a room link and a building link'||(topic==='06-network-cables-media'&&!slide.title?.includes('patch cable')))copy.diagram.nodes[2].detail=config.scenario==='fault'?'180 m copper: exceeds reach':'180 m matching fiber';
  if(topic==='12-router-wireless')copy.diagram.nodes[0].detail=config.scenario==='fault'?'Authentication denied':'SSID: Classroom';
  if(slide.exampleId==='intro-internet'){
   copy.diagram.nodes[4].detail=config.scenario==='fault'?'Internet path unavailable':'Beyond the local network';
   copy.diagram.blockedEdges=config.scenario==='fault'?[3]:[];
  }
  return copy;
 }
 function draw(){
  if(disposed)return;
  releaseMotion();
  steps=examplePlan(topic,slide,config);index=Math.min(index,steps.length-1);
  const nextKey=`${index}/${config.scenario}/${config.source}/${config.nodeStyle}`;
  if(nextKey!==motionKey){motionKey=nextKey;progress=0;}
  if(completed)progress=1;
  const current=steps[index];
  const markup=(current,stepIndex)=>{
   const facts=[...current.facts];
   if(current.route.length>1)facts.push(['Shown path',current.pathDescription||current.route.map(i=>slide.diagram.nodes[i].label).join(' → ')]);
   return `${options.length||hasSource||showTopology?`<div class="control-row example-settings">${hasSource?select('Sending computer','example-source',[1,2,3,4,5].map(n=>[n,`Computer ${n}`]),config.source):''}${options.length?select('Connection or service condition','example-condition',options,config.scenario):''}${showTopology?select('Node display','example-node-style',[['symbols','Device symbols'],['boxes','Labeled boxes']],config.nodeStyle):''}</div>`:''}${classroomExample(diagram(),{stage:current,speed:player.speed,progress,nodeStyle:config.nodeStyle,customVisual:topic==='osi-reference-model'?osiResponsibilitiesVisual(slide,current,progress):topic==='07-rj45-crimping'||slide.title==='Example: a straight-through patch cable'?cableExample(stepIndex,config.scenario):null})}<section class="example-current ${current.ok?'':'example-stopped'}" aria-live="polite"><b>Step ${stepIndex+1} of ${steps.length} · <span class="example-state">${player.running?'Playing automatically':completed?'Complete':'Paused'}</span></b><h3>${esc(current.title)}</h3><p>${esc(current.text)}</p>${facts.length?`<div class="example-facts">${facts.map(([label,value])=>`<span><b>${esc(label)}:</b> ${esc(value)}</span>`).join('')}</div>`:''}</section><div class="control-row example-controls">${topic==='osi-reference-model'?`${button('Previous','example-previous')}${button('Next step','example-next','primary')}${button('Reset','example-replay')}${button(player.running?'Pause autoplay':'Autoplay','example-toggle')}`:`${button('Replay','example-replay','primary')}${button(player.running?'Pause':'Resume','example-toggle')}${button('Previous step','example-previous')}${button('Next step','example-next')}`}${select('Animation speed','example-speed',[['0.5','0.5×'],['1','1×'],['2','2×']],player.speed)}</div>`;
  };
  root.innerHTML=markup(current,index);
  reserveSimulationSpace(root,steps.map((step,i)=>markup(step,i)));
  const svg=root.querySelector('svg');
  if(player.running&&!reduced)releaseMotion=animatePacket(svg,current.motion?.nodes||slide.diagram.nodes,current.motion?.route||current.route,{progress,duration:2000/player.speed,onProgress:value=>{progress=value;}});
  const source=root.querySelector('[name="example-source"]'),condition=root.querySelector('[name="example-condition"]'),nodeStyleSel=root.querySelector('[name="example-node-style"]');
  function change(){
   player.pause();
   const nextStyle=nodeStyleSel?nodeStyleSel.value:config.nodeStyle;
   if(nodeStyleSel&&nextStyle!==config.nodeStyle)setSavedNodeStyle(nextStyle);
   config={source:source?.value||config.source,scenario:condition?.value||config.scenario,nodeStyle:nextStyle};
   index=0;completed=false;draw();
  }
  if(source)source.onchange=change;if(condition)condition.onchange=change;if(nodeStyleSel)nodeStyleSel.onchange=change;
  root.querySelector('.example-settings')?.addEventListener('focusin',()=>{player.pause();releaseMotion();const status=root.querySelector('.example-state');if(status)status.textContent='Paused';const toggle=root.querySelector('[data-action="example-toggle"]');if(toggle)toggle.textContent='Resume';});
  root.querySelector('[name="example-speed"]').onchange=e=>{player.setSpeed(e.target.value);draw();};
  root.querySelector('[data-action="example-previous"]').disabled=index===0;
  root.querySelector('[data-action="example-next"]').disabled=index===steps.length-1;
  wire(root,{
   'example-replay':()=>{index=0;progress=0;completed=false;if(topic==='osi-reference-model'){player.pause();draw();}else player.play();},
   'example-toggle':()=>{if(player.running){player.pause();draw();}else{if(completed){index=0;progress=0;completed=false;}player.play();}},
   'example-previous':()=>{player.pause();completed=false;index=Math.max(0,index-1);draw();},
   'example-next':()=>{player.pause();completed=false;index=Math.min(steps.length-1,index+1);draw();}
  });
 }
 const visibility=()=>{if(document.hidden){player.pause();draw();}};
 document.addEventListener('visibilitychange',visibility);
 draw();if(topic!=='osi-reference-model'&&!reduced&&!document.hidden)player.play();
 return ()=>{disposed=true;releaseMotion();player.dispose();document.removeEventListener('visibilitychange',visibility);};
}
