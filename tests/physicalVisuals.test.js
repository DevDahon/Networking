import { describe, it, expect, afterEach } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { topics } from '../src/topics/topicRegistry.js';
import { startApp } from '../src/app.js';
import { mediaExplorer } from '../src/simulations/foundations.js';

let cleanup;
afterEach(() => {
  cleanup?.();
  cleanup = null;
});

function mountTopicSlide(topicId, title) {
  const topic = topics.find(t => t.id === topicId);
  expect(topic).toBeDefined();
  const slideIndex = topic.slides.findIndex(s => s.title === title);
  expect(slideIndex).toBeGreaterThan(-1);
  document.body.innerHTML = '<div id="app"></div>';
  history.replaceState(null, '', `/#/topic/${topicId}/slide/${slideIndex + 1}`);
  cleanup = startApp(document.querySelector('#app'));
  return document.querySelector('#slide-content');
}

describe('Real-life photographs for physical networking content', () => {
  it.each([
    ['01-introduction-to-networking', 'Basic Network Components', 4],
    ['04-network-devices', 'Ports, Link Lights, and Home Gateways', 1],
    ['osi-reference-model', 'Layer 1: Physical Layer', 3],
    ['06-network-cables-media', 'Five network media choices', 5],
    ['06-network-cables-media', 'Three Ethernet cable categories', 1],
    ['06-network-cables-media', 'Fiber-Optic Cable Construction and Types', 2],
    ['06-network-cables-media', 'Coaxial Cable Construction and Shielding', 2],
    ['06-network-cables-media', 'Unguided Media: Wireless Radio Frequencies', 2],
    ['07-rj45-crimping', 'RJ45 Plugs and Keystone Jacks', 2],
    ['07-rj45-crimping', 'T568A: eight conductor positions', 1],
    ['07-rj45-crimping', 'T568B: eight conductor positions', 1],
    ['07-rj45-crimping', 'Straight-Through vs Crossover Cables', 1],
    ['07-rj45-crimping', 'Three common wire-map faults', 2],
    ['12-router-wireless', 'Three gateway interface and translation concepts', 1],
    ['12-router-wireless', 'Wi-Fi Frequencies and Standards', 1]
  ])('renders actual image files on %s -> %s', (topicId, title, minImages) => {
    const content = mountTopicSlide(topicId, title);
    const images = [...content.querySelectorAll('img')];
    expect(images.length).toBeGreaterThanOrEqual(minImages);
    for (const img of images) {
      const src = img.getAttribute('src');
      expect(src).toMatch(/^images\/.+\.(jpg|jpeg|png|webp)$/);
      expect(existsSync(resolve(process.cwd(), 'public', src))).toBe(true);
    }
  });

  it('does not render images on Two Link Choices: Wired vs. Wireless', () => {
    const content = mountTopicSlide('01-introduction-to-networking', 'Two Link Choices: Wired vs. Wireless');
    expect(content.querySelectorAll('img')).toHaveLength(0);
  });

  it('verifies every deviceKey and toolKey slide resolves existing image files on disk', () => {
    for (const topic of topics) {
      topic.slides.forEach((slide, idx) => {
        if (!slide.deviceKey && !slide.toolKey) return;
        document.body.innerHTML = '<div id="app"></div>';
        history.replaceState(null, '', `/#/topic/${topic.id}/slide/${idx + 1}`);
        cleanup = startApp(document.querySelector('#app'));
        const images = [...document.querySelectorAll('#slide-content img')];
        expect(images.length).toBeGreaterThan(0);
        for (const img of images) {
          const src = img.getAttribute('src');
          expect(existsSync(resolve(process.cwd(), 'public', src))).toBe(true);
        }
        cleanup();
        cleanup = null;
      });
    }
  });

  it('displays matching real cable and access point photos in mediaExplorer', () => {
    const stage = document.createElement('div');
    mediaExplorer(stage);
    const expected = {
      UTP: 'images/media/utp_cable.jpg',
      STP: 'images/media/stp_cable.jpg',
      Fiber: 'images/media/fiber_optic.jpg',
      Coaxial: 'images/media/coaxial_cable.jpg',
      Wireless: 'images/devices/ap.jpg'
    };

    for (const [medium, imgPath] of Object.entries(expected)) {
      const sel = stage.querySelector('[name="media"]');
      sel.value = medium;
      sel.dispatchEvent(new Event('change'));
      const img = stage.querySelector('.media-real-photo');
      expect(img).not.toBeNull();
      expect(img.getAttribute('src')).toBe(imgPath);
      expect(existsSync(resolve(process.cwd(), 'public', imgPath))).toBe(true);
    }
  });
});

