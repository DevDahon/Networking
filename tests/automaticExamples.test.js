import {it,expect,vi,beforeEach,afterEach} from 'vitest';
import {topics} from '../src/topics/topicRegistry.js';
import {examplePlan,exampleOptions} from '../src/simulations/exampleModels.js';
import {automaticExample} from '../src/simulations/automaticExamples.js';
import {startApp} from '../src/app.js';

const examples=topics.flatMap(t=>t.slides.filter(s=>s.kind==='example').map(s=>[t.number,s.title,t,s]));
let root,dispose;
beforeEach(()=>{vi.useFakeTimers();localStorage.clear();document.body.innerHTML='<div id="app"></div>';root=document.querySelector('#app');});
afterEach(()=>{dispose?.();dispose=null;vi.useRealTimers();vi.restoreAllMocks();delete window.matchMedia;});
const click=action=>root.querySelector(`[data-action="${action}"]`).click();

it.each(examples)('automatically explains the visual example in topic %i: %s',(_number,_title,topic,slide)=>{
 dispose=automaticExample(root,slide,topic.id);
 const plan=examplePlan(topic.id,slide);
 if(topic.id==='osi-reference-model'){expect(root.querySelector('.example-state').textContent).toBe('Paused');expect(vi.getTimerCount()).toBe(0);click('example-toggle');}
 expect(root.querySelector('.example-state').textContent).toBe('Playing automatically');
 expect(vi.getTimerCount()).toBeGreaterThan(0);
 vi.advanceTimersByTime(2000);
 expect(root.querySelector('.example-current>b').textContent).toContain('Step 2');
 click('example-toggle');vi.advanceTimersByTime(10000);
 expect(root.querySelector('.example-current>b').textContent).toContain('Step 2');
 click('example-toggle');vi.advanceTimersByTime(2000*(plan.length+1));
 expect(root.querySelector('.example-state').textContent).toBe('Complete');expect(vi.getTimerCount()).toBe(0);
 click('example-replay');if(topic.id==='osi-reference-model'){expect(vi.getTimerCount()).toBe(0);click('example-toggle');}expect(vi.getTimerCount()).toBeGreaterThan(0);dispose();dispose=null;expect(vi.getTimerCount()).toBe(0);
});

it.each(examples)('uses only valid diagram connections and meaningful steps in topic %i: %s',(_number,_title,topic,slide)=>{
 for(const scenario of ['healthy',...(exampleOptions(topic.id,slide).length?['fault']:[])]){
  const plan=examplePlan(topic.id,slide,{scenario});
  for(const step of plan){
   expect(step.text.length).toBeGreaterThan(30);
   for(const n of step.focus)expect(slide.diagram.nodes[n]).toBeDefined();
   for(let i=1;i<step.route.length;i++)expect(slide.diagram.edges.some(([a,b])=>(a===step.route[i-1]&&b===step.route[i])||(b===step.route[i-1]&&a===step.route[i]))).toBe(true);
  }
  if(scenario==='fault')expect(plan.at(-1).ok).toBe(slide.topologyKind==='Mesh');
 }
});

it('changes the sending computer and stops delivery when its cable is disconnected',()=>{
 const topic=topics.find(t=>t.id==='01-introduction-to-networking'),slide=topic.slides.find(s=>s.title==='Local Area Network (LAN)');
 dispose=automaticExample(root,slide,topic.id);
 const source=root.querySelector('[name="example-source"]');source.value='5';source.dispatchEvent(new Event('change'));
 expect(root.querySelector('.example-current').textContent).toContain('Computer 5');expect(vi.getTimerCount()).toBe(0);
 const condition=root.querySelector('[name="example-condition"]');condition.value='fault';condition.dispatchEvent(new Event('change'));
 click('example-next');expect(root.querySelector('.example-current').textContent).toContain('printer receives no job');
 expect(root.querySelector('.example-flow-path')).toBeNull();
});

it('calculates wire-map failure and independent mask decisions',()=>{
 const cableTopic=topics.find(t=>t.id==='06-network-cables-media');
 expect(cableTopic.slides.find(s=>s.title==='Example: a straight-through patch cable')).toBeUndefined();
 const staticTopic=topics.find(t=>t.id==='10-static-ip'),staticSlide=staticTopic.slides.find(s=>s.title==='Example: two manually configured classroom computers');
 const mask=examplePlan(staticTopic.id,staticSlide,{scenario:'fault'});
 expect(mask[0].ok).toBe(true);expect(mask[1].ok).toBe(false);expect(mask[2].route).toEqual([]);
});

it('explains topology and failure scope instead of printer queue processing in the star example',()=>{
 const topic=topics.find(t=>t.id==='03-network-topologies'),slide=topic.slides.find(s=>s.kind==='example');
 const healthy=examplePlan(topic.id,slide,{source:'5'}),fault=examplePlan(topic.id,slide,{source:'5',scenario:'fault'});
 expect(healthy[1].route).toEqual([5,0,6]);
 expect(fault[1].route).toEqual([]);
 expect(fault[2].text).toContain('other four computers');
 expect(healthy.at(-1).text).toContain('all six endpoints');
 expect(healthy.map(step=>step.text).join(' ')).not.toContain('page 1');
});

it('cancels automatic example playback on app navigation',()=>{
 const topic=topics.find(t=>t.id==='01-introduction-to-networking'),index=topic.slides.findIndex(s=>s.title==='Local Area Network (LAN)');
 history.replaceState(null,'',`/#/topic/${topic.id}/slide/${index+1}`);dispose=startApp(root);
 vi.advanceTimersByTime(2000);expect(root.querySelector('[data-example-packet]')).not.toBeNull();
 expect(vi.getTimerCount()).toBeGreaterThan(0);
 history.replaceState(null,'','/#/');window.dispatchEvent(new HashChangeEvent('hashchange'));
 vi.advanceTimersByTime(0);expect(vi.getTimerCount()).toBe(0);expect(root.querySelectorAll('.topic-card')).toHaveLength(13);
});

it('honors reduced motion and still allows manual stepping',()=>{
 window.matchMedia=()=>({matches:true});const topic=topics.find(t=>t.id==='01-introduction-to-networking'),slide=topic.slides.find(s=>s.title==='Local Area Network (LAN)');
 dispose=automaticExample(root,slide,topic.id);vi.advanceTimersByTime(0);expect(vi.getTimerCount()).toBe(0);click('example-next');
 expect(root.querySelector('.example-current>b').textContent).toContain('Step 2');expect(root.querySelector('animateMotion')).toBeNull();
});

it('preserves a packet position when paused and resumes on the same link',()=>{
 const topic=topics.find(t=>t.id==='01-introduction-to-networking'),slide=topic.slides.find(s=>s.title==='Local Area Network (LAN)');
 dispose=automaticExample(root,slide,topic.id);
 vi.advanceTimersByTime(3000);
 const marker=root.querySelector('[data-example-packet]');
 const x=marker.getAttribute('cx'),y=marker.getAttribute('cy');
 click('example-toggle');
 expect(root.querySelector('[data-example-packet]').getAttribute('cx')).toBe(x);
 expect(root.querySelector('[data-example-packet]').getAttribute('cy')).toBe(y);
 vi.advanceTimersByTime(10000);
 expect(root.querySelector('[data-example-packet]').getAttribute('cx')).toBe(x);
 expect(vi.getTimerCount()).toBe(0);
 click('example-toggle');vi.advanceTimersByTime(500);
 const moved=root.querySelector('[data-example-packet]');
 expect([moved.getAttribute('cx'),moved.getAttribute('cy')]).not.toEqual([x,y]);
 expect(Number(moved.getAttribute('cx'))).toBeGreaterThanOrEqual(0);
 expect(Number(moved.getAttribute('cy'))).toBeLessThanOrEqual(365);
});

it('confirms osi-reference-model has no example slides to animate', () => {
 const topic = topics.find(t => t.id === 'osi-reference-model');
 expect(topic.slides.filter(s => s.kind === 'example')).toHaveLength(0);
});
