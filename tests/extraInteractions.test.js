import { it, expect, beforeEach, afterEach, vi } from 'vitest';
import { topics } from '../src/topics/topicRegistry.js';
import { additionalDemos } from '../src/topics/additionalDemos.js';
import { simulations } from '../src/simulations/index.js';
import { startApp } from '../src/app.js';
let root, dispose;
beforeEach(() => { localStorage.clear(); history.replaceState(null, '', '/#/'); document.body.innerHTML = '<div id="app"></div>'; root = document.querySelector('#app'); });
afterEach(() => { dispose?.(); dispose = null; vi.useRealTimers(); });
const click = action => root.querySelector(`[data-action="${action}"]`).click();
const change = (name, value) => { const el = root.querySelector(`[name="${name}"]`); el.value = value; el.dispatchEvent(new Event('change', { bubbles: true })); };
function direct(type) { dispose = simulations[type](root); }
function mount(topic) { const index = topic.slides.findIndex(s => s.type === additionalDemos[topic.id].type); history.replaceState(null, '', `/#/topic/${topic.id}/slide/${index + 1}`); dispose = startApp(root); }
const stepTypes = ['transferDemo', 'availabilityDemo', 'pathTraceDemo', 'layerBoundaryDemo', 'nextHopFrameDemo', 'mediumBudgetDemo', 'pairScanDemo', 'bitwiseDemo', 'partitionDemo', 'asymmetricDemo', 'guestIsolationDemo', 'ttlTraceDemo'];
it.each(topics.map(t => [t.id, t]))('adds a distinct demonstration without removing existing ones: %s', (_, topic) => { expect(Object.keys(additionalDemos)).toHaveLength(12); expect(topic.slides.some(s => s.type === additionalDemos[topic.id].type)).toBe(true); expect(topic.slides.at(-1).title).toBe('Summary of the Discussion'); expect(topic.slides.filter(s => s.type || s.kind === 'example').length).toBeGreaterThanOrEqual(2); expect(topic.slides.find(s => s.type === additionalDemos[topic.id].type).notes.demonstrate.length).toBeGreaterThan(35); });
it.each(stepTypes)('%s supports stepping, playback, pause/resume, reset and disposal', type => { vi.useFakeTimers(); direct(type); click('advance'); expect(root.querySelector('.step-card')).not.toBeNull(); click('previous'); expect(root.querySelector('.step-card b').textContent).toContain('Step 1'); click('play'); expect(vi.getTimerCount()).toBe(1); vi.advanceTimersByTime(2000); click('pause'); expect(vi.getTimerCount()).toBe(0); click('resume'); expect(vi.getTimerCount()).toBe(1); click('reset'); expect(vi.getTimerCount()).toBe(0); expect(root.querySelector('.step-card b').textContent).toContain('Step 1'); click('play'); dispose(); dispose = null; expect(vi.getTimerCount()).toBe(0); });
it.each(stepTypes)('leaving %s through the shell stops its timer and preserves navigation', type => { vi.useFakeTimers(); const t = topics.find(t => t.slides.some(s => s.type === type)); mount(t); vi.advanceTimersByTime(0); const hash = location.hash; root.querySelector('#slide-content [data-action="advance"]').click(); expect(location.hash).toBe(hash); root.querySelector('#slide-content [data-action="play"]').click(); expect(vi.getTimerCount()).toBe(1); history.replaceState(null, '', '/#/'); window.dispatchEvent(new HashChangeEvent('hashchange')); vi.advanceTimersByTime(0); expect(vi.getTimerCount()).toBe(0); expect(root.querySelectorAll('.topic-card')).toHaveLength(12); });
it('applying an invalid arithmetic input displays an error without stale computed results', () => { direct('transferDemo'); change('size', '-2'); root.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); expect(root.querySelector('.error')).not.toBeNull(); expect(root.querySelector('.step-card')).toBeNull(); expect(root.querySelector('[data-action="play"]').disabled).toBe(true); change('size', '10'); root.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); expect(root.querySelector('.step-card')).not.toBeNull(); });
it('split-pair scanning shows all eight paths but flags physical pair membership', () => { direct('pairScanDemo'); change('preset', 'split'); for (let i = 0; i < 8; i++)click('advance'); expect(root.querySelectorAll('tbody tr')).toHaveLength(8); expect(root.querySelector('.step-card').textContent).toContain('split physical pairs'); expect(root.querySelector('.extra-blocked')).not.toBeNull(); });
it('MAC learning changes actual forwarding outputs after the return frame', () => { direct('macLearningDemo'); click('send'); expect(root.querySelectorAll('.extra-port-row .active')).toHaveLength(2); change('source', 'B'); change('destination', 'A'); click('send'); expect(root.querySelectorAll('.extra-port-row .active')).toHaveLength(1); expect(root.querySelector('tbody').textContent).toContain('02:00:00:00:00:0B'); click('reset'); expect(root.querySelector('tbody').textContent).toContain('No entries'); });
it('DNS cache demonstration preserves cached data until teaching time expires', () => { direct('dnsCacheDemo'); click('resolve'); click('change'); click('resolve'); expect(root.querySelector('.feedback').textContent).toContain('203.0.113.20'); click('time'); click('time'); click('resolve'); expect(root.querySelector('.feedback').textContent).toContain('203.0.113.21'); change('online', 'no'); click('clear'); click('resolve'); expect(root.querySelector('.error').textContent).toContain('offline'); });
it('DHCP reservation controls allocate excluded/reserved addresses only under their rules', () => { direct('reservedPoolDemo'); change('reservation', 'yes'); change('exclusion', 'yes'); change('client', 'PC 2'); click('request'); expect(root.querySelector('.feedback').textContent).toContain('192.168.1.102'); change('client', 'PC 3'); click('request'); change('client', 'PC 4'); click('request'); expect(root.querySelector('.error').textContent).toContain('exhausted'); change('client', 'PC 1'); click('request'); expect(root.querySelector('.feedback').textContent).toContain('192.168.1.100'); });
it('print queue can pause for unavailable devices, resume pages and deny new submissions', () => { vi.useFakeTimers(); direct('printQueueDemo'); root.querySelector('[name="pages"]').value = '2'; root.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); change('printer', 'no'); click('nextPage'); expect(root.querySelector('.feedback').textContent).toContain('Queue retained'); change('printer', 'yes'); click('play'); vi.advanceTimersByTime(4000); expect(root.querySelector('tbody').textContent).toContain('No entries'); expect(vi.getTimerCount()).toBe(0); change('permission', 'no'); root.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); expect(root.querySelector('.error').textContent).toContain('permission'); });
it('navigating away from automatic print processing cancels its owned timer', () => { vi.useFakeTimers(); mount(topics.find(t => t.id === '13-file-printer-sharing')); vi.advanceTimersByTime(0); root.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); click('play'); expect(vi.getTimerCount()).toBe(1); history.replaceState(null, '', '/#/topic/01-introduction-to-networking/slide/1'); window.dispatchEvent(new HashChangeEvent('hashchange')); vi.advanceTimersByTime(0); expect(vi.getTimerCount()).toBe(0); });

it('places transfer delivery immediately after performance measures on slide fourteen', () => { const t = topics[0]; expect(t.slides[12].title).toBe('Two Performance Measures: Bandwidth and Latency'); expect(t.slides[13].type).toBe('transferDemo'); expect(t.slides).toHaveLength(25); });

it('availabilityDemo dynamically switches controls and auto-applies configuration between client-server and peer-to-peer',()=>{
 direct('availabilityDemo');
 expect(root.querySelector('[name="server"]')).not.toBeNull();
 expect(root.querySelector('[name="peerA"]')).toBeNull();
 expect(root.querySelector('[name="peerB"]')).toBeNull();
 expect(root.querySelector('.extra-config button[type="submit"]')).toBeNull();
 expect(root.querySelector('.step-card').textContent).toContain('Dedicated server');

 change('server','off');
 click('advance');
 expect(root.querySelector('.step-card').textContent).toContain('dedicated server is offline');
 expect(root.querySelector('.extra-blocked')).not.toBeNull();

 change('architecture','peer');
 expect(root.querySelector('[name="server"]')).toBeNull();
 expect(root.querySelector('[name="peerA"]')).not.toBeNull();
 expect(root.querySelector('[name="peerB"]')).not.toBeNull();
 expect(root.querySelector('.extra-config button[type="submit"]')).toBeNull();
 expect(root.querySelector('.step-card b').textContent).toContain('Step 1');
 expect(root.querySelector('.step-card').textContent).toContain('File A is hosted by Peer A');

 change('peerA','off');
 click('advance');
 expect(root.querySelector('.step-card').textContent).toContain('hosting peer a is offline');

 change('resource','B');
 click('advance');
 expect(root.querySelector('.step-card').textContent).toContain('Peer B is available to provide File B');
 expect(root.querySelector('.extra-blocked')).toBeNull();

 change('architecture','server');
 expect(root.querySelector('[name="server"]')).not.toBeNull();
 expect(root.querySelector('[name="peerA"]')).toBeNull();
 expect(root.querySelector('[name="peerB"]')).toBeNull();
});
