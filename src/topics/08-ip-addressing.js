import {topic} from './createTopic.js';
export default topic({
  "id": "08-ip-addressing",
  "title": "Internet Protocol (IP) Addressing and Subnet Basics",
  "icon": "Binary",
  "description": "Understand IPv4 address structure, decimal octets, classes, private ranges, subnet boundaries, and IPv6 fundamentals.",
  "objectives": [
    "Explain the structure of an IPv4 address, binary octets, and network vs. host portions.",
    "Differentiate Class A, B, and C address spaces and identify RFC 1918 private IP ranges.",
    "Calculate subnet boundaries, Network IDs, and Broadcast IPs using the /24 prefix.",
    "Describe the need for IPv6 and its 128-bit hexadecimal addressing format."
  ],
  "concepts": [
    {
      "title": "An address for a network interface",
      "lead": "An IP address identifies a device’s connection to a network, letting routers forward packets to the correct destination.",
      "paragraphs": [
        "Unlike a permanent physical MAC address burned into hardware, an IPv4 address is a logical Layer 3 identity assigned by network configuration so traffic can be routed hierarchically.",
        "Each IPv4 address consists of four decimal octets ranging from 0 to 255 (representing 8 binary bits per octet, or 32 bits in total)."
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
      "title": "What is a subnet and why do we subnet?",
      "lead": "A subnet is a smaller, organized group of computers within a network, such as separating Students, Staff, and Guest Wi-Fi.",
      "paragraphs": [
        "Subnetting divides a larger IP address space into structured rooms, departments, or VLANs so right-sized address blocks are allocated without waste.",
        "Keeping broadcast traffic contained within each subnet preserves local speed and forces traffic between subnets through a router where firewall policies apply."
      ]
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
      ]
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
