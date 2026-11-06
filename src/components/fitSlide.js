// The card always fills the same stage. Only its inner teaching canvas scales
// when content or viewport dimensions change.
export function slideScale(width,height,contentWidth,contentHeight){
  if(width<=0||height<=0||contentWidth<=0||contentHeight<=0)return 1;
  return Math.min(width/contentWidth,height/contentHeight);
}
export function fitSlide(stage){
  const slide=stage.querySelector('.slide');
 const body=slide.querySelector('.slide-body');
 const frame=document.createElement('div');
 frame.className='slide-body-frame';
 body.before(frame);frame.append(body);
  let disposed=false,maxHeight=0;
  function fit(reset=false){
    if(disposed||!frame.clientWidth||!frame.clientHeight)return;
    if(frame.clientWidth<768){
      if(body.style.width)body.style.width='';
      if(body.style.transform)body.style.transform='';
      return;
    }
    const width=1280;
    body.style.width=`${width}px`;
    const measured=Math.max(body.offsetHeight,body.scrollHeight+2);
    maxHeight=reset?measured:Math.max(maxHeight,measured);
    const height=maxHeight;
    const scale=slideScale(frame.clientWidth,frame.clientHeight,width,height);
    const transform=`translateX(-50%) scale(${scale})`;
    if(body.style.transform!==transform)body.style.transform=transform;
  }
  const refit=()=>fit(true);
  const resize=typeof ResizeObserver==='function'?new ResizeObserver(refit):null;
  resize?.observe(stage);
  const changes=new MutationObserver(records=>{
   if(records.some(record=>{
    if(record.type==='attributes'&&record.target.matches?.('[data-example-packet],[data-network-packet]'))return false;
    return record.target!==body||record.type!=='attributes'||record.attributeName!=='style';
   }))fit();
  });
  changes.observe(body,{childList:true,subtree:true,characterData:true,attributes:true});
  window.addEventListener('resize',refit);
  document.addEventListener('fullscreenchange',refit);
  document.fonts?.ready.then(()=>{if(!disposed)refit();});
  fit();
  return ()=>{disposed=true;resize?.disconnect();changes.disconnect();window.removeEventListener('resize',refit);document.removeEventListener('fullscreenchange',refit);};
}
