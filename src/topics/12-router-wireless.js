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
      "visualKey": "gatewayInterfacesPhotos",
      "visualLayout": "split",
      "lead": "A small-office gateway often combines routing, switching, wireless access, DHCP, NAT, and firewall policy.",
      "items": [
        "LAN interface: Faces inward toward your room or office, connecting local computers and Wi-Fi devices through private IP addresses.",
        "WAN interface: Faces outward to your Internet Service Provider (ISP) modem so the router can reach websites and cloud apps.",
        "NAT: Automatically swaps private classroom IPs for the router’s single public WAN address so everyone can share one Internet connection."
      ],
      "expectedCount": 3
    },
    {
      "title": "Wireless identity and protection",
      "lead": "An SSID names a wireless network. Association and authentication come before useful IP connectivity.",
      "paragraphs": [
        "Always protect Wi-Fi networks with WPA3-Personal or WPA2-Personal (AES) rather than legacy WEP or open wireless, and keep your router’s admin password separate from the shared Wi-Fi passphrase.",
        "For classrooms and small offices, place visitors on an isolated Guest Wi-Fi SSID so guests gain Internet access without reaching internal office computers or shared printers."
      ]
    },
    {
      "title": "Wi-Fi Frequencies and Standards",
      "visualKey": "wifiRouterHardwarePhoto",
      "visualLayout": "split",
      "lead": "Wireless networks operate over unlicensed radio frequencies using standardized IEEE 802.11 protocols.",
      "paragraphs": [
        "The 2.4 GHz band penetrates walls and covers wider rooms at lower throughput, whereas the 5 GHz and 6 GHz bands deliver higher speeds with less crowding over shorter distances.",
        "IEEE standards have evolved from dual-band Wi-Fi 4 (802.11n, up to 600 Mbps) and high-speed 5 GHz Wi-Fi 5 (802.11ac) to modern Wi-Fi 6 (802.11ax), designed for dense classrooms and offices."
      ]
    },
    {
      "title": "Change settings in a safe order",
      "lead": "Record the current configuration and use authorized administrative access on a dedicated lab router.",
      "paragraphs": [
        "Keep the router’s LAN IP address and DHCP pool aligned inside the same subnet before saving. If you change the router’s LAN address, expect your browser admin session to drop until client devices renew their IP leases.",
        "After applying changes, connect one wired computer and one wireless client to verify both local DHCP assignment and WAN Internet reachability."
      ]
    }
  ],
  "demo": {
    "type": "router",
    "title": "Educational router console",
    "lead": "Browser-only model • configure LAN and Wi-Fi, apply settings, then add wired or authenticated wireless clients."
  },
  "installation": {
    "equipment": "Isolated router/AP, wired PC, wireless client, approved admin access.",
    "mistakes": "Pool outside the LAN, confusing Wi-Fi password with admin password, assuming a local link proves WAN access.",
    "safety": "Do not factory-reset or reconfigure a production router."
  }
});
