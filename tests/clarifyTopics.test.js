import {it,expect} from 'vitest';
import {topics} from '../src/topics/topicRegistry.js';
import {clarifyTopic} from '../src/topics/clarifyTopics.js';

it('introduces the main idea visibly on every discussion, example, and simulation slide',()=>{
 const discussion=topics.flatMap(topic=>topic.slides.filter(s=>!['title','objectives','summary'].includes(s.kind)));
 expect(discussion).toHaveLength(170);
 for(const slide of discussion){
  expect(slide.lead).toBeTypeOf('string');
  expect(slide.lead).toMatch(/\.$/);
  expect(slide.lead).not.toMatch(/how the process works, step by step|conceptual animation|modeled network|browser-only|real calculation|select a layer|choose a medium/i);
 }
});

it('clarifies wording without altering learning content, controls, or topic boundaries',()=>{
 const fixture={id:'01-introduction-to-networking',objectives:['Recognize communication'],slides:[
  {kind:'title',title:'Introduction to Networking',notes:{opening:'Introduce this subject.'}},
  {kind:'concept',title:'Five parts of a conversation',items:['Sender','Receiver','Message','Medium','Protocol'],expectedCount:5,notes:{}},
  {kind:'demo',type:'introConnections',title:'How Devices Connect',notes:{}},
  {kind:'summary',title:'Summary of the Discussion',items:['The core ideas'],notes:{opening:'Recall the core ideas.'}}
 ]};
 // Use the complete coverage check rather than permitting a partly edited deck.
 expect(()=>clarifyTopic(fixture)).toThrow('Unused concept copy');
 expect(fixture.slides[1].title).toBe('Five parts of a conversation');
 expect(fixture.slides[1].items).toEqual(['Sender','Receiver','Message','Medium','Protocol']);
 const intro=topics[0];
 expect(intro.slides[7]).toMatchObject({title:'Five Elements of Data Communication',expectedCount:5});
 expect(intro.slides[7].items).toHaveLength(5);
 expect(intro.slides.some(s=>s.type==='transferDemo')).toBe(false);
 expect(intro.slides.at(-1).kind).toBe('summary');
});

it('keeps the network-type title, two-sentence description, and example heading distinct',()=>{
 const local=topics[0].slides.find(s=>s.title==='Local Area Network (LAN)');
 expect(local.lead).toBe('A Local Area Network connects devices within a limited area, such as a room, building, or campus. It lets those devices exchange data and share resources through wired or wireless links.');
 expect(local.exampleTitle).toBe('Example: Five computers share one network printer');
});
