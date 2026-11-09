import {topic} from './createTopic.js';
export default topic({
  "id": "07-rj45-crimping",
  "title": "Registered Jack 45 (RJ45) Crimping, Color Coding, and Cable Testing",
  "icon": "PlugZap",
  "description": "Learn cabling tools, standardize pin color orders, terminate RJ45 plugs and keystone jacks, and test wire continuity.",
  "objectives": [
    "Select cabling tools for stripping, crimping, punch-down, and testing.",
    "Terminate an 8P8C modular connector using T568A or T568B pin order.",
    "Distinguish straight-through and crossover cable arrangements.",
    "Interpret open, short, and miswire results while recognizing tester limitations."
  ],
  "concepts": [
    {
      "title": "Modular Connectors: RJ45 and Keystone Jack",
      "items": [
        "RJ45 (8P8C) plug: Modular male plug with eight gold-plated contacts, used to terminate flexible stranded patch cables.",
        "Keystone Jack: Modular female jack with 110 IDC contacts, mounted in wall faceplates and patch panels for permanent solid-core horizontal cabling.",
        "Category matching: Plugs and jacks must match the cable category and conductor gauge to prevent signal degradation."
      ]
    },
    {
      "title": "Four cabling tool and tester functions",
      "items": [
        "Cable stripper: removes jacket without nicking conductor insulation.",
        "Crimping tool: terminates compatible modular plugs.",
        "Punch-down tool: seats conductors in compatible IDC jacks or patch panels.",
        "Basic LAN tester: checks conductor continuity and wire mapping."
      ],
      "expectedCount": 4
    },
    {
      "title": "Tools and Equipment for RJ45 Cable Crimping",
      "lead": "Terminating an 8P8C modular plug requires preparing dedicated cutting, stripping, crimping, and testing tools alongside quality Cat 5e/Cat 6 media.",
      "toolKey": "rj45-setup",
      "items": [
        "RJ45 Modular Crimper: Heavy-duty ratcheting tool with precision 8P8C dies to compress contacts into copper conductors and engage the jacket strain relief.",
        "UTP Cable Stripper: Compact rotary wire stripper calibrated to cleanly score and remove the outer PVC jacket without nicking conductor insulation.",
        "Modular RJ45 Plugs: Cat 5e or Cat 6 clear polycarbonate male 8P8C plugs featuring eight gold-plated contact pins and a flexible locking tab.",
        "Unshielded Twisted Pair (UTP) Cable: Four-pair 24 AWG stranded copper Ethernet cable designed for flexible patch cords between workstations and wall jacks.",
        "Flush Cutters / Snips: Precision diagonal cutting pliers used to trim untwisted, aligned wires straight and square across before insertion into the plug.",
        "LAN Cable Tester: Dual-unit continuity wire-map tester to confirm all eight pin paths and detect open circuits, short circuits, or crossed pairs."
      ],
      "footnote": "Always prepare spare 8P8C plugs; modular plugs cannot be reused once crimped."
    },
    {
      "title": "Tools and Equipment for Keystone Jack Punch-Down",
      "lead": "Terminating a permanent wall jack requires specialized insulation displacement tools, punch-down supports, and rated solid-core cabling.",
      "toolKey": "keystone-setup",
      "items": [
        "110 Impact Punch-Down Tool: Spring-loaded impact driver with a reversible 110/66 blade that seats conductors into IDC V-notches and cuts excess wire flush.",
        "Keystone Jack (110 IDC): RJ45 female modular jack with 110 insulation displacement contacts, universal T568A/T568B color coding, and snap-in faceplate clips.",
        "UTP Cable Stripper: Round jacket stripper used to remove 1 to 1.5 inches of outer jacket while preserving pair twists up to the IDC blocks.",
        "Solid-Core UTP Cable: Four-pair 23/24 AWG solid copper horizontal cable engineered for structured in-wall and ceiling cable runs.",
        "Punch-Down Palm Tool / Stand: Contoured palm puck or base holder that cradles the jack securely to prevent hand injury and ensure even downward punching pressure.",
        "IDC Dust Caps & Cable Tester: Snap-on protective dust covers to lock conductors firmly in place, plus a LAN tester with patch cord to verify end-to-end pin mapping."
      ],
      "footnote": "Always orient the punch-down tool with the CUT blade facing outward toward the excess wire tail."
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
      "title": "Three common wire-map faults",
      "items": [
        "Open: a conductor has no continuous end-to-end path.",
        "Short: conductors are accidentally joined.",
        "Miswire: a conductor arrives at an unexpected pin."
      ],
      "expectedCount": 3,
      "footnote": "A wire-map pass does not certify pair integrity, signal quality, or cable bandwidth."
    }
  ],
  "demo": {
    "type": "cable",
    "title": "8P8C cable termination workbench",
    "lead": "Modeled wire-map tester • select all eight conductors at both ends. Tester results are calculated from your mappings."
  },
  "application": {
    "title": "Repair a failed classroom patch cable",
    "lead": "One PC has an intermittent link after a cable was sharply pulled from its desk.",
    "items": [
      "Check connector strain relief, bent contacts, and damaged cable before changing IP settings.",
      "Replace a damaged plug with a compatible one, preserving the chosen standard.",
      "Record wire-map results and test the actual link; continuity alone cannot prove rate or reliability."
    ]
  },
  "installation": {
    "equipment": "Suitable UTP, two compatible 8P8C plugs, punch-down keystone jack, stripper, crimper, punch-down tool, LAN tester, eye protection.",
    "mistakes": "Mirroring the connector view, punching with the cut blade facing inward, excessive untwisting, incomplete insertion.",
    "safety": "Keep fingers away from blades and crimp jaws. Collect wire scraps; never terminate a live cable."
  }
});

