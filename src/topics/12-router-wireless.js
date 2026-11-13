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
        "LAN interface: Connects and serves devices inside the local network.",
        "WAN interface: Connects the router to the Internet Service Provider.",
        "NAT: Translates private LAN IPs into one public WAN IP for Internet access."
      ],
      "expectedCount": 3
    },
    {
      "title": "Wireless identity and protection",
      "lead": "An SSID names a wireless network. Association and authentication come before useful IP connectivity.",
      "items": [
        "Strong encryption: Always choose WPA3 or WPA2-AES; never use WEP or open Wi-Fi for private data.",
        "Separate passwords: Use a strong Wi-Fi passphrase and a different router admin password.",
        "Guest isolation: Place visitors on an isolated Guest Wi-Fi so they cannot access private LAN folders."
      ]
    },
    {
      "title": "Wi-Fi Frequencies and Standards",
      "lead": "Wireless networks operate over unlicensed radio frequencies using standardized IEEE 802.11 protocols.",
      "items": [
        "2.4 GHz Band: Longer range through walls, but slower and prone to interference.",
        "5 GHz Band: Much faster with less interference, but shorter range through walls.",
        "Wi-Fi 4 (802.11n): Dual-band standard supporting speeds up to 600 Mbps.",
        "Wi-Fi 5 (802.11ac): High-speed 5 GHz standard delivering gigabit wireless speeds.",
        "Wi-Fi 6 (802.11ax): Modern standard across 2.4/5/6 GHz built for crowded schools and offices."
      ]
    },
    {
      "title": "Two protected Wi-Fi security options",
      "items": [
        "WPA3-Personal: Strongest modern Wi-Fi protection for supported devices.",
        "WPA2-Personal (AES): Reliable standard protection compatible with most devices."
      ],
      "expectedCount": 2
    },
    {
      "title": "Change settings in a safe order",
      "lead": "Record the current configuration and use authorized administrative access on a dedicated lab router.",
      "items": [
        "Set LAN & DHCP together: Pick a private LAN IP and matching DHCP pool inside the same subnet.",
        "Reconnect after IP changes: Changing the router's LAN IP drops your session until you renew your lease.",
        "Verify step by step: Connect one wired and one wireless device, then test gateway and Internet access."
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
