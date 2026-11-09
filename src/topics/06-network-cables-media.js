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
        "UTP: Four unshielded twisted copper pairs, no overall shield. Twisting reduces electromagnetic interference (EMI).",
        "STP: Shielded twisted-pair cable with foil or braid shielding; requires proper grounding and bonding.",
        "Fiber: Carries light signals through glass or plastic cores; immune to EMI and spans long distances.",
        "Coaxial: Copper core with dielectric insulator and braided metallic shield; used for broadband and legacy bus.",
        "Wireless: Radio frequency transmission providing mobility across shared, unguided electromagnetic airspace."
      ],
      "expectedCount": 5,
      "lead": "Copper, optical, and radio signals use different physical media."
    },
    {
      "title": "Three Ethernet cable categories",
      "lead": "An Ethernet link depends on the standard, cable, channel length, connectors, and installation quality.",
      "items": [
        "Cat 5e: Supports 1 Gb/s (1000BASE-T) over a standard 100 m channel.",
        "Cat 6: Supports 1 Gb/s at 100 m; supports 10 Gb/s (10GBASE-T) up to 55 m.",
        "Cat 6A: Supports 10 Gb/s (10GBASE-T) over a full 100 m channel."
      ],
      "expectedCount": 3,
      "footnote": "A standard channel comprises up to 90 m of permanent horizontal link plus 10 m of patch cords."
    },
    {
      "title": "Fiber-Optic Cable Construction",
      "lead": "Optical fiber carries light pulses instead of electrical signals, eliminating electromagnetic interference.",
      "items": [
        "Core and Cladding: Ultra-thin glass core surrounded by reflective cladding that bounces light along the fiber using total internal reflection.",
        "Single-Mode Fiber (SMF): Extremely thin 9-micron core using laser light; spans dozens of kilometers for campus backbones and telco WANs.",
        "Multi-Mode Fiber (MMF): Wider 50 or 62.5-micron core using LED or VCSEL light; spans up to 550 m for high-speed data center links.",
        "Immunity to Interference: Because light does not conduct electricity, fiber is immune to electrical noise, motors, and lightning surges."
      ],
      "footnote": "Never look directly into an active fiber optic connector or transceiver; invisible laser light can cause permanent retinal damage."
    },
    {
      "title": "Coaxial Cable and Shielding",
      "lead": "Coaxial cable uses a concentric four-layer design that provides strong physical durability and electrical shielding.",
      "items": [
        "Center Conductor: Solid copper or copper-clad steel wire that carries the high-frequency radio frequency signal.",
        "Dielectric Insulator: Non-conductive plastic foam layer that maintains precise physical spacing between center conductor and shield.",
        "Braided Metallic Shield: Woven copper or aluminum foil that blocks external electrical interference and completes the circuit ground.",
        "Common Use Cases: Modern cable broadband modems (DOCSIS), closed-circuit TV (CCTV), and legacy 10BASE2/10BASE5 bus networks."
      ],
      "footnote": "Coaxial cables terminate with threaded F-type connectors (for cable modems) or twist-lock BNC connectors (for legacy gear)."
    },
    {
      "title": "Unguided Media and Wireless Radio",
      "lead": "Unguided media transmit electromagnetic waves through the air without physical cables, enabling mobile connectivity.",
      "items": [
        "Radio Frequencies (RF): Transmits digital data modulated onto microwave and radio carrier frequencies between 2.4 GHz and 6 GHz.",
        "Shared Transmission Airspace: Unlike dedicated copper links, all wireless stations in an area share the same radio frequency spectrum.",
        "Environmental Attenuation: Radio waves are absorbed, reflected, and scattered by concrete walls, metal filing cabinets, and water.",
        "Convenience vs. Stability: Wireless enables laptop and smartphone mobility, while wired Ethernet delivers guaranteed speed and zero interference."
      ],
      "footnote": "In enterprise networks, wireless access points are always connected back to the core network using wired Category 6 Ethernet cables."
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
      "A standard 100 m copper Ethernet channel is insufficient for this direct path.",
      "A suitable fiber link with appropriate transceivers can meet reach and isolation requirements.",
      "Installation needs rated materials and professional planning; fiber is not simply a longer RJ45 cable."
    ]
  },
  "installation": {
    "equipment": "UTP/STP samples, fiber/coax samples, media comparison guides.",
    "mistakes": "Assuming all categories and all fiber types have identical reach.",
    "safety": "Never look into fiber connectors. Handle glass fibers carefully and dispose of scraps in approved sharps containers."
  }
});
