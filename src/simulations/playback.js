import {button,select} from '../components/ui.js';

// One owned timer per automatic demonstration. The application calls dispose
// before replacing a slide, including when restarting its current topic.
export function createPlayback({advance,render}){
 let timer=null,disposed=false;
 const state={running:false,paused:false,speed:1,
  play(){if(disposed)return;state.running=true;state.paused=false;render();schedule();},
  pause(){const active=state.running||state.paused;state.running=false;state.paused=active;cancel();},
  stop(){state.running=false;state.paused=false;cancel();},
  setSpeed(speed){state.speed=Number(speed);if(state.running)schedule();},
  dispose(){disposed=true;state.stop();}
 };
 function cancel(){if(timer!==null){clearTimeout(timer);timer=null;}}
 function schedule(){cancel();if(!state.running||disposed)return;timer=setTimeout(()=>{timer=null;if(advance()===false){state.running=false;state.paused=false;}render();schedule();},2000/state.speed);}
 return state;
}

// A final displayed step is not necessarily a completed demonstration. Manual
// stepping and pausing must leave that step available for Resume.
export function createStepPlayback({length,getIndex,setIndex,render}){
 let completed=false;
 const player=createPlayback({advance:()=>{
  if(getIndex()>=length()-1){completed=true;return false;}
  setIndex(getIndex()+1);return true;
 },render});
 return {
  get running(){return player.running;},get paused(){return player.paused;},get speed(){return player.speed;},
  get completed(){return completed;},
  get status(){return player.running?'Playing':completed?'Complete':'Paused';},
  play(){if(completed){completed=false;setIndex(0);}player.play();},
  pause(){player.pause();},
  replay(){this.stop();player.play();},
  resume(){if(completed){completed=false;setIndex(0);}player.play();},
  stop(){player.stop();completed=false;setIndex(0);},
  previous(){player.pause();completed=false;setIndex(Math.max(0,getIndex()-1));},
  next(){player.pause();completed=false;setIndex(Math.min(length()-1,getIndex()+1));},
  reset(){this.stop();},
  setSpeed:value=>player.setSpeed(value),dispose:()=>player.dispose()
 };
}

export function playbackBar(playback,{speedName='speed',extraClass=''}={}){
 const active=playback.running||playback.paused;
 const primaryBtn=active?button('Stop','stop'):button('Play','play','primary');
 const secondaryBtn=playback.paused?button('Resume','resume','primary'):button('Pause','pause');
 return `<div class="control-row ${extraClass?`${extraClass} `:''}sim-playback-row">${primaryBtn}${secondaryBtn}${select('Animation speed',speedName,[['0.5','0.5×'],['1','1×'],['2','2×']],playback.speed)}</div>`;
}

export function syncPlaybackRow(root,playback,{disabled=false}={}){
 const row=root.querySelector('.sim-playback-row');
 if(!row)return;
 const active=playback.running||playback.paused;
 const first=row.querySelector('[data-action="play"], [data-action="stop"]');
 const second=row.querySelector('[data-action="pause"], [data-action="resume"]');
 if(first){
  first.dataset.action=active?'stop':'play';
  first.textContent=active?'Stop':'Play';
  first.className=active?'':'primary';
  first.disabled=Boolean(disabled);
 }
 if(second){
  second.dataset.action=playback.paused?'resume':'pause';
  second.textContent=playback.paused?'Resume':'Pause';
  second.className=playback.paused?'primary':'';
  second.disabled=Boolean(disabled)||(!playback.running&&!playback.paused);
 }
}
