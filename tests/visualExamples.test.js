import {it,expect} from 'vitest';
import {topics} from '../src/topics/topicRegistry.js';
import {classroomExample} from '../src/components/classroomExample.js';

it.each(topics.map(topic=>[topic.id]))('places a labeled visual example inside the discussion: %s',id=>{
 const topic=topics.find(topic=>topic.id===id),examples=topic.slides.filter(slide=>slide.kind==='example');
 expect(examples.length).toBeGreaterThan(0);
 for(const slide of examples){
  const index=topic.slides.indexOf(slide);
  expect(index).toBeGreaterThan(2);expect(index).toBeLessThan(topic.slides.length-2);
  if(![1,2].includes(topic.number))expect(topic.slides[index-1].kind).not.toBe('example');
  const root=document.createElement('div');root.innerHTML=classroomExample(slide);
  expect(root.querySelectorAll('[data-example-node]')).toHaveLength(slide.diagram.nodes.length);
  expect(root.querySelectorAll('li')).toHaveLength(slide.items.length);
  for(const [a,b] of slide.diagram.edges){expect(slide.diagram.nodes[a]).toBeDefined();expect(slide.diagram.nodes[b]).toBeDefined();}
 }
});

it('follows the four-type overview with four examples and connects exactly five computers and one printer through the switch',()=>{
 const topic=topics.find(topic=>topic.id==='01-introduction-to-networking');
 const local=topic.slides.find(slide=>slide.kind==='example'&&slide.title==='Local Area Network (LAN)');
 expect(local).toBeDefined();
 expect(local.exampleTitle).toBe('Example: Five computers share one network printer');
 expect(local.lead).toBe('A Local Area Network connects devices within a limited area, such as a room, building, or campus. It lets those devices exchange data and share resources through wired or wireless links.');
 const rendered=document.createElement('div');rendered.innerHTML=classroomExample(local);
 expect(rendered.firstElementChild.className).toBe('example-heading');
 for(const slide of topic.slides.slice(topic.slides.indexOf(local)-1,topic.slides.indexOf(local)+3)){
  expect(slide.lead.match(/[.!?](?:\s|$)/g)).toHaveLength(2);
 }
 const overview=topic.slides.findIndex(slide=>slide.title==='Four network coverage types');
 expect(topic.slides[overview].items).toHaveLength(4);
 expect(topic.slides.slice(overview+1,overview+5).map(slide=>slide.kind)).toEqual(['example','example','example','example']);
 expect(topic.slides.slice(overview+1,overview+5).map(slide=>slide.title)).toEqual(['Personal Area Network (PAN)','Local Area Network (LAN)','Metropolitan Area Network (MAN)','Wide Area Network (WAN)']);
 expect(local.diagram.nodes.filter(node=>node.kind==='computer')).toHaveLength(5);
 expect(local.diagram.nodes.filter(node=>node.kind==='printer')).toHaveLength(1);
 expect(local.diagram.edges).toHaveLength(6);
 expect(local.diagram.edges.every(([a])=>local.diagram.nodes[a].kind==='switch')).toBe(true);
 expect(topic.slides.filter(slide=>slide.kind==='example')).toHaveLength(5);
});
