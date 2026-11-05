// Positions are always SVG viewBox coordinates, never screen coordinates.
export function packetPosition(nodes,route,progress){
 if(route.length<2)return null;
 const points=route.map(index=>nodes[index]);
 if(points.some(point=>!point||!Number.isFinite(point.x)||!Number.isFinite(point.y)))return null;
 const lengths=points.slice(1).map((point,index)=>Math.hypot(point.x-points[index].x,point.y-points[index].y));
 const total=lengths.reduce((sum,length)=>sum+length,0);
 let distance=Math.max(0,Math.min(1,Number(progress)||0))*total;
 for(let i=0;i<lengths.length;i++){
  if(distance<=lengths[i]||i===lengths.length-1){
   const fraction=lengths[i]?Math.min(1,distance/lengths[i]):0;
   return {x:points[i].x+(points[i+1].x-points[i].x)*fraction,y:points[i].y+(points[i+1].y-points[i].y)*fraction};
  }
  distance-=lengths[i];
 }
 return {x:points[0].x,y:points[0].y};
}

export function animatePacket(svg,nodes,route,{progress=0,duration=2000,onProgress=()=>{}}={}){
 const marker=svg?.querySelector('[data-example-packet],[data-network-packet]');
 if(!marker||typeof window.requestAnimationFrame!=='function')return ()=>{};
 let frame=null,disposed=false;
 const start=performance.now(),initial=Math.max(0,Math.min(1,progress));
 function tick(time){
  if(disposed||!marker.isConnected)return;
  const value=Math.min(1,initial+Math.max(0,time-start)/duration),point=packetPosition(nodes,route,value);
  if(!point)return;
  marker.setAttribute('cx',point.x);marker.setAttribute('cy',point.y);onProgress(value);
  if(value<1)frame=window.requestAnimationFrame(tick);
 }
 frame=window.requestAnimationFrame(tick);
 return ()=>{disposed=true;if(frame!==null)window.cancelAnimationFrame(frame);};
}
