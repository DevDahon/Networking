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
 if(!route.length)return [stage('Locate the disconnected path','The selected source cable is unplugged, so no frames can leave this computer.',[source],[],false),stage('Delivery stops here','The printer receives no job from this computer, while other connected computers still work.',[source],[],false)];
 return [
  stage('Prepare a print job',`${diagram.nodes[source].label} (Sender) creates the print job (Message) for the network printer.`,[source],[],true,[['Role','Sender → Message']]),
  stage('Send the print job',`The print job travels across Ethernet cables (Medium) along ${route.map(i=>diagram.nodes[i].label).join(' → ')}.`,route,route,true,[['Role','Medium & Protocol']]),
  stage('The printer accepts the job','The network printer (Receiver) accepts the request into its print queue.',[target],[],true,[['Job state','Accepted / queued']]),
  stage('Return the printer response','The printer sends a status reply back through the switch to the computer.',[...route].reverse(),[...route].reverse(),true,[['Response','Job accepted / queued'],['Printing finished?','Not established by this response']])
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
  stage('Use a local resource','The computer sends a print job through the local switch directly to the printer.',[0,1,2],[0,1,2]),
  stage('The local printer responds','The printer replies through the switch that the job is queued—no Internet needed.',[2,1,0],[2,1,0],true,[['Response','Job accepted / queued']]),
  stage('Request a remote website','The computer sends a web request to the router because the website is on an outside network.',[0,1,3],[0,1,3]),
  stage(fault?'Remote access stops at the unavailable connection':'Reach the remote service',fault?'The local network is still connected, but the offline Internet link blocks the remote website.':'The router forwards the request across the working Internet link to the remote web server.',fault?[3]:[3,4],fault?[]:[3,4],!fault)
 ];
 if(slide.exampleId==='intro-exchange')return [
  stage('Create a request','Computer A (sender) creates a request asking Computer B (receiver) for a shared file.',[0],[],true,[['Message','Please send the document']]),
  stage('Carry the request','Ethernet cables and the switch carry the request from Computer A to Computer B.',[0,1,2],[0,1,2],true,[['Medium','Ethernet cables'],['Protocol','Agreed communication rules']]),
  stage('Prepare a response','Computer B receives the request and prepares to send the requested document back.',[2],[],true,[['New sender','Computer B'],['New receiver','Computer A']]),
  stage('Return the response','Computer B sends the document back through the switch to Computer A.',[2,1,0],[2,1,0],true,[['Response','Requested document']])
 ];
 if(slide.title==='Example: a message gains delivery information')return [
  stage('Write the message','The application creates the user message "Hello" for delivery.',[0],[],true,[['Payload','Hello']]),
  stage('Encapsulate the message','Each layer wraps the message with port, IP, and MAC headers before transmission.',[0],[],true,[['Nested units','Data → segment → packet → frame']]),
  stage('Carry the frame','Electrical or optical signals carry the completed frame across the local network path.',[0,1,2],[0,1,2]),
  stage('Recover the message','The receiver removes each header in reverse order and displays "Hello" in the app.',[2],[],true,[['Received payload','Hello']])
 ];
 if(slide.title==='Example: a straight-through patch cable'||topic==='07-rj45-crimping'){
  const result=pairIntegrity(fault?'open':'standard');
  return [...result.mapping.map((pins,i)=>stage(`Test conductor ${i+1}`,pins.length?`End A pin ${i+1} connects cleanly to End B pin ${pins[0]}.`:`End A pin ${i+1} is broken and has no continuous path.`,[0,1,2],[],pins.length===1,[['End A color',result.a[i]],['End B pin',pins.join(', ')||'Open']])),
   stage(result.open?'Open circuit detected':'All eight conductors map straight through',result.open?'Pin 7 is open; re-crimp the damaged plug and test all eight pins again.':'All eight pins match 1-to-1 from End A to End B for a valid straight-through cable.',[0,2],[],!result.open)];
 }
 if(slide.title==='Example: two manually configured classroom computers'||topic==='10-static-ip'){
  const result=asymmetricSubnet({a:'192.168.1.10',b:fault?'192.168.1.200':'192.168.1.20',aPrefix:24,bPrefix:fault?25:24});
  return [stage('Computer A checks its own mask',`Using ${result.a}/${result.sa.prefix}, Computer A treats ${result.b} as ${result.aLocal?'local':'remote'}.`,[0],[],result.aLocal,[['A network',result.sa.network]]),
   stage('Computer B independently checks its mask',`Using ${result.b}/${result.sb.prefix}, Computer B treats ${result.a} as ${result.bLocal?'local':'remote'}.`,[2],[],result.bLocal,[['B network',result.sb.network]]),
   stage(result.ok?'Send a local request':'The isolated model has no required route',result.ok?'Both PCs agree they share the same subnet, so the switch delivers the request directly.':'Computer B thinks Computer A is in another subnet and looks for a router, so the reply fails.',[0,1,2],result.ok?[0,1,2]:[],result.ok),
   ...(result.ok?[stage('Return the peer response','Computer B sends its reply straight back through the switch to Computer A.',[2,1,0],[2,1,0],true,[['Response','Peer reply']])]:[])];
 }
 if(d.nodes.length===7&&d.nodes.some(n=>n.kind==='printer')){
  const pc=Number(source);if(!Number.isInteger(pc)||pc<1||pc>5)throw new Error('Choose Computer 1 through Computer 5.');
  if(topic==='03-network-topologies'){
   const path=diagramPath(d,pc,6,fault);
   return [
    stage('Identify the star connections','Five computers and one printer each connect with their own cable to the central switch.',[0],[],true,[['Endpoints','6'],['Independent links','6']]),
    stage('Trace the endpoint-to-endpoint path',path.length?`Traffic travels along ${path.map(i=>d.nodes[i].label).join(' → ')} through the central switch.`:`Computer ${pc} has a disconnected cable, so it cannot reach the central switch.`,path.length?path:[pc],path,!!path.length),
    stage(fault?'One spoke fails':'Independent spokes share a center',fault?`The unplugged cable isolates Computer ${pc}, while the other four computers still work.`:'Each device uses its own cable, and the printer replies back through the central switch.',fault?[0,6]:[0,pc,6],fault?[]:[...path].reverse(),!fault),
    stage('Distinguish a central-device failure','If the central switch fails or loses power, communication stops for all six endpoints.',[0],[],!fault)
   ];
  }
  return exchange(d,pc,6,fault);
 }
 if(slide.title==='Personal Area Network (PAN)')return [
  stage('Pair the nearby devices','The phone and wireless headset pair over a short-range Bluetooth connection.',[0,2]),
  stage('Transmit audio','Audio packets travel across the personal wireless link from phone to headset.',[0,1,2],[0,1,2]),
  stage('Play the audio','The headset receives and plays the audio without needing Wi-Fi or Internet.',[2])];
 if(slide.title==='Metropolitan Area Network (MAN)'||slide.title==='Wide Area Network (WAN)')return [
  stage('Identify the remote site','The destination device is in another branch, so traffic is sent to the site router.',[0]),
  stage('Cross the connecting service','Site routers forward the packet across the city or carrier backbone to the remote site.',[0,1,2],[0,1,2]),
  stage('Return the reply','The remote branch sends its response back across the carrier link to the sender.',[2,1,0],[2,1,0])];
 switch(topic){
  case '04-network-devices':return [
   stage('Choose the local destination','The computer sends a local print frame addressed to the classroom printer.',[0]),
   stage('Switch the local frame','The switch forwards the frame directly to the printer port without using the router.',[0,1,2],[0,1,2]),
   stage('Choose a remote destination','To reach an outside website, the computer sends the frame to its default gateway router.',[0,1,3],[0,1,3]),
   stage('Route to another network','The router inspects the destination IP and forwards the packet toward the ISP.',[3,4],[3,4])];
  case 'osi-reference-model':return osiResponsibilityPlan();
  case '05-network-communication':return [
   stage('Write the message','The application creates the user message "Hello" for delivery.',[0],[],true,[['Payload','Hello']]),
   stage('Encapsulate the message','Each layer wraps the message with port, IP, and MAC headers before transmission.',[0],[],true,[['Nested units','Data → segment → packet → frame']]),
   stage('Carry the frame','Electrical or optical signals carry the completed frame across the local network path.',[0,1,2],[0,1,2]),
   stage('Recover the message','The receiver removes each header in reverse order and displays "Hello" in the app.',[2],[],true,[['Received payload','Hello']])];
  case '06-network-cables-media':{
   const copper=mediaBudget({profile:'cat5e',distance:30,speed:1000}),long=mediaBudget({profile:fault?'cat5e':'fiber',distance:180,speed:1000});
   return [stage('Inspect the room link','A 30 m classroom run easily works on Cat 5e/Cat 6 copper (100 m max limit).',[0,1],[],copper.ok,[['Copper profile limit','100 m'],['Required distance','30 m']]),
    stage('Inspect the building link',fault?'A 180 m copper run fails because standard Ethernet copper is limited to 100 m.':'A 180 m building-to-building run succeeds using fiber-optic cable (up to 1 km).',[1,2],[],long.ok,[['Selected reach',`${long.profile.reach} m`],['Required distance','180 m']]),
    stage(long.ok?'The selected profile meets the requirement':'Choose a suitable medium',long.ok?'Copper handles the short room run and fiber handles the long building link.':'Replace the 180 m copper run with fiber optics to span the distance reliably.',[1,2],long.ok?[1,2]:[],long.ok)];
  }
  case '07-rj45-crimping':{
   const result=pairIntegrity(fault?'open':'standard');
   return [...result.mapping.map((pins,i)=>stage(`Test conductor ${i+1}`,pins.length?`End A pin ${i+1} connects cleanly to End B pin ${pins[0]}.`:`End A pin ${i+1} is broken and has no continuous path.`,[0,1,2],[],pins.length===1,[['End A color',result.a[i]],['End B pin',pins.join(', ')||'Open']])),
    stage(result.open?'Open circuit detected':'All eight conductors map straight through',result.open?'Pin 7 is open; re-crimp the damaged plug and test all eight pins again.':'All eight pins match 1-to-1 from End A to End B for a valid straight-through cable.',[0,2],[],!result.open)];
  }
  case '08-ip-addressing':{
   const local=contains('192.168.10.40','192.168.10.25',24),s=subnet('192.168.10.25',24);
   return [stage('Read address and prefix','The computer is configured with IP 192.168.10.25/24 in subnet 192.168.10.0.',[0],[],true,[['Subnet mask',s.mask],['Local network',`${s.network}/24`]]),
    stage('Compare a local peer',`Peer 192.168.10.40 shares the same 192.168.10.0/24 network (${local?'yes':'no'}), so traffic stays local.`,[0]),
    stage('Send toward a remote address','For an outside IP address, the computer sends the frame to its local gateway (192.168.10.1).',[0,1],[0,1]),
    stage('Route beyond the local subnet','The router forwards the packet out to the remote destination network.',[1,2],[1,2])];
  }
  case '09-basic-subnetting':{
   const result=partitionSubnet('192.168.10.0',24,26);
   return result.children.map((s,i)=>stage(`Reveal child network ${i+1}`,`Subnet ${s.network}/26 provides ${s.total} total IPs and ${s.usable} usable host addresses.`,[i],[],true,[['Usable hosts',`${s.first} – ${s.last}`],['Broadcast',s.broadcast]]));
  }
  case 'network-protocols-services':{
   const cache=new DNSCache();cache.online=!fault;
   try{cache.resolve('classroom.example');}catch{}
   return [stage('Ask for the server address','The browser queries the DNS server to find the IP address for classroom.example.',[0,1],[0,1]),
    stage(fault?'Name lookup fails':'Return the address',fault?'The DNS server is offline, so the browser cannot find the website IP address.':`The DNS server replies with the website IP address (${cache.records['classroom.example']}).`,[1,0],fault?[]:[1,0],!fault),
    ...(fault?[]:[stage('Establish the protected connection','The browser opens an encrypted HTTPS (TCP port 443 + TLS) connection directly to the web server.',[0,2],[0,2]),stage('Receive the web response','The web server sends the encrypted webpage directly back to the browser.',[2,0],[2,0])])];
  }
  case '10-static-ip':{
   const result=asymmetricSubnet({a:'192.168.1.10',b:fault?'192.168.1.200':'192.168.1.20',aPrefix:24,bPrefix:fault?25:24});
   return [stage('Computer A checks its own mask',`Using ${result.a}/${result.sa.prefix}, Computer A treats ${result.b} as ${result.aLocal?'local':'remote'}.`,[0],[],result.aLocal,[['A network',result.sa.network]]),
    stage('Computer B independently checks its mask',`Using ${result.b}/${result.sb.prefix}, Computer B treats ${result.a} as ${result.bLocal?'local':'remote'}.`,[2],[],result.bLocal,[['B network',result.sb.network]]),
    stage(result.ok?'Send a local request':'The isolated model has no required route',result.ok?'Both PCs agree they share the same subnet, so the switch delivers the request directly.':'Computer B thinks Computer A is in another subnet and looks for a router, so the reply fails.',[0,1,2],result.ok?[0,1,2]:[],result.ok),
    ...(result.ok?[stage('Return the peer response','Computer B sends its reply straight back through the switch to Computer A.',[2,1,0],[2,1,0],true,[['Response','Peer reply']])]:[])];
  }
  case '11-dhcp':{
   const server=new DHCP('192.168.1.100','192.168.1.103');server.online=!fault;
   if(fault)return [stage('Broadcast Discover','The laptop broadcasts a DHCP Discover message to find a server on the LAN.',[0,1],[0,1]),stage('No server response','The DHCP server is offline, so no Offer arrives and the laptop gets no IP lease.',[2],[],false,[['Active leases','0']])];
   const lease=server.request('Laptop');
   return [stage('Discover','The new laptop broadcasts a DHCP Discover message to locate a server.',[0,1,2],[0,1,2],true,[['Active leases','0']]),stage('Offer','The DHCP server replies with an Offer proposing an available IP address.',[2,1,0],[2,1,0],true,[['Proposed address',lease.ip]]),stage('Request','The laptop broadcasts a DHCP Request asking to use that offered IP address.',[0,1,2],[0,1,2],true,[['Active leases','0']]),stage('Acknowledge','The server sends an ACK confirming the IP lease, subnet mask, and gateway.',[2,1,0],[2,1,0],true,[['Leased address',lease.ip],['Mask','255.255.255.0'],['Gateway',server.gateway]])];
  }
  case '12-router-wireless':return [
   stage('Find the wireless network','The laptop scans nearby airwaves and selects the Classroom Wi-Fi SSID.',[0,1]),
   stage(fault?'Authentication fails':'Authenticate and associate',fault?'The Wi-Fi password is wrong, so the router rejects the wireless connection.':'The router verifies the WPA2/WPA3 passphrase and connects the laptop to Wi-Fi.',[0,1],[],!fault),
   ...(fault?[]:[stage('Obtain configuration','Once connected to Wi-Fi, the laptop receives an IP address lease from the router.',[1,0],[1,0]),stage('Use the routed connection','The wireless router forwards the laptop traffic out to the Internet provider.',[0,1,2],[0,1,2])])];
  case '13-file-printer-sharing':{
   const outcome=sharing({share:1,ntfs:2,action:fault?'Write':'Read'}),allowed=outcome.startsWith('Allowed');
   return [stage('Request access',`The logged-in student requests ${fault?'Write':'Read'} access to the shared ClassFiles folder.`,[0,1],[0,1]),stage('Evaluate both permission gates','The host checks both the network Share permission (Read) and NTFS permission (Modify).',[1,2],[],true,[['Share','Read'],['File system','Modify']]),stage(allowed?'The host returns file data':'The host returns access denied',outcome,[1,0],[1,0],allowed,[['Response',allowed?'Requested file data':'Access denied; no file modification']])];
  }
  case '14-network-troubleshooting':return [
   stage('Test the same service by numeric address','Pinging or opening the server by numeric IP (203.0.113.20) succeeds right away.',[0,1],[0,1]),
   stage('Test name resolution','Looking up the website name fails because the DNS server query times out.',[0,2],[0,2],false),
   stage('Narrow the investigation','Because numeric IP works, the cable and gateway are fine—check the DNS settings.',[2],[],false),
   stage('Retest after correcting the identified fault','After fixing the DNS server address, test the website name again to confirm the repair.',[0,1],[0,1])];
  default:throw new Error(`Missing automatic example for ${topic}`);
 }
}
