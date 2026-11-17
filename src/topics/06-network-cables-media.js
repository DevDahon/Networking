import {topic} from './createTopic.js';
export default topic({
  "id": "06-network-cables-media",
  "title": "Network Media, Connectors, and Cable Testing",
  "icon": "Cable",
  "description": "Compare copper, fiber-optic, and wireless media, standardize T568A/T568B RJ45 and keystone terminations, and test wire continuity.",
  "objectives": [
    "Compare twisted-pair copper, optical fiber, coaxial cable, and wireless media.",
    "Identify Ethernet cable categories and fiber-optic single-mode vs. multi-mode types.",
    "Select cabling tools for stripping, crimping RJ45 plugs, punching down keystone jacks, and testing.",
    "Terminate an 8P8C modular connector using T568A or T568B pin color order.",
    "Distinguish straight-through and crossover cable arrangements.",
    "Interpret open, short, and miswire results and select media for campus installations."
  ],
  "concepts": [
    {
      "title": "Five network media choices",
      "visualKey": "mediaChoicesPhotos",
      "items": [
        "UTP: Common Ethernet cable with four unshielded twisted copper pairs; wire twists naturally reduce outside crosstalk.",
        "STP: Twisted copper pairs wrapped in foil or braided metal shielding to block strong electrical noise near motors or machinery.",
        "Fiber: Sends light pulses through thin glass strands so signals span kilometers with zero electrical interference.",
        "Coaxial: Heavy single copper wire surrounded by foil and braided metal shields, widely used for cable Internet modems and TV.",
        "Wireless: Sends radio waves through open air so phones, tablets, and laptops connect freely without physical cables."
      ],
      "expectedCount": 5,
      "lead": "Copper, optical, and radio signals use different physical media."
    },
    {
      "title": "Three Ethernet cable categories",
      "visualKey": "ethernetCategoriesPhoto",
      "visualLayout": "split",
      "lead": "An Ethernet link depends on the standard, cable, channel length, connectors, and installation quality.",
      "items": [
        "Cat 5e: Standard gigabit Ethernet cable supporting up to 1 Gbps speeds cleanly over runs up to 100 meters.",
        "Cat 6: Tighter wire twists cut interference, supporting 1 Gbps up to 100 m and 10 Gbps speeds up to 55 meters.",
        "Cat 6A: Thicker shielded-grade construction with extra pair separation to support full 10 Gbps across 100 meters."
      ],
      "expectedCount": 3
    },
    {
      "title": "Fiber-Optic Cable Construction",
      "visualKey": "fiberOpticPhotos",
      "visualLayout": "split",
      "lead": "Optical fiber carries light pulses instead of electrical signals, eliminating electromagnetic interference.",
      "paragraphs": [
        "Each strand uses a thin glass core surrounded by reflective cladding that keeps light pulses bouncing forward over long distances with zero immunity issues around motors, power lines, or lightning.",
        "Single-Mode Fiber (SMF) uses a narrow 9-micron core with laser light to span many kilometers between buildings or campuses, whereas Multi-Mode Fiber (MMF) uses a wider 50/62.5-micron core with LED/VCSEL light for shorter backbone links up to 550 meters."
      ]
    },
    {
      "title": "Coaxial Cable and Shielding",
      "visualKey": "coaxialCablePhotos",
      "visualLayout": "split",
      "lead": "Coaxial cable uses a concentric four-layer design that provides strong physical durability and electrical shielding.",
      "paragraphs": [
        "A solid copper center conductor carries the signal, separated by a foam dielectric insulator from a braided metal shield that blocks outside electrical noise and grounds the line.",
        "Thanks to that sturdy shielding, coaxial cable remains widely used for cable broadband Internet (DOCSIS), CCTV camera feeds, and television antenna connections."
      ]
    },
    {
      "title": "Unguided Media and Wireless Radio",
      "visualKey": "wirelessHardwarePhotos",
      "visualLayout": "split",
      "lead": "Unguided media transmit electromagnetic waves through the air without physical cables, enabling mobile connectivity.",
      "paragraphs": [
        "Wi-Fi networks transmit radio waves across shared 2.4 GHz, 5 GHz, and 6 GHz spectrum bands so phones, laptops, and tablets can stay connected while moving around a room or building.",
        "Because nearby devices share the same radio channel and walls or metal weaken signals, wireless links trade the steady, isolated throughput of wired Ethernet for physical mobility."
      ]
    },
    {
      "title": "Select media for a campus installation",
      "kind": "walkthrough",
      "lead": "Match each link to the right medium by checking distance, electrical interference, and required speed.",
      "items": [
        "Check Distance: Use Cat 6 copper for indoor runs under 100 meters, and fiber-optic cable for longer runs.",
        "Check Interference: Use STP or optical fiber near heavy motors, power lines, or outdoor lightning zones.",
        "Pick Fiber Type: Choose Multi-Mode Fiber (MMF) within buildings and Single-Mode Fiber (SMF) across campus.",
        "Verify Connectors: Match RJ45 plugs to copper ports and LC/SC optical transceivers to fiber ports."
      ]
    },
    {
      "title": "Transmission media workbench",
      "kind": "demo",
      "type": "media",
      "lead": "Illustrated comparison • inspect cable cross-sections and signaling methods across media types."
    },
    {
      "title": "Modular Connectors: RJ45 and Keystone Jack",
      "visualKey": "modularConnectors",
      "visualLayout": "split",
      "paragraphs": [
        "Ethernet patch cords end in a male 8-pin RJ45 plug crimped onto flexible stranded wire, whereas permanent wall outlets and patch panels terminate onto female 110 keystone jacks using solid-core cable.",
        "Always match the plug, keystone jack, and cable rating (such as Cat 5e, Cat 6, or Cat 6A) so the termination maintains rated gigabit or 10-gigabit speed."
      ]
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
      ]
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
      ]
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
      "visualKey": "patchCableRealPhoto",
      "lead": "A conventional straight-through cable uses the same standard at both ends: A–A or B–B.",
      "paragraphs": [
        "Straight-through patch cords use identical T568A or T568B wiring at both ends to connect unlike devices (such as a PC to a switch). Legacy crossover cables pair T568A on one end with T568B on the other, swapping pins 1↔3 and 2↔6—though modern Auto-MDI/MDIX ports adapt automatically.",
        "Always follow an official T568A or T568B pinout: wiring an arbitrary matching color order on both ends may pass a continuity beep test yet cause severe split-pair interference and dropped packets."
      ]
    },
    {
      "title": "Three common wire-map faults",
      "visualKey": "wireMapFaultsPhoto",
      "visualLayout": "split",
      "items": [
        "Open: One copper wire is cut, loose, or never reached the gold pin inside the plug—causing the tester LED for that pin to stay dark.",
        "Short: Two bare wires accidentally touch inside the plug or damaged jacket, causing signals to bleed together and two LEDs to flash at once.",
        "Miswire: Wires are placed in the wrong pin positions at one end, so pin LEDs light up out of sequence between both ends."
      ],
      "expectedCount": 3
    }
  ],
  "demo": {
    "type": "cable",
    "title": "8P8C cable termination workbench",
    "lead": "Modeled wire-map tester • select all eight conductors at both ends. Tester results are calculated from your mappings."
  },
  "installation": {
    "equipment": "UTP/STP samples, fiber/coax samples, media comparison guides.",
    "mistakes": "Assuming all categories and all fiber types have identical reach.",
    "safety": "Never look into fiber connectors. Handle glass fibers carefully and dispose of scraps in approved sharps containers."
  }
});
