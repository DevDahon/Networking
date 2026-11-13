import {topic} from './createTopic.js';
export default topic({
  "id": "04-network-devices",
  "title": "Network Devices and Components",
  "icon": "Router",
  "description": "Identify the hardware and follow the different jobs of switching, routing, and wireless access.",
  "objectives": [
    "Identify NIC, hub, switch, router, modem, AP, repeater, bridge, and firewall.",
    "Choose the correct device for a network requirement.",
    "Explain local switching versus inter-network routing."
  ],
  "concepts": [
    {
      "title": "Nine common network devices",
      "items": [
        "NIC: provides a host network interface.",
        "Hub: repeats incoming bits to other ports without learning MAC destinations.",
        "Switch: learns MAC information and forwards local-link frames.",
        "Router: forwards IP packets between networks using routes.",
        "Modem: adapts signals for a provider access technology.",
        "Wireless access point: bridges Wi-Fi stations onto a LAN.",
        "Repeater: regenerates or retransmits signals.",
        "Bridge: joins link-layer segments; a switch is a multiport bridge.",
        "Firewall: permits or blocks traffic according to policy."
      ],
      "expectedCount": 9,
      "lead": "These are functions; one physical product may combine several of them."
    },
    {
      "title": "Network Interface Card (NIC)",
      "deviceKey": "nic",
      "lead": "A Network Interface Card (NIC) connects a computer or host device to the network medium.",
      "items": [
        "Physical Port: Connects the device to an Ethernet cable (RJ45) or Wi-Fi radio.",
        "MAC Identity: Stores a unique 48-bit factory hardware MAC address.",
        "Signal Conversion: Turns computer data into electrical, optical, or radio signals."
      ]
    },
    {
      "title": "Network Hub",
      "deviceKey": "hub",
      "lead": "A network hub is a legacy Layer 1 physical device that repeats electrical signals to all connected ports.",
      "items": [
        "Layer 1 Repeater: Shares one electrical bus across all connected ports.",
        "No Address Reading: Cannot inspect MAC or IP addresses.",
        "Floods Everything: Copies incoming bits to every other port, causing collisions."
      ]
    },
    {
      "title": "Network Switch",
      "deviceKey": "switch",
      "lead": "A network switch is an intelligent Layer 2 device that forwards frames using learned MAC addresses.",
      "items": [
        "No Collisions: Gives every connected port its own dedicated full-speed link.",
        "MAC Address Table: Learns which device MAC address is plugged into each port.",
        "Smart Forwarding: Sends known frames only to the target port; floods unknown ones."
      ]
    },
    {
      "title": "Network Router",
      "deviceKey": "router",
      "lead": "A router is a Layer 3 internetworking device that forwards packets between different logical networks.",
      "items": [
        "Connects Networks: Links your local LAN to outside WANs or the Internet.",
        "Routing Table: Looks up destination IP prefixes to pick the best next hop.",
        "Stops Broadcasts: Keeps local LAN broadcast traffic from leaking outside."
      ]
    },
    {
      "title": "Modem (Modulator-Demodulator)",
      "deviceKey": "modem",
      "lead": "A modem converts digital computer data into analog signals suitable for transmission over provider media.",
      "items": [
        "ISP Bridge: Connects home or office networks to DSL, coax cable, or fiber lines.",
        "Modulate (Send): Converts digital bits into provider line signals.",
        "Demodulate (Receive): Converts incoming provider signals back into digital Ethernet."
      ]
    },
    {
      "title": "Wireless Access Point (AP)",
      "deviceKey": "ap",
      "lead": "A wireless access point (AP) connects Wi-Fi stations to a wired local area network.",
      "items": [
        "Wi-Fi Radio: Broadcasts 2.4 GHz, 5 GHz, or 6 GHz wireless signals.",
        "Layer 2 Bridge: Connects wireless devices directly onto the wired Ethernet LAN.",
        "Easy Expansion: Usually powered by a single PoE (Power over Ethernet) switch cable."
      ]
    },
    {
      "title": "Network Repeater",
      "deviceKey": "repeater",
      "lead": "A repeater regenerates and amplifies electrical, optical, or radio signals to extend transmission distance.",
      "items": [
        "Fixes Signal Loss: Overcomes cable attenuation over long distances.",
        "Clean Regeneration: Rebuilds crisp digital pulses instead of boosting noise.",
        "Extends Reach: Pushes signals past standard cable or Wi-Fi distance limits."
      ]
    },
    {
      "title": "Network Bridge",
      "deviceKey": "bridge",
      "lead": "A network bridge connects two or more separate LAN segments at Layer 2 to segment traffic and reduce congestion.",
      "items": [
        "Splits Collision Domains: Divides one busy LAN into two quieter segments.",
        "Tracks MACs: Learns which MAC addresses live on Side A vs. Side B.",
        "Filters Local Traffic: Only forwards frames that actually need to cross segments."
      ]
    },
    {
      "title": "Network Firewall",
      "deviceKey": "firewall",
      "lead": "A firewall monitors and filters incoming and outgoing network traffic based on configured security policies.",
      "items": [
        "Boundary Guard: Protects the border between your trusted LAN and the Internet.",
        "Stateful Tracking: Allows replies to your requests while blocking outside attacks.",
        "Rule Filtering: Permits or drops packets based on IP address, protocol, and port."
      ]
    },
    {
      "title": "Connecting a device to a LAN",
      "lead": "A network interface card (NIC) provides a device’s network interface; an Ethernet port is a physical connection point.",
      "items": [
        "Hub (Layer 1): Blindly repeats every bit to all ports without checking MAC addresses.",
        "Switch (Layer 2): Learns source MAC addresses and sends frames directly to the target port.",
        "Bridge (Layer 2): Connects two LAN segments; a switch acts as a multi-port bridge."
      ]
    },
    {
      "title": "Joining networks and media",
      "lead": "A router forwards IP packets between networks using a routing table.",
      "items": [
        "Modem / ONT: Converts signals for your ISP’s coaxial, phone, or fiber line.",
        "Access Point (AP): Connects Wi-Fi devices to the wired switch.",
        "Home Gateway: Combines a router, switch, AP, DHCP server, and firewall in one box."
      ]
    },
    {
      "title": "Ports and protection",
      "lead": "Device roles explain behavior better than the shape of the box.",
      "items": [
        "LAN vs. WAN Ports: LAN ports connect local PCs; the WAN port connects to the ISP.",
        "Firewall Rules: Block unwanted network traffic based on security policies.",
        "Link Lights: Confirm a working cable connection, not valid IP or Internet access."
      ]
    },
    {
      "title": "Virtual LANs and Routing Principles",
      "lead": "VLANs split a physical switch into isolated virtual networks, while routers use static or dynamic routes to connect them.",
      "items": [
        "Virtual LAN (VLAN): Splits one switch into separate logical groups (e.g., Students vs. Staff).",
        "Broadcast Isolation: Keeps broadcast traffic inside its own VLAN for better speed and security.",
        "Inter-VLAN Routing: Traffic between different VLANs must pass through a router.",
        "Static Routing: Admin manually enters fixed routes—ideal for small, simple networks.",
        "Dynamic Routing: Routers automatically share paths (OSPF/RIP) and route around failures."
      ],
      "footnote": "VLANs let one switch securely separate departments without buying extra hardware."
    }
  ],
  "demo": {
    "type": "devices",
    "title": "Network device explorer",
    "lead": "Conceptual device gallery • inspect labeled interfaces and compare a hub, switch, and router."
  },
  "application": {
    "title": "Expand a small office",
    "lead": "The office has too few wired ports and weak Wi-Fi in a meeting room.",
    "items": [
      "Add a suitable switch for Ethernet ports and an AP with a wired uplink for wireless coverage.",
      "Use a router for traffic between networks, rather than buying another hub.",
      "Check existing gateway features before adding duplicate DHCP servers."
    ]
  },
  "installation": {
    "equipment": "PC/NIC, switch, router/AP, patch cable; photographs if equipment is unavailable.",
    "mistakes": "Calling every box a modem; plugging the provider into a random LAN port.",
    "safety": "Do not open powered equipment or reset production routers."
  }
});
