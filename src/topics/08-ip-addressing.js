import { topic } from './createTopic.js';
export default topic({
  "id": "08-ip-addressing",
  "title": "Internet Protocol (IP) Addressing and Static Configuration",
  "icon": "Binary",
  "description": "Read IPv4 addresses, separate network from host bits, understand subnet roles, and configure static host settings.",
  "objectives": [
    "Validate an IPv4 address and convert an octet to binary.",
    "Explain what a subnet is, why networks are segmented, and the role of the subnet mask.",
    "Identify the Network ID, Broadcast IP, and usable host range.",
    "Identify private, loopback, and public address ranges.",
    "Configure unique static IP settings and test local versus routed reachability."
  ],
  "concepts": [
    {
      "title": "An address for a network interface",
      "lead": "An Internet Protocol (IP) address is a unique logical Layer 3 numerical identifier assigned to every device on a network. While a physical MAC address identifies hardware on a single local cable, an IP address is hierarchical and location-based, enabling routers to direct data packets across interconnected local, enterprise, and global networks.",
      "items": [
        "192.168.1.10 is four octets. Each octet has eight bits weighted 128, 64, 32, 16, 8, 4, 2, 1.",
        "192 is 11000000 because 128 + 64 = 192. An octet cannot hold 300.",
        "IPv6 example: 2001:db8::10 (documentation). IPv6 has different neighbor discovery and no IPv4-style broadcast address."
      ]
    },
    {
      "title": "Address and binary explorer",
      "kind": "demo",
      "lead": "Enter an IPv4 address to inspect its four octets in binary and toggle individual bit weights.",
      "type": "ipv4"
    },
    {
      "title": "Two parts of an IP address",
      "lead": "Every IP address is divided into a network portion and a host portion.",
      "items": [
        "Network portion: identifies which network or subnet the device belongs to.",
        "Host portion: identifies the specific device interface on that network."
      ],
      "expectedCount": 2
    },
    {
      "title": "What is a subnet and why do we subnet?",
      "lead": "A subnet is a smaller, organized group of computers within a network, such as separating Students, Staff, and Guest Wi-Fi.",
      "items": [
        "Why We Subnet: Splitting a flat network into smaller subnets stops broadcast traffic (ARP, DHCP) from congesting all computers.",
        "Security Boundaries: Subnets create natural borders where routers and firewalls can enforce access policies between departments.",
        "Organized Management: Managing smaller subnets allows administrators to allocate dedicated IP address pools and isolate network faults.",
        "Logical Division: Subnets are logical divisions defined by the Subnet Mask; they do not require changing physical switches or cables."
      ],
      "footnote": "In modern networking, every local area network (LAN) is configured as one or more subnets."
    },
    {
      "title": "The subnet mask separates network and host",
      "lead": "The subnet mask is a 32-bit filter that marks the boundary between network bits and host bits.",
      "items": [
        "Consecutive ones: mask bits set to 1 indicate the network portion (for example, 255.255.255.0).",
        "Consecutive zeros: mask bits set to 0 indicate the host portion available for endpoints.",
        "Bitwise AND: a host performs an AND operation between its IP address and mask to find its network ID."
      ]
    },
    {
      "title": "Inside every subnet: network, hosts, and broadcast",
      "lead": "Every subnet is simply an IP address group with a starting address, an ending address, and usable host addresses in between.",
      "items": [
        "Network ID (The First Address): The very first IP in the group (e.g., 192.168.1.0). It acts like a street name that identifies the entire subnet in routing tables; it cannot be assigned to a computer.",
        "Broadcast IP (The Last Address): The very last IP in the group (e.g., 192.168.1.255). It acts like an office loudspeaker: sending data here delivers it to every device in this subnet at once (for ARP and DHCP).",
        "Usable Host IPs (The Middle Numbers): All addresses strictly between the first and last (192.168.1.1 through 192.168.1.254). These are the real addresses configured on laptops, phones, printers, and routers.",
        "Why We Subtract Two (Total − 2): Because the Network ID (first) and Broadcast IP (last) are reserved for network roles, usable host capacity is always Total IPs minus 2."
      ],
      "footnote": "In a standard /24 subnet with 256 addresses: .0 is the Network ID, .255 is the Broadcast IP, and .1 through .254 provide 254 usable host addresses."
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
      "title": "Give a device a stable address",
      "lead": "Static addressing is manually configured and remains until changed. It is useful for infrastructure and predictable service endpoints.",
      "items": [
        "Record address, mask, gateway, and DNS before changing anything. A DHCP reservation is a different way to provide a stable address.",
        "Choose a unique usable address in the intended subnet and coordinate it with the administrator’s addressing plan.",
        "Avoid unmanaged overlap with DHCP pools. Duplicate addresses cause conflicts even when each individual address is syntactically valid."
      ]
    },
    {
      "title": "Four IPv4 configuration fields",
      "items": [
        "IP address: a unique usable address assigned to the interface.",
        "Subnet mask: identifies which address bits describe the local network.",
        "Default gateway: a local router for destinations needing a remote route.",
        "DNS server: a resolver for names; not needed for numeric-IP local tests."
      ],
      "expectedCount": 4
    },
    {
      "title": "Same subnet is a two-sided decision",
      "lead": "With /24 masks, 192.168.1.10 and 192.168.1.20 are local to each other.",
      "items": [
        "They can communicate by IP on a correctly connected LAN without a default gateway.",
        "192.168.1.10/24 and 192.168.2.20/24 need appropriate routing between the two subnets.",
        "Mismatched masks can make one host consider a destination local while the other sends through a gateway. Test both directions."
      ]
    },
    {
      "title": "Why two hosts can disagree about the same subnet",
      "kind": "demo",
      "lead": "Calculate each host’s local/remote decision independently using its own mask.",
      "type": "asymmetricDemo"
    },
    {
      "title": "Windows configuration and verification",
      "lead": "Interface labels vary by Windows version; the classic adapter IPv4 properties remain useful for a supervised lab.",
      "items": [
        "Open Settings → Network & Internet → Advanced network settings → More network adapter options (or run ncpa.cpl).",
        "Open the intended adapter’s Properties → Internet Protocol Version 4 (TCP/IPv4) → Properties. Enter the approved values, then confirm.",
        "Use ipconfig /all and ping the peer’s numeric address. Record results; restore “Obtain an IP address automatically” and automatic DNS if that was the original setup."
      ]
    },
    {
      "title": "Windows static-IP configuration",
      "lead": "Manual address configuration requires the intended adapter and a coordinated set of valid settings. Recording the original configuration supports verification and restoration after the change.",
      "items": [
        "Record the original configuration and select the intended adapter. Open ncpa.cpl, adapter Properties, then Internet Protocol Version 4 (TCP/IPv4) Properties.",
        "On an approved isolated LAN, 192.168.1.10/24 and 192.168.1.20/24 are compatible local hosts. A gateway is unnecessary for a numeric local test.",
        "Use ipconfig /all to inspect settings, then test the peer in both directions. If ICMP is filtered, examine approved policy rather than disabling the firewall.",
        "Changing the second host to 192.168.2.20/24 requires appropriate gateways and bidirectional routing for cross-subnet communication.",
        "Restore the original approved IP/DNS method after a physical demonstration; browser settings do not change the real Windows adapter."
      ]
    },
    {
      "title": "Two-PC configuration demonstration",
      "kind": "demo",
      "lead": "Modeled network • validate fields, disconnect the link, or enable a router with interfaces in both subnets.",
      "type": "static"
    }
  ],
  "application": {
    "title": "Read a classroom configuration and configure a static printer",
    "lead": "Inspect host settings and assign a stable address to a shared network printer.",
    "items": [
      "The host and gateway share a local subnet; the router may forward DNS requests.",
      "The printer benefits from an address excluded from the DHCP dynamic pool to prevent conflicts.",
      "Verify numeric connectivity and service ports separately; a successful ping does not prove application reachability."
    ]
  },
  "installation": {
    "equipment": "Two Windows PCs, switch, cables, approved administrative access.",
    "mistakes": "Duplicate addresses, wrong adapter, mismatched masks, assuming DNS repairs IP routing.",
    "safety": "Use only approved isolated equipment; preserve firewall protections."
  }
});
