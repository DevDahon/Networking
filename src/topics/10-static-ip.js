import {topic} from './createTopic.js';
export default topic({
  "id": "10-static-ip",
  "title": "IP Configuration: Static IP and Dynamic (DHCP)",
  "icon": "MonitorCog",
  "description": "Configure static IPv4 settings on Windows hosts, step through DHCP DORA leases and pools, and verify connectivity.",
  "objectives": [
    "Differentiate static and dynamic (DHCP) IP configuration methods.",
    "Configure unique IP addresses, subnet masks, default gateways, and DNS servers on Windows.",
    "Predict whether communication stays local or requires routing and troubleshoot mismatched masks.",
    "Explain the four DHCP DORA messages: Discover, Offer, Request, and Acknowledgment.",
    "Manage a DHCP address pool with leases, renewals, reservations, and exclusions.",
    "Diagnose pool exhaustion, expired leases, and 169.254.x.x APIPA fallback."
  ],
  "concepts": [
    {
      "title": "Two ways to assign an address",
      "items": [
        "Static: Typed in manually so important devices like routers, servers, and shared classroom printers always keep the exact same address.",
        "Dynamic: Handed out automatically by a DHCP server when laptops or phones join, saving time and preventing duplicate-IP mistakes."
      ],
      "expectedCount": 2
    },
    {
      "title": "Give a device a stable address",
      "lead": "Static addressing is manually configured and remains until changed. It is useful for infrastructure and predictable service endpoints.",
      "paragraphs": [
        "Because servers, network printers, and routers need a predictable IP address that never changes on reboot, administrators enter their address settings manually after documenting the current subnet values.",
        "Always choose a unique host address inside the right subnet and keep it outside the router’s automatic DHCP range so two devices are never given the same IP."
      ]
    },
    {
      "title": "Four IPv4 configuration fields",
      "items": [
        "IP address: This computer’s own unique numeric address inside the subnet so local devices and servers know where to reply.",
        "Subnet mask: Tells the computer which digits are the shared network prefix (e.g., 255.255.255.0 or /24) vs. the host device.",
        "Default gateway: The local router’s LAN IP where traffic goes whenever a destination lives outside the local subnet.",
        "DNS server: The phonebook server that translates website names like school.edu into numeric IP addresses."
      ],
      "expectedCount": 4
    },
    {
      "title": "Same subnet is a two-sided decision",
      "lead": "With /24 masks, 192.168.1.10 and 192.168.1.20 are local to each other.",
      "paragraphs": [
        "When two hosts share the same subnet mask and network prefix, they deliver frames directly through the switch without a router. When their network portions differ, traffic goes to the default gateway instead.",
        "Because each host checks the mask independently, a mismatched mask causes one computer to treat its neighbor as local while the other tries to send replies to a router—breaking two-way connectivity."
      ]
    },
    {
      "title": "Why two hosts can disagree about the same subnet",
      "kind": "demo",
      "lead": "Calculate each host’s local/remote decision independently using its own mask.",
      "type": "asymmetricDemo"
    },
    {
      "title": "Two-PC configuration demonstration",
      "kind": "demo",
      "type": "static",
      "lead": "Modeled network • validate fields, disconnect the link, or enable a router with interfaces in both subnets."
    },
    {
      "title": "A lease supplies configuration",
      "lead": "DHCP lets a client obtain configuration automatically from an authorized server rather than entering each value manually.",
      "paragraphs": [
        "Instead of configuring every laptop by hand, a DHCP server maintains an address pool of usable IP addresses and lends one temporary lease to each joining client along with its subnet mask, default gateway, and DNS server.",
        "The server tracks every active lease to prevent address conflicts, while administrators exclude static server or printer IPs so the pool never hands them out automatically."
      ]
    },
    {
      "title": "Four messages in the initial DHCP exchange",
      "lead": "An unconfigured IPv4 client starts by discovering a server on its local network (or through a configured relay).",
      "items": [
        "Discover: The new device has no IP yet, so it broadcasts across the local LAN asking if any DHCP server is listening.",
        "Offer: A reachable DHCP server picks an unused IP from its pool and replies with an offer, mask, gateway, and DNS.",
        "Request: The client answers publicly asking to accept that specific offered IP so any other servers know it chose this one.",
        "Acknowledgment (ACK): The server records the active lease in its table and sends final confirmation so the client starts using the IP."
      ],
      "expectedCount": 4
    },
    {
      "title": "DHCP Lease Lifecycle and Common Faults",
      "lead": "Leases have lifetimes; a client should renew before expiry rather than keep an address forever.",
      "paragraphs": [
        "Each DHCP lease has a finite timer: healthy clients renew their lease before it runs out, return it early with a Release when shutting down cleanly, or allow it to expire so the server reclaims the IP for other devices.",
        "Two common failures interrupt connectivity: pool exhaustion (all available IPs are taken, so new devices join Wi-Fi without receiving an IP) and server unavailability (clients fall back to a 169.254.x.x self-assigned APIPA address with no Internet access)."
      ]
    }
  ],
  "demo": {
    "type": "dhcp",
    "title": "DHCP lease desk",
    "lead": "Modeled protocol • configure a pool, step DORA, allocate clients, release or renew, and advance lease time."
  },
  "installation": {
    "equipment": "Two Windows PCs, switch, cables, approved administrative access.",
    "mistakes": "Duplicate addresses, wrong adapter, mismatched masks, assuming DNS repairs IP routing.",
    "safety": "Use only approved isolated equipment; preserve firewall protections."
  }
});
