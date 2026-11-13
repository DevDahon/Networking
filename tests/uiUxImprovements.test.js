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

let cleanup;
beforeEach(()=>{
 localStorage.clear();
 history.replaceState(null,'','/#/');
 document.body.innerHTML='<div id="app"></div>';
});
afterEach(()=>{
 cleanup?.();
 cleanup=null;
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
});

