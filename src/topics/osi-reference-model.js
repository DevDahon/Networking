import {addPresenterNotes} from './createTopic.js';
import {osiLayers} from '../simulations/osiModel.js';

const objectives=[
 'Define the OSI reference model and explain the responsibility of each layer.',
 'Distinguish frames, packets, TCP segments, and UDP datagrams.',
 'Follow encapsulation and decapsulation as data moves through the protocol stack.',
 'Explain MAC versus IP addressing and local versus remote next-hop delivery.',
 'Compare OSI with TCP/IP and use layer-based evidence to investigate network faults.'
];

const slides=[
 {kind:'title',title:'Open Systems Interconnection (OSI) Reference Model and Network Communication',ask:'When a webpage fails, how can we decide where to begin looking?',emphasis:'OSI is a reference model for responsibilities, not a protocol that transmits a message.',demo:'Point to the stack from 7 to 1. Explain that the sender uses lower-layer services and the receiver interprets the result.'},
 {kind:'objectives',title:'Learning Objectives',lead:'At the end of this discussion, students should be able to:',items:objectives,ask:'Which objective would help you explain why a cable replacement does not fix every network problem?',emphasis:'Ask for an explanation and a tested example, not only a memorized list.',demo:'Invite learners to choose an objective they want to demonstrate before the lesson ends.'},
 {kind:'concept',title:'What is the OSI model?',lead:'Open Systems Interconnection is a reference model for describing communication responsibilities. Layers let us discuss one part of a complicated system at a time.',type:'osiIntroduction',ask:'Could a reference diagram deliver a message without an implemented protocol?',emphasis:'It helps learning, design discussions, and troubleshooting. It is not itself a network protocol or a mandatory seven-step program.',demo:'Use the two-device drawing. Trace a message from sender to receiver and ask which responsibilities are needed at both ends.'},
 {kind:'demo',title:'Seven layers, one conversation',lead:'Select a layer to reveal its function, examples, and place in the stack.',type:'osiStack',ask:'Why do the lower layers still matter when we are using an application?',emphasis:'Top to bottom: Application, Presentation, Session, Transport, Network, Data Link, Physical.',demo:'Select Network, then Data Link. Compare remote logical addressing with local-link delivery. Offer “All People Seem To Need Data Processing” only as an optional memory aid.'},
 ...osiLayers.map(l=>({kind:'demo',title:`Layer ${l.number}: ${l.name}`,lead:l.purpose,type:'osiLayer',scenario:'school-web',layer:l.number,ask:{7:'How is a DNS service different from the address bar in a browser?',6:'How can both peers recover the same word from a sequence of bytes?',5:'What makes an ongoing conversation different from sending one message?',4:'What should an application do if its UDP data is lost?',3:'Why does a remote packet go to a local gateway first?',2:'What does the switch do if it does not know a destination MAC?',1:'Would a Wi-Fi link still have a Physical layer without a cable?'}[l.number],emphasis:l.detail,demo:{7:'Request a page, advance through name resolution and HTTP exchange, and discuss which operations use Application protocols.',6:'Encode a short word into UTF-8 bytes, then reconstruct it. Clarify that encoding alone provides no secrecy.',5:'Establish, exchange, and end a logical dialog. Contrast the application conversation with its underlying transport.',4:'Drop unit 2 in TCP and UDP models. Compare retransmission and ordered byte delivery with UDP’s missing datagram.',3:'Step the same packet across two different IP networks. Identify each next-hop link and the unchanged remote destination.',2:'Send to a learned MAC, then choose an unknown MAC. Compare directed forwarding and VLAN-limited flooding.',1:'Choose copper, fiber, or radio. Step through the same bits and point out that signal drawings are illustrative, not measured waveforms.'}[l.number]})),
 {
  kind:'concept',
  title:'Seven OSI layer responsibilities',
  items:[
   'Application: network services used by applications; grouped into TCP/IP Application.',
   'Presentation: representation, encoding, and encryption concepts; grouped into TCP/IP Application.',
   'Session: dialog and session coordination concepts; grouped into TCP/IP Application.',
   'Transport: process-to-process delivery using TCP or UDP; maps to TCP/IP Transport.',
   'Network: logical addressing and routing using IP; maps to TCP/IP Internet.',
   'Data Link: local frames, MAC addressing, and media access; grouped into TCP/IP Link.',
   'Physical: signals and bit transmission through a medium; grouped into TCP/IP Link.'
  ],
  expectedCount:7,
  lead:'OSI has seven layers; the common TCP/IP view groups functions into four layers.',
  itemLabels:['7','6','5','4','3','2','1'],
  footnote:'Mappings are approximate; real implementations do not always fit into separate conceptual boxes.'
 },
 {
  kind:'concept',
  title:'Four layers in the TCP/IP model',
  items:[
   'Application: application protocols plus representation and dialog functions.',
   'Transport: process-to-process services, including TCP and UDP.',
   'Internet: IP logical addressing and forwarding across networks.',
   'Link: local framing, media access, and physical transmission.'
  ],
  expectedCount:4
 },
 {
  kind:'concept',
  title:'Wrap the data, then unwrap it',
  lead:'Encapsulation adds control information as data passes toward the transmission medium.',
  items:[
   'Application data is carried in a TCP segment or UDP datagram, then an IP packet, then a link-layer frame. Physical signals carry the frame bits.',
   'The receiver interprets and removes the relevant headers. Ethernet also uses a trailer for error detection.'
  ]
 },
 {kind:'demo',title:'Encapsulation and decapsulation',lead:'Follow one message from Computer A to Computer B. Each control changes the same journey state.',type:'osiJourney',ask:'At what point is the IP packet carried inside an Ethernet frame?',emphasis:'Application data → TCP segment → IP packet → Ethernet frame → signals; the receiver interprets and removes the relevant information in reverse.',demo:'Predict the next wrapper before stepping. Start autoplay, pause at the Ethernet frame, point to the FCS trailer, resume, then reset and repeat manually.'},
 {
  kind:'concept',
  title:'Two transport services: TCP and UDP',
  items:[
   'TCP: an ordered reliable byte stream with sequence numbers, acknowledgments, and retransmission.',
   'UDP: datagrams without built-in delivery or ordering guarantees; applications may add reliability.'
  ],
  expectedCount:2
 },
 {
  kind:'demo',
  title:'Inside the message',
  lead:'Conceptual walkthrough • select any OSI layer, step through encapsulation, and compare TCP/UDP loss handling.',
  type:'osi'
 },
 {
  kind:'concept',
  title:'Local delivery and the next hop',
  lead:'IP identifies an interface’s logical network address. A MAC address identifies a link-layer interface within the local link context.',
  items:[
   'For a local IPv4 destination, ARP resolves its local MAC address before Ethernet delivery.',
   'For a remote destination, the host sends the frame to the gateway’s MAC. The packet still names the remote destination IP.',
   'A router replaces link-layer framing at each hop; MAC addresses do not serve as end-to-end Internet destination addresses.'
  ]
 },
 {
  kind:'demo',
  title:'Compare IP destinations with next-hop frames',
  lead:'Follow local or routed delivery while keeping packet and frame addresses separate.',
  type:'nextHopFrameDemo'
 },
 {kind:'demo',title:'OSI and TCP/IP: two useful views',lead:'The common four-layer TCP/IP model groups responsibilities differently. These mappings are approximate.',type:'osiComparison',ask:'Where do OSI Presentation and Session responsibilities appear in this TCP/IP view?',emphasis:'OSI 7–5 map to Application, 4 to Transport, 3 to Internet, and 2–1 to Network Access / Link.',demo:'Select each TCP/IP group and trace its highlighted OSI rows. Explain that protocols and implementation boundaries do not always fit one box.'},
 {kind:'demo',title:'Devices perform layer-related functions',lead:'Select a device or function to inspect its primary responsibility and the limits of a single-layer label.',type:'osiDevices',ask:'Can a switch route packets and still be called a switch?',emphasis:'Repeater/hub: Physical; basic switch: Data Link; router: Network; port filtering: Transport-related; proxy: Application-related. Real devices often span layers.',demo:'Select each example and explain its function rather than inferring behavior from the product name.'},
 {kind:'demo',title:'Troubleshoot with evidence',lead:'Inspect a named symptom, its likely investigation layers, and the evidence for the next diagnostic step.',type:'osiTroubleshooting',ask:'Why can a successful ping coexist with a failed website or TCP connection?',emphasis:'Check physical evidence, frame/VLAN behavior, IP routes, transport ports, and application responses in a deliberate order.',demo:'Compare DNS failure, TCP connection failure, and HTTP 503. Display the explanations and demonstrate a useful next diagnostic step.'},
 {
  kind:'walkthrough',
  title:'Follow the next-hop addresses',
  lead:'How the process works, step by step.',
  items:[
   'For a local IPv4 destination, the host resolves the destination’s local MAC address using ARP before Ethernet delivery.',
   'For a remote destination, the packet keeps the remote destination IP while the first Ethernet frame targets the local gateway MAC.',
   'At a router, the incoming frame is processed and new link framing is created for the next link. This no-NAT example retains the IP destination.',
   'The receiving host processes the frame, packet, and transport information before delivering data to the application. A MAC address is not an end-to-end Internet destination.'
  ]
 },
 {kind:'summary',title:'Summary of the Discussion',items:[
  'OSI describes seven conceptual responsibilities, not a protocol or seven mandatory software operations.',
  'Application, Presentation, and Session describe services, representation, and dialog coordination.',
  'Transport uses ports; TCP supplies ordered reliable bytes while UDP itself does not guarantee delivery.',
  'Network handles logical IP delivery; Data Link handles frames and local MAC delivery; Physical represents bits as signals.',
  'Encapsulation builds nested data units; decapsulation interprets them at the receiver.',
  'Routers replace local link-layer framing at each hop while preserving the end-to-end IP packet destination.',
  'Devices and faults may involve several layers, so troubleshooting follows evidence rather than one symptom alone.'
 ]}
];

addPresenterNotes(slides,{
 title:'Open Systems Interconnection (OSI) Reference Model and Network Communication',
 description:'Seven conceptual communication layers, encapsulation, and next-hop packet delivery.',
 taglish:'Tingnan ang responsibility ng bawat layer at ang ebidensiya sa kasalukuyang demonstration.',
 example:'A student laptop requests a handout from the school server; the exchange depends on signals, local delivery, routing, transport, and an available service.'
});

export default {
 id:'osi-reference-model',
 title:'Open Systems Interconnection (OSI) Reference Model and Network Communication',
 icon:'Layers',
 description:'Explore the seven communication layers, follow encapsulation and next-hop delivery, and troubleshoot using evidence.',
 objectives,
 slides
};
