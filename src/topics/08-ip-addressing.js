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
      "items": [
        "Logical identity: Assigned by network configuration, unlike a permanent physical MAC address.",
        "Hierarchical routing: Routers use the network portion to direct traffic across interconnected networks.",
        "Octet ranges: Each of the four decimal octets ranges from 0 to 255 (representing 8 binary bits each)."
      ]
    },
    {
      "title": "Two parts of an IP address",
      "items": [
        "Network portion: Identifies the specific network or subnet.",
        "Host portion: Identifies the individual device on that network."
      ],
      "expectedCount": 2,
      "lead": "Every IP address is divided into two parts: network and host."
    },
    {
      "title": "What is a subnet and why do we subnet?",
      "lead": "A subnet is a smaller, organized group of computers within a network, such as separating Students, Staff, and Guest Wi-Fi.",
      "items": [
        "Organization: Splits a large network into smaller groups by room or department.",
        "Traffic control: Keeps broadcast traffic inside one group so other rooms stay fast.",
        "Security: Traffic between subnets must pass through a router where firewall rules apply.",
        "Efficiency: Assigns right-sized address blocks without wasting IPs."
      ]
    },
    {
      "title": "The subnet mask separates network and host",
      "lead": "A subnet mask is a 32-bit filter that marks the boundary between network bits and host bits using consecutive ones and zeros.",
      "items": [
        "Binary boundary: Consecutive 1s mark the network part; consecutive 0s mark the host part.",
        "Dotted decimal: 24 ones is written as 255.255.255.0.",
        "CIDR shorthand: Counting 24 network ones is written as /24.",
        "Common LAN size: A /24 subnet provides 254 usable host addresses."
      ]
    },
    {
      "title": "Inside every subnet: network, hosts, and broadcast",
      "lead": "Every subnet is simply an IP address group with a starting address, an ending address, and usable host addresses in between.",
      "items": [
        "Network ID (First IP): Identifies the subnet itself (e.g., 192.168.1.0); never assign to a device.",
        "Broadcast IP (Last IP): Sends traffic to every device in the subnet (e.g., 192.168.1.255).",
        "Usable Host IPs (Middle): Assigned to computers, phones, and routers (e.g., .1 to .254).",
        "Total Minus 2 Rule: Subtract 2 reserved addresses (Network and Broadcast) to find usable hosts."
      ]
    },
    {
      "title": "Subnet Calculator and Boundaries",
      "kind": "demo",
      "lead": "Real calculation • any valid IPv4 address and prefix, binary boundary, guided steps, and explained calculations.",
      "type": "subnet"
    },
    {
      "title": "Understanding CIDR prefix notation",
      "lead": "Prefix notation uses a slash to count the consecutive network ones in the subnet mask.",
      "items": [
        "/24 means 24 ones in the mask: 11111111.11111111.11111111.00000000, which is 255.255.255.0.",
        "/16 means 16 ones (255.255.0.0), while /8 means 8 ones (255.0.0.0).",
        "Remaining host bits: subtracting the prefix from 32 gives the host bits (for /24, 32 − 24 = 8 bits, or 254 usable hosts)."
      ]
    },
    {
      "title": "Classful history versus modern CIDR",
      "lead": "Modern CIDR allows any IP address block to use any prefix length, replacing rigid historical classes.",
      "items": [
        "Classful legacy: Fixed sizes (/8, /16, /24) wasted millions of addresses in large blocks.",
        "Modern CIDR: Lets admins pair any prefix length with any IP block.",
        "Flexible sizing: A 10.0.0.0 block can easily be split into small /24 classroom subnets."
      ]
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
      "expectedCount": 8
    },
    {
      "title": "Introduction to IPv6 Basics",
      "lead": "IPv6 solves IPv4 address exhaustion by providing 128-bit addresses, offering practically unlimited addresses for modern global devices.",
      "items": [
        "Why IPv6: IPv4's 4.3 billion addresses are exhausted; IPv6 provides virtually unlimited space.",
        "128-Bit Hexadecimal: Written as 8 groups of 4 hex digits separated by colons (e.g., 2001:db8::1).",
        "Zero Compression (::): A double colon replaces one contiguous block of all-zero groups.",
        "No Broadcasts: Uses Unicast, Multicast, and Anycast instead of noisy broadcast traffic."
      ]
    }
  ],
  "application": {
    "title": "Plan a 28-host classroom subnet",
    "lead": "A classroom needs addresses for 28 PCs plus a router interface.",
    "items": [
      "/28 offers only 14 ordinary usable addresses, which is insufficient.",
      "/27 gives 30 usable addresses: 28 PCs, 1 router, 1 spare.",
      "Allocate addresses sequentially and document the plan."
    ]
  },
  "installation": {
    "equipment": "Worksheet, pen, browser calculator for verification.",
    "mistakes": "Confusing the network ID with a usable host; forgetting to set the default gateway.",
    "safety": "These are planning calculations; do not apply unapproved subnet changes to a live LAN."
  }
});
