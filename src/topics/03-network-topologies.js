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
        "Physical topology: How devices and cables are physically arranged and connected.",
        "Logical topology: The actual path and rules data follows across the network."
      ],
      "expectedCount": 2
    },
    {
      "title": "Six network topologies",
      "items": [
        "Star: All devices connect to a central switch; one broken cable affects only one device.",
        "Bus: Devices share one main cable; a break in the main cable stops the whole network.",
        "Ring: Devices connect in a circle; one break stops traffic unless a backup ring exists.",
        "Full mesh: Every device connects to every other device for high fault tolerance.",
        "Tree: Star networks arranged in a hierarchy; an upper-link break isolates the branch below.",
        "Hybrid: Combines two or more topologies, such as star networks joined by a backbone."
      ],
      "expectedCount": 6,
      "lead": "Connection patterns have different costs and failure behavior.",
      "footnote": "Redundancy improves availability but increases cabling cost."
    },
    {
      "title": "Choose a topology for the task",
      "lead": "A small classroom commonly uses a switched star: easy to expand and isolate cable faults.",
      "items": [
        "Port planning: Count all computers, printers, and servers, plus spare switch ports for growth.",
        "Cable labeling: Use proper cable lengths and label every port for fast troubleshooting.",
        "Loop prevention: Never connect two switch ports together with an extra cable without loop protection."
      ]
    }
  ],
  "demo": {
    "type": "topology",
    "title": "Topology workbench",
    "lead": "Modeled connectivity • choose a layout, test cable/device failures, and trace communication paths."
  },
  "walkthrough": false,
  "installation": {
    "equipment": "Two or more PCs, switch, known-good patch cables, paper.",
    "mistakes": "Connecting an unmanaged loop; confusing a router uplink with a PC cable.",
    "safety": "Avoid trip hazards; never pull a cable by its conductors."
  }
});
