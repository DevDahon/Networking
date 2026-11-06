import {topic} from './createTopic.js';
export default topic({
  "id": "08-ip-addressing",
  "title": "Internet Protocol (IP) Addressing and Static Configuration",
  "icon": "Binary",
  "description": "Read IPv4 addresses, separate network from host bits, and configure static host settings.",
  "objectives": [
    "Validate an IPv4 address and convert an octet to binary.",
    "Identify private and common special-purpose address ranges.",
    "Explain the roles of subnet prefix, default gateway, and DNS.",
    "Configure unique static IP settings and predict local versus routed reachability.",
    "Verify a Windows static configuration and restore original settings."
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
    },
    {
      "title": "Address and binary explorer",
      "kind": "demo",
      "lead": "Real calculation • enter an address and prefix, classify it, then toggle octet bits.",
      "type": "ipv4"
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
