import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { topics } from '../src/topics/topicRegistry.js';
import { startApp } from '../src/app.js';
import { parseRoute } from '../src/router.js';

let cleanup;
beforeEach(() => {
  localStorage.clear();
  history.replaceState(null, '', '/#/');
  document.body.innerHTML = '<div id="app"></div>';
});
afterEach(() => {
  cleanup?.();
  cleanup = null;
  vi.restoreAllMocks();
});

function app(hash = '#/') {
  history.replaceState(null, '', '/' + hash);
  cleanup = startApp(document.querySelector('#app'));
}

function go(hash) {
  history.replaceState(null, '', '/' + hash);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

describe('Course Outline Module', () => {
  it('parses outline routes correctly without interfering with topics', () => {
    expect(parseRoute('#/outline', topics)).toEqual({ kind: 'outline' });
    expect(parseRoute('#/course-outline', topics)).toEqual({ kind: 'outline' });
    expect(parseRoute('#/topic/01-introduction-to-networking', topics).kind).toBe('topic');
    expect(parseRoute('#/', topics)).toEqual({ kind: 'dashboard' });
  });

  it('renders only topics and subtopics without weeks, examinations, or extra content', () => {
    app('#/outline');

    const h1 = document.querySelector('.outline-header h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toBe('NETWORKING 1 – COURSE OUTLINE');

    // 12 core syllabus topics
    const topicItems = document.querySelectorAll('.outline-topic-item');
    expect(topicItems).toHaveLength(12);

    const topicTitles = Array.from(document.querySelectorAll('.outline-topic-title')).map(t => t.textContent.trim());
    expect(topicTitles).toEqual([
      'Introduction to Computer Networking',
      'Types of Networks',
      'Networking Basics',
      'Networking Reference Models',
      'Network Media and Connectors',
      'Ethernet and Basic Network Protocols',
      'Introduction to IP Addressing',
      'Fundamentals of IPv4 Subnetting',
      'IP Configuration and IPv6 Fundamentals',
      'P2P Networking and File Sharing',
      'Wireless Networking and Router Configuration',
      'Introduction to Network Security'
    ]);

    // Subtopics exist under topics as bullet items
    const subtopicItems = document.querySelectorAll('.subtopics-list li');
    expect(subtopicItems.length).toBeGreaterThan(40);
    const subtopicsText = Array.from(subtopicItems).map(s => s.textContent);
    expect(subtopicsText).toContain('Data communications and computers');
    expect(subtopicsText).toContain('PAN, LAN, WLAN, MAN, and WAN');
    expect(subtopicsText).toContain('Seven OSI layers');
    expect(subtopicsText).toContain('T568A and T568B');
    expect(subtopicsText).toContain('Subnet masks and default gateway');
    expect(subtopicsText).toContain('WPA2 and WPA3');
    expect(subtopicsText).toContain('Malware and phishing');

    // Confirms Weeks and Final Examination are completely removed
    const outlineText = document.querySelector('.outline-page').textContent;
    expect(outlineText).not.toContain('Week 2');
    expect(outlineText).not.toContain('Week 18');
    expect(outlineText).not.toContain('Final Examination');
    expect(document.querySelectorAll('.week-pill')).toHaveLength(0);

    // Confirms unnecessary extra sections are completely removed per prompt requirements
    expect(document.querySelectorAll('.outcome-card')).toHaveLength(0);
    expect(document.querySelectorAll('.journey-step')).toHaveLength(0);
    expect(document.querySelectorAll('.skill-card')).toHaveLength(0);
    expect(document.querySelector('.lab-notice-box')).toBeNull();
    expect(document.querySelectorAll('.module-card')).toHaveLength(0);

    // Return to Topic Dashboard action button exists
    const backBtn = document.querySelector('.outline-actions-footer a[href="#/"]');
    expect(backBtn).not.toBeNull();
  });

  it('keeps the 14 instructional topics count unchanged and preserves dashboard integrity', () => {
    app('#/');
    expect(topics).toHaveLength(14);
    expect(document.querySelectorAll('.topic-card')).toHaveLength(14);

    // Dashboard hero has a link to the course outline
    const outlineLink = document.querySelector('.intro-actions a[href="#/outline"]');
    expect(outlineLink).not.toBeNull();
    expect(outlineLink.textContent).toContain('Course Outline');
  });

  it('navigates seamlessly between dashboard, outline, and topics', () => {
    app('#/');
    expect(document.querySelector('.dashboard-intro')).not.toBeNull();

    go('#/outline');
    expect(document.querySelector('.outline-header')).not.toBeNull();
    expect(document.querySelector('.dashboard-intro')).toBeNull();

    // Return to dashboard via button
    const backBtn = document.querySelector('.outline-actions-footer a[href="#/"]');
    expect(backBtn).not.toBeNull();
    go('#/');
    expect(document.querySelector('.dashboard-intro')).not.toBeNull();
  });
});
