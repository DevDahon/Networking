import { it, expect } from 'vitest';
import { topics } from '../src/topics/topicRegistry.js';
import { sequenceTopic, sequenceMoves } from '../src/topics/sequenceTopics.js';

const constraints=[
 [2,'@topology','Choosing a Network Topology'],
 [4,'Seven OSI layer responsibilities','Three Upper Layers (7–5): How Data Is Created'],
 [4,'Three Upper Layers (7–5): How Data Is Created','Four Lower Layers (4–1): How Data Travels'],
 [4,'Four Lower Layers (4–1): How Data Travels','What Is Encapsulation?'],
 [4,'What Is Encapsulation?','Five OSI Protocol Data Units (PDUs)'],
 [6,'Domain Name System (DNS)','@dnsCacheDemo'],
 [6,'Example: open a protected school website','@protocolWeb'],
 [7,'The Subnet Mask: The Dividing Boundary','@bitwiseDemo'],
 [8,'Example: two manually configured classroom computers','@asymmetricDemo'],
 [8,'@asymmetricDemo','@static'],
 [8,'@dhcp','@reservedPoolDemo'],
 [9,'@sharing','@printQueueDemo'],
 [10,'SSID, Authentication, and Isolation','Example: a laptop joins classroom Wi-Fi'],
 [11,'Common Network Fault Symptoms','Example: numeric access works but a name fails'],
 [11,'@troubleshoot','Verifying a Network Repair']
];

it.each(constraints)('keeps the prerequisite beside its demonstration in topic %i: %s → %s', (number, first, next) => {
    const slides = topics.find(t => t.number === number).slides;
    const find = key => slides.findIndex(s => key.startsWith('@') ? s.type === key.slice(1) : s.title === key);
    expect(find(first)).toBeGreaterThan(1); expect(find(next)).toBe(find(first) + 1);
});

it('reviews every topic and retains all slide content, boundaries, and simulation counts',()=>{
 expect(Object.keys(sequenceMoves)).toHaveLength(12);
 expect(topics.reduce((sum,t)=>sum+t.slides.length,0)).toBe(179);
 for(const topic of topics){
  expect(topic.slides[0].kind).toBe('title');expect(topic.slides[1].kind).toBe('objectives');expect(topic.slides.at(-1).kind).toBe('summary');
  expect(topic.slides.some(s=>s.kind==='application')).toBe(false);
  if(!['04-network-devices','osi-reference-model'].includes(topic.id))expect(topic.slides.filter(s=>s.type||s.kind==='example').length).toBeGreaterThanOrEqual(2);
  expect(topic.slides.every(s=>s.notes.transition.length>20)).toBe(true);
 }
 expect(topics[0].slides.some(s => s.type === 'transferDemo')).toBe(false);
});

it('rejects stale ordering targets rather than silently omitting a demonstration', () => {
    expect(() => sequenceTopic({ id: '03-network-topologies', slides: [] })).toThrow('expected one sequence target');
});

it('keeps the introduction concise without redundant simulations or empty walkthroughs', () => {
    const intro = topics[0];
    expect(intro.slides).toHaveLength(24);
    expect(intro.slides.some(s => s.type === 'communication' || s.kind === 'walkthrough')).toBe(false);
    expect(intro.slides.filter(s => s.kind === 'example')).toHaveLength(4);
    expect(intro.slides.some(s => s.type === 'transferDemo')).toBe(false);
    expect(intro.slides.at(-1).kind).toBe('summary');
});
