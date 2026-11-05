const key='networking1-v1';
export function loadProgress(){try{const x=JSON.parse(localStorage.getItem(key));if(!x||x.version!==1||!x.topics||typeof x.topics!=='object'||Array.isArray(x.topics))return {version:1,topics:{}};x.topics=Object.fromEntries(Object.entries(x.topics).filter(([,v])=>v&&typeof v==='object'&&!Array.isArray(v)).map(([k,v])=>[k,{...v,slide:Number.isInteger(v.slide)&&v.slide>=0?v.slide:0}]));return x;}catch{return {version:1,topics:{}};}}
export function saveProgress(p){try{localStorage.setItem(key,JSON.stringify(p));return true;}catch{return false;}}
// Retired assessment records stay intact. Only presentation positions are reset.
export function resetProgress(){const state=loadProgress();delete state.lastTopic;for(const record of Object.values(state.topics))record.slide=0;saveProgress(state);return state;}
