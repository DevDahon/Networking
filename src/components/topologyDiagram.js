// Identical diagram coordinates in the workbench and path demonstration.
export function topologyCoordinates(kind,count=5){
 const fixed={
  Star:[[400,170],[140,70],[660,70],[140,280],[660,280]],
  Bus:[[100,230],[250,230],[400,230],[550,230],[700,230]],
  Tree:[[400,60],[220,160],[580,160],[220,280],[580,280]],
  Hybrid:[[230,110],[100,280],[570,110],[460,280],[700,280]]
 };
 return fixed[kind]||Array.from({length:count},(_,i)=>[400+Math.cos((i*360/count-90)*Math.PI/180)*260,170+Math.sin((i*360/count-90)*Math.PI/180)*120]);
}

export function topologyConnections(kind,edges,xy,{failed=-1,dead=-1,path=[]}={}){
 const selected=(a,b)=>path.some((node,i)=>i>0&&((path[i-1]===a&&node===b)||(path[i-1]===b&&node===a)));
 const links=edges.map(([a,b],index)=>{
  const broken=index===failed||a===dead||b===dead;
  const [x1,y1]=xy[a],[x2,y2]=xy[b];
  const d=kind==='Bus'?`M${x1} 140H${x2}`:`M${x1} ${y1}L${x2} ${y2}`;
  return `<path data-topology-link="${index}" d="${d}" fill="none" stroke="${broken?'#dc2626':selected(a,b)?'#0d9488':'#94a3b8'}" stroke-width="4" ${broken?'stroke-dasharray="9 7"':''}/>`;
 }).join('');
 if(kind!=='Bus')return links;
 // A classic bus is a shared backbone with taps, not a chain of computers
 // forwarding other computers' traffic. End bars represent termination.
 return `<g aria-label="Shared coaxial backbone with terminated ends"><path d="M70 140H100M700 140H730M70 124V156M730 124V156" stroke="#64748b" stroke-width="4" fill="none"/>${xy.map(([x,y],i)=>`<path d="M${x} 140V${y}" stroke="${i===dead?'#dc2626':'#94a3b8'}" stroke-width="3" fill="none"/>`).join('')}<text x="400" y="104" text-anchor="middle" font-size="18" fill="#475569">Shared backbone</text></g>${links}`;
}
