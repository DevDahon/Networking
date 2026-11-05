import {mountPenTool} from './components/penTool.js';
import {createIcons,Network,Globe,Workflow,Router,Layers,Cable,PlugZap,Binary,Split,MonitorCog,RefreshCw,Wifi,FolderOpen,Stethoscope,ArrowUpRight,ArrowLeft,ArrowRight,BookOpen,LayoutGrid} from 'lucide';
import {topics} from './topics/topicRegistry.js';
import {esc,button,networkSVG,wire} from './components/ui.js';
import {titleVisual} from './components/titleVisual.js';
import {automaticExample} from './simulations/automaticExamples.js';
import {parseRoute,shouldHandleKey} from './router.js';
import {loadProgress,saveProgress,resetProgress} from './utils/progress.js';
import {simulations} from './simulations/index.js';
import {fitSlide} from './components/fitSlide.js';
const icons={Network,Globe,Workflow,Router,Layers,Cable,PlugZap,Binary,Split,MonitorCog,RefreshCw,Wifi,FolderOpen,Stethoscope,ArrowUpRight,ArrowLeft,ArrowRight,BookOpen,LayoutGrid};
const icon=n=>`<i data-lucide="${n.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase()}" aria-hidden="true"></i>`;
export function startApp(root){
 const inkBySlide=new Map();let releaseInk=()=>{};
 let progress=loadProgress(),route,releaseSlide=()=>{},releaseSimulation=()=>{},storageWarning=false,fullscreenError='';
 const persist=()=>{storageWarning=!saveProgress(progress);};
 const goto=index=>{if(route.kind==='topic')location.hash=`/topic/${route.topic.id}/slide/${Math.max(1,Math.min(route.topic.slides.length,index+1))}`;};
 function fullscreenFailure(){fullscreenError='Fullscreen was blocked by the browser. Press F to try again.';const status=root.querySelector('#fullscreen-status');if(status)status.textContent=fullscreenError;}
 function enterFullscreen(){fullscreenError='';try{if(!document.fullscreenElement){if(!document.documentElement.requestFullscreen){fullscreenFailure();return;}Promise.resolve(document.documentElement.requestFullscreen()).catch(fullscreenFailure);}}catch{fullscreenFailure();}}
 async function fullscreen(){if(document.fullscreenElement){try{await document.exitFullscreen();}catch{fullscreenFailure();}}else enterFullscreen();}
 function launchTopic(event){const link=event.target.closest?.('a[href^="#/topic/"]');if(!link||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;enterFullscreen();}
 function render(){
  releaseInk();releaseInk=()=>{};releaseSimulation();releaseSimulation=()=>{};releaseSlide();
  const previous=route;route=parseRoute(location.hash,topics,progress);
  if(previous?.kind==='topic'&&route.kind!=='topic'&&document.fullscreenElement)Promise.resolve(document.exitFullscreen()).catch(()=>{});
  document.body.classList.toggle('presentation-mode',route.kind==='topic');
  root.innerHTML=`<header class="app-header"><a class="brand" href="#/">${icon('Network')}<span>NETWORKING <b>1</b></span></a><div class="header-right">${route.kind==='dashboard'?button('Reset positions','reset','quiet'):`<a class="button quiet" href="#/">${icon('LayoutGrid')} Back to Topics</a>`}</div></header>${storageWarning?'<p role="status" class="storage-warning">Browser storage is unavailable; slide positions will last only for this session.</p>':''}<main id="main" tabindex="-1"></main><footer class="site-footer"><span>Networking 1 · Learn it. Model it. Explain it.</span><span>Competency-inspired learning · Not an accredited certification course</span></footer>`;
  if(route.kind==='dashboard')dashboard();else if(route.kind==='topic')presentation();else root.querySelector('main').innerHTML=`<div class="empty"><h1>Topic not found</h1><p>This link does not identify a registered presentation.</p><a class="button primary" href="#/">Return to all ${topics.length} topics</a></div>`;
  const shell={querySelectorAll:selector=>[...root.querySelectorAll(selector)].filter(el=>!el.closest('#slide-content'))};
  wire(shell,{reset:()=>{if(window.confirm('Reset saved presentation slide positions? Archived results and other saved data will be retained.')){progress=resetProgress();render();}},prev:()=>goto(route.index-1),next:()=>goto(route.index+1)});
  createIcons({icons,nameAttr:'data-lucide',attrs:{'stroke-width':1.7}});
  if(route.kind==='topic'){
   releaseSlide=fitSlide(root.querySelector('.slide-stage'));
   const inkKey=route.topic.id+':'+route.index;
   if(!inkBySlide.has(inkKey))inkBySlide.set(inkKey,{strokes:[],undo:[],color:'#dc2626',width:5});
   releaseInk=mountPenTool(root.querySelector('.slide-stage'),root.querySelector('.header-right'),inkBySlide.get(inkKey));
  }
 }
 function dashboard(){
  const last=topics.find(t=>t.id===progress.lastTopic);
  root.querySelector('main').innerHTML=`<section class="dashboard-intro"><div><div class="eyebrow">COMPUTER SYSTEMS · FOUNDATIONS</div><h1>Make connections.<br><span>Understand the network.</span></h1><p>Interactive Networking Learning and Laboratory.<br>${topics.length} interactive presentations, from your first connection to confident troubleshooting.</p><div class="intro-actions">${last?`<a class="button primary" href="#/topic/${last.id}">${icon('BookOpen')} Continue Topic ${String(last.number).padStart(2,'0')}</a>`:`<a class="button primary" href="#/topic/01-introduction-to-networking/slide/1">Start with the fundamentals ${icon('ArrowRight')}</a>`}<span>${topics.length} independently accessible topics</span></div></div><div class="hero-network">${networkSVG(['Learn','Connect','Explain'],1)}<span class="diagram-caption">CONCEPT → CONNECTION → UNDERSTANDING</span></div></section><section aria-labelledby="curriculum-heading"><div class="section-heading"><div><span class="eyebrow">CLASSROOM PRESENTATIONS</span><h2 id="curriculum-heading">Explore the curriculum</h2></div><p>Choose a topic to explore.</p></div><div class="topic-grid">${topics.map((t,i)=>{const p=progress.topics[t.id]||{},position=Math.min(t.slides.length-1,Number.isInteger(p.slide)?p.slide:0);return `<a class="topic-card" href="#/topic/${t.id}/slide/1"><div class="card-top"><span class="topic-icon group-${Math.floor(i/4)}">${icon(t.icon)}</span><span class="topic-number">TOPIC ${String(t.number).padStart(2,'0')}</span></div><h3>${t.title}</h3><p>${t.description}</p><div class="card-bottom"><span>${t.slides.length} slides</span>${icon('ArrowUpRight')}</div><div class="card-progress" aria-label="Last viewed slide ${position+1} of ${t.slides.length}"><span style="width:${position/(t.slides.length-1)*100}%"></span></div></a>`;}).join('')}</div></section>`;
 }
 function presentation(){
  const {topic:t,index}=route,s=t.slides[index];progress.lastTopic=t.id;const p=progress.topics[t.id]||={};p.slide=index;persist();const total=t.slides.length;
  root.querySelector('main').innerHTML=`<div class="slide-stage"><article class="slide slide-${s.kind}"><div class="slide-kicker"><span>NETWORKING 1 / ${String(t.number).padStart(2,'0')}</span><span>${String(index+1).padStart(2,'0')} / ${total}</span></div><div class="slide-body"><h2>${esc(s.title)}</h2>${s.lead?`<p class="slide-lead">${esc(s.lead)}</p>`:''}<div id="slide-content" class="${s.type?'simulation-container':''}"></div></div></article></div><div class="slide-navigation"><div>${button(icon('ArrowLeft')+' Previous','prev')}<label class="slide-jump">Slide <select aria-label="Go to slide">${t.slides.map((s,i)=>`<option value="${i}" ${i===index?'selected':''}>${i+1} · ${esc(s.title)}</option>`).join('')}</select></label><span class="slide-count">${index+1} of ${total}</span></div><div>${index<total-1?button('Next slide '+icon('ArrowRight'),'next','primary'):`<a class="button primary" href="#/">Back to Topics ${icon('LayoutGrid')}</a>`}</div></div><div class="lesson-progress"><span style="width:${(index+1)/total*100}%"></span></div><p id="fullscreen-status" role="status">${esc(fullscreenError)}</p>`;
  root.querySelector('[data-action="prev"]').disabled=index===0;root.querySelector('.slide-jump select').onchange=e=>goto(+e.target.value);
  const content=root.querySelector('#slide-content');
  // Simulations measure their longest state before the outer fit is installed.
  // Use the same logical width for that measurement and for presentation fitting.
  root.querySelector('.slide-body').style.width='1280px';
  if(s.kind==='title')content.innerHTML=titleVisual(t);
  else if(s.kind==='example')releaseSimulation=automaticExample(content,s,t.id);
  else if(s.type){const dispose=simulations[s.type](content,s);if(typeof dispose==='function')releaseSimulation=dispose;}
  else content.innerHTML=`<${s.kind==='objectives'?'ol':'ul'} class="teaching-points ${s.expectedCount>4?'counted-grid':''}"${s.expectedCount?` data-item-count="${s.expectedCount}"`: ''}>${s.items.map((item,i)=>`<li><span class="point-index">${esc(s.itemLabels?.[i]??String(i+1).padStart(2,'0'))}</span><p>${esc(item)}</p></li>`).join('')}</${s.kind==='objectives'?'ol':'ul'}>${s.footnote?`<p class="list-explanation">${esc(s.footnote)}</p>`:''}`;
 }
 const onKey=e=>{if(route.kind!=='topic'||!shouldHandleKey(e))return;if(['ArrowRight',' ','ArrowLeft','Home','End','f','F'].includes(e.key)){e.preventDefault();if(e.key==='ArrowRight'||e.key===' ')goto(route.index+1);else if(e.key==='ArrowLeft')goto(route.index-1);else if(e.key==='Home')goto(0);else if(e.key==='End')goto(route.topic.slides.length-1);else fullscreen();}};
 root.addEventListener('click',launchTopic);window.addEventListener('hashchange',render);window.addEventListener('keydown',onKey);render();
 return ()=>{root.removeEventListener('click',launchTopic);releaseInk();releaseSimulation();releaseSlide();document.body.classList.remove('presentation-mode');window.removeEventListener('hashchange',render);window.removeEventListener('keydown',onKey);};
}
