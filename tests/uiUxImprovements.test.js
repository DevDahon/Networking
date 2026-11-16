import {describe,it,expect,beforeEach,afterEach,vi} from 'vitest';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {topics} from '../src/topics/topicRegistry.js';
import {startApp} from '../src/app.js';
import {shouldHandleKey} from '../src/router.js';
import {saveProgress} from '../src/utils/progress.js';
import {fitSlide} from '../src/components/fitSlide.js';
import {select,input} from '../src/components/ui.js';
import {addressExplorer} from '../src/simulations/addressing.js';
import {simulations} from '../src/simulations/index.js';

let cleanup;
beforeEach(()=>{
 localStorage.clear();
 history.replaceState(null,'','/#/');
 document.body.innerHTML='<div id="app"></div>';
});
afterEach(()=>{
 cleanup?.();
 cleanup=null;
 document.documentElement.classList.remove('dark');
 vi.restoreAllMocks();
});

describe('UI/UX and Accessibility Improvements',()=>{
 it('allows Arrow keys to navigate slides when a button or link is focused but protects Space',()=>{
  const btn=document.createElement('button');
  expect(shouldHandleKey({target:btn,key:'ArrowRight'})).toBe(true);
  expect(shouldHandleKey({target:btn,key:'ArrowLeft'})).toBe(true);
  expect(shouldHandleKey({target:btn,key:' '})).toBe(false);
  expect(shouldHandleKey({target:btn})).toBe(false);

  const inp=document.createElement('input');
  expect(shouldHandleKey({target:inp,key:'ArrowRight'})).toBe(false);
 });

 it('dashboard card resumes at saved slide when progress exists and provides resume indicator',()=>{
  saveProgress({version:1,topics:{[topics[0].id]:{slide:4}}});
  history.replaceState(null,'','/#/');
  cleanup=startApp(document.querySelector('#app'));

  const card=document.querySelector('.topic-card');
  expect(card.getAttribute('href')).toBe(`#/topic/${topics[0].id}`);
  expect(card.querySelector('.card-resume')).not.toBeNull();
  expect(card.querySelector('.card-resume').textContent).toContain('Resume slide 5');
 });

 it('fitSlide leaves body style unconstrained on narrow mobile viewports (< 768px)',()=>{
  document.body.innerHTML='<div class="slide-stage"><article class="slide"><div class="slide-body"><p>Content</p></div></article></div>';
  const stage=document.querySelector('.slide-stage'),body=stage.querySelector('.slide-body');
  const width=vi.spyOn(HTMLElement.prototype,'clientWidth','get').mockImplementation(function(){return this.classList.contains('slide-body-frame')?375:0;});
  const height=vi.spyOn(HTMLElement.prototype,'clientHeight','get').mockImplementation(function(){return this.classList.contains('slide-body-frame')?667:0;});

  const dispose=fitSlide(stage);
  expect(body.style.transform).toBe('');
  expect(body.style.width).toBe('');
  dispose();
 });

 it('ui helpers generate matching id and for attributes for form controls',()=>{
  const selHtml=select('Test Select','test-sel',['A','B'],'A');
  expect(selHtml).toContain('id="test-sel"');
  expect(selHtml).toContain('for="test-sel"');

  const inpHtml=input('Test Input','test-inp','val');
  expect(inpHtml).toContain('id="test-inp"');
  expect(inpHtml).toContain('for="test-inp"');
 });

 it('subnet calculator outputs singular bit for 1 host bit on /31',()=>{
  const container=document.createElement('div');
  addressExplorer(container,true);
  container.querySelector('[data-prefix="31"]').click();
  expect(container.querySelector('.small').textContent).toContain('1 host bit');
  expect(container.querySelector('.small').textContent).not.toContain('1 host bits');
 });

 it('simulation dropdown CSS overrides fixed 290px label cap to prevent overlapping text',()=>{
  const css=readFileSync(resolve(process.cwd(),'src/styles/main.css'),'utf8');
  expect(css).toMatch(/\.control-row label:has\(select\)[\s\S]*max-width:\s*100%/);
  expect(css).toMatch(/\.presentation-mode \.control-row label:has\(select\)[\s\S]*max-width:\s*100%/);
  expect(css).toMatch(/\.automatic-example \.example-settings label[\s\S]*flex:\s*0 1 auto[\s\S]*min-width:\s*0[\s\S]*max-width:\s*100%/);
 });

 it('keeps all numbered and ordered teaching lists in a single vertical row stack',()=>{
  const css=readFileSync(resolve(process.cwd(),'src/styles/main.css'),'utf8');
  expect(css).toMatch(/\.slide-walkthrough \.teaching-points\s*\{[^}]*grid-template-columns:\s*1fr;/);
  expect(css).toMatch(/\.teaching-points\.counted-grid\s*\{[^}]*grid-template-columns:\s*1fr;/);
  expect(css).toMatch(/\.teaching-points\.counted-grid-3\s*\{[^}]*grid-template-columns:\s*1fr;/);
 });

 it('omits static AI-style footnote and takeaway callout banners across topics and all active simulations',()=>{
  expect(topics.every(topic=>topic.slides.every(slide=>!('footnote' in slide)))).toBe(true);

  const stage=document.createElement('div');
  const seen=new Set();
  for(const topic of topics){
   for(const slide of topic.slides){
    if(!slide.type||seen.has(slide.type))continue;
    seen.add(slide.type);
    stage.innerHTML='';
    const dispose=simulations[slide.type](stage,slide);
    expect(stage.querySelector('.callout'),`Unexpected .callout in ${slide.type}`).toBeNull();
    dispose?.();
   }
  }
 });
 it('keeps website UI chrome consistently blue while preserving simulation visual colors',()=>{
  const css=readFileSync(resolve(process.cwd(),'src/styles/main.css'),'utf8');
  expect(css).toMatch(/summary:focus-visible\s*\{[^}]*outline:\s*3px solid var\(--blue\)/);
  expect(css).toMatch(/\.local-indicator:before\s*\{[^}]*background:\s*var\(--blue\)/);
  expect(css).toMatch(/\.eyebrow\s*\{[^}]*color:\s*#1d4ed8/);
  expect(css).toMatch(/\.group-1,\s*\.group-2,\s*\.group-3\s*\{[^}]*background:\s*#eff6ff;[^}]*color:\s*var\(--blue\)/);
  expect(css).toMatch(/\.discussion\s*\{[^}]*border-left:\s*3px solid var\(--blue\)/);
  expect(css).toMatch(/\.grid-kind-badge\.kind-title,\s*\.grid-kind-badge\.kind-demo,\s*\.grid-kind-badge\.kind-summary\s*\{[^}]*background:\s*#eff6ff;[^}]*color:\s*var\(--blue\)/);
  expect(css).toMatch(/\.badge-topic,\s*\.badge-slide,\s*\.badge-glossary\s*\{[^}]*background:\s*#eff6ff;[^}]*color:\s*var\(--blue\)/);
  expect(css).toMatch(/\.section-kicker\s*\{[^}]*color:\s*var\(--blue\)/);
  expect(css).toMatch(/\.lab-notice-box\s*\{[^}]*background:\s*#eff6ff;[^}]*border:\s*1px solid #bfdbfe/);
  expect(css).not.toMatch(/\.slide-example\s+\.slide-context-pill/);
  expect(css).toMatch(/html\.dark\s+\.eyebrow\s*\{[^}]*color:\s*#60a5fa/);
  expect(css).toMatch(/\.feedback\.success\s*\{[^}]*color:\s*#065f46/);
  expect(css).toMatch(/\.bit-split-host\s*\{[^}]*#0d9488/);
 });

 it('standardizes shared two-column workbench grid, CSS variables, and Slide Grid kind badges in light and dark mode',()=>{
  const css=readFileSync(resolve(process.cwd(),'src/styles/main.css'),'utf8');
  expect(css).toContain('.sim-workbench-grid');
  expect(css).toContain('--bg-surface:');
  expect(css).toContain('--bg-elevated:');
  expect(css).toContain('--border-color:');
  expect(css).toContain('--text-primary:');
  expect(css).toMatch(/html\.dark\s*\{[\s\S]*--bg-surface:/);

  for(const kind of ['title','objectives','concept','example','demo','application','walkthrough','summary']){
   expect(css).toContain(`.grid-kind-badge.kind-${kind}`);
   expect(css).toContain(`html.dark .grid-kind-badge.kind-${kind}`);
  }
 });

 it('search modal reports accurate total slide count, indexes slide bullet items, and omits stale weekly coverage text',()=>{
  cleanup=startApp(document.querySelector('#app'));
  const totalSlides=topics.reduce((sum,t)=>sum+t.slides.length,0);
  const searchBtn=document.querySelector('#btn-search');
  expect(searchBtn).not.toBeNull();
  searchBtn.click();

  const inputEl=document.querySelector('.search-input');
  expect(inputEl).not.toBeNull();
  expect(inputEl.placeholder).toContain(`${topics.length} topics, ${totalSlides} slides`);
  expect(document.querySelector('.search-modal-container').textContent).not.toContain('weekly coverage');

  // Search for a bullet item term ("110 impact punch-down tool") to verify slide.items indexing
  inputEl.value='punch-down tool';
  inputEl.dispatchEvent(new Event('input',{bubbles:true}));
  expect(document.querySelectorAll('.search-result-item').length).toBeGreaterThan(0);
 });

 it('matches RJ45 connector orientation and straight-through visuals on clarified Topic 6 titles',()=>{
  const rj45=topics.find(t=>t.id==='07-rj45-crimping');
  const straightSlideIdx=rj45.slides.findIndex(s=>s.title==='Straight-Through vs Crossover Cables');
  expect(straightSlideIdx).toBeGreaterThan(-1);

  history.replaceState(null,'',`/#/topic/${rj45.id}/slide/${straightSlideIdx+1}`);
  cleanup=startApp(document.querySelector('#app'));
  expect(document.querySelector('.rj45-slide-grid')).not.toBeNull();
  expect(document.querySelector('.rj45-schematic-title').textContent).toContain('Straight-Through');
 });

 it('renders security and securityFirewall simulations in two-column workbench layout with working step controls',()=>{
  const stage=document.createElement('div');
  const d1=simulations.security(stage);
  expect(stage.querySelector('.sim-workbench-grid')).not.toBeNull();
  stage.querySelector('[data-action="advance"]').click();
  expect(stage.querySelector('.step-card').textContent).toContain('Step 2 / 3');
  d1?.();

  stage.innerHTML='';
  const d2=simulations.securityFirewall(stage);
  expect(stage.querySelector('.sim-workbench-grid')).not.toBeNull();
  stage.querySelector('[data-action="advance"]').click();
  expect(stage.querySelector('.step-card').textContent).toContain('Step 2 / 4');
  d2?.();
 });

 it('renders slide grid modal and toggles dark mode cleanly',()=>{
  cleanup=startApp(document.querySelector('#app'));
  history.replaceState(null,'',`/#/topic/${topics[0].id}/slide/1`);
  window.dispatchEvent(new HashChangeEvent('hashchange'));

  const gridBtn=document.querySelector('#btn-slide-grid');
  expect(gridBtn).not.toBeNull();
  gridBtn.click();
  expect(document.querySelectorAll('.slide-grid-card')).toHaveLength(topics[0].slides.length);
  expect(document.querySelector('.grid-kind-badge')).not.toBeNull();

  const themeBtn=document.querySelector('#btn-theme-toggle');
  expect(themeBtn).not.toBeNull();
  themeBtn.click();
  expect(document.documentElement.classList.contains('dark')).toBe(true);
 });

  it('asks for confirmation when clicking Previous topic on slide 1 or Next topic on the last slide', () => {
    cleanup = startApp(document.querySelector('#app'));

    history.replaceState(null, '', '/#/topic/' + topics[0].id + '/slide/1');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(document.querySelector('[data-action="prev"]').disabled).toBe(true);

    history.replaceState(null, '', '/#/topic/' + topics[2].id + '/slide/1');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    const prevBtn = document.querySelector('[data-action="prev"]');
    expect(prevBtn.disabled).toBe(false);
    expect(prevBtn.textContent).toMatch(/Previous topic/i);

    prevBtn.click();
    expect(document.querySelector('.confirm-modal-overlay')).not.toBeNull();
    expect(location.hash).toBe('#/topic/' + topics[2].id + '/slide/1');
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(document.querySelector('.confirm-modal-overlay')).toBeNull();
    expect(location.hash).toBe('#/topic/' + topics[2].id + '/slide/1');

    prevBtn.click();
    document.querySelector('[data-confirm-accept]').click();
    expect(location.hash).toBe('#/topic/' + topics[1].id + '/slide/' + topics[1].slides.length);

    window.dispatchEvent(new HashChangeEvent('hashchange'));
    const nextTopicBtn = document.querySelector('.slide-navigation a[href^="#/topic/"]');
    nextTopicBtn.click();
    expect(document.querySelector('.confirm-modal-overlay')).not.toBeNull();
    document.querySelector('[data-confirm-accept]').click();
    expect(location.hash).toBe('#/topic/' + topics[2].id + '/slide/1');
  });

  it('renders Next topic button on last slide of intermediate topics and Back to Topics on final topic', () => {
    cleanup = startApp(document.querySelector('#app'));

    // Intermediate topic: Topic 1 last slide
    const firstTopic = topics[0];
    history.replaceState(null, '', '/#/topic/' + firstTopic.id + '/slide/' + firstTopic.slides.length);
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    const nextTopicBtn = document.querySelector('.slide-navigation a[href^="#/topic/"]');
    expect(nextTopicBtn).not.toBeNull();
    expect(nextTopicBtn.textContent).toMatch(/Next topic/i);
    expect(nextTopicBtn.getAttribute('href')).toBe('#/topic/' + topics[1].id + '/slide/1');
    expect(document.querySelector('.slide-navigation a[href="#/"]')).toBeNull();

    // Advancing with ArrowRight on last slide transitions to Next topic slide 1
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(location.hash).toBe('#/topic/' + topics[1].id + '/slide/1');

    // Final topic: last slide
    const finalTopic = topics.at(-1);
    history.replaceState(null, '', '/#/topic/' + finalTopic.id + '/slide/' + finalTopic.slides.length);
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(document.querySelector('.slide-navigation a[href^="#/topic/"]')).toBeNull();
    const backToTopicsBtn = document.querySelector('.slide-navigation a[href="#/"]');
    expect(backToTopicsBtn).not.toBeNull();
    expect(backToTopicsBtn.textContent).toMatch(/Back to Topics/i);
  });
});
