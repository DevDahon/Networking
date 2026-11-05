import {it,expect,afterEach} from 'vitest';
import {topics} from '../src/topics/topicRegistry.js';
import {topologyCoordinates,topologyConnections} from '../src/components/topologyDiagram.js';
import {topology} from '../src/simulations/foundations.js';
import {pathTraceDemo} from '../src/simulations/extraScenes.js';
import {layouts} from '../src/simulations/models.js';
let dispose;
afterEach(()=>{dispose?.();dispose=null;});

it('teaches topology concepts, a consistent star example, simulations, then design',()=>{
 const slides=topics[2].slides;
 expect(slides.map(s=>s.kind)).toEqual(['title','objectives','concept','concept','example','example','example','example','example','example','demo','demo','concept','application','summary']);
 expect(slides[10].type).toBe('topology');expect(slides[11].type).toBe('pathTraceDemo');
 expect(slides[4].items.join(' ')).toContain('Five computers and one printer');
 expect(slides[4].items.join(' ')).not.toContain('Eight');
 expect(slides[13].items.join(' ')).toContain('ten switch ports');
});

it.each(Object.keys(layouts))('uses the same readable %s layout in both simulations',kind=>{
 document.body.innerHTML='<div id="a"></div><div id="b"></div>';
 const workbench=document.querySelector('#a'),tracer=document.querySelector('#b');
 topology(workbench);dispose=pathTraceDemo(tracer);
 for(const root of [workbench,tracer]){const select=root.querySelector('[name="kind"]');select.value=kind;select.dispatchEvent(new Event('change'));}
 const links=root=>[...root.querySelectorAll('[data-topology-link]')].map(path=>path.getAttribute('d'));
 expect(links(workbench)).toEqual(links(tracer));
 expect(links(workbench)).toHaveLength(layouts[kind].edges.length);
 for(const [x,y] of topologyCoordinates(kind)){
  expect(x-53).toBeGreaterThanOrEqual(0);expect(x+53).toBeLessThanOrEqual(800);
  expect(y-25).toBeGreaterThanOrEqual(0);expect(y+25).toBeLessThanOrEqual(340);
 }
});

it('draws a bus backbone with taps and highlights traced links separately from failed links',()=>{
 const root=document.createElement('div'),xy=topologyCoordinates('Bus');
 root.innerHTML=`<svg>${topologyConnections('Bus',layouts.Bus.edges,xy,{failed:1,path:[0,1]})}</svg>`;
 expect(root.textContent).toContain('Shared backbone');
 expect(root.querySelector('[data-topology-link="0"]').getAttribute('stroke')).toBe('#0d9488');
 expect(root.querySelector('[data-topology-link="1"]').getAttribute('stroke')).toBe('#dc2626');
 expect(root.querySelector('[data-topology-link="1"]').getAttribute('d')).toBe('M250 140H400');
});
