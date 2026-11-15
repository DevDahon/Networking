// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { simulations } from '../src/simulations/index.js';
import { topics } from '../src/topics/topicRegistry.js';

const css = readFileSync(resolve(process.cwd(), 'src/styles/main.css'), 'utf8');

describe('Dark mode CSS contrast & component coverage', () => {
  it('defines dark mode overrides for classroom example explanations and device icon nodes', () => {
    expect(css).toContain('html.dark .example-explanation');
    expect(css).toContain('html.dark .classroom-example g[fill="#eff6ff"]');
    expect(css).toContain('html.dark .classroom-example g[fill="#ccfbf1"]');
  });

  it('defines dark mode overrides for slide footer counters and progress track', () => {
    expect(css).toContain('html.dark .slide-count');
    expect(css).toContain('html.dark .keyboard-hint');
    expect(css).toContain('html.dark .lesson-progress');
  });

  it('defines dark mode overrides for audited form labels, cards, simulations, and inline SVGs', () => {
    expect(css).toContain('html.dark label');
    expect(css).toContain('html.dark .topic-icon');
    expect(css).toContain('html.dark .card-progress');
    expect(css).toContain('html.dark .subnet-drill-container');
    expect(css).toContain('html.dark .delivery-units>span');
    expect(css).toContain('html.dark .osi-wrapper');
    expect(css).toContain('html.dark svg rect[fill="#ffffff"]:not(pattern rect)');
    expect(css).toContain('html.dark svg rect[fill="#eff6ff"]');
    expect(css).toContain('html.dark svg text[fill="#1d4ed8"]');
  });

  it('renders Topic 1 How Devices Connect (introConnections) cleanly when dark mode is enabled', () => {
    const slide = topics[0].slides.find((s) => s.type === 'introConnections');
    expect(slide).toBeTruthy();

    document.documentElement.classList.add('dark');
    const host = document.createElement('div');
    document.body.appendChild(host);

    const cleanup = simulations.introConnections(host, slide);
    expect(host.querySelector('svg.classroom-example')).toBeTruthy();
    expect(host.querySelectorAll('svg.classroom-example g[fill="#eff6ff"]').length).toBeGreaterThan(0);
    expect(host.querySelector('.example-explanation')?.textContent).toContain('Wired example:');

    cleanup?.();
    host.remove();
    document.documentElement.classList.remove('dark');
  });
});
