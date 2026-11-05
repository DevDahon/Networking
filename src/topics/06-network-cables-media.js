import {topic} from './createTopic.js';
export default topic({
  "id": "06-network-cables-media",
  "title": "Network Cables, Media, and Tools",
  "icon": "Cable",
  "description": "Choose suitable media and recognize the tools used to terminate and test a network link.",
  "objectives": [
    "Compare twisted pair, fiber, coaxial, and wireless media.",
    "Match cabling tools to their purpose.",
    "Select a medium using distance, rate, interference, and installation requirements."
  ],
  "concepts": [
    {
      "title": "Five network media choices",
      "items": [
        "UTP: unshielded twisted copper pairs reduce interference through twisting.",
        "STP: shielded twisted-pair cable needs correct shield installation and bonding.",
        "Fiber: carries light; fiber type and transceivers determine rate and reach.",
        "Coaxial: a copper core, insulation, and shield; common in provider access and legacy Ethernet.",
        "Wireless: radio transmission provides mobility, with performance affected by shared airtime and interference."
      ],
      "expectedCount": 5,
      "lead": "Copper, optical, and radio signals use different physical media."
    },
    {
      "title": "Three Ethernet cable categories",
      "lead": "An Ethernet link depends on the standard, cable, channel length, connectors, and installation quality.",
      "items": [
        "Cat 5e: commonly supports 1000BASE-T over a 100 m channel.",
        "Cat 6: supports 1 Gb/s at 100 m; 10GBASE-T may be limited to about 55 m depending on conditions.",
        "Cat 6A: supports 10GBASE-T over a 100 m channel under specified conditions."
      ],
      "expectedCount": 3,
      "footnote": "A channel commonly includes a 90 m permanent link plus patch cords. Standard, connectors, and installation quality matter."
    },
    {
      "title": "The Ethernet modular connector",
      "items": [
        "The connector commonly called RJ45 in Ethernet is an 8-position, 8-contact (8P8C) modular connector. Match it to conductor gauge, solid/stranded cable, and category."
      ]
    },
    {
      "title": "Five cabling tool and tester functions",
      "items": [
        "Cable stripper: removes jacket without nicking conductor insulation.",
        "Crimping tool: terminates compatible modular plugs.",
        "Punch-down tool: seats conductors in compatible IDC jacks or patch panels.",
        "Basic LAN tester: checks conductor continuity and wire mapping.",
        "Certification tester: measures specified link performance; continuity alone does not certify bandwidth."
      ],
      "expectedCount": 5
    }
  ],
  "demo": {
    "type": "media",
    "title": "Media and tool bench",
    "lead": "Illustrated comparison • inspect cable cross-sections and choose tools for a task."
  },
  "application": {
    "title": "Connect two buildings",
    "lead": "A 180 m outdoor path joins two buildings with electrical equipment nearby.",
    "items": [
      "A standard 100 m copper Ethernet channel is insufficient for this direct path.",
      "A suitable fiber link with appropriate transceivers can meet reach and isolation requirements.",
      "Installation needs rated materials and professional planning; fiber is not simply a longer RJ45 cable."
    ]
  },
  "installation": {
    "equipment": "UTP/STP samples, fiber/coax samples, stripper, crimper, tester, punch-down tool.",
    "mistakes": "Assuming all categories and all fiber types have identical reach.",
    "safety": "Never look into fiber connectors. Handle blades carefully and use approved disposal for scraps."
  }
});
