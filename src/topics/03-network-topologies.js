import {topic} from './createTopic.js';
export default topic({
  "id": "03-network-topologies",
  "title": "Network Topologies and Basic Network Design",
  "icon": "Workflow",
  "description": "Build connections, compare layouts, and investigate what happens when a link fails.",
  "objectives": [
    "Distinguish physical layout from logical data flow.",
    "Compare six topology models and their failure assumptions.",
    "Design a small switched star LAN with labeled ports."
  ],
  "concepts": [
    {
      "title": "Two meanings of topology",
      "items": [
        "Physical topology: which devices have direct connections and where the cables or wireless links are arranged.",
        "Logical topology: how communication uses those connections, including the path and access rules followed by the data."
      ],
      "expectedCount": 2
    },
    {
      "title": "Six network topologies",
      "items": [
        "Star: endpoints connect to a central switch. A single endpoint cable failure usually isolates that endpoint.",
        "Bus: a classic shared coaxial backbone requires correct termination. A backbone break disrupts the segment.",
        "Ring: a classic single ring passes traffic along a closed path. A break disrupts this simple model; protected rings may recover.",
        "Full mesh: every node connects directly to every other node; alternate paths can survive one link failure.",
        "Tree: branches connect hierarchically. An upstream link failure isolates the subtree below it.",
        "Hybrid: combines layouts, such as two stars joined by a backbone. The effect of a failure depends on where it occurs."
      ],
      "expectedCount": 6,
      "lead": "Connection patterns have different costs and failure behavior.",
      "footnote": "Redundancy can improve availability but adds cost and control requirements."
    },
    {
      "title": "Choose a topology for the task",
      "lead": "A small classroom commonly uses a switched star: easy to expand and isolate cable faults.",
      "items": [
        "Count the computers, printers, servers, and uplinks that need connections; allow spare switch ports for growth.",
        "Choose suitable cable lengths and record which device uses each port. Clear labels make expansion and fault tracing easier.",
        "Consider the effect of one failed link or central device. Extra Ethernet links require appropriate loop prevention rather than simply connecting every available port."
      ]
    }
  ],
  "demo": {
    "type": "topology",
    "title": "Topology workbench",
    "lead": "Modeled connectivity • choose a layout, remove a labeled link or node, or build your own graph."
  },
  "application": {
    "title": "Design an eight-seat computer lab",
    "lead": "An eight-seat classroom needs a printer and a router uplink in addition to its computers.",
    "items": [
      "Plan at least ten switch ports and allow expansion; a 16-port switch is a practical option.",
      "Each PC gets a separate cable to the switch.",
      "Keep a port map so a disconnected PC can be traced to one link."
    ]
  },
  "walkthrough": false,
  "installation": {
    "equipment": "Two or more PCs, switch, known-good patch cables, paper.",
    "mistakes": "Connecting an unmanaged loop; confusing a router uplink with a PC cable.",
    "safety": "Avoid trip hazards; never pull a cable by its conductors."
  }
});
