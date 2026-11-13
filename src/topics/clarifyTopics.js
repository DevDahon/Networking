// Editorial copy is applied after ordering so wording changes cannot break
// sequence anchors. Each entry states the idea before the detailed discussion.
// Entries are [original title or @simulation[:layer], heading, explanation].
const copy = {
  '01-introduction-to-networking': [
    ['What Is a Computer Network?', null, 'A computer network connects two or more devices so they can share data and resources using agreed rules called protocols.'],
    ['Everyday Uses of Networks', null, 'Networks let people message, study online, and share files or printers across connected devices.'],
    ['Basic Network Components', null, 'Every network relies on three parts: end devices, connecting devices, and physical or wireless links.'],
    ['@introConnections', null, 'Devices connect to a network using either physical Ethernet cables or wireless radio signals.'],
    ['@introConnectivity', null, 'A local network connects nearby devices, while the Internet links local networks to the wider world.'],
    ['Five parts of a conversation', 'Five Elements of Data Communication', 'Every network exchange requires five elements: a sender, receiver, message, medium, and protocol.'],
    ['@introExchange', null, 'When one computer requests a file and the other replies, their sender and receiver roles switch.'],
    ['Three practical benefits of networking', 'Three Benefits of Networking', 'Networks save time and money by letting users share hardware, collaborate on files, and centralize backups.'],
    ['Two risks of shared infrastructure', 'Two Risks of Networking', 'Connected networks face two main challenges: unauthorized access to shared data and equipment failures that affect multiple users.'],
    ['Two performance measures', 'Two Performance Measures: Bandwidth vs Latency', 'Bandwidth measures how much data a link can carry per second, while latency measures the time delay.'],
    ['Four network coverage types', null, 'Network coverage classifies networks by their geographic scope: PAN, LAN, MAN, and WAN.'],
    ['Personal Area Network (PAN)', null, 'A Personal Area Network connects devices around one person. It usually covers a short range and can use Bluetooth or wired connections.'],
    ['Local Area Network (LAN)', null, 'A Local Area Network connects devices within a limited area, such as a room, building, or campus. It lets those devices exchange data and share resources through wired or wireless links.'],
    ['Metropolitan Area Network (MAN)', null, 'A Metropolitan Area Network connects networks across a city or metropolitan area. It can link sites such as library branches, municipal offices, or campuses within that area.'],
    ['Wide Area Network (WAN)', null, 'A Wide Area Network connects networks across large geographic areas, such as regions or countries. Organizations commonly use provider services to link their distant sites.'],
    ['Two network service architectures', null, 'Network architecture defines whether devices share resources directly as equals (peer-to-peer) or through a dedicated server (client-server).'],
    ['Two link choices: wired and wireless', 'Two Link Choices: Wired vs. Wireless', 'Choose between a wired cable for steady speed and wireless Wi-Fi for convenient mobility.']
  ],
  '03-network-topologies': [
    ['Bus Topology', null, 'A bus topology connects all devices along a single shared backbone cable.'],
    ['Ring Topology', null, 'A ring topology links each device to two neighbors in a closed circle.'],
    ['Mesh Topology', null, 'A mesh topology connects devices with multiple redundant paths so traffic can route around a broken link.'],
    ['Tree Topology', null, 'A tree topology organizes switches in a hierarchy of root and branch levels.'],
    ['Hybrid Topology', null, 'A hybrid topology combines two or more layouts, such as linking multiple star networks together.'],
    ['Two meanings of topology', 'Two Views of Topology: Physical and Logical', 'Physical topology shows how cables are arranged, while logical topology shows how data flows through them.'],
    ['Six network topologies', null, 'Different network layouts balance cable cost, ease of expansion, and fault tolerance.'],
    ['Example: a six-endpoint star', 'Star Topology', 'In a star topology, every computer and printer connects to a central switch with its own cable.'],
    ['Choose a topology for the task', 'Choosing a Network Topology', 'Pick a network layout based on how many devices you have, your budget, and how critical uptime is.'],
    ['@topology', 'Handling Link and Device Failures', 'Test how a broken cable or failed switch affects reachability in each topology layout.']
  ],
  '04-network-devices': [
    ['Nine common network devices', null, 'Each network device has a specific job—sending signals, connecting local devices, routing between networks, or blocking threats.'],
    ['Network Interface Card (NIC)', null, 'A NIC connects a computer to a wired or wireless link and gives it a unique hardware MAC address.'],
    ['Network Hub', null, 'A hub is a legacy Layer 1 device that blindly repeats incoming signals out every other port.'],
    ['Network Switch', null, 'A switch is a smart Layer 2 device that learns MAC addresses and sends frames only to the target port.'],
    ['Network Router', null, 'A router is a Layer 3 device that uses IP addresses to forward packets between different networks.'],
    ['Modem (Modulator-Demodulator)', null, 'A modem translates digital network data into signals that can travel over an Internet provider line.'],
    ['Wireless Access Point (AP)', null, 'An access point connects Wi-Fi devices to a wired local area network.'],
    ['Network Repeater', null, 'A repeater boosts weakened signals so they can travel farther over a cable or wireless link.'],
    ['Network Bridge', null, 'A bridge connects two LAN segments at Layer 2 to keep local traffic separated.'],
    ['Network Firewall', null, 'A firewall inspects network traffic and blocks unauthorized connections at the network boundary.'],
    ['Connecting a device to a LAN', 'How Interfaces and Switches Connect Local Devices', 'Computers use a NIC to plug into a switch, which forwards frames across the local network.'],
    ['@macLearningDemo', 'How Switches Learn MAC Addresses', 'Watch how a switch learns source MAC addresses on incoming ports and floods unknown destinations.'],
    ['Joining networks and media', 'Routers, Access Points, and Modems', 'Switches connect local devices, access points add Wi-Fi, routers join separate networks, and modems link to the ISP.'],
    ['Example: the switch and router have different jobs', 'Example: Switch vs Router Roles', 'Local print jobs stay inside the switch, while Internet requests go through the switch to the router.'],
    ['Ports and protection', 'Interfaces, Link Lights, and Firewalls', 'A green link light only confirms a physical connection—it does not guarantee valid IP settings or Internet access.'],
    ['Virtual LANs and Routing Principles', 'VLAN Concepts and Routing Principles', 'VLANs split one physical switch into separate logical groups, and routers connect those groups when needed.'],
    ['@devices', 'Network Device Functions Explorer', 'Compare how NICs, hubs, switches, routers, access points, and modems process network traffic.'],
    ['Expand a small office', null, 'Add a switch when you need more Ethernet ports, or add an access point when you need wider Wi-Fi coverage.'],
    ['Read the interfaces along a network path', 'Device Roles Along a Network Path', 'Follow how a computer, switch, router, and modem work together to deliver a network request.']
  ],
  'osi-reference-model': [
    ['@osiIntroduction', 'What Is the OSI Reference Model?', 'Think of OSI as a troubleshooting map that splits networking into 7 clear jobs—from clicking a webpage (Layer 7) down to cable or Wi-Fi signals (Layer 1).'],
    ['Seven OSI layer responsibilities', null, 'Each OSI layer owns one clear duty—from user apps at Layer 7 down to physical bits at Layer 1.'],
    ['Wrap the data, then unwrap it', 'What Is Encapsulation?', 'Like placing a letter inside nested envelopes, encapsulation wraps data with delivery headers when sending and unwraps them when receiving.'],
    ['@osi', 'Data Encapsulation and Delivery', 'Watch how a message gets wrapped into a segment (ports), packet (IPs), and frame (MACs), then unwrapped by the receiver.'],
    ['Two transport services: TCP and UDP', null, 'TCP checks and resends lost pieces for complete accuracy, while UDP sends packets immediately for live speed.'],
    ['Four layers in the TCP/IP model', null, 'While OSI teaches 7 detailed boxes, real networks use the 4-layer TCP/IP model: Application, Transport, Internet, and Link.'],
    ['@osiComparison', 'Comparing the OSI and TCP/IP Models', 'Compare how the 7 conceptual OSI layers group together inside the 4 practical TCP/IP layers.']
  ],
  '06-network-cables-media': [
    ['Five network media choices', null, 'Network links use copper cables, fiber-optic glass, or wireless radio depending on distance, speed, and interference.'],
    ['Three Ethernet cable categories', null, 'Higher twisted-pair categories (Cat 5e, Cat 6, Cat 6A) use tighter twists and shielding to support faster speeds.'],
    ['Fiber-Optic Cable Construction', 'Fiber-Optic Cable Construction and Types', 'Fiber-optic cables send light pulses through glass cores to span long distances without electrical interference.'],
    ['Coaxial Cable and Shielding', 'Coaxial Cable Construction and Shielding', 'Coaxial cable uses a braided metal shield around a copper core to carry broadband Internet and TV signals.'],
    ['Unguided Media and Wireless Radio', 'Unguided Media: Wireless Radio Frequencies', 'Wireless networks send radio waves through the air to connect mobile devices without physical cables.'],
    ['@media', 'Transmission Media Comparison Workbench', 'Inspect the physical structure, signaling method, and maximum reach of copper, fiber, and wireless media.'],
    ['Connect two buildings', 'Campus Inter-Building Media Selection', 'Use fiber-optic cable between buildings to exceed the 100-meter copper limit and avoid outdoor electrical hazards.'],
    ['Select media for a campus installation', 'Campus Media Selection Walkthrough', 'Match each link to the right medium by checking distance, electrical interference, and required speed.']
  ],
  '07-rj45-crimping': [
    ['Modular Connectors: RJ45 and Keystone Jack', 'RJ45 Plugs and Keystone Jacks', 'Ethernet patch cords end in 8-pin RJ45 plugs, while wall outlets use punch-down keystone jacks.'],
    ['Four cabling tool and tester functions', null, 'Building a reliable Ethernet cable requires four core tools: a stripper, crimper, punch-down tool, and cable tester.'],
    ['Tools and Equipment for RJ45 Cable Crimping', 'RJ45 Cable Crimping Tools', 'Prepare a cable stripper, modular crimper, RJ45 plugs, and Cat 5e/Cat 6 cable before terminating a patch cord.'],
    ['Tools and Equipment for Keystone Jack Punch-Down', 'Keystone Jack Punch-Down Tools', 'Use a 110 impact punch-down tool and palm holder to seat solid-core wires cleanly into a wall keystone jack.'],
    ['T568A: eight conductor positions', null, 'T568A places the green pair on pins 1–2 and the orange pair on pins 3 and 6.'],
    ['T568B: eight conductor positions', null, 'T568B places the orange pair on pins 1–2 and the green pair on pins 3 and 6.'],
    ['Straight-through and crossover arrangements', 'Straight-Through vs Crossover Cables', 'Straight-through cables use the same standard on both ends, while crossover cables swap the green and orange pairs.'],
    ['Example: a straight-through patch cable', null, 'A straight-through patch cord connects a computer to a switch with Pin 1 wired to Pin 1 through Pin 8 to Pin 8.'],
    ['Three common wire-map faults', null, 'A cable tester checks all eight wires to catch open circuits, short circuits, and crossed wires.'],
    ['@cable', '8P8C Modular Cable Termination Workbench', 'Wire both ends of an RJ45 cable and run the animated 1-to-8 pin tester to verify continuity.'],
    ['Repair a failed classroom patch cable', 'Patch Cable Troubleshooting and Repair', 'If a damaged patch cord drops link speed or disconnects, cut off the faulty plug and crimp a fresh RJ45 connector.'],
    ['Termination sequence: inspect before crimping', 'Cable Termination and Testing Walkthrough', 'Strip the jacket, untwist and flatten the eight wires in color order, push them fully into the plug, crimp, and test.']
  ],
  '08-ip-addressing': [
    ['An address for a network interface', 'What Is an Internet Protocol Address?', 'An IP address is a logical Layer 3 number that identifies a device and its network so routers can deliver packets to it.'],
    ['Two parts of an IP address', 'Two Parts of an IP Address: Network and Host', 'Every IPv4 address has two parts: the network ID (which street) and the host ID (which house).'],
    ['What is a subnet and why do we subnet?', 'What Is a Subnet and Why Do We Subnet?', 'Subnetting splits a large network into smaller groups—like Students, Staff, and Guests—to improve speed and security.'],
    ['The subnet mask separates network and host', 'The Subnet Mask: The Dividing Boundary', 'A subnet mask uses binary 1s to lock in the network portion and binary 0s to mark the host portion.'],
    ['@bitwiseDemo', 'How an Address and Mask Identify the Network', 'See how a device combines its IP address and subnet mask with a bitwise AND operation to find its Network ID.'],
    ['Interpret an IPv4 configuration', 'Interpreting an IPv4 Host Configuration', 'Read an IP address, subnet mask, default gateway, and DNS server together to understand how a computer connects.'],
    ['Inside every subnet: network, hosts, and broadcast', 'Inside Every Subnet: Network, Broadcast, and Host IPs', 'Every subnet reserves its first address as the Network ID, its last as the Broadcast IP, and the middle addresses for hosts.'],
    ['@subnet', 'Subnet Calculator Demo', 'Drag the CIDR slider or pick a prefix to see how the network boundary, broadcast address, and usable host count change.'],
    ['Understanding CIDR prefix notation', 'CIDR Prefix Notation (/24 Shortcut)', 'CIDR notation writes the subnet mask as a simple slash number—like /24 instead of 255.255.255.0.'],
    ['Example: read one classroom address', null, 'A host with 192.168.10.25/24 talks directly to local peers on 192.168.10.0/24 and sends outside traffic to its gateway.'],
    ['Classful history versus modern CIDR', 'Classful History vs Modern Subnetting', 'Modern CIDR replaces rigid old Class A, B, and C sizes so admins can create subnets of any size without wasting IPs.'],
    ['Three private IPv4 ranges', 'Three Private IPv4 Address Ranges', 'Private IP ranges (10.x.x.x, 172.16–31.x.x, and 192.168.x.x) are used inside local LANs and require NAT to reach the Internet.'],
    ['Eight common special-purpose IPv4 ranges', 'Eight Special-Purpose IPv4 Ranges', 'Special IPv4 ranges handle self-testing (127.0.0.1), automatic fallback (169.254.x.x), multicast, and documentation.'],
    ['Introduction to IPv6 Basics', 'Introduction to IPv6 Basics', 'IPv6 uses 128-bit hexadecimal addresses to provide an almost limitless supply of IPs for modern devices.'],
    ['Plan a 28-host classroom subnet', 'Subnet Sizing and Address Planning', 'Choose a subnet prefix that fits all your computers, the router gateway, and room for future growth.']
  ],
  '10-static-ip': [
    ['Prefix, gateway, and DNS do different jobs', 'Subnet Mask, Gateway, and DNS Roles', 'The subnet mask defines local neighbors, the default gateway reaches outside networks, and DNS translates website names into IPs.'],
    ['Two ways to assign an address', 'Two Ways to Assign an IP Address', 'Use DHCP for everyday computers and phones, and use Static IPs for servers, printers, and routers that need a fixed address.'],
    ['Give a device a stable address', 'What Is Static IP Configuration?', 'A static IP is entered manually so users and other devices can always find a printer, server, or router at the same address.'],
    ['Four IPv4 configuration fields', 'Four Key IPv4 Configuration Settings', 'Manual IP setup requires four matching values: IP Address, Subnet Mask, Default Gateway, and DNS Server.'],
    ['Same subnet is a two-sided decision', 'How Hosts Decide if a Peer is Local', 'Both computers must agree they are in the same subnet for a local request and its reply to succeed.'],
    ['Example: two manually configured classroom computers', null, 'Two computers with unique IPs in 192.168.1.0/24 can communicate directly through a switch without needing a router.'],
    ['@asymmetricDemo', 'When Subnet Masks Do Not Match', 'See how a mismatched subnet mask causes one computer to treat a local neighbor as remote, breaking two-way communication.'],
    ['Windows configuration and verification', 'Configuring Static IP in Windows', 'After entering a static IP in Windows adapter properties, always verify it with ipconfig and ping.'],
    ['Windows static-IP configuration', 'Windows Static Address Configuration Procedure', 'Follow the step-by-step Windows TCP/IPv4 setup flow and test both local and remote connectivity.'],
    ['@static', 'Static IP Compatibility and Testing', 'Configure two hosts, a gateway, and DNS, then test connectivity in the interactive command prompt.'],
    ['Read a classroom configuration and configure a static printer', 'Configuring a Static LAN Printer', 'Assign a shared printer a static IP inside the local subnet but outside the router’s automatic DHCP range.']
  ],
  'network-protocols-services': [
    ['Three different ideas: protocol, service, and port', 'Three Core Terms: Protocol, Service, Port', 'A protocol is the rulebook, a service is the app feature (like web or email), and a port number directs traffic to the right app.'],
    ['Four TCP/IP responsibility groups', null, 'The TCP/IP stack groups protocols into four layers: Application, Transport, Internet, and Link.'],
    ['Two transport services: TCP and UDP', null, 'TCP checks and resends lost packets for accuracy, while UDP sends packets immediately for real-time speed.'],
    ['Read both endpoints, not just one number', 'Client and Server Endpoints', 'Every network connection pairs the client’s temporary port with the server’s well-known service port.'],
    ['@osiLayer:4', 'Transport Reliability: TCP vs UDP', 'Compare how TCP recovers a dropped packet while UDP continues without waiting.'],
    ['IP: Internet Protocol', 'Internet Protocol (IP)', 'IP labels packets with source and destination addresses so routers can forward them across networks.'],
    ['ARP: Address Resolution Protocol', 'Address Resolution Protocol (ARP)', 'ARP asks the local network "Who has this IP address?" to discover the neighbor’s hardware MAC address.'],
    ['@protocolArp', 'How ARP Resolves MAC Addresses', 'Watch a host broadcast an ARP Request on the LAN and receive a unicast ARP Reply with the target MAC address.'],
    ['ICMP: Internet Control Message Protocol', 'ICMP and Network Ping Basics', 'ICMP powers diagnostic tools like ping and tracert by reporting whether a destination is reachable.'],
    ['DHCP: Dynamic Host Configuration Protocol', 'Dynamic Host Configuration Protocol (DHCP)', 'DHCP automatically hands out an IP address, subnet mask, gateway, and DNS server when a device joins the network.'],
    ['@dhcp', 'DHCP Ports and Communication', 'Step through the four-part DHCP exchange (Discover, Offer, Request, ACK) between client port 68 and server port 67.'],
    ['DNS: Domain Name System', 'Domain Name System (DNS)', 'DNS acts as the phonebook of the Internet, translating human-friendly domain names into numeric IP addresses.'],
    ['@dnsCacheDemo', 'DNS Caching and Record Lifetimes', 'See how a computer caches DNS answers for fast lookups until the Time-to-Live (TTL) timer expires.'],
    ['HTTP: Hypertext Transfer Protocol', 'Hypertext Transfer Protocol (HTTP)', 'HTTP defines how web browsers request pages and how web servers reply with status codes and content.'],
    ['HTTPS: HTTP protected by TLS', 'HTTPS and Secure Web Browsing', 'HTTPS wraps HTTP inside TLS encryption on port 443 so eavesdroppers cannot read passwords or page data.'],
    ['Example: open a protected school website', null, 'Loading a secure website uses DNS to find the server’s IP, then TCP and TLS to fetch the page over HTTPS.'],
    ['@protocolWeb', 'How Protocols Cooperate on the Web', 'Follow how ARP, DNS, TCP, TLS, and HTTPS work together when you open a webpage.'],
    ['SSH: Secure Shell', 'Secure Shell (SSH)', 'SSH provides an encrypted command-line connection on TCP port 22 for managing remote servers and switches safely.'],
    ['@protocolDirectory', 'Common Protocols and Port Numbers', 'Explore the ten essential networking protocols, their transport types, and their default port numbers.']
  ],
  '11-dhcp': [
    ['A lease supplies configuration', 'What Is a DHCP Lease?', 'A DHCP server lends each client a temporary IP address along with its subnet mask, default gateway, and DNS server.'],
    ['Four messages in the initial DHCP exchange', null, 'DHCP assigns an IP address in four steps called DORA: Discover, Offer, Request, and Acknowledgment.'],
    ['Example: a laptop receives a lease', null, 'When a laptop joins the LAN, it completes the four DORA steps to receive a unique IP lease from the server.'],
    ['Five lease lifecycle and failure events', null, 'Clients renew leases before they expire, release them when leaving, or fall back to 169.254.x.x if no server responds.'],
    ['Read a DHCP configuration and lease', 'Reading a DHCP Lease Configuration', 'Use ipconfig /all to check which DHCP server assigned your IP and when your current lease expires.'],
    ['@dhcp', 'DHCP Allocation and Renewal', 'Step through the DORA process, assign leases from the pool, and test what happens when the server is offline or full.'],
    ['@reservedPoolDemo', 'DHCP Reservations and Exclusions', 'Use DHCP reservations to give a printer the same IP every time, and exclusions to protect static server IPs.'],
    ['Thirty laptops join a lab', null, 'If 30 laptops connect to a router with only 20 pooled IPs, the extra 10 laptops will connect to Wi-Fi but get no IP address.']
  ],
  '12-router-wireless': [
    ['Three gateway interface and translation concepts', null, 'A home or small-office router links your private LAN to the ISP’s WAN and uses NAT to share one public IP.'],
    ['Wireless identity and protection', 'SSID, Authentication, and Isolation', 'The SSID is your Wi-Fi network’s name, WPA2/WPA3 passphrase controls who can join, and guest isolation protects private LAN devices.'],
    ['Wi-Fi Frequencies and Standards', 'Wi-Fi Frequencies and Standards', '2.4 GHz Wi-Fi reaches farther through walls, while 5 GHz and 6 GHz deliver faster speeds with less interference.'],
    ['Two protected Wi-Fi security options', null, 'Always secure Wi-Fi with WPA3-Personal or WPA2-AES—never leave a network open or use obsolete WEP/TKIP.'],
    ['Example: a laptop joins classroom Wi-Fi', null, 'A laptop must first authenticate to the Wi-Fi SSID before it can get a DHCP lease and reach the Internet.'],
    ['Change settings in a safe order', 'Coordinating Router, Pool, and Wi-Fi', 'When changing a router’s LAN IP, update its DHCP pool to match so connected devices stay in the same subnet.'],
    ['Router configuration sequence', 'Applying and Testing Router Settings', 'Configure the router’s LAN subnet, DHCP range, and Wi-Fi security, then reconnect clients to verify access.'],
    ['@router', 'Router LAN and Wi-Fi Workbench', 'Configure LAN IP, DHCP settings, and Wi-Fi security, then connect wired and wireless clients to test your setup.'],
    ['@guestIsolationDemo', 'Guest Wi-Fi Isolation and Internet', 'See how Guest Wi-Fi isolation lets visitors browse the Internet while blocking them from internal staff computers.'],
    ['A small training center', null, 'Give visitors an isolated Guest Wi-Fi SSID so they can use the Internet without seeing internal office files or printers.']
  ],
  '13-file-printer-sharing': [
    ['A host provides a shared resource', 'What Is a Network Share?', 'File and printer sharing lets authorized users open folders or print documents hosted on another computer over the LAN.'],
    ['Two permission gates for remote file access', null, 'When accessing a shared folder over the network, Windows checks both Share permissions and NTFS permissions—the stricter rule wins.'],
    ['Example: students read a shared reference folder', null, 'If Share permission is Read and NTFS permission is Modify, students connecting over the network can only read files.'],
    ['Share safely on trusted networks', 'Securing Shared Files and Printers', 'Turn on file sharing only on private, trusted networks and grant users the minimum permission they need.'],
    ['Windows folder sharing', 'Publishing and Accessing a Windows Shared Folder', 'Share a folder on the host PC, set Share and NTFS permissions, and connect from a client using a \\\\Host\\Share UNC path.'],
    ['@sharing', 'Share vs NTFS Permissions', 'Test different combinations of Share and NTFS permissions to see whether a remote user can read, write, or print.'],
    ['@printQueueDemo', 'How Shared Printer Queues Work', 'Watch how a shared printer processes jobs in First-In, First-Out (FIFO) order and holds jobs if the printer goes offline.'],
    ['Read-only reference files and controlled editing', 'Read-Only vs Editable Sharing', 'Give students Read-Only access to lesson handouts and give teachers Modify access to upload and edit files.']
  ],
  '14-network-troubleshooting': [
    ['Observe before changing', 'Systematic Troubleshooting Process', 'Fix network problems systematically: identify the symptom, test one layer at a time, change one setting, and retest.'],
    ['Six Windows diagnostic commands', null, 'Six built-in Windows commands—ipconfig, ping, tracert, nslookup, arp, and netstat—reveal where a connection is failing.'],
    ['Nine modeled network faults', null, 'Different problems—like an unplugged cable, 169.254.x.x APIPA address, missing gateway, or dead DNS—leave distinct clues.'],
    ['Example: numeric access works but a name fails', null, 'If pinging an IP address works but opening a website name fails, the network path is fine—the issue is DNS.'],
    ['@ttlTraceDemo', 'Understanding Traceroute Results', 'See how tracert uses Time-to-Live (TTL) values to map each router hop along the path to a destination.'],
    ['Test the theory and verify the repair', 'Verifying a Network Repair', 'After fixing a network setting, always repeat the exact action that originally failed to confirm the problem is solved.'],
    ['A fault-to-repair demonstration', 'Troubleshooting Workflow: Symptom to Fix', 'Walk through checking the cable, verifying IP settings with ipconfig, testing the gateway with ping, and checking DNS.'],
    ['@troubleshoot', 'Diagnosing Network Faults Workbench', 'Pick a fault scenario, run diagnostic commands in the terminal, and identify the exact root cause.'],
    ['“The network is down”', 'Local LAN vs Internet vs DNS', 'When a user says "the Internet is down," test local LAN, gateway, public IP, and DNS separately to pinpoint the real failure.']
  ],
  '15-network-security': [
    ['Network security and the CIA triad', 'The CIA Triad: Confidentiality, Integrity, Availability', 'Network security protects the CIA Triad: keeping data private (Confidentiality), accurate (Integrity), and reachable (Availability).'],
    ['Four common network security threats', null, 'Networks defend against four main threats: malware, phishing, unauthorized intrusion, and Denial-of-Service (DoS) floods.'],
    ['Network Firewalls and Boundary Defense', null, 'A firewall acts as a security guard between your LAN and the Internet, blocking unsolicited incoming attacks.'],
    ['@securityFirewall', 'Stateful Firewall Packet Inspection', 'Test how a stateful firewall allows return traffic from your own requests while dropping unsolicited external attacks.'],
    ['Endpoint Protection and Security Updates', null, 'Antivirus software and regular OS updates close security holes on computers before attackers can exploit them.'],
    ['HTTPS, TLS, and Secure Data in Transit', null, 'HTTPS with TLS encrypts data in transit so attackers on the same network cannot read passwords or messages.'],
    ['Three habits for responsible network use', null, 'Strong passwords, Multi-Factor Authentication (MFA), and checking links before clicking stop most everyday cyberattacks.'],
    ['@security', 'Network Security Defense Workbench', 'Simulate common cyberattacks and toggle defenses on or off to see how firewalls, TLS, rate-limiting, and MFA protect the network.'],
    ['Secure a small office workstation and network', 'Hardening a Classroom or Small-Office Workstation', 'Protect office computers by turning on the firewall, enabling automatic updates, using WPA2/WPA3 Wi-Fi, and requiring MFA.'],
    ['Layered defense in practice', 'Applying Defense in Depth Step by Step', 'Combine firewall rules, endpoint antivirus, HTTPS encryption, and MFA so that if one defense fails, another stops the attack.']
  ]
};

export function clarifyTopic(topic) {
  const entries = copy[topic.id];
  if (!entries) throw new Error(`Missing concept copy for ${topic.id}`);
  const used = new Set();
  const slides = topic.slides.map(slide => {
    if (['title', 'objectives', 'summary'].includes(slide.kind)) return { ...slide };
    const key = slide.type ? `@${slide.type}${slide.layer ? `:${slide.layer}` : ''}` : slide.title;
    const entry = entries.find(([selector]) => selector === key);
    if (!entry) throw new Error(`Missing concept explanation: ${topic.id} / ${key}`);
    if (used.has(key)) throw new Error(`Duplicate concept copy target: ${key}`);
    used.add(key);
    return { ...slide, title: entry[1] || slide.title, lead: entry[2] };
  });
  if (used.size !== entries.length) throw new Error(`Unused concept copy in ${topic.id}`);
  return {
    ...topic, slides: slides.map((slide, i) => ({
      ...slide, notes: {
        ...slide.notes,
        opening: slide.kind === 'title' ? slide.notes.opening : slide.lead || slide.notes.opening,
        transition: i < slides.length - 1 ? `Next: ${slides[i + 1].title}. Connect the current explanation to that discussion.` : 'The discussion is complete. Return to Topics.'
      }
    }))
  };
}
