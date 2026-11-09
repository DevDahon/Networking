import {topic} from './createTopic.js';
export default topic({
  "id": "12-router-wireless",
  "title": "Router and Wireless Network Configuration",
  "icon": "Wifi",
  "description": "Configure a teaching router, connect clients, and understand LAN, WAN, DHCP, and wireless security.",
  "objectives": [
    "Distinguish LAN interfaces, WAN uplink, routing, and NAT.",
    "Choose secure Wi-Fi settings and explain guest isolation.",
    "Configure a consistent LAN address and DHCP pool in the simulator."
  ],
  "concepts": [
    {
      "title": "Three gateway interface and translation concepts",
      "lead": "A small-office gateway often combines routing, switching, wireless access, DHCP, NAT, and firewall policy.",
      "items": [
        "LAN interface: faces local clients.",
        "WAN interface: faces another network, usually the provider. Working Internet service also needs provider connectivity and routes.",
        "NAT: translates addresses; a gateway commonly uses port translation so private clients can share a public IPv4 address."
      ],
      "footnote": "NAT does not replace firewall policy. Local connectivity does not prove WAN or DNS service.",
      "expectedCount": 3
    },
    {
      "title": "Wireless identity and protection",
      "lead": "An SSID names a wireless network. Association and authentication come before useful IP connectivity.",
      "items": [
        "Wireless security: avoid open networks, WEP, and obsolete WPA/TKIP. Choose a supported protected configuration.",
        "Choose a long unique passphrase and protect router administrator credentials separately. Hiding an SSID is not a security control.",
        "A guest network should be intentionally isolated from private LAN resources. Check the real product’s isolation behavior."
      ]
    },
    {
      "title": "Wi-Fi Frequencies and Standards",
      "lead": "Wireless networks operate over unlicensed radio frequencies using standardized IEEE 802.11 protocols.",
      "items": [
        "2.4 GHz Frequency Band: Travels farther and penetrates walls well, but offers lower speeds and suffers high congestion from Bluetooth and microwaves.",
        "5 GHz Frequency Band: Delivers much faster data speeds and less interference, but has a shorter range and struggles to pass through solid walls.",
        "Wi-Fi 4 (802.11n): Introduced dual-band operation and MIMO antenna streams, reaching up to 600 Mbps.",
        "Wi-Fi 5 (802.11ac): High-speed 5 GHz standard providing gigabit wireless speeds for modern laptops and mobile devices.",
        "Wi-Fi 6 (802.11ax): Modern standard operating on 2.4 GHz, 5 GHz, and 6 GHz (Wi-Fi 6E), optimized for crowded environments like schools and stadiums."
      ],
      "footnote": "Dual-band home and school routers broadcast on both 2.4 GHz and 5 GHz simultaneously under the same SSID so devices can choose the best connection."
    },
    {
      "title": "Two protected Wi-Fi security options",
      "items": [
        "WPA3-Personal: use when supported by the router and clients.",
        "WPA2-Personal with AES: use for compatible devices that need this protected configuration."
      ],
      "expectedCount": 2
    },
    {
      "title": "Change settings in a safe order",
      "lead": "Record the current configuration and use authorized administrative access on a dedicated lab router.",
      "items": [
        "Choose a private LAN subnet, then a pool of usable addresses inside it excluding the router’s address.",
        "Changing the router LAN address can interrupt management access; reconnect and obtain a lease in the new subnet.",
        "Save settings, connect one wired and one wireless client, then verify IP options, gateway reachability, and service access separately."
      ]
    }
  ],
  "demo": {
    "type": "router",
    "title": "Educational router console",
    "lead": "Browser-only model • configure LAN and Wi-Fi, apply settings, then add wired or authenticated wireless clients."
  },
  "application": {
    "title": "A small training center",
    "lead": "Staff PCs and visitor phones share one provider connection, but visitors should not browse staff folders.",
    "items": [
      "Use a private staff LAN and a properly isolated guest WLAN supported by the equipment.",
      "Document WAN requirements from the provider instead of guessing settings.",
      "Confirm guests cannot access staff resources while approved Internet access remains possible."
    ]
  },
  "installation": {
    "equipment": "Isolated router/AP, wired PC, wireless client, approved admin access.",
    "mistakes": "Pool outside the LAN, confusing Wi-Fi password with admin password, assuming a local link proves WAN access.",
    "safety": "Do not factory-reset or reconfigure a production router."
  }
});
