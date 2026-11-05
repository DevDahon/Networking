import {it,expect,afterEach} from 'vitest';
import {mountPenTool} from '../src/components/penTool.js';
import {startApp} from '../src/app.js';
let dispose;
afterEach(()=>{dispose?.();dispose=null;});
function mount(){document.body.innerHTML='<div id="header"></div><div id="stage"></div>';const state={strokes:[],undo:[],color:'#dc2626',width:5};dispose=mountPenTool(document.querySelector('#stage'),document.querySelector('#header'),state);const svg=document.querySelector('.slide-ink');svg.getBoundingClientRect=()=>({left:10,top:20,width:1000,height:500});return {state,svg};}
function pointer(svg,type,x,y){const event=new Event(type,{bubbles:true,cancelable:true});Object.assign(event,{pointerId:1,button:0,clientX:x,clientY:y});svg.dispatchEvent(event);}
function click(action){document.querySelector(`[data-ink="${action}"]`).click();}
it('starts with normal slide interaction and draws normalized ink only after enabling',()=>{
 const {state,svg}=mount();expect(svg.classList.contains('ink-enabled')).toBe(false);
 pointer(svg,'pointerdown',110,120);expect(state.strokes).toHaveLength(0);
 document.querySelector('#header button').click();pointer(svg,'pointerdown',110,120);pointer(svg,'pointermove',510,270);pointer(svg,'pointerup',510,270);
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
it('keeps annotations independent per slide and restores them on return',()=>{
 localStorage.clear();history.replaceState(null,'','/#/topic/01-introduction-to-networking/slide/1');document.body.innerHTML='<div id="app"></div>';dispose=startApp(document.querySelector('#app'));
 const svg=document.querySelector('.slide-ink');svg.getBoundingClientRect=()=>({left:0,top:0,width:1000,height:500});
 document.querySelector('.header-right button').click();pointer(svg,'pointerdown',100,100);pointer(svg,'pointerup',100,100);
 const go=hash=>{history.replaceState(null,'',hash);window.dispatchEvent(new HashChangeEvent('hashchange'));};
 go('#/topic/01-introduction-to-networking/slide/2');expect(document.querySelectorAll('.slide-ink path')).toHaveLength(0);
 go('#/topic/01-introduction-to-networking/slide/1');expect(document.querySelectorAll('.slide-ink path')).toHaveLength(1);expect(document.querySelector('.slide-ink').classList.contains('ink-enabled')).toBe(false);
 go('#/');expect(document.querySelector('.slide-ink')).toBeNull();expect(document.querySelector('.pen-toolbar')).toBeNull();
});
