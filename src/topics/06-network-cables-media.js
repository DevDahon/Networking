import {topic} from './createTopic.js';
export default topic({
  "id": "06-network-cables-media",
  "title": "Network Cable Types and Media",
  "icon": "Cable",
  "description": "Compare network cable types, categories, fiber optics, coaxial, and wireless media.",
  "objectives": [
    "Compare twisted-pair copper, optical fiber, coaxial cable, and wireless media.",
    "Identify Ethernet cable categories and their performance limits (Cat 5e, Cat 6, Cat 6A).",
    "Describe fiber optic cable construction, single-mode, and multi-mode types.",
    "Select the appropriate transmission medium based on speed, distance, and interference."
  ],
  "concepts": [
    {
      "title": "Five network media choices",
      "items": [
        "UTP: Four unshielded twisted copper pairs; wire twists cancel out crosstalk.",
        "STP: Adds foil or braided metal shielding to block strong electrical noise.",
        "Fiber: Sends light pulses through glass cores for long-distance, interference-free links.",
        "Coaxial: Shielded single-core copper cable used for cable Internet and TV.",
        "Wireless: Sends radio waves through the air for mobile devices."
      ],
      "expectedCount": 5,
      "lead": "Copper, optical, and radio signals use different physical media."
    },
    {
      "title": "Three Ethernet cable categories",
      "lead": "An Ethernet link depends on the standard, cable, channel length, connectors, and installation quality.",
      "items": [
        "Cat 5e: Supports 1 Gbps up to 100 meters.",
        "Cat 6: Supports 1 Gbps up to 100 m, and 10 Gbps up to 55 m.",
        "Cat 6A: Supports a full 10 Gbps up to 100 meters."
      ],
      "expectedCount": 3
    },
    {
      "title": "Fiber-Optic Cable Construction",
      "lead": "Optical fiber carries light pulses instead of electrical signals, eliminating electromagnetic interference.",
      "items": [
        "Core & Cladding: A thin glass core surrounded by reflective cladding that bounces light forward.",
        "Single-Mode Fiber (SMF): Tiny 9-micron core using laser light to span many kilometers.",
        "Multi-Mode Fiber (MMF): Wider 50/62.5-micron core using LED/VCSEL light for up to 550 meters.",
        "Zero EMI: Immune to electrical noise, motors, and lightning strikes."
      ]
    },
    {
      "title": "Coaxial Cable and Shielding",
      "lead": "Coaxial cable uses a concentric four-layer design that provides strong physical durability and electrical shielding.",
      "items": [
        "Center Conductor: Solid copper wire that carries the signal.",
        "Dielectric Insulator: Foam layer that keeps the core separated from the shield.",
        "Braided Metal Shield: Blocks outside interference and grounds the cable.",
        "Common Uses: Cable broadband modems (DOCSIS), CCTV, and TV antennas."
      ]
    },
    {
      "title": "Unguided Media and Wireless Radio",
      "lead": "Unguided media transmit electromagnetic waves through the air without physical cables, enabling mobile connectivity.",
      "items": [
        "Radio Frequencies (RF): Carries data over 2.4 GHz, 5 GHz, and 6 GHz wireless bands.",
        "Shared Airspace: All nearby Wi-Fi devices share the same radio channel capacity.",
        "Signal Obstacles: Concrete walls, metal, and distance weaken wireless signals.",
        "Mobility vs. Stability: Wi-Fi gives freedom to move, while Ethernet gives steady speed."
      ]
    }
  ],
  "demo": {
    "type": "media",
    "title": "Media and tool bench",
    "lead": "Illustrated comparison • inspect cable cross-sections and choose media for a task."
  },
  "application": {
    "title": "Connect two buildings",
    "lead": "A 180 m outdoor path joins two buildings with electrical equipment nearby.",
    "items": [
      "Exceeds Copper Limit: 180 meters is too long for a 100-meter Cat 6 copper cable.",
      "Use Fiber-Optic Cable: Optical fiber easily spans 180 m and ignores electrical noise.",
      "Matching Transceivers: Connect the fiber run using optical SFP transceivers at both switches."
    ]
  },
  "installation": {
    "equipment": "UTP/STP samples, fiber/coax samples, media comparison guides.",
    "mistakes": "Assuming all categories and all fiber types have identical reach.",
    "safety": "Never look into fiber connectors. Handle glass fibers carefully and dispose of scraps in approved sharps containers."
  }
});
