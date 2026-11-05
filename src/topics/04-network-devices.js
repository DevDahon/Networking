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
