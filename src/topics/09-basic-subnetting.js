import {topic} from './createTopic.js';
export default topic({
  "id": "09-basic-subnetting",
  "title": "Basic Internet Protocol (IP) Subnetting",
  "icon": "Split",
  "description": "Calculate real IPv4 subnet boundaries and explain every result, including /31 and /32.",
  "objectives": [
    "Calculate mask, network, broadcast, and usable range.",
    "Choose a prefix for a small LAN host requirement.",
    "Explain the point-to-point /31 and single-address /32 conventions."
  ],
  "concepts": [
    {
      "title": "Split an address space into smaller networks",
      "lead": "Subnetting uses more prefix bits to create smaller IP networks, making addressing and routing easier to organize.",
      "items": [
        "For ordinary broadcast LAN subnets, reserve all-zero host bits for the network and all-one host bits for broadcast. Usable count is 2^(32 − prefix) − 2.",
        "Subdivision alone does not enforce security isolation. Routing and filtering policies determine which subnets may communicate."
      ]
    },
    {
      "title": "Six common subnet prefixes",
      "items": [
        "/24: 256 total addresses; 254 usable hosts under the ordinary broadcast-subnet convention.",
        "/25: 128 total addresses; 126 usable hosts under the ordinary broadcast-subnet convention.",
        "/26: 64 total addresses; 62 usable hosts under the ordinary broadcast-subnet convention.",
        "/27: 32 total addresses; 30 usable hosts under the ordinary broadcast-subnet convention.",
        "/28: 16 total addresses; 14 usable hosts under the ordinary broadcast-subnet convention.",
        "/30: 4 total addresses; 2 usable hosts under the ordinary broadcast-subnet convention."
      ],
      "expectedCount": 6,
      "itemLabels": [
        "/24",
        "/25",
        "/26",
        "/27",
        "/28",
        "/30"
      ]
    },
    {
      "title": "Calculate a /26 step by step",
      "lead": "For 192.168.10.70/26, six host bits give blocks of 64 addresses.",
      "items": [
        "Mask: 255.255.255.192. The final-octet block boundaries are 0, 64, 128, and 192.",
        "70 falls in the 64–127 block. Network is 192.168.10.64 and broadcast is 192.168.10.127.",
        "Usable range is .65–.126: 62 hosts. The network address is obtained by keeping network bits and clearing host bits."
      ]
    },
    {
      "title": "Prefixes at the edge",
      "lead": "Do not apply the ordinary “minus two” rule to every prefix.",
      "items": [
        "/31 can number both ends of a point-to-point link under RFC 3021: two addresses, no directed broadcast in that convention. It is not the usual classroom multi-access LAN choice.",
        "/32 describes one address, often used as a host route. This tool reports one address and no broadcast.",
        "A /0 contains all IPv4 addresses mathematically, but is commonly encountered as a default route rather than a giant physical LAN."
      ]
    }
  ],
  "demo": {
    "type": "subnet",
    "title": "Subnet calculator and boundaries",
    "lead": "Real calculation • any valid IPv4 address and prefix, binary boundary, guided steps, and explained calculations."
  },
  "application": {
    "title": "Plan a 28-host classroom subnet",
    "lead": "A classroom needs addresses for 28 PCs plus a router interface.",
    "items": [
      "/28 offers only 14 ordinary usable addresses, which is insufficient.",
      "/27 offers 30 usable addresses, enough for 29 interfaces with little growth room.",
      "/26 offers 62 usable addresses if expansion is likely; document the chosen tradeoff."
    ]
  },
  "installation": {
    "equipment": "Worksheet, pen, browser calculator for verification.",
    "mistakes": "Subtracting two from /31 or /32; rounding a network boundary upward.",
    "safety": "These are planning calculations; do not apply unapproved subnet changes to a live LAN."
  }
});
