import {esc} from './ui.js';

export function createSlideGrid(root,goto){
 let modal=null;
 let isOpen=false;

 function open(topic,currentIndex){
  isOpen=true;
  if(!modal){
   modal=document.createElement('div');
   modal.className='slide-grid-overlay';
   modal.setAttribute('role','dialog');
   modal.setAttribute('aria-label','All Slides Grid');
   modal.setAttribute('aria-modal','true');
   root.appendChild(modal);
  }

  const kindBadge=kind=>{
   const map={
    title:'Title',
    objectives:'Objectives',
    concept:'Concept',
    example:'Visual Example',
    demo:'Demonstration',
    application:'Practical',
    walkthrough:'Walkthrough',
    summary:'Summary'
   };
   return map[kind]||kind||'Slide';
  };

  modal.innerHTML=`
   <div class="slide-grid-container">
    <div class="slide-grid-header">
     <div>
      <span class="eyebrow">TOPIC ${String(topic.number).padStart(2,'0')} · SLIDE SORTER</span>
      <h2>${esc(topic.title)}</h2>
      <p>Select any slide to jump directly (${topic.slides.length} slides total)</p>
     </div>
     <button type="button" class="slide-grid-close" aria-label="Close slide grid (Esc)">&times;</button>
    </div>
    <div class="slide-grid-body">
     ${topic.slides.map((s,i)=>`
      <button type="button" class="slide-grid-card ${i===currentIndex?'current':''}" data-slide-index="${i}">
       <div class="grid-card-top">
        <span class="grid-slide-num">${String(i+1).padStart(2,'0')}</span>
        <span class="grid-kind-badge kind-${s.kind}">${esc(kindBadge(s.kind))}</span>
       </div>
       <h4>${esc(s.title)}</h4>
       ${i===currentIndex?'<span class="grid-current-indicator">Current slide</span>':''}
      </button>
     `).join('')}
    </div>
   </div>
  `;

  modal.querySelector('.slide-grid-close').onclick=close;
  modal.onclick=e=>{if(e.target===modal)close();};
  modal.querySelectorAll('[data-slide-index]').forEach(card=>{
   card.onclick=()=>{
    const idx=Number(card.dataset.slideIndex);
    close();
    goto(idx);
   };
  });
 }

 function close(){
  isOpen=false;
  if(modal){
   modal.remove();
   modal=null;
  }
 }

 function toggle(topic,currentIndex){
  if(isOpen)close();
  else open(topic,currentIndex);
 }

 function destroy(){
  close();
 }

 return {
  open,
  close,
  toggle,
  destroy,
  isOpen:()=>isOpen
 };
}
