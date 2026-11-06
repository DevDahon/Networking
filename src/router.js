const topicAliases={
 '02-network-types-architecture':'01-introduction-to-networking',
 '05-network-communication':'osi-reference-model',
 '07-rj45-crimping':'06-network-cables-media',
 '10-static-ip':'08-ip-addressing'
};

export function parseRoute(hash,topics,progress={topics:{}}){
 const parts=hash.replace(/^#\/?/,'').split('/').filter(Boolean);
 if(!parts.length)return {kind:'dashboard'};
 const resolvedId=topicAliases[parts[1]]||parts[1];
 const topic=topics.find(t=>t.id===resolvedId);
 if(parts[0]!=='topic'||!topic)return {kind:'notfound'};
 if(parts.length>4||(parts.length>2&&(parts[2]!=='slide'||!/^\d+$/.test(parts[3]||''))))return {kind:'notfound'};
 const saved=progress.topics[topic.id]?.slide??progress.topics[parts[1]]?.slide;
 const index=parts[2]==='slide'?Number(parts[3])-1:Number.isInteger(saved)?saved:0;
 return {kind:'topic',topic,index:Math.min(topic.slides.length-1,Math.max(0,index))};
}
export function shouldHandleKey(event){
 if(!event||event.altKey||event.ctrlKey||event.metaKey)return false;
 const target=event.target;
 if(!target?.closest)return true;
 if(target.closest('input,select,textarea,[contenteditable="true"],[role="slider"]'))return false;
 if(target.closest('button,a,summary'))return event.key==='ArrowRight'||event.key==='ArrowLeft';
 return true;
}
