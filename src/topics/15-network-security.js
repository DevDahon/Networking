import {topic} from './createTopic.js';

export default topic({
  "id": "15-network-security",
  "title": "Introduction to Network Security",
  "icon": "Shield",
  "description": "Understand security principles, defend against malware and phishing, configure firewalls, and apply secure network practices.",
  "objectives": [
    "Identify common network security threats including malware, phishing, unauthorized access, and DoS attacks.",
    "Explain layered defense mechanisms: firewalls, endpoint protection, and secure data in transit using HTTPS and TLS.",
    "Apply proactive security practices: software updates, strong passphrases, and responsible network use."
  ],
  "concepts": [
    {
      "title": "Network security and the CIA triad",
      "lead": "Network security protects interconnected systems, transmissions, and data from unauthorized access, modification, or disruption.",
      "paragraphs": [
        "Security rests on three pillars known as the CIA triad: Confidentiality ensures only authorized users can read sensitive data (using encryption and access control), while Integrity ensures data arrives accurately without tampering (verified through cryptographic hashes).",
        "Availability ensures that network links, servers, and applications remain online and responsive whenever legitimate users need them."
      ]
    },
    {
      "title": "Four common network security threats",
      "lead": "Modern networks face diverse automated and human threats targeting devices, users, and service capacity.",
      "items": [
        "Malware: Harmful programs like viruses, worms, trojans, and ransomware that steal data, lock files for money, or damage systems.",
        "Phishing: Tricky look-alike emails or chat messages that fool users into typing passwords or opening dangerous downloads.",
        "Unauthorized access: Attackers sneaking into folders, routers, or accounts by guessing weak passwords or exploiting unpatched software.",
        "Denial-of-Service (DoS): Overwhelming a website, router, or server with huge floods of fake traffic so normal users cannot connect."
      ],
      "expectedCount": 4
    },
    {
      "title": "Network Firewalls and Boundary Defense",
      "lead": "A firewall acts as a security barrier between trusted internal networks and untrusted external networks.",
      "paragraphs": [
        "Firewalls evaluate source and destination IPs, protocols, and ports against allow or block rules. Modern stateful firewalls track active outgoing requests so legitimate return replies pass through while unsolicited external probes are dropped.",
        "Together, a router firewall guards the network perimeter while each computer’s operating system firewall defends the local host."
      ]
    },
    {
      "title": "Stateful firewall packet inspection",
      "lead": "Rule evaluation • test packet attributes against boundary firewall rules and observe allow versus drop decisions.",
      "type": "securityFirewall"
    },
    {
      "title": "Endpoint Protection and Security Updates",
      "lead": "Securing the individual devices connected to the network is just as vital as protecting the perimeter.",
      "paragraphs": [
        "Antivirus and Endpoint Detection and Response (EDR) tools continuously scan files, memory, and active processes to stop malware directly on user workstations.",
        "Enabling automatic security updates for operating systems, web browsers, and router firmware closes known vulnerabilities quickly before attackers can exploit them."
      ]
    },
    {
      "title": "HTTPS, TLS, and Secure Data in Transit",
      "lead": "Unencrypted transmissions over cables or Wi-Fi can be intercepted and read by anyone along the communication path.",
      "paragraphs": [
        "Plain HTTP and Telnet transmit usernames, passwords, and messages as readable cleartext that anyone monitoring the wire or airwaves can capture.",
        "HTTPS protects web sessions with TLS encryption—scrambling traffic into unreadable ciphertext—and uses digital certificates so browsers can verify the server is genuine."
      ]
    },
    {
      "title": "Three habits for responsible network use",
      "lead": "User awareness and disciplined operational habits form the first and most effective line of defense.",
      "items": [
        "Strong credentials & MFA: Use unique, long passphrases for every account and turn on a second login check like Multi-Factor Authentication (MFA).",
        "Verify links & senders: Pause to inspect sender addresses and website links before clicking or signing in so phishing traps fail.",
        "Least privilege: Use a regular standard account for everyday browsing and switch to administrator access only when installing trusted changes."
      ],
      "expectedCount": 3
    }
  ],
  "demo": {
    "type": "security",
    "title": "Network security defense workbench",
    "lead": "Modeled defense • simulate inbound scans, phishing intercepts, TLS encryption, DoS mitigation, and MFA authentication."
  },
  "installation": {
    "equipment": "Target workstation, network firewall, endpoint security software, test credentials.",
    "mistakes": "Disabling firewalls to bypass errors; reusing passwords across administrative and personal accounts.",
    "safety": "Never run live unauthorized scanning or malware execution on production or campus networks."
  }
});
