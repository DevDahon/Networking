import {topic} from './createTopic.js';
export default topic({
  "id": "08-ip-addressing",
  "title": "Internet Protocol (IP) Addressing and Subnet Basics",
  "icon": "Binary",
  "description": "Understand IPv4 address structure, decimal octets, classes, private ranges, subnet boundaries, and IPv6 fundamentals.",
  "objectives": [
    "Explain IPv4 structure, 8-bit binary-to-decimal conversion, and network vs. host portions.",
    "Identify the five IPv4 address classes (A–E), priority bits, default masks, and RFC 1918 private ranges.",
    "Apply CIDR notation and a five-step manual process to calculate subnet masks, block sizes, and host ranges.",
    "Describe why IPv6 is needed and recognize its 128-bit hexadecimal addressing format."
  ],
  "concepts": [
    {
      "title": "An address for a network interface",
      "lead": "An IP address identifies a device’s connection to a network, letting routers forward packets to the correct destination.",
      "paragraphs": [
        "Unlike a permanent physical MAC address burned into hardware, an IPv4 address is a logical Layer 3 identity assigned by network configuration so traffic can be routed across networks.",
        "Each IPv4 address has 32 binary bits split into four 8-bit octets separated by dots (0–255 in decimal). Within each octet, bits carry binary place values of 128, 64, 32, 16, 8, 4, 2, and 1 (from 2⁷ down to 2⁰)—so 11000000 equals 128 + 64 = 192."
      ]
    },
    {
      "title": "Two parts of an IP address",
      "items": [
        "Network portion: Works like a street or barangay name, telling routers which local subnet or campus network this device belongs to.",
        "Host portion: Works like an individual house number, uniquely identifying one specific PC, phone, or printer on that street."
      ],
      "expectedCount": 2,
      "lead": "Every IP address is divided into two parts: network and host."
    },
    {
      "title": "Five IPv4 Address Classes (A–E) and Priority Bits",
      "items": [
        "Class A (priority bit 0 · 0–127): Format N.H.H.H with default mask 255.0.0.0 (/8); supports 126 usable networks and 16,777,214 hosts each for huge networks.",
        "Class B (priority bits 10 · 128–191): Format N.N.H.H with default mask 255.255.0.0 (/16); supports 16,384 networks and 65,534 hosts each for medium-to-large organizations.",
        "Class C (priority bits 110 · 192–223): Format N.N.N.H with default mask 255.255.255.0 (/24); supports 2,097,152 networks and 254 hosts each for small LANs.",
        "Class D (priority bits 1110 · 224–239): Reserved for multicast group traffic where one packet is delivered simultaneously to subscribed receivers.",
        "Class E (priority bits 1111 · 240–255): Reserved for experimental testing, future standards research, and development rather than public host assignment."
      ],
      "expectedCount": 5,
      "lead": "Leading priority bits in the first octet determine which of the five historical IPv4 classes an address belongs to.",
      "visualKey": "ipClassesVisual",
      "visualLayout": "split"
    },
    {
      "title": "What is a subnet and why do we subnet?",
      "lead": "A subnet is a smaller, organized group of computers within a network, such as separating Students, Staff, and Guest Wi-Fi.",
      "paragraphs": [
        "Subnetting divides a larger IP address space into structured rooms, departments, or VLANs so right-sized address blocks are allocated without waste.",
        "Keeping broadcast traffic contained within each subnet preserves local speed and forces traffic between subnets through a router where firewall policies apply."
      ],
      "visualKey": "subnetComparisonVisual",
      "visualLayout": "split"
    },
    {
      "title": "The subnet mask separates network and host",
      "lead": "A subnet mask is a 32-bit filter that marks the boundary between network bits and host bits using consecutive ones and zeros.",
      "paragraphs": [
        "Binary 1s lock in the network portion while binary 0s mark the host portion. In CIDR slash notation, /24 marks 24 network bits (255.255.255.0), /16 marks 16 (255.255.0.0), and /8 marks 8 (255.0.0.0).",
        "Subtracting the prefix length from 32 gives the remaining host bits—so a /24 subnet leaves 8 host bits (254 usable device addresses)."
      ]
    },
    {
      "title": "Inside every subnet: network, hosts, and broadcast",
      "lead": "Every subnet is simply an IP address group with a starting address, an ending address, and usable host addresses in between.",
      "paragraphs": [
        "The very first IP in a subnet is the Network ID (such as 192.168.1.0), which identifies the subnet itself, and the last IP is the Broadcast IP (such as 192.168.1.255), which delivers traffic to every host on that subnet. Neither may be assigned to a computer.",
        "All middle addresses (.1 through .254 in a /24 block) are usable host IPs assigned to routers, servers, printers, and student workstations—giving the classic total-minus-two rule for usable host counts."
      ]
    },
    {
      "title": "Subnet Calculator and Boundaries",
      "kind": "demo",
      "lead": "Real calculation • any valid IPv4 address and prefix, binary boundary, guided steps, and explained calculations.",
      "type": "subnet"
    },
    {
      "title": "Classful history versus modern CIDR",
      "lead": "Modern CIDR allows any IP address block to use any prefix length, replacing rigid historical classes.",
      "paragraphs": [
        "Early classful addressing restricted networks to fixed Class A (/8), Class B (/16), or Class C (/24) sizes, wasting millions of addresses inside oversized allocations.",
        "Modern Classless Inter-Domain Routing (CIDR) lets network administrators pair any prefix length with any address block—for example, carving 10.0.0.0/8 into neat /24 classroom subnets."
      ],
      "visualKey": "cidrCheatsheetVisual",
      "visualLayout": "split"
    },
    {
      "title": "Five Steps to Subnet a Network (With Example)",
      "items": [
        "Step 1 — Count borrowed bits (2ⁿ ≥ subnets): Dividing 192.168.10.0/24 into 4 subnets needs n = 2 borrowed bits because 2² = 4.",
        "Step 2 — Find the new mask (/26): Adding 2 borrowed bits to /24 gives /26 (11111111.11111111.11111111.11000000 = 255.255.255.192).",
        "Step 3 — Compute block size (256 − mask octet): 256 − 192 = 64 addresses per subnet, with 2⁶ − 2 = 62 usable hosts each.",
        "Step 4 — List all subnet Network IDs: Increment the fourth octet by 64 → 192.168.10.0, .64, .128, and .192.",
        "Step 5 — Identify usable host & broadcast ranges: Subnet 1 spans .0–.63 (hosts .1–.62, broadcast .63); Subnet 2 spans .64–.127 (hosts .65–.126, broadcast .127), continuing through .255."
      ],
      "expectedCount": 5,
      "lead": "Divide 192.168.10.0/24 into 4 equal subnets step by step using binary bit borrowing."
    },
    {
      "title": "Three private IPv4 ranges",
      "items": [
        "10.0.0.0/8: Spans 10.0.0.0–10.255.255.255 (over 16 million addresses)—commonly used inside large campuses and enterprises.",
        "172.16.0.0/12: Spans 172.16.0.0–172.31.255.255 (about 1 million addresses)—frequently used in medium networks and virtual containers.",
        "192.168.0.0/16: Spans 192.168.0.0–192.168.255.255 (256 Class C subnets)—familiar default inside home, school, and office routers."
      ],
      "expectedCount": 3,
      "lead": "RFC 1918 private addresses are not globally routed."
    },
    {
      "title": "Special-Purpose IPv4 Ranges",
      "paragraphs": [
        "Certain IPv4 blocks are reserved for special system functions rather than public host assignment: 127.0.0.0/8 tests the local device stack (loopback, typically 127.0.0.1), and 169.254.0.0/16 provides automatic link-local fallback when no DHCP server responds.",
        "Other reserved blocks handle ISP carrier-grade NAT (100.64.0.0/10), textbook examples and documentation (192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24), multicast groups (224.0.0.0/4), and future or limited broadcast space (240.0.0.0/4, including 255.255.255.255)."
      ]
    },
    {
      "title": "Introduction to IPv6 Basics",
      "lead": "IPv6 solves IPv4 address exhaustion by providing 128-bit addresses, offering practically unlimited addresses for modern global devices.",
      "paragraphs": [
        "With IPv4’s 4.3 billion addresses exhausted worldwide, IPv6 uses 128-bit hexadecimal addresses written as eight colon-separated groups of four hex digits (such as 2001:db8::1), using a single double colon (::) to compress consecutive all-zero groups.",
        "IPv6 also simplifies local network communication by eliminating noisy IPv4 broadcasts and relying on Unicast, Multicast, and Anycast delivery instead."
      ]
    }
  ],
  "installation": {
    "equipment": "Worksheet, pen, browser calculator for verification.",
    "mistakes": "Confusing the network ID with a usable host; forgetting to set the default gateway.",
    "safety": "These are planning calculations; do not apply unapproved subnet changes to a live LAN."
  }
});
