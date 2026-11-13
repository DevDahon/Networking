import {it,expect,vi,beforeEach,afterEach} from 'vitest';
import {topics} from '../src/topics/topicRegistry.js';
import {introDiagrams,introConnectivity,introExchange,introConnections} from '../src/simulations/intro.js';
import {examplePlan} from '../src/simulations/exampleModels.js';
let root,dispose;
beforeEach(()=>{vi.useFakeTimers();document.body.innerHTML='<div id="demo"></div>';root=document.querySelector('#demo');});
afterEach(()=>{dispose?.();dispose=null;vi.useRealTimers();});

it('follows the agreed fifteen-slide introduction without detailed configuration content',()=>{
 const slides=topics[0].slides;
 expect(slides).toHaveLength(21);
 expect(slides[3].title).toBe('Everyday Uses of Networks');
 expect(slides[4].title).toBe('Basic Network Components');
 expect(slides[5].type).toBe('introConnections');
 expect(slides[6].type).toBe('introConnectivity');
 expect(slides[7].title).toBe('Five Elements of Data Communication');
 expect(slides[8].type).toBe('introExchange');
 expect(slides.some(s => s.title === 'Example: one printer, five connected computers')).toBe(false);
 expect(slides.some(s => s.type === 'transferDemo')).toBe(false);
 expect(JSON.stringify(slides.map(s=>[s.title,s.lead,s.items]))).not.toMatch(/ipconfig|T568|port 443|subnet calculator|lease pool/i);
});

it('keeps local printing available when Internet access is unavailable',()=>{
 const slide={exampleId:'intro-internet',diagram:introDiagrams.internet};
 const healthy=examplePlan(topics[0].id,slide),offline=examplePlan(topics[0].id,slide,{scenario:'fault'});
 expect(offline[0].ok).toBe(true);expect(offline[0].route).toEqual([0,1,2]);
 expect(offline[1].route).toEqual([2,1,0]);
 expect(offline[3].ok).toBe(false);expect(offline[3].route).toEqual([]);
 expect(healthy[3].route).toEqual([3,4]);
});

it('automatically compares local and remote services and cleans up playback',()=>{
 dispose=introConnectivity(root);expect(vi.getTimerCount()).toBeGreaterThan(0);
 vi.advanceTimersByTime(6000);expect(root.querySelector('.example-current').textContent).toContain('Reach the remote service');
 const field=root.querySelector('[name="example-condition"]');field.value='fault';field.dispatchEvent(new Event('change'));
 expect(vi.getTimerCount()).toBe(0);
 root.querySelector('[data-action="example-replay"]').click();vi.advanceTimersByTime(6000);
 expect(root.querySelector('.example-current').textContent).toContain('local network is still connected');
 expect(root.querySelector('path[stroke="#dc2626"]')).not.toBeNull();
 dispose();dispose=null;expect(vi.getTimerCount()).toBe(0);
});

it('reverses sender and receiver roles for a response',()=>{
 const steps=examplePlan(topics[0].id,{exampleId:'intro-exchange',diagram:introDiagrams.exchange});
 expect(steps[1].route).toEqual([0,1,2]);expect(steps[3].route).toEqual([2,1,0]);
 expect(steps[2].facts).toEqual([['New sender','Computer B'],['New receiver','Computer A']]);
 dispose=introExchange(root);vi.advanceTimersByTime(8000);
 expect(root.querySelector('.example-current').textContent).toContain('Requested document');
 expect(vi.getTimerCount()).toBe(0);
});

it('animates the request and the returning response before completing the exchange',()=>{
 dispose=introExchange(root);
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

it('shows the response above the devices and resumes it after manual stepping or pausing',()=>{
 dispose=introExchange(root);
 const click=action=>root.querySelector(`[data-action="${action}"]`).click();
 click('example-next');click('example-next');click('example-next');
 let marker=root.querySelector('[data-example-packet]');
 expect(marker).not.toBeNull();expect(marker.getAttribute('cx')).toBe('850');
 expect(marker.parentElement.lastElementChild).toBe(marker);
 expect(root.querySelector('.example-state').textContent).toBe('Paused');
 click('example-toggle');vi.advanceTimersByTime(500);
 expect(root.querySelector('.example-current h3').textContent).toBe('Return the response');
 marker=root.querySelector('[data-example-packet]');
 const x=Number(marker.getAttribute('cx'));
 expect(x).toBeLessThan(850);expect(x).toBeGreaterThan(140);
 click('example-toggle');
 expect(Number(root.querySelector('[data-example-packet]').getAttribute('cx'))).toBe(x);
 vi.advanceTimersByTime(5000);
 expect(Number(root.querySelector('[data-example-packet]').getAttribute('cx'))).toBe(x);
 click('example-toggle');vi.advanceTimersByTime(500);
 expect(Number(root.querySelector('[data-example-packet]').getAttribute('cx'))).toBeLessThan(x);
 vi.advanceTimersByTime(1500);
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
