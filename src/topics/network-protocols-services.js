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
const counted=(title,items,footnote)=>({kind:'concept',title,items,expectedCount:items.length,...(footnote?{footnote}:{})});
const profile=id=>{const p=protocolCatalog.find(p=>p.id===id);return {kind:'concept',title:`${id}: ${p.name}`,lead:p.purpose,items:[`Practical application: ${p.use}`,p.detail,...p.ports.map(b=>`${b.transport} ${b.number}: ${b.role}.`)],footnote:p.layer};};
const demo=(title,type,lead,guidance,extra={})=>({kind:'demo',title,type,lead,demo:guidance,...extra});
const slides=[
 {kind:'title',title},
 {kind:'objectives',title:'Learning Objectives',lead:'At the end of this discussion, students should be able to:',items:objectives},
 counted('Three different ideas: protocol, service, and port',[
  'Protocol: agreed message formats and behavior, such as DNS queries and replies.',
  'Service: a useful function provided by a running system, such as a DNS resolver answering names.',
  'Port: a TCP or UDP endpoint number used to direct traffic to a process; it is not a physical Ethernet socket.'
 ],'A familiar port suggests a convention; it does not prove which program is listening or whether that program is safe.'),
 counted('Four TCP/IP responsibility groups',[
  'Application: DHCP, DNS, HTTP, HTTPS, and SSH provide user-facing and network configuration services; commonly associated with OSI 7.',
  'Transport: TCP and UDP use process ports; commonly associated with OSI 4.',
  'Internet: IP supplies logical delivery and ICMP supplies related diagnostics; commonly associated with OSI 3.',
  'Link: local framing and physical transmission; ARP supports IPv4 neighbor resolution at this local-link boundary.'
 ],'OSI/TCP-IP mappings are approximate. Advanced enterprise protocols like SNMP, NTP, and dedicated mail servers are studied in Networking II.'),
 counted('Two transport services: TCP and UDP',[
  'TCP: connection-oriented, ordered reliable bytes, with acknowledgments and retransmission. Useful when the application needs this stream service.',
  'UDP: connectionless datagrams without built-in delivery or ordering guarantees. Useful when a small exchange or application-controlled behavior fits the task.'
 ],'Neither “UDP is always faster” nor “TCP proves the application processed the request” is a reliable conclusion. Application protocols can add recovery above UDP.'),
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
  'A normal client often uses a temporary source port, such as TCP 53001, to contact a server listening on TCP 443. The response returns to that client endpoint.',
  'The connection context includes transport plus source/destination addresses and ports. TCP and UDP can use the same numeric port independently.',
  'System ports are 0–1023, user/registered ports 1024–49151, and dynamic/private ports 49152–65535. Port 0 is reserved; operating systems may choose temporary ports from implementation-specific ranges.',
  'A reachable IP, an open transport endpoint, TLS validation, and a working application are separate observations. Testing one does not prove all the others.'
 ]},
 {kind:'summary',title:'Summary of the Discussion',items:[
  'A protocol defines exchange rules; a running service provides a function; TCP/UDP ports identify process endpoints.',
  'TCP supplies ordered reliable bytes; UDP supplies datagrams without its own delivery guarantee.',
  'IP handles logical delivery, ARP resolves a local IPv4 next-hop MAC, and ICMP carries IP-related diagnostics.',
  'DHCP supplies configuration and DNS resolves names; common ports must be read together with their transports.',
  'HTTP and HTTPS power web services; SSH provides encrypted remote CLI administration on TCP 22.',
  'Specialized enterprise protocols (SNMP, NTP, SMTP, IMAP/POP3, and file-sharing) build on these foundations in Networking II.'
 ]}
];
addPresenterNotes(slides,{title,description:'Common protocols cooperate across layers to provide useful network services.',example:'A classroom laptop obtains configuration, looks up the school server, downloads a protected handout, and connects securely via SSH.'});
export default {id:'network-protocols-services',title,icon:'Globe',description:'Follow common network services, compare their functions and security, and inspect transport ports through controlled demonstrations.',objectives,slides};
