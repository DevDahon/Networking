import {esc} from './ui.js';

/** Create a lightweight accessible confirmation modal for cross-topic navigation. */
export function createConfirmModal(root){
 let modal=null;
 let activeAccept=null;
 let openState=false;

 function close(){
  openState=false;
  activeAccept=null;
  if(modal)modal.remove();
  modal=null;
 }

 function open({eyebrow,title,message,confirmLabel='Continue',onConfirm}){
  close();
  openState=true;
  activeAccept=onConfirm;
  modal=document.createElement('div');
  modal.className='confirm-modal-overlay';
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');
  modal.setAttribute('aria-label',title);
  modal.innerHTML=`
   <div class="confirm-modal-container">
    <div class="confirm-modal-body">
     ${eyebrow?`<span class="eyebrow">${esc(eyebrow)}</span>`:''}
     <h2>${esc(title)}</h2>
     <p>${esc(message)}</p>
    </div>
    <div class="confirm-modal-actions">
     <button type="button" data-confirm-cancel>Cancel</button>
     <button type="button" class="primary" data-confirm-accept>${esc(confirmLabel)}</button>
    </div>
   </div>
  `;
  root.appendChild(modal);

  modal.onclick=e=>{if(e.target===modal)close();};
  modal.querySelector('[data-confirm-cancel]').onclick=close;
  modal.querySelector('[data-confirm-accept]').onclick=()=>{
   const fn=activeAccept;
   close();
   fn?.();
  };
  modal.querySelector('[data-confirm-accept]').focus();
 }

 return {
  open,
  close,
  isOpen:()=>openState,
  destroy:close
 };
}
