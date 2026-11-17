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
const profile=id=>{const p=protocolCatalog.find(p=>p.id===id);const portsSummary=p.ports.map(b=>`${b.transport} ${b.number} (${b.role})`).join('; ');return {kind:'concept',title:`${id}: ${p.name}`,lead:p.purpose,paragraphs:[`${p.use} ${p.detail}`,`Default port or identifier: ${portsSummary}.`]};};
const demo=(title,type,lead,guidance,extra={})=>({kind:'demo',title,type,lead,demo:guidance,...extra});
const slides=[
 {kind:'title',title},
 {kind:'objectives',title:'Learning Objectives',lead:'At the end of this discussion, students should be able to:',items:objectives},
 counted('Three different ideas: protocol, service, and port',[
  'Protocol: The shared rulebook that defines how messages look and behave (such as HTTP for web requests or DNS for name lookups).',
  'Service: The background program running on a host or server that listens for incoming requests and sends back useful answers.',
  'Port: The numbered logical doorway (such as TCP 443) that lets one server run several services and steer traffic to the right app.'
 ]),
 counted('Four TCP/IP responsibility groups',[
  'Application (Layer 7): Provides user-facing network services like HTTP, HTTPS, DNS, DHCP, and SSH.',
  'Transport (Layer 4): Delivers data directly between running programs using numbered TCP or UDP ports.',
  'Internet (Layer 3): Handles logical IP addressing, choosing routes across networks, and ICMP diagnostics.',
  'Link (Layer 1–2): Handles physical signals, local Ethernet switching, and ARP MAC-address lookup.'
 ]),
 counted('Two transport services: TCP and UDP',[
  'TCP: Checks delivery carefully—numbers every piece, waits for receipts, and resends anything lost so websites and files arrive intact.',
  'UDP: Sends datagrams right away without waiting for receipts or resends—keeping live video calls, audio, and games responsive.'
 ]),
 demo('Transport delivery with and without loss','osiLayer','Compare TCP and UDP using the same modeled missing data unit.','Select TCP or UDP and a loss condition, then use the delivery steps. Explain ports, recovery, and the difference between transport delivery and application processing.',{layer:4}),
 profile('IP'),
 profile('ARP'),
 demo('ARP resolves the local next hop','protocolArp','Change between a local peer and a remote destination; follow the calculated next-hop explanation.','Choose a local or remote destination. Play or step through request, reply, cache, and frame addressing. Emphasize that a remote IP destination uses the gateway MAC on the first link.'),
 profile('ICMP'),
 profile('DHCP'),
 profile('DNS'),
 profile('HTTP'),
 profile('HTTPS'),
 demo('A web request uses several services','protocolWeb','Follow ARP, classic DNS, IP, TCP, TLS, and HTTP; change a condition to see exactly where the operation differs.','Play the healthy exchange, then compare a DNS failure, certificate failure, and HTTP 503. Pause at each layer boundary and relate the outcome to the evidence.'),
 profile('SSH'),
 demo('Protocol functions and common port directory','protocolDirectory','Inspect all ten core protocols individually, including transport and layer relationships.','Select each protocol and each port binding. Distinguish TCP/UDP port numbers from ICMP protocol identifiers and Ethernet ARP identifiers. Explain SSH remote administration versus web delivery.'),
 {kind:'concept',title:'Read both endpoints, not just one number',paragraphs:[
  'Every active transport connection pairs two endpoints: a client chooses a temporary dynamic port (49152–65535, such as 53001) while sending requests to a server listening on a system or registered port (such as TCP 443 for HTTPS).',
  'System ports (0–1023) identify standard services and registered ports (1024–49151) serve vendor applications. Always verify both service availability and port state separately—a working ping proves IP reachability, not that an application port is open.'
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
