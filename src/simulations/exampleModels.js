import {osiResponsibilityPlan} from './osiWalkthroughs.js';
import {topologyExamplePlan} from './topologyExampleModel.js';
import {subnet,contains,sharing,DHCP} from '../utils/network.js';
import {pairIntegrity,partitionSubnet,mediaBudget,DNSCache,asymmetricSubnet} from './extraModels.js';

const stage=(title,text,focus=[],route=[],ok=true,facts=[])=>({title,text,focus,route,ok,facts});
export function diagramPath(diagram,source,target,broken=false){
 if(broken)return [];
 const queue=[[source]],seen=new Set([source]);
 while(queue.length){const path=queue.shift(),last=path.at(-1);if(last===target)return path;
  for(const [a,b] of diagram.edges){const next=a===last?b:b===last?a:-1;
   if(next>=0&&!seen.has(next)){seen.add(next);queue.push([...path,next]);}
  }
 }
 return [];
}
function exchange(diagram,source,target,broken=false){
 const route=diagramPath(diagram,source,target,broken);
 if(!route.length)return [stage('Locate the disconnected path','The selected source cable is disconnected. No frames can leave this computer.',[source],[],false),stage('Delivery stops here','The printer receives no job from this computer. Other connected computers can still use the switch and printer.',[source],[],false)];
 return [
  stage('Prepare a print job',`${diagram.nodes[source].label} prepares document data for the directly connected network printer.`,[source],[],true,[['Message','Print request and document data']]),
  stage('Send the print job',route.map(i=>diagram.nodes[i].label).join(' → '),route,route,true,[['Message','Print request and document data']]),
  stage('The printer accepts the job','In this bidirectional printing example, the printer accepts the job into its queue. Acceptance does not prove that the pages have finished printing.',[target],[],true,[['Job state','Accepted / queued']]),
  stage('Return the printer response','The printer sends a job-acceptance response to the computer through the switch. This is status information, not the document being sent back; later job status can be queried when the protocol supports it.',[...route].reverse(),[...route].reverse(),true,[['Response','Job accepted / queued'],['Printing finished?','Not established by this response']])
 ];
}
export function exampleOptions(topic,slide){
 if(slide.topologyKind)return [['healthy','All links connected'],['fault','Selected link removed']];
 if(slide.exampleId==='intro-internet')return [['healthy','Internet connection available'],['fault','Internet connection unavailable']];
 if(slide.exampleId==='intro-exchange')return [];
 if(slide.diagram?.nodes?.some(n=>n.kind==='printer')&&slide.diagram?.nodes?.length===7)return [['healthy','Connected source cable'],['fault','Disconnected source cable']];
 if(slide.title==='Example: a straight-through patch cable')return [['healthy','Correct pin mapping'],['fault','Open conductor at pin 7']];
 if(slide.title==='Example: two manually configured classroom computers')return [['healthy','Both hosts use /24'],['fault','Different host masks']];
 const options={
  '06-network-cables-media':[['healthy','Matching fiber optics'],['fault','180 m copper channel']],
  '07-rj45-crimping':[['healthy','Correct pin mapping'],['fault','Open conductor at pin 7']],
  '10-static-ip':[['healthy','Both hosts use /24'],['fault','Different host masks']],
  'network-protocols-services':[['healthy','Resolver responds'],['fault','Resolver offline']],
  '11-dhcp':[['healthy','Server online'],['fault','Server offline']],
  '12-router-wireless':[['healthy','Wireless authentication succeeds'],['fault','Wireless authentication fails']],
  '13-file-printer-sharing':[['healthy','Read the folder'],['fault','Try to edit the folder']]
 };
 return options[topic]||[];
}

export function examplePlan(topic,slide,{scenario='healthy',source='3'}={}){
 const d=slide.diagram,fault=scenario==='fault';
 if(slide.topologyKind)return topologyExamplePlan(slide,scenario);
 if(slide.exampleId==='intro-internet')return [
  stage('Use a local resource','The computer sends a print request through the local switch to the printer. The route stays inside this local network.',[0,1,2],[0,1,2]),
  stage('The local printer responds','In this bidirectional printing example, the printer returns job-acceptance status through the switch even without Internet access. Acceptance does not confirm that the pages have finished printing.',[2,1,0],[2,1,0],true,[['Response','Job accepted / queued']]),
  stage('Request a remote website','The computer sends a request toward the router because this website is outside the local network.',[0,1,3],[0,1,3]),
  stage(fault?'Remote access stops at the unavailable connection':'Reach the remote service',fault?'The local network is still connected, but the unavailable Internet connection prevents access to this remote website.':'With a working Internet path and available service, the router forwards the request toward the website server.',fault?[3]:[3,4],fault?[]:[3,4],!fault)
 ];
 if(slide.exampleId==='intro-exchange')return [
  stage('Create a request','Computer A is the sender. Computer B is the receiver. The message asks for a shared document.',[0],[],true,[['Message','Please send the document']]),
  stage('Carry the request','The wired links and switch carry the request from Computer A to Computer B using compatible communication rules.',[0,1,2],[0,1,2],true,[['Medium','Ethernet cables'],['Protocol','Agreed communication rules']]),
  stage('Prepare a response','Computer B receives the request and prepares the document response. It is now the sender of this new message.',[2],[],true,[['New sender','Computer B'],['New receiver','Computer A']]),
  stage('Return the response','The document response travels back to Computer A. One conversation can contain messages in both directions.',[2,1,0],[2,1,0],true,[['Response','Requested document']])
 ];
 if(slide.title==='Example: a message gains delivery information')return [
  stage('Write the message','The application creates the message Hello.',[0],[],true,[['Payload','Hello']]),
  stage('Encapsulate the message','Transport information identifies the receiving process. Network and link information support delivery.',[0],[],true,[['Nested units','Data → segment → packet → frame']]),
  stage('Carry the frame','Signals carry the frame through the modeled local path.',[0,1,2],[0,1,2]),
  stage('Recover the message','The receiver interprets the delivery information and presents Hello to the intended application.',[2],[],true,[['Received payload','Hello']])
 ];
 if(slide.title==='Example: a straight-through patch cable'||topic==='07-rj45-crimping'){
  const result=pairIntegrity(fault?'open':'standard');
  return [...result.mapping.map((pins,i)=>stage(`Test conductor ${i+1}`,pins.length?`End A pin ${i+1} reaches End B pin ${pins[0]}.`:`End A pin ${i+1} has no continuous path.`,[0,1,2],[],pins.length===1,[['End A color',result.a[i]],['End B pin',pins.join(', ')||'Open']])),
   stage(result.open?'Open circuit detected':'All eight conductors map straight through',result.open?'Pin 7 is open in this fixture. Re-terminate or replace the faulty cable, then retest.':'All eight mappings are continuous and correct for the selected straight-through fixture. This does not certify category performance.',[0,2],[],!result.open)];
 }
 if(slide.title==='Example: two manually configured classroom computers'||topic==='10-static-ip'){
  const result=asymmetricSubnet({a:'192.168.1.10',b:fault?'192.168.1.200':'192.168.1.20',aPrefix:24,bPrefix:fault?25:24});
  return [stage('Computer A checks its own mask',`${result.a}/${result.sa.prefix} considers ${result.b} ${result.aLocal?'local':'remote'}.`,[0],[],result.aLocal,[['A network',result.sa.network]]),
   stage('Computer B independently checks its mask',`${result.b}/${result.sb.prefix} considers ${result.a} ${result.bLocal?'local':'remote'}.`,[2],[],result.bLocal,[['B network',result.sb.network]]),
   stage(result.ok?'Send a local request':'The isolated model has no required route',result.ok?'Both hosts agree on local delivery; the intact switch path carries this example’s request from Computer A to Computer B.':'Computer B needs a route back to A, but this diagram has no router. A complete round trip fails.',[0,1,2],result.ok?[0,1,2]:[],result.ok),
   ...(result.ok?[stage('Return the peer response','Computer B sends this example’s reply through the switch to Computer A. Both the request and response need valid delivery paths.',[2,1,0],[2,1,0],true,[['Response','Peer reply']])]:[])];
 }
 if(d.nodes.length===7&&d.nodes.some(n=>n.kind==='printer')){
  const pc=Number(source);if(!Number.isInteger(pc)||pc<1||pc>5)throw new Error('Choose Computer 1 through Computer 5.');
  if(topic==='03-network-topologies'){
   const path=diagramPath(d,pc,6,fault);
   return [
    stage('Identify the star connections','Five computers and one printer each have an independent cable to the central switch.',[0],[],true,[['Endpoints','6'],['Independent links','6']]),
    stage('Trace the endpoint-to-endpoint path',path.length?`The path is ${path.map(i=>d.nodes[i].label).join(' → ')}. Endpoints do not need direct cables to every other endpoint.`:`Computer ${pc} has no working connection to the center, so no endpoint-to-endpoint path is available from it.`,path.length?path:[pc],path,!!path.length),
    stage(fault?'One spoke fails':'Independent spokes share a center',fault?`The disconnected cable isolates Computer ${pc}. The other four computers remain physically connected to the switch and printer.`:'Each endpoint cable is independent. A single spoke failure affects its endpoint rather than breaking every connection.',fault?[0,6]:[0,pc,6],[],!fault),
    stage('Distinguish a central-device failure','A failed or unpowered central switch would disrupt communication through it for all six endpoints. This differs from the selected single-cable failure.',[0],[],!fault)
   ];
  }
  return exchange(d,pc,6,fault);
 }
 if(slide.title==='Personal Area Network (PAN)')return [
  stage('Pair the nearby devices','The phone and headset establish an authorized Bluetooth connection.',[0,2]),
  stage('Transmit audio','Audio data travels over the short-range radio link.',[0,1,2],[0,1,2]),
  stage('Play the audio','The headset interprets the received audio data. It is not an Internet router.',[2])];
 if(slide.title==='Metropolitan Area Network (MAN)'||slide.title==='Wide Area Network (WAN)')return [
  stage('Identify the remote site','The destination is in a different site network, so the traffic needs inter-site forwarding.',[0]),
  stage('Cross the connecting service','Site routers use the connecting service to reach the other site; this cloud represents a network, not one cable.',[0,1,2],[0,1,2]),
  stage('Return the reply','A host at the other site sends the reply in this request-and-response example. Site routers forward it over a working return path; they do not create the application’s reply.',[2,1,0],[2,1,0])];
 switch(topic){
  case '04-network-devices':return [
   stage('Choose the local destination','A print frame leaves the computer for the local printer.',[0]),
   stage('Switch the local frame','With its destination port learned, the switch forwards this frame to the printer. It does not need the router.',[0,1,2],[0,1,2]),
   stage('Choose a remote destination','For a remote address, the computer targets its gateway at the local link.',[0,1,3],[0,1,3]),
   stage('Route to another network','The router selects a next hop toward the provider. Remote reachability also needs a return route.',[3,4],[3,4])];
  case 'osi-reference-model':return osiResponsibilityPlan();
  case '05-network-communication':return [
   stage('Write the message','The application creates the message Hello.',[0],[],true,[['Payload','Hello']]),
   stage('Encapsulate the message','Transport information identifies the receiving process. Network and link information support delivery.',[0],[],true,[['Nested units','Data → segment → packet → frame']]),
   stage('Carry the frame','Signals carry the frame through the modeled local path.',[0,1,2],[0,1,2]),
   stage('Recover the message','The receiver interprets the delivery information and presents Hello to the intended application.',[2],[],true,[['Received payload','Hello']])];
  case '06-network-cables-media':{
   const copper=mediaBudget({profile:'cat5e',distance:30,speed:1000}),long=mediaBudget({profile:fault?'cat5e':'fiber',distance:180,speed:1000});
   return [stage('Inspect the room link','The room connection requires a 30 m channel at 1 gigabit per second.',[0,1],[],copper.ok,[['Copper profile limit','100 m'],['Required distance','30 m']]),
    stage('Inspect the building link',fault?'The selected 180 m copper channel exceeds the 100 m profile limit.':'Matching 1-gigabit fiber optics use the stated 1 km teaching profile.',[1,2],[],long.ok,[['Selected reach',`${long.profile.reach} m`],['Required distance','180 m']]),
    stage(long.ok?'The selected profile meets the requirement':'Choose a suitable medium',long.ok?'Both rate and distance fit this assumed optics profile. Installation still needs testing.':'The longer copper channel does not meet this standard reach. Changing an address cannot correct the physical requirement.',[1,2],long.ok?[1,2]:[],long.ok)];
  }
  case '07-rj45-crimping':{
   const result=pairIntegrity(fault?'open':'standard');
   return [...result.mapping.map((pins,i)=>stage(`Test conductor ${i+1}`,pins.length?`End A pin ${i+1} reaches End B pin ${pins[0]}.`:`End A pin ${i+1} has no continuous path.`,[0,1,2],[],pins.length===1,[['End A color',result.a[i]],['End B pin',pins.join(', ')||'Open']])),
    stage(result.open?'Open circuit detected':'All eight conductors map straight through',result.open?'Pin 7 is open in this fixture. Re-terminate or replace the faulty cable, then retest.':'All eight mappings are continuous and correct for the selected straight-through fixture. This does not certify category performance.',[0,2],[],!result.open)];
  }
  case '08-ip-addressing':{
   const local=contains('192.168.10.40','192.168.10.25',24),s=subnet('192.168.10.25',24);
   return [stage('Read address and prefix','The computer uses 192.168.10.25/24.',[0],[],true,[['Subnet mask',s.mask],['Local network',`${s.network}/24`]]),
    stage('Compare a local peer',`192.168.10.40 belongs to the same network: ${local?'yes':'no'}. Delivery to that peer stays local.`,[0]),
    stage('Send toward a remote address','For this remote destination, the host sends its first link frame to the configured gateway.',[0,1],[0,1]),
    stage('Route beyond the local subnet','The gateway forwards toward the destination network using its routing information.',[1,2],[1,2])];
  }
  case '09-basic-subnetting':{
   const result=partitionSubnet('192.168.10.0',24,26);
   return result.children.map((s,i)=>stage(`Reveal child network ${i+1}`,`${s.network}/26 contains ${s.total} addresses and ${s.usable} ordinary usable host addresses. These are separate logical subnets; the diagram is not a traffic path.`,[i],[],true,[['Usable hosts',`${s.first} – ${s.last}`],['Broadcast',s.broadcast]]));
  }
  case 'network-protocols-services':{
   const cache=new DNSCache();cache.online=!fault;
   try{cache.resolve('classroom.example');}catch{}
   // Resolver traffic and web traffic have separate paths; the resolver is not a proxy.
   return [stage('Ask for the server address','The browser asks its configured Domain Name System resolver about classroom.example.',[0,1],[0,1]),
    stage(fault?'Name lookup fails':'Return the address',fault?'The resolver is offline, so this fresh lookup has no address to use.':`The resolver returns ${cache.records['classroom.example']}.`,[1,0],fault?[]:[1,0],!fault),
    ...(fault?[]:[stage('Establish the protected connection','For this HTTP/1.1 example, the client establishes Transmission Control Protocol and Transport Layer Security with the web server.',[0,2],[0,2]),stage('Receive the web response','The server returns the protected response directly to the client. The resolver does not carry the web page.',[2,0],[2,0])])];
  }
  case '10-static-ip':{
   const result=asymmetricSubnet({a:'192.168.1.10',b:fault?'192.168.1.200':'192.168.1.20',aPrefix:24,bPrefix:fault?25:24});
   return [stage('Computer A checks its own mask',`${result.a}/${result.sa.prefix} considers ${result.b} ${result.aLocal?'local':'remote'}.`,[0],[],result.aLocal,[['A network',result.sa.network]]),
    stage('Computer B independently checks its mask',`${result.b}/${result.sb.prefix} considers ${result.a} ${result.bLocal?'local':'remote'}.`,[2],[],result.bLocal,[['B network',result.sb.network]]),
    stage(result.ok?'Send a local request':'The isolated model has no required route',result.ok?'Both hosts agree on local delivery; the intact switch path carries this example’s request from Computer A to Computer B.':'Computer B needs a route back to A, but this diagram has no router. A complete round trip fails.',[0,1,2],result.ok?[0,1,2]:[],result.ok),
    ...(result.ok?[stage('Return the peer response','Computer B sends this example’s reply through the switch to Computer A. Both the request and response need valid delivery paths.',[2,1,0],[2,1,0],true,[['Response','Peer reply']])]:[])];
  }
  case '11-dhcp':{
   const server=new DHCP('192.168.1.100','192.168.1.103');server.online=!fault;
   if(fault)return [stage('Broadcast Discover','The unconfigured laptop tries to locate a configuration server.',[0,1],[0,1]),stage('No server response','The server is offline. No Offer or acknowledgment arrives, so no lease is committed.',[2],[],false,[['Active leases','0']])];
   const lease=server.request('Laptop');
   return [stage('Discover','The laptop broadcasts to locate a server. This simplified path omits relay operation.',[0,1,2],[0,1,2],true,[['Active leases','0']]),stage('Offer','The server proposes an available address and options.',[2,1,0],[2,1,0],true,[['Proposed address',lease.ip]]),stage('Request','The laptop requests the offered configuration.',[0,1,2],[0,1,2],true,[['Active leases','0']]),stage('Acknowledge','The server commits the lease and confirms the configuration.',[2,1,0],[2,1,0],true,[['Leased address',lease.ip],['Mask','255.255.255.0'],['Gateway',server.gateway]])];
  }
  case '12-router-wireless':return [
   stage('Find the wireless network','The laptop selects the Classroom Service Set Identifier.',[0,1]),
   stage(fault?'Authentication fails':'Authenticate and associate',fault?'The credentials do not meet the configured authentication requirement. The laptop cannot use this wireless link.':'The access point accepts the configured credentials and establishes the wireless association.',[0,1],[],!fault),
   ...(fault?[]:[stage('Obtain configuration','With a working association and available service, the client obtains matching address configuration.',[1,0],[1,0]),stage('Use the routed connection','The gateway forwards permitted remote traffic toward its provider. Authentication alone did not prove this upstream path.',[0,1,2],[0,1,2])])];
  case '13-file-printer-sharing':{
   const outcome=sharing({share:1,ntfs:2,action:fault?'Write':'Read'}),allowed=outcome.startsWith('Allowed');
   return [stage('Request access',`The authenticated student requests ${fault?'Write':'Read'} access to ClassFiles on the sharing host.`,[0,1],[0,1]),stage('Evaluate both permission gates','The host checks Read share permission and Modify file-system permission on its stored folder. The folder is a resource inside the host, not a separate network device.',[1,2],[],true,[['Share','Read'],['File system','Modify']]),stage(allowed?'The host returns file data':'The host returns access denied',outcome,[1,0],[1,0],allowed,[['Response',allowed?'Requested file data':'Access denied; no file modification']])];
  }
  case '14-network-troubleshooting':return [
   stage('Test the same service by numeric address','The modeled service responds at 203.0.113.20, showing a working numeric path for this operation.',[0,1],[0,1]),
   stage('Test name resolution','A separate name query to the configured resolver times out. A successful numeric request did not verify name resolution.',[0,2],[0,2],false),
   stage('Narrow the investigation','Check the configured resolver and its reachability. This evidence does not justify replacing the already working client cable.',[2],[],false),
   stage('Retest after correcting the identified fault','After the resolver fault is corrected in this example, repeat the original name-based request rather than relying only on the numeric test.',[0,1],[0,1])];
  default:throw new Error(`Missing automatic example for ${topic}`);
 }
}
