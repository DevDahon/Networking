import {it,expect} from 'vitest';
import {topics} from '../src/topics/topicRegistry.js';
import {examplePlan} from '../src/simulations/exampleModels.js';
import {classroomExample} from '../src/components/classroomExample.js';

it('provides independent visible examples for all six topologies',()=>{
 const examples=topics[2].slides.filter(s=>s.kind==='example');
 expect(examples.map(s=>s.title)).toEqual(['Star Topology','Bus Topology','Ring Topology','Mesh Topology','Tree Topology','Hybrid Topology']);
 expect(topics[2].slides).toHaveLength(15);
 expect(topics[2].slides.slice(4,10).every(s=>s.kind==='example')).toBe(true);
 expect(topics[2].slides.some(s=>s.kind==='walkthrough')).toBe(false);
 for(const slide of examples){expect(slide.exampleTitle).toMatch(/^Example:/);expect(slide.lead).toBeTruthy();}
});

it.each(['Bus','Ring','Mesh','Tree','Hybrid'])('%s has a real path model and a distinct link-failure outcome',kind=>{
 const slide=topics[2].slides.find(s=>s.topologyKind===kind);
 const healthy=examplePlan(topics[2].id,slide),failed=examplePlan(topics[2].id,slide,{scenario:'fault'});
 expect(healthy[2].route.length).toBeGreaterThan(1);expect(healthy.at(-1).ok).toBe(true);
 expect(failed.at(-1).ok).toBe(kind==='Mesh');
 if(kind==='Mesh')expect(failed[2].route).toEqual([0,1,4]);
 else expect(failed[2].route).toEqual([]);
 const root=document.createElement('div');root.innerHTML=classroomExample(slide,{stage:failed[2]});
 expect(root.querySelectorAll('[data-example-node]')).toHaveLength(5);
 expect(root.querySelectorAll('[data-topology-link]')).toHaveLength(slide.diagram.edges.length);
 expect(root.querySelector('path[stroke="#dc2626"]')).not.toBeNull();
});

it('moves bus data along the shared backbone instead of through each computer',()=>{
 const slide=topics[2].slides.find(s=>s.topologyKind==='Bus'),step=examplePlan(topics[2].id,slide)[2];
 expect(step.motion.nodes.map(n=>[n.x,n.y])).toEqual([[100,230],[100,140],[700,140],[700,230]]);
 expect(step.pathDescription).toContain('shared backbone');
 const root=document.createElement('div');root.innerHTML=classroomExample(slide,{stage:step,progress:.5});
 expect(root.querySelector('[data-example-packet]').getAttribute('cy')).toBe('140');
});
