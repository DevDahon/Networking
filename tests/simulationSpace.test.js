import {it,expect,vi,afterEach} from 'vitest';
import {reserveSimulationSpace} from '../src/components/simulationSpace.js';

afterEach(()=>vi.restoreAllMocks());
it('reserves the longest caption and entire scene before short steps play',()=>{
 document.body.innerHTML='<div><div class="measure-demo"></div></div>';
 const root=document.querySelector('.measure-demo');
 vi.spyOn(HTMLElement.prototype,'offsetWidth','get').mockImplementation(function(){return this.classList.contains('measure-demo')?1000:0;});
 vi.spyOn(HTMLElement.prototype,'offsetHeight','get').mockImplementation(function(){
  if(this.classList.contains('step-card'))return Math.max(Number.parseFloat(this.style.minHeight)||0,this.textContent.includes('Long')?240:80);
  if(this.classList.contains('measure-demo'))return 100+(this.querySelector('.step-card')?.offsetHeight||0);
  return 0;
 });
 vi.spyOn(HTMLElement.prototype,'scrollHeight','get').mockImplementation(function(){return this.offsetHeight;});
 const short='<section class="step-card">Short request</section>',long='<section class="step-card">Long response with additional facts</section>';
 root.innerHTML=short;reserveSimulationSpace(root,[short,long]);
 expect(root.style.minHeight).toBe('342px');
 expect(root.querySelector('.step-card').style.minHeight).toBe('240px');
 expect(root.textContent).toBe('Short request');
 expect(document.querySelectorAll('.measure-demo')).toHaveLength(1);
 root.innerHTML=long;reserveSimulationSpace(root,[short,long]);
 expect(root.style.minHeight).toBe('342px');
 expect(root.querySelector('.step-card').style.minHeight).toBe('240px');
 root.innerHTML=short;reserveSimulationSpace(root,[short,long]);
 expect(root.style.minHeight).toBe('342px');expect(root.textContent).toBe('Short request');
});
