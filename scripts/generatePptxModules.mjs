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
    return {
      kind: 'photo',
      imagePath: dev.image,
      caption: `${dev.shortName || dev.name} · ${dev.role}`
    };
  }
  if (slide.toolKey && toolsMetadata[slide.toolKey]?.image) {
    const tool = toolsMetadata[slide.toolKey];
    return {
      kind: 'photo',
      imagePath: tool.image,
      caption: tool.title
    };
  }

  // 2. Slide-specific real hardware/media/tool photos from public/images/
  if (title.includes('unshielded twisted pair') || title.includes('utp')) {
    return useOnce('photo-utp', { kind: 'photo', imagePath: 'images/media/utp_cable.webp', caption: '4-Pair Unshielded Twisted Pair (UTP)' });
  }
  if (title.includes('shielded twisted pair') || title.includes('stp')) {
    return useOnce('photo-stp', { kind: 'photo', imagePath: 'images/media/stp_cable.webp', caption: 'Shielded Twisted Pair (STP) Foil/Braid' });
  }
  if (title.includes('coaxial')) {
    return useOnce('photo-coax', { kind: 'photo', imagePath: 'images/media/coaxial_cutaway.webp', caption: '4-Layer Coaxial Cable Structure' });
  }
  if (title.includes('fiber')) {
    return useOnce('photo-fiber', { kind: 'photo', imagePath: 'images/media/fiber_types.webp', caption: 'Single-Mode vs Multi-Mode Optical Fiber' });
  }
  if (title.includes('wireless media') || title.includes('unguided media') || title.includes('wi-fi frequencies') || title.includes('frequency band')) {
    return useOnce('photo-ap', { kind: 'photo', imagePath: 'images/devices/ap.webp', caption: 'Wireless Access Point (IEEE 802.11)' });
  }
  if (title.includes('ethernet categories')) {
    return useOnce('photo-cat', { kind: 'photo', imagePath: 'images/media/ethernet_categories.webp', caption: 'Twisted-Pair Categories (Cat 5e – Cat 8)' });
  }
  if (title.includes('rj45') || title.includes('modular connector')) {
    return useOnce('photo-rj45', { kind: 'photo', imagePath: 'images/tools/rj45_plugs.webp', caption: '8P8C RJ45 Modular Plug Connectors' });
  }
  if (title.includes('crimp') || title.includes('termination')) {
    return useOnce('photo-crimp', { kind: 'photo', imagePath: 'images/tools/rj45_good_vs_bad.webp', caption: 'Proper vs Improper RJ45 Crimp Seat' });
  }
  if (title.includes('cable fault') || title.includes('cable test') || title.includes('wiring fault') || title.includes('wire-map')) {
    return useOnce('photo-tester', { kind: 'photo', imagePath: 'images/tools/cable_tester.webp', caption: '2-Piece RJ45 Cable Continuity Tester' });
  }
  if (title.includes('wan vs lan') || title.includes('gateway interface') || title.includes('inside a home or lab wireless router')) {
    return useOnce('photo-router-rear', { kind: 'photo', imagePath: 'images/router/router_rear.webp', caption: 'SOHO Router WAN Uplink & 4 LAN Ports' });
  }

  // 3. Slide-specific Editable Labeled Diagrams (each shown ONCE on its exact matching slide)
  if (title.includes('components of computer networks')) {
    return useOnce('diag-components', {
      kind: 'diagram',
      title: '4 CORE NETWORK COMPONENTS',
      arrows: [{ x: 0.48, y: 0.20, w: 0.04, h: 0.55 }],
      nodes: [
        { x: 0.08, y: 0.06, w: 0.84, h: 0.24, label: '1. END DEVICES (HOSTS)', sub: 'PCs, Phones, Printers & Servers', variant: 'blue' },
        { x: 0.08, y: 0.37, w: 0.84, h: 0.24, label: '2. NETWORKING DEVICES', sub: 'Switches, Access Points & Routers', variant: 'yellow' },
        { x: 0.08, y: 0.68, w: 0.84, h: 0.24, label: '3. MEDIA & 4. PROTOCOLS', sub: 'Copper/Fiber/Wi-Fi + IP, TCP, HTTP', variant: 'navy' }
      ],
      footer: 'All 4 core components work together'
    });
  }

  if (title.includes('five elements') || title.includes('conversation')) {
    return useOnce('diag-5elements', {
      kind: 'diagram',
      title: '5 ELEMENTS OF COMMUNICATION',
      arrows: [
        { x: 0.25, y: 0.24, w: 0.50, h: 0.04 },
        { x: 0.48, y: 0.24, w: 0.04, h: 0.48 }
      ],
      nodes: [
        { x: 0.04, y: 0.14, w: 0.40, h: 0.22, label: '1. SENDER', sub: 'Source PC', variant: 'blue' },
        { x: 0.56, y: 0.14, w: 0.40, h: 0.22, label: '2. RECEIVER', sub: 'Target PC', variant: 'blue' },
        { x: 0.18, y: 0.44, w: 0.64, h: 0.20, label: '3. MESSAGE & 4. MEDIUM', sub: 'Data over Cable / Wi-Fi', variant: 'yellow' },
        { x: 0.12, y: 0.72, w: 0.76, h: 0.22, label: '5. PROTOCOL RULES', sub: 'Shared Format, Timing & Checks', variant: 'navy' }
      ],
      footer: 'All 5 elements must work together'
    });
  }

  if (title === 'star topology' || title.includes('star topology')) {
    return useOnce('diag-star', {
      kind: 'diagram',
      title: 'STAR TOPOLOGY (LAN)',
      arrows: [
        { x: 0.22, y: 0.22, w: 0.56, h: 0.03 },
        { x: 0.22, y: 0.72, w: 0.56, h: 0.03 },
        { x: 0.48, y: 0.22, w: 0.04, h: 0.53 }
      ],
      nodes: [
        { x: 0.04, y: 0.08, w: 0.36, h: 0.22, label: 'PC 1', sub: 'Drop Link', variant: 'white' },
        { x: 0.60, y: 0.08, w: 0.36, h: 0.22, label: 'PC 2', sub: 'Drop Link', variant: 'white' },
        { x: 0.20, y: 0.38, w: 0.60, h: 0.24, label: 'CENTRAL SWITCH', sub: 'MAC Table Forwarding', variant: 'blue' },
        { x: 0.04, y: 0.70, w: 0.36, h: 0.22, label: 'PC 3', sub: 'Drop Link', variant: 'white' },
        { x: 0.60, y: 0.70, w: 0.36, h: 0.22, label: 'Printer', sub: 'Drop Link', variant: 'yellow' }
      ],
      footer: '1 cut cable affects only 1 host'
    });
  }

  if (title === 'bus topology' || title.includes('bus topology')) {
    return useOnce('diag-bus', {
      kind: 'diagram',
      title: 'BUS TOPOLOGY (BACKBONE)',
      arrows: [
        { x: 0.14, y: 0.48, w: 0.72, h: 0.05, color: '062B61' },
        { x: 0.26, y: 0.25, w: 0.03, h: 0.25 },
        { x: 0.50, y: 0.50, w: 0.03, h: 0.25 },
        { x: 0.74, y: 0.25, w: 0.03, h: 0.25 }
      ],
      nodes: [
        { x: 0.08, y: 0.08, w: 0.36, h: 0.22, label: 'Host A', sub: 'Drop Tap', variant: 'white' },
        { x: 0.56, y: 0.08, w: 0.36, h: 0.22, label: 'Host C', sub: 'Drop Tap', variant: 'white' },
        { x: 0.01, y: 0.40, w: 0.22, h: 0.20, label: '50 Ω', sub: 'Term', fontSize: 9.5, variant: 'yellow' },
        { x: 0.77, y: 0.40, w: 0.22, h: 0.20, label: '50 Ω', sub: 'Term', fontSize: 9.5, variant: 'yellow' },
        { x: 0.32, y: 0.70, w: 0.36, h: 0.22, label: 'Host B', sub: 'Drop Tap', variant: 'blue' }
      ],
      footer: 'Backbone break stops the whole bus'
    });
  }

  if (title === 'ring topology' || title.includes('ring topology')) {
    return useOnce('diag-ring', {
      kind: 'diagram',
      title: 'RING TOPOLOGY (LOOP)',
      arrows: [
        { x: 0.20, y: 0.18, w: 0.60, h: 0.03 },
        { x: 0.20, y: 0.76, w: 0.60, h: 0.03 },
        { x: 0.20, y: 0.18, w: 0.03, h: 0.60 },
        { x: 0.77, y: 0.18, w: 0.03, h: 0.60 }
      ],
      nodes: [
        { x: 0.26, y: 0.06, w: 0.48, h: 0.22, label: 'Node 1', sub: 'Token Clockwise →', variant: 'blue' },
        { x: 0.58, y: 0.38, w: 0.38, h: 0.22, label: 'Node 2', sub: 'Repeats Frame', variant: 'white' },
        { x: 0.26, y: 0.68, w: 0.48, h: 0.22, label: 'Node 3', sub: '← Around Ring', variant: 'yellow' },
        { x: 0.04, y: 0.38, w: 0.38, h: 0.22, label: 'Node 4', sub: 'To Sender', variant: 'white' }
      ],
      footer: 'Dual-ring adds a backup path'
    });
  }

  if (title === 'mesh topology' || title.includes('mesh topology')) {
    return useOnce('diag-mesh', {
      kind: 'diagram',
      title: 'MESH TOPOLOGY (REDUNDANT)',
      arrows: [
        { x: 0.22, y: 0.18, w: 0.56, h: 0.03 },
        { x: 0.22, y: 0.78, w: 0.56, h: 0.03 },
        { x: 0.20, y: 0.18, w: 0.03, h: 0.62 },
        { x: 0.77, y: 0.18, w: 0.03, h: 0.62 },
        { x: 0.18, y: 0.48, w: 0.64, h: 0.03, rot: 45 },
        { x: 0.18, y: 0.48, w: 0.64, h: 0.03, rot: -45 }
      ],
      nodes: [
        { x: 0.04, y: 0.08, w: 0.38, h: 0.22, label: 'Router A', sub: '3 Direct Links', variant: 'blue' },
        { x: 0.58, y: 0.08, w: 0.38, h: 0.22, label: 'Router B', sub: '3 Direct Links', variant: 'blue' },
        { x: 0.04, y: 0.68, w: 0.38, h: 0.22, label: 'Router C', sub: 'Backup Path', variant: 'yellow' },
        { x: 0.58, y: 0.68, w: 0.38, h: 0.22, label: 'Router D', sub: 'Backup Path', variant: 'yellow' }
      ],
      footer: 'Links = n(n − 1) / 2 · Auto failover'
    });
  }

  if (title.includes('tree topology') || title.includes('hybrid topology')) {
    return useOnce('diag-tree', {
      kind: 'diagram',
      title: 'TREE / HIERARCHICAL DESIGN',
      arrows: [
        { x: 0.48, y: 0.25, w: 0.04, h: 0.22 },
        { x: 0.24, y: 0.45, w: 0.52, h: 0.03 },
        { x: 0.24, y: 0.45, w: 0.03, h: 0.32 },
        { x: 0.73, y: 0.45, w: 0.03, h: 0.32 }
      ],
      nodes: [
        { x: 0.18, y: 0.06, w: 0.64, h: 0.22, label: 'CORE ROUTER', sub: 'Campus Root Uplink', variant: 'navy' },
        { x: 0.04, y: 0.38, w: 0.42, h: 0.22, label: 'Switch A', sub: 'Floor 1 Star', variant: 'blue' },
        { x: 0.54, y: 0.38, w: 0.42, h: 0.22, label: 'Switch B', sub: 'Floor 2 Star', variant: 'blue' },
        { x: 0.04, y: 0.70, w: 0.42, h: 0.22, label: 'Student PCs', sub: 'Access Ports', variant: 'yellow' },
        { x: 0.54, y: 0.70, w: 0.42, h: 0.22, label: 'Faculty PCs', sub: 'Access Ports', variant: 'yellow' }
      ],
      footer: 'Star branches under a core root'
    });
  }

  if (title.includes('what is the osi')) {
    return useOnce('diag-osi', {
      kind: 'diagram',
      title: 'OSI 7-LAYER STACK & PDUs',
      nodes: [
        { x: 0.06, y: 0.02, w: 0.88, h: 0.12, label: '7. Application · Data', fontSize: 10.2, variant: 'blue' },
        { x: 0.06, y: 0.16, w: 0.88, h: 0.12, label: '6. Presentation · Data', fontSize: 10.2, variant: 'blue' },
        { x: 0.06, y: 0.30, w: 0.88, h: 0.12, label: '5. Session · Data', fontSize: 10.2, variant: 'blue' },
        { x: 0.06, y: 0.44, w: 0.88, h: 0.12, label: '4. Transport · Segment (Port)', fontSize: 10.2, variant: 'yellow' },
        { x: 0.06, y: 0.58, w: 0.88, h: 0.12, label: '3. Network · Packet (IP)', fontSize: 10.2, variant: 'navy' },
        { x: 0.06, y: 0.72, w: 0.88, h: 0.12, label: '2. Data Link · Frame (MAC)', fontSize: 10.2, variant: 'navy' },
        { x: 0.06, y: 0.86, w: 0.88, h: 0.12, label: '1. Physical · Bits (10110)', fontSize: 10.2, variant: 'white' }
      ],
      footer: '7 layers separate network tasks'
    });
  }

  if (title.includes('what is encapsulation')) {
    return useOnce('diag-encap', {
      kind: 'diagram',
      title: 'ENCAPSULATION STAGES',
      arrows: [{ x: 0.48, y: 0.12, w: 0.04, h: 0.76 }],
      nodes: [
        { x: 0.08, y: 0.03, w: 0.84, h: 0.16, label: '1. DATA (L7–L5)', sub: 'User message / HTTP payload', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.22, w: 0.84, h: 0.16, label: '2. SEGMENT (L4)', sub: '+ TCP/UDP Port Header', fontSize: 9.8, variant: 'yellow' },
        { x: 0.08, y: 0.41, w: 0.84, h: 0.16, label: '3. PACKET (L3)', sub: '+ Source & Dest IP Header', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.60, w: 0.84, h: 0.16, label: '4. FRAME (L2)', sub: '+ MAC Header & FCS Trailer', fontSize: 9.8, variant: 'navy' },
        { x: 0.08, y: 0.79, w: 0.84, h: 0.16, label: '5. BITS (L1)', sub: '10110... over Cable / Wi-Fi', fontSize: 9.8, variant: 'white' }
      ],
      footer: 'Wrap L7→L1 · Unwrap L1→L7'
    });
  }

  if (title.includes('tcp/ip')) {
    return useOnce('diag-tcpip', {
      kind: 'diagram',
      title: 'TCP/IP 4-LAYER MODEL',
      arrows: [{ x: 0.48, y: 0.14, w: 0.04, h: 0.72 }],
      nodes: [
        { x: 0.08, y: 0.04, w: 0.84, h: 0.20, label: '4. APPLICATION (OSI L7–5)', sub: 'HTTP, HTTPS, DNS, DHCP, SSH', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.28, w: 0.84, h: 0.20, label: '3. TRANSPORT (OSI L4)', sub: 'TCP Reliable · UDP Fast · Ports', fontSize: 9.8, variant: 'yellow' },
        { x: 0.08, y: 0.52, w: 0.84, h: 0.20, label: '2. INTERNET (OSI L3)', sub: 'IPv4/IPv6 Routing & ICMP', fontSize: 9.8, variant: 'navy' },
        { x: 0.08, y: 0.76, w: 0.84, h: 0.20, label: '1. NETWORK ACCESS (L2–1)', sub: 'Ethernet, Wi-Fi, MAC & ARP', fontSize: 9.8, variant: 'white' }
      ],
      footer: 'Maps directly to the 7-layer OSI'
    });
  }

  if (title.includes('address resolution protocol')) {
    return useOnce('diag-arp', {
      kind: 'diagram',
      title: 'ARP REQUEST → REPLY',
      arrows: [{ x: 0.48, y: 0.14, w: 0.04, h: 0.72 }],
      nodes: [
        { x: 0.08, y: 0.04, w: 0.84, h: 0.20, label: '1. CHECK ARP CACHE', sub: 'Is target MAC already stored?', fontSize: 9.8, variant: 'white' },
        { x: 0.08, y: 0.28, w: 0.84, h: 0.20, label: '2. BROADCAST REQUEST', sub: '"Who has .20?" → All LAN ports', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.52, w: 0.84, h: 0.20, label: '3. UNICAST REPLY', sub: 'Target replies with its MAC', fontSize: 9.8, variant: 'yellow' },
        { x: 0.08, y: 0.76, w: 0.84, h: 0.20, label: '4. CACHE & DELIVER', sub: 'Store MAC & send local frame', fontSize: 9.8, variant: 'navy' }
      ],
      footer: 'Resolves Layer 3 IP → Layer 2 MAC'
    });
  }

  if (title.includes('domain name system')) {
    return useOnce('diag-dns', {
      kind: 'diagram',
      title: 'DNS RESOLUTION STAGES',
      arrows: [{ x: 0.48, y: 0.14, w: 0.04, h: 0.72 }],
      nodes: [
        { x: 0.08, y: 0.04, w: 0.84, h: 0.20, label: '1. CHECK LOCAL CACHE', sub: 'Browser & OS cache (TTL timer)', fontSize: 9.8, variant: 'white' },
        { x: 0.08, y: 0.28, w: 0.84, h: 0.20, label: '2. QUERY RESOLVER (53)', sub: 'Ask DNS server for domain IP', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.52, w: 0.84, h: 0.20, label: '3. RETURN A / AAAA IP', sub: 'Server replies with IPv4 / IPv6', fontSize: 9.8, variant: 'yellow' },
        { x: 0.08, y: 0.76, w: 0.84, h: 0.20, label: '4. CONNECT TO SERVER', sub: 'Browser loads page via IP', fontSize: 9.8, variant: 'navy' }
      ],
      footer: 'Translates domain names → IPs'
    });
  }

  if (title.includes('inside every subnet') || title.includes('subnet mask: the dividing boundary')) {
    return useOnce('diag-ipv4-subnet', {
      kind: 'diagram',
      title: 'IPV4 SUBNET BOUNDARY',
      nodes: [
        { x: 0.06, y: 0.04, w: 0.88, h: 0.22, label: 'IP: 192.168.10.25 / 24', sub: '32 Bits = Four 8-Bit Octets', fontSize: 10.2, variant: 'navy' },
        { x: 0.06, y: 0.30, w: 0.56, h: 0.22, label: 'NETWORK (24b)', sub: '192.168.10', fontSize: 9.6, variant: 'blue' },
        { x: 0.65, y: 0.30, w: 0.29, h: 0.22, label: 'HOST (8b)', sub: '.25', fontSize: 9.6, variant: 'yellow' },
        { x: 0.06, y: 0.56, w: 0.88, h: 0.19, label: 'Network ID: 192.168.10.0', sub: 'First IP (Identifies Subnet)', fontSize: 9.8, variant: 'white' },
        { x: 0.06, y: 0.78, w: 0.88, h: 0.19, label: 'Broadcast: 192.168.10.255', sub: 'Last IP (Usable: .1–.254)', fontSize: 9.8, variant: 'white' }
      ],
      footer: 'Usable Hosts = 2^(Host Bits) − 2'
    });
  }

  if (title.includes('five steps to subnet')) {
    return useOnce('diag-subnet-steps', {
      kind: 'diagram',
      title: '5-STEP SUBNETTING FLOW',
      arrows: [{ x: 0.48, y: 0.10, w: 0.04, h: 0.80 }],
      nodes: [
        { x: 0.08, y: 0.03, w: 0.84, h: 0.16, label: '1. BORROW BITS (n)', sub: 'Choose n where 2^n ≥ subnets', fontSize: 9.6, variant: 'blue' },
        { x: 0.08, y: 0.22, w: 0.84, h: 0.16, label: '2. NEW SUBNET MASK', sub: 'Add n bits to base CIDR prefix', fontSize: 9.6, variant: 'yellow' },
        { x: 0.08, y: 0.41, w: 0.84, h: 0.16, label: '3. BLOCK SIZE', sub: '256 − interesting mask octet', fontSize: 9.6, variant: 'blue' },
        { x: 0.08, y: 0.60, w: 0.84, h: 0.16, label: '4. LIST NETWORK IDs', sub: 'Step by block (.0, .64, .128)', fontSize: 9.6, variant: 'white' },
        { x: 0.08, y: 0.79, w: 0.84, h: 0.16, label: '5. HOST & BROADCAST', sub: 'Usable: Net+1 to Broadcast−1', fontSize: 9.6, variant: 'navy' }
      ],
      footer: 'Example: /24 → /26 gives 4 × 62 hosts'
    });
  }

  if (title.includes('four messages in the initial dhcp') || title.includes('dhcp allocation') || title.includes('what is dhcp')) {
    return useOnce('diag-dora', {
      kind: 'diagram',
      title: 'DHCP 4-STEP DORA EXCHANGE',
      arrows: [{ x: 0.48, y: 0.14, w: 0.04, h: 0.72 }],
      nodes: [
        { x: 0.08, y: 0.04, w: 0.84, h: 0.20, label: '1. DISCOVER (Broadcast)', sub: 'Client → "Any DHCP servers?"', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.28, w: 0.84, h: 0.20, label: '2. OFFER (Server Reply)', sub: 'Server → "Use 192.168.1.105"', fontSize: 9.8, variant: 'yellow' },
        { x: 0.08, y: 0.52, w: 0.84, h: 0.20, label: '3. REQUEST (Broadcast)', sub: 'Client → "Requesting .105"', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.76, w: 0.84, h: 0.20, label: '4. ACKNOWLEDGE (ACK)', sub: 'Server → "Lease committed"', fontSize: 9.8, variant: 'navy' }
      ],
      footer: 'Automatic IP, Mask, Gateway & DNS'
    });
  }

  if (title.includes('lease lifecycle')) {
    return useOnce('diag-dhcp-lease', {
      kind: 'diagram',
      title: 'DHCP LEASE LIFECYCLE',
      arrows: [{ x: 0.48, y: 0.14, w: 0.04, h: 0.72 }],
      nodes: [
        { x: 0.08, y: 0.04, w: 0.84, h: 0.20, label: '1. LEASE ACTIVE (0%)', sub: 'Host uses leased IPv4 address', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.28, w: 0.84, h: 0.20, label: '2. T1 RENEWAL (50%)', sub: 'Unicast renew to same server', fontSize: 9.8, variant: 'yellow' },
        { x: 0.08, y: 0.52, w: 0.84, h: 0.20, label: '3. T2 REBIND (87.5%)', sub: 'Broadcast to any DHCP server', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.76, w: 0.84, h: 0.20, label: '4. EXPIRED / NO SERVER', sub: 'Reclaimed or APIPA 169.254.x.x', fontSize: 9.8, variant: 'navy' }
      ],
      footer: 'ipconfig /release & /renew'
    });
  }

  if (title.includes('two permission gates') || title.includes('file & printer sharing properties') || title.includes('share permissions vs ntfs')) {
    return useOnce('diag-smb', {
      kind: 'diagram',
      title: 'SMB SHARE + NTFS GATES',
      arrows: [{ x: 0.48, y: 0.22, w: 0.04, h: 0.55 }],
      nodes: [
        { x: 0.08, y: 0.06, w: 0.84, h: 0.22, label: 'Client PC (Private)', sub: 'Opens \\\\LAB-PC1\\SharedDocs', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.34, w: 0.40, h: 0.24, label: 'Share Rule', sub: 'Network Gate', fontSize: 9.6, variant: 'yellow' },
        { x: 0.52, y: 0.34, w: 0.40, h: 0.24, label: 'NTFS Rule', sub: 'Disk Gate', fontSize: 9.6, variant: 'yellow' },
        { x: 0.08, y: 0.66, w: 0.84, h: 0.24, label: 'MOST RESTRICTIVE WINS', sub: 'Mapped Drive (Z:) or Printer', fontSize: 9.8, variant: 'navy' }
      ],
      footer: 'Uses SMB (TCP 445) on trusted LANs'
    });
  }

  if (title.includes('systematic troubleshooting')) {
    return useOnce('diag-troubleshoot', {
      kind: 'diagram',
      title: 'BOTTOM-UP DIAGNOSTIC LADDER',
      arrows: [{ x: 0.48, y: 0.14, w: 0.04, h: 0.72 }],
      nodes: [
        { x: 0.08, y: 0.04, w: 0.84, h: 0.20, label: '1. PHYSICAL LINK CHECK', sub: 'Cable, RJ45 Latch, Link LEDs', fontSize: 9.8, variant: 'yellow' },
        { x: 0.08, y: 0.28, w: 0.84, h: 0.20, label: '2. LOCAL IP (ipconfig /all)', sub: 'IPv4, Mask, Gateway & APIPA', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.52, w: 0.84, h: 0.20, label: '3. REACHABILITY (ping)', sub: 'Ping Gateway & 8.8.8.8', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.76, w: 0.84, h: 0.20, label: '4. NAME LOOKUP (nslookup)', sub: 'Verify DNS Name Resolution', fontSize: 9.8, variant: 'navy' }
      ],
      footer: 'Change 1 thing → Verify → Document'
    });
  }

  if (title.includes('cia triad')) {
    return useOnce('diag-cia', {
      kind: 'diagram',
      title: 'CIA TRIAD MODEL',
      nodes: [
        { x: 0.06, y: 0.05, w: 0.88, h: 0.20, label: 'CONFIDENTIALITY', sub: 'WPA3, HTTPS/TLS & Access Control', fontSize: 9.8, variant: 'blue' },
        { x: 0.06, y: 0.29, w: 0.88, h: 0.20, label: 'INTEGRITY', sub: 'Checksums, Signatures & Logs', fontSize: 9.8, variant: 'yellow' },
        { x: 0.06, y: 0.53, w: 0.88, h: 0.20, label: 'AVAILABILITY', sub: 'Redundancy, Backups & DoS Defense', fontSize: 9.8, variant: 'blue' },
        { x: 0.06, y: 0.77, w: 0.88, h: 0.19, label: 'DEFENSE IN DEPTH', sub: 'Firewalls + MFA + Updates', fontSize: 9.8, variant: 'navy' }
      ],
      footer: 'Layered security protects networks'
    });
  }

  if (title.includes('stateful firewall')) {
    return useOnce('diag-firewall', {
      kind: 'diagram',
      title: 'FIREWALL RULE INSPECTION',
      arrows: [{ x: 0.48, y: 0.14, w: 0.04, h: 0.72 }],
      nodes: [
        { x: 0.08, y: 0.04, w: 0.84, h: 0.20, label: '1. INSPECT 5-TUPLE', sub: 'Src/Dst IP, Proto, Port, Dir', fontSize: 9.8, variant: 'white' },
        { x: 0.08, y: 0.28, w: 0.84, h: 0.20, label: '2. CHECK RULES TOP-DOWN', sub: 'Evaluate Rule 1 → Rule 2 → ...', fontSize: 9.8, variant: 'blue' },
        { x: 0.08, y: 0.52, w: 0.84, h: 0.20, label: '3. FIRST MATCH WINS', sub: 'Immediately Allow or Drop', fontSize: 9.8, variant: 'yellow' },
        { x: 0.08, y: 0.76, w: 0.84, h: 0.20, label: '4. IMPLICIT DENY ALL', sub: 'Block unmatched inbound', fontSize: 9.8, variant: 'navy' }
      ],
      footer: 'Stateful tables track return flows'
    });
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
    objectives: topic.objectives || [],
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
            overview: sec.overview,
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
        lead: slide.lead || 'Use this reference table alongside the interactive Networking 1 website:',
        table: specialTable,
        notes: `${displayTitle}\n${slide.lead || ''}\n${sourceNote}`
      });
    } else if (slide.kind === 'example') {
      // Kept core topic slides (PAN/LAN/MAN/WAN in M01; Star/Bus/Ring/Mesh/Tree/Hybrid in M02) as concise concept bullets
      const explanation = slide.lead || `Key concepts of ${displayTitle}:`;
      const calloutBullets = Array.isArray(slide.bullets) && slide.bullets.length > 0
        ? slide.bullets
        : Array.isArray(slide.items) && slide.items.length > 0
          ? slide.items
          : [explanation];

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
      const paragraphs = cleanLines(slide.paragraphs);
      const items = cleanLines(slide.items);
      const visual = resolveSlideVisual(topic, slide, idx + 1, usedDiagrams);
      const totalItemChars = items.reduce((acc, s) => acc + String(s).length, 0);
      const splitThreshold = visual ? 290 : 480;

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
          explanation: slide.lead || paragraphs[0] || `Key concepts for ${slideTitle}:`,
          calloutBullets: part1,
          itemLabels: labels1,
          visual,
          notes: `${title1}\n${slide.lead || ''}\n${part1.join('\n')}\n${sourceNote}`
        });

        addTeachingSlide(deck, {
          title: title2,
          explanation: paragraphs[1] || slide.lead || `Continuing ${slideTitle}:`,
          calloutBullets: part2,
          itemLabels: labels2,
          visual: null,
          notes: `${title2}\n${part2.join('\n')}\n${sourceNote}`
        });
      } else {
        const explanation = slide.lead || paragraphs[0] || `Key principles of ${displayTitle}:`;
        const visualConceptBullets = {
          osiIntroduction: [
            'Upper Host Layers (7–5): Application, Presentation, and Session prepare user data, encoding, and TLS encryption.',
            'Lower Media & Transport Layers (4–1): Transport ports, Network IPs, Data Link MAC frames, and Physical signals move data across networks.'
          ],
          securityFirewall: [
            'Top-Down Rule Matching: Firewalls check each packet’s IP, protocol, and port against rules in order and apply the first match.',
            'Stateful Tracking & Implicit Deny: Return replies from active outbound requests are allowed while unsolicited inbound traffic is dropped.'
          ]
        };

        const calloutBullets = items.length > 0
          ? items
          : paragraphs.length > 0
            ? (slide.lead ? paragraphs : paragraphs.slice(1))
            : (visualConceptBullets[slide.type] || [slide.lead || 'Essential concept in computer networking.']);

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
            title: comp.title,
            leftTitle: comp.leftTitle,
            leftBullets: comp.leftBullets,
            rightTitle: comp.rightTitle,
            rightBullets: comp.rightBullets,
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
        addComparisonSlide(deck, comp);
      }
    });
  }

  // 3. Final Slide: Summary of the Discussion (no Recap, Knowledge Check, or References slides)
  const summarySlide = topic.slides.find(s => s.kind === 'summary');
  const summaryItems = summarySlide?.items?.length
    ? summarySlide.items
    : (topic.objectives || []).slice(0, 4);

  addSummaryOfDiscussionSlide(deck, { summaryItems });

  const modNumStr = String(modNum).padStart(2, '0');
  const fileName = `Module-${modNumStr}-${slugify(topic.title)}.pptx`;
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
