import {topic} from './createTopic.js';
export default topic({
  "id": "07-rj45-crimping",
  "title": "Registered Jack 45 (RJ45) Crimping, Color Coding, and Cable Testing",
  "icon": "PlugZap",
  "description": "Arrange both cable ends, check every pin, and trace continuity through your own wiring.",
  "objectives": [
    "Terminate a cable using the correct T568B pin order.",
    "Distinguish straight-through and traditional crossover wiring.",
    "Interpret open, short, and miswire results while recognizing tester limitations."
  ],
  "concepts": [
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
    "equipment": "Suitable UTP, two compatible 8P8C plugs, stripper, crimper, LAN tester, eye protection as required.",
    "mistakes": "Mirroring the connector view, mixing A and B accidentally, excessive untwisting, incomplete insertion.",
    "safety": "Keep fingers away from blades and crimp jaws. Collect wire scraps; never terminate a live cable."
  }
});
