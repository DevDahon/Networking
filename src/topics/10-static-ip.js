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
