import { it, expect, vi, afterEach } from 'vitest';
import { packetPosition, animatePacket } from '../src/components/packetMotion.js';
import { classroomExample } from '../src/components/classroomExample.js';
import { topics } from '../src/topics/topicRegistry.js';
import { examplePlan, exampleOptions } from '../src/simulations/exampleModels.js';
import { introDiagrams } from '../src/simulations/intro.js';

const nodes = [{ x: 140, y: 140 }, { x: 500, y: 140 }, { x: 850, y: 140 }], route = [0, 1, 2];
afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); });

it.each([[-1, 140], [0, 140], [.25, 317.5], [.5, 495], [.75, 672.5], [1, 850], [3, 850]])('bounds progress %s to the actual horizontal link', (progress, x) => {
    expect(packetPosition(nodes, route, progress)).toEqual({ x, y: 140 });
});
it('follows bent links by their lengths and supports reverse replies', () => {
    const bent = [{ x: 100, y: 50 }, { x: 300, y: 50 }, { x: 300, y: 250 }];
    expect(packetPosition(bent, route, .25)).toEqual({ x: 200, y: 50 });
    expect(packetPosition(bent, route, .75)).toEqual({ x: 300, y: 150 });
    expect(packetPosition(bent, [2, 1, 0], .25)).toEqual({ x: 300, y: 150 });
    expect(packetPosition(nodes, [], 0)).toBeNull();
    expect(packetPosition(nodes, [0], 0)).toBeNull();
    expect(packetPosition(nodes, [0, 99], 0)).toBeNull();
});
it('renders one marker on the route rather than at an implicit origin', () => {
    const slide = { title: 'Request', diagram: { nodes, edges: [[0, 1], [1, 2]] }, items: [] };
    document.body.innerHTML = classroomExample(slide, { stage: { route, focus: [0] }, progress: .5 });
    const marker = document.querySelector('[data-example-packet]');
    expect(marker.getAttribute('cx')).toBe('495'); expect(marker.getAttribute('cy')).toBe('140');
    expect(document.querySelector('animateMotion')).toBeNull();
    expect(document.querySelectorAll('[data-example-packet]')).toHaveLength(1);
});
it('updates explicit coordinates and cancels future animation frames on disposal', () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<svg><circle data-example-packet cx="140" cy="140"/></svg>';
    let callback, serial = 0;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(fn => { callback = fn; return ++serial; });
    const cancel = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => { });
    const start = performance.now(), release = animatePacket(document.querySelector('svg'), nodes, route, { duration: 2000 });
    callback(start + 1000);
    expect(document.querySelector('circle').getAttribute('cx')).toBe('495');
    expect(document.querySelector('circle').getAttribute('cy')).toBe('140');
    release(); expect(cancel).toHaveBeenCalledWith(2);
    callback(start + 2000); expect(document.querySelector('circle').getAttribute('cx')).toBe('495');
});

it('keeps markers on valid SVG coordinates across every automatic example and comparison', () => {
    const examples = topics.flatMap(t => t.slides.filter(s => s.kind === 'example').map(s => [t.id, s]));
    examples.push(['01-introduction-to-networking', { exampleId: 'intro-internet', diagram: introDiagrams.internet }]);
    examples.push(['01-introduction-to-networking', { exampleId: 'intro-exchange', diagram: introDiagrams.exchange }]);
    expect(examples).toHaveLength(22);
    for (const [topic, slide] of examples) {
        for (const scenario of ['healthy', ...(exampleOptions(topic, slide).length ? ['fault'] : [])]) {
            for (const step of examplePlan(topic, slide, { scenario })) {
                for (const progress of [-1, 0, .25, .5, .75, 1, 2]) {
                    const point = packetPosition(slide.diagram.nodes, step.route, progress);
                    if (step.route.length < 2) { expect(point).toBeNull(); continue; }
                    expect(point.x).toBeGreaterThanOrEqual(0); expect(point.x).toBeLessThanOrEqual(1000);
                    expect(point.y).toBeGreaterThanOrEqual(0); expect(point.y).toBeLessThanOrEqual(365);
                }
            }
        }
    }
});
