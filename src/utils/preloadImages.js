import { deviceMetadata } from '../components/deviceIllustrations.js';
import { toolsMetadata } from '../components/toolsVisuals.js';
import { physicalPanelImages } from '../components/physicalVisuals.js';

const warmed = new Set();

function defaultCreateImage() {
  if (typeof Image !== 'function') return null;
  if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '')) return null;
  return new Image();
}

/**
 * Collects WebP image paths rendered by a single slide.
 */
export function slideImageUrls(slide, topicId) {
  if (!slide) return [];
  if (slide.deviceKey && deviceMetadata[slide.deviceKey]) {
    return [deviceMetadata[slide.deviceKey].image];
  }
  if (slide.toolKey && toolsMetadata[slide.toolKey]) {
    return toolsMetadata[slide.toolKey].tools.map(tool => tool.image);
  }
  if (slide.visualKey === 'modularConnectors') {
    return ['images/tools/rj45_plugs.webp', 'images/tools/keystone_jack.webp'];
  }
  if (slide.visualKey === 'osiLayer1' || slide.visualKey === 'osiLowerLayers') {
    return ['images/media/utp_cable.webp', 'images/tools/rj45_plugs.webp', 'images/media/fiber_optic.webp'];
  }
  if (slide.visualKey) {
    return physicalPanelImages(slide.visualKey);
  }
  if (slide.type === 'media') {
    return physicalPanelImages('mediaChoicesPhotos');
  }
  if (topicId === '07-rj45-crimping' && (slide.title?.startsWith('T568A:') || slide.title?.startsWith('T568B:'))) {
    return ['images/tools/rj45_crimped_front.webp'];
  }
  return [];
}

/**
 * Collects unique WebP image paths across a topic, ordered from startIndex forward.
 */
export function topicImageUrls(topic, startIndex = 0) {
  if (!topic?.slides?.length) return [];
  const slides = topic.slides;
  const len = slides.length;
  const offset = ((startIndex % len) + len) % len;
  const ordered = [...slides.slice(offset), ...slides.slice(0, offset)];
  const unique = new Set();
  for (const slide of ordered) {
    for (const url of slideImageUrls(slide, topic.id)) {
      if (url) unique.add(url);
    }
  }
  return [...unique];
}

/**
 * Preloads WebP image assets into browser cache so slide transitions render immediately.
 */
export function preloadImages(urls, createImage = defaultCreateImage) {
  let queued = 0;
  for (const url of urls) {
    if (!url || warmed.has(url)) continue;
    const img = createImage();
    if (!img) break;
    warmed.add(url);
    img.decoding = 'async';
    img.src = url;
    queued++;
  }
  return queued;
}

/**
 * Clears tracked preloaded image URLs for isolated tests.
 */
export function resetPreloadedImages() {
  warmed.clear();
}

