import {topic} from './createTopic.js';
export default topic({
  "id": "06-network-cables-media",
  "title": "Network Cables, Media, and Registered Jack 45 (RJ45) Termination",
  "icon": "Cable",
  "description": "Choose suitable media, terminate an 8P8C modular connector, and test cable wire mapping.",
  "objectives": [
    "Compare twisted pair, fiber, coaxial, and wireless media.",
    "Select cabling tools for stripping, crimping, punch-down, and testing.",
    "Terminate an 8P8C modular connector using T568A or T568B pin order.",
    "Distinguish straight-through and crossover cable arrangements.",
    "Interpret open, short, and miswire results while recognizing tester limitations."
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
    },
    {
      "title": "Media and tool bench",
      "kind": "demo",
      "lead": "Illustrated comparison • inspect cable cross-sections and choose tools for a task.",
      "type": "media"
    },
    {
      "title": "Know the connector orientation first",
      "lead": "Use the contact side facing you, latch behind, cable entering downward; pin 1 is at the left in this front contact view.",
      "items": [
        "Each color name identifies a conductor. Preserve pair twists as close to termination as the product instructions require."
      ],
      "ask": "Why must two people agree on the viewing orientation before comparing pin orders?"
    },
    {
      "title": "T568A: eight conductor positions",
      "items": [
        "Pin 1: White/Green.",
        "Pin 2: Green.",
        "Pin 3: White/Orange.",
        "Pin 4: Blue.",
        "Pin 5: White/Blue.",
        "Pin 6: Orange.",
        "Pin 7: White/Brown.",
        "Pin 8: Brown."
      ],
      "expectedCount": 8,
      "lead": "Contacts face you, latch behind, cable enters downward; pin 1 is left."
    },
    {
      "title": "T568B: eight conductor positions",
      "items": [
        "Pin 1: White/Orange.",
        "Pin 2: Orange.",
        "Pin 3: White/Green.",
        "Pin 4: Blue.",
        "Pin 5: White/Blue.",
        "Pin 6: Green.",
        "Pin 7: White/Brown.",
        "Pin 8: Brown."
      ],
      "expectedCount": 8,
      "lead": "Contacts face you, latch behind, cable enters downward; pin 1 is left."
    },
    {
      "title": "Straight-through and crossover arrangements",
      "lead": "A conventional straight-through cable uses the same standard at both ends: A–A or B–B.",
      "items": [
        "A conventional A–B crossover swaps pins 1↔3 and 2↔6 for traditional 10/100BASE-T transmit/receive pairs.",
        "Many modern interfaces support auto-MDI/MDIX, so a crossover cable is often unnecessary. Gigabit Ethernet uses all four pairs.",
        "An equal but nonstandard color order may pass a simple continuity check while creating split pairs and poor performance."
      ]
    },
    {
      "title": "Prepare, terminate, and verify",
      "lead": "Inspect your work before applying the crimp tool; a plug is usually replaced rather than reused after a bad crimp.",
      "items": [
        "Cut cleanly, strip only the needed jacket, arrange conductors, trim evenly, and insert fully into a compatible plug.",
        "Confirm all eight conductors reach the contact end and the strain relief grips the jacket, then crimp with the correct tool."
      ]
    },
    {
      "title": "Three common wire-map faults",
      "items": [
        "Open: a conductor has no continuous end-to-end path.",
        "Short: conductors are accidentally joined.",
        "Miswire: a conductor arrives at an unexpected pin."
      ],
      "expectedCount": 3,
      "footnote": "A wire-map pass does not certify pair integrity, signal quality, or cable bandwidth."
    },
    {
      "title": "8P8C cable termination workbench",
      "kind": "demo",
      "lead": "Modeled wire-map tester • select all eight conductors at both ends. Tester results are calculated from your mappings.",
      "type": "cable"
    },
    {
      "title": "Continuity versus split-pair integrity",
      "kind": "demo",
      "lead": "Scan calculated pin paths and compare a continuity pass with incorrect physical pair grouping.",
      "type": "pairScanDemo"
    }
  ],
  "application": {
    "title": "Connect two buildings and repair patch cables",
    "lead": "Inspect media requirements for distance and replace a damaged patch cable connector.",
    "items": [
      "A 180 m inter-building direct path exceeds the 100 m copper Ethernet limit; suitable fiber optic transceivers provide necessary reach and electrical isolation.",
      "When repairing a damaged RJ45 connector, cut cleanly, preserve conductor pair twists, and confirm pin order before crimping.",
      "A basic wire-map pass proves continuity but does not certify rated category bandwidth or signal integrity."
    ]
  },
  "installation": {
    "equipment": "Suitable UTP, two compatible 8P8C plugs, stripper, crimper, LAN tester, eye protection as required.",
    "mistakes": "Mirroring the connector view, mixing A and B accidentally, excessive untwisting, incomplete insertion.",
    "safety": "Keep fingers away from blades and crimp jaws. Collect wire scraps; never terminate a live cable."
  }
});
