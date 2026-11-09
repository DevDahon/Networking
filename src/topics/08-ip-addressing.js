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
        "Organization: Divides a large network into manageable, logical departments.",
        "Traffic control: Keeps broadcast messages inside one group so they do not slow down other computers.",
        "Security boundaries: Devices in different subnets cannot talk directly; they must pass through a router or firewall where security rules apply.",
        "Address efficiency: Allows network administrators to assign addresses without wasting large blocks."
      ],
      "footnote": "Subnetting is a logical division created by the Subnet Mask; it does not require buying new physical switches."
    },
    {
      "title": "The subnet mask separates network and host",
      "lead": "A subnet mask is a 32-bit filter that marks the boundary between network bits and host bits using consecutive ones and zeros.",
      "items": [
        "Network boundary: Consecutive binary 1s identify the network portion; consecutive binary 0s identify the host portion.",
        "Dotted-decimal format: A mask with 24 ones is written as 255.255.255.0.",
        "CIDR prefix notation: Counting the 24 network ones is written shorthand as /24 (pronounced 'slash twenty-four').",
        "Universal /24 standard: The most common mask in small offices, schools, and homes, providing up to 254 usable computers."
      ],
      "footnote": "A subnet mask must always have contiguous 1s followed by contiguous 0s. A mask like 255.255.0.255 is invalid."
    },
    {
      "title": "Inside every subnet: network, hosts, and broadcast",
      "lead": "Every subnet is simply an IP address group with a starting address, an ending address, and usable host addresses in between.",
      "items": [
        "Network ID (The First IP): The very first address (e.g., 192.168.1.0). It names the entire subnet and cannot be assigned to a computer.",
        "Broadcast IP (The Last IP): The very last address (e.g., 192.168.1.255). It sends messages to every device in the subnet at once.",
        "Usable Host IPs (The Middle Numbers): All addresses between the first and last (e.g., 192.168.1.1 through 192.168.1.254). Assigned to PCs, phones, and printers.",
        "Total Minus 2 Rule: Because the first (Network ID) and last (Broadcast IP) are reserved, usable host count is always Total IPs − 2."
      ],
      "footnote": "In a /24 subnet with 256 total addresses, subtracting 2 gives exactly 254 usable host addresses."
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
        "Classful legacy (1981): 10.0.0.0 was locked into Class A (/8), allocating 16 million hosts to one network with severe waste.",
        "Modern CIDR (1993): Classless Inter-Domain Routing allows any prefix to be used with any IP address.",
        "10.0.0.0/24 is normal: an administrator can carve 10.0.0.0 into small /24 subnets (254 hosts per classroom) with a 255.255.255.0 mask."
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
      "expectedCount": 8,
      "footnote": "This is not an exhaustive registry. A non-private address is not automatically ordinary globally routable unicast."
    },
    {
      "title": "Introduction to IPv6 Basics",
      "lead": "IPv6 solves IPv4 address exhaustion by providing 128-bit addresses, offering practically unlimited addresses for modern global devices.",
      "items": [
        "Why IPv6 is needed: IPv4 provides only 4.3 billion addresses, which are now completely exhausted by billions of smartphones, computers, and cloud servers.",
        "128-Bit Structure: IPv6 uses 128 binary bits written as eight groups of four hexadecimal digits separated by colons (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334).",
        "Zero Compression Rule (::): Consecutive groups of zeros can be abbreviated with a double colon (::) once in an address (e.g., 2001:db8::1).",
        "Address Types Without Broadcast: IPv6 uses Unicast (one-to-one), Multicast (one-to-many), and Anycast (one-to-nearest). IPv6 eliminates noisy broadcast messages entirely."
      ],
      "footnote": "IPv6 provides 340 undecillion addresses (3.4 × 10^38), ensuring every device on Earth can have its own permanent, globally unique IP address without needing NAT."
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
