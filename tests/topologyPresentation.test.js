import { it, expect, afterEach } from 'vitest';
import { topics } from '../src/topics/topicRegistry.js';
import { topologyCoordinates, topologyConnections } from '../src/components/topologyDiagram.js';
import { topology } from '../src/simulations/foundations.js';
import { pathTraceDemo } from '../src/simulations/extraScenes.js';
import { layouts } from '../src/simulations/models.js';
let dispose;
afterEach(() => { dispose?.(); dispose = null; });

const topologyTopic = topics.find(t => t.id === '03-network-topologies');

it('teaches topology concepts, a consistent star example, simulations, then design',()=>{
 const slides=topologyTopic.slides;
 expect(slides.map(s=>s.kind)).toEqual(['title','objectives','concept','concept','example','example','example','example','example','example','demo','concept','summary']);
 expect(slides[10].type).toBe('topology');
 expect(slides[4].items.join(' ')).toContain('Five computers and one printer');
 expect(slides[4].items.join(' ')).not.toContain('Eight');
});

it('topology workbench combines link/device failure simulation and path tracing', () => {
 const root = document.createElement('div');
 dispose = topology(root);
 expect(root.querySelector('[name="kind"]')).not.toBeNull();
 expect(root.querySelector('[name="failed"]')).not.toBeNull();
 expect(root.querySelector('[name="dead"]')).not.toBeNull();
 expect(root.querySelector('[name="source"]')).not.toBeNull();
 expect(root.querySelector('[name="target"]')).not.toBeNull();
 expect(root.querySelector('[data-action="play"]')).not.toBeNull();
 expect(root.querySelector('.step-card').textContent).toContain('Path trace');
});

it.each(Object.keys(layouts))('uses the same readable %s layout in both simulations', kind => {
    document.body.innerHTML = '<div id="a"></div><div id="b"></div>';
    const workbench = document.querySelector('#a'), tracer = document.querySelector('#b');
    topology(workbench); dispose = pathTraceDemo(tracer);
    for (const root of [workbench, tracer]) { const select = root.querySelector('[name="kind"]'); select.value = kind; select.dispatchEvent(new Event('change')); }
    const links = root => [...root.querySelectorAll('[data-topology-link]')].map(path => path.getAttribute('d'));
    expect(links(workbench)).toEqual(links(tracer));
    expect(links(workbench)).toHaveLength(layouts[kind].edges.length);
    for (const [x, y] of topologyCoordinates(kind)) {
        expect(x - 53).toBeGreaterThanOrEqual(0); expect(x + 53).toBeLessThanOrEqual(800);
        expect(y - 25).toBeGreaterThanOrEqual(0); expect(y + 25).toBeLessThanOrEqual(340);
    }
});

it('draws a bus backbone with taps and highlights traced links separately from failed links', () => {
    const root = document.createElement('div'), xy = topologyCoordinates('Bus');
    root.innerHTML = `<svg>${topologyConnections('Bus', layouts.Bus.edges, xy, { failed: 1, path: [0, 1] })}</svg>`;
    expect(root.textContent).toContain('Shared backbone');
    expect(root.querySelector('[data-topology-link="0"]').getAttribute('stroke')).toBe('#0d9488');
    expect(root.querySelector('[data-topology-link="1"]').getAttribute('stroke')).toBe('#dc2626');
    expect(root.querySelector('[data-topology-link="1"]').getAttribute('d')).toBe('M250 140H400');
});
