import {it,expect} from 'vitest';
import {topics} from '../src/topics/topicRegistry.js';
import {sequenceTopic,sequenceMoves} from '../src/topics/sequenceTopics.js';

const constraints=[
 [1,'Two Performance Measures: Bandwidth and Latency','@transferDemo'],
 [2,'Two network service architectures','@availabilityDemo'],
 [3,'@topology','@pathTraceDemo'],
 [4,'How Interfaces and Switches Connect Local Devices','@macLearningDemo'],
 [5,'Layer 1: Physical','How the Seven Open Systems Interconnection (OSI) Layers Work Together'],
 [5,'@layerBoundaryDemo','@osiTroubleshooting'],
 [6,'Packet and Frame Addresses Along a Route','@nextHopFrameDemo'],
 [7,'Example: a room link and a building link','@mediumBudgetDemo'],
 [8,'@cable','@pairScanDemo'],
 [9,'@ipv4','@bitwiseDemo'],
 [10,'Example: split one /24 into four /26 networks','@partitionDemo'],
 [11,'Domain Name System (DNS)','@dnsCacheDemo'],
 [11,'Seven common email service ports','@protocolMail'],
 [11,'Example: open a protected school website','@protocolWeb'],
 [12,'Example: two manually configured classroom computers','@asymmetricDemo'],
 [13,'@dhcp','@reservedPoolDemo'],
 [14,'Two protected Wi-Fi security options','Example: a laptop joins classroom Wi-Fi'],
 [15,'Publishing and Accessing a Windows Shared Folder','@sharing'],
 [16,'Nine modeled network faults','Example: numeric access works but a name fails']
];
it.each(constraints)('keeps the prerequisite beside its demonstration in topic %i: %s → %s',(number,first,next)=>{
 const slides=topics.find(t=>t.number===number).slides;
 const find=key=>slides.findIndex(s=>key.startsWith('@')?s.type===key.slice(1):s.title===key);
 expect(find(first)).toBeGreaterThan(1);expect(find(next)).toBe(find(first)+1);
});

it('reviews every topic and retains all slide content, boundaries, and simulation counts',()=>{
 expect(Object.keys(sequenceMoves)).toHaveLength(16);
 expect(topics.reduce((sum,t)=>sum+t.slides.length,0)).toBe(225);
 for(const topic of topics){
  expect(topic.slides[0].kind).toBe('title');expect(topic.slides[1].kind).toBe('objectives');expect(topic.slides.at(-1).kind).toBe('summary');
  expect(topic.slides.filter(s=>s.type||s.kind==='example').length).toBeGreaterThanOrEqual(2);
  expect(topic.slides.every(s=>s.notes.transition.length>20)).toBe(true);
 }
 expect(topics[0].slides[13].type).toBe('transferDemo');
});

it('rejects stale ordering targets rather than silently omitting a demonstration',()=>{
 expect(()=>sequenceTopic({id:'02-network-types-architecture',slides:[]})).toThrow('expected one sequence target');
});

it('keeps the introduction concise without the redundant message and printer walkthrough slides',()=>{
 const intro=topics[0];
 expect(intro.slides).toHaveLength(15);
 expect(intro.slides.some(s=>s.type==='communication'||s.kind==='application'||s.kind==='walkthrough')).toBe(false);
 expect(intro.slides.filter(s=>s.kind==='example')).toHaveLength(1);
 expect(intro.slides[13].type).toBe('transferDemo');
 expect(intro.slides[14].kind).toBe('summary');
});
