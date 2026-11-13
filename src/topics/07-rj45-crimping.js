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
        "RJ45 plug: Male 8-pin modular plug crimped onto flexible patch cords.",
        "Keystone jack: Female wall or patch-panel jack punched down onto solid in-wall cable.",
        "Category matching: Always match the plug and jack category to the cable rating."
      ]
    },
    {
      "title": "Four cabling tool and tester functions",
      "items": [
        "Cable stripper: Scores and removes the outer jacket without nicking inner wires.",
        "Crimping tool: Presses RJ45 plug pins into the copper wires and locks the jacket.",
        "Punch-down tool: Pushes solid wires into keystone jack slots and trims excess ends.",
        "Basic LAN tester: Checks pin-to-pin continuity across all 8 wires."
      ],
      "expectedCount": 4
    },
    {
      "title": "Tools and Equipment for RJ45 Cable Crimping",
      "lead": "Terminating an RJ45 plug requires stripping, cutting, crimping, and testing tools.",
      "toolKey": "rj45-setup",
      "items": [
        "RJ45 Modular Crimper: Presses the 8 gold pins into the wires and secures the cable jacket.",
        "UTP Cable Stripper: Removes the outer plastic jacket safely without cutting inner wires.",
        "Modular RJ45 Plugs: Clear 8-pin male connectors with gold contacts and a locking clip.",
        "Unshielded Twisted Pair (UTP) Cable: Four-pair copper Ethernet cable for patch cords.",
        "Flush Cutters / Snips: Trims untwisted, aligned wires straight and even before insertion.",
        "LAN Cable Tester: Two-piece tester that verifies all 8 pins connect in the right order."
      ],
      "footnote": "Always keep spare RJ45 plugs; once crimped, a plug cannot be reused."
    },
    {
      "title": "Tools and Equipment for Keystone Jack Punch-Down",
      "lead": "Terminating a wall jack requires a punch-down tool, stand, and solid-core cable.",
      "toolKey": "keystone-setup",
      "items": [
        "110 Impact Punch-Down Tool: Seats wires into jack slots and cuts off the extra wire end.",
        "Keystone Jack (110 IDC): Female RJ45 wall socket printed with T568A and T568B color guides.",
        "UTP Cable Stripper: Removes 1.5 inches of outer jacket while keeping pairs twisted.",
        "Solid-Core UTP Cable: Stiff copper cable designed for permanent in-wall installations.",
        "Punch-Down Palm Tool / Stand: Holds the jack steady to protect your hand while punching down.",
        "IDC Dust Caps & Cable Tester: Caps lock wires in place; the tester verifies all 8 pins."
      ],
      "footnote": "Always face the punch-down tool's CUT blade toward the outside edge of the jack."
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
        "Crossover (A to B): Swaps pins 1↔3 and 2↔6 to connect two similar legacy devices.",
        "Auto-MDI/MDIX: Modern network ports detect and adjust pin roles automatically.",
        "Split-pair warning: Matching a made-up color order passes basic testers but causes heavy interference."
      ]
    },
    {
      "title": "Three common wire-map faults",
      "items": [
        "Open: A wire is broken or not touching the connector pin.",
        "Short: Two bare wires are accidentally touching each other.",
        "Miswire: A wire is placed in the wrong pin position at one end."
      ],
      "expectedCount": 3,
      "footnote": "A basic continuity pass does not prove high-speed signal quality."
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
      "Inspect hardware first: Check for loose plugs, bent pins, or torn cable jackets.",
      "Re-terminate cleanly: Cut off the damaged plug and crimp a new one using the same standard.",
      "Test both ways: Verify all 8 pins on the LAN tester, then confirm the PC link light turns on."
    ]
  },
  "installation": {
    "equipment": "Suitable UTP, two compatible 8P8C plugs, punch-down keystone jack, stripper, crimper, punch-down tool, LAN tester, eye protection.",
    "mistakes": "Mirroring the connector view, punching with the cut blade facing inward, excessive untwisting, incomplete insertion.",
    "safety": "Keep fingers away from blades and crimp jaws. Collect wire scraps; never terminate a live cable."
  }
});

