import {addPresenterNotes} from './createTopic.js';

const objectives=[
 'Define the OSI reference model and explain the responsibility of each layer.',
 'Distinguish OSI protocol data units: data, segments, packets, frames, and bits.',
 'Follow encapsulation and decapsulation as data moves through the protocol stack.',
 'Identify the protocol data unit and headers added at each communication layer.',
 'Compare the seven-layer OSI model with the four-layer TCP/IP model.'
];

const deepLayerSlides=[
 {
  kind:'concept',
  title:'Layer 7: Application Layer',
  items:[
   'Deeper Look: Not the screen button or window itself—these are the network service rules an app calls to request web pages, files, or messages.',
   'Computer 1 → 2 Example: When Ana hits Send on "Meet at 3 PM!", the chat app hands the message to Layer 7 rules so communication begins.',
   'What Breaks Here: A site returns "404 Not Found" or DNS fails to look up a server name even when Wi-Fi and cables work.'
  ],
  visualKey:'osiLayer7'
 },
 {
  kind:'concept',
  title:'Layer 6: Presentation Layer',
  items:[
   'Deeper Look: Acts as a translator, shrinker, and lock—formatting character sets, compressing big files, and encrypting private messages.',
   'Computer 1 → 2 Example: Encodes "Meet at 3 PM!" into standard text bytes (like UTF-8) and encrypts it so outsiders cannot read it.',
   'What Breaks Here: Garbled symbols from mismatched text encoding, an unsupported video codec, or an expired HTTPS security certificate.'
  ],
  visualKey:'osiLayer6'
 },
 {
  kind:'concept',
  title:'Layer 5: Session Layer',
  items:[
   'Deeper Look: Opens, coordinates, and cleanly closes ongoing two-way exchanges—keeping logins active and adding checkpoints to resume big uploads.',
   'Computer 1 → 2 Example: Opens a shared chat session between Computer 1 and Computer 2 so replies stay paired inside the right thread.',
   'What Breaks Here: Getting signed out mid-task with "Session expired" or having a large transfer restart from 0% when interrupted.'
  ],
  visualKey:'osiLayer5'
 },
 {
  kind:'concept',
  title:'Layer 4: Transport Layer',
  items:[
   'Deeper Look: Starts the travel layers by splitting messages into numbered pieces, tagging each app with port numbers, pacing flow, and handling drops.',
   'Computer 1 → 2 Example: Tags "Meet at 3 PM!" with Port :5000 so Computer 2 hands it straight to the chat app rather than a web browser.',
   'What Breaks Here: Basic reachability tests work, yet a host firewall blocks the app port or heavy packet loss stalls the message.'
  ],
  visualKey:'osiLayer4'
 },
 {
  kind:'concept',
  title:'Layer 3: Network Layer',
  items:[
   'Deeper Look: Stamps sender and receiver logical IP addresses onto each packet so routers can pick the best path across different networks.',
   'Computer 1 → 2 Example: Adds Computer 1 and Computer 2 IP addresses so routers guide the packet even across campus buildings or the Internet.',
   'What Breaks Here: Missing or wrong default gateway, duplicate IP conflict, or a fallback 169.254.x.x address blocking outside networks.'
  ],
  visualKey:'osiLayer3'
 },
 {
  kind:'concept',
  title:'Layer 2: Data Link Layer',
  items:[
   'Deeper Look: Wraps packets into frames with local hardware MAC addresses and an FCS check trailer for one local switch or Wi-Fi hop.',
   'Computer 1 → 2 Example: The classroom switch reads Computer 2 MAC address and sends the frame only out the port where Computer 2 connects.',
   'What Breaks Here: Wrong VLAN switch port assignment, damaged frames failing FCS checks, or unknown destinations flooding every port.'
  ],
  visualKey:'osiLayer2'
 },
 {
  kind:'concept',
  title:'Layer 1: Physical Layer',
  items:[
   'Deeper Look: Converts frames into electrical pulses, light flashes, or wireless waves—defining cables, RJ45 pins, voltage, and radio channels without reading data.',
   'Computer 1 → 2 Example: Computer 1 network card turns the frame into 01001101… bits traveling over copper cable or Wi-Fi waves to Computer 2.',
   'What Breaks Here: Loose RJ45 plug, broken copper conductor, bent fiber cord, dead green link LED, or weak Wi-Fi signal.'
  ],
  visualKey:'osiLayer1'
 }
];

const slides=[
 {kind:'title',title:'Open Systems Interconnection (OSI) Reference Model and Network Communication',ask:'When a webpage fails, how can we decide where to begin looking?',emphasis:'OSI is a reference model for responsibilities, not a protocol that transmits a message.',demo:'Point to the stack from 7 to 1. Explain that the sender uses lower-layer services and the receiver interprets the result.'},
 {kind:'objectives',title:'Learning Objectives',lead:'At the end of this discussion, students should be able to:',items:objectives,ask:'Which objective would help you explain why a cable replacement does not fix every network problem?',emphasis:'Ask for an explanation and a tested example, not only a memorized list.',demo:'Invite learners to choose an objective they want to demonstrate before the lesson ends.'},
 {kind:'concept',title:'What is the OSI model?',lead:'Open Systems Interconnection is a reference model for describing communication responsibilities. Layers let us discuss one part of a complicated system at a time.',type:'osiIntroduction',ask:'Could a reference diagram deliver a message without an implemented protocol?',emphasis:'It helps learning, design discussions, and troubleshooting. It is not itself a network protocol or a mandatory seven-step program.',demo:'Use the two-device drawing. Trace a message from sender to receiver and ask which responsibilities are needed at both ends.'},
 {
  kind:'concept',
  title:'Seven OSI layer responsibilities',
  items:[
   'Application: Network services used by apps like browsers and email (HTTP, DNS, DHCP).',
   'Presentation: Formats, compresses, and encrypts data (like UTF-8 text or HTTPS) so both ends read it.',
   'Session: Opens, tracks, and closes an ongoing conversation between two apps.',
   'Transport: Uses port numbers to reach the right app and checks or tracks delivery across a connection.',
   'Network: Uses logical IP addresses and routers to forward packets across different networks.',
   'Data Link: Wraps packets into frames and delivers them locally using MAC addresses and switches.',
   'Physical: Sends raw 1s and 0s across copper cables, fiber light, or wireless radio.'
  ],
  expectedCount:7,
  lead:'The Open Systems Interconnection (OSI) model divides network communication into seven functional layers.',
  itemLabels:['7','6','5','4','3','2','1']
 },
 ...deepLayerSlides,
 {
  kind:'concept',
  title:'Wrap the data, then unwrap it',
  lead:'Encapsulation adds control information as data passes toward the transmission medium.',
  items:[
   'Encapsulation (Computer 1 Sends, 7 → 1): The upper 3 layers create the data, and the lower 4 layers wrap it down through ports, IPs, MACs, and bits.',
   'Decapsulation (Computer 2 Receives, 1 → 7): The lower 4 layers check and unwrap each outer header upward until the upper 3 layers open the message.'
  ],
  visualKey:'encapsulationExample'
 },
 {
  kind:'concept',
  title:'Five OSI Protocol Data Units (PDUs)',
  lead:'Each OSI layer gives the message a specific PDU name as delivery headers and trailers are added.',
  items:[
   'Data (Layers 7–5): Original application message prepared for sending.',
   'Segment (Layer 4): Adds source and destination port numbers to reach the right app.',
   'Packet (Layer 3): Adds logical source and destination IP addresses for routing.',
   'Frame (Layer 2): Adds local MAC addresses plus a Frame Check Sequence (FCS) trailer.',
   'Bits (Layer 1): Raw 1s and 0s transmitted as electrical pulses, light flashes, or radio waves.'
  ],
  expectedCount:5,
  itemLabels:['7–5','4','3','2','1']
 },
 {
  kind:'concept',
  title:'Four layers in the TCP/IP model',
  items:[
   'Application (OSI 7–5): Handles user-facing protocols, data formatting, and session control (HTTP, DNS, SMTP).',
   'Transport (OSI 4): Delivers data between apps using port numbers and delivery control.',
   'Internet (OSI 3): Handles logical IP addressing and routing across networks.',
   'Link (OSI 2–1): Handles local MAC framing, switches, cables, and physical signals.'
  ],
  expectedCount:4
 },
 {kind:'demo',title:'OSI and TCP/IP: two useful views',lead:'The common four-layer TCP/IP model groups responsibilities differently. These mappings are approximate.',type:'osiComparison',ask:'Where do OSI Presentation and Session responsibilities appear in this TCP/IP view?',emphasis:'OSI 7–5 map to Application, 4 to Transport, 3 to Internet, and 2–1 to Network Access / Link.',demo:'Select each TCP/IP group and trace its highlighted OSI rows. Explain that protocols and implementation boundaries do not always fit one box.'},
 {kind:'summary',title:'Summary of the Discussion',items:[
  '7 OSI Layers (7 → 1): Upper layers (7–5) create data; lower layers (4–1) handle how data travels.',
  'Encapsulation & Decapsulation: Computer 1 wraps data going down (7 → 1); Computer 2 unwraps it going up (1 → 7).',
  'Data Units (PDUs): Data (L7–5) → Segment (L4 · Ports) → Packet (L3 · IP) → Frame (L2 · MAC) → Bits (L1 · Signals).',
  'OSI vs. TCP/IP: Real networks combine OSI Layers 7–5 into Application and Layers 2–1 into Link.',
  'Troubleshooting Tip: Check bottom-up—cable & link (L1–2) → IP & gateway (L3) → ports & service (L4–7).'
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
