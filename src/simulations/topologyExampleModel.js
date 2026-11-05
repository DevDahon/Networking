import {layouts} from './models.js';
import {topologyPath} from './extraModels.js';

export function topologyExamplePlan(slide,scenario){
 const kind=slide.topologyKind,model=layouts[kind],failed=scenario==='fault'?{Bus:1,Ring:1,Mesh:3,Tree:1,Hybrid:1}[kind]:-1;
 const [source,target]={Bus:[0,4],Ring:[0,3],Mesh:[0,4],Tree:[3,4],Hybrid:[1,3]}[kind];
 const path=kind==='Ring'&&failed<0?[0,1,2,3]:topologyPath(kind,source,target,failed);
 const connected=path.length>0,removed=failed<0?'None':model.edges[failed].map(i=>slide.diagram.nodes[i].label).join(' ↔ ');
 const scope={Bus:'A broken backbone disrupts this classic shared segment. A disconnected tap is a different condition.',Ring:'This unprotected ring cannot maintain its required circulation across the break.',Mesh:'The graph selects another connected path. This is graph routing, not an unmanaged Ethernet loop.',Tree:'The upstream break separates Branch B and Computer B from the core; Branch A still has its core link.',Hybrid:'The backbone break separates the two switched groups; connections inside each working group remain.'}[kind];
 const make=(title,text,focus=[],route=[],ok=true,facts=[])=>({title,text,focus,route,ok,facts,failedLink:failed});
 const delivery=make(connected?'Follow the available path':'No delivery path under these assumptions',connected?kind==='Bus'?'The source places a signal on the shared backbone. The destination receives it through its tap; intermediate computers are not forwarding hops.':`The highlighted path connects ${slide.diagram.nodes[source].label} to ${slide.diagram.nodes[target].label}.`:'The selected break prevents this modeled exchange. Replacing an address does not repair the missing connection.',connected?path:[source],path,connected,[['Removed link',removed]]);
 if(kind==='Bus'&&connected){
  const a=slide.diagram.nodes[source],b=slide.diagram.nodes[target];
  delivery.motion={nodes:[a,{x:a.x,y:140},{x:b.x,y:140},b],route:[0,1,2,3]};
  delivery.pathDescription=`${a.label} → shared backbone → ${b.label}`;
 }
 return [
  make('Recognize the connection pattern',slide.lead,slide.diagram.nodes.map((_,i)=>i),[],true,[['Topology',kind],['Nodes',String(model.nodes.length)],['Links',String(model.edges.length)]]),
  make('Identify the two endpoints',`${slide.diagram.nodes[source].label} is the source and ${slide.diagram.nodes[target].label} is the destination. The connecting pattern determines which paths can be used.`,[source,target]),
  delivery,
  make(failed<0?'Understand the failure scope':'Compare the effect of the removed link',failed<0?`The intact layout permits this example’s exchange. ${scope}`:scope,connected?path:[source],[],connected,[['Result',connected?'Path available':'Path unavailable']])
 ];
}
