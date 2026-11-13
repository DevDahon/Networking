import {addPresenterNotes} from './createTopic.js';
import {protocolCatalog} from '../simulations/protocolModels.js';

const title='Network Protocols and Services';
const objectives=[
 'Explain how a protocol, a network service, and a transport port differ.',
 'Distinguish TCP, UDP, IP, ARP, and ICMP responsibilities.',
 'Describe common configuration, naming, web, and remote management services.',
 'Identify common server/client ports and compare protected and unprotected service options.',
 'Trace a modeled network exchange and relate its stages to OSI and TCP/IP.'
];
const counted=(title,items)=>({kind:'concept',title,items,expectedCount:items.length});
const profile=id=>{const p=protocolCatalog.find(p=>p.id===id);return {kind:'concept',title:`${id}: ${p.name}`,lead:p.purpose,items:[`Practical application: ${p.use}`,p.detail,...p.ports.map(b=>`${b.transport} ${b.number}: ${b.role}.`)]};};
const demo=(title,type,lead,guidance,extra={})=>({kind:'demo',title,type,lead,demo:guidance,...extra});
const slides=[
 {kind:'title',title},
 {kind:'objectives',title:'Learning Objectives',lead:'At the end of this discussion, students should be able to:',items:objectives},
 counted('Three different ideas: protocol, service, and port',[
  'Protocol: The agreed rules and format for messages (such as HTTP or DNS).',
  'Service: The running program that answers requests (such as a web server).',
  'Port: The numeric door (such as TCP 443) that directs traffic to the right app.'
 ]),
 counted('Four TCP/IP responsibility groups',[
  'Application (Layer 7): User and network services like HTTP, HTTPS, DNS, DHCP, and SSH.',
  'Transport (Layer 4): Process-to-process delivery using TCP and UDP port numbers.',
  'Internet (Layer 3): Logical IP addressing, routing, and ICMP diagnostic messages.',
  'Link (Layer 1–2): Local Ethernet framing and ARP MAC address resolution.'
 ]),
 counted('Two transport services: TCP and UDP',[
  'TCP: Reliable, ordered delivery that numbers bytes, acknowledges receipts, and resends lost data.',
  'UDP: Fast, low-overhead delivery without built-in acknowledgments or retransmission.'
 ]),
 demo('Transport delivery with and without loss','osiLayer','Compare TCP and UDP using the same modeled missing data unit.','Select TCP or UDP and a loss condition, then use the delivery steps. Explain ports, recovery, and the difference between transport delivery and application processing.',{layer:4}),
 profile('IP'),
 profile('ARP'),
 demo('ARP resolves the local next hop','protocolArp','Change between a local peer and a remote destination; follow the calculated next-hop explanation.','Choose a local or remote destination. Play or step through request, reply, cache, and frame addressing. Emphasize that a remote IP destination uses the gateway MAC on the first link.'),
 profile('ICMP'),
 profile('DHCP'),
 demo('DHCP configuration and its two UDP endpoints','dhcp','DHCPv4 uses server UDP 67 and client UDP 68; a lease becomes active at ACK.','Run DORA manually or automatically. Inspect options, active leases, renewal and release; explain that DHCP is an Application protocol using UDP.'),
 profile('DNS'),
 profile('HTTP'),
 profile('HTTPS'),
 demo('A web request uses several services','protocolWeb','Follow ARP, classic DNS, IP, TCP, TLS, and HTTP; change a condition to see exactly where the operation differs.','Play the healthy exchange, then compare a DNS failure, certificate failure, and HTTP 503. Pause at each layer boundary and relate the outcome to the evidence.'),
 profile('SSH'),
 demo('Protocol functions and common port directory','protocolDirectory','Inspect all ten core protocols individually, including transport and layer relationships.','Select each protocol and each port binding. Distinguish TCP/UDP port numbers from ICMP protocol identifiers and Ethernet ARP identifiers. Explain SSH remote administration versus web delivery.'),
 {kind:'concept',title:'Read both endpoints, not just one number',items:[
  'Source & destination ports: A client uses a random high port (e.g., 53001) to reach a server port (e.g., 443).',
  'Port ranges: System ports (0–1023), registered ports (1024–49151), and dynamic client ports (49152–65535).',
  'Separate checks: A working ping proves IP reachability, not that the web server port is open.'
 ]},
 {kind:'summary',title:'Summary of the Discussion',items:[
  'Protocols, Services & Ports: Protocols set rules, services run apps, and ports direct traffic to the right process.',
  'TCP vs. UDP: TCP guarantees reliable, ordered delivery; UDP sends fast, low-overhead datagrams.',
  'Core Infrastructure: IP routes packets, ARP finds local MAC addresses, DNS resolves names, and DHCP assigns IPs.',
  'Secure Services: Prefer encrypted HTTPS (443) and SSH (22) over cleartext HTTP (80) and Telnet (23).'
 ]}
];
addPresenterNotes(slides,{title,description:'Common protocols cooperate across layers to provide useful network services.',example:'A classroom laptop obtains configuration, looks up the school server, downloads a protected handout, and connects securely via SSH.'});
export default {id:'network-protocols-services',title,icon:'Globe',description:'Follow common network services, compare their functions and security, and inspect transport ports through controlled demonstrations.',objectives,slides};
