import { it, expect } from 'vitest';
import { topics } from '../src/topics/topicRegistry.js';
import { sequenceTopic, sequenceMoves } from '../src/topics/sequenceTopics.js';

const constraints=[
 [1,'Two network service architectures','@availabilityDemo'],
 [2,'@topology','Choosing a Network Topology'],
 [3,'How Interfaces and Switches Connect Local Devices','@macLearningDemo'],
 [4,'Seven OSI layer responsibilities','What Is Encapsulation?'],
 [6,'The Subnet Mask: The Dividing Boundary','@bitwiseDemo'],
 [6,'Example: two manually configured classroom computers','@asymmetricDemo'],
 [6,'Windows Static Address Configuration Procedure','@static'],
 [7,'Domain Name System (DNS)','@dnsCacheDemo'],
 [7,'Example: open a protected school website','@protocolWeb'],
 [8,'@dhcp','@reservedPoolDemo'],
 [9,'Two protected Wi-Fi security options','Example: a laptop joins classroom Wi-Fi'],
 [10,'Publishing and Accessing a Windows Shared Folder','@sharing'],
 [11,'Nine modeled network faults','Example: numeric access works but a name fails']
];

it.each(constraints)('keeps the prerequisite beside its demonstration in topic %i: %s → %s', (number, first, next) => {
    const slides = topics.find(t => t.number === number).slides;
    const find = key => slides.findIndex(s => key.startsWith('@') ? s.type === key.slice(1) : s.title === key);
    expect(find(first)).toBeGreaterThan(1); expect(find(next)).toBe(find(first) + 1);
});

it('reviews every topic and retains all slide content, boundaries, and simulation counts',()=>{
 expect(Object.keys(sequenceMoves)).toHaveLength(11);
 expect(topics.reduce((sum,t)=>sum+t.slides.length,0)).toBe(185);
 for(const topic of topics){
  expect(topic.slides[0].kind).toBe('title');expect(topic.slides[1].kind).toBe('objectives');expect(topic.slides.at(-1).kind).toBe('summary');
  if(topic.id!=='06-network-cables-media')expect(topic.slides.filter(s=>s.type||s.kind==='example').length).toBeGreaterThanOrEqual(2);
  expect(topic.slides.every(s=>s.notes.transition.length>20)).toBe(true);
 }
 expect(topics[0].slides.some(s => s.type === 'transferDemo')).toBe(false);
});

it('rejects stale ordering targets rather than silently omitting a demonstration', () => {
    expect(() => sequenceTopic({ id: '01-introduction-to-networking', slides: [] })).toThrow('expected one sequence target');
});

it('keeps the introduction concise without redundant simulations or empty walkthroughs', () => {
    const intro = topics[0];
    expect(intro.slides).toHaveLength(22);
    expect(intro.slides.some(s => s.type === 'communication' || s.kind === 'walkthrough')).toBe(false);
    expect(intro.slides.filter(s => s.kind === 'example')).toHaveLength(5);
    expect(intro.slides.some(s => s.type === 'transferDemo')).toBe(false);
    expect(intro.slides.at(-1).kind).toBe('summary');
});
