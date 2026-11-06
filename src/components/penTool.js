import {esc} from './ui.js';

// Coordinates are relative to the slide, so ink stays aligned after resizing.
export function mountPenTool(stage,header,state){
 const ns='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(ns,'svg');
 svg.classList.add('slide-ink');svg.setAttribute('viewBox','0 0 1000 1000');svg.setAttribute('preserveAspectRatio','none');
 svg.setAttribute('aria-label','Slide drawing surface');
 stage.append(svg);
 const toolbar=document.createElement('div');toolbar.className='pen-toolbar';toolbar.hidden=true;
 toolbar.setAttribute('role','toolbar');toolbar.setAttribute('aria-label','Slide drawing tools');
 toolbar.innerHTML=`<button type="button" data-ink="pointer" aria-pressed="false">Pointer</button><button type="button" data-ink="laser" aria-pressed="false">Laser</button><button type="button" data-ink="pen" aria-pressed="true">Pen</button><button type="button" data-ink="eraser" aria-pressed="false">Eraser</button><label for="pen-color">Color <input id="pen-color" name="pen-color" aria-label="Pen color" type="color" value="${esc(state.color)}"></label><label for="pen-thickness">Thickness <select id="pen-thickness" name="pen-thickness" aria-label="Pen thickness"><option value="3">Thin</option><option value="5">Medium</option><option value="9">Thick</option></select></label><button type="button" data-ink="undo">Undo</button><button type="button" data-ink="clear">Clear ink</button>`;
 stage.append(toolbar);toolbar.querySelector('select').value=String(state.width);
 const toggle=document.createElement('button');toggle.type='button';toggle.setAttribute('aria-label','Pen tool');toggle.title='Pen tool';toggle.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 3 5 5-12 12-6 1 1-6Z"/><path d="m14 5 5 5M4 15l5 5"/></svg>';toggle.setAttribute('aria-expanded','false');header.prepend(toggle);
 let mode='pen',open=false,active=null,before=null,changed=false,laserPos=null;
 const clone=()=>state.strokes.map(s=>({...s,points:s.points.map(p=>({...p}))}));
 function paint(){
  svg.replaceChildren();
  for(const stroke of state.strokes){
   const path=document.createElementNS(ns,'path');const points=stroke.points;
   path.setAttribute('d',`M${points.map(p=>`${p.x},${p.y}`).join(' L')}${points.length===1?' l0.01,0':''}`);
   path.setAttribute('fill','none');path.setAttribute('stroke',stroke.color);path.setAttribute('stroke-width',stroke.width);path.setAttribute('stroke-linecap','round');path.setAttribute('stroke-linejoin','round');path.setAttribute('vector-effect','non-scaling-stroke');svg.append(path);
  }
  if(mode==='laser'&&laserPos){
   const g=document.createElementNS(ns,'g');
   g.setAttribute('class','laser-pointer-group');
   g.innerHTML=`<circle cx="${laserPos.x}" cy="${laserPos.y}" r="16" fill="#ef4444" opacity="0.35"/><circle cx="${laserPos.x}" cy="${laserPos.y}" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>`;
   svg.append(g);
  }
  toolbar.querySelector('[data-ink="undo"]').disabled=!state.undo.length;
  toolbar.querySelector('[data-ink="clear"]').disabled=!state.strokes.length;
 }
 function update(){svg.classList.toggle('ink-enabled',open&&mode!=='pointer');svg.classList.toggle('ink-eraser',mode==='eraser');svg.classList.toggle('ink-laser',open&&mode==='laser');toolbar.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.classList.toggle('primary',open);for(const button of toolbar.querySelectorAll('[aria-pressed]'))button.setAttribute('aria-pressed',String(button.dataset.ink===mode));}
 function finish(){if(active===null)return;if(changed){state.undo.push(before);if(state.undo.length>30)state.undo.shift();}const pointer=active;active=null;before=null;changed=false;try{svg.releasePointerCapture?.(pointer);}catch{}paint();}
 function point(event){const rect=svg.getBoundingClientRect();if(!rect.width||!rect.height)return null;return {x:Math.max(0,Math.min(1000,(event.clientX-rect.left)/rect.width*1000)),y:Math.max(0,Math.min(1000,(event.clientY-rect.top)/rect.height*1000))};}
 function erase(p){
  const rect=svg.getBoundingClientRect(),px=p.x*rect.width/1000,py=p.y*rect.height/1000;
  const near=(a,b,width)=>{const ax=a.x*rect.width/1000,ay=a.y*rect.height/1000,bx=b.x*rect.width/1000,by=b.y*rect.height/1000,dx=bx-ax,dy=by-ay;const t=Math.max(0,Math.min(1,((px-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy||1)));return Math.hypot(px-ax-t*dx,py-ay-t*dy)<=12+width/2;};
  const remaining=state.strokes.filter(s=>!s.points.some((a,i)=>near(a,s.points[i+1]||a,s.width)));
  if(remaining.length!==state.strokes.length){state.strokes=remaining;changed=true;}
 }
 const onDown=e=>{if(!open||mode==='pointer'||e.button!==0)return;const p=point(e);if(!p)return;if(mode==='laser'){laserPos=p;paint();return;}if(active!==null)return;e.preventDefault();active=e.pointerId;before=clone();try{svg.setPointerCapture?.(active);}catch{}if(mode==='eraser')erase(p);else{state.strokes.push({color:state.color,width:state.width,points:[p]});changed=true;}paint();};
 const onMove=e=>{if(mode==='laser'){const p=point(e);if(p){laserPos=p;paint();}return;}if(e.pointerId!==active||active===null)return;const p=point(e);if(!p)return;e.preventDefault();if(mode==='eraser')erase(p);else state.strokes.at(-1).points.push(p);paint();};
 const onUp=e=>{if(e.pointerId===active)finish();};
 const onLeave=()=>{if(mode==='laser'&&laserPos){laserPos=null;paint();}};
 const listeners={pointerdown:onDown,pointermove:onMove,pointerup:onUp,pointerleave:onLeave,pointercancel:finish,lostpointercapture:finish};
 for(const [event,handler] of Object.entries(listeners))svg.addEventListener(event,handler);
 toggle.onclick=()=>{finish();open=!open;if(!open)laserPos=null;update();paint();};
 toolbar.onclick=e=>{const action=e.target.closest('[data-ink]')?.dataset.ink;if(!action)return;finish();if(['pointer','laser','pen','eraser'].includes(action)){mode=action;if(mode!=='laser')laserPos=null;}else if(action==='undo'&&state.undo.length)state.strokes=state.undo.pop();else if(action==='clear'&&state.strokes.length){state.undo.push(clone());state.strokes=[];}paint();update();};
 toolbar.querySelector('input').oninput=e=>{state.color=e.target.value;};toolbar.querySelector('select').onchange=e=>{state.width=Number(e.target.value);};
 const escape=e=>{if(e.key==='Escape'&&open){finish();open=false;update();}};window.addEventListener('keydown',escape);
 paint();update();
 return ()=>{finish();for(const [event,handler] of Object.entries(listeners))svg.removeEventListener(event,handler);window.removeEventListener('keydown',escape);svg.remove();toolbar.remove();toggle.remove();};
}
