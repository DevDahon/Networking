// Instructor discussion content replaces student task sheets, without losing
// the useful configuration procedures or technical verification guidance.
export const discussionData={
 '01-introduction-to-networking':{
  walkthrough:{title:'Follow a shared-printer request',items:[
   'Create Request: The sending PC prepares print data and addresses the local printer.',
   'Transmit Signals: Ethernet cables or Wi-Fi carry the request through the local switch.',
   'Receive & Reply: The printer accepts the job into its queue and sends a status reply.',
   'Fault Isolation: An unplugged PC cable affects only that PC, while a dead switch stops all local printing.'
  ]},
  summary:[
   'Core Purpose: A network connects devices to share data, files, and hardware resources.',
   'Three Building Blocks: End devices, connecting devices (switches/routers), and links work together.',
   'Coverage vs. Role: PAN, LAN, MAN, and WAN describe size; Peer-to-Peer and Client-Server describe service roles.',
   'Performance: Bandwidth measures link capacity (Mbps/Gbps), while latency measures delay (ms).'
  ]
 },
 '03-network-topologies':{
  walkthrough:{title:'Trace a switched star connection',items:[
   'Independent Spokes: Each of the five PCs and the printer has its own cable to the central switch.',
   'Switch Forwarding: A PC reaches the printer through the switch without needing direct cables to other PCs.',
   'Single-Cable Fault: Unplugging one PC isolates only that computer; the other four keep working.',
   'Central-Device Fault: If the central switch loses power, all six endpoints lose connection.'
  ]},
  summary:[
   'Physical vs. Logical: Physical topology is the cable layout; logical topology is how data flows.',
   'Star Standard: Modern LANs use Star topology because one broken cable only affects one device.',
   'Bus & Ring: Bus shares one backbone cable; an unprotected Ring breaks if any single link fails.',
   'Mesh, Tree & Hybrid: Mesh adds redundant paths for high reliability, while Tree and Hybrid scale across buildings.'
  ]
 },
 '04-network-devices':{
  walkthrough:{title:'Read the interfaces along a network path',items:[
   'NIC & Link Light: The PC’s NIC sends frames to the switch; a link light confirms physical connection.',
   'Layer 2 Switching: The switch reads the destination MAC address and forwards the frame to the right port.',
   'Layer 3 Routing: For outside networks, the router checks the destination IP and forwards the packet to the next hop.',
   'Modem & Access Point: The AP connects wireless clients to the LAN, and the modem links to the ISP line.'
  ]},
  summary:[
   'NIC & Hub: A NIC connects a host to a cable; a legacy Hub (Layer 1) blindly repeats signals to all ports.',
   'Switch (Layer 2): Learns MAC addresses to forward frames only to the intended local device.',
   'Router (Layer 3): Uses IP addresses and routing tables to connect different networks.',
   'AP, Modem & Firewall: APs bridge Wi-Fi to Ethernet, modems translate ISP signals, and firewalls block threats.'
  ]
 },
 '06-network-cables-media':{
  walkthrough:{title:'Select media for a campus installation',items:[
   'Check Distance: Use Cat 6 copper for indoor runs under 100 meters, and fiber-optic cable for longer runs.',
   'Check Interference: Use STP or optical fiber near heavy motors, power lines, or outdoor lightning zones.',
   'Pick Fiber Type: Choose Multi-Mode Fiber (MMF) within buildings and Single-Mode Fiber (SMF) across campus.',
   'Verify Connectors: Match RJ45 plugs to copper ports and LC/SC optical transceivers to fiber ports.'
  ]},
  summary:[
   'Three Media Types: Copper uses electrical pulses, fiber uses light pulses, and wireless uses radio waves.',
   'Twisted Pair (UTP/STP): Wire twists cancel crosstalk; copper Ethernet supports up to 100 meters.',
   'Fiber-Optic Advantage: Glass fibers carry high-speed light over kilometers with zero electrical interference.',
   'Coaxial & Wireless: Coaxial shields broadband connections, while Wi-Fi trades cable speed for mobility.'
  ]
 },
 '07-rj45-crimping':{
  walkthrough:{title:'Termination sequence: inspect before crimping',items:[
   'Strip Jacket: Score and remove about 1 inch of outer cable jacket without nicking the inner wire insulation.',
   'Untwist & Align: Untwist pairs, flatten the 8 wires in exact T568A or T568B color order, and trim evenly.',
   'Insert & Crimp: Push wires fully to the front of the RJ45 plug (clip facing down) with jacket inside strain relief, then crimp.',
   'Test Continuity: Plug both ends into a LAN cable tester and verify LEDs 1 through 8 light up in order.'
  ]},
  summary:[
   'T568A vs. T568B: Both standards wire 8 pins; T568B swaps the orange (pins 1–2) and green (pins 3, 6) pairs.',
   'Cable Types: Straight-through (B-to-B) connects PC to Switch; Crossover (A-to-B) connects like devices.',
   'Proper Crimp: Keep wire untwisting under 0.5 inch and lock the outer jacket under the plug’s strain latch.',
   'Wire-Map Testing: A cable tester detects Open (broken), Short (touching), Miswired, and Split-Pair faults.'
  ]
 },
 '08-ip-addressing':{
  walkthrough:{title:'Interpret an IPv4 configuration',items:[
   'Read IP & Prefix: In 192.168.10.25/24, the first 24 bits (192.168.10) identify the network and .25 identifies the host.',
   'Find Subnet Mask: A /24 prefix equals 255.255.255.0, giving 254 usable host addresses (.1 to .254).',
   'Check Gateway: The default gateway (192.168.10.1) is the local router door used to reach outside networks.',
   'Check Private vs. Special: 192.168.x.x is a private LAN IP, 127.0.0.1 tests the local PC, and 169.254.x.x means DHCP failed.'
  ]},
  summary:[
   'IPv4 Format: Four decimal octets (0–255) totaling 32 bits, split into a Network portion and a Host portion.',
   'Subnet Boundaries: Every subnet reserves the first IP as Network ID, the last as Broadcast, and Total − 2 for hosts.',
   'CIDR & Private IPs: Slash notation (/24) replaces rigid classes; 10.x.x.x, 172.16–31.x.x, and 192.168.x.x are private.',
   'IPv6 Evolution: IPv6 uses 128-bit hexadecimal addresses (with :: zero compression) so addresses never run out.'
  ]
 },
 '10-static-ip':{
  walkthrough:{title:'Windows static-IP configuration',items:[
   'Open Adapter Settings: Press Win+R, run ncpa.cpl, right-click the Ethernet/Wi-Fi adapter, and open IPv4 Properties.',
   'Enter Local Settings: Type a unique IP (e.g., 192.168.1.10), Subnet Mask (255.255.255.0), and Default Gateway (192.168.1.1).',
   'Enter DNS Server: Add a DNS server IP (such as 192.168.1.1 or 8.8.8.8) so website names resolve.',
   'Verify with CLI: Run ipconfig /all to confirm the settings, then ping a local peer and the default gateway.'
  ]},
  summary:[
   'Static vs. Dynamic: Use Static IPs for servers, printers, and routers; use DHCP for everyday client devices.',
   'Four Required Fields: IP Address, Subnet Mask, Default Gateway (for outside networks), and DNS Server (for names).',
   'Two-Way Agreement: Both hosts must have unique IPs and matching subnet masks to talk on a local LAN.',
   'Always Verify: Valid numbers alone do not guarantee connection—always test with ipconfig and ping.'
  ]
 },
 '11-dhcp':{
  walkthrough:{title:'Read a DHCP configuration and lease',items:[
   'Configure Pool: Set the router’s DHCP range inside its LAN subnet (e.g., .100 to .199), excluding static server IPs.',
   'Run DORA Exchange: The client broadcasts Discover, receives an Offer, sends a Request, and gets an ACK.',
   'Inspect Lease: Run ipconfig /all on Windows to view the leased IP, DHCP server address, and expiration time.',
   'Refresh Lease: Use ipconfig /release to give back an IP and ipconfig /renew to request a fresh lease.'
  ]},
  summary:[
   'Automatic Setup: DHCP automatically assigns an IP, subnet mask, gateway, and DNS server from a managed pool.',
   'Four DORA Steps: Discover (client broadcast) → Offer (server proposal) → Request (client choice) → ACK (confirmed).',
   'Lease Lifecycle: Leases are temporary; clients renew them halfway through or release them when disconnecting.',
   'Common Faults: An exhausted pool or offline DHCP server causes clients to fall back to a 169.254.x.x APIPA address.'
  ]
 },
 '12-router-wireless':{
  walkthrough:{title:'Router configuration sequence',items:[
   'Connect for Setup: Log into the router using a wired Ethernet cable so Wi-Fi changes do not drop your session.',
   'Set LAN & DHCP: Configure the private LAN IP (e.g., 192.168.1.1/24) and matching DHCP pool (.100–.199).',
   'Secure Wi-Fi: Set a clear SSID, choose 2.4 GHz / 5 GHz bands, and enable WPA3-Personal or WPA2-AES with a strong passphrase.',
   'Reconnect & Test: Connect wired and wireless clients, verify their new IPs, and test local and Internet access.'
  ]},
  summary:[
   'All-in-One Gateway: A SOHO router combines a Layer 3 Router, Layer 2 Switch, Wireless AP, DHCP server, NAT, and Firewall.',
   'LAN vs. WAN: LAN ports connect private internal devices; the WAN port connects to the Internet Service Provider.',
   'Wi-Fi Bands & Security: 2.4 GHz reaches farther while 5/6 GHz is faster; always protect Wi-Fi with WPA3 or WPA2-AES.',
   'Guest Isolation: Guest Wi-Fi lets visitors use the Internet while blocking access to private LAN computers and files.'
  ]
 },
 '13-file-printer-sharing':{
  walkthrough:{title:'Windows folder sharing',items:[
   'Enable Private Sharing: Set the Windows network profile to Private and turn on Network Discovery and File Sharing.',
   'Configure Share & NTFS: Right-click the folder, enable Advanced Sharing, and set both Share and NTFS Security permissions.',
   String.raw`Connect via UNC Path: On another PC, open File Explorer and type \\HOST\ClassFiles (or map it as Drive Z:).`,
   'Verify Access Level: Confirm Read-Only users can open files while Edit/Modify users can save changes.'
  ]},
  summary:[
   'Host Dependency: Shared folders and printers are only accessible while the host computer is online and reachable.',
   'Most Restrictive Wins: Windows combines Share permissions and NTFS permissions—the stricter rule always applies.',
   String.raw`UNC & Mapped Drives: Access shares directly using \\Host\Share or map them to a drive letter like Z:.`,
   'Least Privilege: Share only on trusted private networks and give each user only the permissions they need.'
  ]
 },
 '14-network-troubleshooting':{
  walkthrough:{title:'A fault-to-repair demonstration',items:[
   '1. Check Physical Layer: Verify power, link lights, Ethernet cable seating, or Wi-Fi connection status.',
   '2. Check IP Config: Run ipconfig /all to spot a 169.254.x.x APIPA address, wrong subnet mask, or missing gateway.',
   '3. Test Path & DNS: Ping the default gateway (local LAN), ping 8.8.8.8 (Internet route), and run nslookup (DNS).',
   '4. Fix One Thing & Retest: Apply the targeted fix, then repeat the original failing action to confirm recovery.'
  ]},
  summary:[
   'Structured Method: Observe the symptom → test layer by layer → change one setting → retest and document.',
   'Core CLI Tools: ipconfig checks settings, ping tests reachability, tracert maps hops, and nslookup tests DNS.',
   'ARP & Netstat: arp -a checks IP-to-MAC resolution on the LAN, while netstat lists active ports and connections.',
   'Isolate the Layer: If ping by IP works but website names fail, the network path is healthy—fix the DNS setting.'
  ]
 },
 '15-network-security':{
  walkthrough:{title:'Layered defense in practice',items:[
   '1. Perimeter Firewall: Enable stateful firewall rules to block unsolicited incoming connections from the Internet.',
   '2. Endpoint Protection: Keep antivirus active and install OS and browser security updates automatically.',
   '3. Encrypt Traffic: Use HTTPS/TLS for web logins and WPA2-AES or WPA3 for wireless networks.',
   '4. Protect Accounts: Require strong, unique passphrases and Multi-Factor Authentication (MFA) on all accounts.'
  ]},
  summary:[
   'CIA Triad: Confidentiality keeps data private, Integrity prevents tampering, and Availability keeps services online.',
   'Four Major Threats: Malware infects hosts, phishing steals passwords, intrusions probe ports, and DoS floods servers.',
   'Stateful Firewalls & TLS: Firewalls block unauthorized inbound probes, while HTTPS/TLS encrypts data in transit.',
   'Human & Account Defense: Strong passwords, MFA, regular updates, and spotting phishing links stop most breaches.'
  ]
 }
};

export const simulationGuidance={
 security:'Select a security scenario and toggle active or disabled defenses. Observe how firewalls, TLS encryption, endpoint protection, and strong authentication stop common threats.',
 securityFirewall:'Select a packet and evaluate it against the ordered firewall rules. Observe the difference between stateful inspection and stateless packet filtering.',
 communication:'Choose a transmission medium. Use Play/Pause/Resume or manual steps for sender, medium, and receiver; packet motion corresponds to the transmission stage.',
 coverage:'Change coverage and service architecture independently. Use the diagrams to explain why a LAN may use either peer or server services.',
 topology:'Select a topology, then change the failed link or device. Read the source reachability result using the stated topology assumptions.',
 devices:'Select a device and its labeled port. Compare its function and local switching or routing behavior in the schematic.',
 osi:'Select layers, step the wrapping journey, then demonstrate TCP versus UDP behavior with a modeled loss.',
 media:'Select a cable cross-section and step through the tool explanations. Relate media choice to distance and installation requirements.',
 cable:'Select T568A or T568B, inspect both ends, change conductor positions, and run the calculated wire-map test. Explain faults without treating continuity as certification.',
 ipv4:'Enter an address and prefix, then toggle the octet bits. Read the range classification and network/host boundary.',
 subnet:'Enter an address and prefix or select a prefix example. Compare mask, boundary, counts, range, and the explained calculation, including /31 and /32.',
 static:'Change the modeled host settings and link/routing conditions, then test connectivity. Separate syntax validity from actual reachability.',
 dhcp:'Use manual DORA steps or automatic playback. Observe that a lease is active only after ACK; then demonstrate release, renewal, expiry, or exhaustion.',
 router:'Apply a consistent LAN/pool and wireless configuration, then connect clients. Explain link authentication and assigned-address outcomes separately from WAN service.',
 sharing:'Select the host/client and publish the modeled resource. Change permissions and request read/write or print access; explain allowed/denied results.',
 troubleshoot:'Select a named fault, inspect state-derived command output, and apply its targeted repair. Repeat the same diagnostic to demonstrate the change.',
 osiStack:'Select any of the seven layers and read its responsibility, examples, and approximate TCP/IP grouping.',
 osiLayer:'Use the controls for this specific layer to show its responsibilities. Compare the diagram and live explanation after each change.',
 osiJourney:'Start playback, pause at a wrapper, resume, or use Previous/Next Step. Reset and adjust speed; identify headers and the Ethernet FCS trailer.',
 osiComparison:'Select each TCP/IP group and follow the highlighted OSI rows. Explain why this mapping is approximate.',
 osiDevices:'Select a device/function to display its primary responsibility and the limits of a single-layer label.',
 osiTroubleshooting:'Select a named symptom and show its likely investigation layers and evidence. Explain why a symptom does not prove one exclusive root cause.'
};
