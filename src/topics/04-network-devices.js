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
        "Physical connection: Houses the physical port (such as RJ45 or Wi-Fi radio) and controller chip for host communication.",
        "Unique hardware identity: Permanently assigned a factory-burned 48-bit Media Access Control (MAC) address for local link delivery.",
        "Data transmission: Converts host memory data into electrical or radio bitstreams, framing data with MAC addresses and CRC checksums."
      ]
    },
    {
      "title": "Network Hub",
      "deviceKey": "hub",
      "lead": "A network hub is a legacy Layer 1 physical device that repeats electrical signals to all connected ports.",
      "items": [
        "Multiport repeater: Connects multiple twisted-pair Ethernet cables in a single shared electrical bus.",
        "No address awareness: Operates purely at Layer 1; it cannot read MAC addresses, IP packets, or inspect frames.",
        "Broadcast behavior: Any electrical bit received on one port is broadcast out to every other port, creating a single shared collision domain."
      ]
    },
    {
      "title": "Network Switch",
      "deviceKey": "switch",
      "lead": "A network switch is an intelligent Layer 2 device that forwards frames using learned MAC addresses.",
      "items": [
        "Dedicated bandwidth: Connects local hosts with dedicated point-to-point links, eliminating collisions between ports.",
        "MAC address table: Dynamically inspects the source MAC of incoming frames and maps each address to its incoming physical port.",
        "Forwarding decision: When a frame arrives, the switch forwards known unicast directly to the target port; only unknown destinations are flooded."
      ]
    },
    {
      "title": "Network Router",
      "deviceKey": "router",
      "lead": "A router is a Layer 3 internetworking device that forwards packets between different logical networks.",
      "items": [
        "Network boundary: Separates distinct broadcast domains and connects local subnets to WANs or the global Internet.",
        "Routing table: Maintains a table of network destination prefixes, next-hop IP addresses, and outgoing interfaces.",
        "Packet forwarding: Reads destination IP headers, decrements the TTL, determines the best path, rewrites the Layer 2 frame, and forwards."
      ]
    },
    {
      "title": "Modem (Modulator-Demodulator)",
      "deviceKey": "modem",
      "lead": "A modem converts digital computer data into analog signals suitable for transmission over provider media.",
      "items": [
        "Media adaptation: Bridges home or office Ethernet to provider infrastructures like telephone lines (DSL), cable (DOCSIS), or fiber (ONT).",
        "Modulation & demodulation: Modulates outgoing digital square waves into analog carrier frequencies and demodulates incoming analog waves back to bits.",
        "Signal conversion: LAN Ethernet packets enter the modem, are modulated onto high-frequency RF carriers over coaxial or copper cables, and reach the ISP headend."
      ]
    },
    {
      "title": "Wireless Access Point (AP)",
      "deviceKey": "ap",
      "lead": "A wireless access point (AP) connects Wi-Fi stations to a wired local area network.",
      "items": [
        "Radio transceiver: Transmits and receives radio waves across 2.4 GHz, 5 GHz, or 6 GHz frequency bands.",
        "Layer 2 bridge: Bridges IEEE 802.11 wireless frames into IEEE 802.3 wired Ethernet frames without changing IP addresses.",
        "Client bridging: Broadcasts an SSID beacon, authenticates wireless client devices, and transparently forwards their traffic to the wired switch via PoE uplink."
      ]
    },
    {
      "title": "Network Repeater",
      "deviceKey": "repeater",
      "lead": "A repeater regenerates and amplifies electrical, optical, or radio signals to extend transmission distance.",
      "items": [
        "Overcoming attenuation: Counteracts signal loss and cable resistance that degrade data beyond standard maximum run lengths.",
        "Signal regeneration: Rather than merely amplifying noise, a digital repeater reconstructs clean, full-voltage digital pulses.",
        "Signal restoration: Listens on an input interface, cleans and retimes the incoming waveform, and retransmits it at full strength across the extended medium segment."
      ]
    },
    {
      "title": "Network Bridge",
      "deviceKey": "bridge",
      "lead": "A network bridge connects two or more separate LAN segments at Layer 2 to segment traffic and reduce congestion.",
      "items": [
        "Traffic segmentation: Divides a busy network into two smaller collision domains while keeping them in the same subnet.",
        "Filtering table: Maintains a list of MAC addresses on Segment A and Segment B to decide whether traffic needs to cross.",
        "Frame filtering: If sender and receiver are on Segment A, the bridge filters (drops) the frame from crossing; if the target is on Segment B, it forwards it across."
      ]
    },
    {
      "title": "Network Firewall",
      "deviceKey": "firewall",
      "lead": "A firewall monitors and filters incoming and outgoing network traffic based on configured security policies.",
      "items": [
        "Security perimeter: Sits at network boundaries (e.g. between LAN and Internet) or as host software to defend against unauthorized access.",
        "Inspection methods: Uses packet filtering (IP/ports), stateful inspection (tracking active connections), or deep packet inspection (DPI).",
        "Policy enforcement: Inspects packet headers against security rules; permitted traffic (e.g. outbound web) is passed, while unauthorized packets are dropped or rejected."
      ]
    },
    {
      "title": "Connecting a device to a LAN",
      "lead": "A network interface card (NIC) provides a device’s network interface; an Ethernet port is a physical connection point.",
      "items": [
        "A hub repeats incoming bits out its other ports; it does not learn destination MAC addresses.",
        "A switch learns source MAC addresses and forwards known unicast frames toward the learned destination port. Unknown destinations are flooded within the VLAN.",
        "A bridge joins LAN segments at layer 2. A switch is effectively a multiport bridge."
      ]
    },
    {
      "title": "Joining networks and media",
      "lead": "A router forwards IP packets between networks using a routing table.",
      "items": [
        "A modem adapts signals for a provider access technology, such as cable or DSL. An optical network terminal serves a fiber access role.",
        "A wireless access point bridges Wi-Fi clients onto a LAN. An AP alone is not necessarily a router.",
        "A repeater regenerates or retransmits signals. It does not choose IP routes. Home gateways often combine router, switch, AP, DHCP, and firewall functions."
      ]
    },
    {
      "title": "Ports and protection",
      "lead": "Device roles explain behavior better than the shape of the box.",
      "items": [
        "LAN ports usually connect local clients; a WAN interface connects toward another network/provider. Check the actual model’s labels.",
        "A firewall permits or blocks traffic according to policy. It is not a guarantee that all allowed traffic is safe.",
        "Link lights show physical/link status, not proof of correct IP settings, DNS, or Internet service."
      ]
    },
    {
      "title": "Virtual LANs and Routing Principles",
      "lead": "VLANs split a physical switch into isolated virtual networks, while routers use static or dynamic routes to connect them.",
      "items": [
        "Virtual LAN (VLAN): Divides one physical switch into multiple separate logical broadcast domains (e.g., VLAN 10 for Students, VLAN 20 for Faculty).",
        "Broadcast Isolation: Broadcast traffic (such as ARP and DHCP) stays confined inside its assigned VLAN, boosting performance and security.",
        "Inter-VLAN Routing: Because devices in different VLANs cannot communicate directly, all inter-VLAN traffic must pass through a router or Layer 3 switch.",
        "Static Routing: A network administrator manually enters fixed destination routes into the router table (simple, predictable, low overhead for small networks).",
        "Dynamic Routing: Routers automatically discover paths and exchange network routes using protocols like OSPF and RIP (automatically updates if a link fails)."
      ],
      "footnote": "VLANs replace the need to buy separate physical switches for each school department, saving hardware costs while enforcing security."
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
