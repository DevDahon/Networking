import {topologyConnections} from './topologyDiagram.js';
import {packetPosition} from './packetMotion.js';
import {esc} from './ui.js';

export function topologyExampleDiagram(slide,state){
 const {nodes,edges}=slide.diagram,step=state.stage||{},path=step.route||[],focus=step.focus||[];
 const point=packetPosition(step.motion?.nodes||nodes,step.motion?.route||path,state.progress||0);
 const motionPath=(step.motion?.route||path).map((n,i)=>{const node=(step.motion?.nodes||nodes)[n];return `${i?'L':'M'}${node.x} ${node.y}`;}).join(' ');
 return `<svg class="classroom-example" viewBox="0 0 800 340" role="img" aria-label="${esc(slide.title)} connection example">${topologyConnections(slide.topologyKind,edges,nodes.map(n=>[n.x,n.y]),{failed:step.failedLink??-1,path})}${point?`<path class="example-flow-path" d="${motionPath}" stroke="#0d9488" stroke-width="5" fill="none"/>`:''}${nodes.map((n,i)=>`<g data-example-node="${i}" data-device-kind="${esc(n.kind)}" transform="translate(${n.x},${n.y})"><rect x="-53" y="-25" width="106" height="50" rx="8" fill="${focus.includes(i)?'#ccfbf1':'#eff6ff'}" stroke="#2563eb" stroke-width="2"/><text y="6" text-anchor="middle" font-size="16" fill="#0f172a">${esc(n.label)}</text></g>`).join('')}${point?`<circle data-example-packet cx="${point.x}" cy="${point.y}" r="8" fill="#f59e0b" stroke="#92400e" stroke-width="2"/>`:''}</svg>`;
}
