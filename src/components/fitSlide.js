// The card always fills the same stage. Only its inner teaching canvas scales
// when content or viewport dimensions change.
export function slideScale(width,height,contentWidth,contentHeight){
  if(width<=0||height<=0||contentWidth<=0||contentHeight<=0)return 1;
  return Math.min(width/contentWidth,height/contentHeight);
}
export function frameWidth(width){
  return width>1280?Math.round(width):1280;
}
export function fitSlide(stage){
  const slide=stage.querySelector('.slide');
 const body=slide.querySelector('.slide-body');
 const frame=document.createElement('div');
 frame.className='slide-body-frame';
 body.before(frame);frame.append(body);
  const isTitleSlide=slide.classList.contains('slide-title');
  let disposed=false,maxHeight=0;
  function fit(reset=false){
    if(disposed||!frame.clientWidth||!frame.clientHeight)return;
    if(frame.clientWidth<768){
      if(body.style.width)body.style.width='';
      if(body.style.left)body.style.left='';
      if(body.style.top)body.style.top='';
      if(body.style.transform)body.style.transform='';
      return;
    }
    const width=frameWidth(frame.clientWidth);
    body.style.width=`${width}px`;
    const measured=Math.max(body.offsetHeight,body.scrollHeight+2);
    maxHeight=reset?measured:Math.max(maxHeight,measured);
    const height=maxHeight;
    const scale=slideScale(frame.clientWidth,frame.clientHeight,width,height);
    const slack=Math.max(0,frame.clientHeight-height*scale);
    const nextTop=isTitleSlide&&slack>24?`${Math.round(slack*0.35)}px`:'0px';
    const nextLeft=isTitleSlide?'50%':'0px';
    const transform=isTitleSlide?`translateX(-50%) scale(${scale})`:`scale(${scale})`;
    if(body.style.left!==nextLeft)body.style.left=nextLeft;
    if(body.style.top!==nextTop)body.style.top=nextTop;
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
