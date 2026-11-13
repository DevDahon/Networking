// Apply sequencing after examples are inserted, before display wording expands.
// @ selectors identify simulations; other selectors are topic-owned titles.
export const sequenceMoves={
 '01-introduction-to-networking':[
  ['@availabilityDemo','after','Two network service architectures']
 ],
 '03-network-topologies':[
  ['Choose a topology for the task','after','@topology']
 ],
 '04-network-devices':[
  ['@macLearningDemo','after','Connecting a device to a LAN'],
  ['Read the interfaces along a network path','before','@devices']
 ],
 'osi-reference-model':[],
 '06-network-cables-media':[
  ['Select media for a campus installation','before','@media']
 ],
 '07-rj45-crimping':[
  ['Termination sequence: inspect before crimping','before','@cable']
 ],
 '08-ip-addressing':[
  ['@bitwiseDemo','after','The subnet mask separates network and host'],
  ['Understanding CIDR prefix notation','after','@bitwiseDemo'],
  ['Example: read one classroom address','after','Understanding CIDR prefix notation'],
  ['Interpret an IPv4 configuration','before','@subnet']
 ],
 '10-static-ip':[
  ['@asymmetricDemo','after','Example: two manually configured classroom computers'],
  ['Windows static-IP configuration','before','@static']
 ],
 'network-protocols-services':[
  ['Read both endpoints, not just one number','after','Two transport services: TCP and UDP'],
  ['@dnsCacheDemo','after','DNS: Domain Name System'],
  ['Example: open a protected school website','before','@protocolWeb']
 ],
 '11-dhcp':[
  ['Read a DHCP configuration and lease','before','@dhcp'],
  ['@reservedPoolDemo','after','@dhcp']
 ],
 '12-router-wireless':[
  ['Wi-Fi Frequencies and Standards','before','Wireless identity and protection'],
  ['Two protected Wi-Fi security options','before','Example: a laptop joins classroom Wi-Fi'],
  ['Router configuration sequence','before','@router'],
  ['@guestIsolationDemo','after','@router']
 ],
 '13-file-printer-sharing':[
  ['Windows folder sharing','before','@sharing'],
  ['@printQueueDemo','after','@sharing']
 ],
 '14-network-troubleshooting':[
  ['Test the theory and verify the repair','after','Six Windows diagnostic commands'],
  ['Nine modeled network faults','before','Example: numeric access works but a name fails'],
  ['@ttlTraceDemo','after','Example: numeric access works but a name fails'],
  ['A fault-to-repair demonstration','before','@troubleshoot']
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
