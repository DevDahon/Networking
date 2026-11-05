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

it.each(types)('%s resumes a manually displayed final step before completing',type=>{
 dispose=simulations[type](root);
 const next=type==='communication'?'next':'advance';
 const count=position()[1];
 for(let i=1;i<count;i++)click(next);
 expect(position()[0]).toBe(count);expect(position()[2]).toContain('Paused');
 expect(root.querySelector(`[data-action="${next}"]`).disabled).toBe(true);
 click(type==='osiJourney'?'toggle':'resume');
 expect(position()[0]).toBe(count);expect(position()[2]).toContain('Playing');
 vi.advanceTimersByTime(1000);expect(position()[0]).toBe(count);
 click(type==='osiJourney'?'toggle':'pause');vi.advanceTimersByTime(5000);expect(position()[0]).toBe(count);
 click(type==='osiJourney'?'toggle':'resume');vi.advanceTimersByTime(2000);
 expect(position()[2]).toContain('Complete');expect(vi.getTimerCount()).toBe(0);
 if(type==='osiJourney')click('reset');else click('play');expect(position()[0]).toBe(1);
 dispose();dispose=null;expect(vi.getTimerCount()).toBe(0);
});

const examples=topics.flatMap(t=>t.slides.filter(s=>s.kind==='example').map(s=>[t.number,s.title,t,s]));
it.each(examples)('topic %i example %s preserves the final step and foreground marker',(_n,_name,topic,slide)=>{
 dispose=automaticExample(root,slide,topic.id);
 const [initial,total]=positionForExample();
 expect(initial).toBe(1);
 for(let i=1;i<total;i++)click('example-next');
 expect(root.querySelector('.example-state').textContent).toBe('Paused');
 const marker=root.querySelector('[data-example-packet]');
 if(marker)expect(marker.parentElement.lastElementChild).toBe(marker);
 click('example-toggle');vi.advanceTimersByTime(1000);
 expect(positionForExample()[0]).toBe(total);
 expect(root.querySelector('.example-state').textContent).toBe('Playing automatically');
 vi.advanceTimersByTime(1000);
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

it('retains an acknowledged lease instead of silently restarting DHCP on Resume',()=>{
 dispose=simulations.dhcp(root);for(let i=0;i<4;i++)click('step');
 const leases=root.querySelector('tbody').textContent;
 expect(root.querySelector('[data-action="resume"]').disabled).toBe(true);
 click('resume');vi.advanceTimersByTime(10000);
 expect(root.querySelector('tbody').textContent).toBe(leases);
 expect(root.querySelector('.dora .current').textContent).toContain('ACK');
 expect(vi.getTimerCount()).toBe(0);
});
