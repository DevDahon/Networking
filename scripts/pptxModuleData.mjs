// Rich educational metadata per Networking 1 topic:
// - Representative Objectives photo
// - Section dividers injected before specific slide indices
// - Standalone Red-Orange discussion questions injected between sections
// - Blue vs. Yellow comparison slides for each module
// - Custom editable labeled diagram specs for non-photo slides
// - 5-Question Knowledge Check + Speaker-Note Answer Key
// - Source website links & technical standards for References slide

export const MODULE_ENRICHMENTS = {
  '01-introduction-to-networking': {
    objectivesImage: 'images/devices/switch.webp',
    sections: [
      {
        beforeMatch: 'What Is a Computer Network',
        number: 1,
        title: 'FOUNDATIONS OF COMPUTER NETWORKING',
        overview: 'Computer networking connects computers, phones, printers, and servers so people can communicate, share files, and access online services reliably.'
      },
      {
        beforeMatch: 'Network Architecture',
        number: 2,
        title: 'NETWORK ARCHITECTURES & PERFORMANCE',
        overview: 'Networks can be organized around central servers or equal peers, and their quality is measured by bandwidth, throughput, latency, and availability.'
      },
      {
        beforeMatch: 'Personal Area Network',
        number: 3,
        title: 'TYPES OF NETWORKS BY COVERAGE AREA',
        overview: 'Networks are classified by the physical distance they cover—from a single person’s desk (PAN) to an entire room (LAN), city (MAN), or the globe (WAN).'
      }
    ],
    discussions: [
      {
        afterMatch: 'Five Elements of Data Communication',
        question: 'WHAT WOULD HAPPEN IN YOUR SCHOOL OR HOME IF COMPUTER NETWORKS SUDDENLY STOPPED WORKING FOR ONE DAY?'
      },
      {
        afterMatch: 'Network Architecture',
        question: 'WHEN WOULD YOU PREFER A PEER-TO-PEER SETUP OVER A DEDICATED CLIENT-SERVER NETWORK?'
      },
      {
        afterMatch: 'Wide Area Network',
        question: 'WHICH NETWORK TYPES DO YOU USE EVERY DAY FROM THE MOMENT YOU WAKE UP UNTIL YOU ARRIVE AT SCHOOL?'
      }
    ],
    comparisons: [
      {
        afterMatch: 'Network Architecture',
        title: 'CLIENT-SERVER VS PEER-TO-PEER (P2P)',
        leftTitle: 'Client-Server Network',
        leftBullets: [
          'Centralized Server: Dedicated servers store files, accounts, and security policies',
          'Central Administration: Easier to back up data and enforce user permissions',
          'High Scalability: Supports hundreds of school or enterprise workstations',
          'Higher Cost: Requires dedicated server hardware and maintenance'
        ],
        rightTitle: 'Peer-to-Peer (P2P) Network',
        rightBullets: [
          'Equal Peers: Every PC acts as both a client and a light server',
          'Simple Setup: No dedicated server required; easy to connect a few PCs',
          'Low Cost: Ideal for small home offices or temporary classroom groups',
          'Limited Scale: Harder to secure and manage beyond 10 computers'
        ]
      },
      {
        afterMatch: 'Wide Area Network',
        title: 'LOCAL AREA NETWORK (LAN) VS WIDE AREA NETWORK (WAN)',
        leftTitle: 'Local Area Network (LAN)',
        leftBullets: [
          'Small Coverage: Spans a single room, computer lab, home, or building',
          'Private Ownership: Owned and managed by the school, home, or office',
          'High Speed & Low Delay: Gigabit Ethernet and Wi-Fi with sub-millisecond delay',
          'Equipment: Built with local switches, UTP patch cables, and access points'
        ],
        rightTitle: 'Wide Area Network (WAN)',
        rightBullets: [
          'Broad Coverage: Connects distant cities, provinces, and countries worldwide',
          'Service Provider Links: Uses leased telecom fiber, undersea cables, and satellites',
          'Higher Latency: Long physical distances add measurable travel time (ms)',
          'Prime Example: The global Internet connecting millions of local LANs'
        ]
      }
    ],
    quiz: [
      {
        question: 'Which of the five elements of data communication defines the agreed rules for formatting and timing messages?',
        choices: ['A. Sender', 'B. Medium', 'C. Protocol', 'D. Receiver'],
        answer: 'C (Protocol)',
        explanation: 'A protocol is the set of rules governing how data is formatted, transmitted, and acknowledged between sender and receiver.'
      },
      {
        question: 'Which performance measure describes the actual amount of data successfully delivered per second?',
        choices: ['A. Bandwidth', 'B. Throughput', 'C. Latency', 'D. Jitter'],
        answer: 'B (Throughput)',
        explanation: 'Bandwidth is theoretical maximum capacity, while throughput is the real measured delivery rate achieved across the link.'
      },
      {
        question: 'In which network architecture does every computer share files directly without a dedicated central server?',
        choices: ['A. Client-Server', 'B. Peer-to-Peer (P2P)', 'C. Wide Area Network', 'D. Mainframe'],
        answer: 'B (Peer-to-Peer)',
        explanation: 'In a Peer-to-Peer (P2P) network, connected computers act as equal peers sharing folders and printers directly.'
      },
      {
        question: 'Which network type connects personal devices like wireless earbuds and a smartwatch within a few meters of one person?',
        choices: ['A. PAN', 'B. LAN', 'C. MAN', 'D. WAN'],
        answer: 'A (PAN)',
        explanation: 'A Personal Area Network (PAN) connects devices within personal reach (1–10 meters) via Bluetooth or USB.'
      },
      {
        question: 'A computer laboratory connecting 30 student PCs and a shared printer inside one room is an example of a:',
        choices: ['A. PAN', 'B. LAN', 'C. MAN', 'D. WAN'],
        answer: 'B (LAN)',
        explanation: 'A Local Area Network (LAN) interconnects computers and resources within a limited area such as a room, lab, or building.'
      }
    ],
    standards: [
      'IEEE 802.3 & 802.11: Foundational LAN and Wireless LAN architecture standards',
      'ISO/IEC 7498-1: Basic Reference Model for data communication systems',
      'Course Module: Networking 1 — Module 01 (Prepared by Rod Allen B. Agregado)'
    ]
  },

  '03-network-topologies': {
    objectivesImage: 'images/devices/switch.webp',
    sections: [
      {
        beforeMatch: 'What Is a Network Topology',
        number: 1,
        title: 'PHYSICAL VS LOGICAL TOPOLOGIES',
        overview: 'A network topology describes how computers and cables are arranged physically in a room and how data signals flow logically between them.'
      },
      {
        beforeMatch: 'Star Topology',
        number: 2,
        title: 'CORE LAN TOPOLOGIES: STAR, BUS, AND RING',
        overview: 'Compare how Star networks connect every host to a central switch, while Bus and Ring topologies share a common backbone or loop.'
      },
      {
        beforeMatch: 'Mesh Topology',
        number: 3,
        title: 'RESILIENT & SCALABLE TOPOLOGIES: MESH, TREE, AND HYBRID',
        overview: 'Modern campuses and WANs combine redundant Mesh links, hierarchical Tree layouts, and Hybrid designs to balance cost and fault tolerance.'
      }
    ],
    discussions: [
      {
        afterMatch: 'Six Common Network Topologies',
        question: 'WHY DO ALMOST ALL MODERN SCHOOL COMPUTER LABS USE A STAR TOPOLOGY INSTEAD OF A BUS TOPOLOGY?'
      },
      {
        afterMatch: 'Ring Topology',
        question: 'WHAT HAPPENS TO THE REST OF THE CLASSROOM IF ONE WORKSTATION CABLE BREAKS IN A STAR VS A BUS NETWORK?'
      }
    ],
    comparisons: [
      {
        afterMatch: 'Bus Topology',
        title: 'STAR TOPOLOGY VS BUS TOPOLOGY',
        leftTitle: 'Star Topology (Modern LAN Standard)',
        leftBullets: [
          'Central Switch: Every computer has its own dedicated UTP cable to a central switch',
          'Easy Fault Isolation: A broken drop cable affects only that single workstation',
          'Simple Expansion: Add new computers anytime by plugging into an open switch port',
          'Single Point of Failure: If the central switch loses power, the local star stops'
        ],
        rightTitle: 'Bus Topology (Legacy Backbone)',
        rightBullets: [
          'Shared Coaxial Backbone: All computers tap into one single main cable line',
          'Low Cable Cost: Uses less cable initially for a short row of computers',
          'Fragile Main Line: A single break or missing terminator shuts down the entire bus',
          'Signal Collisions: Performance drops as more stations compete on the same wire'
        ]
      },
      {
        afterMatch: 'Hybrid Topology',
        title: 'FULL MESH VS HIERARCHICAL TREE TOPOLOGY',
        leftTitle: 'Mesh Topology (High Redundancy)',
        leftBullets: [
          'Multiple Direct Paths: Routers or critical nodes interconnect across redundant links',
          'Automatic Failover: Traffic reroutes around a broken link without downtime',
          'Formula n(n − 1) / 2: Full mesh link count grows rapidly as nodes are added',
          'Best Use Case: Core WAN backbones, data centers, and wireless mesh systems'
        ],
        rightTitle: 'Tree Topology (Campus Hierarchy)',
        rightBullets: [
          'Star-of-Stars Structure: Core switch connects distribution and classroom access switches',
          'Organized Scaling: Neatly groups rooms, floors, and departments across a building',
          'Easy Troubleshooting: Faults stay contained within individual classroom branches',
          'Best Use Case: Multi-floor schools, universities, and office buildings'
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the difference between a physical topology and a logical topology?',
        choices: ['A. Wired vs wireless', 'B. Cable layout vs actual data path', 'C. Fast vs slow', 'D. LAN vs WAN'],
        answer: 'B (Cable layout vs actual data path)',
        explanation: 'Physical topology is the physical arrangement of cables and devices; logical topology is how data actually flows across the medium.'
      },
      {
        question: 'In a Star topology, what happens if the patch cable to one student computer is unplugged?',
        choices: ['A. The whole network stops', 'B. Only that single computer disconnects', 'C. The switch resets', 'D. Ring reverses'],
        answer: 'B (Only that single computer disconnects)',
        explanation: 'Each host in a Star topology has an independent link to the switch, so a single cable fault affects only that device.'
      },
      {
        question: 'How many physical links are required for a Full Mesh network connecting 5 core routers?',
        choices: ['A. 5 links', 'B. 10 links', 'C. 15 links', 'D. 20 links'],
        answer: 'B (10 links)',
        explanation: 'Using the full-mesh formula n(n − 1) / 2: 5 × 4 / 2 = 10 links.'
      },
      {
        question: 'Which topology arranges multiple Star networks into a parent-child hierarchy across building floors?',
        choices: ['A. Bus', 'B. Ring', 'C. Tree (Extended Star)', 'D. Point-to-Point'],
        answer: 'C (Tree / Extended Star)',
        explanation: 'A Tree topology connects multiple star-wired access switches up to distribution and core switches.'
      },
      {
        question: 'Why are terminators required at both ends of a legacy Bus topology backbone?',
        choices: ['A. Boost Wi-Fi', 'B. Absorb signals and prevent bounce', 'C. Assign IP addresses', 'D. Encrypt data'],
        answer: 'B (Absorb signals and prevent bounce)',
        explanation: 'Terminators absorb electrical signals at the ends of a coaxial bus so signals do not reflect and corrupt transmissions.'
      }
    ],
    standards: [
      'IEEE 802.3 Star-Wired Ethernet & TIA-568 Structured Cabling Topology Guidelines',
      'Cisco Three-Tier Hierarchical Campus Design (Core, Distribution, Access)',
      'Course Module: Networking 1 — Module 02 (Prepared by Rod Allen B. Agregado)'
    ]
  },

  '04-network-devices': {
    objectivesImage: 'images/devices/router.webp',
    sections: [
      {
        beforeMatch: 'Overview of Network Devices',
        number: 1,
        title: 'HOST INTERFACES & SIGNAL REPEATERS',
        overview: 'Every device needs a Network Interface Card (NIC) to join a network, while repeaters and hubs handle raw physical signals on a wire.'
      },
      {
        beforeMatch: 'Switch',
        number: 2,
        title: 'INTELLIGENT LAN SWITCHING & WIRELESS ACCESS',
        overview: 'Ethernet switches learn MAC addresses to deliver frames directly to the right port, while Wireless Access Points bridge Wi-Fi clients onto the wired LAN.'
      },
      {
        beforeMatch: 'Router',
        number: 3,
        title: 'ROUTERS, MODEMS, AND VIRTUAL LANS (VLANS)',
        overview: 'Routers connect different IP networks and choose forwarding paths, modems translate ISP line signals, and VLANs segment switches logically.'
      }
    ],
    discussions: [
      {
        afterMatch: 'Hub and Bridge',
        question: 'WHY DID NETWORK ENGINEERS REPLACE LEGACY ETHERNET HUBS WITH INTELLIGENT SWITCHES IN MODERN LANS?'
      },
      {
        afterMatch: 'Modem',
        question: 'WHAT IS THE DIFFERENCE BETWEEN THE JOB OF A MODEM, A ROUTER, AND A SWITCH IN YOUR HOME INTERNET SETUP?'
      }
    ],
    comparisons: [
      {
        afterMatch: 'Switch',
        title: 'ETHERNET HUB VS ETHERNET SWITCH',
        leftTitle: 'Ethernet Switch (Intelligent Forwarding)',
        leftBullets: [
          'MAC Address Table: Learns which hardware MAC address sits on each switch port',
          'Targeted Delivery: Sends unicast frames only to the destination device’s port',
          'Separate Collision Domains: Every port enjoys full-duplex bandwidth without collisions',
          'Higher Security & Speed: Other computers cannot easily overhear unicast traffic'
        ],
        rightTitle: 'Ethernet Hub (Legacy Multiport Repeater)',
        rightBullets: [
          'No Address Memory: Does not inspect MAC addresses or store a forwarding table',
          'Blind Flooding: Repeats every incoming electrical signal out to all other ports',
          'Shared Collision Domain: Only one device can transmit cleanly at a time',
          'Wasted Bandwidth: Traffic slows down as more computers are plugged in'
        ]
      },
      {
        afterMatch: 'Router',
        title: 'ETHERNET SWITCH VS NETWORK ROUTER',
        leftTitle: 'Ethernet Switch (Connects Devices in One LAN)',
        leftBullets: [
          'Local LAN Scope: Connects computers, printers, and servers inside the same subnet',
          'Reads MAC Addresses: Uses hardware MAC addresses to switch frames locally',
          'Forwards Broadcasts: Broadcasts stay inside the switch’s local VLAN/LAN',
          'High Port Density: Typically provides 8, 24, or 48 RJ45 ports for workstations'
        ],
        rightTitle: 'Network Router (Connects Different Networks)',
        rightBullets: [
          'Inter-Network Scope: Joins separate LANs together and connects the LAN to the WAN/ISP',
          'Reads IP Addresses: Consults its routing table to forward packets by destination IP',
          'Blocks LAN Broadcasts: Keeps local broadcast storms from spilling into other networks',
          'Default Gateway Role: Serves as the exit door for hosts reaching outside networks'
        ]
      }
    ],
    quiz: [
      {
        question: 'Which hardware component gives a computer its physical connection port and burned-in MAC address?',
        choices: ['A. Repeater', 'B. Network Interface Card (NIC)', 'C. Modem', 'D. Hub'],
        answer: 'B (Network Interface Card / NIC)',
        explanation: 'A NIC connects a computer to a wired or wireless medium and provides its unique hardware MAC address.'
      },
      {
        question: 'How does an Ethernet switch know which port to send a frame out of?',
        choices: ['A. It guesses randomly', 'B. It inspects its MAC address table', 'C. It asks DNS', 'D. It floods every frame forever'],
        answer: 'B (It inspects its MAC address table)',
        explanation: 'A switch records source MAC addresses on incoming ports and uses that MAC table to forward frames directly to the target port.'
      },
      {
        question: 'Which device connects two or more different IP networks (such as your school LAN and the ISP WAN)?',
        choices: ['A. Hub', 'B. Repeater', 'C. Router', 'D. Patch Panel'],
        answer: 'C (Router)',
        explanation: 'A router inspects destination IP addresses and routes packets between separate networks.'
      },
      {
        question: 'What is the primary role of a Modem (Modulator-Demodulator)?',
        choices: ['A. Convert ISP line signals to digital Ethernet', 'B. Assign switch VLANs', 'C. Crimp RJ45 plugs', 'D. Block viruses'],
        answer: 'A (Convert ISP line signals to digital Ethernet)',
        explanation: 'A modem translates between the service provider’s coaxial/fiber/DSL transmission signals and digital Ethernet frames.'
      },
      {
        question: 'What benefit does dividing a physical switch into Virtual LANs (VLANs) provide?',
        choices: ['A. Longer cables', 'B. Isolates broadcast domains by department', 'C. Removes need for NICs', 'D. Doubles Wi-Fi range'],
        answer: 'B (Isolates broadcast domains by department)',
        explanation: 'VLANs segment one physical switch into separate logical broadcast domains (e.g., Students, Staff, Guests) for speed and security.'
      }
    ],
    standards: [
      'IEEE 802.1D / 802.1Q: MAC Bridging, Ethernet Switching, and Virtual LAN (VLAN) Standards',
      'IETF RFC 1812: Requirements for IP Version 4 Routers',
      'Course Module: Networking 1 — Module 03 (Prepared by Rod Allen B. Agregado)'
    ]
  },

  'osi-reference-model': {
    objectivesImage: 'images/devices/server.webp',
    sections: [
      {
        beforeMatch: 'Networking Standards',
        number: 1,
        title: 'NETWORKING STANDARDS & WHY LAYERED MODELS EXIST',
        overview: 'International standards organizations (ISO, IEEE, IETF, ITU, TIA/EIA) created open rules so hardware and software from any vendor can communicate.'
      },
      {
        beforeMatch: 'Seven OSI Layer Responsibilities',
        number: 2,
        title: 'THE SEVEN LAYERS OF THE OSI MODEL',
        overview: 'The OSI Reference Model divides network communication into seven numbered layers—from Layer 7 (Application) down to Layer 1 (Physical).'
      },
      {
        beforeMatch: 'Five OSI Protocol Data Units',
        number: 3,
        title: 'PROTOCOL DATA UNITS (PDUS) & ENCAPSULATION',
        overview: 'As a message travels down the sender’s stack, each layer wraps it with a header (Data → Segment → Packet → Frame → Bits) and unwraps it at the receiver.'
      }
    ],
    discussions: [
      {
        afterMatch: 'What Is the OSI Reference Model',
        question: 'WHY IS IT EASIER TO TROUBLESHOOT A BROKEN NETWORK WHEN COMMUNICATION IS DIVIDED INTO SEVEN SEPARATE LAYERS?'
      },
      {
        afterMatch: 'Lower Media Layers',
        question: 'HOW IS SENDING A LETTER IN A LABELED ENVELOPE SIMILAR TO OSI ENCAPSULATION AND DECAPSULATION?'
      }
    ],
    comparisons: [
      {
        afterMatch: 'Lower Media Layers',
        title: 'UPPER HOST LAYERS (L7–L5) VS LOWER MEDIA LAYERS (L4–L1)',
        leftTitle: 'Upper Host Layers (Layers 7, 6, and 5)',
        leftBullets: [
          'Layer 7 Application: User-facing network protocols (HTTP, DNS, DHCP, SMTP)',
          'Layer 6 Presentation: Data formatting, character encoding (UTF-8), compression, TLS encryption',
          'Layer 5 Session: Starts, manages, and closes dialog sessions between applications',
          'PDU Name: Works directly with application Data inside the host operating system'
        ],
        rightTitle: 'Lower Media & Transport Layers (Layers 4, 3, 2, and 1)',
        rightBullets: [
          'Layer 4 Transport (Segment): End-to-end TCP/UDP delivery and service port numbers',
          'Layer 3 Network (Packet): Logical IP addressing and router path selection across networks',
          'Layer 2 Data Link (Frame): Hardware MAC addressing, switch forwarding, and FCS error check',
          'Layer 1 Physical (Bits): Raw 1s and 0s transmitted as electrical, optical, or radio signals'
        ]
      }
    ],
    quiz: [
      {
        question: 'Which international organization developed the seven-layer Open Systems Interconnection (OSI) Reference Model?',
        choices: ['A. IEEE', 'B. ISO', 'C. IETF', 'D. W3C'],
        answer: 'B (ISO — International Organization for Standardization)',
        explanation: 'ISO published the OSI Reference Model (ISO/IEC 7498-1) in 1984 to standardize layered network architecture.'
      },
      {
        question: 'Which OSI layer is responsible for logical IP addressing and routing packets across different networks?',
        choices: ['A. Layer 1 (Physical)', 'B. Layer 2 (Data Link)', 'C. Layer 3 (Network)', 'D. Layer 4 (Transport)'],
        answer: 'C (Layer 3 — Network)',
        explanation: 'Layer 3 (Network) adds source and destination IP addresses and routes packets across networks.'
      },
      {
        question: 'What is the correct Protocol Data Unit (PDU) name at Layer 2 (Data Link Layer)?',
        choices: ['A. Segment', 'B. Packet', 'C. Frame', 'D. Bits'],
        answer: 'C (Frame)',
        explanation: 'The PDU names from top to bottom are: Data (L7–L5) → Segment (L4) → Packet (L3) → Frame (L2) → Bits (L1).'
      },
      {
        question: 'Which OSI layer handles data encryption (TLS), compression, and character encoding (UTF-8)?',
        choices: ['A. Layer 7 (Application)', 'B. Layer 6 (Presentation)', 'C. Layer 5 (Session)', 'D. Layer 2 (Data Link)'],
        answer: 'B (Layer 6 — Presentation)',
        explanation: 'The Presentation layer formats, encodes, compresses, and encrypts data so the receiving application can read it.'
      },
      {
        question: 'What do we call the process where a sending computer wraps data with layer headers from Layer 7 down to Layer 1?',
        choices: ['A. Decapsulation', 'B. Encapsulation', 'C. Fragmentation', 'D. Modulation'],
        answer: 'B (Encapsulation)',
        explanation: 'Encapsulation wraps application data with Transport, Network, and Data Link headers before transmitting bits on the medium.'
      }
    ],
    standards: [
      'ISO/IEC 7498-1: Information Technology — Open Systems Interconnection Basic Reference Model',
      'IEEE 802 & IETF RFC 1122: Host and Local Network Layer Standards',
      'Course Module: Networking 1 — Module 04 (Prepared by Rod Allen B. Agregado)'
    ]
  },

  '06-network-cables-media': {
    objectivesImage: 'images/media/utp_cable.webp',
    sections: [
      {
        beforeMatch: 'Three Primary Transmission Media',
        number: 1,
        title: 'COPPER, FIBER-OPTIC, AND WIRELESS MEDIA',
        overview: 'Network signals travel as electrical pulses over copper wires, light pulses over glass fiber, or electromagnetic radio waves through the air.'
      },
      {
        beforeMatch: 'RJ45 and Modular Connectors',
        number: 2,
        title: 'RJ45 CONNECTORS & T568A / T568B PINOUT STANDARDS',
        overview: 'Eight-pin RJ45 plugs terminate twisted-pair Ethernet cables using either the T568A or T568B color order to control crosstalk over 100-meter runs.'
      },
      {
        beforeMatch: 'Six Essential Cabling Tools',
        number: 3,
        title: 'CABLING TOOLS, CRIMPING PROCEDURE, AND FAULT TESTING',
        overview: 'Proper stripping, untwisting, crimping, and verification with a cable tester prevent opens, shorts, miswires, and split pairs.'
      }
    ],
    discussions: [
      {
        afterMatch: 'Wireless Media',
        question: 'WHEN WOULD YOU CHOOSE FIBER-OPTIC CABLE INSTEAD OF COPPER UTP CABLE WHEN WIRING A SCHOOL CAMPUS?'
      },
      {
        afterMatch: 'Straight-Through vs Crossover',
        question: 'WHY MUST WE KEEP WIRE PAIRS TWISTED ALL THE WAY UP TO THE RJ45 PLUG WHEN CRIMPING A PATCH CABLE?'
      }
    ],
    comparisons: [
      {
        afterMatch: 'Shielded Twisted Pair',
        title: 'UNSHIELDED (UTP) VS SHIELDED TWISTED PAIR (STP)',
        leftTitle: 'Unshielded Twisted Pair (UTP)',
        leftBullets: [
          'Twisted Pairs Only: Relies on tight pair twisting (4 pairs / 8 wires) to cancel crosstalk',
          'Flexible & Affordable: Easy to pull through walls, conduits, and classroom raceways',
          'Standard LAN Choice: Most common cable for home, school, and office Ethernet drops',
          '100-Meter Limit: Supports up to 1 Gbps / 10 Gbps across a 100 m horizontal channel'
        ],
        rightTitle: 'Shielded Twisted Pair (STP)',
        rightBullets: [
          'Foil / Braided Shield: Adds metallic foil or braid around pairs to block external EMI/RFI',
          'High-Noise Environments: Ideal near heavy motors, elevators, generators, or medical gear',
          'Stiffer & pricier: Thicker jacket requires careful bend radius and grounded connectors',
          '100-Meter Limit: Protects high-frequency Cat 6A / Cat 7 signals from interference'
        ]
      },
      {
        afterMatch: 'T568B: eight conductor positions',
        title: 'TIA/EIA-568 PINOUT: T568A VS T568B',
        leftTitle: 'T568A Color Order (Pins 1 to 8)',
        leftBullets: [
          'Pin 1 & Pin 2 (Green Pair): Pin 1 = White/Green, Pin 2 = Green',
          'Pin 3 & Pin 6 (Orange Pair): Pin 3 = White/Orange, Pin 6 = Orange',
          'Pin 4 & Pin 5 (Blue Pair): Pin 4 = Blue, Pin 5 = White/Blue (center pins)',
          'Pin 7 & Pin 8 (Brown Pair): Pin 7 = White/Brown, Pin 8 = Brown'
        ],
        rightTitle: 'T568B Color Order (Pins 1 to 8)',
        rightBullets: [
          'Pin 1 & Pin 2 (Orange Pair): Pin 1 = White/Orange, Pin 2 = Orange',
          'Pin 3 & Pin 6 (Green Pair): Pin 3 = White/Green, Pin 6 = Green',
          'Pin 4 & Pin 5 (Blue Pair): Pin 4 = Blue, Pin 5 = White/Blue (identical to T568A)',
          'Pin 7 & Pin 8 (Brown Pair): Pin 7 = White/Brown, Pin 8 = Brown (most common in PH/US LANs)'
        ]
      }
    ],
    quiz: [
      {
        question: 'Why are the copper wire pairs inside a UTP cable twisted together at different rates?',
        choices: ['A. To make the cable shorter', 'B. To cancel electromagnetic interference and crosstalk', 'C. To boost voltage', 'D. For color coding'],
        answer: 'B (To cancel electromagnetic interference and crosstalk)',
        explanation: 'Twisting each differential pair cancels out electromagnetic noise from adjacent pairs and outside sources.'
      },
      {
        question: 'What is the maximum recommended length of a standard horizontal copper Ethernet (UTP) cable run?',
        choices: ['A. 10 meters', 'B. 50 meters', 'C. 100 meters (328 feet)', 'D. 500 meters'],
        answer: 'C (100 meters / 328 feet)',
        explanation: 'TIA/EIA-568 specifies 100 meters (90 m permanent link + 10 m patch cords) before signal attenuation requires a switch/repeater.'
      },
      {
        question: 'In a T568B RJ45 pinout, which wire colors go into Pin 1 and Pin 2?',
        choices: ['A. White/Green, Green', 'B. White/Orange, Orange', 'C. Blue, White/Blue', 'D. White/Brown, Brown'],
        answer: 'B (White/Orange, Orange)',
        explanation: 'T568B places White/Orange on Pin 1 and Orange on Pin 2 (whereas T568A places White/Green on Pin 1 and Green on Pin 2).'
      },
      {
        question: 'How is a Straight-Through Ethernet patch cable terminated?',
        choices: ['A. T568A on one end, T568B on the other', 'B. Same standard (T568B–T568B or T568A–T568A) on both ends', 'C. Only 4 wires crimped', 'D. Coaxial BNC on both ends'],
        answer: 'B (Same standard on both ends)',
        explanation: 'A straight-through cable uses the identical pinout (most commonly T568B to T568B) on both ends to connect a PC to a switch.'
      },
      {
        question: 'Which wiring fault occurs when pins 1–8 match end-to-end on a basic continuity check, but Pins 3 and 6 use wires from different twisted pairs?',
        choices: ['A. Open circuit', 'B. Short circuit', 'C. Split pair', 'D. Reversed pair'],
        answer: 'C (Split pair)',
        explanation: 'A split pair passes simple continuity tests because pin numbers still match end-to-end, but separating the twisted pair causes severe crosstalk.'
      }
    ],
    standards: [
      'ANSI/TIA-568.2-D: Balanced Twisted-Pair Telecommunications Cabling and Components Standard',
      'IEEE 802.3ab (1000BASE-T) & IEEE 802.3an (10GBASE-T) Physical Layer Specifications',
      'Course Module: Networking 1 — Module 05 (Prepared by Rod Allen B. Agregado)'
    ]
  },

  'network-protocols-services': {
    objectivesImage: 'images/devices/server.webp',
    sections: [
      {
        beforeMatch: 'Four TCP/IP Layers',
        number: 1,
        title: 'THE TCP/IP PROTOCOL SUITE & OSI MAPPING',
        overview: 'Real networks run the four-layer TCP/IP suite (Application, Transport, Internet, Link), mapping directly to the seven conceptual OSI layers.'
      },
      {
        beforeMatch: 'Transport Reliability',
        number: 2,
        title: 'TRANSPORT DELIVERY: TCP VS UDP & PORT NUMBERS',
        overview: 'At the Transport layer, TCP guarantees reliable ordered delivery with acknowledgments, while UDP sends fast low-overhead datagrams for live media.'
      },
      {
        beforeMatch: 'Ten Core Network Protocols',
        number: 3,
        title: 'CORE INFRASTRUCTURE & WEB PROTOCOLS (ARP, DNS, DHCP, HTTP/HTTPS)',
        overview: 'Opening a single web page coordinates DHCP for IP setup, DNS for name lookup, ARP for local MAC discovery, TCP for transport, and HTTPS for encrypted web content.'
      }
    ],
    discussions: [
      {
        afterMatch: 'Transport Reliability',
        question: 'WHY DO LIVE VIDEO CALLS AND ONLINE GAMES PREFER UDP WHILE BANK TRANSFERS AND FILE DOWNLOADS REQUIRE TCP?'
      },
      {
        afterMatch: 'A Web Request Uses Several Services',
        question: 'WHAT WOULD HAPPEN IF DNS STOPPED WORKING ON YOUR NETWORK EVEN THOUGH YOUR INTERNET CABLE WAS STILL CONNECTED?'
      }
    ],
    comparisons: [
      {
        afterMatch: 'Transport Reliability',
        title: 'TRANSMISSION CONTROL PROTOCOL (TCP) VS USER DATAGRAM PROTOCOL (UDP)',
        leftTitle: 'TCP (Connection-Oriented & Reliable)',
        leftBullets: [
          '3-Way Handshake: Establishes a connection (SYN, SYN-ACK, ACK) before sending data',
          'Guaranteed Delivery: Numbers bytes and retransmits any lost or corrupted segments',
          'In-Order Reassembly: Arranges arriving segments in exact sequence for the application',
          'Common Uses: Web browsing (HTTP/HTTPS), Email (SMTP/IMAP), File transfer (FTP/SSH)'
        ],
        rightTitle: 'UDP (Connectionless & Low-Latency)',
        rightBullets: [
          'No Handshake Delay: Sends datagrams immediately without setting up a session first',
          'Best-Effort Delivery: Does not pause to retransmit dropped packets',
          'Minimal Header Overhead: Keeps latency low for time-sensitive live streams',
          'Common Uses: DNS lookups (53), DHCP (67/68), VoIP calls, live video, online gaming'
        ]
      }
    ],
    quiz: [
      {
        question: 'Which TCP/IP layer combines the functions of OSI Layers 5, 6, and 7?',
        choices: ['A. Link Layer', 'B. Internet Layer', 'C. Transport Layer', 'D. Application Layer'],
        answer: 'D (Application Layer)',
        explanation: 'The TCP/IP Application layer encompasses OSI Application (L7), Presentation (L6), and Session (L5) responsibilities.'
      },
      {
        question: 'Which protocol translates a human-friendly website name like www.example.edu.ph into an IP address?',
        choices: ['A. ARP', 'B. DHCP', 'C. DNS', 'D. ICMP'],
        answer: 'C (DNS — Domain Name System)',
        explanation: 'DNS (port 53) resolves domain names into numerical IPv4 or IPv6 addresses.'
      },
      {
        question: 'Which protocol discovers the hardware MAC address associated with a known local IPv4 address on the same LAN?',
        choices: ['A. ARP', 'B. DNS', 'C. HTTPS', 'D. SSH'],
        answer: 'A (ARP — Address Resolution Protocol)',
        explanation: 'ARP broadcasts a request on the local subnet asking which host owns a target IPv4 address and learns its MAC address.'
      },
      {
        question: 'What default port number is used by HTTPS for encrypted web traffic?',
        choices: ['A. Port 22', 'B. Port 53', 'C. Port 80', 'D. Port 443'],
        answer: 'D (Port 443)',
        explanation: 'HTTP uses TCP port 80 (unencrypted), while HTTPS uses TCP port 443 (TLS-encrypted).'
      },
      {
        question: 'Which protocol is used by the ping command to test reachability and report errors?',
        choices: ['A. ICMP', 'B. SMTP', 'C. FTP', 'D. DHCP'],
        answer: 'A (ICMP — Internet Control Message Protocol)',
        explanation: 'Ping sends ICMP Echo Request packets and listens for ICMP Echo Reply messages to verify connectivity.'
      }
    ],
    standards: [
      'IETF RFC 791 (IPv4), RFC 792 (ICMP), RFC 793 (TCP), RFC 768 (UDP)',
      'IETF RFC 826 (ARP), RFC 1035 (DNS), RFC 2131 (DHCP), RFC 9110 (HTTP)',
      'Course Module: Networking 1 — Module 06 (Prepared by Rod Allen B. Agregado)'
    ]
  },

  '08-ip-addressing': {
    objectivesImage: 'images/devices/router.webp',
    sections: [
      {
        beforeMatch: 'What Is an Internet Protocol Address',
        number: 1,
        title: 'IPV4 STRUCTURE, BINARY OCTETS, AND ADDRESS CLASSES',
        overview: 'An IPv4 address is a 32-bit logical identifier written as four decimal octets (0–255) and historically grouped into Classes A through E by leading priority bits.'
      },
      {
        beforeMatch: 'What Is a Subnet',
        number: 2,
        title: 'SUBNET MASKS, CIDR NOTATION, AND 5-STEP MANUAL SUBNETTING',
        overview: 'Subnetting divides a large network into smaller broadcast domains using a subnet mask or CIDR prefix (/24–/30) and a five-step bit-borrowing process.'
      },
      {
        beforeMatch: 'Three Private IPv4 Address Ranges',
        number: 3,
        title: 'PRIVATE RANGES (RFC 1918), SPECIAL IPS, AND IPV6 BASICS',
        overview: 'Private IPv4 ranges power local LANs behind NAT, special addresses handle loopback and APIPA, and 128-bit hexadecimal IPv6 solves global IP exhaustion.'
      }
    ],
    discussions: [
      {
        afterMatch: 'Five IPv4 Address Classes',
        question: 'WHY DOES A COMPUTER NEED BOTH A LOGICAL IP ADDRESS AND A PHYSICAL MAC ADDRESS TO COMMUNICATE?'
      },
      {
        afterMatch: 'Five Steps to Subnet a Network',
        question: 'HOW DOES SPLITTING ONE SCHOOL NETWORK INTO STUDENT, FACULTY, AND GUEST SUBNETS IMPROVE BOTH SPEED AND SECURITY?'
      }
    ],
    comparisons: [
      {
        afterMatch: 'What Is a Subnet and Why Do We Subnet',
        title: 'FLAT NETWORK (WITHOUT SUBNETTING) VS SUBNETTED NETWORK',
        leftTitle: 'With Subnetting (Segmented Departments)',
        leftBullets: [
          'Contained Broadcasts: Broadcast traffic stays inside each department’s own /24 or /26 subnet',
          'Router Access Control: Traffic between Students and Staff passes through a router firewall',
          'Right-Sized IP Blocks: Allocates address blocks that match actual room or VLAN headcount',
          'Easier Troubleshooting: Isolates IP conflicts or broadcast storms to one small subnet'
        ],
        rightTitle: 'Without Subnetting (One Large Flat Domain)',
        rightBullets: [
          'Uncontrolled Broadcasts: Every ARP and broadcast frame reaches all PCs across every department',
          'No Departmental Isolation: Student PCs sit on the exact same subnet as Staff and Finance servers',
          'Wasted IP Addresses: Huge classful blocks leave thousands of host addresses unused',
          'Slower Performance: Heavy broadcast noise degrades switch and host efficiency'
        ]
      },
      {
        afterMatch: 'Three Private IPv4 Address Ranges',
        title: 'PUBLIC IPV4 ADDRESSES VS PRIVATE IPV4 ADDRESSES (RFC 1918)',
        leftTitle: 'Private IPv4 Addresses (Local LAN Use)',
        leftBullets: [
          'Free for Any LAN: Reusable inside homes, schools, and enterprises without ISP fees',
          'Three RFC 1918 Blocks: 10.0.0.0/8, 172.16.0.0–172.31.255.255 (/12), 192.168.0.0/16',
          'Not Routed on Internet: Public Internet routers drop private IPs directly',
          'Requires NAT: Border router translates private LAN IPs to a public WAN IP for Internet access'
        ],
        rightTitle: 'Public IPv4 Addresses (Global Internet Use)',
        rightBullets: [
          'Globally Unique: No two public Internet servers can use the same public IPv4 address at once',
          'Assigned by IANA / RIR / ISP: Leased or allocated by regional registries and ISPs',
          'Directly Routable: Reachable from anywhere on the global Internet',
          'Conserved via CIDR & NAT: Scarcity of public IPv4 drove CIDR subnetting and IPv6 adoption'
        ]
      }
    ],
    quiz: [
      {
        question: 'How many total bits and octets make up an IPv4 address?',
        choices: ['A. 16 bits (2 octets)', 'B. 32 bits (4 octets of 8 bits)', 'C. 48 bits (6 octets)', 'D. 128 bits (8 groups)'],
        answer: 'B (32 bits divided into 4 octets of 8 bits each)',
        explanation: 'An IPv4 address has 32 binary bits grouped into four 8-bit octets written in dotted-decimal notation (0–255).'
      },
      {
        question: 'Which IPv4 class begins with leading priority bits 110 and has a first-octet range of 192 to 223?',
        choices: ['A. Class A', 'B. Class B', 'C. Class C', 'D. Class D'],
        answer: 'C (Class C)',
        explanation: 'Class C uses priority bits 110, ranges from 192.0.0.0 to 223.255.255.255, and uses a default mask of 255.255.255.0 (/24).'
      },
      {
        question: 'How many usable host addresses are available inside a /26 subnet (mask 255.255.255.192)?',
        choices: ['A. 30 usable hosts', 'B. 62 usable hosts', 'C. 126 usable hosts', 'D. 254 usable hosts'],
        answer: 'B (62 usable hosts)',
        explanation: 'A /26 prefix leaves 32 − 26 = 6 host bits. Total addresses = 2^6 = 64; subtracting Network ID and Broadcast leaves 64 − 2 = 62 usable hosts.'
      },
      {
        question: 'Which of the following IPv4 addresses is a special loopback address used to test the local computer’s TCP/IP stack?',
        choices: ['A. 10.0.0.1', 'B. 127.0.0.1', 'C. 169.254.1.5', 'D. 192.168.1.1'],
        answer: 'B (127.0.0.1)',
        explanation: '127.0.0.0/8 (commonly 127.0.0.1) is reserved for local loopback testing.'
      },
      {
        question: 'How many bits are in an IPv6 address, and how is it written?',
        choices: ['A. 32 bits in decimal', 'B. 48 bits in binary', 'C. 64 bits in octal', 'D. 128 bits in hexadecimal'],
        answer: 'D (128 bits written in colon-separated hexadecimal groups)',
        explanation: 'IPv6 uses 128-bit addresses written as eight 16-bit hexadecimal groups separated by colons (e.g., 2001:db8::1).'
      }
    ],
    standards: [
      'IETF RFC 791 (IPv4), RFC 950 (Subnetting), RFC 4632 (CIDR), RFC 1918 (Private Address Space)',
      'IETF RFC 8200: Internet Protocol, Version 6 (IPv6) Specification',
      'Course Module: Networking 1 — Module 07 (Prepared by Rod Allen B. Agregado)'
    ]
  },

  '10-static-ip': {
    objectivesImage: 'images/devices/server.webp',
    sections: [
      {
        beforeMatch: 'Four Core IPv4 Settings',
        number: 1,
        title: 'CORE IPV4 HOST PARAMETERS & STATIC VS DYNAMIC IP',
        overview: 'Every host requires an IP address, subnet mask, default gateway, and DNS server—assigned either manually (Static IP) or automatically (DHCP).'
      },
      {
        beforeMatch: 'Configuring Static IPv4 in Windows',
        number: 2,
        title: 'STATIC IPV4 CONFIGURATION & FAULT PREVENTION',
        overview: 'Servers, printers, and router gateways use static IPs so clients can always find them at a predictable address without duplicate IP conflicts.'
      },
      {
        beforeMatch: 'What Is DHCP',
        number: 3,
        title: 'AUTOMATIC DHCP LEASES & THE FOUR-STEP DORA EXCHANGE',
        overview: 'A DHCP server leases IP configurations automatically through Discover, Offer, Request, and Acknowledge (DORA), with T1/T2 renewal timers and APIPA fallback.'
      }
    ],
    discussions: [
      {
        afterMatch: 'Static vs Dynamic IP Assignment',
        question: 'WHY DO WE ASSIGN A STATIC IP TO A SCHOOL PRINTER OR ROUTER, BUT USE DHCP FOR HUNDREDS OF STUDENT LAPTOPS AND PHONES?'
      },
      {
        afterMatch: 'DHCP Lease Lifecycle',
        question: 'IF YOUR COMPUTER SHOWS AN IP ADDRESS STARTING WITH 169.254.X.X, WHAT DOES THAT TELL YOU ABOUT YOUR NETWORK?'
      }
    ],
    comparisons: [
      {
        afterMatch: 'Static vs Dynamic IP Assignment',
        title: 'STATIC IP CONFIGURATION VS DYNAMIC (DHCP) ASSIGNMENT',
        leftTitle: 'Static IP Configuration (Manual)',
        leftBullets: [
          'Permanent Address: Administrator types IP, mask, gateway, and DNS manually',
          'Never Changes: Ideal for routers, servers, network printers, and switches',
          'Admin Overhead: Must track assigned IPs carefully in an address plan',
          'Typo Risk: Entering a duplicate IP or wrong gateway causes immediate connection errors'
        ],
        rightTitle: 'Dynamic IP via DHCP (Automatic)',
        rightBullets: [
          'Plug-and-Play Lease: DHCP server assigns IP, mask, gateway, and DNS automatically',
          'Zero Conflict Management: Server tracks active leases and reclaims expired IPs',
          'Easy Scaling: Supports hundreds of laptops, tablets, and guest Wi-Fi phones',
          'Fallback Indicator: Uses 169.254.x.x (APIPA) if the DHCP server cannot be reached'
        ]
      }
    ],
    quiz: [
      {
        question: 'Which IPv4 setting tells a computer where to send packets destined for a different network or the Internet?',
        choices: ['A. Subnet Mask', 'B. Default Gateway', 'C. Loopback Address', 'D. MAC Address'],
        answer: 'B (Default Gateway)',
        explanation: 'The Default Gateway is the local router interface IP that forwards traffic outside the local subnet.'
      },
      {
        question: 'What is the correct order of the four messages in the DHCP DORA process?',
        choices: ['A. Offer, Discover, Acknowledge, Request', 'B. Discover, Offer, Request, Acknowledge', 'C. Request, Offer, Discover, Acknowledge', 'D. Discover, Request, Offer, Acknowledge'],
        answer: 'B (Discover → Offer → Request → Acknowledge)',
        explanation: 'The client broadcasts DHCP Discover, the server replies with Offer, the client broadcasts Request, and the server finalizes with Acknowledge.'
      },
      {
        question: 'At what point in a DHCP lease lifetime does a client attempt its T1 renewal with its original DHCP server?',
        choices: ['A. 10% of lease time', 'B. 50% of lease time', 'C. 87.5% of lease time', 'D. After 100% expiration'],
        answer: 'B (50% of lease time)',
        explanation: 'At T1 (50% of the lease duration), the client sends a unicast renewal request to the original DHCP server; T2 rebinding occurs at 87.5%.'
      },
      {
        question: 'If a Windows PC is set to DHCP but no DHCP server responds, which APIPA address range does it self-assign?',
        choices: ['A. 127.0.0.0/8', 'B. 169.254.0.0/16', 'C. 192.168.1.0/24', 'D. 10.0.0.0/8'],
        answer: 'B (169.254.0.0/16)',
        explanation: 'Automatic Private IP Addressing (APIPA) assigns a link-local 169.254.x.x/16 address when DHCP fails.'
      },
      {
        question: 'Which Windows command displays your full adapter configuration including MAC address, DHCP server IP, and lease expiration timestamps?',
        choices: ['A. ping', 'B. ipconfig /all', 'C. tracert', 'D. arp -a'],
        answer: 'B (ipconfig /all)',
        explanation: 'While basic ipconfig shows IP, mask, and gateway, ipconfig /all adds MAC address, DHCP status, DHCP server, lease times, and DNS servers.'
      }
    ],
    standards: [
      'IETF RFC 2131: Dynamic Host Configuration Protocol (DHCP)',
      'IETF RFC 3927: Dynamic Configuration of IPv4 Link-Local Addresses (APIPA 169.254/16)',
      'Course Module: Networking 1 — Module 08 (Prepared by Rod Allen B. Agregado)'
    ]
  },

  '13-file-printer-sharing': {
    objectivesImage: 'images/devices/server.webp',
    sections: [
      {
        beforeMatch: 'What Is Network Resource Sharing',
        number: 1,
        title: 'PEER-TO-PEER RESOURCE SHARING & NETWORK PROFILES',
        overview: 'Local area networks let computers share project folders and printers over SMB—provided they use a Private network profile and matching discovery settings.'
      },
      {
        beforeMatch: 'Share Permissions vs NTFS',
        number: 2,
        title: 'ACCESS CONTROL: SHARE PERMISSIONS VS NTFS PERMISSIONS',
        overview: 'Windows protects shared folders by combining network Share permissions with local disk NTFS permissions—always enforcing the most restrictive rule.'
      },
      {
        beforeMatch: 'Sharing a Folder and Mapping',
        number: 3,
        title: 'UNC PATHS, MAPPED DRIVES, AND SHARED PRINTERS',
        overview: 'Users connect to shared resources using UNC paths (\\\\Server\\Share), persistent mapped drive letters (Z:), or network printer queues.'
      }
    ],
    discussions: [
      {
        afterMatch: 'Preparing Windows for Sharing',
        question: 'WHY SHOULD YOU ALWAYS SET YOUR LAPTOP TO THE "PUBLIC" NETWORK PROFILE AT A COFFEE SHOP, BUT "PRIVATE" IN A TRUSTED LAB?'
      },
      {
        afterMatch: 'Share Permissions vs NTFS',
        question: 'IF A FOLDER GRANTS "FULL CONTROL" IN SHARE PERMISSIONS BUT "READ-ONLY" IN NTFS PERMISSIONS, WHAT CAN A NETWORK USER ACTUALLY DO?'
      }
    ],
    comparisons: [
      {
        afterMatch: 'Preparing Windows for Sharing',
        title: 'PRIVATE NETWORK PROFILE VS PUBLIC NETWORK PROFILE',
        leftTitle: 'Private Network Profile (Trusted LAN)',
        leftBullets: [
          'Trusted Environment: Used for home, school lab, or office networks you control',
          'Network Discovery ON: Allows your PC to see and be seen by other local computers',
          'File & Printer Sharing ON: Opens Windows Firewall rules for SMB file and printer access',
          'Workgroup Collaboration: Ideal for peer-to-peer classroom folder and printer sharing'
        ],
        rightTitle: 'Public Network Profile (Untrusted Wi-Fi)',
        rightBullets: [
          'Untrusted Environment: Used for airports, cafes, hotels, and public Wi-Fi hotspots',
          'Network Discovery OFF: Hides your computer from other strangers on the same Wi-Fi',
          'Sharing Blocked: Windows Firewall blocks incoming SMB file and printer connections',
          'Default Safety Shield: Protects personal folders from unauthorized local access'
        ]
      },
      {
        afterMatch: 'Share Permissions vs NTFS',
        title: 'SMB SHARE PERMISSIONS VS LOCAL NTFS PERMISSIONS',
        leftTitle: 'Share Permissions (Network Door)',
        leftBullets: [
          'Network-Only Scope: Applies only when users connect over the network via \\\\Server\\Share',
          'Three Simple Levels: Read, Change (Read + Write/Delete), and Full Control',
          'Folder-Wide Rule: Applies uniformly to the entire shared folder and everything inside it',
          'Combined Evaluation: Must be paired with NTFS permissions for final access check'
        ],
        rightTitle: 'NTFS Permissions (File System Lock)',
        rightBullets: [
          'Local & Network Scope: Applies both to local console users and remote network users',
          'Granular Control: Supports Read, Write, Modify, List Folder Contents, and Full Control',
          'Per-File Precision: Can set different permissions on individual subfolders and files',
          'Most Restrictive Wins: Effective network access is the stricter of Share vs NTFS!'
        ]
      }
    ],
    quiz: [
      {
        question: 'Which Windows network profile hides your computer and blocks incoming file sharing on untrusted Wi-Fi hotspots?',
        choices: ['A. Private Profile', 'B. Public Profile', 'C. Domain Profile', 'D. Workgroup Profile'],
        answer: 'B (Public Profile)',
        explanation: 'The Public network profile turns off Network Discovery and blocks incoming file and printer sharing through Windows Firewall.'
      },
      {
        question: 'If a user has "Change" Share permission but "Read" NTFS permission on a shared folder, what is their effective permission over the network?',
        choices: ['A. Full Control', 'B. Change (Modify)', 'C. Read-Only', 'D. No Access'],
        answer: 'C (Read-Only)',
        explanation: 'When Share and NTFS permissions are combined over the network, the most restrictive permission (Read) wins.'
      },
      {
        question: 'Which of the following is a valid Universal Naming Convention (UNC) path to a shared folder named LabDocs on PC1?',
        choices: ['A. http://PC1/LabDocs', 'B. \\\\PC1\\LabDocs', 'C. C:\\PC1\\LabDocs', 'D. ftp://PC1:LabDocs'],
        answer: 'B (\\\\PC1\\LabDocs)',
        explanation: 'A UNC path starts with two backslashes followed by the server hostname/IP and share name: \\\\Server\\Share.'
      },
      {
        question: 'Which network protocol and TCP port does Windows use for modern direct file and printer sharing?',
        choices: ['A. HTTP (Port 80)', 'B. SMB (Port 445)', 'C. DNS (Port 53)', 'D. SSH (Port 22)'],
        answer: 'B (SMB over TCP Port 445)',
        explanation: 'Server Message Block (SMB) operates over TCP port 445 for Windows file and printer sharing.'
      },
      {
        question: 'What is the main advantage of mapping a shared network folder to a drive letter (such as Z:)?',
        choices: ['A. Doubles Internet speed', 'B. Makes the remote share appear in File Explorer like a local drive', 'C. Disables NTFS', 'D. Changes the MAC address'],
        answer: 'B (Makes the remote share appear in File Explorer like a local drive)',
        explanation: 'A mapped network drive assigns a drive letter (e.g., Z:) that reconnects automatically at sign-in for easy access in applications.'
      }
    ],
    standards: [
      'Microsoft SMB 3.x (Server Message Block) & TCP Port 445 File Sharing Specification',
      'NTFS Access Control List (ACL) and Least-Privilege Security Model',
      'Course Module: Networking 1 — Module 09 (Prepared by Rod Allen B. Agregado)'
    ]
  },

  '12-router-wireless': {
    objectivesImage: 'images/router/wifi_router.webp',
    sections: [
      {
        beforeMatch: 'Inside a Home or Lab Wireless Router',
        number: 1,
        title: 'SOHO ROUTER ARCHITECTURE & WAN VS LAN INTERFACES',
        overview: 'A small-office/home-office (SOHO) wireless router combines an IP Router, a 4-port Ethernet Switch, a Wireless Access Point, and a DHCP/NAT gateway in one box.'
      },
      {
        beforeMatch: 'Wireless Frequency Bands',
        number: 2,
        title: 'WI-FI FREQUENCY BANDS (2.4 / 5 / 6 GHZ) & 802.11 STANDARDS',
        overview: 'Wi-Fi networks broadcast an SSID across 2.4 GHz (longer range through walls) and 5 GHz / 6 GHz (wider channels and higher speeds with less interference).'
      },
      {
        beforeMatch: 'Wireless Security',
        number: 3,
        title: 'WIRELESS ENCRYPTION (WPA2 / WPA3) & SAFE ROUTER ADMINISTRATION',
        overview: 'Securing a wireless router requires changing the default admin password, enabling WPA2-AES or WPA3 encryption, and isolating visitors on a Guest Wi-Fi network.'
      }
    ],
    discussions: [
      {
        afterMatch: 'WAN vs LAN Interfaces',
        question: 'WHAT HAPPENS IF YOU ACCIDENTALLY PLUG THE ISP MODEM CABLE INTO A YELLOW LAN PORT INSTEAD OF THE BLUE WAN PORT?'
      },
      {
        afterMatch: 'Wireless Security',
        question: 'WHY IS HAVING A STRONG WI-FI PASSWORD NOT ENOUGH IF YOU LEAVE THE ROUTER ADMIN LOGIN SET TO "ADMIN / ADMIN"?'
      }
    ],
    comparisons: [
      {
        afterMatch: 'WAN vs LAN Interfaces',
        title: 'ROUTER WAN (INTERNET) PORT VS LAN (SWITCH) PORTS',
        leftTitle: 'WAN / Internet Port (Single Uplink)',
        leftBullets: [
          'Connects to ISP Modem: Links your router to the outside service provider network',
          'Receives Public / ISP IP: Obtains one WAN IP address from the ISP via DHCP or PPPoE',
          'Runs NAT & Firewall: Translates private LAN IPs and blocks unsolicited incoming Internet scans',
          'Color Coded: Usually marked in blue or yellow and separated from the LAN ports'
        ],
        rightTitle: 'LAN Ports 1–4 (Built-In Ethernet Switch)',
        rightBullets: [
          'Connects Local Devices: Plugs into desktop PCs, printers, smart TVs, and lab switches',
          'Private Gateway IP: Holds the router’s private LAN IP (e.g., 192.168.1.1/24)',
          'DHCP Server Inside: Hands out private IP leases (e.g., 192.168.1.100–199) to LAN/Wi-Fi hosts',
          'Same Local Subnet: Bridged internally with the router’s primary Wi-Fi Access Point'
        ]
      },
      {
        afterMatch: 'Wireless Frequency Bands',
        title: '2.4 GHZ WI-FI BAND VS 5 GHZ / 6 GHZ WI-FI BANDS',
        leftTitle: '2.4 GHz Wi-Fi Band (Maximum Range)',
        leftBullets: [
          'Longer Coverage Reach: Lower-frequency waves penetrate concrete walls and floors better',
          'Universal Compatibility: Supported by older laptops, smart bulbs, and IoT sensors',
          'Crowded Spectrum: Only 3 non-overlapping channels (1, 6, and 11); shares airwaves with Bluetooth',
          'Moderate Speed: Narrower channels result in lower peak throughput than 5 GHz'
        ],
        rightTitle: '5 GHz & 6 GHz Bands (High-Speed Performance)',
        rightBullets: [
          'Faster Gigabit Speeds: Wider channels (40/80/160 MHz) deliver high throughput for HD video',
          'Clean Airwaves: Dozens of non-overlapping channels with minimal appliance interference',
          'Shorter Wall Reach: Higher frequencies weaken faster through thick walls and doors',
          'Modern Wi-Fi 5/6/6E: Best choice for laptops and phones in the same room as the AP'
        ]
      }
    ],
    quiz: [
      {
        question: 'Which three networking devices are combined inside a typical home or classroom wireless router?',
        choices: ['A. Hub, Modem, Coax', 'B. Router, Ethernet Switch, and Wireless Access Point', 'C. Crimper, Tester, NIC', 'D. Mainframe, Repeater, Bridge'],
        answer: 'B (Router, Ethernet Switch, and Wireless Access Point)',
        explanation: 'A SOHO wireless router integrates a Layer 3 router (WAN/LAN), a multi-port Layer 2 switch, and a Wi-Fi access point.'
      },
      {
        question: 'Which port on a wireless router should be connected to the ISP fiber/cable modem?',
        choices: ['A. LAN Port 1', 'B. WAN (Internet) Port', 'C. USB Port', 'D. Console Port'],
        answer: 'B (WAN / Internet Port)',
        explanation: 'The WAN (Wide Area Network) port connects upstream to the ISP modem, while LAN ports connect local wired computers.'
      },
      {
        question: 'Which three 2.4 GHz Wi-Fi channels do NOT overlap with one another?',
        choices: ['A. Channels 1, 2, 3', 'B. Channels 1, 6, 11', 'C. Channels 2, 4, 8', 'D. Channels 5, 10, 15'],
        answer: 'B (Channels 1, 6, and 11)',
        explanation: 'In the 2.4 GHz band, channels 1, 6, and 11 are spaced 25 MHz apart so their 20/22 MHz signals do not overlap.'
      },
      {
        question: 'Which wireless security standards are recommended for protecting modern Wi-Fi networks?',
        choices: ['A. Open Wi-Fi or WEP', 'B. WPA2-AES or WPA3-SAE', 'C. MAC filtering only', 'D. Hiding the SSID without a password'],
        answer: 'B (WPA2-AES or WPA3-SAE)',
        explanation: 'WPA2 (AES-CCMP) and WPA3 (SAE) provide strong encryption; WEP and WPA-TKIP are obsolete and easily cracked.'
      },
      {
        question: 'Why must you change the router’s default administrator password separately from the Wi-Fi SSID password?',
        choices: ['A. To make Wi-Fi faster', 'B. To prevent anyone on the LAN from logging into 192.168.1.1 and hijacking router settings', 'C. To enable coax', 'D. To reset DHCP'],
        answer: 'B (To prevent anyone on the LAN from logging into the router console and hijacking settings)',
        explanation: 'The Wi-Fi passphrase allows joining the wireless network, whereas the admin password protects the router’s management console.'
      }
    ],
    standards: [
      'IEEE 802.11n (Wi-Fi 4), 802.11ac (Wi-Fi 5), 802.11ax (Wi-Fi 6 / 6E) Wireless LAN Standards',
      'Wi-Fi Alliance WPA2 (AES-CCMP) & WPA3 (Simultaneous Authentication of Equals) Security Certifications',
      'Course Module: Networking 1 — Module 10 (Prepared by Rod Allen B. Agregado)'
    ]
  },

  '14-network-troubleshooting': {
    objectivesImage: 'images/tools/cable_tester.webp',
    sections: [
      {
        beforeMatch: 'Systematic Troubleshooting',
        number: 1,
        title: 'SYSTEMATIC BOTTOM-UP TROUBLESHOOTING METHOD',
        overview: 'Effective troubleshooting follows an evidence-based sequence: observe symptoms, check physical links first, verify IP settings, test one change, and document.'
      },
      {
        beforeMatch: 'Six Windows Diagnostic Commands',
        number: 2,
        title: 'ESSENTIAL WINDOWS CLI DIAGNOSTIC COMMANDS',
        overview: 'Six command-line tools—ipconfig, ipconfig /all, ping, tracert, nslookup, and arp -a—let you pinpoint whether a fault lies in the cable, IP, gateway, or DNS.'
      },
      {
        beforeMatch: 'Common Network Fault Symptoms',
        number: 3,
        title: 'DIAGNOSING & VERIFYING COMMON LAN FAULTS',
        overview: 'Comparing clues (such as a working numeric ping alongside a failing domain name) isolates the exact root cause and confirms when service is restored.'
      }
    ],
    discussions: [
      {
        afterMatch: 'Systematic Troubleshooting',
        question: 'WHY SHOULD YOU ALWAYS CHECK THE PHYSICAL ETHERNET CABLE AND LINK LIGHTS BEFORE CHANGING SOFTWARE OR IP SETTINGS?'
      },
      {
        afterMatch: 'Six Windows Diagnostic Commands',
        question: 'IF "PING 8.8.8.8" SUCCEEDS BUT OPENING "WWW.GOOGLE.COM" IN A BROWSER FAILS, WHICH NETWORK SERVICE IS BROKEN?'
      }
    ],
    comparisons: [
      {
        afterMatch: 'Common Network Fault Symptoms',
        title: 'GATEWAY FAULT VS DNS RESOLUTION FAULT',
        leftTitle: 'Default Gateway Fault (No Outside Routing)',
        leftBullets: [
          'Local LAN Works: Pinging a classmate PC on the same subnet (192.168.1.20) succeeds',
          'Outside IP Fails: Pinging an external IP address (ping 8.8.8.8) returns Request timed out',
          'Root Cause: Missing, mistyped, or powered-off Default Gateway IP in host settings',
          'Targeted Fix: Correct the Default Gateway to match the local router LAN IP (e.g., 192.168.1.1)'
        ],
        rightTitle: 'DNS Server Fault (Name Lookup Broken)',
        rightBullets: [
          'Numeric Internet Ping Works: Pinging an external IP (ping 8.8.8.8) succeeds normally!',
          'Website Names Fail: Browser shows "Server IP address could not be found" and nslookup fails',
          'Root Cause: Unreachable, blank, or misconfigured DNS server IP address',
          'Targeted Fix: Set a valid DNS server (such as the campus DNS or 8.8.8.8 / 1.1.1.1) and retest'
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the very first step in a systematic bottom-up troubleshooting process?',
        choices: ['A. Reinstall Windows', 'B. Identify the symptom/scope and check physical cables & link lights', 'C. Replace the router immediately', 'D. Change all IPs randomly'],
        answer: 'B (Identify the symptom/scope and check physical cables & link lights)',
        explanation: 'Always define the problem scope and verify physical connectivity (cables, power, link LEDs, Wi-Fi status) before altering configurations.'
      },
      {
        question: 'Which command traces each router hop along the path to a distant destination and shows where packets stop?',
        choices: ['A. ipconfig', 'B. arp -a', 'C. tracert', 'D. netstat'],
        answer: 'C (tracert)',
        explanation: 'tracert (Traceroute) displays every intermediate router hop and round-trip latency along the route to a destination.'
      },
      {
        question: 'A workstation can ping 8.8.8.8 successfully, but typing www.example.com in a browser fails. What is the most likely fault?',
        choices: ['A. Unplugged Ethernet cable', 'B. Broken NIC', 'C. Misconfigured or unreachable DNS server', 'D. Wrong subnet mask'],
        answer: 'C (Misconfigured or unreachable DNS server)',
        explanation: 'A successful ping to 8.8.8.8 proves physical link, IP, mask, and default gateway routing work; failing domain names point directly to DNS.'
      },
      {
        question: 'Which command displays the local table mapping nearby LAN IPv4 addresses to hardware MAC addresses?',
        choices: ['A. arp -a', 'B. nslookup', 'C. ipconfig', 'D. ping'],
        answer: 'A (arp -a)',
        explanation: 'arp -a lists the Address Resolution Protocol cache of IP-to-MAC address mappings learned on the local subnet.'
      },
      {
        question: 'Why should you make only ONE configuration change at a time when testing a troubleshooting theory?',
        choices: ['A. To save electricity', 'B. So you know exactly which change fixed the problem without introducing new faults', 'C. Windows only allows one command', 'D. Routers block two changes'],
        answer: 'B (So you know exactly which change fixed the problem without introducing new faults)',
        explanation: 'Changing multiple settings at once obscures the true root cause and can create new configuration errors.'
      }
    ],
    standards: [
      'CompTIA & Cisco Structured Troubleshooting Methodology (Identify → Theory → Test → Plan → Verify → Document)',
      'IETF RFC 792 (ICMP Ping/Traceroute) & Windows TCP/IP Diagnostic Utilities',
      'Course Module: Networking 1 — Module 11 (Prepared by Rod Allen B. Agregado)'
    ]
  },

  '15-network-security': {
    objectivesImage: 'images/devices/router.webp',
    sections: [
      {
        beforeMatch: 'Three Pillars of the CIA Triad',
        number: 1,
        title: 'THE CIA TRIAD: CONFIDENTIALITY, INTEGRITY, AND AVAILABILITY',
        overview: 'Every security control protects one or more pillars of the CIA Triad: keeping data private (Confidentiality), accurate (Integrity), and accessible (Availability).'
      },
      {
        beforeMatch: 'Common Network Threats',
        number: 2,
        title: 'COMMON CYBER THREATS: MALWARE, PHISHING, AND DOS ATTACKS',
        overview: 'Networks face technical attacks like malware and Denial-of-Service floods as well as human-targeted social engineering like phishing and rogue hotspots.'
      },
      {
        beforeMatch: 'Defense-in-Depth Controls',
        number: 3,
        title: 'DEFENSE IN DEPTH: FIREWALLS, HTTPS/TLS, MFA, AND SAFE HABITS',
        overview: 'Layered security combines stateful firewalls, WPA2/WPA3 encryption, HTTPS/TLS, endpoint antivirus, OS updates, and Multi-Factor Authentication (MFA).'
      }
    ],
    discussions: [
      {
        afterMatch: 'Common Network Threats',
        question: 'WHY IS PHISHING OFTEN MORE SUCCESSFUL AT BREACHING A NETWORK THAN TRYING TO HACK THROUGH A FIREWALL DIRECTLY?'
      },
      {
        afterMatch: 'Firewall Rule Evaluation',
        question: 'WHY DO SECURITY ENGINEERS PLACE AN EXPLICIT "DENY ALL" RULE AT THE VERY BOTTOM OF A FIREWALL RULE TABLE?'
      }
    ],
    comparisons: [
      {
        afterMatch: 'Common Network Threats',
        title: 'TECHNICAL MALWARE ATTACKS VS SOCIAL ENGINEERING (PHISHING)',
        leftTitle: 'Malware & Network Attacks (Technical)',
        leftBullets: [
          'Malicious Software: Viruses, worms, trojans, spyware, and ransomware',
          'Exploits Unpatched Systems: Spreads through software vulnerabilities or infected USBs/downloads',
          'DoS / DDoS Floods: Overwhelms servers or routers with bogus traffic to disrupt Availability',
          'Key Defenses: Endpoint antivirus/EDR, automatic OS patching, firewalls, and offline backups'
        ],
        rightTitle: 'Phishing & Social Engineering (Human Target)',
        rightBullets: [
          'Deceives People: Fake login emails, urgent SMS links, or impostor tech-support messages',
          'Steals Credentials: Tricks users into typing passwords or 2FA codes into look-alike sites',
          'Bypasses Firewalls: An attacker logging in with stolen credentials looks like a legitimate user',
          'Key Defenses: User awareness, verifying sender domains, and Multi-Factor Authentication (MFA)'
        ]
      },
      {
        afterMatch: 'Defense-in-Depth Controls',
        title: 'UNENCRYPTED HTTP VS ENCRYPTED HTTPS (TLS)',
        leftTitle: 'HTTPS with TLS Encryption (Port 443)',
        leftBullets: [
          'Encrypted in Transit: Scrambles logins, cookies, and page contents using Transport Layer Security',
          'Server Authentication: Digital certificate verifies the website’s true domain identity',
          'Tamper Detection: Prevents attackers on public Wi-Fi from modifying pages in flight',
          'Browser Padlock: Essential for logins, banking, school portals, and all modern websites'
        ],
        rightTitle: 'Plaintext HTTP (Port 80 — Unencrypted)',
        rightBullets: [
          'Cleartext Transmission: Sends text, forms, and passwords across the network in readable plain text',
          'Eavesdropping Risk: Anyone on the same open Wi-Fi or LAN segment can sniff packets',
          'No Identity Proof: Cannot guarantee whether a router in the middle altered the page',
          'Legacy / Internal Only: Never type passwords or sensitive data into an unencrypted HTTP page'
        ]
      }
    ],
    quiz: [
      {
        question: 'Which pillar of the CIA Triad ensures that information is not altered or tampered with by unauthorized parties?',
        choices: ['A. Confidentiality', 'B. Integrity', 'C. Availability', 'D. Scalability'],
        answer: 'B (Integrity)',
        explanation: 'Confidentiality prevents unauthorized disclosure, Integrity prevents unauthorized modification, and Availability keeps systems accessible.'
      },
      {
        question: 'An email pretending to be from the school IT desk asks you to click a link and enter your password immediately. This is an example of:',
        choices: ['A. DDoS attack', 'B. Phishing (Social Engineering)', 'C. Cable attenuation', 'D. VLAN tagging'],
        answer: 'B (Phishing / Social Engineering)',
        explanation: 'Phishing uses deceptive messages or look-alike websites to trick users into revealing sensitive credentials.'
      },
      {
        question: 'How does a firewall evaluate an incoming network packet against its rule table?',
        choices: ['A. Bottom-up randomly', 'B. Top-down in order, applying the first matching rule', 'C. Alphabetically', 'D. Only checks MAC addresses'],
        answer: 'B (Top-down in order, applying the first matching rule)',
        explanation: 'Firewalls inspect packets sequentially from rule 1 downward and execute the action (Allow/Deny) of the first rule that matches.'
      },
      {
        question: 'Which security practice adds a second verification step (such as an authenticator app code) in addition to your password?',
        choices: ['A. NAT', 'B. Multi-Factor Authentication (MFA)', 'C. DHCP snooping', 'D. Port forwarding'],
        answer: 'B (Multi-Factor Authentication / MFA)',
        explanation: 'MFA combines something you know (password) with something you have (phone token/key) or are (biometrics) to stop stolen-password logins.'
      },
      {
        question: 'Which type of cyberattack floods a server with massive traffic so legitimate users cannot access it, attacking Availability?',
        choices: ['A. Denial-of-Service (DoS / DDoS)', 'B. Shoulder surfing', 'C. Split pair', 'D. APIPA'],
        answer: 'A (Denial-of-Service / DoS)',
        explanation: 'A DoS or DDoS attack exhausts bandwidth, CPU, or memory resources so legitimate users are denied service.'
      }
    ],
    standards: [
      'NIST SP 800-53 & ISO/IEC 27001: Information Security Management and CIA Triad Framework',
      'IETF RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3',
      'Course Module: Networking 1 — Module 12 (Prepared by Rod Allen B. Agregado)'
    ]
  }
};
