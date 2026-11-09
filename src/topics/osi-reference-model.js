import {addPresenterNotes} from './createTopic.js';
import {osiLayers} from '../simulations/osiModel.js';

const objectives=[
 'Define the OSI reference model and explain the responsibility of each layer.',
 'Distinguish frames, packets, TCP segments, and UDP datagrams.',
 'Follow encapsulation and decapsulation as data moves through the protocol stack.',
 'Identify the protocol data unit and headers added at each communication layer.',
 'Compare the seven-layer OSI model with the four-layer TCP/IP model.'
];

const layerSlides=osiLayers.map(l=>({
 kind:'demo',
 title:`Layer ${l.number}: ${l.name}`,
 lead:l.purpose,
 type:'osiLayer',
 scenario:'school-web',
 layer:l.number,
 ask:{
  7:'How is a DNS service different from the address bar in a browser?',
  6:'How can both peers recover the same word from a sequence of bytes?',
  5:'What makes an ongoing conversation different from sending one message?',
  4:'What should an application do if its UDP data is lost?',
  3:'Why does a remote packet go to a local gateway first?',
  2:'What does the switch do if it does not know a destination MAC?',
  1:'Would a Wi-Fi link still have a Physical layer without a cable?'
 }[l.number],
 emphasis:l.detail,
 demo:{
  7:'Request a page, advance through name resolution and HTTP exchange, and discuss which operations use Application protocols.',
  6:'Encode a short word into UTF-8 bytes, then reconstruct it. Clarify that encoding alone provides no secrecy.',
  5:'Establish, exchange, and end a logical dialog. Contrast the application conversation with its underlying transport.',
  4:'Drop unit 2 in TCP and UDP models. Compare retransmission and ordered byte delivery with UDP’s missing datagram.',
  3:'Step the same packet across two different IP networks. Identify each next-hop link and the unchanged remote destination.',
  2:'Send to a learned MAC, then choose an unknown MAC. Compare directed forwarding and VLAN-limited flooding.',
  1:'Choose copper, fiber, or radio. Step through the same bits and point out that signal drawings are illustrative, not measured waveforms.'
 }[l.number]
}));

const slides=[
 {kind:'title',title:'Open Systems Interconnection (OSI) Reference Model and Network Communication',ask:'When a webpage fails, how can we decide where to begin looking?',emphasis:'OSI is a reference model for responsibilities, not a protocol that transmits a message.',demo:'Point to the stack from 7 to 1. Explain that the sender uses lower-layer services and the receiver interprets the result.'},
 {kind:'objectives',title:'Learning Objectives',lead:'At the end of this discussion, students should be able to:',items:objectives,ask:'Which objective would help you explain why a cable replacement does not fix every network problem?',emphasis:'Ask for an explanation and a tested example, not only a memorized list.',demo:'Invite learners to choose an objective they want to demonstrate before the lesson ends.'},
 {kind:'concept',title:'What is the OSI model?',lead:'Open Systems Interconnection is a reference model for describing communication responsibilities. Layers let us discuss one part of a complicated system at a time.',type:'osiIntroduction',ask:'Could a reference diagram deliver a message without an implemented protocol?',emphasis:'It helps learning, design discussions, and troubleshooting. It is not itself a network protocol or a mandatory seven-step program.',demo:'Use the two-device drawing. Trace a message from sender to receiver and ask which responsibilities are needed at both ends.'},
 {
  kind:'concept',
  title:'Seven OSI layer responsibilities',
  items:[
   'Application: Network services and protocols used directly by end-user applications.',
   'Presentation: Data formatting, character encoding, translation, and encryption.',
   'Session: Dialog management, establishing, maintaining, and synchronizing communication sessions.',
   'Transport: End-to-end communication, segmentation, flow control, and error recovery.',
   'Network: Logical addressing and path determination (routing) across interconnected networks.',
   'Data Link: Physical addressing, framing, media access, and local hop delivery.',
   'Physical: Transmission and reception of raw binary bitstreams over a physical medium.'
  ],
  expectedCount:7,
  lead:'The Open Systems Interconnection (OSI) model divides network communication into seven functional layers.',
  itemLabels:['7','6','5','4','3','2','1'],
  footnote:'Each layer provides services to the layer above it and relies on the layer beneath it.'
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
 {
  kind:'demo',
  title:'Inside the message',
  lead:'Conceptual walkthrough • select any OSI layer, step through encapsulation, and compare TCP/UDP loss handling.',
  type:'osi'
 },
 ...layerSlides.slice(0,4),
 {
  kind:'concept',
  title:'Two transport services: TCP and UDP',
  items:[
   'TCP: an ordered reliable byte stream with sequence numbers, acknowledgments, and retransmission.',
   'UDP: datagrams without built-in delivery or ordering guarantees; applications may add reliability.'
  ],
  expectedCount:2
 },
 ...layerSlides.slice(4),
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
 {kind:'demo',title:'OSI and TCP/IP: two useful views',lead:'The common four-layer TCP/IP model groups responsibilities differently. These mappings are approximate.',type:'osiComparison',ask:'Where do OSI Presentation and Session responsibilities appear in this TCP/IP view?',emphasis:'OSI 7–5 map to Application, 4 to Transport, 3 to Internet, and 2–1 to Network Access / Link.',demo:'Select each TCP/IP group and trace its highlighted OSI rows. Explain that protocols and implementation boundaries do not always fit one box.'},
 {kind:'summary',title:'Summary of the Discussion',items:[
  'OSI describes seven conceptual responsibilities, not a protocol or seven mandatory software operations.',
  'Application, Presentation, and Session describe services, representation, and dialog coordination.',
  'Transport uses ports; TCP supplies ordered reliable bytes while UDP itself does not guarantee delivery.',
  'Network handles logical IP delivery; Data Link handles frames and local MAC delivery; Physical represents bits as signals.',
  'Encapsulation builds nested data units; decapsulation interprets them at the receiver.',
  'The common four-layer TCP/IP model groups these functions into Application, Transport, Internet, and Link.'
 ]}
];

addPresenterNotes(slides,{
 title:'Open Systems Interconnection (OSI) Reference Model and Network Communication',
 description:'Seven conceptual communication layers, encapsulation, and the TCP/IP model.',
 taglish:'Tingnan ang responsibility ng bawat layer at encapsulation sa kasalukuyang demonstration.',
 example:'A user sends a message; the exchange depends on signals, framing, routing, transport, and an available application service.'
});

export default {
 id:'osi-reference-model',
 title:'Open Systems Interconnection (OSI) Reference Model and Network Communication',
 icon:'Layers',
 description:'Explore the seven communication layers, follow data encapsulation, and compare OSI with the TCP/IP model.',
 objectives,
 slides
};
