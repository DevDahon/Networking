// Editorial copy is applied after ordering so wording changes cannot break
// sequence anchors. Each entry states the idea before the detailed discussion.
// Entries are [original title or @simulation[:layer], heading, explanation].
const copy={
 '01-introduction-to-networking':[
  ['What Is a Computer Network?',null,'A computer network is a system of two or more connected devices that exchange data and share resources. Wired or wireless links carry the data using agreed communication rules called protocols.'],
  ['Everyday Uses of Networks',null,'Networks let people communicate and use services hosted on other devices. Messaging, online learning, shared files, and shared printers are familiar examples.'],
  ['Basic Network Components',null,'A network combines end devices, connecting devices, and links. These create or receive data, provide paths, and carry signals between devices.'],
  ['@introConnections',null,'Wired connections carry signals through a cable. Wireless connections carry signals over radio between compatible devices.'],
  ['@introConnectivity',null,'A local network connects nearby devices so they can share data and resources. Internet access connects that network to services on other networks around the world.'],
  ['Example: one printer, five connected computers',null,'Five computers can share one network printer through a switch. Each device has its own connection, allowing print requests and replies to travel through the local network.'],
  ['Five parts of a conversation','Five Elements of Data Communication','Data communication involves a sender, receiver, message, medium, and protocol. Together, these explain who exchanges data, what travels, how it travels, and which rules make it understandable.'],
  ['@introExchange',null,'A request asks another device to provide information or a service. When that device replies, it becomes the sender and the original requester becomes the receiver.'],
  ['Three practical benefits of networking','Three Benefits of Networking','Networking makes resources, information, and services available to multiple users. Sharing, collaboration, and managed backups help people work together more efficiently.'],
  ['Two risks of shared infrastructure','Two Risks of Networking','Shared access can expose information when permissions are poorly controlled. Shared equipment can also affect many users when it fails.'],
  ['Two performance measures','Two Performance Measures: Bandwidth and Latency','Bandwidth describes how much data a link can carry per second. Latency describes delay, so a high-capacity connection can still feel slow when responses take time.'],
  ['@transferDemo',null,'File delivery depends on both the amount of data and the connection carrying it. Higher bandwidth reduces ideal transmission time, while latency adds delay before delivery completes.'],
  ['Four network coverage types',null,'Network coverage describes the geographic scope of connected devices and sites. Personal, local, metropolitan, and wide area networks differ in scope rather than following universal distance cutoffs.'],
  ['Personal Area Network (PAN)',null,'A Personal Area Network connects devices around one person. It usually covers a short range and can use Bluetooth or wired connections.'],
  ['Local Area Network (LAN)',null,'A Local Area Network connects devices within a limited area, such as a room, building, or campus. It lets those devices exchange data and share resources through wired or wireless links.'],
  ['Metropolitan Area Network (MAN)',null,'A Metropolitan Area Network connects networks across a city or metropolitan area. It can link sites such as library branches, municipal offices, or campuses within that area.'],
  ['Wide Area Network (WAN)',null,'A Wide Area Network connects networks across large geographic areas, such as regions or countries. Organizations commonly use provider services to link their distant sites.'],
  ['Two network service architectures',null,'Network architecture describes which devices request and provide services. Peer-to-peer and client-server arrangements can both operate within the same geographic network type.'],
  ['@availabilityDemo','Resource Availability in Peer-to-Peer and Client-Server Networks','A shared resource is available only while its host and required connection are working. Peer-hosted files depend on their individual owners, while centralized files depend on the server.'],
  ['Two link choices: wired and wireless',null,'Wired links carry signals through a physical cable, while wireless links use radio. One network can combine both methods without changing its geographic classification.'],
  ['@coverage','Network Coverage and Service Architecture','Coverage describes where a network extends, while service architecture describes device roles. Changing a file service does not turn a local network into a wide area network.'],
  ['A school with two campuses',null,'A school can have a local network at each campus and a provider service connecting the sites. A central file server adds a service role without changing either campus network’s local scope.']
 ],
 '03-network-topologies':[
  ['Bus Topology',null,'A bus connects devices to a shared backbone rather than to a central switch. Signals use the common cable, and correct termination is needed at its ends.'],
  ['Ring Topology',null,'A ring connects each device to two neighbors to form a closed loop. This example uses an unprotected logical ring, so a break interrupts its circulation.'],
  ['Mesh Topology',null,'A full mesh connects every node directly to every other node. This provides alternate paths but requires more links as the network grows.'],
  ['Tree Topology',null,'A tree arranges connections in levels, with branches below a central root. An upstream link can affect every endpoint in the branch beneath it.'],
  ['Hybrid Topology',null,'A hybrid combines connection patterns within one network. This example joins two switched groups through one inter-switch link.'],
  ['Two meanings of topology','Two Views of Topology: Physical and Logical','Network topology describes how devices and connections are arranged. Physical topology shows the actual layout, while logical topology describes how communication travels.'],
  ['Six network topologies',null,'Star, bus, ring, mesh, tree, and hybrid networks use different connection patterns. Those patterns affect expansion, cost, available paths, and the impact of failures.'],
  ['Example: a six-endpoint star','Star Topology','A star connects each endpoint to a central device using its own link. This example has five computers and one printer, so the switch needs six endpoint connections.'],
  ['Choose a topology for the task','Choosing a Network Topology','A useful topology meets the network’s capacity, coverage, growth, and availability needs. A layout that is easy to expand may still depend on a central device or upstream connection.'],
  ['@topology','What Happens When a Link or Device Fails?','A failed cable or device can disconnect one endpoint, a branch, or the whole network segment. The connection pattern determines the affected area under the failure assumptions shown for each topology.'],
  ['@pathTraceDemo','Following a Path Between Network Devices','A path is the sequence of connections used to get from one device to another. The highlighted connections show an available route in this graph; a failed link can force a different route or prevent delivery.'],
  ['Design an eight-seat computer lab',null,'A classroom design must provide connections for computers and shared infrastructure. Eight computers, one printer, and one router uplink require ten switch ports before expansion.']
 ],
 '04-network-devices':[
  ['Nine common network devices',null,'Network devices connect hosts, carry signals, forward data, or enforce access rules. A single product can combine several functions, so its behavior matters more than its shape.'],
  ['Connecting a device to a LAN','How Interfaces and Switches Connect Local Devices','A network interface lets a host send and receive data on a link. A switch connects local links and uses learned hardware addresses to forward Ethernet frames.'],
  ['@macLearningDemo','How a Switch Learns Hardware Addresses','A switch learns a frame’s source Media Access Control address on the port where that frame arrives. Known destinations use learned ports, while unknown destinations require flooding to eligible ports.'],
  ['Joining networks and media','Routers, Access Points, and Provider Connections','A router forwards packets between networks, while an access point connects wireless devices to a local network. A modem or optical terminal supports the provider’s access technology.'],
  ['Example: the switch and router have different jobs',null,'A local printer and a remote website require different delivery paths. The switch connects local devices, while the router handles forwarding toward another network.'],
  ['Ports and protection','Network Interfaces, Link Indicators, and Firewalls','An interface connects a device to a network, while a firewall controls permitted traffic. A working link indicator confirms only part of the connection and does not prove Internet or application access.'],
  ['@devices','Recognizing Network Devices and Their Functions','Device functions explain how traffic moves through a network. A hub repeats incoming bits, a switch forwards local frames, and a router forwards packets between networks.'],
  ['Expand a small office',null,'Additional wired endpoints need enough switch ports, while weak wireless coverage may need a better-placed access point. Adding the right function is more useful than adding another box without checking the existing network.'],
  ['Read the interfaces along a network path','Device Roles Along a Network Path','A request can pass through several devices, each performing a different job. Interfaces, switching, routing, and provider access work together without being interchangeable functions.']
 ],
 'osi-reference-model':[
  ['@osiIntroduction','What Is the OSI Reference Model?','Open Systems Interconnection is a seven-layer reference model for describing communication responsibilities. It helps explain how network functions cooperate without being a protocol that sends data itself.'],
  ['@osiStack','The Seven Layers of the OSI Model','The seven layers divide communication into services, representation, dialog, transport, routing, local delivery, and signals. Each layer describes a responsibility rather than a separate physical device.'],
  ['@osiLayer:7',null,'The Application layer describes the network services used by applications. Its protocols define the requests and responses exchanged between them.'],
  ['@osiLayer:6',null,'The Presentation layer describes how information is represented. Both sides need a compatible format to interpret the same data.'],
  ['@osiLayer:5',null,'The Session layer describes how an ongoing logical conversation is coordinated. This is a conceptual responsibility, not the same thing as a web login or a TCP connection.'],
  ['@osiLayer:4',null,'The Transport layer delivers data between applications on communicating devices. The transport protocol determines whether missing data is recovered and delivered in order.'],
  ['@osiLayer:3',null,'The Network layer handles addressing and delivery between different networks. Routers use destination addresses to choose where packets go next.'],
  ['@osiLayer:2',null,'The Data Link layer carries frames across one local link at a time. Link addresses identify where a frame should go on that link.'],
  ['@osiLayer:1',null,'The Physical layer carries bits as signals through a medium. Those signals can travel through copper, fiber, or radio.'],
  ['Example: a web request uses several responsibilities','How the Seven OSI Layers Work Together','Follow the message “Hello!” down the sender’s layers and up the receiver’s layers. Each highlighted layer explains one responsibility in the exchange.'],
  ['Seven OSI layer responsibilities',null,'The Open Systems Interconnection model names seven responsibilities involved in communication. Reviewing those responsibilities helps explain the delivery steps used in this topic.'],
  ['Four layers in the TCP/IP model',null,'The common TCP/IP model groups communication into Application, Transport, Internet, and Link. These groups connect application services to the delivery and transmission functions underneath them.'],
  ['Wrap the data, then unwrap it','What Is Encapsulation?','Encapsulation adds control information around application data for transport, network, and link delivery. The receiver interprets the corresponding headers and framing to recover the data.'],
  ['Example: a message gains delivery information',null,'A short application message needs delivery information before it can cross a network. Nested data units keep the message associated with process, network, and local-link information.'],
  ['@osiJourney','Encapsulation and Decapsulation','Encapsulation adds delivery information around your message. Decapsulation removes that information so the receiving application gets the original message.'],
  ['Two transport services: TCP and UDP',null,'Transmission Control Protocol supplies an ordered reliable byte stream, while User Datagram Protocol supplies independent datagrams. Applications choose the behavior their communication needs rather than assuming one transport is always better.'],
  ['@osi','Encapsulation and Transport Delivery','Messages use different delivery information at different communication layers. Transport behavior and the local-link path explain how the same application data reaches its receiver.'],
  ['Local delivery and the next hop','Local Delivery and Next-Hop Addressing','An Internet Protocol address identifies a logical destination, while a hardware address supports local-link delivery. For a remote destination, the first local frame targets the gateway rather than the remote server’s hardware address.'],
  ['@nextHopFrameDemo','IP Destinations and Per-Link Hardware Addresses','A routed exchange uses logical packet endpoints and local frame endpoints for different purposes. This no-translation example keeps the packet addresses while replacing hardware-address framing between links.'],
  ['@osiComparison','Comparing the OSI and TCP/IP Models','The seven-layer Open Systems Interconnection model and the common four-layer TCP/IP model group communication responsibilities differently. Their mapping is useful for explanation but does not impose identical software boundaries.'],
  ['@osiDevices','How Device Functions Relate to Layers','Devices perform functions associated with communication layers. A product can span several layers, so a device name alone does not establish every responsibility it performs.'],
  ['@layerBoundaryDemo','Communication Evidence at Layer Boundaries','Evidence at one functional boundary helps identify what to investigate next. A lower-level failure can prevent higher-level communication without proving that every higher layer is faulty.'],
  ['@osiTroubleshooting','Using OSI Responsibilities to Investigate Faults','A symptom can involve several communication layers rather than one exclusive cause. Comparing physical, delivery, transport, and application evidence narrows the investigation.'],
  ['Follow the next-hop addresses','Packet and Frame Addresses Along a Route','A packet can keep the same remote destination while its surrounding link frame changes at a router. Each new link needs appropriate framing for the next local hop.']
 ],
 '06-network-cables-media':[
  ['Five network media choices',null,'A transmission medium carries signals between network interfaces. Twisted-pair copper, fiber, coaxial cable, and radio differ in construction, reach, interference behavior, and installation needs.'],
  ['Three Ethernet cable categories',null,'A cable category describes specified performance characteristics for compatible Ethernet installations. Supported rate and reach also depend on the standard, connectors, channel length, and installation quality.'],
  ['Example: a room link and a building link',null,'A short room connection and a longer building connection place different demands on the medium. The chosen cable and interfaces must meet both the required rate and the full channel distance.'],
  ['@mediumBudgetDemo','Matching Media to Rate and Distance Requirements','A medium is suitable only when its selected profile supports the required rate and reach. Damaged cable or an exceeded distance limit can prevent a satisfactory link despite valid address settings.'],
  ['The Ethernet modular connector','What Is the Ethernet Modular Connector?','Twisted-pair Ethernet commonly uses an eight-position, eight-contact modular connector called RJ45. The connector must match the cable’s conductors, category, and termination requirements.'],
  ['Five cabling tool and tester functions',null,'Cabling tools prepare, terminate, or test different parts of an installation. A basic continuity tester checks wiring paths, while certification requires suitable performance measurements.'],
  ['@media','Cable Structure and Cabling Tool Functions','The internal structure of a cable determines how it carries and protects its signal. Stripping, crimping, punch-down termination, and testing each require the appropriate tool.'],
  ['Know the connector orientation first','Connector Orientation and Pin Numbering','Pin order is meaningful only when both connector ends are viewed in the same stated orientation. With contacts facing you, latch behind, and cable entering downward in this view, pin 1 is on the left.'],
  ['T568A: eight conductor positions',null,'T568A specifies which conductor occupies each of the eight contact positions. Read the color order from pin 1 to pin 8 using the stated connector orientation.'],
  ['T568B: eight conductor positions',null,'T568B is another standardized eight-contact conductor arrangement. It exchanges the orange and green pair positions relative to T568A while preserving the blue and brown positions.'],
  ['Straight-through and crossover arrangements',null,'A straight-through cable uses the same termination standard at both ends. A traditional crossover changes selected pair positions, although many modern interfaces can adjust automatically.'],
  ['Example: a straight-through patch cable',null,'Matching T568B terminations produce a straight-through conductor map. Each pin reaches the same numbered pin at the opposite end when the cable is correctly terminated.'],
  ['Prepare, terminate, and verify','Cable Preparation, Termination, and Verification','A reliable termination needs correctly arranged conductors, full insertion, and jacket strain relief. Inspection before crimping helps avoid faults that require a replacement plug.'],
  ['Three common wire-map faults',null,'A wire map identifies which contact paths connect between cable ends. Opens, shorts, and miswires describe different continuity problems and require different corrections.'],
  ['@cable','Testing an Eight-Contact Cable Wire Map','A wire-map test follows each conductor from one connector end to the other. Correct pin paths establish continuity but do not prove the cable meets its rated signal-performance category.'],
  ['@pairScanDemo','Continuity and Twisted-Pair Integrity','Straight continuity does not guarantee that conductors remain in their intended twisted pairs. A split-pair cable can pass a simple pin-to-pin check while performing poorly at network frequencies.'],
  ['Connect two buildings and repair patch cables',null,'An inter-building link must meet distance, environmental, and electrical-isolation requirements, while repairing a patch cable requires correct conductor arrangement and verified continuity.'],
  ['Termination sequence: inspect before crimping','The Cable Termination Sequence','Cable termination follows preparation, conductor arrangement, insertion, crimping, and testing. Each step protects the wiring order, pair structure, and mechanical connection.']
 ],
 '08-ip-addressing':[
  ['An address for a network interface','What Is an Internet Protocol Address?','An Internet Protocol address identifies a network interface for logical delivery. Version 4 uses 32 bits, while version 6 uses 128 bits and a different written format.'],
  ['Prefix, gateway, and DNS do different jobs','Subnet Prefix, Default Gateway, and Name Resolution','The prefix identifies which address bits describe the local network. A default gateway supports remote routes, while a Domain Name System resolver answers name queries.'],
  ['Example: read one classroom address',null,'An address and prefix place a host within a logical subnet. The same configuration also identifies a gateway for appropriate remote destinations.'],
  ['Two ways to assign an address',null,'An address can be configured manually or obtained through a configuration service. Static and dynamic assignment differ in how settings are supplied and maintained.'],
  ['Three private IPv4 ranges',null,'Private Internet Protocol version 4 ranges are reserved for use within private networks. They are not globally routed and must be distinguished from public and other special-purpose addresses.'],
  ['Eight common special-purpose IPv4 ranges',null,'Some address ranges have special uses such as loopback, link-local communication, documentation, or multicast. An address outside the private ranges is therefore not automatically a globally reachable host address.'],
  ['@ipv4','IPv4 Address Structure and Binary Representation','An Internet Protocol version 4 address contains four eight-bit octets. Binary values and the prefix explain both the written address and its network boundary.'],
  ['@bitwiseDemo','How an Address and Mask Identify the Network','A bitwise AND combines address bits with subnet-mask bits to obtain the network address. Mask ones preserve network bits, while mask zeros clear the host portion.'],
  ['Give a device a stable address','What Is Static IP Configuration?','Static configuration assigns an interface’s address settings manually. A predictable address helps infrastructure and services remain locatable when settings are managed correctly.'],
  ['Four IPv4 configuration fields',null,'A basic host configuration includes an address, subnet mask, default gateway, and name resolver. Each field has a separate purpose and must match the intended network.'],
  ['Same subnet is a two-sided decision','How Hosts Decide Whether a Peer Is Local','Each host uses its own address and mask to decide whether a peer is local. A successful local round trip needs compatible decisions and a working link in both directions.'],
  ['Example: two manually configured classroom computers',null,'Two hosts with unique usable addresses in the same subnet can communicate over a working local network. A default gateway is unnecessary for this numeric local exchange.']
,
  ['@asymmetricDemo','How Mismatched Masks Cause Asymmetric Decisions','Different subnet masks can make two hosts disagree about whether they share a local network. One host may try direct delivery while the other requires a route that is unavailable.'],
  ['Windows configuration and verification','Setting and Checking a Windows IPv4 Configuration','Windows adapter settings control an interface’s address and related options. Configuration must be verified through both inspection and an appropriate connectivity test.'],
  ['Windows static-IP configuration','Windows Static Address Configuration Procedure','Manual address configuration requires the intended adapter and a coordinated set of valid settings. Recording the original configuration supports verification and restoration after the change.'],
  ['@static','Static Address Compatibility and Reachability','Syntactically valid addresses do not guarantee that two hosts can communicate. Local subnet agreement, link availability, and any required routes determine the modeled path.'],
  ['Read a classroom configuration and configure a static printer',null,'A classroom host can use the same router address for its gateway and forwarded name-resolution service, while a printer benefits from an address coordinated outside the dynamic DHCP pool.'],
  ['Interpret an IPv4 configuration','Interpreting an IPv4 Host Configuration','A host configuration combines an address, network boundary, and optional service or routing settings. Understanding each field prevents confusing name resolution with local or remote delivery.']
 ],
 '09-basic-subnetting':[
  ['Split an address space into smaller networks','What Is Subnetting?','Subnetting divides an address block into smaller logical networks by increasing the prefix length. Each resulting block has a defined boundary and address capacity.'],
  ['Six common subnet prefixes',null,'A prefix determines how many address bits remain for hosts. A longer prefix creates a smaller block with fewer ordinary usable host addresses.'],
  ['Calculate a /26 step by step','Calculating a /26 Subnet','A /26 leaves six host bits and creates blocks of 64 addresses. Finding the block containing a host reveals its network, broadcast, and ordinary usable range.'],
  ['Example: split one /24 into four /26 networks',null,'Increasing a /24 prefix to /26 creates four equal child networks. Together they cover the parent block without overlapping.'],
  ['@partitionDemo','Dividing a Parent Network into Equal Subnets','Equal subnet division creates non-overlapping blocks with the same prefix and capacity. Their combined address counts must equal the size of the parent network.'],
  ['Prefixes at the edge','Special Prefix Cases: /31, /32, and /0','Some prefixes use conventions that differ from ordinary broadcast subnets. Point-to-point /31 links, single-address /32 routes, and the /0 default-route prefix need their own interpretation.'],
  ['@subnet','Subnet Boundaries and Usable Address Ranges','The address and prefix determine a subnet’s mask, boundary, and address count. Network, broadcast, and usable-host conventions must then be applied appropriately.'],
  ['Eight worked subnet examples',null,'The same host address can belong to different blocks when its prefix changes. Comparing eight prefixes shows how boundaries, capacity, and special conventions affect the result.'],
  ['Plan a 28-host classroom subnet',null,'Subnet planning must count every interface needing an address, including the gateway. The selected prefix should meet the current requirement and allow appropriate growth.']
 ],
 'network-protocols-services':[
  ['Three different ideas: protocol, service, and port','Three Networking Terms: Protocol, Service, and Port','A protocol defines exchange rules, a service provides a useful function, and a transport port identifies a process endpoint. These are related ideas with different meanings.'],
  ['Four TCP/IP responsibility groups',null,'The common TCP/IP model groups network functions into four responsibility areas. Application services depend on transport, Internet delivery, and local-link functions.'],
  ['Two transport services: TCP and UDP',null,'Transmission Control Protocol supplies ordered reliable bytes, while User Datagram Protocol carries independent datagrams without built-in delivery guarantees. Their differences affect how application protocols handle communication.'],
  ['Read both endpoints, not just one number','Client and Server Transport Endpoints','A client commonly uses a temporary source port to contact a server’s listening port. Addresses, ports, and transport together identify the communication context.'],
  ['@osiLayer:4','Transport Reliability and Missing Data','Transport protocols differ in their response to missing data. Transmission Control Protocol provides recovery and ordered bytes, while User Datagram Protocol leaves any needed recovery to the application.'],
  ['IP: Internet Protocol','Internet Protocol (IP)','Internet Protocol supplies logical addressing and packet delivery across networks. It provides best-effort delivery rather than an ordered reliable application stream.'],
  ['ARP: Address Resolution Protocol','Address Resolution Protocol (ARP)','Address Resolution Protocol resolves the hardware address of an IPv4 next hop on a local link. A remote destination usually requires the gateway’s local hardware address rather than the remote host’s.'],
  ['@protocolArp','How ARP Resolves a Local Next Hop','A host needs a local delivery address before sending an Ethernet frame toward an IPv4 neighbor. Address Resolution Protocol uses a local request and reply to establish that mapping.'],
  ['ICMP: Internet Control Message Protocol','Internet Control Message Protocol (ICMP)','Internet Control Message Protocol carries diagnostic and error information related to Internet Protocol delivery. Echo messages and expiry reports provide evidence without proving that every application service works.'],
  ['DHCP: Dynamic Host Configuration Protocol','Dynamic Host Configuration Protocol (DHCP)','Dynamic Host Configuration Protocol supplies leased host configuration and related options. Clients use it to obtain settings such as address, mask, gateway, and name resolver.'],
  ['@dhcp','DHCP Server and Client Protocol Endpoints','Dynamic Host Configuration Protocol version 4 uses server User Datagram Protocol port 67 and client port 68. Its initial exchange proposes, requests, and confirms an address configuration.'],
  ['DNS: Domain Name System','Domain Name System (DNS)','The Domain Name System answers queries about names using records such as host addresses and mail destinations. Name resolution supplies information for later communication rather than carrying the application traffic itself.'],
  ['@dnsCacheDemo','DNS Caching and Record Expiry','A cached name answer can be reused until its permitted lifetime expires. Server record changes may therefore remain unseen by a client until its cache entry is refreshed.'],
  ['HTTP: Hypertext Transfer Protocol','Hypertext Transfer Protocol (HTTP)','Hypertext Transfer Protocol defines requests and responses for web resources. Methods, status codes, and message content describe the requested operation and its result.'],
  ['HTTPS: HTTP protected by TLS','Hypertext Transfer Protocol Secure (HTTPS)','Hypertext Transfer Protocol Secure protects web communication using Transport Layer Security. Certificate validation and authenticated encryption protect the connection without guaranteeing that the website’s content is trustworthy.'],
  ['Example: open a protected school website',null,'Opening a protected website combines name resolution with a secure application exchange. The resolver supplies an address, while the browser exchanges web traffic with the server.'],
  ['@protocolWeb','How Protocols Cooperate in a Web Request','A web request depends on local delivery, name resolution, transport, connection security, and the web service. A failure at one stage produces different evidence from a failure at another.'],
  ['FTP: File Transfer Protocol','File Transfer Protocol (FTP)','File Transfer Protocol transfers files using separate control and data connections. Plain transfers do not encrypt credentials or content, and active and passive modes use different data-connection arrangements.'],
  ['SSH: Secure Shell','Secure Shell (SSH)','Secure Shell provides authenticated encrypted remote access and channels. Checking server identity and user authorization is part of establishing a trusted connection.'],
  ['SFTP: SSH File Transfer Protocol','Secure Shell File Transfer Protocol (SFTP)','Secure Shell File Transfer Protocol provides file operations through an encrypted Secure Shell connection. It is a different protocol from plain File Transfer Protocol or that protocol protected with Transport Layer Security.'],
  ['Three email protocol roles',null,'Email uses different protocols to send mail and access received messages. Submission and relay use Simple Mail Transfer Protocol, while retrieval or synchronization uses mailbox-access protocols.'],
  ['Seven common email service ports',null,'Email service ports distinguish relay, submission, and mailbox-access endpoints. Implicit encryption starts at connection setup, while a negotiated upgrade begins within an existing protocol session.'],
  ['@protocolMail','Email Submission, Relay, and Mailbox Access','Sending mail and reading a mailbox are separate operations. Submission and relay deliver messages between systems, while mailbox protocols control how clients retrieve or synchronize them.'],
  ['SNMP: Simple Network Management Protocol','Simple Network Management Protocol (SNMP)','Simple Network Management Protocol reads or manages information from network devices and sends notifications. Its security depends on the version, credentials, and configured protection mode.'],
  ['NTP: Network Time Protocol','Network Time Protocol (NTP)','Network Time Protocol uses exchanges with time sources to synchronize clocks. Consistent time supports useful logs and time-sensitive operations without selecting an operating-system time zone.'],
  ['@protocolDirectory','Network Protocol Functions and Common Ports','Protocol and port references identify conventional service roles and endpoint bindings. The transport must accompany the number, and some network protocols have no transport port at all.']
 ],
 '11-dhcp':[
  ['A lease supplies configuration','What Is a DHCP Lease?','A lease grants temporary use of an address supplied by Dynamic Host Configuration Protocol. The server also provides options such as mask, gateway, and name resolver.'],
  ['Four messages in the initial DHCP exchange',null,'Initial allocation commonly follows Discover, Offer, Request, and Acknowledgment. These messages locate a server, propose settings, select an offer, and confirm the lease.'],
  ['Example: a laptop receives a lease',null,'A new laptop can obtain address settings from an available configuration server. The confirmed lease must use an address that does not conflict with another active allocation.'],
  ['Five lease lifecycle and failure events',null,'Leases can be renewed, released, or allowed to expire. Unavailable servers and exhausted pools create different failures even when the client’s physical connection works.'],
  ['Read a DHCP configuration and lease','Interpreting Automatic Configuration and Lease Details','Automatic configuration includes more than a host address. Lease lifetime, gateway, resolver, and server information help explain which settings the client received.'],
  ['@dhcp','How DHCP Allocates and Maintains Leases','An authorized configuration server allocates unique available addresses from its managed pool. Confirmed leases remain assigned until release, expiry, or a valid lifecycle change.'],
  ['@reservedPoolDemo','Reservations, Exclusions, and Available Addresses','Reservations associate selected clients with managed addresses, while exclusions remove addresses from general allocation. Active leases and these rules determine whether an address remains available.'],
  ['Thirty laptops join a lab',null,'A working wireless connection does not guarantee an available address lease. When client demand exceeds the free pool, some clients cannot obtain the intended configuration.']
 ],
 '12-router-wireless':[
  ['Three gateway interface and translation concepts',null,'A combined gateway connects local clients to another network through separate interface roles. Address translation can change packet addresses, but it does not replace routing or access-control policy.'],
  ['Wireless identity and protection','Wireless Network Names, Authentication, and Isolation','A Service Set Identifier names a wireless network, while authentication controls who can join it. Guest isolation is a separate policy controlling access to private resources.'],
  ['Two protected Wi-Fi security options',null,'Protected wireless access needs a security mode supported by both access point and clients. Modern personal-network options use suitable authentication and encryption rather than relying on a hidden network name.'],
  ['Example: a laptop joins classroom Wi-Fi',null,'A laptop needs successful wireless authentication and association before useful network access. Address configuration and upstream service must then work independently of the radio connection.'],
  ['Change settings in a safe order','Coordinating Router Address, Pool, and Wireless Settings','Router settings affect both management access and client connectivity. A compatible local address, allocation pool, and wireless configuration reduce avoidable disconnections.'],
  ['Router configuration sequence','Applying and Verifying Router Configuration','A router change must be followed by reconnecting clients and checking their received settings. Local access, name resolution, and upstream service provide different verification evidence.'],
  ['@router','Router LAN and Wireless Configuration','A small gateway can combine local addressing, automatic configuration, and wireless access. Those settings must agree before clients can use the intended services.'],
  ['@guestIsolationDemo','Guest Isolation and Internet Reachability','Guest isolation can permit Internet use while blocking access to staff resources. Wireless association, isolation policy, local services, and the upstream connection remain separate conditions.'],
  ['A small training center',null,'Staff and visitors may share an Internet connection without sharing access to internal files. A correctly configured guest network separates those access needs.']
 ],
 '13-file-printer-sharing':[
  ['A host provides a shared resource','What Is a Network Share?','A network share makes a resource available to authorized clients through a hosting device. The host and required service must remain reachable for remote access.'],
  ['Two permission gates for remote file access',null,'Remote access to a Windows file share depends on share permissions and underlying file-system permissions. Both gates must allow the requested operation for access to succeed.'],
  ['Example: students read a shared reference folder',null,'A shared folder can permit reading while denying remote edits. The effective result depends on both permission sets rather than the more generous setting alone.'],
  ['Share safely on trusted networks','Controlled Access to Shared Files and Printers','Sharing should give named users only the access their work requires. A reachable host still needs suitable identity, permission, service, and client support.'],
  ['Windows folder sharing','Publishing and Accessing a Windows Shared Folder','Publishing a folder creates a network access path to a resource on the host. Remote verification must check the intended client identity and both permission layers.'],
  ['@sharing','How Share and File-System Permissions Combine','Effective remote permissions are limited by every applicable access gate in this simplified model. Network reachability alone cannot override an unshared resource or denied operation.'],
  ['@printQueueDemo','How a Shared Printer Queue Processes Jobs','A shared printer queue retains accepted jobs and processes their pages in arrival order. Device outages pause processing, while submission permissions determine whether new jobs can enter the queue.'],
  ['Read-only reference files and controlled editing',null,'Reference files and editable working documents can require different access policies. Named accounts and remote permission checks help keep changes limited to authorized contributors.']
 ],
 '14-network-troubleshooting':[
  ['Observe before changing','A Systematic Network Troubleshooting Method','Troubleshooting starts by defining the symptom and collecting evidence. A justified change is followed by repeating the original failing test and documenting the result.'],
  ['Six Windows diagnostic commands',null,'Diagnostic commands inspect configuration, reachability, name resolution, or neighbor information. Each answers a limited question rather than proving that the whole network works.'],
  ['Nine modeled network faults',null,'Similar symptoms can come from different physical, addressing, service, or permission faults. Distinguishing the cause requires evidence tied to the failed operation.'],
  ['Example: numeric access works but a name fails',null,'A successful numeric service test and a failed name query point to different functional results. Name-resolution settings and reachability deserve investigation before replacing an already working link.'],
  ['@ttlTraceDemo','What Traceroute Replies and Gaps Mean','Traceroute uses limited-lifetime probes to obtain evidence from successive hops. A missing reply can reflect filtering, while an explicit unreachable response provides different evidence about the path.'],
  ['Test the theory and verify the repair','Testing a Hypothesis and Confirming a Repair','A troubleshooting hypothesis should explain the available evidence and predict a useful test. A repair is confirmed by repeating the original failed operation, not by assuming that a changed setting solved it.'],
  ['A fault-to-repair demonstration','From Symptom to Verified Network Repair','A complete investigation connects the reported symptom to observations, a likely cause, and a targeted correction. The final retest checks whether the user’s original operation now succeeds.'],
  ['@troubleshoot','Diagnosing Configuration, Connectivity, and Service Faults','Different command results expose different parts of the network state. Comparing them supports a targeted repair rather than unrelated configuration changes.'],
  ['“The network is down”','Separating Local Connectivity, Internet Access, and DNS','Reaching a local gateway does not prove that remote routes, name resolution, or a website work. Separate tests identify which stage succeeds and which still needs investigation.']
 ]
};

export function clarifyTopic(topic){
 const entries=copy[topic.id];
 if(!entries)throw new Error(`Missing concept copy for ${topic.id}`);
 const used=new Set();
 const slides=topic.slides.map(slide=>{
  if(['title','objectives','summary'].includes(slide.kind))return {...slide};
  const key=slide.type?`@${slide.type}${slide.layer?`:${slide.layer}`:''}`:slide.title;
  const entry=entries.find(([selector])=>selector===key);
  if(!entry)throw new Error(`Missing concept explanation: ${topic.id} / ${key}`);
  if(used.has(key))throw new Error(`Duplicate concept copy target: ${key}`);
  used.add(key);
  return {...slide,title:entry[1]||slide.title,lead:entry[2]};
 });
 if(used.size!==entries.length)throw new Error(`Unused concept copy in ${topic.id}`);
 return {...topic,slides:slides.map((slide,i)=>({...slide,notes:{...slide.notes,
  opening:slide.kind==='title'?slide.notes.opening:slide.lead||slide.notes.opening,
  transition:i<slides.length-1?`Next: ${slides[i+1].title}. Connect the current explanation to that discussion.`:'The discussion is complete. Return to Topics.'
 }}))};
}
