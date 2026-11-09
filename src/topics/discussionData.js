// Instructor discussion content replaces student task sheets, without losing
// the useful configuration procedures or technical verification guidance.
export const discussionData={
 '01-introduction-to-networking':{
  walkthrough:{title:'Follow a shared-printer request',items:['The sending PC creates print data and addresses a reachable printer service. The switch connects the local devices.','Copper or radio carries the signals; compatible protocols let the printer interpret the message.','The printer receives the document and can return status information. Communication roles depend on the direction of each message.','If the Internet uplink fails, correctly configured local printing can continue. A failed PC cable isolates that PC; a failed central switch affects its attached devices.']},
  summary:[
   'A network connects devices so they can exchange data and share resources.',
   'End devices, connecting devices, and wired or wireless links work together.',
   'PAN, LAN, MAN, and WAN describe geographic scope rather than strict universal distance limits.',
   'Peer-to-peer and client-server describe service roles, not geographic coverage.',
   'Sender, receiver, message, medium, and protocol describe a communication exchange.',
   'Bandwidth describes link capacity; latency describes delay. A LAN operates without Internet service, but shared resources need security and maintenance.'
  ]
 },
 '03-network-topologies':{
  walkthrough:{title:'Trace a switched star connection',items:['Five computers and one printer each have a separate cable to the central switch. This star needs six endpoint connections.','A computer reaches the printer through the switch. It does not need a separate direct cable to each other endpoint.','If one computer’s cable is disconnected, that computer is isolated. The other four computers can still reach the connected printer through the working switch.','If the central switch loses power or fails, all six endpoints lose communication through it. This central dependency is different from a single endpoint-cable failure.']},
  summary:['Physical topology describes arrangement; logical topology describes how data travels.','A switched star gives endpoints independent links but depends on the central device.','Classic bus and unprotected ring failures follow shared-backbone and single-ring assumptions.','Mesh provides alternate paths; tree and hybrid designs combine links with different failure scopes.','Choose topology using endpoint count, cost, growth, cable reach, and availability requirements.','Redundant Ethernet links require loop prevention; an abstract connectivity graph does not simulate switching protocols.']
 },
 '04-network-devices':{
  walkthrough:{title:'Read the interfaces along a network path',items:['The PC NIC sends a frame through an Ethernet port to a switch. Link indicators show link detection, not proof of IP or Internet access.','The switch forwards a known local unicast toward its learned destination port. A hub would repeat incoming bits to other ports.','For a remote IP network, a router selects the next hop. Its LAN and WAN interfaces face different network roles.','A home gateway may also contain an AP, switch, DHCP service, NAT, and firewall. A modem or optical terminal serves the provider access technology.']},
  summary:['A NIC connects a host to a network; interfaces and ports have distinct roles.','A hub repeats bits; a switch learns MAC information and forwards frames.','A bridge joins link-layer segments; a switch is a multiport bridge.','A router forwards IP packets between networks.','An AP bridges wireless access to a LAN; a modem adapts provider-medium signals.','Repeaters regenerate signals and firewalls enforce traffic policy; combined devices may perform several functions.']
 },
 '06-network-cables-media':{
  walkthrough:{title:'Select media for a campus installation',items:['Identify the required channel distance: horizontal floor runs under 90 m can use Category 6 twisted pair, while outdoor building runs over 100 m require optical fiber.','Compare interference conditions: factory floors or conduits near high-voltage lines require fiber or properly bonded STP cable.','Select optical fiber profiles: single-mode fiber for long-distance inter-building backbones, and multi-mode fiber for high-speed switch-to-switch links within a data center.','Verify physical termination and transceiver compatibility before applying power or configuring network interfaces.']},
  summary:[
   'Copper carries electrical signals, optical fiber carries light, and wireless uses radio.',
   'UTP relies on pair twisting to cancel crosstalk; STP requires correct shield bonding.',
   'Cable category, channel length, connectors, and installation quality jointly determine performance.',
   'Fiber optics provide immunity to electromagnetic interference and span much greater distances than copper.',
   'Coaxial cable provides durable shielding for broadband and antenna feeds.',
   'Radio frequencies provide mobile wireless connectivity over shared, unguided airspace.'
  ]
 },
 '07-rj45-crimping':{
  walkthrough:{title:'Termination sequence: inspect before crimping',items:['Use the contact-side view with the latch behind and cable entering downward. Pin 1 is left; confirm this orientation at both ends.','Cut cleanly and strip only the required jacket without nicking insulation. Arrange the selected T568 standard and preserve twists close to termination.','Trim conductors evenly, insert them fully into a compatible plug, and confirm the jacket is under strain relief.','Inspect all eight contact positions before crimping. Keep fingers away from blades and jaws; a bad crimp usually requires a new plug.','Connect main and remote tester units. Trace all eight paths, repair opens/shorts/miswires, and check the actual authorized link separately.']},
  summary:[
   'T568A and T568B specify exact conductor-to-pin orders in an agreed connector view.',
   'A conventional straight-through cable uses A–A or B–B.',
   'A traditional A–B crossover swaps the 10/100BASE-T pairs; many modern interfaces use auto-MDI/MDIX.',
   'Full insertion, preserved twists, compatible plugs, and jacket strain relief affect termination quality.',
   'Opens, shorts, and unexpected pin paths indicate different wire-map faults.',
   'A continuity pass does not certify pair integrity, category bandwidth, or real-link performance.'
  ]
 },
 '08-ip-addressing':{
  walkthrough:{title:'Interpret an IPv4 configuration',items:['In 192.168.10.25/24, the prefix marks 24 network bits and eight host bits. The mask is 255.255.255.0.','The gateway 192.168.10.1 is another usable address on that local subnet and handles destinations without a more specific route.','A DNS resolver maps names to records. It may equal the gateway when that gateway forwards DNS, but this is not required.','An octet uses weights 128, 64, 32, 16, 8, 4, 2, 1; adding enabled weights converts eight bits into a decimal value.','Private addresses are not globally routed; loopback, link-local, shared carrier, documentation, multicast, and reserved ranges also need separate treatment.']},
  summary:[
   'IPv4 uses 32 bits arranged in four decimal octets (0–255); IPv6 uses 128 bits.',
   'The subnet mask or prefix separates the network identity from host identity bits.',
   'Subnetting divides networks into smaller, efficient, and secure broadcast domains.',
   'A /24 subnet has a Network ID (.0), Broadcast IP (.255), and 254 usable host addresses (.1 to .254).',
   'Private IPv4 address ranges (RFC 1918) include 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.',
   'Modern CIDR replaces classful addressing, allowing custom subnet sizes for any network.'
  ]
 },
 '10-static-ip':{
  walkthrough:{title:'Windows static-IP configuration',items:['Record the original configuration and select the intended adapter. Open ncpa.cpl, adapter Properties, then Internet Protocol Version 4 (TCP/IPv4) Properties.','On an approved isolated LAN, 192.168.1.10/24 and 192.168.1.20/24 are compatible local hosts. A gateway is unnecessary for a numeric local test.','Use ipconfig /all to inspect settings, then test the peer in both directions. If ICMP is filtered, examine approved policy rather than disabling the firewall.','Changing the second host to 192.168.2.20/24 requires appropriate gateways and bidirectional routing for cross-subnet communication.','Restore the original approved IP/DNS method after a physical demonstration; browser settings do not change the real Windows adapter.']},
  summary:[
   'Static addressing supplies manually chosen, stable interface configuration.',
   'Each ordinary LAN host needs a unique usable address and a valid contiguous subnet mask.',
   'Same-subnet communication requires both hosts to make compatible local-delivery decisions.',
   'Different subnets need appropriate routing and local gateways.',
   'DNS is independent of numeric-IP reachability; valid syntax alone does not prove connectivity.',
   'Record and restore real configurations, coordinate static assignments with DHCP, and preserve firewall protections.'
  ]
 },
 '11-dhcp':{
  walkthrough:{title:'Read a DHCP configuration and lease',items:['An authorized router pool contains usable addresses inside its LAN subnet, excluding the router and other managed infrastructure.','A client set to automatic IP/DNS obtains address, mask, gateway, DNS, and a lease lifetime from the reachable server.','Discover locates a server, Offer proposes configuration, Request selects it, and ACK commits the lease.','On authorized Windows equipment, ipconfig /all shows DHCP and lease information; ipconfig /release and ipconfig /renew return and request configuration.','Pool exhaustion, unavailable service, conflicting options, and invalid pool boundaries are different faults. An unapproved DHCP server must not be attached to the production LAN.']},
  summary:['DHCP supplies temporary address configuration and options from an authorized server.','Initial allocation is commonly explained as Discover, Offer, Request, Acknowledgment.','Active leases must have unique addresses inside the configured pool.','Renewal extends use, release returns an address, and expiry makes it reusable.','A full pool cannot safely allocate another active address.','An unreachable DHCP server may lead to link-local configuration, which does not provide ordinary routed access.']
 },
 '12-router-wireless':{
  walkthrough:{title:'Router configuration sequence',items:['Use an isolated, authorized router and record its current settings. A wired management connection reduces dependence on changing Wi-Fi settings.','Choose a private LAN subnet and a matching pool excluding the router address. A LAN address change can interrupt management and existing leases.','Set an SSID and supported WPA3-Personal or WPA2-AES security. Use a long unique passphrase distinct from router administrator credentials.','Reconnect a wired and an authenticated wireless client, then inspect assigned address, mask, gateway, and DNS.','Check local access before WAN services. Guest isolation depends on the actual device features and policy; restore approved settings after a physical demonstration.']},
  summary:['A router connects IP networks; LAN interfaces face local clients and WAN faces another network/provider.','Small gateways may combine router, switch, AP, DHCP, NAT, and firewall functions.','NAT translation does not replace access-control policy or prove Internet service.','An SSID names a WLAN; authentication and association precede useful IP connectivity.','Use supported WPA3 or WPA2-AES security with strong unique credentials.','DHCP pools must match the LAN; guest isolation and actual WAN service need separate verification.']
 },
 '13-file-printer-sharing':{
  walkthrough:{title:'Windows folder sharing',items:['On a trusted approved network, a host shares a non-sensitive folder through Properties → Sharing → Advanced Sharing with a named authorized identity.','The Security tab controls NTFS permissions separately. For remote file access, both share and file-system rules must allow the requested action.',String.raw`From another computer, use a UNC path such as \\HOST\ClassFiles and authenticate with the intended account. Host-side access does not verify the client identity.`,'Read-only access permits reading without edits; editing requires suitable permissions at both layers. Retain approved discovery/file-sharing firewall rules.','Remove temporary shares after a physical demonstration. Printer sharing additionally depends on print permission, driver compatibility, and a working host/spooler.']},
  summary:['A shared resource depends on a reachable host providing the service.','Peer-hosted and dedicated-server designs differ in availability and management.','Share permissions and file-system permissions both limit remote file access.','Use named identities, least privilege, and trusted network profiles.','UNC paths identify a host and share; discovery and name resolution are related but distinct.','Printer reachability alone does not prove driver, spooler, or permission success.']
 },
 '14-network-troubleshooting':{
  walkthrough:{title:'A fault-to-repair demonstration',items:['Define the symptom and scope, then inspect power, physical link, association, and the known healthy configuration.','ipconfig /all exposes address, mask, gateway, DNS, and DHCP details without proving reachability.','Compare a local numeric test, a gateway test, a remote numeric test, and a DNS query to narrow the affected function.','Use tracert for hop evidence and arp -a for cached IPv4 neighbors, recognizing filtering and cache limitations.','Change one justified setting, repeat the original failing test, and document the result. Keep security controls active and escalate unfamiliar equipment faults.']},
  summary:['Troubleshooting moves from a clear symptom through evidence, a hypothesis, one justified change, and a retest.','Physical links, IP settings, routes, DNS, and application permissions can fail independently.','ipconfig reports configuration; ping tests ICMP behavior, with filtering and loss caveats.','tracert provides hop evidence and nslookup queries DNS; neither proves the whole service works.','arp -a lists cached local IPv4 mappings, not an exhaustive network inventory.','A successful repair is demonstrated by repeating the original failing test and documenting the outcome.']
 }
};

export const simulationGuidance={
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
