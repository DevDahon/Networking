import {topic} from './createTopic.js';
export default topic({
  "id": "10-static-ip",
  "title": "Static Internet Protocol (IP) Configuration",
  "icon": "MonitorCog",
  "description": "Configure two modeled PCs and separate valid addressing from actual reachability.",
  "objectives": [
    "Configure unique usable IP addresses and contiguous masks.",
    "Predict local versus routed connectivity.",
    "Verify a Windows static configuration and restore the original settings."
  ],
  "concepts": [
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
    "title": "A printer needs a predictable address",
    "lead": "The office printer is configured manually while student laptops use DHCP.",
    "items": [
      "Choose an address excluded from the dynamic pool, or use a managed reservation instead.",
      "Document its subnet, gateway, and DNS requirements.",
      "Verify numeric connectivity and the print service separately; ping is not a complete service test."
    ]
  },
  "installation": {
    "equipment": "Two Windows PCs, switch, cables, approved administrative access.",
    "mistakes": "Duplicate addresses, wrong adapter, mismatched masks, assuming DNS repairs IP routing.",
    "safety": "Use only approved isolated equipment; preserve firewall protections."
  }
});
