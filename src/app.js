import {mountPenTool} from './components/penTool.js';
import {createSlideGrid} from './components/slideGrid.js';
import {createSearchModal} from './components/searchModal.js';
import {createConfirmModal} from './components/confirmModal.js';
import {createIcons,Network,Globe,Workflow,Router,Layers,Cable,PlugZap,Binary,Split,MonitorCog,RefreshCw,RotateCcw,Wifi,FolderOpen,Stethoscope,Shield,ArrowUpRight,ArrowLeft,ArrowRight,BookOpen,LayoutGrid,Search,Moon,Sun,Maximize2,Check,HelpCircle} from 'lucide';
import {topics} from './topics/topicRegistry.js';
import {esc,formatItemText,button,networkSVG,wire} from './components/ui.js';
import {titleVisual} from './components/titleVisual.js';
import {automaticExample} from './simulations/automaticExamples.js';
import {parseRoute,shouldHandleKey} from './router.js';
import {loadProgress,saveProgress,resetProgress} from './utils/progress.js';
import {simulations} from './simulations/index.js';
import {fitSlide,frameWidth} from './components/fitSlide.js';
import {connectorOrientationSVG,rj45PlugColorSVG,straightVsCrossoverVisualSVG,modularConnectorsVisual} from './components/cableVisuals.js';
import {renderDeviceSlideVisual, deviceMetadata} from './components/deviceIllustrations.js';
import {renderHorizontalToolsSlide, toolsMetadata} from './components/toolsVisuals.js';
import {performanceExamplesVisual} from './components/performanceVisual.js';
import {encapsulationExampleVisual} from './components/encapsulationVisual.js';
import {osiLayerDetailVisual, osiUpperLayersVisual, osiLowerLayersVisual} from './components/osiLayerVisual.js';
import {physicalVisualPanels} from './components/physicalVisuals.js';
import {renderCourseOutline} from './components/courseOutline.js';
import {preloadImages,topicImageUrls} from './utils/preloadImages.js';
import {createProjectorSync} from './components/projectorSync.js';

const osiLayerPanels = {
  osiUpperLayers: osiUpperLayersVisual,
  osiLowerLayers: osiLowerLayersVisual,
  ...Object.fromEntries([7, 6, 5, 4, 3, 2, 1].map(n => [`osiLayer${n}`, () => osiLayerDetailVisual(n)]))
};
const visualPanels={performanceMeasures:performanceExamplesVisual,encapsulationExample:encapsulationExampleVisual,modularConnectors:modularConnectorsVisual,...physicalVisualPanels,...osiLayerPanels};

const icons={Network,Globe,Workflow,Router,Layers,Cable,PlugZap,Binary,Split,MonitorCog,RefreshCw,RotateCcw,Wifi,FolderOpen,Stethoscope,Shield,ArrowUpRight,ArrowLeft,ArrowRight,BookOpen,LayoutGrid,Search,Moon,Sun,Maximize2,Check,HelpCircle};
const icon=n=>`<i data-lucide="${n.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase()}" aria-hidden="true"></i>`;

export function startApp(root){
 const inkBySlide=new Map();let releaseInk=()=>{};
 let progress=loadProgress(),route,releaseSlide=()=>{},releaseSimulation=()=>{},storageWarning=false,fullscreenError='';
 const persist=()=>{storageWarning=!saveProgress(progress);};
 const goto=index=>{
  if(route.kind==='topic'){
   if(index<0){
    const currentTopicIndex=topics.findIndex(item=>item.id===route.topic.id);
    const prevTopic=topics[currentTopicIndex-1];
    if(prevTopic)location.hash=`/topic/${prevTopic.id}/slide/${prevTopic.slides.length}`;
    return;
   }
   if(index>=route.topic.slides.length){
    const currentTopicIndex=topics.findIndex(item=>item.id===route.topic.id);
    const nextTopic=topics[currentTopicIndex+1];
    if(nextTopic)location.hash=`/topic/${nextTopic.id}/slide/1`;
    return;
   }
   location.hash=`/topic/${route.topic.id}/slide/${Math.max(1,Math.min(route.topic.slides.length,index+1))}`;
  }
 };

 let isDark=localStorage.getItem('networking1-theme')==='dark';
 if(isDark)document.documentElement.classList.add('dark');
 const slideGrid=createSlideGrid(root,goto);
 const searchModal=createSearchModal(root,topics,hash=>{location.hash=hash;});
 const confirmModal=createConfirmModal(root);
 const projector=createProjectorSync(root,{
  onRemoteNavigate:hash=>{if(location.hash!==hash)location.hash=hash;},
  onRemoteTheme:nextDark=>{
   if(isDark===nextDark)return;
   isDark=nextDark;
   document.documentElement.classList.toggle('dark',isDark);
   localStorage.setItem('networking1-theme',isDark?'dark':'light');
   const btn=root.querySelector('#btn-theme-toggle');
   if(btn){btn.innerHTML=icon(isDark?'Sun':'Moon');createIcons({icons,nameAttr:'data-lucide',attrs:{'stroke-width':1.7}});}
  },
  onStateChange:()=>updateFullscreenButton()
 });
 function updateFullscreenButton(){
  const btn=root.querySelector('#btn-fullscreen');
  if(!btn)return;
  const active=projector.isActive()||Boolean(document.fullscreenElement);
  btn.classList.toggle('extend-active',projector.isActive());
  btn.setAttribute('aria-pressed',String(active));
  btn.title=projector.isActive()?'Stop Projecting / Exit Fullscreen (F)':'Full Screen & Extend to Projector (F)';
 }
 function toggleTheme(){
  isDark=document.documentElement.classList.toggle('dark');
  localStorage.setItem('networking1-theme',isDark?'dark':'light');
  const btn=root.querySelector('#btn-theme-toggle');
  if(btn){btn.innerHTML=icon(isDark?'Sun':'Moon');createIcons({icons,nameAttr:'data-lucide',attrs:{'stroke-width':1.7}});}
  projector.notifyThemeChange(isDark);
 }

 function fullscreenFailure(){fullscreenError='Fullscreen was blocked by the browser. Press F to try again.';const status=root.querySelector('#fullscreen-status');if(status)status.textContent=fullscreenError;}
 function enterFullscreen(){fullscreenError='';try{if(!document.fullscreenElement){if(!document.documentElement.requestFullscreen){fullscreenFailure();return;}Promise.resolve(document.documentElement.requestFullscreen()).catch(fullscreenFailure);}}catch{fullscreenFailure();}}
 async function fullscreen(){
  if(projector.isProjector){
   if(document.fullscreenElement){try{await document.exitFullscreen();}catch{fullscreenFailure();}}
   else enterFullscreen();
   return;
  }
  if(projector.isActive()||document.fullscreenElement){
   if(projector.isActive())projector.toggleExtendDisplay();
   if(document.fullscreenElement){try{await document.exitFullscreen();}catch{fullscreenFailure();}}
   updateFullscreenButton();
   return;
  }
  const opened=projector.toggleExtendDisplay();
  if(!opened)enterFullscreen();
  updateFullscreenButton();
 }
 function launchTopic(event){const link=event.target.closest?.('a[href^="#/topic/"]');if(!link||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;enterFullscreen();}
 function warmTopic(event){
  const link=event.target.closest?.('a[href^="#/topic/"]');
  if(!link)return;
  const match=link.getAttribute('href')?.match(/^#\/topic\/([^/]+)/);
  const target=match&&topics.find(item=>item.id===match[1]);
  if(target)preloadImages(topicImageUrls(target));
 }

 function render(){
  confirmModal.close();
  releaseInk();releaseInk=()=>{};releaseSimulation();releaseSimulation=()=>{};releaseSlide();
  const previous=route;route=parseRoute(location.hash,topics,progress);
  if(previous?.kind==='topic'&&route.kind!=='topic'&&document.fullscreenElement)Promise.resolve(document.exitFullscreen()).catch(()=>{});
  document.body.classList.toggle('presentation-mode',route.kind==='topic');

  const themeIcon=isDark?'Sun':'Moon';
  const extendActive=projector.isActive();
  const headerRight=route.kind==='dashboard'
   ?`<a class="button quiet" href="#/outline" title="View Course Outline">${icon('BookOpen')}<span class="outline-nav-text"> Course Outline</span></a><button type="button" class="button quiet" id="btn-search" title="Search curriculum (Ctrl+K)">${icon('Search')}</button><button type="button" class="button quiet" id="btn-theme-toggle" title="Toggle dark/light mode">${icon(themeIcon)}</button><button type="button" class="button quiet" id="btn-reset" data-action="reset" title="Reset saved slide positions" aria-label="Reset positions">${icon('RotateCcw')}</button>`
   :route.kind==='outline'
   ?`<button type="button" class="button quiet" id="btn-search" title="Search curriculum (Ctrl+K)">${icon('Search')}</button><button type="button" class="button quiet" id="btn-theme-toggle" title="Toggle dark/light mode">${icon(themeIcon)}</button><a class="button quiet" href="#/">${icon('LayoutGrid')}<span class="back-text"> Back to Topics</span></a>`
   :route.kind==='topic'
   ?`<button type="button" class="button quiet ${extendActive?'extend-active':''}" id="btn-fullscreen" aria-pressed="${extendActive}" title="${extendActive?'Stop Projecting / Exit Fullscreen (F)':'Full Screen & Extend to Projector (F)'}">${icon('Maximize2')}</button><button type="button" class="button quiet" id="btn-search" title="Search curriculum (Ctrl+K)">${icon('Search')}</button><button type="button" class="button quiet" id="btn-theme-toggle" title="Toggle dark/light mode">${icon(themeIcon)}</button><a class="button quiet" href="#/">${icon('LayoutGrid')}<span class="back-text"> Back to Topics</span></a>`
   :`<a class="button quiet" href="#/">${icon('LayoutGrid')}<span class="back-text"> Back to Topics</span></a>`;

  root.innerHTML=`<header class="app-header"><a class="brand" href="#/">${icon('Network')}<span>NETWORKING <b>1</b></span></a><div class="header-right">${headerRight}</div></header>${storageWarning?'<p role="status" class="storage-warning">Browser storage is unavailable; slide positions will last only for this session.</p>':''}<main id="main" tabindex="-1"></main><footer class="site-footer"><span>Networking 1 · Learn it. Model it. Explain it.</span><span>Competency-inspired learning · Not an accredited certification course</span></footer>`;

  if(route.kind==='dashboard')dashboard();
  else if(route.kind==='outline')renderCourseOutline(root.querySelector('main'),topics);
  else if(route.kind==='topic')presentation();
  else root.querySelector('main').innerHTML=`<div class="empty"><h1>Topic not found</h1><p>This link does not identify a registered presentation.</p><a class="button primary" href="#/">Return to all ${topics.length} topics</a></div>`;

  const btnTheme=root.querySelector('#btn-theme-toggle');if(btnTheme)btnTheme.onclick=toggleTheme;
  const btnSearch=root.querySelector('#btn-search');if(btnSearch)btnSearch.onclick=()=>searchModal.toggle();
  const btnFullscreen=root.querySelector('#btn-fullscreen');if(btnFullscreen)btnFullscreen.onclick=fullscreen;

  const shell={querySelectorAll:selector=>[...root.querySelectorAll(selector)].filter(el=>!el.closest('#slide-content'))};
  wire(shell,{
   reset:()=>{if(window.confirm('Reset saved presentation slide positions? Archived results and other saved data will be retained.')){progress=resetProgress();render();}},
   prev:()=>{
    if(route.kind==='topic'&&route.index===0){
     const prevTopic=topics[topics.findIndex(item=>item.id===route.topic.id)-1];
     if(prevTopic){
      confirmModal.open({
       eyebrow:'PREVIOUS TOPIC',
       title:`Go back to Topic ${String(prevTopic.number).padStart(2,'0')}?`,
       message:`${prevTopic.title} (Slide ${prevTopic.slides.length} of ${prevTopic.slides.length})`,
       confirmLabel:'Go to Previous Topic',
       onConfirm:()=>goto(-1)
      });
     }
     return;
    }
    goto(route.index-1);
   },
   next:()=>goto(route.index+1)
  });
  createIcons({icons,nameAttr:'data-lucide',attrs:{'stroke-width':1.7}});

  if(route.kind==='topic'){
   releaseSlide=fitSlide(root.querySelector('.slide-stage'));
   const inkKey=route.topic.id+':'+route.index;
   if(!inkBySlide.has(inkKey))inkBySlide.set(inkKey,{strokes:[],undo:[],color:'#dc2626',width:5});
   releaseInk=mountPenTool(root.querySelector('.slide-stage'),root.querySelector('.header-right'),inkBySlide.get(inkKey),svgHtml=>projector.syncInk(svgHtml));

   const btnGrid=root.querySelector('#btn-slide-grid');
   if(btnGrid)btnGrid.onclick=()=>slideGrid.toggle(route.topic,route.index);
  }
  projector.notifyRouteChange();
 }

 function dashboard(){
  const last=topics.find(t=>t.id===progress.lastTopic);
  root.querySelector('main').innerHTML=`<section class="dashboard-intro"><div><div class="eyebrow">COMPUTER SYSTEMS · FOUNDATIONS</div><h1>Make connections.<br><span>Understand the network.</span></h1><p>Interactive Networking Learning and Laboratory.<br>${topics.length} interactive presentations, from your first connection to confident troubleshooting.</p><div class="intro-actions">${last?`<a class="button primary" href="#/topic/${last.id}">${icon('BookOpen')} Continue Topic ${String(last.number).padStart(2,'0')}</a>`:`<a class="button primary" href="#/topic/01-introduction-to-networking/slide/1">Start with the fundamentals ${icon('ArrowRight')}</a>`}<span>${topics.length} independently accessible topics</span></div></div><div class="hero-network">${networkSVG(['Learn','Connect','Explain'],1)}<span class="diagram-caption">CONCEPT → CONNECTION → UNDERSTANDING</span></div></section><section aria-labelledby="curriculum-heading"><div class="section-heading"><div><h2 id="curriculum-heading">Explore the curriculum</h2></div><p>Choose a topic to explore.</p></div><div class="topic-grid">${topics.map((t,i)=>{const p=progress.topics[t.id]||{},position=Math.min(t.slides.length-1,Number.isInteger(p.slide)?p.slide:0);return `<a class="topic-card" href="${position>0?`#/topic/${t.id}`:`#/topic/${t.id}/slide/1`}"><div class="card-top"><span class="topic-icon group-${Math.floor(i/4)}">${icon(t.icon)}</span><span class="topic-number">TOPIC ${String(t.number).padStart(2,'0')}</span></div><h3>${t.title}</h3><p>${t.description}</p><div class="card-bottom"><span>${t.slides.length} slides</span>${position>0?`<span class="card-resume">Resume slide ${position+1} ${icon('ArrowRight')}</span>`:icon('ArrowUpRight')}</div><div class="card-progress" aria-label="Last viewed slide ${position+1} of ${t.slides.length}"><span style="width:${position/(t.slides.length-1)*100}%"></span></div></a>`;}).join('')}</div></section>`;
 }

 function presentation(){
  const {topic:t,index}=route,s=t.slides[index];progress.lastTopic=t.id;const p=progress.topics[t.id]||={};p.slide=index;persist();const total=t.slides.length;
  const nextLabel='Next Slide ';
  const currentTopicIndex=topics.findIndex(item=>item.id===t.id);
  const prevTopic=topics[currentTopicIndex-1];
  const nextTopic=topics[currentTopicIndex+1];
  const prevLabel=index===0&&prevTopic?' Previous topic':' Previous';
  const lastAction=nextTopic
   ?`<a class="button primary" href="#/topic/${nextTopic.id}/slide/1">Next Topic ${icon('ArrowRight')}</a>`
   :`<a class="button primary" href="#/">Back to Topics ${icon('LayoutGrid')}</a>`;
  root.querySelector('main').innerHTML=`<div class="slide-stage"><article class="slide slide-${s.kind}"><div class="slide-kicker"><span>NETWORKING 1 / ${String(t.number).padStart(2,'0')}</span><span>${String(index+1).padStart(2,'0')} / ${total}</span></div><div class="slide-body"><h2>${esc(s.title)}</h2>${s.lead?`<p class="slide-lead">${esc(s.lead)}</p>`:''}<div id="slide-content" class="${s.type||s.kind==='example'?'simulation-container':''}"></div></div></article></div><div class="slide-navigation"><div><button type="button" class="button quiet" id="btn-slide-grid" title="Slide Grid (G)">${icon('LayoutGrid')} Grid</button><span class="slide-count">${index+1} of ${total}</span></div><div>${button(icon('ArrowLeft')+prevLabel,'prev')}${index<total-1?button(nextLabel+icon('ArrowRight'),'next','primary'):lastAction}</div></div><div class="lesson-progress"><span style="width:${(index+1)/total*100}%"></span></div><p id="fullscreen-status" role="status">${esc(fullscreenError)}</p>`;
  root.querySelector('[data-action="prev"]').disabled=index===0&&!prevTopic;
  const nextTopicLink=index===total-1&&nextTopic?root.querySelector('.slide-navigation a[href^="#/topic/"]'):null;
  if(nextTopicLink){
   nextTopicLink.onclick=event=>{
    event.preventDefault();
    confirmModal.open({
     eyebrow:'NEXT TOPIC',
     title:`Continue to Topic ${String(nextTopic.number).padStart(2,'0')}?`,
     message:`${nextTopic.title} (Slide 1 of ${nextTopic.slides.length})`,
     confirmLabel:'Go to Next Topic',
     onConfirm:()=>goto(total)
    });
   };
  }
  const content=root.querySelector('#slide-content');
  const stageWidth=root.querySelector('.slide-stage')?.clientWidth||window.innerWidth;
  if(stageWidth>=768)root.querySelector('.slide-body').style.width=`${frameWidth(stageWidth)}px`;
  if(s.kind==='title')content.innerHTML=titleVisual(t);
  else if(s.kind==='example')releaseSimulation=automaticExample(content,s,t.id);
  else if(s.type){const dispose=simulations[s.type](content,s);if(typeof dispose==='function')releaseSimulation=dispose;}
  else if(s.deviceKey && deviceMetadata[s.deviceKey]){
   const meta=deviceMetadata[s.deviceKey];
   const roleHtml=`<div class="device-role-card"><h4 class="role-title">${esc(meta.name)}</h4><p class="role-desc">${esc(meta.desc)}</p></div>`;
   const hasParagraphs=Array.isArray(s.paragraphs)&&s.paragraphs.length>0;
   const listHtml=hasParagraphs
    ?`<div class="slide-prose">${s.paragraphs.map(p=>`<p>${formatItemText(p)}</p>`).join('')}</div>`
    :`<ul class="teaching-points">${(s.items||[]).map((item,i)=>`<li><span class="point-index">${esc(s.itemLabels?.[i]??String(i+1).padStart(2,'0'))}</span><p>${formatItemText(item)}</p></li>`).join('')}</ul>`;
   content.innerHTML=`<div class="device-slide-grid"><div class="device-visuals-col">${renderDeviceSlideVisual(s.deviceKey)}</div><div class="device-content-col">${roleHtml}${listHtml}</div></div>`;
  }
  else if(s.toolKey && toolsMetadata[s.toolKey]){
   content.innerHTML=renderHorizontalToolsSlide(s.toolKey);
  }
  else {
   let extraVisual='';
   if(t.id==='06-network-cables-media'||t.id==='07-rj45-crimping'){
    const titleLower=s.title.toLowerCase();
    if(titleLower.includes('orientation')||s.title==='RJ45 Plugs and Keystone Jacks')extraVisual=connectorOrientationSVG();
    else if(s.title.startsWith('T568A:'))extraVisual=rj45PlugColorSVG('A');
    else if(s.title.startsWith('T568B:'))extraVisual=rj45PlugColorSVG('B');
    else if(titleLower.includes('straight-through'))extraVisual=straightVsCrossoverVisualSVG();
   }
   const visualPanel = visualPanels[s.visualKey]?.() || '';
   const hasParagraphs = Array.isArray(s.paragraphs) && s.paragraphs.length > 0;
   const isGrid = !extraVisual && !hasParagraphs && (s.expectedCount >= 4 || s.items?.length >= 4 || (s.kind === 'concept' && s.expectedCount === 2) || Boolean(visualPanels[s.visualKey]));
   const gridClass = !extraVisual && (s.expectedCount >= 7 || s.items?.length >= 7) ? 'counted-grid-3' : (isGrid ? 'counted-grid' : '');
   const stackedClass = s.stackedDescriptions ? 'stacked-items' : '';
   const itemsHtml=hasParagraphs
    ?`<div class="slide-prose">${s.paragraphs.map(p=>`<p>${formatItemText(p)}</p>`).join('')}</div>`
    :`<${s.kind==='objectives'?'ol':'ul'} class="teaching-points ${[gridClass,stackedClass].filter(Boolean).join(' ')}"${s.expectedCount?` data-item-count="${s.expectedCount}"`: ''}>${(s.items||[]).map((item,i)=>`<li><span class="point-index">${esc(s.itemLabels?.[i]??String(i+1).padStart(2,'0'))}</span><p>${formatItemText(item,Boolean(s.stackedDescriptions))}</p></li>`).join('')}</${s.kind==='objectives'?'ol':'ul'}>`;
   const listHtml=`${itemsHtml}${visualPanel}`;
   content.innerHTML=extraVisual
    ?`<div class="rj45-slide-grid">${extraVisual}<div class="rj45-slide-content">${listHtml}</div></div>`
    :(s.visualLayout==='split'&&visualPanel)
     ?`<div class="physical-split-grid"><div class="physical-split-text">${itemsHtml}</div><div class="physical-split-visual">${visualPanel}</div></div>`
     :listHtml;
  }
  preloadImages(topicImageUrls(t,index+1));
 }

 const onKey=e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){
   e.preventDefault();searchModal.toggle();return;
  }
  if(e.key==='Escape'){
   if(confirmModal.isOpen()){confirmModal.close();return;}
   if(searchModal.isOpen()){searchModal.close();return;}
   if(slideGrid.isOpen()){slideGrid.close();return;}
  }
  if(confirmModal.isOpen()||route.kind!=='topic'||!shouldHandleKey(e))return;
  if(e.key==='g'||e.key==='G'){
   e.preventDefault();
   slideGrid.toggle(route.topic,route.index);
   return;
  }
  if(['ArrowRight',' ','ArrowLeft','Home','End','f','F'].includes(e.key)){
   e.preventDefault();
   if(e.key==='ArrowRight'||e.key===' ')goto(route.index+1);
   else if(e.key==='ArrowLeft')goto(route.index-1);
   else if(e.key==='Home')goto(0);
   else if(e.key==='End')goto(route.topic.slides.length-1);
   else fullscreen();
  }
 };

 const skipLink=document.querySelector('.skip');
 const onSkip=e=>{e.preventDefault();const main=root.querySelector('#main');if(main){main.focus();main.scrollIntoView({behavior:'smooth'});}};
 if(skipLink)skipLink.addEventListener('click',onSkip);

 root.addEventListener('click',launchTopic);root.addEventListener('pointerover',warmTopic);root.addEventListener('focusin',warmTopic);window.addEventListener('hashchange',render);window.addEventListener('keydown',onKey);render();
 return ()=>{
  if(skipLink)skipLink.removeEventListener('click',onSkip);
  root.removeEventListener('click',launchTopic);
  root.removeEventListener('pointerover',warmTopic);
  root.removeEventListener('focusin',warmTopic);
  releaseInk();releaseSimulation();releaseSlide();
  slideGrid.destroy();searchModal.destroy();confirmModal.destroy();projector.destroy();
  document.body.classList.remove('presentation-mode');
  window.removeEventListener('hashchange',render);window.removeEventListener('keydown',onKey);
 };
}
