// One owned timer per automatic demonstration. The application calls dispose
// before replacing a slide, including when restarting its current topic.
export function createPlayback({advance,render}){
 let timer=null,disposed=false;
 const state={running:false,speed:1,
  play(){if(disposed)return;state.running=true;render();schedule();},
  pause(){state.running=false;cancel();},
  setSpeed(speed){state.speed=Number(speed);if(state.running)schedule();},
  dispose(){disposed=true;state.pause();}
 };
 function cancel(){if(timer!==null){clearTimeout(timer);timer=null;}}
 function schedule(){cancel();if(!state.running||disposed)return;timer=setTimeout(()=>{timer=null;if(advance()===false)state.running=false;render();schedule();},2000/state.speed);}
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
  get running(){return player.running;},get speed(){return player.speed;},
  get completed(){return completed;},
  get status(){return player.running?'Playing':completed?'Complete':'Paused';},
  play(){player.play();},pause(){player.pause();},
  replay(){this.reset();player.play();},
  resume(){if(completed)this.reset();player.play();},
  previous(){player.pause();completed=false;setIndex(Math.max(0,getIndex()-1));},
  next(){player.pause();completed=false;setIndex(Math.min(length()-1,getIndex()+1));},
  reset(){player.pause();completed=false;setIndex(0);},
  setSpeed:value=>player.setSpeed(value),dispose:()=>player.dispose()
 };
}
