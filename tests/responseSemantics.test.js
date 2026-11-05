import {it,expect} from 'vitest';
import {topics} from '../src/topics/topicRegistry.js';
import {examplePlan} from '../src/simulations/exampleModels.js';
import {introDiagrams} from '../src/simulations/intro.js';
import {classroomExample} from '../src/components/classroomExample.js';

it.each([1,2])('topic %i printer returns acceptance status rather than the document or a guarantee of printing',number=>{
 const topic=topics[number-1],slide=topic.slides.find(s=>s.kind==='example'&&s.diagram.nodes.some(n=>n.kind==='printer'));
 const steps=examplePlan(topic.id,slide,{source:'4'}),reply=steps.at(-1);
 expect(steps[1].route).toEqual([4,0,6]);expect(reply.route).toEqual([6,0,4]);
 expect(reply.facts).toContainEqual(['Response','Job accepted / queued']);
 expect(reply.facts).toContainEqual(['Printing finished?','Not established by this response']);
 expect(steps.map(step=>step.text).join(' ')).not.toContain('page 1 of 1 printed');
 const disconnected=examplePlan(topic.id,slide,{source:'4',scenario:'fault'});
 expect(disconnected.every(step=>step.route.length===0)).toBe(true);
});

it('keeps local printer acceptance separate from Internet availability',()=>{
 const steps=examplePlan(topics[0].id,{exampleId:'intro-internet',diagram:introDiagrams.internet},{scenario:'fault'});
 expect(steps[1].route).toEqual([2,1,0]);expect(steps[1].facts).toContainEqual(['Response','Job accepted / queued']);
 expect(steps.at(-1).ok).toBe(false);expect(steps.at(-1).route).toEqual([]);
});

it('makes the sharing host send the file or permission error while its folder remains a stored resource',()=>{
 const topic=topics[14],slide=topic.slides.find(s=>s.kind==='example');
 expect(slide.diagram.nodes[2].kind).toBe('resource');
 expect(slide.diagram.edges).toEqual([[0,1]]);expect(slide.diagram.resourceEdges).toEqual([[1,2]]);
 const allowed=examplePlan(topic.id,slide).at(-1),denied=examplePlan(topic.id,slide,{scenario:'fault'}).at(-1);
 expect(allowed.route).toEqual([1,0]);expect(allowed.facts).toContainEqual(['Response','Requested file data']);
 expect(denied.route).toEqual([1,0]);expect(denied.ok).toBe(false);
 expect(denied.facts).toContainEqual(['Response','Access denied; no file modification']);
 const root=document.createElement('div');root.innerHTML=classroomExample(slide);
 expect(root.querySelector('.example-resource-link')).not.toBeNull();
});

it('shows both directions for the compatible static-address pair',()=>{
 const topic=topics[11],slide=topic.slides.find(s=>s.kind==='example'),steps=examplePlan(topic.id,slide);
 expect(steps[2].route).toEqual([0,1,2]);expect(steps[3].route).toEqual([2,1,0]);
 expect(examplePlan(topic.id,slide,{scenario:'fault'}).at(-1).route).toEqual([]);
});
