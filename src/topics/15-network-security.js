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
        "Confidentiality: ensures only authorized users and systems can read sensitive data, primarily achieved through strong encryption and access controls.",
        "Integrity: guarantees that data has not been altered, corrupted, or tampered with in transit or storage, verified through cryptographic hashes and signatures.",
        "Availability: ensures network services, hardware resources, and data remain accessible to authorized users when needed, protected against outages and denial of service."
      ],
      "footnote": "Security is not a single product; it requires defense-in-depth where multiple layers of protective controls reinforce one another."
    },
    {
      "title": "Four common network security threats",
      "lead": "Modern networks face diverse automated and human threats targeting devices, users, and service capacity.",
      "items": [
        "Malware: malicious software including viruses, self-replicating worms, disguised trojans, and encrypting ransomware designed to compromise hosts.",
        "Phishing: deceptive communications mimicking legitimate organizations to trick users into divulging credentials, financial data, or downloading malware.",
        "Unauthorized access: intrusion attempts where attackers exploit weak credentials, misconfigurations, or unpatched vulnerabilities to breach private networks.",
        "Denial-of-Service (DoS): flooding attacks aimed at exhausting network bandwidth or server resources to render critical services unavailable to legitimate users."
      ],
      "expectedCount": 4
    },
    {
      "title": "Network Firewalls and Boundary Defense",
      "lead": "A firewall acts as a security barrier between trusted internal networks and untrusted external networks.",
      "items": [
        "Packet filtering: inspects source IP, destination IP, protocol, and port numbers against established access control lists (ACLs).",
        "Stateful inspection: tracks the state of active network connections, automatically permitting legitimate reply packets while dropping unsolicited external probes.",
        "Boundary enforcement: hardware firewalls protect the network perimeter at the router/gateway, while software firewalls protect individual host endpoints."
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
        "Antivirus and EDR: endpoint detection software monitors file operations, memory, and network activity to quarantine malicious programs and suspicious behaviors.",
        "Vulnerability patching: software developers regularly release security updates to repair newly discovered software flaws and security holes.",
        "Automated updates: maintaining current operating system, browser, and firmware patches prevents attackers from exploiting known, cataloged vulnerabilities."
      ]
    },
    {
      "title": "HTTPS, TLS, and Secure Data in Transit",
      "lead": "Unencrypted transmissions over cables or Wi-Fi can be intercepted and read by anyone along the communication path.",
      "items": [
        "Cleartext exposure: legacy protocols like HTTP and Telnet send usernames, passwords, and messages in unencrypted cleartext across the network.",
        "Transport Layer Security (TLS): establishes an encrypted tunnel between client and server, transforming data into unreadable ciphertext.",
        "Digital certificates: verified by trusted Certificate Authorities (CAs) to authenticate the server's identity and prevent man-in-the-middle impersonation."
      ],
      "footnote": "Always look for the HTTPS padlock indicator in modern web browsers before submitting personal or authentication credentials."
    },
    {
      "title": "Three habits for responsible network use",
      "lead": "User awareness and disciplined operational habits form the first and most effective line of defense.",
      "items": [
        "Strong unique credentials: use long passphrases combining letters, numbers, and symbols, and enforce multi-factor authentication (MFA) across all accounts.",
        "Vigilant link and attachment verification: inspect sender email addresses and link destinations before opening unexpected attachments or entering credentials.",
        "Separation of privileges: perform daily tasks using standard user accounts rather than administrator privileges to limit the potential blast radius of malware."
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
