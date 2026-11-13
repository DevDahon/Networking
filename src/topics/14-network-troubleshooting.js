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
        "Check Layer 1 first: Inspect power, cables, switch link lights, and Wi-Fi connection.",
        "Check IP settings: Verify the IP address, subnet mask, gateway, and DHCP status.",
        "Isolate the layer: If ping works by IP but websites fail by name, check DNS."
      ]
    },
    {
      "title": "Six Windows diagnostic commands",
      "lead": "Run these on your own authorized Windows lab PC; browser output in the simulation is a model.",
      "items": [
        "ipconfig: Displays current IPv4 address, subnet mask, and default gateway.",
        "ipconfig /all: Shows MAC address, DHCP server, lease times, and DNS servers.",
        "ping: Sends ICMP Echo messages to test reachability and round-trip time.",
        "tracert: Maps each router hop along the path to a remote destination.",
        "nslookup: Queries a DNS server to check if domain names resolve to IPs.",
        "arp -a: Lists the local table of IPv4 addresses matched to MAC addresses."
      ],
      "expectedCount": 6
    },
    {
      "title": "Test the theory and verify the repair",
      "lead": "Different problems can produce similar symptoms, so compare independent evidence.",
      "items": [
        "169.254.x.x (APIPA): Means the PC could not reach a DHCP server.",
        "Local vs. remote: A bad gateway breaks Internet access while local LAN pings still work.",
        "Document the fix: Record network diagrams, IP tables, and change logs after verifying repairs."
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
