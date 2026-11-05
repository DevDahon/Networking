import {it,expect,vi,afterEach} from 'vitest';
import {schoolLayer,schoolJobs} from '../src/simulations/osiSchool.js';
import {topics} from '../src/topics/topicRegistry.js';

let dispose;
afterEach(()=>{dispose?.();dispose=null;vi.useRealTimers();});
it.each([7,6,5,4,3,2,1])('plays the three focused Layer %i stages and disposes its timer',number=>{
 vi.useFakeTimers();document.body.innerHTML='<div id="school"></div>';const root=document.querySelector('#school');
 dispose=schoolLayer(root,number);
 expect(root.textContent).toContain(schoolJobs[number].question);
 expect(root.querySelector('.step-card').textContent).toContain('1 / 3');
 vi.advanceTimersByTime(6000);
 expect(root.querySelector('.step-card').textContent).toContain('1 / 3');
 expect(vi.getTimerCount()).toBe(0);
 root.querySelector('[data-action="advance"]').click();
 expect(root.querySelector('.step-card').textContent).toContain('2 / 3');
 expect(vi.getTimerCount()).toBe(0);
 root.querySelector('[data-action="play"]').click();
 root.querySelector('[data-action="toggle"]').click();
 vi.advanceTimersByTime(4000);
 expect(root.querySelector('.step-card').textContent).toContain(schoolJobs[number].steps[2][1]);
 vi.advanceTimersByTime(2000);expect(root.textContent).toContain('Complete');
 expect(vi.getTimerCount()).toBe(0);
 root.querySelector('[data-action="previous"]').click();
 expect(root.querySelector('.step-card').textContent).toContain('2 / 3');
 root.querySelector('[data-action="toggle"]').click();expect(vi.getTimerCount()).toBe(1);
 dispose();dispose=null;expect(vi.getTimerCount()).toBe(0);
});
it('scopes the focused school scenario to the seven OSI layer slides',()=>{
 const layers=topics.find(t=>t.id==='osi-reference-model').slides.filter(s=>s.type==='osiLayer');
 expect(layers.map(s=>s.layer)).toEqual([7,6,5,4,3,2,1]);
 expect(layers.every(s=>s.scenario==='school-web')).toBe(true);
 const other=topics.filter(t=>t.id!=='osi-reference-model').flatMap(t=>t.slides).filter(s=>s.type==='osiLayer');
 expect(other.every(s=>!s.scenario)).toBe(true);
});
it('shows actual text bytes and explicitly distinguishes dialog from a TCP connection',()=>{
 vi.useFakeTimers();const root=document.createElement('div');document.body.append(root);
 dispose=schoolLayer(root,6);root.querySelector('[data-action="advance"]').click();
 expect(root.querySelector('.encoded-bytes').textContent).toBe('53 63 68 6f 6f 6c 20 6e 65 77 73');
 root.querySelector('[data-action="advance"]').click();expect(root.querySelector('.encoded-bytes').textContent).toBe('School news');dispose();
 dispose=schoolLayer(root,5);expect(root.textContent).toContain('does not require a separate Session-layer protocol');
});
