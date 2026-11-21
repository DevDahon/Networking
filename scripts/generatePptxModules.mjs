import { mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

globalThis.window ??= {};
globalThis.document ??= {};
globalThis.localStorage ??= { getItem: () => null, setItem: () => {} };

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const modulesDir = resolve(rootDir, 'modules');

const { topics } = await import('../src/topics/topicRegistry.js');
const { examplePlan } = await import('../src/simulations/exampleModels.js');
const { protocolCatalog, arpJourney, webJourney } = await import('../src/simulations/protocolModels.js');
const { deviceMetadata } = await import('../src/components/deviceIllustrations.js');
const { toolsMetadata } = await import('../src/components/toolsVisuals.js');
const { PptxDeck } = await import('./pptxBuilder.mjs');
const {
  addCoverSlide,
  addObjectivesSlide,
  addSectionDividerSlide,
  addTeachingSlide,
  addComparisonSlide,
  addTableOrBarsSlide,
  addDiscussionSlide,
  addSummaryOfDiscussionSlide
} = await import('./pptxTemplates.mjs');
const { MODULE_ENRICHMENTS } = await import('./pptxModuleData.mjs');

function slugify(text) {
  return String(text || '')
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Simplify dense technical wording into plain, student-friendly English for all 12 PDF modules
// while preserving capitalization, natural grammar, and essential Networking 1 terms.
function matchCase(source, target) {
  if (!source) return target;
  if (source[0] === source[0].toUpperCase() && source[0] !== source[0].toLowerCase()) {
    return target[0].toUpperCase() + target.slice(1);
  }
  return target;
}

const TERM_SIMPLIFICATIONS = [
  [/zero immunity issues/gi, m => matchCase(m, 'zero electrical interference')],
  [/Auto-MDI\/Medium Dependent Interface Crossover \(MDIX\) ports/gi, 'auto-sensing ports (Auto-MDIX)'],
  [/Auto-MDI\/Medium Dependent Interface Crossover \(MDIX\)/gi, 'auto-sensing (Auto-MDIX)'],
  [/Auto-MDI\/MDIX/gi, 'auto-sensing (Auto-MDIX)'],
  [/an arbitrary matching color order/gi, 'a made-up color order'],
  [/arbitrary matching color order/gi, 'made-up color order'],
  [/with jacket inside strain relief/gi, 'with the outer jacket inside the plug clamp'],
  [/strain relief/gi, 'jacket clamp'],
  [/electromagnetic interference \(EMI\)\s*(?:and|\/)\s*radio-frequency interference \(RFI\)/gi, m => matchCase(m, 'outside electrical noise (EMI/RFI)')],
  [/external EMI\/RFI/gi, 'outside electrical noise'],
  [/electromagnetic interference/gi, m => matchCase(m, 'electrical interference')],
  [/electromagnetic waves/gi, m => matchCase(m, 'radio waves')],
  [/concentric four-layer design/gi, 'four layered rings around one center wire'],
  [/foam dielectric insulator/gi, 'thick white plastic insulator'],
  [/insulation displacement contacts/gi, 'punch-down metal slots'],
  [/110 IDC/g, '110 punch-down'],
  [/burned-in MAC address/gi, 'factory-set MAC address'],
  [/Separate Collision Domains:/g, 'No Wire Collisions:'],
  [/Shared Collision Domain:/g, 'Shared Wire Collisions:'],
  [/\bbroadcast domains\b/gi, m => matchCase(m, 'broadcast groups')],
  [/\bbroadcast domain\b/gi, m => matchCase(m, 'broadcast group')],
  [/broadcast storms/gi, 'broadcast traffic floods'],
  [/unicast frames/gi, 'direct one-to-one messages (frames)'],
  [/unicast traffic/gi, 'one-to-one traffic'],
  [/full-duplex bandwidth/gi, 'two-way simultaneous speed'],
  [/full-duplex/gi, 'two-way simultaneous (full-duplex)'],
  [/half-duplex/gi, 'one-way-at-a-time (half-duplex)'],
  [/connection-oriented/gi, m => matchCase(m, 'checks connection first')],
  [/connectionless/gi, m => matchCase(m, 'no-handshake')],
  [/best-effort delivery/gi, m => matchCase(m, 'fast send-and-forget delivery')],
  [/minimal header overhead/gi, m => matchCase(m, 'less extra header data')],
  [/low-overhead datagrams/gi, 'lightweight fast packets'],
  [/\bdatagrams\b/gi, m => matchCase(m, 'fast data packets')],
  [/Inter-Network Scope:/g, 'Multi-Network Scope:'],
  [/local switching versus inter-network routing/gi, 'local switching versus routing between networks'],
  [/\binter-network routing\b/gi, 'routing between networks'],
  [/\binterconnects\b/gi, m => matchCase(m, 'connects')],
  [/\binterconnect\b/gi, m => matchCase(m, 'connect')],
  [/\bfault tolerance\b/gi, m => matchCase(m, 'backup reliability')],
  [/\bfault isolation\b/gi, m => matchCase(m, 'keeping faults limited to one device')],
  [/automatic failover/gi, m => matchCase(m, 'automatic backup switching')],
  [/redundant links/gi, m => matchCase(m, 'backup links')],
  [/redundant paths/gi, m => matchCase(m, 'backup paths')],
  [/\bhierarchical\b/gi, m => matchCase(m, 'layered (top-to-bottom)')],
  [/sub-millisecond delay/gi, 'under 1 ms delay'],
  [/reclaims expired IPs/gi, 'recycles unused IPs'],
  [/\blink-local\b/gi, 'local-only'],
  [/granular control/gi, m => matchCase(m, 'detailed per-file control')],
  [/most restrictive wins/gi, m => matchCase(m, 'strictest rule always wins')],
  [/most restrictive/gi, m => matchCase(m, 'strictest')],
  [/unsolicited inbound traffic/gi, 'unrequested incoming traffic'],
  [/unsolicited incoming Internet scans/gi, 'unrequested outside scans'],
  [/\b5-tuple\b/gi, '5 packet details (IPs, protocol, ports, direction)'],
  [/horizontal channel/gi, 'room-to-switch cable run'],
  [/horizontal cabling/gi, 'room-to-switch cabling'],
  [/horizontal drops/gi, 'room-to-switch cables'],
  [/dotted-decimal notation/gi, 'four numbers separated by dots'],
  [/leading priority bits/gi, m => matchCase(m, 'starting bits')],
  [/global IP exhaustion/gi, 'running out of global IP addresses'],
  [/FCS error detection/gi, 'error check (FCS)'],
  [/FCS error check/gi, 'error check (FCS)'],
  [/cleartext transmission/gi, m => matchCase(m, 'unencrypted plain text')],
  [/eavesdropping risk/gi, m => matchCase(m, 'snooping risk')],
  [/malicious software/gi, m => matchCase(m, 'harmful software')],
  [/unpatched systems/gi, m => matchCase(m, 'outdated systems missing updates')],
  [/bogus traffic/gi, 'fake junk traffic'],
  [/endpoint antivirus\/EDR/gi, 'device antivirus'],
  [/small-office\/home-office \(SOHO\)/gi, 'home or small-office'],
  [/\bSOHO\b/g, 'Home / Small-Office'],
  [/character encoding \(UTF-8\)/gi, 'text formatting (UTF-8)'],
  [/dialog sessions/gi, 'active sessions'],
  [/\battenuation\b/gi, m => matchCase(m, 'signal weakening over distance')],
  [/\bretransmits\b/gi, m => matchCase(m, 'resends')],
  [/\bretransmit\b/gi, m => matchCase(m, 'resend')],
  [/\bpropagates\b/gi, m => matchCase(m, 'travels')],
  [/\bpropagate\b/gi, m => matchCase(m, 'travel')],
  [/\bobsolete\b/gi, m => matchCase(m, 'outdated')],
  [/\bpenetrate\b/gi, m => matchCase(m, 'pass through')],
  [/\bpenetrates\b/gi, m => matchCase(m, 'passes through')],
  [/\blegitimate\b/gi, m => matchCase(m, 'real')],
  [/\bunauthorized\b/gi, m => matchCase(m, 'unapproved')],
  [/\bcontiguous\b/gi, m => matchCase(m, 'continuous')],
  [/\basymmetric\b/gi, m => matchCase(m, 'mismatched')],
  [/\bper-file precision\b/gi, m => matchCase(m, 'file-by-file control')],
  [/\bminimal appliance interference\b/gi, 'less interference from appliances'],
  [/\bnarrower channels result in lower peak throughput\b/gi, m => matchCase(m, 'narrower channels mean lower top speeds')]
];

function simplifyTerminology(text) {
  let out = String(text ?? '');
  for (const [pattern, replacement] of TERM_SIMPLIFICATIONS) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

function simplifyList(arr) {
  return Array.isArray(arr) ? arr.map(simplifyTerminology) : [];
}

// Editable labeled diagram / photo chooser — returns a visual ONLY when directly relevant to the specific slide
function resolveSlideVisual(topic, slide, slideIdx, usedDiagrams = new Set()) {
  const title = String(slide.title || '').toLowerCase();
  const useOnce = (key, spec) => {
    if (usedDiagrams.has(key)) return null;
    usedDiagrams.add(key);
    return spec;
  };

  // 1. Direct deviceKey or toolKey photo (always specific to that hardware/tool slide)
  if (slide.deviceKey && deviceMetadata[slide.deviceKey]?.image) {
    const dev = deviceMetadata[slide.deviceKey];
    const imagePath = slide.deviceKey === 'ap' ? 'images/devices/ap_studio.png' : dev.image;
    return {
      kind: 'photo',
      imagePath,
      caption: null
    };
  }
  if (slide.toolKey && toolsMetadata[slide.toolKey]?.image) {
    const tool = toolsMetadata[slide.toolKey];
    return {
      kind: 'photo',
      imagePath: tool.image,
      caption: null
    };
  }

  // 1b. Module 01 unlabeled device-shape architecture visuals (PAN, LAN, MAN, WAN, Client-Server vs P2P)
  if (topic.id === '01-introduction-to-networking') {
    if (title.includes('personal area network')) {
      return useOnce('photo-pan', { kind: 'photo', imagePath: 'images/coverage/pan.png', caption: null });
    }
    if (title.includes('local area network')) {
      return useOnce('photo-lan', { kind: 'photo', imagePath: 'images/coverage/lan.png', caption: null });
    }
    if (title.includes('metropolitan area network')) {
      return useOnce('photo-man', { kind: 'photo', imagePath: 'images/coverage/man.png', caption: null });
    }
    if (title.includes('wide area network')) {
      return useOnce('photo-wan', { kind: 'photo', imagePath: 'images/coverage/wan.png', caption: null });
    }
    if (title.includes('two network service architectures')) {
      return useOnce('photo-arch', { kind: 'photo', imagePath: 'images/coverage/architectures.png', caption: null });
    }
  }

  // 2. Slide-specific real hardware/media/tool photos from public/images/
  if (topic.id === '06-network-cables-media') {
    if (title.includes('five network media choices')) {
      return useOnce('photo-utp-stp', { kind: 'photo', imagePath: 'images/media/utp_and_stp.png', caption: null });
    }
    if (title.includes('ethernet cable categories') || title.includes('ethernet categories')) {
      return useOnce('photo-cat', { kind: 'photo', imagePath: 'images/media/ethernet_categories.webp', caption: null });
    }
    if (title.includes('fiber')) {
      return useOnce('photo-fiber', { kind: 'photo', imagePath: 'images/media/fiber_types.webp', caption: null });
    }
    if (title.includes('coaxial')) {
      return useOnce('photo-coax', { kind: 'photo', imagePath: 'images/media/coaxial_cutaway.webp', caption: null });
    }
    if (title.includes('unguided media') || title.includes('wireless')) {
      return useOnce('photo-wireless-media', { kind: 'photo', imagePath: 'images/media/wireless_media.png', caption: null });
    }
    if (title.includes('rj45 plugs') || title.includes('modular connector')) {
      return useOnce('photo-rj45-keystone', { kind: 'photo', imagePath: 'images/tools/rj45_and_keystone.png', caption: null });
    }
    if (title.includes('crimping tools')) {
      return useOnce('photo-crimping-kit', { kind: 'photo', imagePath: 'images/tools/crimping_toolkit.png', caption: null });
    }
    if (title.includes('punch-down tools')) {
      return useOnce('photo-punchdown-kit', { kind: 'photo', imagePath: 'images/tools/punchdown_toolkit.png', caption: null });
    }
    if (title.includes('straight-through') && title.includes('crossover')) {
      return useOnce('photo-patch-cable', { kind: 'photo', imagePath: 'images/tools/ethernet_patch_cable.webp', caption: null });
    }
  }
  if (topic.id === '12-router-wireless') {
    if (title.includes('wi-fi frequencies') || title.includes('frequency band')) {
      return useOnce('photo-wifi-router', { kind: 'photo', imagePath: 'images/router/wifi_router.webp', caption: null });
    }
    if (title.includes('gateway interface') || title.includes('wan vs lan')) {
      return useOnce('photo-router-rear', { kind: 'photo', imagePath: 'images/router/router_rear.webp', caption: null });
    }
  }
  if (title.includes('unshielded twisted pair') || title.includes('utp')) {
    return useOnce('photo-utp', { kind: 'photo', imagePath: 'images/media/utp_cable.webp', caption: null });
  }
  if (title.includes('shielded twisted pair') || title.includes('stp')) {
    return useOnce('photo-stp', { kind: 'photo', imagePath: 'images/media/stp_cable.webp', caption: null });
  }
  if (title.includes('coaxial')) {
    return useOnce('photo-coax', { kind: 'photo', imagePath: 'images/media/coaxial_cutaway.webp', caption: null });
  }
  if (title.includes('fiber')) {
    return useOnce('photo-fiber', { kind: 'photo', imagePath: 'images/media/fiber_types.webp', caption: null });
  }
  if (title.includes('wireless media') || title.includes('unguided media') || title.includes('wi-fi frequencies') || title.includes('frequency band')) {
    return useOnce('photo-ap', { kind: 'photo', imagePath: 'images/devices/ap_studio.png', caption: null });
  }
  if (title.includes('ethernet categories')) {
    return useOnce('photo-cat', { kind: 'photo', imagePath: 'images/media/ethernet_categories.webp', caption: null });
  }
  if (title.includes('rj45') || title.includes('modular connector')) {
    return useOnce('photo-rj45', { kind: 'photo', imagePath: 'images/tools/rj45_plugs.webp', caption: null });
  }
  if (title.includes('crimp') || title.includes('termination')) {
    return useOnce('photo-crimp', { kind: 'photo', imagePath: 'images/tools/rj45_good_vs_bad.webp', caption: null });
  }
  if (title.includes('cable fault') || title.includes('cable test') || title.includes('wiring fault') || title.includes('wire-map')) {
    return useOnce('photo-tester', { kind: 'photo', imagePath: 'images/tools/cable_tester.webp', caption: null });
  }
  if (title.includes('wan vs lan') || title.includes('gateway interface') || title.includes('inside a home or lab wireless router')) {
    return useOnce('photo-router-rear', { kind: 'photo', imagePath: 'images/router/router_rear.webp', caption: null });
  }

  // 3. Slide-specific Simple Zero-Text Visual Illustrations (each shown ONCE on its exact matching slide)
  if (title.includes('components of computer networks')) {
    return useOnce('diag-components', { kind: 'photo', imagePath: 'images/concepts/components.png', caption: null });
  }

  if (title.includes('five elements') || title.includes('conversation')) {
    return useOnce('diag-5elements', { kind: 'photo', imagePath: 'images/concepts/five_elements.png', caption: null });
  }

  if (title === 'star topology' || title.includes('star topology')) {
    return useOnce('diag-star', { kind: 'photo', imagePath: 'images/topologies/star.png', caption: null });
  }

  if (title === 'bus topology' || title.includes('bus topology')) {
    return useOnce('diag-bus', { kind: 'photo', imagePath: 'images/topologies/bus.png', caption: null });
  }

  if (title === 'ring topology' || title.includes('ring topology')) {
    return useOnce('diag-ring', { kind: 'photo', imagePath: 'images/topologies/ring.png', caption: null });
  }

  if (title === 'mesh topology' || title.includes('mesh topology')) {
    return useOnce('diag-mesh', { kind: 'photo', imagePath: 'images/topologies/mesh.png', caption: null });
  }

  if (title === 'tree topology' || title.includes('tree topology')) {
    return useOnce('diag-tree', { kind: 'photo', imagePath: 'images/topologies/tree.png', caption: null });
  }

  if (title === 'hybrid topology' || title.includes('hybrid topology')) {
    return useOnce('diag-hybrid', { kind: 'photo', imagePath: 'images/topologies/hybrid.png', caption: null });
  }

  if (title.includes('what is the osi')) {
    return useOnce('diag-osi', { kind: 'photo', imagePath: 'images/concepts/osi_layers.png', caption: null });
  }

  if (title.includes('what is encapsulation')) {
    return useOnce('diag-encap', { kind: 'photo', imagePath: 'images/concepts/encapsulation.png', caption: null });
  }

  if (title.includes('tcp/ip')) {
    return useOnce('diag-tcpip', { kind: 'photo', imagePath: 'images/concepts/tcpip_layers.png', caption: null });
  }

  if (title.includes('address resolution protocol')) {
    return useOnce('diag-arp', { kind: 'photo', imagePath: 'images/concepts/arp_exchange.png', caption: null });
  }

  if (title.includes('domain name system')) {
    return useOnce('diag-dns', { kind: 'photo', imagePath: 'images/concepts/dns_lookup.png', caption: null });
  }

  if (title.includes('what is a subnet and why do we subnet')) {
    return useOnce('diag-why-subnet', { kind: 'photo', imagePath: 'images/concepts/subnet_split.png', caption: null });
  }

  if (title.includes('inside every subnet') || title.includes('subnet mask: the dividing boundary')) {
    return useOnce('diag-ipv4-subnet', { kind: 'photo', imagePath: 'images/concepts/subnet_boundary.png', caption: null });
  }

  if (title.includes('five steps to subnet')) {
    return useOnce('diag-subnet-steps', { kind: 'photo', imagePath: 'images/concepts/subnet_steps.png', caption: null });
  }

  if (title.includes('four messages in the initial dhcp') || title.includes('dhcp allocation') || title.includes('what is dhcp')) {
    return useOnce('diag-dora', { kind: 'photo', imagePath: 'images/concepts/dhcp_dora.png', caption: null });
  }

  if (title.includes('lease lifecycle')) {
    return useOnce('diag-dhcp-lease', { kind: 'photo', imagePath: 'images/concepts/dhcp_lease.png', caption: null });
  }

  if (title.includes('two permission gates') || title.includes('file & printer sharing properties') || title.includes('share permissions vs ntfs')) {
    return useOnce('diag-smb', { kind: 'photo', imagePath: 'images/concepts/smb_gates.png', caption: null });
  }

  if (title.includes('systematic troubleshooting')) {
    return useOnce('diag-troubleshoot', { kind: 'photo', imagePath: 'images/concepts/troubleshoot_ladder.png', caption: null });
  }

  if (title.includes('cia triad')) {
    return useOnce('diag-cia', { kind: 'photo', imagePath: 'images/concepts/cia_triad.png', caption: null });
  }

  if (title.includes('stateful firewall')) {
    return useOnce('diag-firewall', { kind: 'photo', imagePath: 'images/concepts/firewall_inspect.png', caption: null });
  }

  // No generic fallback diagram — slides without a dedicated visual use clean full-width layout!
  return null;
}

// Convert interactive demo slides into clear, beginner-friendly step-by-step procedures
function getDemoProcedure(slide) {
  const procedures = {
    introConnections: {
      explanation: 'Follow this step-by-step procedure to trace how local devices share resources through a switch and reach remote services through a router:',
      steps: [
        'Step 1 — Verify Local Links: Connect PCs and the shared printer to the local Ethernet switch with straight-through cables.',
        'Step 2 — Send a Local Request: When PC A prints or opens a local file, the switch forwards the frame directly to the local target.',
        'Step 3 — Contact Default Gateway: When PC A requests an outside website, it sends the packet to the local router (default gateway).',
        'Step 4 — Receive the Reply: The remote server replies back through the router and switch, reversing sender and receiver roles.'
      ]
    },
    introConnectivity: {
      explanation: 'Distinguish between local LAN resource sharing through a switch and router-forwarded Internet access:',
      steps: [
        'Step 1 — Identify Local Devices: Confirm the PC, switch, and printer belong to the same local network subnet.',
        'Step 2 — Send a Local Print Job: Print directly through the local switch without requiring an Internet connection.',
        'Step 3 — Request a Remote Website: Send outside traffic to the Default Gateway router so it routes across the WAN.'
      ]
    },
    introExchange: {
      explanation: 'Every network exchange follows four predictable stages where sender and receiver roles reverse on reply:',
      steps: [
        'Step 1 — Prepare the Request: Computer A (initial sender) creates a request asking Computer B for a shared file.',
        'Step 2 — Transmit Across the Switch: The Ethernet frame travels across the cable and local switch to Computer B.',
        'Step 3 — Deliver the Response: Computer B becomes the new sender and returns the requested document to Computer A.'
      ]
    },
    communication: {
      explanation: 'Every network exchange follows four predictable stages from the moment a user clicks request until the reply arrives:',
      steps: [
        'Step 1 — Prepare the Request: The client application creates the request message and addresses it to the server.',
        'Step 2 — Forward Across the Switch: The client NIC transmits the Ethernet frame to the local switch.',
        'Step 3 — Return the Response: The roles of sender and receiver switch as the reply travels back to the original computer.'
      ]
    },
    coverage: {
      explanation: 'Compare network types by examining their coverage radius, ownership, and typical transmission media:',
      steps: [
        'Step 1 — Personal Reach (PAN · 1–10 m): Bluetooth earbuds, smartwatches, and USB tethering around one person.',
        'Step 2 — Room or Building (LAN / WLAN · 10 m–1 km): Ethernet switches and Wi-Fi access points inside a lab, home, or office.',
        'Step 3 — Metro to Global (MAN & WAN): City-wide fiber rings (MAN) and telecom/Internet links across countries (WAN).'
      ]
    },
    media: {
      explanation: 'Select the right physical transmission medium by comparing distance, interference environment, and bandwidth needs:',
      steps: [
        'Step 1 — Check Run Distance: Use UTP/STP copper for horizontal drops up to 100 m; choose fiber-optic for long building uplinks.',
        'Step 2 — Check Electrical Noise: Use standard UTP in classrooms/offices and shielded STP or optical fiber near heavy motors.',
        'Step 3 — Add Wireless Mobility: Deploy Wi-Fi (802.11) access points on 2.4 GHz and 5 GHz for mobile laptops and phones.'
      ]
    },
    protocolArp: {
      explanation: 'Follow how Address Resolution Protocol (ARP) discovers a local hardware MAC address from a known IPv4 address:',
      steps: [
        'Step 1 — Check Local ARP Cache: The sender checks its ARP table to see if the target IP’s MAC address is already known.',
        'Step 2 — Broadcast ARP Request: If missing, the sender broadcasts "Who has 192.168.1.20? Tell 192.168.1.10" to all switch ports.',
        'Step 3 — Unicast ARP Reply & Cache: The matching host replies with its MAC address, and the sender caches it for frame delivery.'
      ]
    },
    dnsCacheDemo: {
      explanation: 'Follow how DNS name resolution uses local client caching and Time-to-Live (TTL) timers to speed up browsing:',
      steps: [
        'Step 1 — Check Local DNS Cache: The PC checks its local memory for an unexpired domain-to-IP record.',
        'Step 2 — Query DNS Resolver (Port 53): On a cache miss, the PC queries its configured DNS server for the IPv4/IPv6 address.',
        'Step 3 — Cache for TTL Duration: The PC stores the returned IP address until the TTL timer expires.'
      ]
    },
    asymmetricDemo: {
      explanation: 'Both computers on a LAN must use the exact same subnet mask to agree on whether traffic is local or remote:',
      steps: [
        'Step 1 — Check Host A (/24): Host A (192.168.1.10/24) sees 192.168.1.200 as part of the same local subnet (.1–.254).',
        'Step 2 — Check Host B (/25 Mismatch): Host B (192.168.1.200/25) sees .10 as a different subnet and sends replies to the gateway.',
        'Step 3 — Standardize the Mask: Set both hosts to 255.255.255.0 (/24) so two-way local communication succeeds.'
      ]
    },
    static: {
      explanation: 'Follow this step-by-step procedure to configure a Static IPv4 address in Windows TCP/IPv4 Properties:',
      steps: [
        'Step 1 — Open Adapter Properties: Run ncpa.cpl, right-click Ethernet/Wi-Fi → Properties → Internet Protocol Version 4 (TCP/IPv4).',
        'Step 2 — Enter IP, Mask & Gateway: Select "Use the following IP address" and enter IP (192.168.1.10), Mask (255.255.255.0), and Gateway (192.168.1.1).',
        'Step 3 — Enter DNS & Verify: Enter Preferred DNS (192.168.1.1 or 8.8.8.8), click OK, and verify with ipconfig /all and ping.'
      ]
    },
    reservedPoolDemo: {
      explanation: 'Plan a DHCP scope cleanly using address exclusions and MAC-based reservations:',
      steps: [
        'Step 1 — Define DHCP Lease Pool: Set the dynamic range (e.g., 192.168.1.100 to 192.168.1.200) for everyday client laptops.',
        'Step 2 — Exclude Static Infrastructure IPs: Reserve .1 through .99 for the router gateway, switches, and static servers.',
        'Step 3 — Bind MAC Reservations: Pin the classroom printer’s MAC address to a fixed IP so it never changes at reboot.'
      ]
    },
    sharing: {
      explanation: 'Follow this procedure to share a folder over a trusted Windows LAN and connect from another workstation:',
      steps: [
        'Step 1 — Enable Private Network Sharing: Set Windows to Private Profile and turn on Network Discovery and File/Printer Sharing.',
        'Step 2 — Configure Share & NTFS Permissions: Right-click the folder → Properties → Sharing & Security tabs (Most Restrictive Wins).',
        'Step 3 — Connect via UNC or Map Drive: On the client PC, open \\\\ServerName\\ShareName or map it to drive letter Z:.'
      ]
    },
    printQueueDemo: {
      explanation: 'Follow how a shared printer host processes print jobs from multiple classroom computers in FIFO order:',
      steps: [
        'Step 1 — Verify Host & Permissions: Confirm the print server PC and printer are online and the user has Print permission.',
        'Step 2 — Spool Jobs in FIFO Queue: Incoming print jobs line up in First-In, First-Out order inside the print spooler.',
        'Step 3 — Print & Clear Queue: The spooler streams pages sequentially to the printer and removes each job upon completion.'
      ]
    },
    router: {
      explanation: 'Configure a classroom or home wireless router for wired LAN switching and secure Wi-Fi access:',
      steps: [
        'Step 1 — Connect WAN & LAN Ports: Plug the ISP modem into the WAN port and local switches/PCs into LAN ports 1–4.',
        'Step 2 — Set Admin Password & LAN DHCP: Change the default admin login, set LAN IP (192.168.1.1/24), and enable DHCP.',
        'Step 3 — Set SSID & WPA2/WPA3 Security: Name the 2.4 GHz / 5 GHz Wi-Fi SSID and enable WPA3 or WPA2-AES encryption.'
      ]
    },
    guestIsolationDemo: {
      explanation: 'Configure an isolated Guest Wi-Fi network that allows Internet browsing while protecting private LAN devices:',
      steps: [
        'Step 1 — Broadcast Separate Guest SSID: Create a dedicated wireless network name and passphrase for visitors.',
        'Step 2 — Enable Client Isolation: Prevent guest phones and laptops from accessing internal LAN folders, servers, or printers.',
        'Step 3 — Permit Outbound Internet Only: Allow guest traffic to reach the WAN/Internet port while blocking private RFC 1918 subnets.'
      ]
    },
    ttlTraceDemo: {
      explanation: 'Understand how tracert uses Time-to-Live (TTL) values to map every router hop along a path:',
      steps: [
        'Step 1 — Send TTL=1, TTL=2, TTL=3 Probes: Each router decrements TTL by 1 and returns ICMP Time Exceeded when TTL hits 0.',
        'Step 2 — Measure Per-Hop Latency: Compare round-trip times (ms) at each hop to spot where congestion or packet loss starts.',
        'Step 3 — Interpret * * * Timeouts: Asterisks indicate a router that blocks ICMP replies or a broken link along the route.'
      ]
    },
    securityFirewall: {
      explanation: 'Follow how a stateful firewall evaluates packets against its rule table from top to bottom:',
      steps: [
        'Step 1 — Inspect Packet 5-Tuple: Check source/destination IP, protocol (TCP/UDP/ICMP), port number, and direction.',
        'Step 2 — Apply First Matching Rule: Step down the rule list in order (1, 2, 3...) and execute the very first rule that matches.',
        'Step 3 — Enforce Implicit Deny All: Drop and log any unsolicited inbound traffic that reaches the bottom of the table.'
      ]
    },
    osiIntroduction: {
      explanation: 'Follow how clicking a web link relies on all seven layers of the OSI Reference Model working together:',
      steps: [
        'Step 1 — Upper Host Layers (L7–L5): The browser formats, encrypts (TLS), and manages the application request.',
        'Step 2 — Transport & Network (L4–L3): TCP adds port numbers for reliability, and IP adds source/destination addresses for routing.',
        'Step 3 — Data Link & Physical (L2–L1): Ethernet frames the packet with MAC addresses and sends bits over the cable or Wi-Fi.'
      ]
    },
    topology: {
      explanation: 'Trace how different physical topologies handle normal frame delivery and single-link or single-device failures:',
      steps: [
        'Step 1 — Inspect Physical Layout: Identify whether hosts connect to a central switch (Star), shared cable (Bus), loop (Ring), or grid (Mesh).',
        'Step 2 — Trace Normal Delivery: Follow the path a message takes from source PC to destination PC.',
        'Step 3 — Simulate a Link Break: Disconnect one cable and observe whether only one host stops (Star/Mesh) or the whole line fails (Bus).',
        'Step 4 — Choose the Right Design: Match Star/Tree to classroom LANs and Mesh to high-availability core backbones.'
      ]
    },
    osiStack: {
      explanation: 'Trace how the seven OSI layers cooperate during encapsulation at the sender and decapsulation at the receiver:',
      steps: [
        'Step 1 — Upper Layers (L7–L5): Application, Presentation, and Session prepare, encode, encrypt, and manage the user Data.',
        'Step 2 — Transport Layer (L4 Segment): Adds TCP or UDP source and destination port numbers for end-to-end delivery.',
        'Step 3 — Network Layer (L3 Packet): Adds source and destination IP addresses so routers can choose the best path.',
        'Step 4 — Data Link & Physical (L2 Frame → L1 Bits): Adds local MAC addresses and FCS, then transmits binary bits on the medium.'
      ]
    },
    encapsulation: {
      explanation: 'Follow a message as each layer attaches its control header before transmission and strips it upon arrival:',
      steps: [
        'Step 1 — Application Data: Start with the user payload (for example, an HTTP web request).',
        'Step 2 — Transport & Network Headers: Wrap the data in a TCP Segment (ports) and then an IP Packet (source/destination IPs).',
        'Step 3 — Data Link Frame & Physical Bits: Add the Ethernet MAC header and FCS trailer, then send raw bits across the cable.',
        'Step 4 — Receiver Decapsulation: The destination host verifies and removes L2, L3, and L4 headers from bottom to top.'
      ]
    },
    mediaExplorer: {
      explanation: 'Select the right physical transmission medium by comparing distance, interference environment, and bandwidth needs:',
      steps: [
        'Step 1 — Check Run Distance: Use UTP/STP copper for horizontal drops up to 100 m; choose fiber-optic for building-to-building links.',
        'Step 2 — Check Electrical Noise: Use standard UTP in classrooms/offices and shielded STP or fiber near heavy machinery.',
        'Step 3 — Check Mobility Needs: Deploy Wi-Fi (802.11) access points for laptops and phones that move around.',
        'Step 4 — Verify Category Rating: Use Cat 6 or Cat 6A twisted pair to support reliable 1 Gbps to 10 Gbps Ethernet speeds.'
      ]
    },
    cable: {
      explanation: 'Assemble and test a standard straight-through RJ45 Ethernet patch cable step by step:',
      steps: [
        'Step 1 — Strip & Untwist Carefully: Strip ~2.5 cm of outer jacket without nicking copper, and untwist pairs no more than 1.3 cm.',
        'Step 2 — Align T568B Color Order: Flatten wires 1 to 8 (W/Orange, Orange, W/Green, Blue, W/Blue, Green, W/Brown, Brown) and trim flush.',
        'Step 3 — Insert & Crimp Firmly: Push wires fully to the gold pins with the jacket inside the strain relief, then squeeze the crimper.',
        'Step 4 — Verify Pins 1–8 on Tester: Attach main and remote tester units and confirm LEDs 1 through 8 light in matching order.'
      ]
    },
    osiLayer: {
      explanation: 'Compare how TCP and UDP handle packet delivery when a network link experiences congestion or loss:',
      steps: [
        'Step 1 — TCP Handshake & Sequence Numbers: TCP establishes a connection and numbers every segment before sending.',
        'Step 2 — TCP Retransmission on Loss: If a segment drops, TCP detects the missing acknowledgment and retransmits it.',
        'Step 3 — UDP Immediate Transmission: UDP sends datagrams immediately without a handshake or retransmission delay.',
        'Step 4 — Match to Application: Use TCP for web, email, and files; use UDP for live voice, video conferencing, and DNS.'
      ]
    },
    protocolWeb: {
      explanation: 'Opening a website coordinates five core protocols in sequence before the page appears on screen:',
      steps: [
        'Step 1 — DNS Name Lookup: The PC queries its DNS server (UDP port 53) to translate the domain name into an IPv4 address.',
        'Step 2 — ARP Gateway Resolution: The PC broadcasts an ARP request to learn the local Default Gateway router’s MAC address.',
        'Step 3 — TCP 3-Way Handshake: The browser opens a reliable connection (SYN, SYN-ACK, ACK) to the web server on port 80 or 443.',
        'Step 4 — HTTP/HTTPS Request & Response: The browser sends an encrypted GET request and receives the web page payload.'
      ]
    },
    protocolDirectory: {
      explanation: 'Network administrators identify services by their protocol name, transport type (TCP/UDP), and default port number:',
      steps: [
        'Web & Secure Transfer: HTTP (TCP 80), HTTPS (TCP 443), FTP (TCP 20/21), SSH/SFTP (TCP 22).',
        'Naming & Automatic Addressing: DNS (UDP/TCP 53), DHCP Server/Client (UDP 67/68), ARP (Layer 2 Ethernet).',
        'Email Services: SMTP outgoing mail (TCP 25/587), POP3 (TCP 110/995), IMAP4 inbox sync (TCP 143/993).',
        'Windows Sharing & Diagnostics: SMB file sharing (TCP 445), RDP remote desktop (TCP 3389), ICMP ping/traceroute.'
      ]
    },
    bitwiseDemo: {
      explanation: 'A device finds its Network ID by combining its IPv4 address and subnet mask using a bitwise AND operation:',
      steps: [
        'Step 1 — Convert IP to Binary: Write each of the four decimal octets (e.g., 192.168.10.25) as an 8-bit binary number.',
        'Step 2 — Convert Mask to Binary: Write the subnet mask (e.g., 255.255.255.0) as consecutive 1s (network) followed by 0s (host).',
        'Step 3 — Apply Bitwise AND: Compare each bit pair vertically—1 AND 1 equals 1; any pair with a 0 equals 0.',
        'Step 4 — Read the Network ID: Convert the result back to decimal (192.168.10.0) to identify the host’s local subnet.'
      ]
    },
    subnet: {
      explanation: 'Calculate any subnet’s Network ID, Broadcast IP, and usable host range from its IPv4 address and CIDR prefix:',
      steps: [
        'Step 1 — Count Host Bits (h): Subtract the CIDR prefix from 32 (for /26, h = 32 − 26 = 6 host bits).',
        'Step 2 — Find Usable Hosts: Calculate 2^h − 2 (for 6 host bits, 2^6 − 2 = 62 usable host addresses).',
        'Step 3 — Find Block Size: Subtract the interesting mask octet from 256 (256 − 192 = block size of 64).',
        'Step 4 — List Subnet Boundaries: Network ID = .0 (or multiple of 64), Usable Hosts = First + 1 to Last − 1, Broadcast = NextBlock − 1.'
      ]
    },
    addressExplorer: {
      explanation: 'Verify a workstation’s static or dynamic IPv4 configuration to ensure local and Internet reachability:',
      steps: [
        'Step 1 — Check IPv4 & Subnet Mask: Confirm the host IP belongs to the local subnet and is not duplicated by another PC.',
        'Step 2 — Check Default Gateway: Confirm the gateway IP matches the local router’s LAN interface on the same subnet.',
        'Step 3 — Check DNS Server: Confirm a valid DNS server IP is configured so website domain names can resolve.',
        'Step 4 — Test with ipconfig & ping: Run ipconfig /all, ping the default gateway, and ping an external host to confirm.'
      ]
    },
    dhcp: {
      explanation: 'Trace how a client obtains, renews, and releases an automatic IPv4 lease from a DHCP server:',
      steps: [
        'Step 1 — Discover & Offer: The client broadcasts DHCP Discover; the server reserves an available IP and replies with DHCP Offer.',
        'Step 2 — Request & Acknowledge: The client broadcasts DHCP Request; the server commits the lease and sends DHCP ACK.',
        'Step 3 — Lease Renewal (T1 / T2): At 50% lease time (T1), the client requests renewal; if unreachable, it rebinds at 87.5% (T2).',
        'Step 4 — Release or APIPA Fallback: ipconfig /release returns the IP early; if no server responds at boot, Windows uses 169.254.x.x.'
      ]
    },
    sharingWorkbench: {
      explanation: 'Configure and verify secure folder and printer sharing between Windows computers on a local area network:',
      steps: [
        'Step 1 — Set Private Profile & Discovery: Enable Private Network Profile, Network Discovery, and File & Printer Sharing.',
        'Step 2 — Assign Share & NTFS Permissions: Grant least-privilege permissions—remembering the most restrictive rule wins.',
        'Step 3 — Connect via UNC or Mapped Drive: Access \\\\Server\\ShareName from a peer PC and map it to a drive letter (e.g., Z:).',
        'Step 4 — Verify Read/Write Access: Test opening or saving a file to confirm permissions and firewall rules work properly.'
      ]
    },
    wifi: {
      explanation: 'Configure a SOHO wireless router safely for a home, classroom, or small office network:',
      steps: [
        'Step 1 — Connect WAN & LAN Cables: Plug the ISP modem into the WAN port and local wired PCs/switches into LAN ports 1–4.',
        'Step 2 — Secure Router Admin Login: Sign into the router gateway (e.g., 192.168.1.1) and replace the default admin password.',
        'Step 3 — Configure SSID & Bands: Set a clear Wi-Fi SSID on 2.4 GHz (Channels 1, 6, or 11) and 5 GHz for high-speed devices.',
        'Step 4 — Enable WPA2-AES / WPA3 & Guest Wi-Fi: Turn on strong encryption and isolate visitor phones on a separate Guest SSID.'
      ]
    },
    troubleshoot: {
      explanation: 'Use Windows command-line tools in sequence to isolate and repair network connectivity faults:',
      steps: [
        'Step 1 — Inspect Adapter State (ipconfig /all): Check for unplugged media, 169.254.x.x APIPA, wrong mask, or missing gateway.',
        'Step 2 — Test Local & Remote Reachability (ping): Ping 127.0.0.1 (loopback), the default gateway IP, and an outside IP (8.8.8.8).',
        'Step 3 — Check Path & Naming (tracert / nslookup / arp -a): Isolate where packets stop or whether DNS name lookup failed.',
        'Step 4 — Apply One Fix & Retest: Correct the identified fault, re-run the failed command to prove recovery, and document.'
      ]
    },
    security: {
      explanation: 'Evaluate firewall rules and layered security controls to protect a network from unauthorized access:',
      steps: [
        'Step 1 — Inspect Packet Fields: A stateful firewall checks source/destination IP, protocol (TCP/UDP/ICMP), and port number.',
        'Step 2 — Evaluate Rules Top-Down: The firewall compares the packet against rules from top to bottom and applies the first match.',
        'Step 3 — Enforce Implicit Deny: Any traffic not explicitly permitted is blocked by the final Deny All rule at the bottom.',
        'Step 4 — Layer Endpoint & User Defenses: Combine firewall rules with WPA3, HTTPS/TLS, antivirus updates, and MFA.'
      ]
    }
  };

  return procedures[slide.type] || null;
}

// Special structured reference tables for key topics (rendered as native editable PowerPoint <a:tbl> tables!)
function getSpecialTableForSlide(topic, slide) {
  const title = String(slide.title || '');

  if (title.includes('Five IPv4 Address Classes')) {
    return {
      headers: ['Class', 'Lead Bits', 'First Octet Range', 'Octet Format', 'Default Mask', 'Networks / Usable Hosts'],
      colWeights: [1.0, 1.0, 1.5, 1.2, 1.6, 2.2],
      fontSize: 11,
      rows: [
        ['Class A', '0', '0 – 127 (1–126 usable)', 'N.H.H.H', '255.0.0.0 (/8)', '126 nets / 16,777,214 hosts'],
        ['Class B', '10', '128 – 191', 'N.N.H.H', '255.255.0.0 (/16)', '16,384 nets / 65,534 hosts'],
        ['Class C', '110', '192 – 223', 'N.N.N.H', '255.255.255.0 (/24)', '2,097,152 nets / 254 hosts'],
        ['Class D', '1110', '224 – 239', 'Multicast Group', 'N/A (Multicast)', 'One-to-many group delivery'],
        ['Class E', '1111', '240 – 255', 'Experimental', 'N/A (Reserved)', 'Research & future testing']
      ]
    };
  }

  if (title.includes('Classful History vs Modern Subnetting')) {
    return {
      headers: ['CIDR Prefix', 'Dotted-Decimal Mask', 'Subnets (from /24)', 'Block Size', 'Usable Hosts (2^h − 2)'],
      colWeights: [1.1, 2.0, 1.4, 1.2, 1.8],
      fontSize: 11,
      rows: [
        ['/24', '255.255.255.0', '1 subnet', '256', '254 usable hosts'],
        ['/25', '255.255.255.128', '2 subnets', '128', '126 usable hosts'],
        ['/26', '255.255.255.192', '4 subnets', '64', '62 usable hosts'],
        ['/27', '255.255.255.224', '8 subnets', '32', '30 usable hosts'],
        ['/28', '255.255.255.240', '16 subnets', '16', '14 usable hosts'],
        ['/29', '255.255.255.248', '32 subnets', '8', '6 usable hosts'],
        ['/30', '255.255.255.252', '64 subnets', '4', '2 usable hosts (Point-to-Point)']
      ]
    };
  }

  if (title.includes('Five IPv4 Address Classes')) {
    return {
      headers: ['Class', 'Starting Bits', 'First Number', 'Default Mask', 'Everyday Use'],
      colWeights: [0.9, 1.1, 1.3, 1.7, 2.8],
      fontSize: 11.4,
      rows: [
        ['Class A', '0...', '1 – 126', '255.0.0.0 (/8)', 'Very large organizations (up to 16M hosts)'],
        ['Class B', '10...', '128 – 191', '255.255.0.0 (/16)', 'Medium campuses & companies (65K hosts)'],
        ['Class C', '110...', '192 – 223', '255.255.255.0 (/24)', 'Small offices, labs & home LANs (254 hosts)'],
        ['Class D', '1110...', '224 – 239', 'N/A (Group)', 'Group streaming & multicast traffic'],
        ['Class E', '1111...', '240 – 255', 'N/A (Reserved)', 'Reserved for research and future testing']
      ]
    };
  }

  if (title.includes('Seven OSI layer responsibilities')) {
    return {
      headers: ['Layer #', 'OSI Layer Name', 'PDU Name', 'Core Responsibility & Common Examples'],
      colWeights: [0.9, 1.5, 1.1, 3.8],
      fontSize: 11,
      rows: [
        ['Layer 7', 'Application', 'Data', 'User-facing network services (HTTP, HTTPS, DNS, DHCP, SMTP)'],
        ['Layer 6', 'Presentation', 'Data', 'Data formatting, UTF-8 encoding, compression, and TLS encryption'],
        ['Layer 5', 'Session', 'Data', 'Starts, maintains, and closes communication sessions between apps'],
        ['Layer 4', 'Transport', 'Segment', 'End-to-end delivery, TCP reliability / UDP speed, and port numbers'],
        ['Layer 3', 'Network', 'Packet', 'Logical IPv4/IPv6 addressing and router path selection across networks'],
        ['Layer 2', 'Data Link', 'Frame', 'Hardware MAC addressing, switch forwarding, and FCS error detection'],
        ['Layer 1', 'Physical', 'Bits', 'Transmits raw binary 1s and 0s over copper, fiber, or wireless radio']
      ]
    };
  }

  if (title.includes('Ten Core Network Protocols') || title.includes('Protocol functions and common port')) {
    return {
      headers: ['Protocol', 'Transport / Port', 'Layer', 'Primary Function in a Network'],
      colWeights: [1.1, 1.4, 1.1, 3.6],
      fontSize: 10.8,
      rows: [
        ['HTTP / HTTPS', 'TCP 80 / 443', 'Application', 'Transfers web pages (HTTPS encrypts traffic with TLS)'],
        ['DNS', 'UDP / TCP 53', 'Application', 'Translates domain names (example.com) into IP addresses'],
        ['DHCP', 'UDP 67 / 68', 'Application', 'Automatically leases IP, mask, gateway, and DNS to clients'],
        ['FTP / SFTP / SSH', 'TCP 20, 21 / 22', 'Application', 'Transfers files and provides encrypted remote CLI management'],
        ['SMTP / IMAP / POP3', 'TCP 25, 143, 110', 'Application', 'Sends outgoing email (SMTP) and retrieves inbox messages'],
        ['SMB', 'TCP 445', 'Application', 'Shares folders, files, and printers across Windows LANs'],
        ['TCP vs UDP', 'Port Numbers', 'Transport', 'TCP guarantees ordered delivery; UDP offers low-latency speed'],
        ['IP / ICMP / ARP', 'Layer 3 & Layer 2', 'Internet/Link', 'IP routes packets; ICMP runs ping/tracert; ARP finds local MACs']
      ]
    };
  }

  if (title.includes('T568A:')) {
    return {
      headers: ['Pin #', 'Wire Color (T568A)', 'Pair', '100BASE-TX Role / 1000BASE-T'],
      colWeights: [0.8, 2.2, 1.0, 3.2],
      fontSize: 10.6,
      rows: [
        ['Pin 1', 'White / Green', 'Pair 3', 'TX+ (Transmit +) / BI_DA+'],
        ['Pin 2', 'Green', 'Pair 3', 'TX− (Transmit −) / BI_DA−'],
        ['Pin 3', 'White / Orange', 'Pair 2', 'RX+ (Receive +) / BI_DB+'],
        ['Pin 4', 'Blue', 'Pair 1', 'Unused (100M) / BI_DC+ (1G)'],
        ['Pin 5', 'White / Blue', 'Pair 1', 'Unused (100M) / BI_DC− (1G)'],
        ['Pin 6', 'Orange', 'Pair 2', 'RX− (Receive −) / BI_DB−'],
        ['Pin 7', 'White / Brown', 'Pair 4', 'Unused (100M) / BI_DD+ (1G)'],
        ['Pin 8', 'Brown', 'Pair 4', 'Unused (100M) / BI_DD− (1G)']
      ]
    };
  }

  if (title.includes('T568B:')) {
    return {
      headers: ['Pin #', 'Wire Color (T568B)', 'Pair', '100BASE-TX Role / 1000BASE-T'],
      colWeights: [0.8, 2.2, 1.0, 3.2],
      fontSize: 10.6,
      rows: [
        ['Pin 1', 'White / Orange', 'Pair 2', 'TX+ (Transmit +) / BI_DA+'],
        ['Pin 2', 'Orange', 'Pair 2', 'TX− (Transmit −) / BI_DA−'],
        ['Pin 3', 'White / Green', 'Pair 3', 'RX+ (Receive +) / BI_DB+'],
        ['Pin 4', 'Blue', 'Pair 1', 'Unused (100M) / BI_DC+ (1G)'],
        ['Pin 5', 'White / Blue', 'Pair 1', 'Unused (100M) / BI_DC− (1G)'],
        ['Pin 6', 'Green', 'Pair 3', 'RX− (Receive −) / BI_DB−'],
        ['Pin 7', 'White / Brown', 'Pair 4', 'Unused (100M) / BI_DD+ (1G)'],
        ['Pin 8', 'Brown', 'Pair 4', 'Unused (100M) / BI_DD− (1G)']
      ]
    };
  }

  if (title.includes('Six Windows diagnostic commands')) {
    return {
      headers: ['Command', 'What It Displays or Tests', 'Typical Fault It Isolates'],
      colWeights: [1.4, 2.8, 2.8],
      fontSize: 11.2,
      rows: [
        ['ipconfig', 'Active IPv4 address, subnet mask, and default gateway', 'Spots blank IPs, 169.254.x.x APIPA, or wrong subnet'],
        ['ipconfig /all', 'Full adapter report: MAC, DHCP server, lease times, DNS', 'Verifies which DHCP/DNS server configured the PC'],
        ['ping <target>', 'Sends ICMP Echo requests to test reachability & RTT (ms)', 'Proves whether local gateway or remote IP responds'],
        ['tracert <target>', 'Lists every router hop along the path to a destination', 'Shows the exact router hop where packets stall or drop'],
        ['nslookup <name>', 'Queries the DNS server to resolve a domain name to an IP', 'Separates DNS lookup failures from broken routing'],
        ['arp -a', 'Displays the local IP-to-MAC address resolution cache', 'Verifies local Layer 2 neighbor and gateway MAC discovery']
      ]
    };
  }

  return null;
}

function buildModulePptx(topic) {
  const modNum = topic.number;
  const enrich = MODULE_ENRICHMENTS[topic.id];
  const deck = new PptxDeck({
    title: topic.title,
    topicId: topic.id,
    moduleNumber: modNum,
    presenter: 'Rod Allen B. Agregado'
  });

  // 1. Cover Slide
  addCoverSlide(deck, {
    moduleNumber: modNum,
    topicTitle: topic.title
  });

  // 2. Learning Objectives Slide
  addObjectivesSlide(deck, {
    objectives: simplifyList(topic.objectives || []),
    imagePath: enrich?.objectivesImage || 'images/devices/switch.webp'
  });

  const usedSections = new Set();
  const usedDiscussions = new Set();
  const usedComparisons = new Set();
  const usedDiagrams = new Set();

  const isCoreTopicExample = (topicId, sl) => {
    const t = String(sl.title || '').toLowerCase();
    if (topicId === '01-introduction-to-networking') {
      return /\((pan|lan|man|wan)\)/.test(t);
    }
    if (topicId === '03-network-topologies') {
      return /(star|bus|ring|mesh|tree|hybrid) topology/.test(t);
    }
    return false;
  };

  // Iterate through the website's exact slide sequence
  topic.slides.forEach((slide, idx) => {
    if (idx === 0 || slide.kind === 'title' || slide.kind === 'objectives' || slide.kind === 'summary') {
      return;
    }

    // Skip step-by-step interactive demos and non-core STEP-BY-STEP example slides
    if (slide.kind === 'demo' || (slide.kind === 'example' && !isCoreTopicExample(topic.id, slide))) {
      return;
    }

    const slideTitle = String(slide.title || '');
    const labelRange = Array.isArray(slide.itemLabels) && slide.itemLabels.length >= 2
      ? ` (${slide.itemLabels[0]}–${slide.itemLabels[slide.itemLabels.length - 1]})`
      : '';
    const displayTitle = labelRange && !slideTitle.includes('(') ? `${slideTitle}${labelRange}` : slideTitle;

    // Check if a Section Divider should appear before this slide
    if (enrich?.sections) {
      enrich.sections.forEach((sec, sIdx) => {
        if (!usedSections.has(sIdx) && slideTitle.toLowerCase().includes(sec.beforeMatch.toLowerCase())) {
          usedSections.add(sIdx);
          addSectionDividerSlide(deck, {
            sectionNumber: sec.number,
            title: sec.title,
            overview: simplifyTerminology(sec.overview),
            notes: `Section ${sec.number}: ${sec.title} — Aligns with Networking 1 Website (#/topic/${topic.id}/slide/${idx + 1}).`
          });
        }
      });
    }

    const sourceNote = `Source Website Page: Networking 1 — Module ${String(modNum).padStart(2, '0')} (${topic.title}), Slide ${idx + 1} (#/topic/${topic.id}/slide/${idx + 1}).`;

    // Check if this slide is better rendered as a full Editable Reference Table
    const specialTable = getSpecialTableForSlide(topic, slide);
    if (specialTable) {
      addTableOrBarsSlide(deck, {
        title: displayTitle,
        lead: simplifyTerminology(slide.lead || 'Use this reference table alongside the interactive Networking 1 website:'),
        table: specialTable,
        notes: `${displayTitle}\n${slide.lead || ''}\n${sourceNote}`
      });
    } else if (slide.kind === 'example') {
      // Kept core topic slides (PAN/LAN/MAN/WAN in M01; Star/Bus/Ring/Mesh/Tree/Hybrid in M02) as concise concept bullets
      const explanation = simplifyTerminology(slide.lead || `Key concepts of ${displayTitle}:`);
      const calloutBullets = simplifyList(Array.isArray(slide.bullets) && slide.bullets.length > 0
        ? slide.bullets
        : Array.isArray(slide.items) && slide.items.length > 0
          ? slide.items
          : [explanation]);

      addTeachingSlide(deck, {
        title: displayTitle,
        explanation,
        calloutBullets,
        visual: resolveSlideVisual(topic, slide, idx + 1, usedDiagrams),
        notes: `${displayTitle}\n${explanation}\n${calloutBullets.join('\n')}\n${sourceNote}`
      });
    } else {
      // Standard Concept / Walkthrough Slide
      const cleanLines = arr => (Array.isArray(arr) ? arr : []).filter(s => !/^Default port or identifier:\s*\.?$/i.test(String(s || '').trim()));
      const paragraphs = simplifyList(cleanLines(slide.paragraphs));
      const items = simplifyList(cleanLines(slide.items));
      const visual = resolveSlideVisual(topic, slide, idx + 1, usedDiagrams);
      const totalItemChars = items.reduce((acc, s) => acc + String(s).length, 0);
      const keepTogether = topic.id === '06-network-cables-media' && slideTitle.toLowerCase().includes('ethernet cable categories');
      const splitThreshold = keepTogether ? 420 : (visual ? 290 : 480);

      // Split crowded multi-item slides across 2 spacious slides so text stays large and uncluttered
      if (items.length >= 5 || (visual && items.length >= 4) || (items.length >= 3 && totalItemChars > splitThreshold)) {
        const mid = Math.ceil(items.length / 2);
        const part1 = items.slice(0, mid);
        const part2 = items.slice(mid);
        const labels1 = Array.isArray(slide.itemLabels) ? slide.itemLabels.slice(0, mid) : null;
        const labels2 = Array.isArray(slide.itemLabels) ? slide.itemLabels.slice(mid) : null;

        const formatRangeTitle = (base, lbls, fallbackPart) => {
          if (Array.isArray(lbls) && lbls.length > 0) {
            const first = lbls[0];
            const last = lbls[lbls.length - 1];
            return first === last ? `${base} (${first})` : `${base} (${first}–${last})`;
          }
          return `${base} (${fallbackPart})`;
        };

        const title1 = formatRangeTitle(slideTitle, labels1, 'PART 1');
        const title2 = formatRangeTitle(slideTitle, labels2, 'PART 2');

        addTeachingSlide(deck, {
          title: title1,
          explanation: simplifyTerminology(slide.lead || paragraphs[0] || `Key concepts for ${slideTitle}:`),
          calloutBullets: part1,
          itemLabels: labels1,
          visual,
          notes: `${title1}\n${slide.lead || ''}\n${part1.join('\n')}\n${sourceNote}`
        });

        addTeachingSlide(deck, {
          title: title2,
          explanation: simplifyTerminology(paragraphs[1] || slide.lead || `Continuing ${slideTitle}:`),
          calloutBullets: part2,
          itemLabels: labels2,
          visual: null,
          notes: `${title2}\n${part2.join('\n')}\n${sourceNote}`
        });
      } else {
        const explanation = simplifyTerminology(slide.lead || paragraphs[0] || `Key principles of ${displayTitle}:`);
        const visualConceptBullets = {
          osiIntroduction: [
            'Upper Host Layers (7–5): Application, Presentation, and Session prepare user data, text formatting, and encryption.',
            'Lower Media & Transport Layers (4–1): Transport ports, Network IPs, Data Link MAC frames, and Physical signals move data across networks.'
          ],
          securityFirewall: [
            'Top-Down Rule Matching: Firewalls check each packet’s IP, protocol, and port against rules in order and apply the first match.',
            'Remembers Active Connections & Default Block: Replies to your outgoing requests are allowed while unrequested incoming traffic is blocked.'
          ]
        };

        const calloutBullets = items.length > 0
          ? items
          : paragraphs.length > 0
            ? (slide.lead ? paragraphs : paragraphs.slice(1))
            : (visualConceptBullets[slide.type] || [simplifyTerminology(slide.lead || 'Essential concept in computer networking.')]);

        addTeachingSlide(deck, {
          title: displayTitle,
          explanation,
          calloutBullets: calloutBullets.length > 0 ? calloutBullets : [explanation],
          itemLabels: Array.isArray(slide.itemLabels) ? slide.itemLabels : null,
          visual,
          notes: `${displayTitle}\n${explanation}\n${calloutBullets.join('\n')}\n${sourceNote}`
        });
      }
    }

    // Check if a Blue vs. Yellow Comparison Slide should appear after this slide
    if (enrich?.comparisons) {
      enrich.comparisons.forEach((comp, cIdx) => {
        if (!usedComparisons.has(cIdx) && slideTitle.toLowerCase().includes(comp.afterMatch.toLowerCase())) {
          usedComparisons.add(cIdx);
          addComparisonSlide(deck, {
            title: simplifyTerminology(comp.title),
            leftTitle: simplifyTerminology(comp.leftTitle),
            leftBullets: simplifyList(comp.leftBullets),
            rightTitle: simplifyTerminology(comp.rightTitle),
            rightBullets: simplifyList(comp.rightBullets),
            notes: `Comparison: ${comp.title}\n${sourceNote}`
          });
        }
      });
    }

    // Check if a Standalone Red-Orange Discussion Question Slide should appear after this slide
    if (enrich?.discussions) {
      enrich.discussions.forEach((disc, dIdx) => {
        if (!usedDiscussions.has(dIdx) && slideTitle.toLowerCase().includes(disc.afterMatch.toLowerCase())) {
          usedDiscussions.add(dIdx);
          addDiscussionSlide(deck, {
            question: disc.question,
            notes: `Discussion Prompt after "${slideTitle}":\n${disc.question}\nAsk 2–3 students to share concrete examples from their home Wi-Fi or school computer laboratory.`
          });
        }
      });
    }
  });

  // Append any remaining comparisons that didn't match a substring
  if (enrich?.comparisons) {
    enrich.comparisons.forEach((comp, cIdx) => {
      if (!usedComparisons.has(cIdx)) {
        addComparisonSlide(deck, {
          title: simplifyTerminology(comp.title),
          leftTitle: simplifyTerminology(comp.leftTitle),
          leftBullets: simplifyList(comp.leftBullets),
          rightTitle: simplifyTerminology(comp.rightTitle),
          rightBullets: simplifyList(comp.rightBullets),
          notes: comp.notes || ''
        });
      }
    });
  }

  // 3. Final Slide: Summary of the Discussion (no Recap, Knowledge Check, or References slides)
  const summarySlide = topic.slides.find(s => s.kind === 'summary');
  const summaryItems = simplifyList(summarySlide?.items?.length
    ? summarySlide.items
    : (topic.objectives || []).slice(0, 4));

  addSummaryOfDiscussionSlide(deck, { summaryItems });

  const modNumStr = String(modNum).padStart(2, '0');
  const shortTitle = String(topic.title || '')
    .replace(/^Open Systems Interconnection \(OSI\)/i, 'OSI')
    .replace(/^Internet Protocol \(IP\)/i, 'IP')
    .replace(/:\s*(.+)$/, ' ($1)')
    .replace(/[<>:"/\\|?*]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const fileName = `M${modNum} - ${shortTitle}.pptx`;
  const outPath = resolve(modulesDir, fileName);
  deck.saveToPptx(outPath);
  return {
    moduleNumber: modNumStr,
    title: topic.title,
    fileName,
    outPath,
    slideCount: deck.slides.length,
    warnings: deck.auditWarnings.length
  };
}

mkdirSync(modulesDir, { recursive: true });
console.log(`Generating 12 editable PowerPoint (.pptx) modules in ${modulesDir}...`);
const results = [];
for (const topic of topics) {
  const res = buildModulePptx(topic);
  results.push(res);
  console.log(`  Created: modules/${res.fileName} (${res.slideCount} slides, ${res.warnings} layout warnings)`);
}
console.log('Done: All 12 editable .pptx modules created cleanly.');
