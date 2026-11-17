import {it,expect,vi,beforeEach,afterEach} from 'vitest';
import {topics} from '../src/topics/topicRegistry.js';
import {startApp} from '../src/app.js';
import {introDiagrams,introConnectivity,introExchange,introConnections} from '../src/simulations/intro.js';
import {examplePlan} from '../src/simulations/exampleModels.js';
let root,dispose;
beforeEach(()=>{vi.useFakeTimers();document.body.innerHTML='<div id="demo"></div>';root=document.querySelector('#demo');});
afterEach(()=>{dispose?.();dispose=null;vi.useRealTimers();});

it('follows the agreed introduction sequence with uniform paired topic-description slides',()=>{
 const slides=topics[0].slides;
 expect(slides).toHaveLength(24);
 expect(slides.some(s=>s.title==='Everyday Uses of Networks'||s.title==='Three Benefits of Networking')).toBe(false);
 expect(slides.slice(3,5).map(s=>s.title)).toEqual([
  'Overview of the Components of Computer Networks',
  'Overview of the Components of Computer Networks'
 ]);
 expect(slides.slice(3,5).map(s=>s.itemLabels)).toEqual([['1','2'],['3','4']]);
 expect(slides[5].type).toBe('introConnections');
 expect(slides[6].type).toBe('introConnectivity');
 expect(slides[7].title).toBe('Five Elements of Data Communication');
 expect(slides[8].type).toBe('introExchange');
 const usesIndex=slides.findIndex(s=>s.title==='Uses and Importance of Networking');
 expect(usesIndex).toBe(9);
 expect(slides.slice(usesIndex,usesIndex+2).map(s=>s.title)).toEqual([
  'Uses and Importance of Networking',
  'Uses and Importance of Networking'
 ]);
 expect(slides.slice(usesIndex,usesIndex+2).map(s=>s.itemLabels)).toEqual([
  ['1','2','3','4'],
  ['5','6','7']
 ]);
 const charIndex=slides.findIndex(s=>s.title==='Characteristics of Computer Networking');
 expect(charIndex).toBe(12);
 expect(slides.slice(charIndex,charIndex+3).map(s=>s.title)).toEqual([
  'Characteristics of Computer Networking',
  'Characteristics of Computer Networking',
  'Characteristics of Computer Networking'
 ]);
 expect(slides.slice(charIndex,charIndex+3).map(s=>s.itemLabels)).toEqual([
  ['1','2','3'],
  ['4','5','6'],
  ['7','8']
 ]);
 for(const slide of [...slides.slice(3,5),...slides.slice(usesIndex,usesIndex+2),...slides.slice(charIndex,charIndex+3)]){
  expect(slide.stackedDescriptions).toBe(true);
  expect(slide.visualKey).toBeUndefined();
  expect(slide.title).not.toMatch(/\(\d/);
 }
 expect(slides.some(s => s.title === 'Example: one printer, five connected computers')).toBe(false);
 expect(slides.some(s => s.type === 'transferDemo' || s.type === 'availabilityDemo')).toBe(false);
 expect(JSON.stringify(slides.map(s=>[s.title,s.lead,s.items,s.paragraphs]))).not.toMatch(/ipconfig|T568|port 443|subnet calculator|lease pool|predictable interference/i);
});

it('keeps local printing available when Internet access is unavailable',()=>{
 const slide={exampleId:'intro-internet',diagram:introDiagrams.internet};
 const healthy=examplePlan(topics[0].id,slide),offline=examplePlan(topics[0].id,slide,{scenario:'fault'});
 expect(offline[0].ok).toBe(true);expect(offline[0].route).toEqual([0,1,2]);
 expect(offline[1].route).toEqual([2,1,0]);
 expect(offline[3].ok).toBe(false);expect(offline[3].route).toEqual([]);
 expect(healthy[3].route).toEqual([3,4]);
});

it('automatically compares local and remote services only after Play and cleans up playback',()=>{
 dispose=introConnectivity(root);expect(vi.getTimerCount()).toBe(0);
 root.querySelector('[data-action="play"]').click();expect(vi.getTimerCount()).toBeGreaterThan(0);
 vi.advanceTimersByTime(6000);expect(root.querySelector('.example-current').textContent).toContain('Reach the remote service');
 const field=root.querySelector('[name="example-condition"]');field.value='fault';field.dispatchEvent(new Event('change'));
 expect(vi.getTimerCount()).toBe(0);
 root.querySelector('[data-action="play"]').click();vi.advanceTimersByTime(6000);
 expect(root.querySelector('.example-current').textContent).toContain('local network is still connected');
 expect(root.querySelector('path[stroke="#dc2626"]')).not.toBeNull();
 dispose();dispose=null;expect(vi.getTimerCount()).toBe(0);
});

it('reverses sender and receiver roles for a response',()=>{
 const steps=examplePlan(topics[0].id,{exampleId:'intro-exchange',diagram:introDiagrams.exchange});
 expect(steps[1].route).toEqual([0,1,2]);expect(steps[3].route).toEqual([2,1,0]);
 expect(steps[2].facts).toEqual([['New sender','Computer B'],['New receiver','Computer A']]);
 dispose=introExchange(root);root.querySelector('[data-action="play"]').click();vi.advanceTimersByTime(8000);
 expect(root.querySelector('.example-current').textContent).toContain('Requested document');
 expect(vi.getTimerCount()).toBe(0);
});

it('animates the request and the returning response before completing the exchange',()=>{
 dispose=introExchange(root);
 expect(vi.getTimerCount()).toBe(0);
 root.querySelector('[data-action="play"]').click();
 vi.advanceTimersByTime(2500);
 let marker=root.querySelector('[data-example-packet]');
 expect(Number(marker.getAttribute('cx'))).toBeGreaterThan(140);
 expect(Number(marker.getAttribute('cx'))).toBeLessThan(850);
 vi.advanceTimersByTime(4000);
 marker=root.querySelector('[data-example-packet]');
 expect(root.querySelector('.example-state').textContent).toBe('Playing automatically');
 expect(Number(marker.getAttribute('cx'))).toBeLessThan(850);
 expect(Number(marker.getAttribute('cx'))).toBeGreaterThan(140);
 const before=Number(marker.getAttribute('cx'));
 vi.advanceTimersByTime(500);
 expect(Number(root.querySelector('[data-example-packet]').getAttribute('cx'))).toBeLessThan(before);
 vi.advanceTimersByTime(1000);
 expect(root.querySelector('.example-state').textContent).toBe('Complete');
 expect(root.querySelector('[data-example-packet]').getAttribute('cx')).toBe('140');
 expect(vi.getTimerCount()).toBe(0);
});

it('shows the response above the devices and resumes it after pausing',()=>{
 dispose=introExchange(root);
 const click=action=>root.querySelector(`[data-action="${action}"]`).click();
 click('play');vi.advanceTimersByTime(6000);
 let marker=root.querySelector('[data-example-packet]');
 expect(marker).not.toBeNull();
 expect(root.querySelector('.example-current h3').textContent).toBe('Return the response');
 click('pause');
 const x=Number(root.querySelector('[data-example-packet]').getAttribute('cx'));
 vi.advanceTimersByTime(5000);
 expect(Number(root.querySelector('[data-example-packet]').getAttribute('cx'))).toBe(x);
 click('resume');vi.advanceTimersByTime(2000);
 expect(root.querySelector('.example-state').textContent).toBe('Complete');
 expect(root.querySelector('[data-example-packet]').getAttribute('cx')).toBe('140');
 expect(vi.getTimerCount()).toBe(0);
});

it('illustrates separate wired and wireless links without configuration controls',()=>{
 introConnections(root);
 expect(root.querySelectorAll('[data-example-node]')).toHaveLength(4);
 expect(root.querySelectorAll('svg>g:first-child path')).toHaveLength(2);
 expect(root.querySelector('path[stroke-dasharray="10 8"]')).not.toBeNull();
 expect(root.querySelector('input,select,button')).toBeNull();
});

it('displays concrete real-world examples for bandwidth and latency without simulation controls',()=>{
 const perfIndex=topics[0].slides.findIndex(s=>s.visualKey==='performanceMeasures');
 expect(perfIndex).toBeGreaterThan(-1);
 expect(topics[0].slides[perfIndex].kind).toBe('concept');
 history.replaceState(null,'',`/#/topic/${topics[0].id}/slide/${perfIndex+1}`);
 dispose=startApp(root);
 vi.advanceTimersByTime(0);
 const content=root.querySelector('#slide-content');
 expect(content.classList.contains('simulation-container')).toBe(false);
 expect(content.querySelectorAll('.perf-example-card')).toHaveLength(2);
 expect(content.querySelector('button,select,input')).toBeNull();
 expect(content.textContent).toContain('100 MB (800 Mb)');
 expect(content.textContent).toContain('20 Mbps');
 expect(content.textContent).toContain('~40 sec');
 expect(content.textContent).toContain('100 Mbps');
 expect(content.textContent).toContain('~8 sec');
 expect(content.textContent).toContain('~15 ms');
 expect(content.textContent).toContain('~600 ms');
 expect(content.querySelector('.list-explanation')).toBeNull();
 expect(vi.getTimerCount()).toBe(0);
});
