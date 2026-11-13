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
      "items": [
        "Confidentiality: Only authorized users can read data, enforced by encryption and access controls.",
        "Integrity: Data stays accurate and unaltered, verified by cryptographic hashes.",
        "Availability: Network services and data remain online and ready for authorized users."
      ]
    },
    {
      "title": "Four common network security threats",
      "lead": "Modern networks face diverse automated and human threats targeting devices, users, and service capacity.",
      "items": [
        "Malware: Harmful software like viruses, worms, trojans, and ransomware.",
        "Phishing: Fake emails or messages that trick users into revealing passwords or clicking bad links.",
        "Unauthorized access: Attackers breaking in through weak passwords or unpatched flaws.",
        "Denial-of-Service (DoS): Flooding a server or network with traffic so real users cannot connect."
      ],
      "expectedCount": 4
    },
    {
      "title": "Network Firewalls and Boundary Defense",
      "lead": "A firewall acts as a security barrier between trusted internal networks and untrusted external networks.",
      "items": [
        "Packet filtering: Checks source/destination IPs, protocols, and ports against allow/block rules.",
        "Stateful inspection: Remembers active outgoing connections and allows their matching replies back in.",
        "Boundary & host defense: Router firewalls guard the network edge; OS firewalls guard each PC."
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
      "items": [
        "Antivirus and EDR: Scans files, memory, and processes to block malware on computers.",
        "Security patching: Installs vendor fixes to close newly discovered software bugs.",
        "Automatic updates: Keeps OS, browser, and router firmware patched against known attacks."
      ]
    },
    {
      "title": "HTTPS, TLS, and Secure Data in Transit",
      "lead": "Unencrypted transmissions over cables or Wi-Fi can be intercepted and read by anyone along the communication path.",
      "items": [
        "Cleartext risk: Plain HTTP and Telnet send passwords and data as readable text.",
        "TLS encryption: Scrambles traffic between client and server into unreadable ciphertext.",
        "Digital certificates: Verify that a website is genuine and not an impostor."
      ]
    },
    {
      "title": "Three habits for responsible network use",
      "lead": "User awareness and disciplined operational habits form the first and most effective line of defense.",
      "items": [
        "Strong credentials & MFA: Use long unique passphrases plus Multi-Factor Authentication.",
        "Verify links & senders: Check email addresses and URLs carefully before clicking or logging in.",
        "Least privilege: Use a standard user account for daily work instead of an admin account."
      ],
      "expectedCount": 3
    }
  ],
  "demo": {
    "type": "security",
    "title": "Network security defense workbench",
    "lead": "Modeled defense • simulate inbound scans, phishing intercepts, TLS encryption, DoS mitigation, and MFA authentication."
  },
  "application": {
    "title": "Secure a small office workstation and network",
    "lead": "A newly deployed office workstation connects to a shared local network and requires baseline security hardening.",
    "items": [
      "Enable host and boundary firewall rules to block unsolicited incoming connection probes.",
      "Install authorized endpoint protection and verify that automated security updates are scheduled.",
      "Require multi-factor authentication and unique passphrases rather than sharing administrator credentials."
    ]
  },
  "installation": {
    "equipment": "Target workstation, network firewall, endpoint security software, test credentials.",
    "mistakes": "Disabling firewalls to bypass errors; reusing passwords across administrative and personal accounts.",
    "safety": "Never run live unauthorized scanning or malware execution on production or campus networks."
  }
});
