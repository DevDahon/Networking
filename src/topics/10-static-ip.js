import {topic} from './createTopic.js';
export default topic({
  "id": "10-static-ip",
  "title": "Static Internet Protocol (IP) Configuration",
  "icon": "MonitorCog",
  "description": "Configure static IP addresses on Windows hosts, verify local vs. remote delivery, and test network reachability.",
  "objectives": [
    "Configure unique usable IP addresses, subnet masks, default gateways, and DNS resolvers.",
    "Predict whether communication stays local or requires routing through a gateway.",
    "Troubleshoot mismatched subnet masks and configure static IP addresses on Windows."
  ],
  "concepts": [
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
        "Document first: Record the current IP, mask, gateway, and DNS before making changes.",
        "Pick a unique IP: Choose an unused host address inside the correct subnet.",
        "Avoid DHCP pools: Never assign a static IP from the router's automatic DHCP range."
      ]
    },
    {
      "title": "Four IPv4 configuration fields",
      "items": [
        "IP address: Unique host address for this device on the subnet.",
        "Subnet mask: Defines which part of the IP is the local network.",
        "Default gateway: Local router IP used to reach outside networks.",
        "DNS server: Translates website names into IP addresses."
      ],
      "expectedCount": 4
    },
    {
      "title": "Same subnet is a two-sided decision",
      "lead": "With /24 masks, 192.168.1.10 and 192.168.1.20 are local to each other.",
      "items": [
        "Same subnet: Devices talk directly through the switch without a gateway.",
        "Different subnets: Devices must send traffic through a router.",
        "Mismatched masks: One PC may think a peer is local while the other thinks it is remote."
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
        "Open adapter settings: Run ncpa.cpl or open Network & Internet → Adapter options.",
        "Enter IPv4 settings: Open TCP/IPv4 Properties, enter the IP, mask, gateway, and DNS, then click OK.",
        "Verify with CLI: Run ipconfig /all and ping the peer IP to confirm connectivity."
      ]
    }
  ],
  "demo": {
    "type": "static",
    "title": "Two-PC configuration demonstration",
    "lead": "Modeled network • validate fields, disconnect the link, or enable a router with interfaces in both subnets."
  },
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
