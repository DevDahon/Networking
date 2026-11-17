import {topic} from './createTopic.js';
export default topic({
  "id": "04-network-devices",
  "title": "Network Devices and Components",
  "icon": "Router",
  "description": "Identify the hardware and follow the different jobs of switching, routing, and wireless access.",
  "objectives": [
    "Identify NIC, hub, switch, router, AP, and repeater.",
    "Choose the correct device for a network requirement.",
    "Explain local switching versus inter-network routing."
  ],
  "concepts": [
    {
      "title": "Six common network devices",
      "items": [
        "NIC: Built-in Ethernet port or Wi-Fi card that lets a PC send data and carries its unique MAC address.",
        "Hub: Legacy multiport box that blindly copies incoming bits to every other port without reading MAC addresses.",
        "Switch: Learns device MAC addresses on each port and forwards local traffic straight to the right target.",
        "Router: Connects different IP networks together and checks routing paths to move packets toward outside networks.",
        "Wireless access point: Broadcasts Wi-Fi signals and bridges wireless phones or laptops into the wired LAN.",
        "Repeater: Rebuilds and boosts weakened copper, optical, or radio signals so data can travel farther cleanly."
      ],
      "expectedCount": 6,
      "lead": "These are functions; one physical product may combine several of them."
    },
    {
      "title": "Network Interface Card (NIC)",
      "deviceKey": "nic",
      "lead": "A Network Interface Card (NIC) connects a computer or host device to the network medium.",
      "paragraphs": [
        "Each NIC provides a physical interface—either an RJ45 Ethernet jack or a built-in Wi-Fi radio—that converts computer data into electrical, optical, or wireless signals for transmission.",
        "Every Ethernet and Wi-Fi NIC also carries a unique 48-bit factory MAC address so switches and access points know exactly which device sent or should receive a local frame."
      ]
    },
    {
      "title": "Network Hub",
      "deviceKey": "hub",
      "lead": "A network hub is a legacy multiport repeater that copies incoming electrical signals out to every other connected port.",
      "paragraphs": [
        "Instead of isolating connections, all ports on a hub share one electrical bus. Because a hub works strictly at the physical signal level, it cannot read MAC or IP addresses.",
        "Any incoming bit is flooded out every other port, forcing devices to take turns and creating collisions as more computers share the hub—which is why modern LANs replace hubs with switches."
      ]
    },
    {
      "title": "Network Switch",
      "deviceKey": "switch",
      "lead": "A network switch connects wired devices in a LAN and forwards frames directly to the target port using learned MAC addresses.",
      "paragraphs": [
        "Unlike a hub, a switch gives each connected port its own dedicated link, eliminating signal collisions. It inspects the source MAC address of incoming frames and records which port each device uses in a MAC address table.",
        "When the destination MAC is already known, the switch sends the frame only to that target port; if unknown or broadcast, it briefly floods the frame locally to learn the port."
      ]
    },
    {
      "title": "Network Router",
      "deviceKey": "router",
      "lead": "A router connects separate IP networks together and uses a routing table to forward packets across network boundaries.",
      "paragraphs": [
        "A router sits at the boundary between networks, linking a local LAN to remote subnets, campus backbones, or an Internet Service Provider’s WAN. It stops local broadcasts from leaking outside the LAN.",
        "For each packet leaving a local subnet, the router reads the destination IP prefix, checks its routing table, and forwards the packet toward the best next-hop gateway."
      ]
    },
    {
      "title": "Wireless Access Point (AP)",
      "deviceKey": "ap",
      "lead": "A wireless access point (AP) connects Wi-Fi stations to a wired local area network.",
      "paragraphs": [
        "An access point operates 2.4 GHz, 5 GHz, or 6 GHz radios to let laptops, phones, and tablets join the local network without Ethernet cables.",
        "Acting as a wireless-to-wired bridge, it converts Wi-Fi frames into wired Ethernet frames onto the local switch—often receiving both data and Power over Ethernet (PoE) from one cable."
      ]
    },
    {
      "title": "Network Repeater",
      "deviceKey": "repeater",
      "lead": "A repeater regenerates and amplifies electrical, optical, or radio signals to extend transmission distance.",
      "paragraphs": [
        "Signals naturally weaken (attenuate) and accumulate distortion as they travel across long copper cables, fiber spans, or open rooms.",
        "A repeater rebuilds crisp digital pulses—rather than blindly boosting background noise—to restore reliable signaling and extend reach beyond normal cable or radio distance limits."
      ]
    },
    {
      "title": "Virtual LANs and Routing Principles",
      "lead": "VLANs split a physical switch into isolated virtual networks, while routers use static or dynamic routes to connect them.",
      "paragraphs": [
        "A Virtual LAN (VLAN) divides one physical switch into separate logical broadcast domains—such as Students, Faculty, and Guests—improving performance and keeping sensitive traffic isolated.",
        "Because VLANs are separate Layer 3 networks, traffic moving between them must pass through a router or Layer 3 switch configured with either manual static routes or automatic dynamic routing protocols (such as OSPF)."
      ]
    }
  ],
  "installation": {
    "equipment": "PC/NIC, switch, router/AP, patch cable; photographs if equipment is unavailable.",
    "mistakes": "Confusing a switch with a router; plugging the WAN uplink into a random LAN port.",
    "safety": "Do not open powered equipment or reset production routers."
  }
});
