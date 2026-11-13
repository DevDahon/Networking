import {contains} from '../utils/network.js';
const port=(transport,number,role)=>({transport,number,role});
export const protocolCatalog=[
 {id:'TCP',name:'Transmission Control Protocol',layer:'OSI 4 · TCP/IP Transport',purpose:'Delivers an ordered reliable byte stream between processes, using sequence numbers, acknowledgments, and retransmission.',use:'Web, email, remote access, and file transfers that require guaranteed delivery.',detail:'Key traits: Connection-oriented using IPv4 protocol number 6. Resends lost segments automatically.',ports:[]},
 {id:'UDP',name:'User Datagram Protocol',layer:'OSI 4 · TCP/IP Transport',purpose:'Carries independent datagrams between processes with ports and low protocol overhead.',use:'DNS lookups, DHCP leases, live video/voice, and fast gaming traffic.',detail:'Key traits: Connectionless using IPv4 protocol number 17. No built-in retransmission or ordering.',ports:[]},
 {id:'IP',name:'Internet Protocol',layer:'OSI 3 · TCP/IP Internet',purpose:'Supplies logical addressing and packet delivery across interconnected networks.',use:'Addresses source and destination hosts so routers can forward packets across networks.',detail:'Key traits: Best-effort packet delivery without ports. IPv4 uses 32-bit addresses; IPv6 uses 128-bit addresses.',ports:[]},
 {id:'ARP',name:'Address Resolution Protocol',layer:'Local-link boundary · TCP/IP Link; commonly associated with OSI 2',purpose:'Resolves a next-hop IPv4 address to a link-layer address on the local link.',use:'Finds a local peer MAC address, or the router gateway MAC when sending to a remote network.',detail:'Key traits: Operates directly over Ethernet (EtherType 0x0806) with no TCP/UDP port. IPv6 uses Neighbor Discovery instead.',ports:[]},
 {id:'ICMP',name:'Internet Control Message Protocol',layer:'OSI 3 · TCP/IP Internet',purpose:'Carries IP-related error and diagnostic messages, such as Echo Reply or Time Exceeded.',use:'Powers ping (Echo Request/Reply) and tracert (Time Exceeded hop reports).',detail:'Key traits: Uses IP protocol number 1 with no TCP/UDP port. Reports network errors rather than carrying user files.',ports:[]},
 {id:'DHCP',name:'Dynamic Host Configuration Protocol',layer:'OSI 7 · TCP/IP Application',purpose:'Leases IPv4 configuration and supplies options such as mask, gateway, and DNS.',use:'Automatically assigns IP addresses, masks, gateways, and DNS to client devices.',detail:'Key traits: Uses the four-step DORA exchange (Discover, Offer, Request, ACK) over UDP.',ports:[port('UDP',67,'DHCPv4 server'),port('UDP',68,'DHCPv4 client')]},
 {id:'DNS',name:'Domain Name System',layer:'OSI 7 · TCP/IP Application',purpose:'Resolves names to records, including IPv4 A and IPv6 AAAA addresses.',use:'Translates human-friendly domain names (like school.edu) into numeric IP addresses.',detail:'Key traits: Uses port 53 over both UDP (standard queries) and TCP (large replies and zone transfers).',ports:[port('UDP',53,'Classic DNS queries/responses'),port('TCP',53,'Classic DNS over a TCP connection')]},
 {id:'HTTP',name:'Hypertext Transfer Protocol',layer:'OSI 7 · TCP/IP Application',purpose:'Defines web requests and responses, methods, status codes, and resource representations.',use:'Requests and delivers unencrypted web pages and API data between browsers and servers.',detail:'Key traits: Sends data in cleartext without TLS encryption. Avoid using plain HTTP for logins.',ports:[port('TCP',80,'Conventional unencrypted HTTP service')]},
 {id:'HTTPS',name:'HTTP protected by TLS',layer:'OSI 7 service · TCP/IP Application; TLS spans security/representation responsibilities',purpose:'Protects HTTP with authenticated encryption and server-certificate validation.',use:'Secures logins, payments, and everyday web browsing against eavesdropping and tampering.',detail:'Key traits: Encrypts HTTP traffic with TLS certificates over TCP 443 (or UDP 443 for HTTP/3 QUIC).',ports:[port('TCP',443,'HTTPS using HTTP/1.1 or HTTP/2'),port('UDP',443,'HTTP/3 over QUIC; common HTTPS endpoint')]},
 {id:'SSH',name:'Secure Shell',layer:'OSI 7 · TCP/IP Application',purpose:'Provides authenticated encrypted remote access and channels.',use:'Securely manages routers, switches, and servers from a remote command line.',detail:'Key traits: Replaces insecure cleartext Telnet with strong encryption and host key verification.',ports:[port('TCP',22,'Conventional SSH server endpoint')]}
];

export function arpJourney(destination='192.168.2.20'){
 const local=contains(destination,'192.168.1.10',24),nextHop=local?destination:'192.168.1.1',mac=local?'02:00:00:00:00:20':'02:00:00:00:00:01';
 return [
  {active:0,title:'Choose the next hop',text:`PC A is 192.168.1.10/24. Destination ${destination} is ${local?'local':'remote'}, so its next-hop IPv4 address is ${nextHop}.`},
  {active:1,title:'Broadcast an ARP Request',text:`On this Ethernet LAN, PC A asks which interface has ${nextHop}; the request is a local broadcast, not a TCP/UDP message.`},
  {active:2,title:'Receive an ARP Reply',text:`The ${local?'peer':'gateway'} supplies ${mac} as its local Ethernet address in this modeled reply.`},
  {active:0,title:'Cache the neighbor mapping',text:`PC A records ${nextHop} → ${mac}. A real ARP cache ages and may already contain a usable entry.`},
  {active:2,title:'Address the Ethernet frame',text:`Frame destination MAC: ${mac}. IP packet destination: ${destination}. ${local?'The peer receives the local frame.':'The gateway receives the local frame and routes toward the remote network; the remote server MAC is not requested here.'}`}
 ];
}
export function webJourney({dns=true,certificate=true,service=true}={}){
 const steps=[
  {active:0,title:'Request a named resource',text:'A browser opens https://classroom.example/handout. This teaching path uses a fresh name lookup and HTTP/1.1 over TCP/TLS.'},
  {active:1,title:'Resolve the local next hop',text:'On a working 192.168.1.0/24 LAN, ARP resolves the local resolver/gateway 192.168.1.1 when the neighbor cache is empty.'},
  {active:1,title:'Query DNS',text:dns?'Client UDP 53000 → resolver UDP 53 asks for the server address. TCP 53 is also supported by classic DNS.':'The resolver does not respond in this modeled fault. Name resolution stops here; no web connection is attempted.',ok:dns}
 ];
 if(!dns)return steps;
 steps.push({active:0,title:'Receive the DNS answer',text:'The modeled resolver returns 203.0.113.20, a documentation address used only as a fictional server. No real DNS query is sent.'},
  {active:1,title:'Forward toward the remote network',text:'The packet names destination IP 203.0.113.20; its first Ethernet frame targets the gateway MAC. Working routes and a reachable server are assumed.'},
  {active:2,title:'Establish TCP',text:'Client TCP 53001 connects to server TCP 443. A port identifies a transport endpoint, while an IP address identifies the interface.'},
  {active:2,title:'Negotiate TLS and verify identity',text:certificate?'The modeled TLS handshake succeeds and the certificate matches the requested name. HTTP content can now be protected.':'Certificate validation fails in the model. The browser stops before sending the protected HTTP request; this demo does not bypass validation.',ok:certificate});
 if(!certificate)return steps;
 steps.push({active:2,title:'Send the protected HTTP request',text:'The browser sends GET /handout inside the TLS-protected connection. HTTPS is HTTP with transport security, not a replacement for DNS or IP.'},
  {active:0,title:'Interpret the HTTP response',text:service?'HTTP 200: the modeled service returns the handout. DNS, routing, TCP, TLS, and the application each contributed a different function.':'HTTP 503: TCP and TLS worked, but the application service is unavailable. An application response is different evidence from a failed link.',ok:service});
 return steps;
}
export function mailJourney({reader='IMAP',keepCopy=true}={}){
 const imap=reader==='IMAP';
 return [
  {active:0,title:'Compose a message',text:'The sender’s mail client prepares a message for the recipient.'},
  {active:1,title:'Submit with SMTP',text:'The client connects to TCP 587 on its submission server, upgrades using STARTTLS, then authenticates and submits in this protected example. TCP 465 is the implicit-TLS alternative.'},
  {active:2,title:'Relay to the recipient server',text:'Mail servers relay using SMTP, commonly TCP 25. DNS MX records help identify mail exchangers. TLS use between relay servers depends on negotiated capability and policy.'},
  {active:2,title:'Store in the recipient mailbox',text:'The recipient server accepts and stores the message. SMTP submission/relay does not read the recipient’s inbox.'},
  {active:0,title:`Read using ${reader}`,text:imap?'The recipient uses IMAP over implicit TLS on TCP 993 to access server-held folders and synchronize state.':'The recipient uses POP3 over implicit TLS on TCP 995 to retrieve the message.'},
  {active:0,title:'Show the resulting mailbox state',text:imap?'In this example the server copy remains and mailbox state can synchronize across clients. IMAP also supports explicit deletion/expunging.':keepCopy?'The client downloaded the message and is configured to leave the server copy. POP3 does not inherently mean immediate deletion.':'The client downloaded the message and requests deletion according to this example’s retention setting; the server copy is removed when that operation completes.'}
 ];
}
