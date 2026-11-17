import {it,expect,vi,beforeEach,afterEach} from 'vitest';
import {simulations} from '../src/simulations/index.js';
import {topics} from '../src/topics/topicRegistry.js';
import {automaticExample} from '../src/simulations/automaticExamples.js';
import {networkSVG} from '../src/components/ui.js';

let root,dispose;
beforeEach(()=>{vi.useFakeTimers();document.body.innerHTML='<div id="simulation"></div>';root=document.querySelector('#simulation');});
afterEach(()=>{dispose?.();dispose=null;vi.useRealTimers();});
const click=action=>root.querySelector(`[data-action="${action}"]`).click();
const position=()=>{
 const text=(root.querySelector('.journey-heading>span:last-child')||root.querySelector('.step-card>b')).textContent;
 const match=text.match(/(\d+)\s*(?:of|\/)\s*(\d+)/);
 return [Number(match[1]),Number(match[2]),text];
};
const types=['transferDemo','availabilityDemo','pathTraceDemo','layerBoundaryDemo','nextHopFrameDemo','mediumBudgetDemo','pairScanDemo','bitwiseDemo','partitionDemo','asymmetricDemo','guestIsolationDemo','ttlTraceDemo','protocolArp','protocolWeb','protocolMail','osiJourney','communication'];

it.each(types)('%s resumes from the final step when Resume is clicked after Pause and restarts on Play after Complete',type=>{
 dispose=simulations[type](root);
 expect(vi.getTimerCount()).toBe(0);
 const count=position()[1];
 click('play');
 vi.advanceTimersByTime((count-1)*2000);
 expect(position()[0]).toBe(count);
 click('pause');
 expect(position()[0]).toBe(count);
 expect(position()[2]).toContain('Paused');
 expect(root.querySelector('[data-action="stop"]')).not.toBeNull();
 click('resume');
 expect(position()[0]).toBe(count);expect(position()[2]).toContain('Playing');
 vi.advanceTimersByTime(1000);expect(position()[0]).toBe(count);
 click('pause');vi.advanceTimersByTime(5000);expect(position()[0]).toBe(count);
 click('resume');vi.advanceTimersByTime(2000);
 expect(position()[2]).toContain('Complete');expect(vi.getTimerCount()).toBe(0);
 expect(root.querySelector('[data-action="play"]')).not.toBeNull();
 expect(root.querySelector('[data-action="pause"]').disabled).toBe(true);
 click('play');expect(position()[0]).toBe(1);expect(position()[2]).toContain('Playing');
 click('stop');expect(position()[0]).toBe(1);expect(vi.getTimerCount()).toBe(0);
 expect(root.querySelector('[data-action="play"]')).not.toBeNull();
 expect(root.querySelector('[data-action="pause"]').disabled).toBe(true);
 dispose();dispose=null;expect(vi.getTimerCount()).toBe(0);
});

const examples=topics.flatMap(t=>t.slides.filter(s=>s.kind==='example').map(s=>[t.number,s.title,t,s]));
it.each(examples)('topic %i example %s preserves the final step and foreground marker after manual Play',(_n,_name,topic,slide)=>{
 dispose=automaticExample(root,slide,topic.id);
 const [initial,total]=positionForExample();
 expect(initial).toBe(1);
 expect(root.querySelector('.example-state').textContent).toBe('Paused');
 expect(vi.getTimerCount()).toBe(0);
 click('play');vi.advanceTimersByTime((total-1)*2000);
 expect(positionForExample()[0]).toBe(total);
 const marker=root.querySelector('[data-example-packet]');
 if(marker)expect(marker.parentElement.lastElementChild).toBe(marker);
 vi.advanceTimersByTime(2000);
 expect(root.querySelector('.example-state').textContent).toBe('Complete');
 expect(vi.getTimerCount()).toBe(0);
});
function positionForExample(){return root.querySelector('.example-current>b').textContent.match(/Step (\d+) of (\d+)/).slice(1).map(Number);}

it('keeps static markers above devices at the selected node',()=>{
 for(const active of [0,1,2]){
  root.innerHTML=networkSVG(['Source','Middle','Destination'],active);
  const marker=root.querySelector('[data-network-packet]');
  expect(marker.parentElement.lastElementChild).toBe(marker);
  expect(Number(marker.getAttribute('cx'))).toBe(100+active*300);
  expect(marker.getAttribute('cy')).toBe('100');
 }
});

it('retains an acknowledged lease and restarts DORA cleanly only on Play after completion',()=>{
 dispose=simulations.dhcp(root);click('play');vi.advanceTimersByTime(8000);
 const leases=root.querySelector('tbody').textContent;
 expect(root.querySelector('.dora .current').textContent).toContain('ACK');
 expect(root.querySelector('[data-action="play"]').disabled).toBe(false);
 expect(root.querySelector('[data-action="pause"]').disabled).toBe(true);
 expect(root.querySelector('tbody').textContent).toBe(leases);
 expect(vi.getTimerCount()).toBe(0);
});
