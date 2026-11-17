import {addPresenterNotes} from './createTopic.js';

const objectives=[
 'Define the OSI reference model and explain the responsibility of each layer.',
 'Distinguish OSI protocol data units: data, segments, packets, frames, and bits.',
 'Follow encapsulation and decapsulation as data moves through the protocol stack.',
 'Identify the protocol data unit and headers added at each communication layer.',
 'Distinguish upper creation layers (7–5) from lower travel layers (4–1) when tracing real network communication.'
];

const groupedLayerSlides=[
 {
  kind:'concept',
  title:'Three Upper Layers (7–5): How Data Is Created',
  items:[
   'Application: Provides network services directly to user apps like web browsers, email, and chat (HTTP/HTTPS, DNS, DHCP).',
   'Presentation: Formats, compresses, and encrypts data (like UTF-8 text, images, and TLS security) so both devices read it.',
   'Session: Opens, coordinates, and cleanly closes ongoing two-way conversations between applications.'
  ],
  expectedCount:3,
  itemLabels:['7','6','5'],
  visualKey:'osiUpperLayers'
 },
 {
  kind:'concept',
  title:'Four Lower Layers (4–1): How Data Travels',
  items:[
   'Transport (Segment): Splits data into numbered segments and uses port numbers (:443, :5000) to reach the right app.',
   'Network (Packet): Stamps logical source and destination IP addresses so routers can choose paths across networks.',
   'Data Link (Frame): Wraps packets into frames with local hardware MAC addresses and an FCS error check for switches.',
   'Physical (Bits): Converts frames into raw 1s and 0s sent as electrical pulses, light flashes, or Wi-Fi radio waves.'
  ],
  expectedCount:4,
  itemLabels:['4','3','2','1'],
  visualKey:'osiLowerLayers'
 }
];

const slides=[
 {kind:'title',title:'Open Systems Interconnection (OSI) Reference Model and Network Communication',ask:'When a webpage fails, how can we decide where to begin looking?',emphasis:'OSI is a reference model for responsibilities, not a protocol that transmits a message.',demo:'Point to the stack from 7 to 1. Explain that the sender uses lower-layer services and the receiver interprets the result.'},
 {kind:'objectives',title:'Learning Objectives',lead:'At the end of this discussion, students should be able to:',items:objectives,ask:'Which objective would help you explain why a cable replacement does not fix every network problem?',emphasis:'Ask for an explanation and a tested example, not only a memorized list.',demo:'Invite learners to choose an objective they want to demonstrate before the lesson ends.'},
 {
  kind:'concept',
  title:'Why Networking Standards Are Needed',
  lead:'Networking standards let hardware and software from different manufacturers communicate reliably using shared rules.',
  paragraphs:[
   'Without shared rules, devices from different brands could not understand one another. Standards allow multi-vendor compatibility and competition—much like USB lets keyboards, flash drives, and laptops from different companies work together.',
   'Standards can be formal (approved by official bodies) or de facto (widely adopted by industry practice) and typically mature through three steps: specifying the problem, selecting the best solution, and gaining industry-wide acceptance.'
  ]
 },
 {
  kind:'concept',
  title:'Five Networking Standards Organizations',
  lead:'Five major organizations publish the hardware, cabling, wireless, and layered communication standards used in networking.',
  items:[
   'ANSI (American National Standards Institute): Coordinates U.S. technology and safety standards and represents them internationally.',
   'EIA (Electronic Industries Alliance): Industry group of electronics manufacturers known for foundational cabling and connector wiring standards.',
   'IEEE (Institute of Electrical and Electronic Engineers): Engineering society that maintains IEEE 802 standards, including 802.3 Ethernet and 802.11 Wi-Fi.',
   'ISO (International Organization for Standardization): Global federation across 130+ countries that created the 7-layer OSI model (ISO is the group; OSI is the model).',
   'ITU (International Telecommunication Union): United Nations agency coordinating global telecom infrastructure, satellite links, and radio frequencies.'
  ],
  expectedCount:5
 },
 {kind:'concept',title:'What is the OSI model?',lead:'Open Systems Interconnection is a reference model for describing communication responsibilities. Layers let us discuss one part of a complicated system at a time.',type:'osiIntroduction',ask:'Could a reference diagram deliver a message without an implemented protocol?',emphasis:'It helps learning, design discussions, and troubleshooting. It is not itself a network protocol or a mandatory seven-step program.',demo:'Use the two-device drawing. Trace a message from sender to receiver and ask which responsibilities are needed at both ends.'},
 {
  kind:'concept',
  title:'Layered Tasks: The Postal Mail Analogy',
  lead:'Layering splits one complex network delivery into smaller, specialized steps—just like sending and receiving a postal letter.',
  paragraphs:[
   'When you mail a letter, you write and seal it in an envelope (higher layers), the local post office sorts and addresses it (middle layers), and a carrier transports it physically across roads (lower layers). At the destination, the steps reverse until your friend opens and reads the letter.',
   'Inside the OSI model, each layer only communicates directly with the layer immediately above and below it on the same computer, while logically matching the corresponding layer on the receiving computer.'
  ]
 },
 {
  kind:'concept',
  title:'Seven OSI layer responsibilities',
  items:[
   'Application: Faces user software—web browsers and email apps use protocols like HTTP, DNS, and DHCP here.',
   'Presentation: Translates data formats, compresses files, and encrypts messages (like HTTPS) so both ends read them.',
   'Session: Starts, keeps open, and cleanly closes ongoing two-way conversations between applications.',
   'Transport: Adds port numbers to reach the exact app on a host and optionally checks that no segments were lost.',
   'Network: Stamps logical source and destination IP addresses so routers can choose paths across separate networks.',
   'Data Link: Packages data into frames with local hardware MAC addresses so switches deliver them on the same link.',
   'Physical: Turns everything into raw 1s and 0s sent as voltage pulses, fiber light flashes, or radio waves.'
  ],
  expectedCount:7,
  lead:'The Open Systems Interconnection (OSI) model divides network communication into seven functional layers.',
  itemLabels:['7','6','5','4','3','2','1']
 },
 ...groupedLayerSlides,
 {
  kind:'concept',
  title:'Wrap the data, then unwrap it',
  lead:'Encapsulation adds control information as data passes toward the transmission medium.',
  items:[
   'Encapsulation (Sending, 7 → 1): Computer 1 wraps the message with delivery headers (Port, IP, and MAC) down to bits.',
   'Decapsulation (Receiving, 1 → 7): Computer 2 checks and removes each outer header step by step until the app reads the message.'
  ],
  visualKey:'encapsulationExample'
 },
 {
  kind:'concept',
  title:'Five OSI Protocol Data Units (PDUs)',
  lead:'Each OSI layer gives the message a specific PDU name as delivery headers and trailers are added.',
  items:[
   'Data (Layers 7–5): The original user message or file prepared inside the upper layers before transport splitting.',
   'Segment (Layer 4): Adds source and destination port numbers so the message reaches the exact program on each host.',
   'Packet (Layer 3): Adds logical source and destination IP addresses so routers can guide it from network to network.',
   'Frame (Layer 2): Wraps the packet with local hardware MAC addresses plus an FCS trailer to catch transmission errors.',
   'Bits (Layer 1): Raw binary 1s and 0s sent physically over cables, optical glass fiber, or wireless Wi-Fi radio.'
  ],
  expectedCount:5,
  itemLabels:['7–5','4','3','2','1']
 },
 {kind:'summary',title:'Summary of the Discussion',items:[
  'Upper Layers (7–5 · How Data Is Created): Application, Presentation, and Session prepare app services, formatting/encryption, and ongoing conversations.',
  'Lower Layers (4–1 · How Data Travels): Transport, Network, Data Link, and Physical handle app ports, IP routing, local MAC frames, and link signals.',
  'Encapsulation & Decapsulation: Computer 1 wraps data down from Layer 7 to 1 when sending; Computer 2 unwraps wrappers up from Layer 1 to 7.',
  'OSI Data Units (PDUs): Data (L7–5) → Segment (L4 · Ports) → Packet (L3 · IP) → Frame (L2 · MAC) → Bits (L1 · Signals).',
  'Layered Troubleshooting Tip: Locate faults step by step—cables & link signals (L1) → MAC frames & switches (L2) → IP & gateway (L3) → ports & apps (L4–7).'
 ]}
];

addPresenterNotes(slides,{
 title:'Open Systems Interconnection (OSI) Reference Model and Network Communication',
 description:'Seven conceptual OSI communication layers, protocol data units, and encapsulation.',
 taglish:'Tingnan ang responsibility ng bawat layer at encapsulation sa kasalukuyang demonstration.',
 example:'A user sends a message; the exchange depends on signals, framing, routing, transport, and an available application service.'
});

export default {
 id:'osi-reference-model',
 title:'Open Systems Interconnection (OSI) Reference Model and Network Communication',
 icon:'Layers',
 description:'Explore all seven OSI communication layers, distinguish upper creation and lower travel roles, and follow encapsulation and decapsulation.',
 objectives,
 slides
};
