import {it,expect,afterEach} from 'vitest';
import {mountPenTool} from '../src/components/penTool.js';
import {startApp} from '../src/app.js';
let dispose;
afterEach(()=>{dispose?.();dispose=null;});
function mount(){document.body.innerHTML='<div id="header"></div><div id="stage"></div>';const state={strokes:[],undo:[],color:'#dc2626',width:5};dispose=mountPenTool(document.querySelector('#stage'),document.querySelector('#header'),state);const svg=document.querySelector('.slide-ink');svg.getBoundingClientRect=()=>({left:10,top:20,width:1000,height:500});return {state,svg};}
function pointer(svg,type,x,y){const event=new Event(type,{bubbles:true,cancelable:true});Object.assign(event,{pointerId:1,button:0,clientX:x,clientY:y});svg.dispatchEvent(event);}
function click(action){document.querySelector(`[data-ink="${action}"]`).click();}
function key(k,opts={}){const event=new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true,...opts});(opts.target||window).dispatchEvent(event);return event;}
it('hides header pen toggle and draws normalized ink after pressing P',()=>{
 const {state,svg}=mount();expect(document.querySelector('#header .pen-toggle').hidden).toBe(true);expect(svg.classList.contains('ink-enabled')).toBe(false);
 pointer(svg,'pointerdown',110,120);expect(state.strokes).toHaveLength(0);
 key('p');expect(svg.classList.contains('ink-enabled')).toBe(true);pointer(svg,'pointerdown',110,120);pointer(svg,'pointermove',510,270);pointer(svg,'pointerup',510,270);
 expect(state.strokes[0].points).toEqual([{x:100,y:200},{x:500,y:500}]);
 expect(svg.querySelector('path').getAttribute('d')).toBe('M100,200 L500,500');
 click('pointer');expect(svg.classList.contains('ink-enabled')).toBe(false);
});
it('erases intersecting strokes and supports undo and clear without touching slide content',()=>{
 const {state,svg}=mount();document.querySelector('#header button').click();
 pointer(svg,'pointerdown',110,120);pointer(svg,'pointermove',510,120);pointer(svg,'pointerup',510,120);
 click('eraser');pointer(svg,'pointerdown',310,120);pointer(svg,'pointerup',310,120);expect(state.strokes).toHaveLength(0);
 click('undo');expect(state.strokes).toHaveLength(1);
 click('clear');expect(state.strokes).toHaveLength(0);click('undo');expect(state.strokes).toHaveLength(1);
 window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));expect(document.querySelector('.pen-toolbar').hidden).toBe(true);
 dispose();dispose=null;expect(document.querySelector('.slide-ink')).toBeNull();expect(document.querySelector('#header button')).toBeNull();
});
it('toggles P/E back to pointer, clears with C, exits on Esc, and ignores modal or input focus',()=>{
 const {state,svg}=mount();
 key('p');expect(document.querySelector('.pen-toolbar').hidden).toBe(false);expect(document.querySelector('[data-ink="pen"]').getAttribute('aria-pressed')).toBe('true');
 pointer(svg,'pointerdown',100,100);pointer(svg,'pointerup',100,100);expect(state.strokes).toHaveLength(1);
 key('p');expect(document.querySelector('.pen-toolbar').hidden).toBe(true);expect(svg.classList.contains('ink-enabled')).toBe(false);expect(document.querySelector('[data-ink="pointer"]').getAttribute('aria-pressed')).toBe('true');
 key('e');expect(document.querySelector('.pen-toolbar').hidden).toBe(false);expect(svg.classList.contains('ink-eraser')).toBe(true);expect(document.querySelector('[data-ink="eraser"]').getAttribute('aria-pressed')).toBe('true');
 pointer(svg,'pointerdown',100,100);pointer(svg,'pointerup',100,100);expect(state.strokes).toHaveLength(0);
 key('e');expect(document.querySelector('.pen-toolbar').hidden).toBe(true);expect(svg.classList.contains('ink-enabled')).toBe(false);
 key('P');expect(svg.classList.contains('ink-enabled')).toBe(true);
 pointer(svg,'pointerdown',200,200);pointer(svg,'pointerup',200,200);expect(state.strokes).toHaveLength(1);
 key('c');expect(state.strokes).toHaveLength(0);expect(state.undo).toHaveLength(4);click('undo');expect(state.strokes).toHaveLength(1);
 key('Escape');expect(document.querySelector('.pen-toolbar').hidden).toBe(true);expect(svg.classList.contains('ink-enabled')).toBe(false);
 key('c');expect(state.strokes).toHaveLength(0);
 key('p',{ctrlKey:true});key('e',{altKey:true});key('p',{metaKey:true});expect(svg.classList.contains('ink-enabled')).toBe(false);
 const input=document.createElement('input');document.body.append(input);key('p',{target:input});expect(svg.classList.contains('ink-enabled')).toBe(false);input.remove();
 const modal=document.createElement('div');modal.className='search-modal-overlay';document.body.append(modal);key('p');expect(svg.classList.contains('ink-enabled')).toBe(false);modal.remove();
});
it('keeps annotations independent per slide and restores them on return',()=>{
 localStorage.clear();history.replaceState(null,'','/#/topic/01-introduction-to-networking/slide/1');document.body.innerHTML='<div id="app"></div>';dispose=startApp(document.querySelector('#app'));
 const svg=document.querySelector('.slide-ink');svg.getBoundingClientRect=()=>({left:0,top:0,width:1000,height:500});
 expect(document.querySelector('.header-right .pen-toggle').hidden).toBe(true);key('p');pointer(svg,'pointerdown',100,100);pointer(svg,'pointerup',100,100);
 const go=hash=>{history.replaceState(null,'',hash);window.dispatchEvent(new HashChangeEvent('hashchange'));};
 go('#/topic/01-introduction-to-networking/slide/2');expect(document.querySelectorAll('.slide-ink path')).toHaveLength(0);
 go('#/topic/01-introduction-to-networking/slide/1');expect(document.querySelectorAll('.slide-ink path')).toHaveLength(1);expect(document.querySelector('.slide-ink').classList.contains('ink-enabled')).toBe(false);
 go('#/');expect(document.querySelector('.slide-ink')).toBeNull();expect(document.querySelector('.pen-toolbar')).toBeNull();
});
