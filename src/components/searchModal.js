import {esc} from './ui.js';
import {terminology} from './terminology.js';

export function createSearchModal(root,topics,onNavigate){
 let modal=null;
 let isOpen=false;
 let activeIndex=0;
 let currentResults=[];

 // Pre-index all searchable entities
 const glossaryEntries=Object.entries(terminology).map(([abbr,full])=>({
  type:'glossary',
  title:abbr,
  subtitle:full,
  query:`${abbr.toLowerCase()} ${full.toLowerCase()}`
 }));

 const topicEntries=[
  {
   type:'topic',
   title:'Networking 1 – Course Outline',
   subtitle:'Official course roadmap, weekly coverage, syllabus outcomes, and practical skills',
   id:'outline',
   hash:'#/outline',
   query:'course outline syllabus roadmap schedule weeks competencies learning outcomes'
  },
  ...topics.map(t=>({
   type:'topic',
   title:`Topic ${String(t.number).padStart(2,'0')}: ${t.title}`,
   subtitle:t.description,
   id:t.id,
   hash:`#/topic/${t.id}/slide/1`,
   query:`topic ${t.number} ${t.title.toLowerCase()} ${t.description.toLowerCase()}`
  }))
 ];

 const slideEntries=[];
 topics.forEach(t=>{
  t.slides.forEach((s,idx)=>{
   slideEntries.push({
    type:'slide',
    title:s.title,
    subtitle:`Topic ${String(t.number).padStart(2,'0')} · Slide ${idx+1}`,
    lead:s.lead||'',
    hash:`#/topic/${t.id}/slide/${idx+1}`,
    query:`${s.title.toLowerCase()} ${s.lead?.toLowerCase()||''} topic ${t.number} ${t.title.toLowerCase()}`
   });
  });
 });

 function search(text){
  const q=text.trim().toLowerCase();
  if(!q)return [...topicEntries];

  const matchedGlossary=glossaryEntries.filter(g=>g.query.includes(q)).slice(0,5);
  const matchedTopics=topicEntries.filter(t=>t.query.includes(q));
  const matchedSlides=slideEntries.filter(s=>s.query.includes(q)).slice(0,10);

  return [...matchedGlossary,...matchedTopics,...matchedSlides];
 }

 function renderList(){
  const listEl=modal.querySelector('.search-results-list');
  if(!listEl)return;

  if(!currentResults.length){
   listEl.innerHTML='<div class="search-empty"><p>No results found. Try searching for "DNS", "Subnet", "OSI", or "Switch".</p></div>';
   return;
  }

  listEl.innerHTML=currentResults.map((item,idx)=>`
   <div class="search-result-item ${idx===activeIndex?'active':''}" data-index="${idx}">
    <span class="search-type-badge badge-${item.type}">${item.type}</span>
    <div class="search-item-info">
     <h4>${esc(item.title)}</h4>
     <p>${esc(item.subtitle)}</p>
     ${item.lead?`<small>${esc(item.lead.slice(0,100))}${item.lead.length>100?'...':''}</small>`:''}
    </div>
    <span class="search-arrow">&rarr;</span>
   </div>
  `).join('');

  listEl.querySelectorAll('.search-result-item').forEach(el=>{
   el.onmouseenter=()=>{
    activeIndex=Number(el.dataset.index);
    updateActiveItem();
   };
   el.onclick=()=>selectItem(Number(el.dataset.index));
  });
 }

 function updateActiveItem(){
  modal.querySelectorAll('.search-result-item').forEach((el,idx)=>{
   el.classList.toggle('active',idx===activeIndex);
  });
  const activeEl=modal.querySelector('.search-result-item.active');
  if(activeEl)activeEl.scrollIntoView({block:'nearest'});
 }

 function selectItem(idx){
  const item=currentResults[idx];
  if(!item)return;
  close();
  if(item.hash){
   location.hash=item.hash;
  }else if(item.type==='glossary'){
   // Find first slide mentioning this acronym
   const target=slideEntries.find(s=>s.query.includes(item.title.toLowerCase()));
   if(target)location.hash=target.hash;
  }
 }

 function open(){
  isOpen=true;
  if(!modal){
   modal=document.createElement('div');
   modal.className='search-modal-overlay';
   modal.setAttribute('role','dialog');
   modal.setAttribute('aria-label','Search Curriculum');
   modal.setAttribute('aria-modal','true');
   root.appendChild(modal);
  }

  modal.innerHTML=`
   <div class="search-modal-container">
    <div class="search-input-wrapper">
     <span class="search-icon">&#128269;</span>
     <input type="text" class="search-input" placeholder="Search 14 topics, 214 slides, or acronyms (e.g., DNS, /26, OSI, Firewall)..." aria-label="Search curriculum">
     <button type="button" class="search-close-btn" aria-label="Close search (Esc)">&times;</button>
    </div>
    <div class="search-results-list"></div>
    <div class="search-modal-footer">
     <span><kbd>&uarr;</kbd> <kbd>&darr;</kbd> Navigate</span>
     <span><kbd>&crarr;</kbd> Select</span>
     <span><kbd>Esc</kbd> Close</span>
    </div>
   </div>
  `;

  const input=modal.querySelector('.search-input');
  currentResults=topicEntries;
  activeIndex=0;
  renderList();

  input.focus();
  input.oninput=()=>{
   currentResults=search(input.value);
   activeIndex=0;
   renderList();
  };

  input.onkeydown=e=>{
   if(e.key==='ArrowDown'){
    e.preventDefault();
    if(currentResults.length){
     activeIndex=(activeIndex+1)%currentResults.length;
     updateActiveItem();
    }
   }else if(e.key==='ArrowUp'){
    e.preventDefault();
    if(currentResults.length){
     activeIndex=(activeIndex-1+currentResults.length)%currentResults.length;
     updateActiveItem();
    }
   }else if(e.key==='Enter'){
    e.preventDefault();
    selectItem(activeIndex);
   }else if(e.key==='Escape'){
    e.preventDefault();
    close();
   }
  };

  modal.querySelector('.search-close-btn').onclick=close;
  modal.onclick=e=>{if(e.target===modal)close();};
 }

 function close(){
  isOpen=false;
  if(modal){
   modal.remove();
   modal=null;
  }
 }

 function toggle(){
  if(isOpen)close();
  else open();
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

