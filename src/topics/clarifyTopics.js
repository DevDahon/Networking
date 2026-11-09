// Editorial copy is applied after ordering so wording changes cannot break
// sequence anchors. Each entry states the idea before the detailed discussion.
// Entries are [original title or @simulation[:layer], heading, explanation].
const copy = {
  '01-introduction-to-networking': [
    ['What Is a Computer Network?', null, 'A computer network is a system of two or more connected devices that exchange data and share resources. Wired or wireless links carry the data using agreed communication rules called protocols.'],
    ['Everyday Uses of Networks', null, 'Networks let people communicate and use services hosted on other devices. Messaging, online learning, shared files, and shared printers are familiar examples.'],
    ['Basic Network Components', null, 'A network combines end devices, connecting devices, and links. These create or receive data, provide paths, and carry signals between devices.'],
    ['@introConnections', null, 'Wired connections carry signals through a cable. Wireless connections carry signals over radio between compatible devices.'],
    ['@introConnectivity', null, 'A local network connects nearby devices so they can share data and resources. Internet access connects that network to services on other networks around the world.'],
    ['Example: one printer, five connected computers', null, 'Five computers can share one network printer through a switch. Each device has its own connection, allowing print requests and replies to travel through the local network.'],
    ['Five parts of a conversation', 'Five Elements of Data Communication', 'Data communication involves a sender, receiver, message, medium, and protocol. Together, these explain who exchanges data, what travels, how it travels, and which rules make it understandable.'],
    ['@introExchange', null, 'A request asks another device to provide information or a service. When that device replies, it becomes the sender and the original requester becomes the receiver.'],
    ['Three practical benefits of networking', 'Three Benefits of Networking', 'Networking makes resources, information, and services available to multiple users. Sharing, collaboration, and managed backups help people work together more efficiently.'],
    ['Two risks of shared infrastructure', 'Two Risks of Networking', 'Shared access can expose information when permissions are poorly controlled. Shared equipment can also affect many users when it fails.'],
    ['Two performance measures', 'Two Performance Measures: Bandwidth vs Latency', 'Bandwidth describes how much data a link can carry per second. Latency describes delay, so a high-capacity connection can still feel slow when responses take time.'],
    ['Four network coverage types', null, 'Network coverage describes the geographic scope of connected devices and sites. Personal, local, metropolitan, and wide area networks differ in scope rather than following universal distance cutoffs.'],
    ['Personal Area Network (PAN)', null, 'A Personal Area Network connects devices around one person. It usually covers a short range and can use Bluetooth or wired connections.'],
    ['Local Area Network (LAN)', null, 'A Local Area Network connects devices within a limited area, such as a room, building, or campus. It lets those devices exchange data and share resources through wired or wireless links.'],
    ['Metropolitan Area Network (MAN)', null, 'A Metropolitan Area Network connects networks across a city or metropolitan area. It can link sites such as library branches, municipal offices, or campuses within that area.'],
    ['Wide Area Network (WAN)', null, 'A Wide Area Network connects networks across large geographic areas, such as regions or countries. Organizations commonly use provider services to link their distant sites.'],
    ['Two network service architectures', null, 'Network architecture describes which devices request and provide services. Peer-to-peer and client-server arrangements can both operate within the same geographic network type.'],
    ['@availabilityDemo', 'P2P vs Client-Server Availability', 'A shared resource is available only while its host and required connection are working. Peer-hosted files depend on their individual owners, while centralized files depend on the server.'],
    ['Two link choices: wired and wireless', null, 'Wired links carry signals through a physical cable, while wireless links use radio. One network can combine both methods without changing its geographic classification.']
  ],
  '03-network-topologies': [
    ['Bus Topology', null, 'A bus connects devices to a shared backbone rather than to a central switch. Signals use the common cable, and correct termination is needed at its ends.'],
    ['Ring Topology', null, 'A ring connects each device to two neighbors to form a closed loop. This example uses an unprotected logical ring, so a break interrupts its circulation.'],
    ['Mesh Topology', null, 'A full mesh connects every node directly to every other node. This provides alternate paths but requires more links as the network grows.'],
    ['Tree Topology', null, 'A tree arranges connections in levels, with branches below a central root. An upstream link can affect every endpoint in the branch beneath it.'],
    ['Hybrid Topology', null, 'A hybrid combines connection patterns within one network. This example joins two switched groups through one inter-switch link.'],
    ['Two meanings of topology', 'Two Views of Topology: Physical and Logical', 'Network topology describes how devices and connections are arranged. Physical topology shows the actual layout, while logical topology describes how communication travels.'],
    ['Six network topologies', null, 'Star, bus, ring, mesh, tree, and hybrid networks use different connection patterns. Those patterns affect expansion, cost, available paths, and the impact of failures.'],
    ['Example: a six-endpoint star', 'Star Topology', 'A star connects each endpoint to a central device using its own link. This example has five computers and one printer, so the switch needs six endpoint connections.'],
    ['Choose a topology for the task', 'Choosing a Network Topology', 'A useful topology meets the network’s capacity, coverage, growth, and availability needs. A layout that is easy to expand may still depend on a central device or upstream connection.'],
    ['@topology', 'Handling Link and Device Failures', 'A failed cable or device can disconnect one endpoint, a branch, or the whole network segment. Test faults and trace available paths between devices across each topology layout.']
  ],
  '04-network-devices': [
    ['Nine common network devices', null, 'Network devices connect hosts, carry signals, forward data, or enforce access rules. A single product can combine several functions, so its behavior matters more than its shape.'],
    ['Network Interface Card (NIC)', null, 'A Network Interface Card provides the physical connection and hardware MAC address that allows a computer to send and receive frames on a local link.'],
    ['Network Hub', null, 'A network hub is a legacy Layer 1 multiport repeater that blindly broadcasts incoming electrical signals out all other ports, creating a shared collision domain.'],
    ['Network Switch', null, 'A network switch is an intelligent Layer 2 device that learns MAC addresses on each port to forward frames directly to their intended destination.'],
    ['Network Router', null, 'A router is a Layer 3 internetworking device that uses routing tables to forward IP packets across different networks and broadcast domains.'],
    ['Modem (Modulator-Demodulator)', null, 'A modem converts digital computer pulses into analog signals for provider transmission lines, adapting local Ethernet to external provider media.'],
    ['Wireless Access Point (AP)', null, 'A wireless access point bridges radio frequency signals from Wi-Fi client stations onto a wired Ethernet local area network.'],
    ['Network Repeater', null, 'A repeater regenerates and retimes attenuated signals at the physical layer, extending the effective reach of a network cable or wireless link.'],
    ['Network Bridge', null, 'A network bridge joins two physical LAN segments at Layer 2, filtering local traffic to isolate collisions while forwarding necessary inter-segment frames.'],
    ['Network Firewall', null, 'A firewall enforces security policies at network boundaries, inspecting packet headers and connection states to permit authorized traffic and block threats.'],
    ['Connecting a device to a LAN', 'How Interfaces and Switches Connect Local Devices', 'A network interface lets a host send and receive data on a link. A switch connects local links and uses learned hardware addresses to forward Ethernet frames.'],
    ['@macLearningDemo', 'How Switches Learn MAC Addresses', 'A switch learns a frame’s source Media Access Control address on the port where that frame arrives. Known destinations use learned ports, while unknown destinations require flooding to eligible ports.'],
    ['Joining networks and media', 'Routers, Access Points, and Modems', 'A router forwards packets between networks, while an access point connects wireless devices to a local network. A modem or optical terminal supports the provider’s access technology.'],
    ['Example: the switch and router have different jobs', 'Example: Switch vs Router Roles', 'A local printer and a remote website require different delivery paths. The switch connects local devices, while the router handles forwarding toward another network.'],
    ['Ports and protection', 'Interfaces, Link Lights, and Firewalls', 'An interface connects a device to a network, while a firewall controls permitted traffic. A working link indicator confirms only part of the connection and does not prove Internet or application access.'],
    ['Virtual LANs and Routing Principles', 'VLAN Concepts and Routing Principles', 'Virtual LANs divide a single physical switch into isolated logical broadcast domains, while routers connect them using static or dynamic routing rules.'],
    ['@devices', 'Network Device Functions Explorer', 'Device functions explain how traffic moves through a network. A hub repeats incoming bits, a switch forwards local frames, and a router forwards packets between networks.'],
    ['Expand a small office', null, 'Additional wired endpoints need enough switch ports, while weak wireless coverage may need a better-placed access point. Adding the right function is more useful than adding another box without checking the existing network.'],
    ['Read the interfaces along a network path', 'Device Roles Along a Network Path', 'A request can pass through several devices, each performing a different job. Interfaces, switching, routing, and provider access work together without being interchangeable functions.']
  ],
  'osi-reference-model': [
    ['@osiIntroduction', 'What Is the OSI Reference Model?', 'Open Systems Interconnection is a seven-layer reference model for describing communication responsibilities. It helps explain how network functions cooperate without being a protocol that sends data itself.'],
    ['Seven OSI layer responsibilities', null, 'The Open Systems Interconnection model names seven responsibilities involved in communication. A classic memory aid from Layer 1 to 7 is "Please Do Not Throw Sausage Pizza Away".'],
    ['Wrap the data, then unwrap it', 'What Is Encapsulation?', 'Encapsulation adds control information around application data for transport, network, and link delivery. The receiver interprets the corresponding headers and framing to recover the data.'],
    ['@osi', 'Data Encapsulation and Delivery', 'Messages use different delivery information at different communication layers. Transport behavior and the local-link path explain how the same application data reaches its receiver.'],
    ['@osiLayer:7', null, 'The Application layer describes the network services used by applications. Its protocols define the requests and responses exchanged between them.'],
    ['@osiLayer:6', null, 'The Presentation layer formats, encrypts, and compresses data so communicating devices understand each other. It handles character sets (like UTF-8) and secure SSL/TLS encryption.'],
    ['@osiLayer:5', null, 'The Session layer establishes, manages, and terminates ongoing conversations between applications. It keeps dialogue organized and ensures open communication channels do not overlap.'],
    ['@osiLayer:4', null, 'The Transport layer delivers data between applications on communicating devices. The transport protocol determines whether missing data is recovered and delivered in order.'],
    ['Two transport services: TCP and UDP', null, 'Transmission Control Protocol supplies an ordered reliable byte stream, while User Datagram Protocol supplies independent datagrams. Applications choose the behavior their communication needs rather than assuming one transport is always better.'],
    ['@osiLayer:3', null, 'The Network layer handles addressing and delivery between different networks. Routers use destination addresses to choose where packets go next.'],
    ['@osiLayer:2', null, 'The Data Link layer carries frames across one local link at a time. Link addresses identify where a frame should go on that link.'],
    ['@osiLayer:1', null, 'The Physical layer carries bits as signals through a medium. Those signals can travel through copper, fiber, or radio.'],
    ['Four layers in the TCP/IP model', null, 'The common TCP/IP model groups communication into Application, Transport, Internet, and Link. These groups connect application services to the delivery and transmission functions underneath them.'],
    ['@osiComparison', 'Comparing the OSI and TCP/IP Models', 'The seven-layer Open Systems Interconnection model and the common four-layer TCP/IP model group communication responsibilities differently. Their mapping is useful for explanation but does not impose identical software boundaries.']
  ],
  '06-network-cables-media': [
    ['Five network media choices', null, 'A transmission medium carries signals between network interfaces. Twisted-pair copper, fiber, coaxial cable, and radio differ in construction, reach, interference behavior, and installation needs.'],
    ['Three Ethernet cable categories', null, 'A cable category describes specified performance characteristics for compatible Ethernet installations. Supported rate and reach also depend on the standard, connectors, channel length, and installation quality.'],
    ['Modular Connectors: RJ45 and Keystone Jack', 'RJ45 Plugs and Keystone Jacks', 'Twisted-pair Ethernet uses 8P8C modular plugs for patch cords and 110 IDC keystone jacks for permanent wall runs. Both components must match the cable category and wiring standard.'],
    ['T568A: eight conductor positions', null, 'T568A specifies which conductor occupies each of the eight contact positions. Read the color order from pin 1 to pin 8 using the stated connector orientation.'],
    ['T568B: eight conductor positions', null, 'T568B is another standardized eight-contact conductor arrangement. It exchanges the orange and green pair positions relative to T568A while preserving the blue and brown positions.'],
    ['Straight-through and crossover arrangements', 'Straight-Through vs Crossover Cables', 'A straight-through cable uses the same termination standard at both ends. A traditional crossover changes selected pair positions, although many modern interfaces can adjust automatically.'],
    ['Four cabling tool and tester functions', null, 'Cabling tools prepare, terminate, or test different parts of an installation. Stripping, crimping, punch-down termination, and continuity testing each require the appropriate tool.'],
    ['Tools and Equipment for RJ45 Cable Crimping', 'RJ45 Cable Crimping Tools', 'Terminating an 8P8C modular plug requires preparing dedicated cutting, stripping, crimping, and testing tools alongside quality Cat 5e/Cat 6 media.'],
    ['Tools and Equipment for Keystone Jack Punch-Down', 'Keystone Jack Punch-Down Tools', 'Terminating a permanent wall jack requires specialized insulation displacement tools, punch-down supports, and rated solid-core cabling.'],
    ['Three common wire-map faults', null, 'A wire map identifies which contact paths connect between cable ends. Opens, shorts, and miswires describe different continuity problems and require different corrections.']
  ],
  '08-ip-addressing': [
    ['An address for a network interface', 'What Is an Internet Protocol Address?', 'An Internet Protocol (IP) address is a unique logical Layer 3 numerical identifier assigned to every device on a network. While a physical MAC address identifies hardware on a single local cable, an IP address is hierarchical and location-based, enabling routers to direct data packets across interconnected local, enterprise, and global networks.'],
    ['@ipv4', 'IPv4 Address Structure and Binary Representation', 'An IPv4 address consists of four decimal octets representing 32 binary bits. Toggling individual bits shows how binary weights form decimal values.'],
    ['Two parts of an IP address', 'Two Parts of an IP Address: Network and Host', 'Every IP address is divided into two parts: the network portion identifies the network, and the host portion identifies the specific device.'],
    ['What is a subnet and why do we subnet?', 'What Is a Subnet and Why Do We Subnet?', 'A subnet is a smaller, organized group of computers within a network, such as separating Students, Staff, and Guest Wi-Fi.'],
    ['The subnet mask separates network and host', 'The Subnet Mask: The Dividing Boundary', 'A subnet mask is a 32-bit filter that marks the boundary between network bits and host bits using consecutive ones and zeros.'],
    ['Inside every subnet: network, hosts, and broadcast', 'Inside Every Subnet: Network, Broadcast, and Host IPs', 'Every subnet is simply an IP address group with a starting address, an ending address, and usable host addresses in between.'],
    ['@subnet', 'Subnet Calculator Demo', 'The address and prefix determine a subnet’s mask, boundary, and address count. Network, broadcast, and usable-host conventions must then be applied appropriately.'],
    ['@bitwiseDemo', 'How an Address and Mask Identify the Network', 'A bitwise AND combines address bits with subnet-mask bits to obtain the network address. Mask ones preserve network bits, while mask zeros clear the host portion.'],
    ['Interpret an IPv4 configuration', 'Interpreting an IPv4 Host Configuration', 'A host configuration combines an address, network boundary, and optional service or routing settings. Understanding each field prevents confusing name resolution with local or remote delivery.'],
    ['Understanding CIDR prefix notation', 'CIDR Prefix Notation (/24 Shortcut)', 'CIDR prefix notation states the number of consecutive network ones in the mask using a slash (such as /24), replacing cumbersome dotted-decimal masks.'],
    ['Classful history versus modern CIDR', 'Classful History vs Modern Subnetting', 'Modern CIDR eliminates rigid historical classes, allowing any IP block to use any prefix size to fit the exact needs of a network.'],
    ['Three private IPv4 ranges', 'Three Private IPv4 Address Ranges', 'RFC 1918 reserves three private address blocks for local networks: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. These addresses are free to use on local LANs and are not routed on the public Internet.'],
    ['Eight common special-purpose IPv4 ranges', 'Eight Special-Purpose IPv4 Ranges', 'Several address ranges have special uses such as loopback (127.0.0.1), link-local APIPA (169.254.0.0/16), and documentation. An address outside the private ranges is not automatically a globally reachable host address.'],
    ['Introduction to IPv6 Basics', 'Introduction to IPv6 Basics', 'IPv6 solves IPv4 address exhaustion by providing 128-bit addresses, offering practically unlimited addresses for modern global devices.'],
    ['Prefix, gateway, and DNS do different jobs', 'Subnet Mask, Gateway, and DNS Roles', 'The subnet mask defines the local network boundary, the default gateway forwards remote traffic to the outside world, and DNS resolves hostnames to numeric IP addresses.'],
    ['Example: read one classroom address', null, 'An address and prefix place a host within a logical subnet. The same configuration also identifies a gateway for appropriate remote destinations.'],
    ['Two ways to assign an address', 'Two ways to assign an address', 'An address can be configured manually or obtained through a configuration service. Static and dynamic assignment differ in how settings are supplied and maintained.'],
    ['Give a device a stable address', 'What Is Static IP Configuration?', 'Static configuration assigns an interface’s address settings manually. A predictable address helps infrastructure and services remain locatable when settings are managed correctly.'],
    ['Four IPv4 configuration fields', null, 'A basic host configuration includes an address, subnet mask, default gateway, and name resolver. Each field has a separate purpose and must match the intended network.'],
    ['Same subnet is a two-sided decision', 'How Hosts Decide if a Peer is Local', 'Each host uses its own address and mask to decide whether a peer is local. A successful local round trip needs compatible decisions and a working link in both directions.'],
    ['Example: two manually configured classroom computers', null, 'Two hosts with unique usable addresses in the same subnet can communicate over a working local network. A default gateway is unnecessary for this numeric local exchange.'],
    ['@asymmetricDemo', 'When Subnet Masks Do Not Match', 'Different subnet masks can make two hosts disagree about whether they share a local network. One host may try direct delivery while the other requires a route that is unavailable.'],
    ['Windows configuration and verification', 'Configuring Static IP in Windows', 'Windows adapter settings control an interface’s address and related options. Configuration must be verified through both inspection and an appropriate connectivity test.'],
    ['Windows static-IP configuration', 'Windows Static Address Configuration Procedure', 'Manual address configuration requires the intended adapter and a coordinated set of valid settings. Recording the original configuration supports verification and restoration after the change.'],
    ['@static', 'Static IP Compatibility and Testing', 'Syntactically valid addresses do not guarantee that two hosts can communicate. Local subnet agreement, link availability, and any required routes determine the modeled path.'],
    ['Read a classroom configuration and configure a static printer', 'Configuring a Static LAN Printer', 'A classroom host can use the same router address for its gateway and forwarded name-resolution service, while a printer benefits from an address coordinated outside the dynamic DHCP pool.']
  ],
  'network-protocols-services': [
    ['Three different ideas: protocol, service, and port', 'Three Core Terms: Protocol, Service, Port', 'A protocol defines exchange rules, a service provides a useful function, and a transport port acts like an apartment door number directing traffic to a specific application process.'],
    ['Four TCP/IP responsibility groups', null, 'The common TCP/IP model groups network functions into four responsibility areas. Application services depend on transport, Internet delivery, and local-link functions.'],
    ['Two transport services: TCP and UDP', null, 'Transmission Control Protocol supplies ordered reliable bytes, while User Datagram Protocol carries independent datagrams without built-in delivery guarantees. Their differences affect how application protocols handle communication.'],
    ['Read both endpoints, not just one number', 'Client and Server Endpoints', 'A client commonly uses a temporary source port to contact a server’s listening port. Addresses, ports, and transport together identify the communication context.'],
    ['@osiLayer:4', 'Transport Reliability: TCP vs UDP', 'Transport protocols differ in their response to missing data. Transmission Control Protocol provides recovery and ordered bytes, while User Datagram Protocol leaves any needed recovery to the application.'],
    ['IP: Internet Protocol', 'Internet Protocol (IP)', 'Internet Protocol supplies logical addressing and packet delivery across networks. It provides best-effort delivery rather than an ordered reliable application stream.'],
    ['ARP: Address Resolution Protocol', 'Address Resolution Protocol (ARP)', 'Address Resolution Protocol resolves the hardware address of an IPv4 next hop on a local link. A remote destination usually requires the gateway’s local hardware address rather than the remote host’s.'],
    ['@protocolArp', 'How ARP Resolves MAC Addresses', 'A host needs a local delivery address before sending an Ethernet frame toward an IPv4 neighbor. Address Resolution Protocol uses a local request and reply to establish that mapping.'],
    ['ICMP: Internet Control Message Protocol', 'ICMP and Network Ping Basics', 'Internet Control Message Protocol carries diagnostic and error information related to Internet Protocol delivery. Echo messages and expiry reports provide evidence without proving that every application service works.'],
    ['DHCP: Dynamic Host Configuration Protocol', 'Dynamic Host Configuration Protocol (DHCP)', 'Dynamic Host Configuration Protocol supplies leased host configuration and related options. Clients use it to obtain settings such as address, mask, gateway, and name resolver.'],
    ['@dhcp', 'DHCP Ports and Communication', 'Dynamic Host Configuration Protocol version 4 uses server User Datagram Protocol port 67 and client port 68. Its initial exchange proposes, requests, and confirms an address configuration.'],
    ['DNS: Domain Name System', 'Domain Name System (DNS)', 'The Domain Name System answers queries about names using records such as host addresses and mail destinations. Name resolution supplies information for later communication rather than carrying the application traffic itself.'],
    ['@dnsCacheDemo', 'DNS Caching and Record Lifetimes', 'A cached name answer can be reused until its permitted lifetime expires. Server record changes may therefore remain unseen by a client until its cache entry is refreshed.'],
    ['HTTP: Hypertext Transfer Protocol', 'Hypertext Transfer Protocol (HTTP)', 'Hypertext Transfer Protocol defines requests and responses for web resources. Methods, status codes, and message content describe the requested operation and its result.'],
    ['HTTPS: HTTP protected by TLS', 'HTTPS and Secure Web Browsing', 'Hypertext Transfer Protocol Secure protects web communication using Transport Layer Security. Certificate validation and authenticated encryption protect the connection without guaranteeing that the website’s content is trustworthy.'],
    ['Example: open a protected school website', null, 'Opening a protected website combines name resolution with a secure application exchange. The resolver supplies an address, while the browser exchanges web traffic with the server.'],
    ['@protocolWeb', 'How Protocols Cooperate on the Web', 'A web request depends on local delivery, name resolution, transport, connection security, and the web service. A failure at one stage produces different evidence from a failure at another.'],
    ['SSH: Secure Shell', 'Secure Shell (SSH)', 'Secure Shell provides authenticated encrypted remote access and channels. Checking server identity and user authorization is part of establishing a trusted connection.'],
    ['@protocolDirectory', 'Common Protocols and Port Numbers', 'Protocol and port references identify conventional service roles and endpoint bindings. The transport must accompany the number, and some network protocols have no transport port at all.']
  ],
  '11-dhcp': [
    ['A lease supplies configuration', 'What Is a DHCP Lease?', 'A lease grants temporary use of an address supplied by Dynamic Host Configuration Protocol. The server also provides options such as mask, gateway, and name resolver.'],
    ['Four messages in the initial DHCP exchange', null, 'Initial allocation commonly follows Discover, Offer, Request, and Acknowledgment. These messages locate a server, propose settings, select an offer, and confirm the lease.'],
    ['Example: a laptop receives a lease', null, 'A new laptop can obtain address settings from an available configuration server. The confirmed lease must use an address that does not conflict with another active allocation.'],
    ['Five lease lifecycle and failure events', null, 'Leases can be renewed, released, or allowed to expire. Unavailable servers and exhausted pools create different failures even when the client’s physical connection works.'],
    ['Read a DHCP configuration and lease', 'Reading a DHCP Lease Configuration', 'Automatic configuration includes more than a host address. Lease lifetime, gateway, resolver, and server information help explain which settings the client received.'],
    ['@dhcp', 'DHCP Allocation and Renewal', 'An authorized configuration server allocates unique available addresses from its managed pool. Confirmed leases remain assigned until release, expiry, or a valid lifecycle change.'],
    ['@reservedPoolDemo', 'DHCP Reservations and Exclusions', 'Reservations associate selected clients with managed addresses, while exclusions remove addresses from general allocation. Active leases and these rules determine whether an address remains available.'],
    ['Thirty laptops join a lab', null, 'A working wireless connection does not guarantee an available address lease. When client demand exceeds the free pool, some clients cannot obtain the intended configuration.']
  ],
  '12-router-wireless': [
    ['Three gateway interface and translation concepts', null, 'A combined gateway connects local clients to another network through separate interface roles. Address translation can change packet addresses, but it does not replace routing or access-control policy.'],
    ['Wireless identity and protection', 'SSID, Authentication, and Isolation', 'A Service Set Identifier names a wireless network, while authentication controls who can join it. Guest isolation is a separate policy controlling access to private resources.'],
    ['Wi-Fi Frequencies and Standards', 'Wi-Fi Frequencies and Standards', 'Wireless networks operate over unlicensed radio frequencies using standardized IEEE 802.11 protocols that balance speed and range.'],
    ['Two protected Wi-Fi security options', null, 'Protected wireless access needs a security mode supported by both access point and clients. Modern personal-network options use suitable authentication and encryption rather than relying on a hidden network name.'],
    ['Example: a laptop joins classroom Wi-Fi', null, 'A laptop needs successful wireless authentication and association before useful network access. Address configuration and upstream service must then work independently of the radio connection.'],
    ['Change settings in a safe order', 'Coordinating Router, Pool, and Wi-Fi', 'Router settings affect both management access and client connectivity. A compatible local address, allocation pool, and wireless configuration reduce avoidable disconnections.'],
    ['Router configuration sequence', 'Applying and Testing Router Settings', 'A router change must be followed by reconnecting clients and checking their received settings. Local access, name resolution, and upstream service provide different verification evidence.'],
    ['@router', 'Router LAN and Wi-Fi Workbench', 'A small gateway can combine local addressing, automatic configuration, and wireless access. Those settings must agree before clients can use the intended services.'],
    ['@guestIsolationDemo', 'Guest Wi-Fi Isolation and Internet', 'Guest isolation can permit Internet use while blocking access to staff resources. Wireless association, isolation policy, local services, and the upstream connection remain separate conditions.'],
    ['A small training center', null, 'Staff and visitors may share an Internet connection without sharing access to internal files. A correctly configured guest network separates those access needs.']
  ],
  '13-file-printer-sharing': [
    ['A host provides a shared resource', 'What Is a Network Share?', 'A network share makes a resource available to authorized clients through a hosting device. The host and required service must remain reachable for remote access.'],
    ['Two permission gates for remote file access', null, 'Remote access to a Windows file share depends on share permissions and underlying file-system permissions. Both gates must allow the requested operation for access to succeed.'],
    ['Example: students read a shared reference folder', null, 'A shared folder can permit reading while denying remote edits. The effective result depends on both permission sets rather than the more generous setting alone.'],
    ['Share safely on trusted networks', 'Securing Shared Files and Printers', 'Sharing should give named users only the access their work requires. A reachable host still needs suitable identity, permission, service, and client support.'],
    ['Windows folder sharing', 'Publishing and Accessing a Windows Shared Folder', 'Publishing a folder creates a network access path to a resource on the host. Remote verification must check the intended client identity and both permission layers.'],
    ['@sharing', 'Share vs NTFS Permissions', 'Effective remote permissions are limited by every applicable access gate in this simplified model. Network reachability alone cannot override an unshared resource or denied operation.'],
    ['@printQueueDemo', 'How Shared Printer Queues Work', 'A shared printer queue retains accepted jobs and processes their pages in arrival order. Device outages pause processing, while submission permissions determine whether new jobs can enter the queue.'],
    ['Read-only reference files and controlled editing', 'Read-Only vs Editable Sharing', 'Reference files and editable working documents can require different access policies. Named accounts and remote permission checks help keep changes limited to authorized contributors.']
  ],
  '14-network-troubleshooting': [
    ['Observe before changing', 'Systematic Troubleshooting Process', 'Troubleshooting starts by defining the symptom and collecting evidence. A justified change is followed by repeating the original failing test and documenting the result.'],
    ['Six Windows diagnostic commands', null, 'Diagnostic commands inspect configuration, reachability, name resolution, or neighbor information. Each answers a limited question rather than proving that the whole network works.'],
    ['Nine modeled network faults', null, 'Similar symptoms can come from different physical, addressing, service, or permission faults. Distinguishing the cause requires evidence tied to the failed operation.'],
    ['Example: numeric access works but a name fails', null, 'A successful numeric service test and a failed name query point to different functional results. Name-resolution settings and reachability deserve investigation before replacing an already working link.'],
    ['@ttlTraceDemo', 'Understanding Traceroute Results', 'Traceroute uses limited-lifetime probes to obtain evidence from successive hops. A missing reply can reflect filtering, while an explicit unreachable response provides different evidence about the path.'],
    ['Test the theory and verify the repair', 'Verifying a Network Repair', 'A troubleshooting hypothesis should explain the available evidence and predict a useful test. A repair is confirmed by repeating the original failed operation, not by assuming that a changed setting solved it.'],
    ['A fault-to-repair demonstration', 'Troubleshooting Workflow: Symptom to Fix', 'A complete investigation connects the reported symptom to observations, a likely cause, and a targeted correction. The final retest checks whether the user’s original operation now succeeds.'],
    ['@troubleshoot', 'Diagnosing Network Faults Workbench', 'Different command results expose different parts of the network state. Comparing them supports a targeted repair rather than unrelated configuration changes.'],
    ['“The network is down”', 'Local LAN vs Internet vs DNS', 'Reaching a local gateway does not prove that remote routes, name resolution, or a website work. Separate tests identify which stage succeeds and which still needs investigation.']
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
