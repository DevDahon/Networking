import {topic} from './createTopic.js';
export default topic({
  "id": "14-network-troubleshooting",
  "title": "Network Testing and Troubleshooting",
  "icon": "Stethoscope",
  "description": "Inspect evidence, run state-derived diagnostic commands, and repair nine common network faults.",
  "objectives": [
    "Use a repeatable physical-to-service troubleshooting method.",
    "Explain what six common diagnostic commands can and cannot prove.",
    "Identify and correct faults using evidence rather than random changes."
  ],
  "concepts": [
    {
      "title": "Observe before changing",
      "lead": "Define the symptom and scope, gather evidence, make one justified change, then retest and document.",
      "items": [
        "Start with power, cable, port, and wireless association. Compare with a known-good link when authorized.",
        "Check address, mask, duplicate conflicts, DHCP service, and gateway. Test local and remote reachability separately.",
        "If numeric connectivity works but names fail, investigate DNS. If the host is reachable but a share is denied, inspect identity and permissions."
      ]
    },
    {
      "title": "Six Windows diagnostic commands",
      "lead": "Run these on your own authorized Windows lab PC; browser output in the simulation is a model.",
      "items": [
        "ipconfig: shows basic interface configuration; it does not prove reachability.",
        "ipconfig /all: shows detail such as DNS, DHCP server, and leases; it does not prove reachability.",
        "ping: tests ICMP Echo behavior and round-trip time; a timeout can also mean filtering or packet loss.",
        "tracert: provides TTL-based hop evidence; filtered probes can produce gaps.",
        "nslookup: queries DNS; success does not prove the destination service works.",
        "arp -a: lists cached IPv4 neighbor mappings, not every device on the LAN."
      ],
      "expectedCount": 6
    },
    {
      "title": "Test the theory and verify the repair",
      "lead": "Different problems can produce similar symptoms, so compare independent evidence.",
      "items": [
        "169.254.x.x suggests link-local configuration; check DHCP reachability rather than guessing a public address.",
        "A wrong gateway can break remote access while local peers still work. A DNS fault can leave numeric connectivity intact.",
        "Network documentation and repair verification: record physical/logical topology diagrams, IP address allocation tables, device inventories, configuration backups, and change logs to systematically verify repairs."
      ]
    },
    {
      "title": "Nine modeled network faults",
      "items": [
        "Ethernet cable disconnected.",
        "Incorrect static IP address.",
        "Incorrect subnet mask.",
        "Duplicate IP address.",
        "DHCP server unavailable.",
        "Incorrect default gateway.",
        "DNS server problem.",
        "File-sharing permission denied.",
        "Wireless client disconnected."
      ],
      "expectedCount": 9,
      "lead": "The diagnostic demonstration shows each fault separately and the effect of its targeted repair."
    }
  ],
  "demo": {
    "type": "troubleshoot",
    "title": "Diagnostic command bench",
    "lead": "Modeled network • nine deterministic fault states. Inspect commands, select a cause, apply a targeted repair, and retest."
  },
  "application": {
    "title": "“The network is down”",
    "lead": "A student can reach the gateway by IP, but cannot open a website by its name.",
    "items": [
      "Check numeric external reachability and DNS responses to separate routing from name resolution.",
      "Do not assume the cable is faulty when the gateway is responding.",
      "Even working DNS and ping do not prove a web service or permission is functioning."
    ]
  },
  "installation": {
    "equipment": "Two lab PCs, switch/router, test cable, approved diagnostic access.",
    "mistakes": "Changing several settings at once, interpreting timeout as proof of cable failure, ignoring permissions.",
    "safety": "No scanning other networks, firewall disabling, or unapproved router resets."
  }
});
