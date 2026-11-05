export const osiLayers=[
 {number:7,name:'Application',purpose:'Network services used by applications',examples:'HTTP/HTTPS, DNS, SMTP',mapping:'Application',detail:'A browser uses HTTP to request a resource. The layer describes network services, not the browser’s graphical interface.'},
 {number:6,name:'Presentation',purpose:'Data representation and transformation',examples:'Text encoding, compression, encryption concepts',mapping:'Application',detail:'Both peers need compatible representations. Encryption and compression illustrate these responsibilities, but actual TCP/IP software need not expose a separate Presentation layer.'},
 {number:5,name:'Session',purpose:'Coordinate an ongoing interaction',examples:'Dialog control, establishing/maintaining/ending logical interactions',mapping:'Application',detail:'Think of a coordinated conversation. A web login session and a TCP connection are different concepts; TCP connection setup is a Transport function, not exclusively Session.'},
 {number:4,name:'Transport',purpose:'Process-to-process delivery using ports',examples:'TCP segments, UDP datagrams',mapping:'Transport',detail:'TCP supplies an ordered reliable byte stream using sequence numbers, acknowledgments, and retransmission. UDP itself does not guarantee delivery or ordering. Applications can build reliability on UDP.'},
 {number:3,name:'Network',purpose:'Logical addressing and forwarding between networks',examples:'IPv4/IPv6 packets, routing',mapping:'Internet',detail:'Routers choose a next hop using a routing table. A packet keeps its remote destination IP across this no-NAT example; each link uses its own framing.'},
 {number:2,name:'Data Link',purpose:'Local-link frame delivery and media access',examples:'Ethernet frames, MAC addresses, switching, frame check sequence',mapping:'Link',detail:'An Ethernet switch learns source MAC addresses. A known destination is forwarded to its learned port; an unknown unicast is flooded to other eligible ports in the VLAN. Error detection is not automatic end-to-end correction.'},
 {number:1,name:'Physical',purpose:'Represent and transmit bits through a medium',examples:'Electrical signals, fiber light, radio, connectors',mapping:'Link',detail:'Cables, connectors, and transceivers carry signals. Wi-Fi involves both Physical radio transmission and Data Link framing/media access.'}
];
export const journeySteps=[
 {side:'Computer A',layer:'Application concepts · 7–5',unit:'Application data',parts:['Application data'],explanation:'The application creates a message in an agreed representation and interaction context.'},
 {side:'Computer A',layer:'Transport · 4',unit:'TCP segment',parts:['TCP header','Application data'],explanation:'TCP adds ports, sequence, and other transport information. A UDP example would use a UDP datagram instead.'},
 {side:'Computer A',layer:'Network · 3',unit:'IP packet',parts:['IP header','TCP header','Application data'],explanation:'IP adds logical source and destination addresses for forwarding between networks.'},
 {side:'Computer A',layer:'Data Link · 2',unit:'Ethernet frame',parts:['Ethernet header','IP header','TCP header','Application data','FCS trailer'],explanation:'Ethernet supplies local-link MAC addressing and a frame check sequence trailer for error detection.'},
 {side:'Medium A → B',layer:'Physical · 1',unit:'Bits / signals',parts:['01001000 01101001'],explanation:'Physical signaling represents frame bits. This simplified link illustration omits intermediate routers and timing.'},
 {side:'Computer B',layer:'Physical → Data Link · 1–2',unit:'Received Ethernet frame',parts:['Ethernet header','IP header','TCP header','Application data','FCS trailer'],explanation:'The receiving interface reconstructs a frame and checks link-layer addressing and error-detection information.'},
 {side:'Computer B',layer:'Network · 3',unit:'IP packet',parts:['IP header','TCP header','Application data'],explanation:'After link framing is removed, IP processes the packet addressed to this receiver.'},
 {side:'Computer B',layer:'Transport · 4',unit:'TCP segment',parts:['TCP header','Application data'],explanation:'TCP uses ports and sequence information to deliver the stream to the correct receiving process.'},
 {side:'Computer B',layer:'Application concepts · 5–7',unit:'Application data',parts:['Application data'],explanation:'The receiving application interprets the reconstructed message. This is decapsulation, not seven mandatory separate software operations.'}
];
export class Journey {
 constructor(){this.index=0;this.running=false;this.speed=1;}
 get current(){return journeySteps[this.index];}
 next(){this.index=Math.min(journeySteps.length-1,this.index+1);if(this.index===journeySteps.length-1)this.running=false;}
 previous(){this.index=Math.max(0,this.index-1);}
 start(){if(this.index===journeySteps.length-1)this.index=0;this.running=true;}
 pause(){this.running=false;}
 reset(){this.index=0;this.running=false;}
}
export const deviceFunctions=[
 {device:'Repeater / hub',layer:1,why:'Primarily repeats/regenerates Physical signals without learning MAC destinations.'},
 {device:'Basic Ethernet switch',layer:2,why:'Commonly forwards Data Link frames using a MAC table. Multilayer switches can also route.'},
 {device:'IP router',layer:3,why:'Routes Network-layer packets. A real router also handles link interfaces and may inspect higher layers.'},
 {device:'TCP/UDP port filtering',layer:4,why:'Uses Transport information such as ports; implemented policies can also examine other layers.'},
 {device:'HTTP application proxy',layer:7,why:'Interprets Application protocol messages; its underlying network stack still uses lower layers.'}
];
export const osiFaults=[
 {symptom:'One wired PC loses link immediately after its cable is crushed.',likely:[1],evidence:'Physical is a sensible starting point: inspect the cable/ports and substitute an approved known-good lead. A link light alone does not prove higher-layer health.'},
 {symptom:'Links are lit, but two intended same-VLAN hosts cannot exchange frames after a switch-port configuration change.',likely:[2],evidence:'Inspect Data Link switching/VLAN membership and learned MAC entries first. Also verify host addressing and access policy before concluding.'},
 {symptom:'Local peers work, but a remote IP subnet is unreachable after the default gateway is changed.',likely:[3],evidence:'Check Network-layer addressing, gateway, and routes in both directions. Physical and firewall evidence may still matter.'},
 {symptom:'The server IP responds to permitted ping, but a TCP connection to its service port fails.',likely:[4,7],evidence:'Inspect the Transport port/path and Application listener. A firewall, stopped service, or resource problem can cause this; ping alone cannot identify the root cause.'},
 {symptom:'A known service works by numeric IP, but its hostname fails DNS lookup.',likely:[7],evidence:'DNS is an Application protocol: inspect resolver settings and query results. A resolver can also be unreachable because of lower-layer routing or filtering faults.'},
 {symptom:'A TCP connection succeeds, but the web server returns HTTP 503 Service Unavailable.',likely:[7],evidence:'Application service state is the first lead. Investigate server/dependency health; a symptom guides the next test rather than proving one exclusive faulty layer.'}
];
