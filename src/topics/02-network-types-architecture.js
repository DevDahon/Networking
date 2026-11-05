import {topic} from './createTopic.js';
export default topic({
  "id": "02-network-types-architecture",
  "title": "Types of Networks and Network Architecture",
  "icon": "Globe",
  "description": "Separate the reach of a network from the way its devices share services.",
  "objectives": [
    "Classify everyday networks as Personal Area Network (PAN), Local Area Network (LAN), Metropolitan Area Network (MAN), or Wide Area Network (WAN).",
    "Compare peer-to-peer and client-server service roles.",
    "Choose wired or wireless links for a classroom scenario."
  ],
  "concepts": [
    {
      "title": "Four network coverage types",
      "lead": "Coverage describes the geographic scope, rather than a strict distance limit.",
      "items": [
        "Personal Area Network (PAN): devices around a person, such as a phone and Bluetooth headset.",
        "Local Area Network (LAN): a room, building, or local campus network, including a wireless Local Area Network (LAN).",
        "Metropolitan Area Network (MAN): interconnects sites across a metropolitan area.",
        "Wide Area Network (WAN): spans wider regions, often using carrier links. The Internet interconnects many networks."
      ],
      "expectedCount": 4
    },
    {
      "title": "Two network service architectures",
      "lead": "Architecture describes service roles. It is a different dimension from geographic coverage.",
      "items": [
        "Peer-to-peer: peers can both request and provide resources, such as one PC sharing a folder with another.",
        "Client-server: clients request services from dedicated service providers, such as a school file server."
      ],
      "ask": "Can a Local Area Network (LAN) use client-server architecture? Why?",
      "footnote": "One Local Area Network (LAN) can use both architectures. A server is a role, not simply a large or expensive computer.",
      "expectedCount": 2
    },
    {
      "title": "Two link choices: wired and wireless",
      "lead": "A single network often combines multiple transmission media.",
      "items": [
        "Ethernet provides a cabled link with predictable interference characteristics and a physical port requirement.",
        "Wi-Fi provides radio access and mobility; walls, interference, distance, and shared airtime affect performance."
      ],
      "footnote": "Neither medium is automatically secure. Use authentication, encryption, and appropriate access controls.",
      "expectedCount": 2
    }
  ],
  "demo": {
    "type": "coverage",
    "title": "Explore reach and service roles",
    "lead": "Conceptual comparison • change coverage independently from architecture."
  },
  "application": {
    "title": "A school with two campuses",
    "lead": "Each campus has a Local Area Network (LAN). A provider link joins the sites; students request files from a central server.",
    "items": [
      "The inter-site connection is a Wide Area Network (WAN) service; the local wireless classroom is still a Local Area Network (LAN).",
      "A Bluetooth mouse forms a Personal Area Network (PAN) with its computer.",
      "A teacher’s PC sharing a temporary folder illustrates peer service within the same Local Area Network (LAN)."
    ]
  },
  "installation": {
    "equipment": "School floor plan, paper, and a sample service list.",
    "mistakes": "Calling client-server a geographic network type.",
    "safety": "Use fictional records and avoid collecting real credentials."
  }
});
