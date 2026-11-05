// Measure all steps at the same logical width before animation starts. The
// invisible probes do not take part in layout or receive keyboard focus.
const measured=new WeakMap();
const panels=['.example-current','.step-card','.feedback'];
export function reserveSimulationSpace(root,variants){
 const width=root.offsetWidth;
 if(!width||!root.parentElement)return;
 const key=`${width}/${variants.join('').replace(/\b(?:cx|cy)="[^"]*"/g,'')}`;
 const saved=measured.get(root);
 const apply=heights=>{for(const [selector,height] of Object.entries(heights))root.querySelectorAll(selector).forEach(panel=>{panel.style.minHeight=`${height}px`;});};
 if(saved?.key===key){apply(saved.panels);root.style.minHeight=`${saved.height}px`;return;}
 const probe=root.cloneNode(false);
 probe.removeAttribute('id');probe.setAttribute('aria-hidden','true');probe.inert=true;
 Object.assign(probe.style,{position:'absolute',left:'0px',top:'0px',width:`${width}px`,height:'auto',minHeight:'0px',visibility:'hidden',pointerEvents:'none',transform:'none'});
 root.after(probe);
 let height=0;const heights={};
 try{
  for(const html of variants){
   probe.innerHTML=html;
   for(const selector of panels)for(const panel of probe.querySelectorAll(selector))heights[selector]=Math.max(heights[selector]||0,panel.offsetHeight,panel.scrollHeight);
  }
  for(const html of variants){
   probe.innerHTML=html;
   for(const [selector,size] of Object.entries(heights))probe.querySelectorAll(selector).forEach(panel=>{panel.style.minHeight=`${size}px`;});
   height=Math.max(height,probe.offsetHeight,probe.scrollHeight);
  }
 }finally{probe.remove();}
 if(height){const next=Math.max(Number.parseFloat(root.style.minHeight)||0,height+2);apply(heights);root.style.minHeight=`${next}px`;measured.set(root,{key,panels:heights,height:next});}
}
