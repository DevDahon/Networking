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
        "Physical topology: The real-world layout you can see and touch—where every computer sits, which switch port each cable enters, and how wires run through walls or trays.",
        "Logical topology: How data actually travels between devices behind the scenes, shaped by switches, VLANs, and network rules regardless of how cables are arranged."
      ],
      "expectedCount": 2
    },
    {
      "title": "Six network topologies",
      "items": [
        "Star: Every device plugs into a central switch with its own cable. One broken wire disconnects only that single PC while the rest stay online.",
        "Bus: Older design where all devices share one main backbone cable. A single cut or loose terminator brings down the entire network.",
        "Ring: Devices connect end-to-end in a closed loop, passing data around the circle. One break stops traffic unless a backup ring exists.",
        "Full mesh: Every device has a direct link to every other device. Very reliable with instant backup paths, though it uses lots of cables.",
        "Tree: Joins multiple star switches in a branching hierarchy from a core root switch. Simple to expand, though an upper-link cut isolates a branch.",
        "Hybrid: Mixes two or more layouts—such as connecting several classroom star switches together onto a fast building or campus backbone."
      ],
      "expectedCount": 6,
      "lead": "Connection patterns have different costs and failure behavior."
    },
    {
      "title": "Choose a topology for the task",
      "lead": "A small classroom commonly uses a switched star: easy to expand and isolate cable faults.",
      "paragraphs": [
        "Start by counting all computers, printers, and servers, then choose a central switch with spare ports for future growth. Use proper cable lengths and label every port so faults can be traced quickly.",
        "Avoid creating unmanaged loops by connecting two switch ports together with an extra cable unless loop protection such as Spanning Tree Protocol is active."
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
