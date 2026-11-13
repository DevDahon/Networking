import {it,expect,vi} from 'vitest';
import {slideScale,fitSlide} from '../src/components/fitSlide.js';
it.each([[1280,720,1280,640,1],[1280,600,1280,1200,.5],[360,640,1280,720,.28125],[1920,1080,1280,720,1.5],[0,0,1280,720,1]])('fits %s × %s without cropping',(w,h,cw,ch,scale)=>{
 expect(slideScale(w,h,cw,ch)).toBe(scale);
 if(w&&h){expect(cw*scale).toBeLessThanOrEqual(w);expect(ch*scale).toBeLessThanOrEqual(h);}
});

it('does not enlarge text again when an animated result becomes shorter',async()=>{
 document.body.innerHTML='<div class="slide-stage"><article class="slide"><div class="slide-body"><p>Initial</p></div></article></div>';
 const stage=document.querySelector('.slide-stage'),body=stage.querySelector('.slide-body');
 const width=vi.spyOn(HTMLElement.prototype,'clientWidth','get').mockImplementation(function(){return this.classList.contains('slide-body-frame')?1280:0;});
 const height=vi.spyOn(HTMLElement.prototype,'clientHeight','get').mockImplementation(function(){return this.classList.contains('slide-body-frame')?720:0;});
 let naturalHeight=1440;
 Object.defineProperties(body,{offsetHeight:{get:()=>naturalHeight},scrollHeight:{get:()=>naturalHeight-2}});
 const release=fitSlide(stage);expect(body.style.transform).toContain('scale(0.5)');
 naturalHeight=400;body.querySelector('p').textContent='Shorter step';
 await new Promise(resolve=>setTimeout(resolve,0));
 expect(body.style.transform).toContain('scale(0.5)');
 window.dispatchEvent(new Event('resize'));expect(body.style.transform).toContain('scale(1)');
 release();width.mockRestore();height.mockRestore();
});
it('keeps the outer card unchanged while short and tall content fit the same frame',()=>{
 document.body.innerHTML='<div class="slide-stage"><article class="slide"><div class="slide-kicker">1 / 10</div><div class="slide-body"></div></article></div>';
 const stage=document.querySelector('.slide-stage'),slide=stage.querySelector('.slide'),body=slide.querySelector('.slide-body');
 const width=vi.spyOn(HTMLElement.prototype,'clientWidth','get').mockImplementation(function(){return this.classList.contains('slide-body-frame')?1280:0;});
 const height=vi.spyOn(HTMLElement.prototype,'clientHeight','get').mockImplementation(function(){return this.classList.contains('slide-body-frame')?720:0;});
 let naturalHeight=400;
 Object.defineProperties(body,{scrollHeight:{get:()=>naturalHeight-2},offsetHeight:{get:()=>naturalHeight}});
 const dispose=fitSlide(stage);
 expect(body.style.transform).toBe('translateX(-50%) scale(1)');
 expect(slide.style.width).toBe('');expect(slide.style.height).toBe('');expect(slide.style.transform).toBe('');
 expect(slide.querySelector('.slide-body-frame').contains(body)).toBe(true);
 naturalHeight=1440;window.dispatchEvent(new Event('resize'));
 expect(body.style.transform).toBe('translateX(-50%) scale(0.5)');
 expect(slide.style.width).toBe('');expect(slide.style.height).toBe('');expect(slide.style.transform).toBe('');
 naturalHeight=400;window.dispatchEvent(new Event('resize'));
 expect(body.style.transform).toBe('translateX(-50%) scale(1)');
 dispose();width.mockRestore();height.mockRestore();
});

it('expands presentation width proportionally on wide frames and centers vertically without cropping',()=>{
 document.body.innerHTML='<div class="slide-stage"><article class="slide"><div class="slide-body"><p>Wide presentation slide</p></div></article></div>';
 const stage=document.querySelector('.slide-stage'),body=stage.querySelector('.slide-body');
 const width=vi.spyOn(HTMLElement.prototype,'clientWidth','get').mockImplementation(function(){return this.classList.contains('slide-body-frame')?1880:0;});
 const height=vi.spyOn(HTMLElement.prototype,'clientHeight','get').mockImplementation(function(){return this.classList.contains('slide-body-frame')?720:0;});
 Object.defineProperties(body,{offsetHeight:{get:()=>520},scrollHeight:{get:()=>518}});
 const dispose=fitSlide(stage);
 expect(body.style.width).toBe('1880px');
 expect(body.style.transform).toBe('translateX(-50%) scale(1)');
 expect(body.style.top).toBe('70px');
 dispose();width.mockRestore();height.mockRestore();
});
