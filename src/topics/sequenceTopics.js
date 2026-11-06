// Apply sequencing after examples are inserted, before display wording expands.
// @ selectors identify simulations; other selectors are topic-owned titles.
export const sequenceMoves={
 '01-introduction-to-networking':[
  ['@availabilityDemo','after','Two network service architectures']
 ],
 '03-network-topologies':[
  ['@pathTraceDemo','after','@topology'],
  ['Choose a topology for the task','after','@pathTraceDemo']
 ],
 '04-network-devices':[
  ['@macLearningDemo','after','Connecting a device to a LAN']
 ],
 'osi-reference-model':[
  ['Example: a web request uses several responsibilities','after','Layer 1: Physical'],
  ['@nextHopFrameDemo','after','Local delivery and the next hop'],
  ['@layerBoundaryDemo','before','@osiTroubleshooting']
 ],
 '06-network-cables-media':[
  ['@mediumBudgetDemo','after','Example: a room link and a building link'],
  ['Termination sequence: inspect before crimping','after','Prepare, terminate, and verify'],
  ['@pairScanDemo','after','@cable']
 ],
 '08-ip-addressing':[
  ['@bitwiseDemo','after','@ipv4'],
  ['Interpret an IPv4 configuration','after','@bitwiseDemo'],
  ['@asymmetricDemo','after','Example: two manually configured classroom computers'],
  ['Windows static-IP configuration','before','@static']
 ],
 '09-basic-subnetting':[
  ['@partitionDemo','after','Example: split one /24 into four /26 networks'],
  ['Eight worked subnet examples','after','@subnet']
 ],
 'network-protocols-services':[
  ['Read both endpoints, not just one number','after','Two transport services: TCP and UDP'],
  ['@dnsCacheDemo','after','DNS: Domain Name System'],
  ['Example: open a protected school website','before','@protocolWeb'],
  ['Seven common email service ports','before','@protocolMail']
 ],
 '11-dhcp':[
  ['Read a DHCP configuration and lease','before','@dhcp'],
  ['@reservedPoolDemo','after','@dhcp']
 ],
 '12-router-wireless':[
  ['Two protected Wi-Fi security options','before','Example: a laptop joins classroom Wi-Fi'],
  ['Router configuration sequence','before','@router'],
  ['@guestIsolationDemo','after','@router']
 ],
 '13-file-printer-sharing':[
  ['Windows folder sharing','before','@sharing'],
  ['@printQueueDemo','after','@sharing']
 ],
 '14-network-troubleshooting':[
  ['Nine modeled network faults','before','Example: numeric access works but a name fails'],
  ['@ttlTraceDemo','after','Example: numeric access works but a name fails'],
  ['A fault-to-repair demonstration','before','@troubleshoot']
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
