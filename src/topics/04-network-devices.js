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
        "Bridge: joins separate LAN segments and filters local MAC traffic; a switch acts as a multiport bridge.",
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
      "lead": "A network hub is a legacy multiport repeater that copies incoming electrical signals out to every other connected port.",
      "items": [
        "Shared Electrical Bus: Shares one electrical path across all connected ports instead of isolating traffic.",
        "No Address Reading: Cannot inspect MAC or IP addresses.",
        "Floods Everything: Copies incoming bits to every other port, causing collisions."
      ]
    },
    {
      "title": "Network Switch",
      "deviceKey": "switch",
      "lead": "A network switch connects wired devices in a LAN and forwards frames directly to the target port using learned MAC addresses.",
      "items": [
        "No Collisions: Gives every connected port its own dedicated full-speed link.",
        "MAC Address Table: Learns which device MAC address is plugged into each port.",
        "Smart Forwarding: Sends known frames only to the target port; floods unknown ones."
      ]
    },
    {
      "title": "Network Router",
      "deviceKey": "router",
      "lead": "A router connects separate IP networks together and uses a routing table to forward packets across network boundaries.",
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
        "Wireless-to-Wired Bridge: Passes frames directly between Wi-Fi clients and the wired Ethernet LAN.",
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
      "title": "Virtual LANs and Routing Principles",
      "lead": "VLANs split a physical switch into isolated virtual networks, while routers use static or dynamic routes to connect them.",
      "items": [
        "Virtual LAN (VLAN): Splits one switch into separate logical groups (e.g., Students vs. Staff).",
        "Broadcast Isolation: Keeps broadcast traffic inside its own VLAN for better speed and security.",
        "Inter-VLAN Routing: Traffic between different VLANs must pass through a router.",
        "Static Routing: Admin manually enters fixed routes—ideal for small, simple networks.",
        "Dynamic Routing: Routers automatically share paths (OSPF/RIP) and route around failures."
      ]
    }
  ],
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
