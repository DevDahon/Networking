import {moreTopologyExamples} from './topologyExamples.js';
import {addPresenterNotes} from './createTopic.js';
const node=(label,x,y,detail='',kind='computer')=>({label,x,y,detail,kind});
const chain=(labels,details=[])=>({nodes:labels.map((label,i)=>node(label,130+i*240,145,details[i]||'',i===1?'network':'computer')),edges:labels.slice(1).map((_,i)=>[i,i+1])});
const example=(title,lead,diagram,items)=>({kind:'example',title,lead,diagram,items});
export const localClassroom={nodes:[node('Switch',500,165,'Six occupied ports','switch'),...Array.from({length:5},(_,i)=>node(`Computer ${i+1}`,100+i*200,45)),node('Network printer',500,285,'Shared by five computers','printer')],edges:Array.from({length:6},(_,i)=>[0,i+1])};
const coverageDescriptions={
 'Personal Area Network (PAN)':'A Personal Area Network connects devices around one person. It usually covers a short range and can use Bluetooth or wired connections.',
 'Local Area Network (LAN)':'A Local Area Network connects devices within a limited area, such as a room, building, or campus. It lets those devices exchange data and share resources through wired or wireless links.',
 'Metropolitan Area Network (MAN)':'A Metropolitan Area Network connects networks across a city or metropolitan area. It can link sites such as library branches, municipal offices, or campuses within that area.',
 'Wide Area Network (WAN)':'A Wide Area Network connects networks across large geographic areas, such as regions or countries. Organizations commonly use provider services to link their distant sites.'
};
const coverageExamples=[
 ['Personal Area Network (PAN)','A phone and its nearby accessories',chain(['Phone','Bluetooth link','Headset'],['Personal device','Short-range radio','Audio accessory']),['The phone sends audio to the headset over Bluetooth.','These devices form a network around one person; this does not require an Internet connection.']],
 ['Local Area Network (LAN)','Five computers share one network printer',localClassroom,['Each of the five computers and the printer has its own Ethernet cable to the switch: six occupied switch ports.','The computers can send print jobs to the reachable printer. Internet access is unnecessary for this local exchange.']],
 ['Metropolitan Area Network (MAN)','Library branches across one city',chain(['North library','City network','South library'],['City branch','Metropolitan links','City branch']),['A city-operated network interconnects library branches across a metropolitan area.','Each branch also has its own local network; the city links connect those separate sites.']],
 ['Wide Area Network (WAN)','School campuses in different regions',chain(['Manila campus','Provider network','Cebu campus'],['Local campus network','Long-distance service','Local campus network']),['A provider service joins campuses in different regions. Routers connect the campus networks to that service.','The wide-area link joins local networks; it does not replace their local switches or wireless access points.']]
];
const definitions={
 '01-introduction-to-networking':[
  ['Five parts of a conversation',example('Example: one printer, five connected computers','A classroom network shares a resource among several devices.',localClassroom,['Computer 3 sends a document through the switch to the network printer.','The computer is the sender, the printer is the receiver, and the print data is the message. Ethernet cables carry the exchange.'])]
 ],
 '03-network-topologies':[
  ['Six network topologies',example('Example: a six-endpoint star','Every endpoint has its own connection to the central switch.',localClassroom,['Five computers and one printer form six spokes around one switch.','Unplugging Computer 2’s cable isolates that computer. A failed central switch affects all six endpoints.'])]
 ],
 '04-network-devices':[
  ['Joining networks and media',example('Example: the switch and router have different jobs','Local printing and visiting a remote website follow different paths.',{nodes:[node('Computer',100,145),node('Switch',340,145,'Local frames','switch'),node('Printer',340,285,'Local destination','printer'),node('Router',600,145,'Next network','network'),node('Provider',870,145,'Remote networks','network')],edges:[[0,1],[1,2],[1,3],[3,4]]},['Local print traffic travels from the computer through the switch to the printer.','Traffic to a remote network goes through the switch to the router, which chooses an appropriate next hop.'])]
 ],
 '06-network-cables-media':[],
 '08-ip-addressing':[
  ['Prefix, gateway, and DNS do different jobs',example('Example: read one classroom address','The address, prefix, and gateway describe different parts of the configuration.',chain(['Computer','Local gateway','Remote network'],['192.168.10.25/24','192.168.10.1','Reached through routing']),['The /24 prefix places this host in 192.168.10.0/24. Ordinary usable host addresses run from .1 through .254.','A peer at 192.168.10.40 is local; a destination outside this subnet needs an appropriate route, often through the configured gateway.'])],
  ['Same subnet is a two-sided decision',example('Example: two manually configured classroom computers','Both hosts use different usable addresses in the same subnet.',chain(['Computer A','Ethernet switch','Computer B'],['192.168.1.10/24','Local connection','192.168.1.20/24']),['Both hosts calculate 192.168.1.0/24 as their local network, so this exchange does not require a router.','The addresses must be unique and the link and host policy must permit communication. A successful address calculation alone does not prove reachability.'])]
 ],
 'network-protocols-services':[
  ['A web request uses several services',example('Example: open a protected school website','Several specialized protocols cooperate in one familiar operation.',{nodes:[node('Browser',150,145,'school.example'),node('Name resolver',600,60,'Return the server address','network'),node('Web server',600,260,'Protected web response')],edges:[[0,1],[0,2]]},['Domain Name System (DNS) resolves the server name. For a common HTTP/1.1-over-TLS example, Transmission Control Protocol (TCP) connects to server port 443 and Transport Layer Security (TLS) protects the exchange.','Hypertext Transfer Protocol Secure (HTTPS) carries the web request and response inside that protected connection. The resolver is not a relay for the web page.'])]
 ],
 '11-dhcp':[
  ['Four messages in the initial DHCP exchange',example('Example: a laptop receives a lease','Dynamic Host Configuration Protocol (DHCP) supplies a usable configuration.',chain(['New laptop','Local network','DHCP server'],['Initially unconfigured','Discover → Offer → Request → ACK','Pool: .100 through .103']),['The laptop discovers the service, receives an offer for 192.168.1.100, requests it, and receives an acknowledgment committing the lease.','The server also supplies subnet mask, gateway, resolver information, and lease lifetime. Another active client must receive a different available address.'])]
 ],
 '12-router-wireless':[
  ['Wireless identity and protection',example('Example: a laptop joins classroom Wi-Fi','Wireless attachment and Internet service are separate conditions.',chain(['Laptop','Wireless gateway','Provider network'],['SSID: Classroom','Authentication and routing','Internet access']),['The laptop selects Classroom and authenticates using the configured security method. It then obtains a matching address configuration.','Local services may work while the provider connection is down. Guest isolation can block access to staff resources even when Internet access works.'])]
 ],
 '13-file-printer-sharing':[
  ['Two permission gates for remote file access',example('Example: students read a shared reference folder','The share and file-system permissions both apply to remote access.',{nodes:[node('Student computer',130,145,'Authenticated student'),node('Sharing host',470,145,'Serves the shared folder'),node('ClassFiles folder',800,145,'Stored on the sharing host','resource')],edges:[[0,1]],resourceEdges:[[1,2]]},['Read at the share and Modify at the file system permit reading but do not permit remote edits in this simplified example.','Effective access is limited by both permission gates. A reachable host does not itself grant access to its files.'])]
 ],
 '14-network-troubleshooting':[
  ['Six Windows diagnostic commands',example('Example: numeric access works but a name fails','Compare evidence before choosing a repair.',{nodes:[node('Computer',150,145,'Numeric test succeeds'),node('Reachable server',600,60,'203.0.113.20 responds'),node('Name resolver',600,260,'Name query times out')],edges:[[0,1],[0,2]]},['If the same service works using its numeric address while name resolution times out, investigate resolver settings and name-service reachability.','Do not replace a working cable based on this symptom alone. Correct the identified resolver fault, then repeat the original name-based request.'])]
 ]
};
export function withVisualExamples(topic){
 const slides=[];
 const defs=definitions[topic.id]||[];
 for(const slide of topic.slides){
  slides.push(slide);
  if(slide.title==='Four network coverage types'){
   coverageExamples.forEach(([name,title,diagram,items])=>{
    slides.push({...example(name,coverageDescriptions[name],diagram,items),exampleTitle:`Example: ${title}`});
   });
  }else{
   const match=defs.find(([trigger])=>trigger===slide.title);
   if(match){
    slides.push({...match[1],...(topic.id==='03-network-topologies'?{exampleTitle:'Example: five computers and one printer around a switch'}:{})});
    if(topic.id==='03-network-topologies')slides.push(...moreTopologyExamples());
   }
  }
 }
 if(!['osi-reference-model','06-network-cables-media'].includes(topic.id)&&!slides.some(s=>s.kind==='example'))throw new Error(`Missing visual example for ${topic.id}`);
 addPresenterNotes(slides.filter(s=>s.kind==='example'||!s.notes),{title:topic.title,description:topic.description,example:topic.description});
 return {...topic,slides};
}
