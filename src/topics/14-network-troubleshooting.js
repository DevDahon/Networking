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
      "paragraphs": [
        "Start troubleshooting at Layer 1 by checking power cables, Ethernet plugs, switch link lights, and Wi-Fi association before changing any software settings.",
        "Next, verify IPv4 address, subnet mask, default gateway, and DHCP status, isolating each layer one step at a time—for instance, if pinging an IP works while opening a domain name fails, focus on DNS."
      ]
    },
    {
      "title": "Six Windows diagnostic commands",
      "lead": "Run these on your own authorized Windows lab PC; browser output in the simulation is a model.",
      "items": [
        "ipconfig: Quick check showing your PC’s active IPv4 address, subnet mask, and default gateway—great for spotting missing or APIPA settings.",
        "ipconfig /all: Full network report adding your physical MAC address, which DHCP server gave your lease, when it expires, and DNS servers.",
        "ping: Sends test Echo messages to an IP or name to verify basic reachability, packet loss, and round-trip speed in milliseconds.",
        "tracert: Traces each router hop along the path so you can see exactly where distant packets slow down or stop.",
        "nslookup: Asks your DNS server to look up a website name, separating naming failures from broken network cables or routing.",
        "arp -a: Lists the local memory table pairing nearby LAN IP addresses with hardware MAC addresses found on your switch."
      ],
      "expectedCount": 6
    },
    {
      "title": "Test the theory and verify the repair",
      "lead": "Different problems can produce similar symptoms, so compare independent evidence.",
      "paragraphs": [
        "Interpret clues carefully: a 169.254.x.x APIPA address shows DHCP failed, whereas working local LAN pings paired with unreachable websites point to a missing gateway or DNS fault.",
        "After applying a targeted fix, repeat the exact test that previously failed to verify recovery, then record updated IP tables and change notes."
      ]
    },
    {
      "title": "Common Network Fault Symptoms",
      "paragraphs": [
        "In practice, connectivity failures usually fall into physical link issues (an unplugged Ethernet cable or disconnected Wi-Fi client) or addressing errors (wrong static IP, mismatched subnet mask, duplicate IP conflict, or unavailable DHCP server resulting in APIPA).",
        "Higher-layer symptoms include a wrong default gateway blocking outside traffic, a failing DNS server blocking domain names while numeric pings still work, or denied share/NTFS permissions blocking shared folders."
      ],
      "lead": "The diagnostic demonstration shows each fault separately and the effect of its targeted repair."
    }
  ],
  "demo": {
    "type": "troubleshoot",
    "title": "Diagnostic command bench",
    "lead": "Modeled network • nine deterministic fault states. Inspect commands, select a cause, apply a targeted repair, and retest."
  },
  "installation": {
    "equipment": "Two lab PCs, switch/router, test cable, approved diagnostic access.",
    "mistakes": "Changing several settings at once, interpreting timeout as proof of cable failure, ignoring permissions.",
    "safety": "No scanning other networks, firewall disabling, or unapproved router resets."
  }
});
