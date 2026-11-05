export function parseRoute(hash,topics,progress={topics:{}}){
 const parts=hash.replace(/^#\/?/,'').split('/').filter(Boolean);
 if(!parts.length)return {kind:'dashboard'};
 const topic=topics.find(t=>t.id===parts[1]);
 if(parts[0]!=='topic'||!topic||parts.length>4||(parts.length>2&&(parts[2]!=='slide'||!/^\d+$/.test(parts[3]||''))))return {kind:'notfound'};
 const saved=progress.topics[topic.id]?.slide;
 const index=parts[2]==='slide'?Number(parts[3])-1:Number.isInteger(saved)?saved:0;
 return {kind:'topic',topic,index:Math.min(topic.slides.length-1,Math.max(0,index))};
}
export function shouldHandleKey(event){return !event.altKey&&!event.ctrlKey&&!event.metaKey&&!event.target?.closest?.('input,select,textarea,button,a,summary,[contenteditable="true"],[role="slider"]');}
