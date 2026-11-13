import {moreTopologyExamples} from './topologyExamples.js';
import {addPresenterNotes} from './createTopic.js';
const node=(label,x,y,detail='',kind='computer')=>({label,x,y,detail,kind});
const chain=(labels,details=[])=>{const step=labels.length>1?700/(labels.length-1):0;return {nodes:labels.map((label,i)=>node(label,Math.round(150+i*step),145,details[i]||'',i===1?'network':'computer')),edges:labels.slice(1).map((_,i)=>[i,i+1])};};
const example=(title,lead,diagram,items)=>({kind:'example',title,lead,diagram,items});
export const localClassroom={nodes:[node('Switch',500,165,'Six occupied ports','switch'),...Array.from({length:5},(_,i)=>node(`Computer ${i+1}`,100+i*200,45)),node('Network printer',500,285,'Shared by five computers','printer')],edges:Array.from({length:6},(_,i)=>[0,i+1])};
const coverageDescriptions={
 'Personal Area Network (PAN)':'A Personal Area Network connects devices around one person. It usually covers a short range and can use Bluetooth or wired connections.',
 'Local Area Network (LAN)':'A Local Area Network connects devices within a limited area, such as a room, building, or campus. It lets those devices exchange data and share resources through wired or wireless links.',
 'Metropolitan Area Network (MAN)':'A Metropolitan Area Network connects networks across a city or metropolitan area. It can link sites such as library branches, municipal offices, or campuses within that area.',
 'Wide Area Network (WAN)':'A Wide Area Network connects networks across large geographic areas, such as regions or countries. Organizations commonly use provider services to link their distant sites.'
};
const coverageExamples=[
 ['Personal Area Network (PAN)','A phone and its nearby accessories',chain(['Phone','Bluetooth link','Headset'],['Personal device','Short-range radio','Audio accessory']),['Bluetooth link: The phone streams audio directly to the wireless headset.','Personal range: Connects devices around one person without needing Internet access.']],
 ['Local Area Network (LAN)','Five computers share one network printer',localClassroom,['Star switch connections: Five computers and one printer each plug into the central switch.','Local resource sharing: Any computer can print through the switch without needing Internet.']],
 ['Metropolitan Area Network (MAN)','Library branches across one city',chain(['North library','City network','South library'],['City branch','Metropolitan links','City branch']),['City-wide backbone: High-speed metro links connect library branches across the city.','Connected LANs: Each branch keeps its own LAN while sharing city-wide library records.']],
 ['Wide Area Network (WAN)','School campuses in different regions',chain(['Manila campus','Provider network','Cebu campus'],['Local campus network','Long-distance service','Local campus network']),['Long-distance links: Telecom provider lines connect campus routers across distant regions.','Router-to-router: WAN links join separate campus LANs over long distances.']]
];
const definitions={
 '01-introduction-to-networking':[],
 '03-network-topologies':[
  ['Six network topologies',example('Example: a six-endpoint star','Every endpoint has its own connection to the central switch.',localClassroom,['Independent spokes: Five computers and one printer each use their own cable to the switch.','Fault isolation: One unplugged cable affects only that PC, while a dead switch stops all six devices.'])]
 ],
 '04-network-devices':[
  ['Joining networks and media',example('Example: the switch and router have different jobs','Local printing and visiting a remote website follow different paths.',{nodes:[node('Computer',100,145),node('Switch',340,145,'Local frames','switch'),node('Printer',340,285,'Local destination','printer'),node('Router',600,145,'Next network','network'),node('Provider',870,145,'Remote networks','network')],edges:[[0,1],[1,2],[1,3],[3,4]]},['Switch (Local LAN): Sends print jobs directly from the computer to the classroom printer.','Router (Outside WAN): Forwards web traffic out to the Internet Service Provider.'])]
 ],
 '06-network-cables-media':[],
 '07-rj45-crimping':[
  ['Straight-through and crossover arrangements',example('Example: a straight-through patch cable','Both cable ends use the same wiring standard: Pin 1 connects to Pin 1, Pin 2 to Pin 2, all the way to Pin 8.',chain(['Patch cord End A','Testing fixture','Patch cord End B'],['T568B pinout','Eight-pin continuity','T568B pinout']),['Standard patch cord: Connects different devices, such as a computer to a switch.','1-to-1 pin match: Both ends use the same color order (T568B to T568B) so Pin 1 meets Pin 1.'])]
 ],
 '08-ip-addressing':[
  ['Understanding CIDR prefix notation',example('Example: read one classroom address','The address, prefix, and gateway describe different parts of the configuration.',chain(['Computer','Local gateway','Remote network'],['192.168.10.25/24','192.168.10.1','Reached through routing']),['Local /24 subnet: Places this PC in 192.168.10.0/24 with usable hosts from .1 to .254.','Local vs. remote: Peer 192.168.10.40 is reached directly; outside IPs go to gateway 192.168.10.1.'])]
 ],
 '10-static-ip':[
  ['Same subnet is a two-sided decision',example('Example: two manually configured classroom computers','Both hosts use different usable addresses in the same subnet.',chain(['Computer A','Ethernet switch','Computer B'],['192.168.1.10/24','Local connection','192.168.1.20/24']),['Same local subnet: Both PCs are in 192.168.1.0/24, so they talk directly through the switch.','Unique host IPs: Each PC has a different host number (.10 and .20) with no IP conflict.'])]
 ],
 'network-protocols-services':[
  ['A web request uses several services',example('Example: open a protected school website','Several specialized protocols cooperate in one familiar operation.',{nodes:[node('Browser',150,145,'school.example'),node('Name resolver',600,60,'Return the server address','network'),node('Web server',600,260,'Protected web response')],edges:[[0,1],[0,2]]},['Step 1 (DNS): The browser asks the DNS server for the IP address of school.example.','Step 2 (HTTPS): The browser connects directly to the web server on TCP port 443 using TLS encryption.'])]
 ],
 '11-dhcp':[
  ['Four messages in the initial DHCP exchange',example('Example: a laptop receives a lease','Dynamic Host Configuration Protocol (DHCP) supplies a usable configuration.',chain(['New laptop','Local network','DHCP server'],['Initially unconfigured','Discover → Offer → Request → ACK','Pool: .100 through .103']),['DORA exchange: The laptop broadcasts Discover, gets an Offer (.100), sends Request, and receives ACK.','Complete settings: Along with the IP, the server provides the subnet mask, default gateway, and DNS.'])]
 ],
 '12-router-wireless':[
  ['Wireless identity and protection',example('Example: a laptop joins classroom Wi-Fi','Wireless attachment and Internet service are separate conditions.',chain(['Laptop','Wireless gateway','Provider network'],['SSID: Classroom','Authentication and routing','Internet access']),['Wi-Fi association: The laptop selects the Classroom SSID, enters the WPA2/WPA3 password, and gets an IP.','Separate links: Local Wi-Fi can stay connected even if the router’s ISP Internet link goes down.'])]
 ],
 '13-file-printer-sharing':[
  ['Two permission gates for remote file access',example('Example: students read a shared reference folder','The share and file-system permissions both apply to remote access.',{nodes:[node('Student computer',130,145,'Authenticated student'),node('Sharing host',470,145,'Serves the shared folder'),node('ClassFiles folder',800,145,'Stored on the sharing host','resource')],edges:[[0,1]],resourceEdges:[[1,2]]},['Two permission checks: The host checks both Share permissions (Read) and NTFS permissions (Modify).','Most restrictive wins: Because the Share is Read-only, students can open files but cannot edit them.'])]
 ],
 '14-network-troubleshooting':[
  ['Six Windows diagnostic commands',example('Example: numeric access works but a name fails','Compare evidence before choosing a repair.',{nodes:[node('Computer',150,145,'Numeric test succeeds'),node('Reachable server',600,60,'203.0.113.20 responds'),node('Name resolver',600,260,'Name query times out')],edges:[[0,1],[0,2]]},['Clue: Reaching 203.0.113.20 by IP proves the cable, switch, and router are working.','Root cause: Because only the website name fails, fix the DNS server setting instead of swapping cables.'])]
 ]
};
export function withVisualExamples(topic){
 const slides=[];
 const defs=definitions[topic.id]||[];
 for(const slide of topic.slides){
  slides.push(slide);
  if(slide.title==='Four network coverage types'){
   coverageExamples.forEach(([name,title,diagram,items])=>{
    slides.push({...example(name,coverageDescriptions[name],diagram,items),exampleTitle:`Example: ${title}`,parentTrigger:slide.title});
   });
  }else{
   const match=defs.find(([trigger])=>trigger===slide.title);
   if(match){
    slides.push({...match[1],parentTrigger:slide.title,...(topic.id==='03-network-topologies'?{exampleTitle:'Example: five computers and one printer around a switch'}:{})});
    if(topic.id==='03-network-topologies')slides.push(...moreTopologyExamples().map(ex=>({...ex,parentTrigger:slide.title})));
   }
  }
 }
 if(!['osi-reference-model','06-network-cables-media','15-network-security'].includes(topic.id)&&!slides.some(s=>s.kind==='example'))throw new Error(`Missing visual example for ${topic.id}`);
 addPresenterNotes(slides.filter(s=>s.kind==='example'||!s.notes),{title:topic.title,description:topic.description,example:topic.description});
 return {...topic,slides};
}
