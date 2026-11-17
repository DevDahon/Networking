// Apply sequencing after examples are inserted, before display wording expands.
// @ selectors identify simulations; other selectors are topic-owned titles.
export const sequenceMoves={
 '01-introduction-to-networking':[],
 '03-network-topologies':[
  ['Choose a topology for the task','after','@topology']
 ],
 '04-network-devices':[],
 'osi-reference-model':[],
 '06-network-cables-media':[
  ['Select media for a campus installation','before','@media'],
  ['Termination sequence: inspect before crimping','before','@cable']
 ],
 '08-ip-addressing':[
  ['@bitwiseDemo','after','The subnet mask separates network and host'],
  ['Example: read one classroom address','after','@bitwiseDemo'],
  ['Interpret an IPv4 configuration','before','@subnet']
 ],
 '10-static-ip':[
  ['@asymmetricDemo','after','Example: two manually configured classroom computers'],
  ['Read a DHCP configuration and lease','before','@dhcp'],
  ['@reservedPoolDemo','after','@dhcp']
 ],
 'network-protocols-services':[
  ['Read both endpoints, not just one number','after','Two transport services: TCP and UDP'],
  ['@dnsCacheDemo','after','DNS: Domain Name System'],
  ['Example: open a protected school website','before','@protocolWeb']
 ],
 '12-router-wireless':[
  ['Wi-Fi Frequencies and Standards','before','Wireless identity and protection'],
  ['Router configuration sequence','before','@router'],
  ['@guestIsolationDemo','after','@router']
 ],
 '13-file-printer-sharing':[
  ['@printQueueDemo','after','@sharing']
 ],
 '14-network-troubleshooting':[
  ['Common Network Fault Symptoms','before','Example: numeric access works but a name fails'],
  ['@ttlTraceDemo','after','Example: numeric access works but a name fails'],
  ['A fault-to-repair demonstration','before','@troubleshoot'],
  ['Test the theory and verify the repair','after','@troubleshoot']
 ],
 '15-network-security':[
  ['Layered defense in practice','before','@security']
 ]
};

export function sequenceTopic(topic){
 const slides=[...topic.slides];
 const locate=selector=>{
  const matches=slides.flatMap((slide,index)=>(selector.startsWith('@')?slide.type===selector.slice(1):slide.title===selector)?[index]:[]);
  if(matches.length!==1)throw new Error(`${topic.id}: expected one sequence target ${selector}, found ${matches.length}`);
  return matches[0];
 };
 if(!sequenceMoves[topic.id])throw new Error(`Missing sequence review for ${topic.id}`);
 for(const [target,direction,anchor] of sequenceMoves[topic.id]){
  const [slide]=slides.splice(locate(target),1);
  slides.splice(locate(anchor)+(direction==='after'?1:0),0,slide);
 }
 // Hidden transitions must follow the actual final sequence too.
 return {...topic,slides:slides.map((slide,index)=>({...slide,notes:{...slide.notes,
  transition:index<slides.length-1?`Next: ${slides[index+1].title}. Connect the current explanation to that discussion.`:'The discussion is complete. Return to Topics.'
 }}))};
}
