import { describe, it, expect, afterEach } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { topics } from '../src/topics/topicRegistry.js';
import { startApp } from '../src/app.js';
import { mediaExplorer } from '../src/simulations/foundations.js';
import { preloadImages, resetPreloadedImages, topicImageUrls } from '../src/utils/preloadImages.js';

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
      expect(src).toMatch(/^images\/.+\.webp$/);
      expect(img.getAttribute('loading')).toBeNull();
      expect(img.getAttribute('decoding')).toBe('async');
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
          expect(src).toMatch(/^images\/.+\.webp$/);
          expect(img.getAttribute('loading')).toBeNull();
          expect(img.getAttribute('decoding')).toBe('async');
          expect(existsSync(resolve(process.cwd(), 'public', src))).toBe(true);
        }
        if (slide.deviceKey) {
          expect(document.querySelectorAll('#slide-content .device-tab-btn, #slide-content .device-schematic-view, #slide-content .device-hardware-svg')).toHaveLength(0);
          expect(document.querySelectorAll('#slide-content .device-photo-specs')).toHaveLength(0);
        }
        cleanup();
        cleanup = null;
      });
    }
  });

  it('omits the removed device explorer, bridge, firewall, and gateway port slides from 04-network-devices', () => {
    const topic = topics.find(t => t.id === '04-network-devices');
    expect(topic).toBeDefined();
    expect(topic.slides.some(s => (
      s.type === 'devices'
      || ['bridge', 'firewall'].includes(s.deviceKey)
      || s.visualKey === 'routerPorts'
      || /^(Network Device Functions Explorer|Network Bridge|Network Firewall|Ports, Link Lights, and Home Gateways|Nine common network devices)$/i.test(s.title)
    ))).toBe(false);
    const overview = topic.slides.find(s => s.title === 'Seven common network devices');
    expect(overview).toBeDefined();
    expect(overview.items).toHaveLength(7);
    expect(overview.items.some(item => /^(Bridge|Firewall):/i.test(item))).toBe(false);
  });

  it('displays matching real cable and access point photos in mediaExplorer', () => {
    const stage = document.createElement('div');
    mediaExplorer(stage);
    const expected = {
      UTP: 'images/media/utp_cable.webp',
      STP: 'images/media/stp_cable.webp',
      Fiber: 'images/media/fiber_optic.webp',
      Coaxial: 'images/media/coaxial_cable.webp',
      Wireless: 'images/devices/ap.webp'
    };

    for (const [medium, imgPath] of Object.entries(expected)) {
      const sel = stage.querySelector('[name="media"]');
      sel.value = medium;
      sel.dispatchEvent(new Event('change'));
      const img = stage.querySelector('.media-real-photo');
      expect(img).not.toBeNull();
      expect(img.getAttribute('src')).toBe(imgPath);
      expect(img.getAttribute('loading')).toBeNull();
      expect(img.getAttribute('decoding')).toBe('async');
      expect(existsSync(resolve(process.cwd(), 'public', imgPath))).toBe(true);
    }
  });

  it('collects and deduplicates WebP slide URLs for instant topic preloading', () => {
    resetPreloadedImages();
    const created = [];
    const createMockImage = () => {
      const mock = {};
      created.push(mock);
      return mock;
    };

    const allUrls = topics.flatMap(topic => topicImageUrls(topic));
    expect(allUrls.length).toBeGreaterThan(20);
    for (const url of allUrls) {
      expect(url).toMatch(/^images\/.+\.webp$/);
      expect(existsSync(resolve(process.cwd(), 'public', url))).toBe(true);
    }

    const rj45 = topics.find(t => t.id === '07-rj45-crimping');
    const rj45Urls = topicImageUrls(rj45, 2);
    expect(preloadImages(rj45Urls, createMockImage)).toBe(rj45Urls.length);
    expect(preloadImages(rj45Urls, createMockImage)).toBe(0);
    expect(created.every(img => img.decoding === 'async')).toBe(true);
    resetPreloadedImages();
  });
});

