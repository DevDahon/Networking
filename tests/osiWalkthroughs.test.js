import {it,expect,vi,afterEach} from 'vitest';
import {encapsulationState,encapsulationWalkthrough} from '../src/simulations/osiWalkthroughs.js';

let dispose;
afterEach(()=>{dispose?.();dispose=null;vi.useRealTimers();});
const click=(root,action)=>root.querySelector(`[data-action="${action}"]`).click();
function mount(){document.body.innerHTML='<div id="walkthrough"></div>';const root=document.querySelector('#walkthrough');dispose=encapsulationWalkthrough(root);return root;}
function message(root,value){const field=root.querySelector('input');field.value=value;root.querySelector('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));}
it.each(['Hello!','Kumusta, ñ!','你好 👋','<img src=x>'])('preserves the exact message %s through every wrapper and decoding',value=>{
 for(let i=0;i<9;i++)expect(encapsulationState(value,i).message).toBe(value);
 const root=mount();message(root,value);
 const depth=[0,1,2,3,3,3,2,1,0];
 for(let i=0;i<9;i++){
  expect(root.querySelectorAll('.osi-wrapper')).toHaveLength(depth[i]);
  expect(root.querySelector('[data-message]').textContent).toBe(value);
  expect(root.querySelector('img')).toBeNull();
  if(i<8)click(root,'advance');
 }
 expect(root.querySelector('[data-message]').previousElementSibling.textContent).toBe('Received message');
});
it('nests link information outside network information outside transport and message',()=>{
 const root=mount();for(let i=0;i<3;i++)click(root,'advance');
 const frame=root.querySelector('.osi-wrapper-view>.wrapper-2');
 expect(frame.querySelector(':scope>.wrapper-1>.wrapper-0>[class="ink-free-payload"]')).not.toBeNull();
 expect(frame.textContent).toContain('50000 → 5000');
 expect(frame.textContent).toContain('192.168.1.10 → 192.168.1.20');
 expect(frame.textContent).toContain('error-check information (not calculated here)');
});
it('shows bits derived from the entered message, not a fixed unrelated payload',()=>{
 const root=mount();message(root,'Hi');for(let i=0;i<4;i++)click(root,'advance');
 expect(root.querySelector('.osi-binary-preview').textContent).toContain('01001000 01101001');
 expect(encapsulationState('ñ',4).bytes).toEqual([195,177]);
});
it('pauses while editing, resets the new message, and disposes autoplay',()=>{
 vi.useFakeTimers();const root=mount();expect(vi.getTimerCount()).toBe(0);
 click(root,'toggle');vi.advanceTimersByTime(4000);expect(root.querySelectorAll('.osi-wrapper')).toHaveLength(2);
 root.querySelector('input').dispatchEvent(new Event('focus'));expect(vi.getTimerCount()).toBe(0);
 message(root,'New message');expect(root.querySelector('.journey-heading').textContent).toContain('1 / 9');
 expect(root.querySelector('[data-message]').textContent).toBe('New message');
 click(root,'toggle');expect(vi.getTimerCount()).toBe(1);dispose();dispose=null;expect(vi.getTimerCount()).toBe(0);
});
