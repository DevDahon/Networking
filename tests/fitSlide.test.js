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
 expect(body.style.transform).toBe('scale(1)');
 expect(body.style.top).toBe('0px');
 expect(body.style.left).toBe('0px');
 expect(slide.style.width).toBe('');expect(slide.style.height).toBe('');expect(slide.style.transform).toBe('');
 expect(slide.querySelector('.slide-body-frame').contains(body)).toBe(true);
 naturalHeight=1440;window.dispatchEvent(new Event('resize'));
 expect(body.style.transform).toBe('scale(0.5)');
 expect(body.style.top).toBe('0px');
 expect(slide.style.width).toBe('');expect(slide.style.height).toBe('');expect(slide.style.transform).toBe('');
 naturalHeight=400;window.dispatchEvent(new Event('resize'));
 expect(body.style.transform).toBe('scale(1)');
 expect(body.style.top).toBe('0px');
 dispose();width.mockRestore();height.mockRestore();
});

it('anchors content slides in the upper-left corner on wide frames while keeping cover slides centered',()=>{
 document.body.innerHTML='<div class="slide-stage"><article class="slide slide-concept"><div class="slide-body"><h2>Concept</h2><p class="slide-lead">Subtitle</p></div></article></div>';
 const stage=document.querySelector('.slide-stage'),body=stage.querySelector('.slide-body');
 const width=vi.spyOn(HTMLElement.prototype,'clientWidth','get').mockImplementation(function(){return this.classList.contains('slide-body-frame')?1880:0;});
 const height=vi.spyOn(HTMLElement.prototype,'clientHeight','get').mockImplementation(function(){return this.classList.contains('slide-body-frame')?720:0;});
 Object.defineProperties(body,{offsetHeight:{get:()=>420},scrollHeight:{get:()=>418}});
 const dispose=fitSlide(stage);
 expect(body.style.width).toBe('1880px');
 expect(body.style.left).toBe('0px');
 expect(body.style.top).toBe('0px');
 expect(body.style.transform).toBe('scale(1)');
 dispose();

 document.body.innerHTML='<div class="slide-stage"><article class="slide slide-title"><div class="slide-body"><h2>Cover Title</h2></div></article></div>';
 const coverStage=document.querySelector('.slide-stage'),coverBody=coverStage.querySelector('.slide-body');
 Object.defineProperties(coverBody,{offsetHeight:{get:()=>520},scrollHeight:{get:()=>518}});
 const disposeCover=fitSlide(coverStage);
 expect(coverBody.style.width).toBe('1880px');
 expect(coverBody.style.left).toBe('50%');
 expect(coverBody.style.top).toBe('70px');
 expect(coverBody.style.transform).toBe('translateX(-50%) scale(1)');
 disposeCover();width.mockRestore();height.mockRestore();
});
