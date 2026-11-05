import {topic} from './createTopic.js';
export default topic({
  "id": "08-ip-addressing",
  "title": "Internet Protocol (IP) Addressing Fundamentals",
  "icon": "Binary",
  "description": "Read IPv4 addresses in decimal and binary, then separate network identity from host identity.",
  "objectives": [
    "Validate an IPv4 address and convert an octet to binary.",
    "Identify private and common special-purpose address ranges.",
    "Explain the roles of prefix, gateway, DNS, and address assignment."
  ],
  "concepts": [
    {
      "title": "An address for a network interface",
      "lead": "IPv4 uses 32 bits written as four decimal octets, each from 0 to 255. IPv6 uses 128 bits, usually written as hexadecimal groups.",
      "items": [
        "192.168.1.10 is four octets. Each octet has eight bits weighted 128, 64, 32, 16, 8, 4, 2, 1.",
        "192 is 11000000 because 128 + 64 = 192. An octet cannot hold 300.",
        "IPv6 example: 2001:db8::10 (documentation). IPv6 has different neighbor discovery and no IPv4-style broadcast address."
      ]
    },
    {
      "title": "Prefix, gateway, and DNS do different jobs",
      "lead": "The subnet mask or CIDR prefix tells the host which address bits identify its local subnet.",
      "items": [
        "192.168.1.10/24 uses 24 network bits and 8 host bits; its mask is 255.255.255.0.",
        "The default gateway is a local router used for destinations without a more specific route.",
        "DNS: maps names to records such as IP addresses."
      ]
    },
    {
      "title": "Two ways to assign an address",
      "items": [
        "Static: an administrator manually configures the address and related settings.",
        "Dynamic: DHCP supplies an address lease and configuration options."
      ],
      "expectedCount": 2
    },
    {
      "title": "Three private IPv4 ranges",
      "items": [
        "10.0.0.0/8: 10.0.0.0 through 10.255.255.255.",
        "172.16.0.0/12: 172.16.0.0 through 172.31.255.255.",
        "192.168.0.0/16: 192.168.0.0 through 192.168.255.255."
      ],
      "expectedCount": 3,
      "lead": "RFC 1918 private addresses are not globally routed."
    },
    {
      "title": "Eight common special-purpose IPv4 ranges",
      "items": [
        "127.0.0.0/8: loopback.",
        "169.254.0.0/16: IPv4 link-local.",
        "100.64.0.0/10: shared carrier-grade NAT space.",
        "192.0.2.0/24: documentation.",
        "198.51.100.0/24: documentation.",
        "203.0.113.0/24: documentation.",
        "224.0.0.0/4: multicast.",
        "240.0.0.0/4: reserved space, including limited broadcast at 255.255.255.255."
      ],
      "expectedCount": 8,
      "footnote": "This is not an exhaustive registry. A non-private address is not automatically ordinary globally routable unicast."
    }
  ],
  "demo": {
    "type": "ipv4",
    "title": "Address and binary explorer",
    "lead": "Real calculation • enter an address and prefix, classify it, then toggle octet bits."
  },
  "application": {
    "title": "Read a classroom configuration",
    "lead": "A PC uses 192.168.10.25/24, gateway 192.168.10.1, and DNS 192.168.10.1.",
    "items": [
      "The host and gateway share a local subnet; the router may forward DNS requests.",
      "The DNS address does not have to equal the gateway; it must be an appropriate reachable resolver.",
      "A valid address alone does not prove that a cable, route, or service works."
    ]
  },
  "installation": {
    "equipment": "Windows PC, worksheet, calculator optional.",
    "mistakes": "Treating DNS as a mask or assuming all 172.x addresses are private.",
    "safety": "Avoid posting real network details publicly."
  }
});
