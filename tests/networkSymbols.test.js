import {it,expect,beforeEach} from 'vitest';
import {
  getNodeDeviceKind,
  getDeviceSymbolSvg,
  renderTopologyNode,
  getSavedNodeStyle,
  setSavedNodeStyle
} from '../src/components/networkSymbols.js';
import {topology} from '../src/simulations/foundations.js';
import {topics} from '../src/topics/topicRegistry.js';
import {classroomExample} from '../src/components/classroomExample.js';

beforeEach(() => {
  localStorage.clear();
});

it('classifies device kinds accurately from labels and explicit kinds', () => {
  expect(getNodeDeviceKind('Switch A')).toBe('switch');
  expect(getNodeDeviceKind('Switch B')).toBe('switch');
  expect(getNodeDeviceKind('Core')).toBe('switch');
  expect(getNodeDeviceKind('Branch A')).toBe('switch');
  expect(getNodeDeviceKind('Computer A')).toBe('computer');
  expect(getNodeDeviceKind('PC 1')).toBe('computer');
  expect(getNodeDeviceKind('Laptop')).toBe('computer');
  expect(getNodeDeviceKind('Router')).toBe('router');
  expect(getNodeDeviceKind('Default Gateway')).toBe('router');
  expect(getNodeDeviceKind('Server')).toBe('server');
  expect(getNodeDeviceKind('DNS Resolver')).toBe('server');
  expect(getNodeDeviceKind('Printer')).toBe('printer');
  expect(getNodeDeviceKind('Access Point')).toBe('wireless');
  expect(getNodeDeviceKind('Hub')).toBe('hub');
  expect(getNodeDeviceKind('A')).toBe('generic');
});

it('generates standard vector SVG symbols for each device type', () => {
  const switchSvg = getDeviceSymbolSvg('switch');
  expect(switchSvg).toContain('symbol-switch');
  expect(switchSvg).toContain('<rect');
  expect(switchSvg).toContain('<path'); // opposing arrows

  const pcSvg = getDeviceSymbolSvg('computer');
  expect(pcSvg).toContain('symbol-pc');
  expect(pcSvg).toContain('<rect');

  const deadSvg = getDeviceSymbolSvg('switch', {isDead: true});
  expect(deadSvg).toContain('Device fault');
});

it('renders node in box mode vs symbol mode according to style option', () => {
  const boxMarkup = renderTopologyNode({
    x: 100,
    y: 200,
    label: 'Switch A',
    kind: 'switch',
    style: 'boxes'
  });
  expect(boxMarkup).toContain('<rect x="-53" y="-25" width="106" height="50"');
  expect(boxMarkup).toContain('Switch A');
  expect(boxMarkup).not.toContain('symbol-switch');

  const symbolMarkup = renderTopologyNode({
    x: 100,
    y: 200,
    label: 'Switch A',
    kind: 'switch',
    style: 'symbols'
  });
  expect(symbolMarkup).toContain('symbol-switch');
  expect(symbolMarkup).toContain('Switch A');
  expect(symbolMarkup).toContain('symbol-label-pill');
});

it('topology workbench supports switching between device symbols and labeled boxes', () => {
  const root = document.createElement('div');
  topology(root);

  const styleSelect = root.querySelector('[name="nodeStyle"]');
  expect(styleSelect).not.toBeNull();
  expect(Array.from(styleSelect.options).map(o => o.value)).toEqual(['symbols', 'boxes']);

  // Initially symbols
  expect(root.querySelector('.symbol-switch, .symbol-pc')).not.toBeNull();

  // Switch to boxes
  styleSelect.value = 'boxes';
  styleSelect.dispatchEvent(new Event('change'));
  expect(root.querySelector('.symbol-switch')).toBeNull();
  expect(root.querySelectorAll('rect[width="106"]')).toHaveLength(5);

  // Switch back to symbols
  styleSelect.value = 'symbols';
  styleSelect.dispatchEvent(new Event('change'));
  expect(root.querySelector('.symbol-switch, .symbol-pc')).not.toBeNull();
});

it('hybrid topology example slide renders device symbols and respects nodeStyle state', () => {
  const topic = topics.find(t => t.id === '03-network-topologies');
  const hybridSlide = topic.slides.find(s => s.topologyKind === 'Hybrid');
  expect(hybridSlide).toBeDefined();

  const renderedSymbols = document.createElement('div');
  renderedSymbols.innerHTML = classroomExample(hybridSlide, {nodeStyle: 'symbols'});
  expect(renderedSymbols.querySelector('.symbol-switch')).not.toBeNull();
  expect(renderedSymbols.querySelector('.symbol-pc')).not.toBeNull();
  expect(renderedSymbols.querySelectorAll('[data-example-node]')).toHaveLength(5);

  const renderedBoxes = document.createElement('div');
  renderedBoxes.innerHTML = classroomExample(hybridSlide, {nodeStyle: 'boxes'});
  expect(renderedBoxes.querySelector('.symbol-switch')).toBeNull();
  expect(renderedBoxes.querySelectorAll('rect[width="106"]')).toHaveLength(5);
  expect(renderedBoxes.querySelectorAll('[data-example-node]')).toHaveLength(5);
});

