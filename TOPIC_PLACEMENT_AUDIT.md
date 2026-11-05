# Topic placement audit

## OSI clarity update

The simplified school webpage layer demonstrations are scoped to Topic 5. The separate TCP/UDP comparison in Network Protocols and Services retains its original functionality. TCP/IP grouping is taught on its dedicated comparison slide instead of repeated inside the OSI stack explorer. No topic identities or slide positions changed.

Reviewed all **225 slides in 16 topics**, including the 19 automatic example plans and registered simulation content. This review checks topic ownership and teaching purpose; it is distinct from the earlier slide-order review.

## Scope correction after classroom review

The earlier assessment accepted too much repetition in Topic 1. Its extra classroom-message simulation and two printer application/walkthrough slides have now been removed. Topic 1 contains ten slides and retains one introductory visual sharing example. Following approval of a broader introduction, Topic 1 was expanded to fifteen slides with brief previews and a new basic request/response scene. The current table reflects that agreed scope.

## Findings

- **No entire slide was clearly assigned to an incorrect topic.** No cross-topic transfers were needed.
- **One simulation focus was corrected:** Topic 3, slide 5, the six-endpoint star. Its shared diagram previously reused a print-job narrative; it now demonstrates six independent links, an endpoint-to-endpoint path, a failed spoke, and central-switch failure scope.
- Related concepts intentionally recur. A printer is a sharing example in Topic 1, a local-network example in Topic 2, an endpoint in Topic 3, an addressing use case in Topic 12, and an administered service in Topic 15. These are different teaching purposes.
- Topic 6 slides 3–4 are supporting model review, not misplaced OSI lessons. Topic 11 slide 13 appropriately teaches DHCP protocol/endpoints, although its shared simulator also exposes broader lease/pool controls. Topic 13 remains the dedicated administration lesson. Neither warrants moving an entire slide into a topic that already covers it.

## Ownership boundaries

| Related topics | Intended distinction |
|---|---|
| 1, 2, 3, 15 | Basic sharing; network classification; physical layout; resource administration |
| 4, 5, 6 | Device function; model responsibility; message delivery |
| 7, 8 | Media and tool selection; conductor order and termination/test procedure |
| 9, 10, 12 | Address interpretation; subnet creation/calculation; manual configuration |
| 11, 13, 14 | Protocol behavior/ports; lease administration; combined router configuration |
| 5, 16 | Layer-related evidence; command-based diagnosis and repair |

## Every-slide assessment

“Core” means the slide directly teaches its topic. “Supporting context” means another topic owns the detailed treatment, but this slide applies it for a relevant purpose. Supporting context does not mean incorrectly placed. Structural title/objective/summary slides remain assigned to their own lesson.

### Topic 1: Introduction to Networking

Scope: approved introductory previews of familiar uses, components, links, local versus Internet access, communication elements, benefits/risks, and performance. Detailed configuration and mechanisms remain in later lessons.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Introduction to Networking | Core | Supports the introductory learning objectives. |
| 2 | Learning Objectives | Core | Supports the introductory learning objectives. |
| 3 | What Is a Computer Network? | Core | Supports the introductory learning objectives. |
| 4 | Everyday Uses of Networks | Core | Supports the introductory learning objectives. |
| 5 | Basic Network Components | Introductory preview | Recognizes components and connection methods without detailed configuration. |
| 6 | How Devices Connect | Introductory preview | Recognizes components and connection methods without detailed configuration. |
| 7 | Local Network vs. Internet | Introductory preview | Separates local resource availability from remote Internet reachability. |
| 8 | Example: one printer, five connected computers | Core | Supports the introductory learning objectives. |
| 9 | Five Elements of Data Communication | Core | Supports the introductory learning objectives. |
| 10 | A Simple Data Exchange | Introductory preview | Uses request/response roles without protocol headers or ports. |
| 11 | Three Benefits of Networking | Core | Supports the introductory learning objectives. |
| 12 | Two Risks of Networking | Core | Supports the introductory learning objectives. |
| 13 | Two Performance Measures: Bandwidth and Latency | Core | Supports the introductory learning objectives. |
| 14 | Bandwidth, delay, and file delivery | Core | Supports the introductory learning objectives. |
| 15 | Summary of the Discussion | Core | Supports the introductory learning objectives. |

### Topic 2: Types of Networks and Network Architecture

Scope: Geographic network types, service architectures, and wired/wireless classification.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Types of Networks and Network Architecture | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | Four network coverage types | Core | Direct discussion or application within the scope stated above. |
| 4 | Personal Area Network (PAN) | Core | Applies the topic’s concepts through a diagram and automatic example. |
| 5 | Local Area Network (LAN) | Core | Applies the topic’s concepts through a diagram and automatic example. |
| 6 | Metropolitan Area Network (MAN) | Core | Applies the topic’s concepts through a diagram and automatic example. |
| 7 | Wide Area Network (WAN) | Core | Applies the topic’s concepts through a diagram and automatic example. |
| 8 | Two network service architectures | Core | Direct discussion or application within the scope stated above. |
| 9 | Resource Availability in Peer-to-Peer and Client-Server Networks | Core | Demonstrates the topic’s stated function or calculation. |
| 10 | Two link choices: wired and wireless | Supporting context | Media are introduced only to distinguish access/link choices; installation detail remains in Topics 7–8. |
| 11 | Network Coverage and Service Architecture | Core | Demonstrates the topic’s stated function or calculation. |
| 12 | A school with two campuses | Supporting context | Campus and file-service examples combine geographic coverage and service architecture. |
| 13 | Classifying One Organization’s Networks | Supporting context | The same organization is classified independently by reach, medium, and service roles. |
| 14 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 3: Network Topologies and Basic Network Design

Scope: connection patterns, six consecutive examples with matching explanatory/failure coverage, general simulations, then design. No topology receives a redundant standalone walkthrough.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Network Topologies and Basic Network Design | Lesson structure | Supports topology understanding, comparison, or design. |
| 2 | Learning Objectives | Lesson structure | Supports topology understanding, comparison, or design. |
| 3 | Two Views of Topology: Physical and Logical | Core | Supports topology understanding, comparison, or design. |
| 4 | Six network topologies | Core | Supports topology understanding, comparison, or design. |
| 5 | Star Topology | Core | Explains its own connections, path, and failure behavior. |
| 6 | Bus Topology | Core | Explains its own connections, path, and failure behavior. |
| 7 | Ring Topology | Core | Explains its own connections, path, and failure behavior. |
| 8 | Mesh Topology | Core | Explains its own connections, path, and failure behavior. |
| 9 | Tree Topology | Core | Explains its own connections, path, and failure behavior. |
| 10 | Hybrid Topology | Core | Explains its own connections, path, and failure behavior. |
| 11 | What Happens When a Link or Device Fails? | Core | Supports topology understanding, comparison, or design. |
| 12 | Following a Path Between Network Devices | Core | Supports topology understanding, comparison, or design. |
| 13 | Choosing a Network Topology | Core | Supports topology understanding, comparison, or design. |
| 14 | Design an eight-seat computer lab | Core | Supports topology understanding, comparison, or design. |
| 15 | Summary of the Discussion | Lesson structure | Supports topology understanding, comparison, or design. |

### Topic 4: Network Devices and Components

Scope: Hardware roles, interfaces, local switching, and routing responsibilities.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Network Devices and Components | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | Nine common network devices | Core | Direct discussion or application within the scope stated above. |
| 4 | How Interfaces and Switches Connect Local Devices | Core | Direct discussion or application within the scope stated above. |
| 5 | How a Switch Learns Hardware Addresses | Supporting context | MAC learning demonstrates the job of a switch. Layer theory and broader protocol exchanges remain in Topics 5–6/11. |
| 6 | Routers, Access Points, and Provider Connections | Core | Direct discussion or application within the scope stated above. |
| 7 | Example: the switch and router have different jobs | Supporting context | Local printer and remote provider paths distinguish switch versus router roles. |
| 8 | Network Interfaces, Link Indicators, and Firewalls | Core | Direct discussion or application within the scope stated above. |
| 9 | Recognizing Network Devices and Their Functions | Core | Demonstrates the topic’s stated function or calculation. |
| 10 | Expand a small office | Supporting context | Address services are mentioned to avoid choosing duplicate infrastructure; this is hardware planning, not DHCP administration. |
| 11 | Device Roles Along a Network Path | Core | Direct discussion or application within the scope stated above. |
| 12 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 5: Open Systems Interconnection (OSI) Reference Model

Scope: The seven OSI responsibilities, encapsulation, model mapping, and layer-related evidence.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Open Systems Interconnection (OSI) Reference Model | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | What Is the Open Systems Interconnection (OSI) Reference Model? | Core | Demonstrates the topic’s stated function or calculation. |
| 4 | The Seven Layers of the Open Systems Interconnection (OSI) Model | Core | Demonstrates the topic’s stated function or calculation. |
| 5 | Layer 7: Application | Supporting context | Application protocols are examples of Layer 7 responsibility, not a full replacement for Topic 11. |
| 6 | Layer 6: Presentation | Supporting context | Encoding demonstrates Presentation responsibility. |
| 7 | Layer 5: Session | Supporting context | Dialog states illustrate Session responsibility. |
| 8 | Layer 4: Transport | Supporting context | Transport behavior explains Layer 4 using TCP/UDP. |
| 9 | Layer 3: Network | Supporting context | Logical delivery illustrates Network responsibility. |
| 10 | Layer 2: Data Link | Supporting context | Frame forwarding illustrates Data Link responsibility. |
| 11 | Layer 1: Physical | Supporting context | Physical signals illustrate Physical responsibility. |
| 12 | How the Seven Open Systems Interconnection (OSI) Layers Work Together | Core | Highlights seven sender responsibilities downward, then seven receiver responsibilities upward, using Hello! rather than a web request. |
| 13 | Encapsulation and Decapsulation | Core | An editable message is carried inside nested delivery wrappers, then recovered unchanged; distinct from the prior responsibility overview. |
| 14 | Comparing the Open Systems Interconnection (OSI) and Transmission Control Protocol (TCP)/Internet Protocol (IP) Models | Core | Demonstrates the topic’s stated function or calculation. |
| 15 | How Device Functions Relate to Layers | Supporting context | Devices are mapped to functions; device selection remains in Topic 4. |
| 16 | Communication Evidence at Layer Boundaries | Supporting context | Functional evidence is organized by layer, while command-based fault repair remains in Topic 16. |
| 17 | Using Open Systems Interconnection (OSI) Responsibilities to Investigate Faults | Supporting context | Diagnostics demonstrate the purpose of a layer model, not an unrelated troubleshooting module. |
| 18 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 6: Network Communication Fundamentals

Scope: How messages are encapsulated and delivered using transport, network, and link functions.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Network Communication Fundamentals | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | Seven Open Systems Interconnection (OSI) layer responsibilities | Supporting context | A compact review of Topic 5 supplies prerequisites for the message-delivery discussion. |
| 4 | Four layers in the Transmission Control Protocol (TCP)/Internet Protocol (IP) model | Supporting context | The four-layer model review supports the following encapsulation path. |
| 5 | What Is Encapsulation? | Core | Direct discussion or application within the scope stated above. |
| 6 | Example: a message gains delivery information | Core | Applies the topic’s concepts through a diagram and automatic example. |
| 7 | Two transport services: Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) | Supporting context | TCP/UDP behavior is needed to distinguish transport data units; detailed service ports remain in Topic 11. |
| 8 | Local Delivery and Next-Hop Addressing | Supporting context | ARP/gateway behavior is introduced only to explain local versus remote delivery. |
| 9 | Encapsulation and Transport Delivery | Core | Demonstrates the topic’s stated function or calculation. |
| 10 | Packet and Frame Addresses Along a Route | Core | Direct discussion or application within the scope stated above. |
| 11 | Internet Protocol (IP) Destinations and Per-Link Hardware Addresses | Core | Demonstrates the topic’s stated function or calculation. |
| 12 | Open a school website | Supporting context | The website is an integrated message-delivery application; detailed web service faults remain in Topic 11. |
| 13 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 7: Network Cables, Media, and Tools

Scope: Physical media, category/reach limits, connector recognition, and tool purposes.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Network Cables, Media, and Tools | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | Five network media choices | Core | Direct discussion or application within the scope stated above. |
| 4 | Three Ethernet cable categories | Core | Direct discussion or application within the scope stated above. |
| 5 | Example: a room link and a building link | Core | Applies the topic’s concepts through a diagram and automatic example. |
| 6 | Matching Media to Rate and Distance Requirements | Core | Demonstrates the topic’s stated function or calculation. |
| 7 | What Is the Ethernet Modular Connector? | Supporting context | Connector recognition and compatibility are appropriate here; pin order and crimping remain in Topic 8. |
| 8 | Five cabling tool and tester functions | Supporting context | Identifying tool purposes belongs to media/tools; hands-on termination detail remains in Topic 8. |
| 9 | Cable Structure and Cabling Tool Functions | Supporting context | Cross-sections and tool selection reinforce physical-media identification. |
| 10 | Connect two buildings | Core | Direct discussion or application within the scope stated above. |
| 11 | Selecting Media and Tools for an Installation | Supporting context | The inspection procedure concerns selecting media and tools, with limited termination context. |
| 12 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 8: Registered Jack 45 (RJ45) Crimping, Color Coding, and Cable Testing

Scope: Connector orientation, conductor orders, termination, and cable-test interpretation.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Registered Jack 45 (RJ45) Crimping, Color Coding, and Cable Testing | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | Connector Orientation and Pin Numbering | Core | Direct discussion or application within the scope stated above. |
| 4 | T568A: eight conductor positions | Core | Direct discussion or application within the scope stated above. |
| 5 | T568B: eight conductor positions | Core | Direct discussion or application within the scope stated above. |
| 6 | Straight-through and crossover arrangements | Core | Direct discussion or application within the scope stated above. |
| 7 | Example: a straight-through patch cable | Core | Applies the topic’s concepts through a diagram and automatic example. |
| 8 | Cable Preparation, Termination, and Verification | Core | Direct discussion or application within the scope stated above. |
| 9 | The Cable Termination Sequence | Core | Direct discussion or application within the scope stated above. |
| 10 | Three common wire-map faults | Core | Direct discussion or application within the scope stated above. |
| 11 | Testing an Eight-Contact Cable Wire Map | Core | Demonstrates the topic’s stated function or calculation. |
| 12 | Continuity and Twisted-Pair Integrity | Core | Demonstrates the topic’s stated function or calculation. |
| 13 | Repair a failed classroom patch cable | Supporting context | Repair is scoped to the cable and its test results; general multi-function diagnosis remains in Topic 16. |
| 14 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 9: Internet Protocol (IP) Addressing Fundamentals

Scope: Address syntax, binary representation, masks, address ranges, and configuration-field meaning.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Internet Protocol (IP) Addressing Fundamentals | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | What Is an Internet Protocol Address? | Core | Direct discussion or application within the scope stated above. |
| 4 | Subnet Prefix, Default Gateway, and Name Resolution | Supporting context | Prefix/gateway/DNS are configuration-field meanings; service exchanges and manual setup remain in Topics 11–12. |
| 5 | Example: read one classroom address | Supporting context | A fixed /24 example illustrates address interpretation, not advanced network planning. |
| 6 | Two ways to assign an address | Supporting context | Static and dynamic are assignment categories here; their implementation remains in Topics 12–13. |
| 7 | Three private Internet Protocol version 4 (IPv4) ranges | Core | Direct discussion or application within the scope stated above. |
| 8 | Eight common special-purpose Internet Protocol version 4 (IPv4) ranges | Core | Direct discussion or application within the scope stated above. |
| 9 | Internet Protocol version 4 (IPv4) Address Structure and Binary Representation | Core | Demonstrates the topic’s stated function or calculation. |
| 10 | How an Address and Mask Identify the Network | Supporting context | Address AND mask is the foundation of network identification. Child-subnet creation and host planning remain in Topic 10. |
| 11 | Interpreting an Internet Protocol version 4 (IPv4) Host Configuration | Supporting context | Interpreting fields and ranges reinforces address literacy without changing an operating-system adapter. |
| 12 | Read a classroom configuration | Supporting context | Configuration is read rather than administered. |
| 13 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 10: Basic Internet Protocol (IP) Subnetting

Scope: Creating and calculating subnet blocks, usable ranges, and host capacity.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Basic Internet Protocol (IP) Subnetting | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | What Is Subnetting? | Core | Direct discussion or application within the scope stated above. |
| 4 | Six common subnet prefixes | Core | Direct discussion or application within the scope stated above. |
| 5 | Calculating a /26 Subnet | Core | Direct discussion or application within the scope stated above. |
| 6 | Example: split one /24 into four /26 networks | Core | Applies the topic’s concepts through a diagram and automatic example. |
| 7 | Dividing a Parent Network into Equal Subnets | Core | Demonstrates the topic’s stated function or calculation. |
| 8 | Special Prefix Cases: /31, /32, and /0 | Supporting context | Host-route and point-to-point exceptions qualify the subnet calculation rules rather than teaching router administration. |
| 9 | Subnet Boundaries and Usable Address Ranges | Core | Demonstrates the topic’s stated function or calculation. |
| 10 | Eight worked subnet examples | Core | Direct discussion or application within the scope stated above. |
| 11 | Plan a 28-host classroom subnet | Core | Direct discussion or application within the scope stated above. |
| 12 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 11: Network Protocols and Services

Scope: Protocol functions, ports, service relationships, security distinctions, and exchange behavior.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Network Protocols and Services | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | Three Networking Terms: Protocol, Service, and Port | Core | Direct discussion or application within the scope stated above. |
| 4 | Four Transmission Control Protocol (TCP)/Internet Protocol (IP) responsibility groups | Core | Direct discussion or application within the scope stated above. |
| 5 | Two transport services: Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) | Core | Direct discussion or application within the scope stated above. |
| 6 | Client and Server Transport Endpoints | Core | Direct discussion or application within the scope stated above. |
| 7 | Transport Reliability and Missing Data | Supporting context | TCP/UDP loss comparison explains transport protocol behavior; its layer interpretation also appears in Topic 5. |
| 8 | Internet Protocol (IP) | Core | Direct discussion or application within the scope stated above. |
| 9 | Address Resolution Protocol (ARP) | Core | Direct discussion or application within the scope stated above. |
| 10 | How Address Resolution Protocol (ARP) Resolves a Local Next Hop | Supporting context | ARP next-hop behavior is a protocol exchange here; local/remote delivery is introduced in Topic 6. |
| 11 | Internet Control Message Protocol (ICMP) | Core | Direct discussion or application within the scope stated above. |
| 12 | Dynamic Host Configuration Protocol (DHCP) | Core | Direct discussion or application within the scope stated above. |
| 13 | Dynamic Host Configuration Protocol (DHCP) Server and Client Protocol Endpoints | Supporting context | DHCP illustrates Application-over-UDP endpoints 67/68 and initial exchange. Its reused interface also exposes lease/pool controls; full administration is taught in Topic 13. |
| 14 | Domain Name System (DNS) | Core | Direct discussion or application within the scope stated above. |
| 15 | Domain Name System (DNS) Caching and Record Expiry | Supporting context | Caching and expiry are DNS service behavior, not an unrelated troubleshooting detour. |
| 16 | Hypertext Transfer Protocol (HTTP) | Core | Direct discussion or application within the scope stated above. |
| 17 | Hypertext Transfer Protocol Secure (HTTPS) | Core | Direct discussion or application within the scope stated above. |
| 18 | Example: open a protected school website | Supporting context | A protected web request shows protocol cooperation. |
| 19 | How Protocols Cooperate in a Web Request | Supporting context | Service faults are used to distinguish which protocol stage succeeded or failed. |
| 20 | File Transfer Protocol (FTP) | Core | Direct discussion or application within the scope stated above. |
| 21 | Secure Shell (SSH) | Core | Direct discussion or application within the scope stated above. |
| 22 | Secure Shell File Transfer Protocol (SFTP) | Core | Direct discussion or application within the scope stated above. |
| 23 | Three email protocol roles | Core | Direct discussion or application within the scope stated above. |
| 24 | Seven common email service ports | Core | Direct discussion or application within the scope stated above. |
| 25 | Email Submission, Relay, and Mailbox Access | Core | Demonstrates the topic’s stated function or calculation. |
| 26 | Simple Network Management Protocol (SNMP) | Core | Direct discussion or application within the scope stated above. |
| 27 | Network Time Protocol (NTP) | Core | Direct discussion or application within the scope stated above. |
| 28 | Network Protocol Functions and Common Ports | Supporting context | The directory consolidates protocol functions and bindings; it is not a device configuration lesson. |
| 29 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 12: Static Internet Protocol (IP) Configuration

Scope: Manually setting valid configuration and evaluating local/routed host decisions.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Static Internet Protocol (IP) Configuration | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | What Is Static Internet Protocol (IP) Configuration? | Core | Direct discussion or application within the scope stated above. |
| 4 | Four Internet Protocol version 4 (IPv4) configuration fields | Core | Direct discussion or application within the scope stated above. |
| 5 | How Hosts Decide Whether a Peer Is Local | Supporting context | Subnet decisions determine whether a manually configured pair is compatible. |
| 6 | Example: two manually configured classroom computers | Supporting context | The example applies address/mask knowledge to a configured pair. |
| 7 | How Mismatched Masks Cause Asymmetric Decisions | Supporting context | Mismatched masks explain a concrete manual-configuration failure. |
| 8 | Setting and Checking a Windows Internet Protocol version 4 (IPv4) Configuration | Core | Direct discussion or application within the scope stated above. |
| 9 | Windows Static Address Configuration Procedure | Core | Direct discussion or application within the scope stated above. |
| 10 | Static Address Compatibility and Reachability | Core | Demonstrates the topic’s stated function or calculation. |
| 11 | A printer needs a predictable address | Supporting context | A printer is an example of a predictable endpoint address, not a printer-sharing lesson. |
| 12 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 13: Dynamic Host Configuration Protocol (DHCP)

Scope: Automatic address assignment, leases, pool management, reservations, and service failures.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Dynamic Host Configuration Protocol (DHCP) | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | What Is a Dynamic Host Configuration Protocol (DHCP) Lease? | Core | Direct discussion or application within the scope stated above. |
| 4 | Four messages in the initial Dynamic Host Configuration Protocol (DHCP) exchange | Core | Direct discussion or application within the scope stated above. |
| 5 | Example: a laptop receives a lease | Core | Applies the topic’s concepts through a diagram and automatic example. |
| 6 | Five lease lifecycle and failure events | Core | Direct discussion or application within the scope stated above. |
| 7 | Interpreting Automatic Configuration and Lease Details | Core | Direct discussion or application within the scope stated above. |
| 8 | How Dynamic Host Configuration Protocol (DHCP) Allocates and Maintains Leases | Core | Demonstrates the topic’s stated function or calculation. |
| 9 | Reservations, Exclusions, and Available Addresses | Core | Demonstrates the topic’s stated function or calculation. |
| 10 | Thirty laptops join a lab | Supporting context | The laptop scenario diagnoses pool capacity as a DHCP-specific condition. |
| 11 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 14: Router and Wireless Network Configuration

Scope: Gateway interfaces, wireless association/security, local configuration, and isolation.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Router and Wireless Network Configuration | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | Three gateway interface and translation concepts | Supporting context | Gateway interface/NAT roles are required before configuring the combined device. |
| 4 | Wireless Network Names, Authentication, and Isolation | Core | Direct discussion or application within the scope stated above. |
| 5 | Two protected Wi-Fi security options | Core | Direct discussion or application within the scope stated above. |
| 6 | Example: a laptop joins classroom Wi-Fi | Supporting context | The wireless example includes automatic configuration only after association. |
| 7 | Coordinating Router Address, Pool, and Wireless Settings | Core | Direct discussion or application within the scope stated above. |
| 8 | Applying and Verifying Router Configuration | Core | Direct discussion or application within the scope stated above. |
| 9 | Router Local Area Network (LAN) and Wireless Configuration | Supporting context | The console combines LAN, DHCP, and Wi-Fi settings as router administration. |
| 10 | Guest Isolation and Internet Reachability | Supporting context | Guest isolation and upstream service are router policy/path distinctions. |
| 11 | A small training center | Core | Direct discussion or application within the scope stated above. |
| 12 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 15: Network File and Printer Sharing

Scope: Resource hosting, remote permissions, folder access, and shared printing.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Network File and Printer Sharing | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | What Is a Network Share? | Core | Direct discussion or application within the scope stated above. |
| 4 | Two permission gates for remote file access | Core | Direct discussion or application within the scope stated above. |
| 5 | Example: students read a shared reference folder | Core | Applies the topic’s concepts through a diagram and automatic example. |
| 6 | Controlled Access to Shared Files and Printers | Core | Direct discussion or application within the scope stated above. |
| 7 | Publishing and Accessing a Windows Shared Folder | Core | Direct discussion or application within the scope stated above. |
| 8 | How Share and File-System Permissions Combine | Core | Demonstrates the topic’s stated function or calculation. |
| 9 | How a Shared Printer Queue Processes Jobs | Supporting context | FIFO page processing models the shared printer service; it is not a separate data-structures lesson. |
| 10 | Read-only reference files and controlled editing | Supporting context | The file-access application integrates named users, permissions, and reachable resources. |
| 11 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

### Topic 16: Network Testing and Troubleshooting

Scope: Using independent evidence to identify faults, correct them, and verify the original operation.

| Slide | Title | Placement | Assessment |
|---|---|---|---|
| 1 | Network Testing and Troubleshooting | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 2 | Learning Objectives | Lesson structure | Frames or consolidates this topic’s own objectives. |
| 3 | A Systematic Network Troubleshooting Method | Core | Direct discussion or application within the scope stated above. |
| 4 | Six Windows diagnostic commands | Core | Direct discussion or application within the scope stated above. |
| 5 | Nine modeled network faults | Supporting context | The fault list intentionally revisits addressing, DHCP, DNS, wireless, and sharing as possible causes. |
| 6 | Example: numeric access works but a name fails | Supporting context | DNS versus numeric access is a diagnostic comparison, not a full DNS protocol lesson. |
| 7 | What Traceroute Replies and Gaps Mean | Supporting context | TTL-expiry evidence is interpreted for diagnosis; detailed protocol roles remain in Topic 11. |
| 8 | Testing a Hypothesis and Confirming a Repair | Core | Direct discussion or application within the scope stated above. |
| 9 | From Symptom to Verified Network Repair | Core | Direct discussion or application within the scope stated above. |
| 10 | Diagnosing Configuration, Connectivity, and Service Faults | Supporting context | The bench combines fault evidence from earlier topics for integrated diagnosis. |
| 11 | Separating Local Connectivity, Internet Access, and Domain Name System (DNS) | Supporting context | The website scenario tests hypotheses rather than re-teaching web protocols. |
| 12 | Summary of the Discussion | Lesson structure | Frames or consolidates this topic’s own objectives. |

## Verification boundaries

Verification completed: **367 tests passed across fourteen files**, and the production build passed. The assessment uses current source content, registered slide data, and automatic scenario behavior. Regression tests check all slides, topic identities, playback, and the corrected star narrative; the production build is checked separately. A topic-placement review is an editorial assessment, not a new classroom trial or visual projector acceptance.
