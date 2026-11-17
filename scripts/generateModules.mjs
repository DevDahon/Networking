import { mkdirSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

globalThis.window ??= {};
globalThis.document ??= {};
globalThis.localStorage ??= { getItem: () => null, setItem: () => {} };

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const modulesDir = resolve(rootDir, 'modules');
const tmpHtmlDir = resolve(rootDir, '.tmp-module-html');

const { topics } = await import('../src/topics/topicRegistry.js');
const { examplePlan } = await import('../src/simulations/exampleModels.js');
const { protocolCatalog, arpJourney, webJourney } = await import('../src/simulations/protocolModels.js');
const { deviceMetadata } = await import('../src/components/deviceIllustrations.js');
const { toolsMetadata } = await import('../src/components/toolsVisuals.js');
const { physicalVisualPanels } = await import('../src/components/physicalVisuals.js');
const {
  connectorOrientationSVG,
  rj45PlugColorSVG,
  straightVsCrossoverVisualSVG,
  modularConnectorsVisual
} = await import('../src/components/cableVisuals.js');
const { osiUpperLayersVisual, osiLowerLayersVisual } = await import('../src/components/osiLayerVisual.js');
const { encapsulationExampleVisual } = await import('../src/components/encapsulationVisual.js');
const { ipClassesVisual, subnetComparisonVisual, cidrCheatsheetVisual } = await import('../src/components/ipAddressingVisuals.js');
const { esc } = await import('../src/components/ui.js');

function findBrowser() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  throw new Error('Could not find Chrome or Microsoft Edge for headless PDF export.');
}

const imageCache = new Map();
function inlineImages(html) {
  return html.replace(/src="(images\/[^"]+)"/g, (_, relPath) => {
    if (!imageCache.has(relPath)) {
      const fullPath = resolve(rootDir, 'public', relPath);
      if (!existsSync(fullPath)) return `src="${relPath}"`;
      const ext = relPath.split('.').pop().toLowerCase();
      const mime = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/webp';
      const b64 = readFileSync(fullPath).toString('base64');
      imageCache.set(relPath, `data:${mime};base64,${b64}`);
    }
    return `src="${imageCache.get(relPath)}"`;
  });
}

function formatRichText(text) {
  if (!text) return '';
  if (text.trim() === 'Default port or identifier: .') {
    return '<strong>Default port or identifier:</strong> None (operates below the Transport layer without a TCP/UDP port).';
  }
  if (text.includes('**')) {
    return esc(text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }
  const colonIdx = text.indexOf(': ');
  if (colonIdx > 0 && colonIdx < 56 && !text.slice(0, colonIdx).includes('\n')) {
    return `<strong>${esc(text.slice(0, colonIdx))}:</strong> ${esc(text.slice(colonIdx + 2))}`;
  }
  return esc(text);
}

function renderPerformanceVisual() {
  return `
    <div class="module-two-cards">
      <div class="module-card">
        <div class="module-card-tag tag-blue">BANDWIDTH · CAPACITY PER SECOND</div>
        <h4>Highway Lane Capacity</h4>
        <p><strong>Bandwidth</strong> is the maximum data rate a link can carry per second (measured in Mb/s or Gb/s). More lanes allow more cars—just like higher bandwidth lets many users stream HD video at the same time.</p>
      </div>
      <div class="module-card">
        <div class="module-card-tag tag-teal">LATENCY · TRAVEL TIME DELAY</div>
        <h4>Courier Travel Time</h4>
        <p><strong>Latency</strong> is the time it takes a single packet to travel from source to destination (measured in milliseconds, ms). Distance and intermediate routers add delay even on fast links.</p>
      </div>
    </div>
  `;
}

const visualPanels = {
  performanceMeasures: renderPerformanceVisual,
  encapsulationExample: encapsulationExampleVisual,
  modularConnectors: modularConnectorsVisual,
  ...physicalVisualPanels,
  osiUpperLayers: osiUpperLayersVisual,
  osiLowerLayers: osiLowerLayersVisual,
  ipClassesVisual,
  subnetComparisonVisual,
  cidrCheatsheetVisual
};

function windowsIpv4StaticSvg() {
  return `
    <svg viewBox="0 0 420 430" class="static-dialog-svg" role="img" aria-label="Windows Internet Protocol Version 4 (TCP/IPv4) Properties dialog">
      <rect x="6" y="6" width="408" height="418" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <rect x="6" y="6" width="408" height="32" rx="8" fill="#f1f5f9"/>
      <text x="20" y="27" font-size="11.5" font-weight="700" fill="#0f172a">Internet Protocol Version 4 (TCP/IPv4) Properties</text>
      <rect x="20" y="50" width="90" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="65" y="66" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">General</text>
      <circle cx="34" cy="96" r="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="48" y="100" font-size="11" fill="#475569">Obtain an IP address automatically</text>
      <circle cx="34" cy="122" r="6" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
      <circle cx="34" cy="122" r="3" fill="#2563eb"/>
      <text x="48" y="126" font-size="11" font-weight="700" fill="#0f172a">Use the following IP address:</text>
      <rect x="30" y="138" width="360" height="106" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="44" y="162" font-size="11" fill="#334155">IP address:</text>
      <rect x="190" y="146" width="184" height="22" rx="3" fill="#ffffff" stroke="#2563eb" stroke-width="1.2"/>
      <text x="200" y="161" font-size="11" font-family="monospace" fill="#0f172a">192.168.1.10</text>
      <text x="44" y="192" font-size="11" fill="#334155">Subnet mask:</text>
      <rect x="190" y="176" width="184" height="22" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="200" y="191" font-size="11" font-family="monospace" fill="#0f172a">255.255.255.0</text>
      <text x="44" y="222" font-size="11" fill="#334155">Default gateway:</text>
      <rect x="190" y="206" width="184" height="22" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="200" y="221" font-size="11" font-family="monospace" fill="#0f172a">192.168.1.1</text>
      <circle cx="34" cy="264" r="6" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
      <circle cx="34" cy="264" r="3" fill="#2563eb"/>
      <text x="48" y="268" font-size="11" font-weight="700" fill="#0f172a">Use the following DNS server addresses:</text>
      <rect x="30" y="280" width="360" height="78" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="44" y="306" font-size="11" fill="#334155">Preferred DNS server:</text>
      <rect x="190" y="290" width="184" height="22" rx="3" fill="#ffffff" stroke="#2563eb" stroke-width="1.2"/>
      <text x="200" y="305" font-size="11" font-family="monospace" fill="#0f172a">192.168.1.1</text>
      <text x="44" y="336" font-size="11" fill="#334155">Alternate DNS server:</text>
      <rect x="190" y="320" width="184" height="22" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="200" y="335" font-size="11" font-family="monospace" fill="#0f172a">8.8.8.8</text>
      <rect x="232" y="384" width="76" height="26" rx="4" fill="#2563eb"/>
      <text x="270" y="401" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">OK</text>
      <rect x="316" y="384" width="76" height="26" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="354" y="401" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">Cancel</text>
    </svg>
  `;
}

function windowsSharingStaticSvg() {
  return `
    <svg viewBox="0 0 420 400" class="static-dialog-svg" role="img" aria-label="ClassFiles Properties Sharing tab in Windows">
      <rect x="6" y="6" width="408" height="388" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <rect x="6" y="6" width="408" height="32" rx="8" fill="#f1f5f9"/>
      <text x="20" y="27" font-size="11.5" font-weight="700" fill="#0f172a">ClassFiles Properties</text>
      <rect x="20" y="46" width="68" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="54" y="61" text-anchor="middle" font-size="10.5" fill="#64748b">General</text>
      <rect x="92" y="46" width="74" height="22" rx="4" fill="#ffffff" stroke="#2563eb" stroke-width="1.3"/>
      <text x="129" y="61" text-anchor="middle" font-size="10.5" font-weight="700" fill="#0f172a">Sharing</text>
      <rect x="170" y="46" width="74" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="207" y="61" text-anchor="middle" font-size="10.5" fill="#64748b">Security</text>
      <rect x="20" y="76" width="380" height="106" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="32" y="96" font-size="11" font-weight="700" fill="#0f172a">Network File and Folder Sharing</text>
      <text x="32" y="116" font-size="10.5" fill="#475569">ClassFiles — Shared</text>
      <text x="32" y="133" font-size="10" font-family="monospace" fill="#1d4ed8">Network Path: \\\\TEACHER-PC\\ClassFiles</text>
      <rect x="292" y="146" width="94" height="24" rx="4" fill="#e2e8f0" stroke="#94a3b8"/>
      <text x="339" y="162" text-anchor="middle" font-size="10.5" font-weight="600" fill="#0f172a">Share...</text>
      <rect x="20" y="194" width="380" height="148" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="32" y="214" font-size="11" font-weight="700" fill="#0f172a">Advanced Sharing Settings</text>
      <rect x="34" y="228" width="14" height="14" rx="2" fill="#2563eb"/>
      <path d="M37 235l2.5 2.5 5-5" fill="none" stroke="#ffffff" stroke-width="1.8"/>
      <text x="56" y="239" font-size="10.5" font-weight="700" fill="#0f172a">Share this folder (Share name: ClassFiles)</text>
      <text x="34" y="264" font-size="10.5" font-weight="700" fill="#334155">Share Permissions (Gate 1):</text>
      <text x="42" y="282" font-size="10.5" fill="#334155">• ClassStudents → Read Allowed</text>
      <text x="42" y="299" font-size="10.5" fill="#334155">• TeacherAdmin → Full Control</text>
      <text x="34" y="324" font-size="10" font-weight="700" fill="#0f766e">Note: Security (NTFS) tab sets local + network Gate 2 rights.</text>
      <rect x="324" y="356" width="76" height="24" rx="4" fill="#2563eb"/>
      <text x="362" y="372" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">OK</text>
    </svg>
  `;
}

function schematicDiagramSvg(diagram) {
  if (!diagram?.nodes?.length) return '';
  const xs = diagram.nodes.map(n => n.x);
  const ys = diagram.nodes.map(n => n.y);
  const minX = Math.min(...xs) - 110;
  const maxX = Math.max(...xs) + 110;
  const minY = Math.min(...ys) - 65;
  const maxY = Math.max(...ys) + 85;
  const w = Math.max(480, maxX - minX);
  const h = Math.max(220, maxY - minY);
  const lines = (diagram.edges || []).map(([a, b]) => {
    const na = diagram.nodes[a], nb = diagram.nodes[b];
    if (!na || !nb) return '';
    return `<line x1="${na.x}" y1="${na.y}" x2="${nb.x}" y2="${nb.y}" stroke="#64748b" stroke-width="3"/>`;
  }).join('');
  const resLines = (diagram.resourceEdges || []).map(([a, b]) => {
    const na = diagram.nodes[a], nb = diagram.nodes[b];
    if (!na || !nb) return '';
    return `<line x1="${na.x}" y1="${na.y}" x2="${nb.x}" y2="${nb.y}" stroke="#0d9488" stroke-width="3" stroke-dasharray="6 4"/>`;
  }).join('');
  const nodes = diagram.nodes.map(n => `
    <g transform="translate(${n.x},${n.y})">
      <rect x="-74" y="-28" width="148" height="56" rx="8" fill="#f8fafc" stroke="#2563eb" stroke-width="2"/>
      <text y="5" text-anchor="middle" font-size="13.5" font-weight="700" fill="#0f172a">${esc(n.label)}</text>
      ${n.detail ? `<text y="45" text-anchor="middle" font-size="11.5" fill="#475569">${esc(n.detail)}</text>` : ''}
    </g>
  `).join('');
  return `<svg class="schematic-svg" viewBox="${minX} ${minY} ${w} ${h}" role="img" aria-label="Network schematic diagram">${lines}${resLines}${nodes}</svg>`;
}

function procedureForSimulation(slide, topic) {
  switch (slide.type) {
    case 'introConnections':
      return {
        lead: slide.lead || 'Compare how devices join a network through wired Ethernet or wireless Wi-Fi.',
        steps: [
          'Check Device Interface Hardware: Identify whether the device uses an Ethernet RJ45 port or a built-in wireless Wi-Fi radio adapter.',
          'Connect a Wired Endpoint: Plug a straight-through Cat 5e/Cat 6 patch cable from the computer NIC into an open switch port.',
          'Connect a Wireless Endpoint: Turn on Wi-Fi on the phone or laptop, select the classroom network SSID, and enter the security passphrase.',
          'Verify Link Activation: Confirm solid/blinking link LEDs on the wired switch port or connected Wi-Fi signal bars on the mobile device.',
          'Compare Link Selection: Use wired Ethernet for stationary desktops and printers needing steady speed, and use Wi-Fi for mobile devices.'
        ]
      };
    case 'introConnectivity':
      return {
        lead: slide.lead || 'Distinguish between local LAN resource sharing and router-forwarded Internet access.',
        steps: [
          'Identify Local Devices: Confirm the computer, switch, and classroom printer all belong to the same local network subnet.',
          'Send a Local Print Job: Print directly from the computer through the local switch to the printer without requiring an Internet link.',
          'Verify Local Independence: Unplugging or losing the ISP modem still leaves local switch communication and printing fully functional.',
          'Request a Remote Website: Open a web address located outside the classroom LAN so the computer forwards packets to its default gateway router.',
          'Route Across the WAN: Confirm the router forwards the web request across the ISP link only when Internet access is available.'
        ]
      };
    case 'introExchange':
      return {
        lead: slide.lead || 'Follow a complete request-and-reply exchange where sender and receiver roles switch.',
        steps: [
          'Prepare the Request: Computer A (initial sender) creates a request message asking Computer B for a shared classroom document.',
          'Transmit Through the Medium: The request travels across the Ethernet cable and local switch using shared communication protocols.',
          'Process and Reverse Roles: Computer B (initial receiver) accepts the request, retrieves the file, and becomes the new sender.',
          'Deliver the Response: Computer B sends the requested document back through the switch to Computer A (now the receiver).'
        ]
      };
    case 'topology':
      return {
        lead: slide.lead || 'Evaluate how single-link or device failures affect connectivity across network layouts.',
        steps: [
          'Inspect the Active Topology: Identify whether devices connect via a central switch (Star), shared backbone (Bus), loop (Ring), multiple paths (Mesh), or layered switches (Tree/Hybrid).',
          'Select Source and Destination: Trace the normal path packets take between two endpoints under healthy conditions.',
          'Simulate a Single Cable Break: Observe whether only one endpoint loses access (Star) or all downstream nodes fail (Bus/unprotected Ring).',
          'Simulate a Central Device Failure: Remove the central hub or root switch to verify which downstream computers become isolated.',
          'Choose Redundancy by Need: Add alternate Mesh or Hybrid switch links wherever a single point of failure cannot be tolerated.'
        ]
      };
    case 'media':
      return {
        lead: slide.lead || 'Select the proper transmission medium by comparing speed, distance, and interference immunity.',
        steps: [
          'Assess Run Distance: Measure the path—use copper twisted-pair (UTP/STP) up to 100 meters, or choose fiber-optic cable for long campus/building uplinks.',
          'Check for Electromagnetic Interference (EMI): Avoid unshielded UTP near elevators, fluorescent lights, or motors; use STP or immune optical fiber.',
          'Verify Throughput Requirements: Match Cat 5e (up to 1 Gb/s at 100 m), Cat 6 (10 Gb/s up to 55 m), or Cat 6A (10 Gb/s at 100 m) to port speeds.',
          'Add Wireless Mobility Only Where Needed: Deploy Wi-Fi radio links (2.4 GHz / 5 GHz / 6 GHz) via Access Points for laptops, phones, and tablets.',
          'Confirm Connector Compatibility: Match RJ45 jacks for twisted-pair copper, LC/SC optical transceivers for fiber, and antennas for wireless APs.'
        ]
      };
    case 'cable':
      return {
        lead: 'Follow this six-step procedure to terminate an RJ45 patch cord and verify pin-to-pin continuity with a cable tester.',
        steps: [
          'Strip the Outer Jacket: Measure 20–25 mm from the end and use a UTP stripper carefully so inner conductor insulation stays unnicked.',
          'Arrange Conductors by Standard: Untwist pairs minimally and flatten wires in exact T568B (or T568A) order from Pin 1 to Pin 8.',
          'Trim Evenly & Insert into Plug: Cut all eight conductors squarely to 12 mm and push them into the RJ45 plug with contact pins facing you and latch away.',
          'Inspect Through Clear Housing: Confirm all eight copper tips touch the front wall and the outer jacket extends inside the strain-relief collar.',
          'Crimp Firmly: Seat the plug inside an 8P8C modular crimper and squeeze steadily until the ratchet releases.',
          'Run LAN Tester Verification: Connect both ends to a wire-map tester and verify sequential 1-to-8 LEDs with zero open, short, or swapped pins.'
        ]
      };
    case 'osiLayer':
      return {
        lead: slide.lead || 'Compare reliable TCP delivery against lightweight best-effort UDP delivery.',
        steps: [
          'Segment Application Data: The Transport layer splits application bytes into numbered TCP segments or independent UDP datagrams with source/destination ports.',
          'Establish Delivery Mode: TCP opens a tracked three-way handshake connection; UDP sends datagrams immediately with no connection setup.',
          'Simulate Packet Loss on the Link: Observe what happens when an intermediate segment or datagram drops during transit.',
          'Observe Recovery Behavior: Under TCP, missing sequence numbers trigger acknowledgments and retransmission; UDP leaves recovery to the application.',
          'Match Protocol to Workload: Use TCP for web pages, email, and file transfers, and use UDP for DNS lookups, DHCP, and live streaming.'
        ]
      };
    case 'protocolArp':
      return {
        lead: 'Follow how Address Resolution Protocol (ARP) discovers a local hardware MAC address from an IPv4 address.',
        steps: arpJourney('192.168.2.20').map(s => `${s.title}: ${s.text}`)
      };
    case 'dnsCacheDemo':
      return {
        lead: 'Follow how DNS name resolution uses local client caching and Time-to-Live (TTL) expiration.',
        steps: [
          'Check Local Client Cache: Before contacting any server, the client inspects its local DNS cache for an existing, unexpired entry.',
          'Query the DNS Resolver on a Miss: If the name is absent or expired, the client sends a DNS query (UDP/TCP port 53) to the resolver.',
          'Store Address with a TTL Timer: The resolver returns the IPv4/IPv6 record, which the client caches locally for the configured TTL lifetime.',
          'Serve Subsequent Lookups Locally: Repeated requests reuse the cached IP immediately—even if the DNS resolver briefly goes offline.',
          'Re-Query After TTL Expiration: Once the TTL reaches zero, the stale record is removed and the next lookup queries the resolver for updated records.'
        ]
      };
    case 'protocolWeb':
      return {
        lead: slide.lead || 'Trace all cooperating protocols when a browser loads a secure HTTPS webpage.',
        steps: [
          'Resolve Domain Name via DNS: The browser queries the DNS resolver (port 53) to translate classroom.example into an IP address.',
          'Locate Local Next Hop via ARP: If the gateway MAC is not cached, the computer broadcasts an ARP Request to find the router interface MAC.',
          'Open TCP Transport Session: The client performs a TCP three-way handshake with the server on destination port 443.',
          'Validate Identity with TLS: The browser verifies the server digital certificate and establishes encrypted TLS keys before sending application data.',
          'Exchange HTTP Request & Response: The browser sends HTTP GET over TLS and renders the returned HTTP 200 OK webpage.'
        ]
      };
    case 'protocolDirectory':
      return {
        lead: slide.lead || 'Reference guide to common networking protocols, transport layers, and well-known ports.',
        table: {
          headers: ['Protocol', 'Port / Transport', 'Layer', 'Primary Purpose'],
          rows: protocolCatalog.map(p => [
            p.id,
            p.ports.length ? p.ports.map(pt => `${pt.transport} ${pt.number}`).join(', ') : 'No L4 port',
            p.layer,
            p.purpose
          ])
        },
        steps: [
          'Match User Service to Application Layer: Identify the user task (browsing, naming, automatic addressing, email, or remote shell).',
          'Select Transport Protocol & Port: Check whether the service requires reliable TCP streams, lightweight UDP datagrams, or Layer 2/3 control packets.'
        ]
      };
    case 'bitwiseDemo':
      return {
        lead: slide.lead || 'Perform a bitwise AND operation to extract the Network ID from any IPv4 address and mask.',
        steps: [
          'Write the IPv4 Address in Binary: Convert each dotted-decimal octet into an 8-bit binary group (for example, 192.168.10.25).',
          'Write the Subnet Mask in Binary: Expand the mask (such as 255.255.255.0) into leading binary 1s followed by trailing binary 0s.',
          'Align Bits Vertically: Place each binary bit of the IP address directly above the corresponding bit of the subnet mask.',
          'Apply the Bitwise AND Rule: Compare each bit pair—output 1 only if both bits are 1 (1 AND 1 = 1); output 0 in all other cases.',
          'Convert Back to Dotted Decimal: Group the resulting 32 bits into four octets to read the Network ID (e.g., 192.168.10.0).'
        ]
      };
    case 'subnet':
      return {
        lead: 'Follow this six-step procedure to calculate subnet boundaries from an IPv4 address and CIDR prefix.',
        steps: [
          'Determine Host Bits: Subtract the CIDR prefix from 32 (e.g., /26 leaves 32 − 26 = 6 host bits).',
          'Compute Usable Host Count: Calculate 2^(host bits) − 2 to subtract Network and Broadcast addresses (2^6 − 2 = 62 usable hosts).',
          'Convert Prefix to Dotted Mask: Set the first prefix bits to 1 (for /26, mask becomes 255.255.255.192).',
          'Find the Subnet Block Size: Subtract the interesting mask octet from 256 (256 − 192 = step size of 64).',
          'Identify Network and Broadcast IPs: Find the multiple of block size containing your host IP (e.g., 64) as Network ID, and one less than the next block (127) as Broadcast.',
          'List Valid Usable Host Range: Assign addresses strictly between Network + 1 (.65) and Broadcast − 1 (.126).'
        ]
      };
    case 'asymmetricDemo':
      return {
        lead: 'Follow why both hosts on a LAN must share the identical subnet mask for two-way local delivery.',
        steps: [
          'Inspect Host A Configuration: Computer A checks its own IP and mask (192.168.1.10 /24) and concludes 192.168.1.200 is on the same local subnet.',
          'Inspect Host B Configuration: Computer B checks its narrower mask (192.168.1.200 /25) and wrongly calculates that 192.168.1.10 is in a different subnet.',
          'Observe One-Way Traffic Failure: Computer A ARPs directly across the switch, while Computer B tries sending its reply toward a default gateway router.',
          'Correct the Mismatch: Standardize both endpoints on the identical /24 (255.255.255.0) mask so both agree on local delivery.'
        ]
      };
    case 'dhcp':
      return {
        lead: 'Follow the four-step DHCP Discover, Offer, Request, Acknowledge (DORA) lease and renewal procedure.',
        steps: [
          'Discover (Client Broadcast): A newly booted client broadcasts a DHCP Discover frame (UDP 68 → 67) looking for any DHCP server on the LAN.',
          'Offer (Server Proposal): An available DHCP server reserves an unassigned address from its pool and replies with an Offer proposing IP, mask, gateway, DNS, and lease time.',
          'Request (Client Acceptance): The client broadcasts a DHCP Request formally selecting that server’s offered address.',
          'Acknowledge (Server Commit): The server sends DHCP ACK, saves the binding in its lease table, and authorizes the client to configure its NIC.',
          'Renewal & Release: Halfway through the lease timer (T1), the client requests a unicast renewal; when disconnecting, it sends DHCP Release to free the IP.'
        ]
      };
    case 'reservedPoolDemo':
      return {
        lead: slide.lead || 'Plan a DHCP scope cleanly using exclusions and MAC-based address reservations.',
        steps: [
          'Define the DHCP Scope Range: Choose a contiguous subnet block for client leases (for example, 192.168.1.100 through 192.168.1.200).',
          'Add Static Exclusions: Exclude addresses already assigned manually to the router, servers, or switches so DHCP never hands out duplicates.',
          'Create Fixed Reservations: Bind specific printer or lab server MAC addresses to dedicated IPs so they receive the same address at every boot.',
          'Allocate Remaining Pool Dynamically: Verify that everyday workstations and student laptops receive unused addresses cleanly without conflict.'
        ]
      };
    case 'printQueueDemo':
      return {
        lead: 'Follow how a shared printer processes client print jobs in First-In, First-Out (FIFO) order.',
        steps: [
          'Check Client Permission: When a user sends a job, the sharing host verifies whether the user account is permitted to print.',
          'Verify Sharing Host & Printer Availability: Confirm the host computer is powered on and the physical printer is online with paper/ink ready.',
          'Spool Jobs in FIFO Order: Accepted jobs enter the host queue (J1, J2, J3...) so multiple clients never collide on one document.',
          'Stream Pages to Hardware: The print spooler feeds pages sequentially to the printer and updates completion status.',
          'Clear Completed Jobs: Once every page finishes printing, the host removes the completed job and advances the next queued user.'
        ]
      };
    case 'router':
      return {
        lead: slide.lead || 'Six-step procedure to configure a classroom router for wired LAN and secure Wi-Fi access.',
        steps: [
          'Cable Physical Ports Properly: Connect the ISP modem to the blue WAN/Internet port and connect the classroom switch or PC to a LAN port.',
          'Configure LAN Gateway IP & DHCP: Assign the router LAN IP (e.g., 192.168.10.1/24) and set an active DHCP pool (.100–.200).',
          'Set Wireless Network Name (SSID): Create a recognizable SSID (e.g., Classroom-WiFi) and avoid default manufacturer names.',
          'Choose Wi-Fi Frequency Band: Select 5 GHz for higher speed in one classroom or 2.4 GHz for wider wall penetration across adjacent rooms.',
          'Apply Strong Encryption: Select WPA3-Personal (or WPA2-AES) and set a strong classroom passphrase—avoid legacy WEP or open Wi-Fi.',
          'Save & Test Client Access: Connect both a wired Ethernet PC and a wireless laptop to confirm DHCP lease assignment and Internet routing.'
        ]
      };
    case 'guestIsolationDemo':
      return {
        lead: slide.lead || 'Configure an isolated Guest Wi-Fi network that grants Internet access without exposing internal devices.',
        steps: [
          'Create a Separate Guest SSID: Broadcast a second wireless name exclusively for visitors using a distinct subnet or VLAN.',
          'Enable Wireless Client Isolation: Block guest devices from talking directly to one another over the wireless network.',
          'Restrict Internal LAN Routing: Apply firewall rules blocking guest traffic from reaching internal private subnets (RFC 1918), printers, and shared folders.',
          'Allow Outbound WAN Internet Only: Permit guest DNS lookups and outbound HTTP/HTTPS traffic toward the ISP gateway.'
        ]
      };
    case 'ttlTraceDemo':
      return {
        lead: slide.lead || 'Use Time-to-Live (TTL) probes in tracert / traceroute to map every router hop along a path.',
        steps: [
          'Send Probe with TTL = 1: The computer transmits packets with TTL=1 so the very first router drops TTL to 0 and replies with ICMP Time Exceeded.',
          'Increment TTL Hop by Hop: Succeeding probes use TTL=2, TTL=3, and higher so each router along the route identifies itself and reports round-trip latency.',
          'Locate Latency Spikes or Routing Loops: Compare millisecond timings per hop to see where congestion or a broken upstream link begins.',
          'Interpret * * * Timeouts Accurately: Three asterisks on an intermediate router often mean ICMP replies are rate-limited or filtered by a firewall if later hops still succeed.',
          'Confirm Destination Reachability: Final-hop reply confirms the end-to-end Layer 3 path from source to target server is complete.'
        ]
      };
    case 'troubleshoot':
      return {
        lead: slide.lead || 'Follow the standard bottom-up Windows diagnostic command sequence to isolate network faults.',
        steps: [
          'Inspect Local IP Configuration (ipconfig /all): Verify an IPv4 address, subnet mask, default gateway, and DNS server exist (watch for 169.254.x.x APIPA).',
          'Test Local TCP/IP Stack (ping 127.0.0.1): Confirm the local computer’s networking software stack and NIC driver respond properly.',
          'Check Link & Gateway Reachability (ping <default gateway>): Verify physical cable/Wi-Fi association and local switch path to the router.',
          'Test Numeric Internet Connectivity (ping 203.0.113.20): Reach an external IP address directly to rule out WAN routing outages.',
          'Test DNS Name Resolution (nslookup school.edu): Compare name lookups against numeric IP pings; if only names fail, repair the DNS server setting.',
          'Map Route Failures (tracert <destination>): Identify the exact intermediate router hop where external traffic stops.'
        ]
      };
    case 'securityFirewall':
      return {
        lead: slide.lead || 'Follow how a firewall inspects packets and compares stateless rules against stateful session tracking.',
        steps: [
          'Inspect Incoming or Outgoing Header: The firewall checks source IP, destination IP, transport protocol, port number (such as TCP 443 or TCP 22), and direction.',
          'Evaluate Policy Rules Top-to-Bottom: Packets are compared sequentially against Allow and Deny rules until the first matching rule applies.',
          'Track Established Sessions (Stateful Inspection): Outbound LAN requests create an active entry in the state table so legitimate return responses are allowed back in.',
          'Block Unsolicited Inbound Probes: External attempts targeting closed or sensitive administrative ports (SSH 22 / RDP 3389) match no active session and are dropped.',
          'Enforce Implicit Deny & Logging: Any packet not explicitly allowed hits the final default-deny rule and is logged for administrator review.'
        ]
      };
    case 'security':
      return {
        lead: 'Follow this five-step defense-in-depth procedure to protect hosts, networks, and user accounts.',
        steps: [
          'Identify Threat & Exposure Surface: Determine whether risk comes from unauthorized inbound scans, weak passwords, rogue Wi-Fi, or unencrypted traffic.',
          'Harden Network Perimeter Controls: Enable a stateful firewall to block unused ports and isolate guest networks from staff/admin LANs.',
          'Enforce Least Privilege & Strong Auth: Require unique accounts, complex passphrases, WPA3 wireless security, and minimal folder/NTFS permissions.',
          'Protect Data in Transit: Always use encrypted protocols (HTTPS, SSH, TLS) instead of cleartext HTTP or Telnet.',
          'Monitor, Patch & Verify: Apply security updates promptly, review firewall/auth logs, and test backup recovery regularly.'
        ]
      };
    case 'osiIntroduction':
      return {
        lead: slide.lead || 'Follow how clicking a single web link relies on coordinated OSI reference responsibilities.',
        steps: [
          'Your Goal (Application Layer): You click a webpage link in your browser to request content from a web server.',
          'Prepare the Message (Layers 7–5): Application protocols format the request, encode text/data cleanly, and track the dialog.',
          'Address and Frame for Delivery (Layers 4–2): Ports identify the web app, IP addresses pick the destination network, and MAC frames navigate local switches.',
          'Send Signals and Reverse at Destination (Layer 1): Bits travel as electrical, light, or radio signals; the receiving server unwraps each layer back up to the web service.'
        ]
      };
    default:
      return null;
  }
}

function renderSlideBody(slide, topic) {
  if (slide.kind === 'title') return '';

  // Replaced simulations & interactive examples -> clean Step-by-Step Procedure!
  if (slide.kind === 'example') {
    const plan = examplePlan(topic.id, slide) || [];
    const staticFig = slide.diagram ? schematicDiagramSvg(slide.diagram) : '';
    const procSteps = plan.map(st => `<strong>${esc(st.title)}:</strong> ${esc(st.text)}`);
    const denseProc = procSteps.length >= 7 ? ' proc-steps-compact' : '';
    return `
      ${slide.lead ? `<p class="slide-lead">${esc(slide.lead)}</p>` : ''}
      ${staticFig ? `
        <div class="procedure-split">
          <div class="procedure-diagram">${staticFig}</div>
          <div class="procedure-list-wrap">
            <h3 class="section-subhead">Step-by-Step Procedure</h3>
            <ol class="proc-steps${denseProc}">${procSteps.map(s => `<li>${s}</li>`).join('')}</ol>
          </div>
        </div>
      ` : `
        <h3 class="section-subhead">Step-by-Step Procedure</h3>
        <ol class="proc-steps${denseProc}">${procSteps.map(s => `<li>${s}</li>`).join('')}</ol>
      `}
    `;
  }

  if (slide.type === 'static') {
    const steps = [
      '<strong>Open Network Connections:</strong> Press <code>Win + R</code>, type <code>ncpa.cpl</code>, and press Enter to open adapter settings.',
      '<strong>Open TCP/IPv4 Properties:</strong> Right-click Ethernet (or Wi-Fi), choose Properties, highlight Internet Protocol Version 4 (TCP/IPv4), and click Properties.',
      '<strong>Assign Static IPv4 Settings:</strong> Choose "Use the following IP address" and enter IP address (<code>192.168.1.10</code>), Subnet mask (<code>255.255.255.0</code>), and Default gateway (<code>192.168.1.1</code>).',
      '<strong>Configure DNS &amp; Apply:</strong> Enter Preferred DNS (<code>192.168.1.1</code>) and optional Alternate DNS (<code>8.8.8.8</code>), then click OK.',
      '<strong>Verify Connectivity:</strong> Open Command Prompt, check saved settings with <code>ipconfig /all</code>, and test reachability with <code>ping</code>.'
    ];
    return `
      ${slide.lead ? `<p class="slide-lead">${esc(slide.lead)}</p>` : ''}
      <div class="procedure-split windows-split">
        <div class="procedure-diagram">${windowsIpv4StaticSvg()}</div>
        <div class="procedure-list-wrap">
          <h3 class="section-subhead">Step-by-Step Setup Procedure</h3>
          <ol class="proc-steps">${steps.map(s => `<li>${s}</li>`).join('')}</ol>
        </div>
      </div>
    `;
  }

  if (slide.type === 'sharing') {
    const steps = [
      '<strong>Enable Private Sharing:</strong> Open Network and Sharing Center → Advanced sharing settings, confirm Private profile, and turn on Network discovery and File and printer sharing.',
      '<strong>Open Properties → Sharing:</strong> Right-click the target folder in File Explorer (or printer in Printers &amp; scanners → Printer properties) and open the Sharing tab.',
      '<strong>Turn On Share &amp; Set Share Name:</strong> Click Advanced Sharing…, check "Share this folder" (e.g., <code>ClassFiles</code>), or check "Share this printer" (e.g., <code>ClassroomPrinter</code>).',
      '<strong>Apply Share + NTFS Permissions:</strong> Set Share Permissions under Permissions… and matching NTFS rules under Security (the most restrictive rule wins remotely).',
      '<strong>Connect from Client PC:</strong> Open <code>\\\\TEACHER-PC\\ClassFiles</code> in File Explorer or choose Add a network printer to connect and print.'
    ];
    return `
      ${slide.lead ? `<p class="slide-lead">${esc(slide.lead)}</p>` : ''}
      <div class="procedure-split windows-split">
        <div class="procedure-diagram">${windowsSharingStaticSvg()}</div>
        <div class="procedure-list-wrap">
          <h3 class="section-subhead">Step-by-Step Sharing Procedure</h3>
          <ol class="proc-steps">${steps.map(s => `<li>${s}</li>`).join('')}</ol>
        </div>
      </div>
    `;
  }

  if (slide.type === 'osiUpperLayers') {
    return `${slide.lead ? `<p class="slide-lead">${esc(slide.lead)}</p>` : ''}${osiUpperLayersVisual()}`;
  }
  if (slide.type === 'osiLowerLayers') {
    return `${slide.lead ? `<p class="slide-lead">${esc(slide.lead)}</p>` : ''}${inlineImages(osiLowerLayersVisual())}`;
  }
  if (slide.type === 'encapsulationExample') {
    return `${slide.lead ? `<p class="slide-lead">${esc(slide.lead)}</p>` : ''}${encapsulationExampleVisual()}`;
  }

  if (slide.type) {
    const proc = procedureForSimulation(slide, topic);
    if (proc) {
      if (proc.table) {
        return `
          ${proc.lead ? `<p class="slide-lead">${esc(proc.lead)}</p>` : ''}
          <table class="ref-table">
            <thead><tr>${proc.table.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
            <tbody>${proc.table.rows.map(r => `<tr>${r.map((c, idx) => `<td${idx === 0 ? ' class="td-key"' : ''}>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
          <ol class="proc-steps compact-proc">${proc.steps.map(s => `<li>${formatRichText(s)}</li>`).join('')}</ol>
        `;
      }
      return `
        ${proc.lead ? `<p class="slide-lead">${esc(proc.lead)}</p>` : ''}
        <h3 class="section-subhead">Step-by-Step Procedure</h3>
        <ol class="proc-steps">${proc.steps.map(s => `<li>${formatRichText(s)}</li>`).join('')}</ol>
      `;
    }
  }

  // Device photo concept slide
  if (slide.deviceKey && deviceMetadata[slide.deviceKey]) {
    const meta = deviceMetadata[slide.deviceKey];
    const items = slide.paragraphs || slide.items || [];
    const listMarkup = slide.paragraphs
      ? `<div class="slide-prose">${slide.paragraphs.map(p => `<p>${formatRichText(p)}</p>`).join('')}</div>`
      : `<ul class="bullet-list">${items.map(it => `<li>${formatRichText(it)}</li>`).join('')}</ul>`;
    return `
      ${slide.lead ? `<p class="slide-lead">${esc(slide.lead)}</p>` : ''}
      <div class="device-split">
        <div class="device-photo-frame">
          ${inlineImages(`<img src="${meta.image}" alt="${esc(meta.photoCaption || meta.name)}"/>`)}
          <div class="photo-caption">${esc(meta.photoCaption || meta.name)}</div>
        </div>
        <div class="device-text-col">${listMarkup}</div>
      </div>
    `;
  }

  // Tool grid concept slide (RJ45 Crimping / Keystone Punch-Down)
  if (slide.toolKey && toolsMetadata[slide.toolKey]) {
    const meta = toolsMetadata[slide.toolKey];
    return `
      ${slide.lead ? `<p class="slide-lead">${esc(slide.lead)}</p>` : ''}
      <div class="tools-grid">
        ${meta.tools.map(t => inlineImages(`
          <div class="tool-card">
            <img src="${t.image}" alt="${esc(t.name)}"/>
            <div class="tool-info">
              <div class="tool-title">${esc(t.num)}. ${esc(t.name)}</div>
              <p>${esc(t.desc)}</p>
            </div>
          </div>
        `)).join('')}
      </div>
    `;
  }

  // Cable visuals & visualKeys
  let extraSvg = '';
  if (topic.id === '06-network-cables-media' || topic.id === '07-rj45-crimping') {
    const tLower = slide.title.toLowerCase();
    if (tLower.includes('orientation') || slide.title === 'RJ45 Plugs and Keystone Jacks') extraSvg = connectorOrientationSVG();
    else if (slide.title.startsWith('T568A:')) extraSvg = rj45PlugColorSVG('A');
    else if (slide.title.startsWith('T568B:')) extraSvg = rj45PlugColorSVG('B');
    else if (tLower.includes('straight-through')) extraSvg = straightVsCrossoverVisualSVG();
  }

  const visualHtml = slide.visualKey && visualPanels[slide.visualKey]
    ? inlineImages(visualPanels[slide.visualKey]())
    : '';

  const hasParagraphs = Array.isArray(slide.paragraphs) && slide.paragraphs.length > 0;
  const rawItems = slide.items || [];
  const startsNumbered = rawItems.length > 0 && rawItems.every(it => /^\d+\.\s+/.test(it));
  const items = startsNumbered ? rawItems.map(it => it.replace(/^\d+\.\s+/, '')) : rawItems;
  const useNumbered = startsNumbered || slide.kind === 'objectives' || /^(Five|Three|Two|Four|Six|Seven|Eight)\b/.test(slide.title) || slide.title.includes('Standards Organizations');
  const densityClass = (items.length >= 7 || (slide.paragraphs?.length || 0) >= 4) ? 'dense-list' : items.length >= 5 ? 'medium-list' : '';

  const textBlock = hasParagraphs
    ? `<div class="slide-prose ${densityClass}">${slide.paragraphs.map(p => `<p>${formatRichText(p)}</p>`).join('')}</div>`
    : items.length
      ? `<${useNumbered ? 'ol' : 'ul'} class="${useNumbered ? 'num-list' : 'bullet-list'} ${densityClass}">${items.map(it => `<li>${formatRichText(it)}</li>`).join('')}</${useNumbered ? 'ol' : 'ul'}>`
      : '';

  if (extraSvg) {
    const fixedSvg = extraSvg
      .replace('transform="translate(24, 40)"', 'transform="translate(24, 54)"')
      .replace('x="110" y="-16"', 'x="160" y="-15"');
    return `
      ${slide.lead ? `<p class="slide-lead">${esc(slide.lead)}</p>` : ''}
      <div class="visual-split">
        <div class="visual-left">${inlineImages(fixedSvg)}</div>
        <div class="visual-right">${textBlock}${visualHtml}</div>
      </div>
    `;
  }

  if (visualHtml && (slide.visualLayout === 'split' || slide.visualKey === 'performanceMeasures' || slide.visualKey === 'gatewayInterfacesPhotos' || slide.visualKey === 'wifiRouterHardwarePhoto' || slide.visualKey === 'modularConnectors')) {
    return `
      ${slide.lead ? `<p class="slide-lead">${esc(slide.lead)}</p>` : ''}
      <div class="${textBlock ? 'visual-split-wide' : 'visual-only'}">
        ${textBlock ? `<div class="visual-text">${textBlock}</div>` : ''}
        <div class="visual-panel-wrap">${visualHtml}</div>
      </div>
    `;
  }

  return `
    ${slide.lead ? `<p class="slide-lead">${esc(slide.lead)}</p>` : ''}
    ${textBlock}
    ${visualHtml ? `<div class="visual-bottom">${visualHtml}</div>` : ''}
  `;
}

function buildCoverSvg() {
  const dots = [];
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 18; col++) {
      dots.push(`<circle cx="${740 + col * 28}" cy="${24 + row * 32}" r="2.2" fill="rgba(255,255,255,0.10)"/>`);
    }
  }
  return `
    <svg class="cover-bg-svg" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e242b"/>
          <stop offset="55%" stop-color="#222a2f"/>
          <stop offset="100%" stop-color="#181b1e"/>
        </linearGradient>
        <linearGradient id="tealBeam1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(165, 206, 209, 0.55)"/>
          <stop offset="100%" stop-color="rgba(76, 128, 134, 0.14)"/>
        </linearGradient>
        <linearGradient id="tealBeam2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(128, 182, 184, 0.42)"/>
          <stop offset="100%" stop-color="rgba(48, 92, 97, 0.08)"/>
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#bgGrad)"/>
      ${dots.join('')}
      <path d="M 380 -40 C 520 200, 560 480, 260 760 L 520 760 C 760 470, 740 190, 560 -40 Z" fill="url(#tealBeam1)"/>
      <path d="M 520 -40 C 720 220, 720 500, 420 760 L 660 760 C 900 480, 910 210, 720 -40 Z" fill="url(#tealBeam2)"/>
      <path d="M 880 -40 C 790 220, 620 490, 280 760 L 380 760 C 720 480, 900 210, 995 -40 Z" fill="rgba(220, 232, 232, 0.18)"/>
      <path d="M -20 90 Q 420 20, 680 340" fill="none" stroke="rgba(160, 204, 210, 0.22)" stroke-width="2"/>
      <path d="M -20 120 Q 410 55, 670 375" fill="none" stroke="rgba(160, 204, 210, 0.16)" stroke-width="1.5"/>
      <path d="M -20 150 Q 400 90, 660 410" fill="none" stroke="rgba(160, 204, 210, 0.12)" stroke-width="1.5"/>
      <path d="M -20 180 Q 390 125, 650 445" fill="none" stroke="rgba(160, 204, 210, 0.10)" stroke-width="1.5"/>
    </svg>
  `;
}

const moduleCss = `
  @page { size: 13.3333in 7.5in; margin: 0; }
  * { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0;
    background: #ffffff;
    font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, sans-serif;
    color: #111827;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .slide-page {
    width: 1280px;
    height: 720px;
    position: relative;
    overflow: hidden;
    page-break-after: always;
    break-after: page;
    background: #ffffff;
    display: flex;
    flex-direction: column;
  }
  .slide-page:last-child { page-break-after: auto; break-after: auto; }

  /* Cover slide matching Network Standards and Models Page 1 */
  .slide-cover { background: #1e242b; color: #ffffff; justify-content: flex-end; }
  .cover-bg-svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
  .cover-foreground { position: relative; z-index: 1; padding: 0 0 112px 0; }
  .cover-title {
    margin: 0 72px 24px 56px;
    font-size: 56px;
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.02em;
    color: #ffffff;
    max-width: 980px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
  }
  .cover-gold-bar {
    width: 81%;
    background: #f59e0b;
    padding: 15px 32px 15px 56px;
    font-size: 31px;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.01em;
  }

  /* Header box matching Reference PDF Pages 2-36 */
  .slide-header-box {
    margin: 18px 34px 20px;
    padding: 18px 28px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 3px 8px rgba(15, 23, 42, 0.09);
    flex-shrink: 0;
  }
  .slide-header-box h2 {
    margin: 0;
    font-size: 38px;
    font-weight: 800;
    line-height: 1.14;
    letter-spacing: -0.02em;
    color: #000000;
  }
  .slide-header-box h2.long-title { font-size: 32px; }

  .slide-content-area {
    flex: 1;
    padding: 4px 58px 28px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
  }

  .slide-lead {
    margin: 0 0 18px;
    font-size: 24px;
    line-height: 1.4;
    color: #111827;
    font-weight: 400;
  }
  .section-subhead {
    margin: 2px 0 12px;
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .bullet-list, .num-list, .proc-steps {
    margin: 0;
    padding-left: 34px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .bullet-list li, .num-list li, .proc-steps li {
    font-size: 23px;
    line-height: 1.42;
    color: #111827;
    padding-left: 6px;
  }
  .bullet-list.medium-list li, .num-list.medium-list li {
    font-size: 20px;
    line-height: 1.38;
  }
  .bullet-list.medium-list, .num-list.medium-list { gap: 10px; }
  .bullet-list.dense-list li, .num-list.dense-list li {
    font-size: 17.5px;
    line-height: 1.34;
  }
  .bullet-list.dense-list, .num-list.dense-list { gap: 8px; }

  .proc-steps { gap: 12px; }
  .proc-steps li { font-size: 20.5px; line-height: 1.4; }
  .proc-steps.proc-steps-compact { gap: 6px; }
  .proc-steps.proc-steps-compact li { font-size: 16.5px; line-height: 1.3; }
  .proc-steps.compact-proc { gap: 6px; margin-top: 10px; }
  .proc-steps.compact-proc li { font-size: 16px; line-height: 1.32; }

  .slide-prose { display: flex; flex-direction: column; gap: 15px; }
  .slide-prose p { margin: 0; font-size: 21px; line-height: 1.48; color: #111827; }
  .slide-prose.dense-list p { font-size: 18px; line-height: 1.38; }

  code {
    font-family: Consolas, "Courier New", monospace;
    background: #f1f5f9;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 0.9em;
    color: #0f172a;
  }

  /* Split layouts for static figures + procedure */
  .procedure-split, .device-split, .visual-split, .visual-split-wide {
    display: grid;
    grid-template-columns: 44% 53%;
    gap: 3%;
    align-items: start;
    flex: 1;
  }
  .visual-split { grid-template-columns: 38% 59%; }
  .visual-split-wide { grid-template-columns: 50% 47%; }
  .procedure-split.windows-split { grid-template-columns: 38% 59%; align-items: center; }
  .procedure-diagram {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
  }
  .schematic-svg, .static-dialog-svg {
    width: 100%;
    max-height: 440px;
    height: auto;
    display: block;
  }
  .device-photo-frame {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 12px;
    background: #f8fafc;
    text-align: center;
  }
  .device-photo-frame img {
    width: 100%;
    max-height: 360px;
    object-fit: contain;
    display: block;
    margin: 0 auto 10px;
  }
  .photo-caption { font-size: 16px; font-weight: 700; color: #1e293b; }

  /* Physical photo strips matching module textbook figures */
  .physical-photo-panel { margin-top: 8px; }
  .physical-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 14px;
  }
  .physical-photo-card {
    margin: 0;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 10px;
    background: #f8fafc;
    text-align: center;
  }
  .physical-photo-box {
    height: 155px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .physical-photo-img, .physical-photo-svg {
    max-width: 100%;
    max-height: 150px;
    object-fit: contain;
  }
  .physical-photo-title { margin: 8px 0 0; font-size: 15px; font-weight: 700; color: #0f172a; }

  /* Tools 6-card clean grid */
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 4px;
  }
  .tool-card {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 10px 12px;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .tool-card img { width: 100%; height: 118px; object-fit: contain; }
  .tool-title { font-size: 15.5px; font-weight: 800; color: #0f172a; margin-bottom: 3px; }
  .tool-card p { margin: 0; font-size: 13.5px; line-height: 1.35; color: #334155; }

  /* Performance cards & OSI summary visuals */
  .module-two-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 10px; }
  .module-card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px 18px; background: #f8fafc; }
  .module-card-tag { font-size: 12px; font-weight: 800; letter-spacing: 0.04em; margin-bottom: 6px; }
  .tag-blue { color: #1d4ed8; }
  .tag-teal { color: #0f766e; }
  .module-card h4 { margin: 0 0 6px; font-size: 18px; }
  .module-card p { margin: 0; font-size: 15.5px; line-height: 1.42; color: #1e293b; }

  .osi-layer-lens { margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; background: #f8fafc; }
  .osi-lens-header { display: flex; justify-content: space-between; font-weight: 800; font-size: 14.5px; margin-bottom: 8px; color: #1d4ed8; }
  .osi-lens-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .osi-lens-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px; }
  .osi-lens-card h3 { margin: 0 0 4px; font-size: 14.5px; color: #0f172a; }
  .osi-lens-card p { margin: 0; font-size: 13px; line-height: 1.32; color: #334155; }
  .osi-physical-thumbs { display: flex; gap: 14px; margin-top: 8px; justify-content: center; }
  .osi-mini-photo { margin: 0; display: flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 3px 10px; }
  .osi-mini-photo img { height: 34px; width: 46px; object-fit: contain; }
  .osi-mini-photo figcaption { font-size: 12.5px; font-weight: 700; }

  .perf-examples-grid.encap-examples-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .perf-example-card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 14px; background: #f8fafc; }
  .perf-card-tag { font-size: 12px; font-weight: 800; color: #1d4ed8; }
  .perf-card-title { margin: 4px 0 10px; font-size: 17px; }
  .encap-steps { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .encap-step { display: flex; justify-content: space-between; align-items: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 10px; font-size: 13.5px; }
  .encap-layer-label { font-weight: 700; color: #0f172a; min-width: 135px; }
  .encap-chips { display: flex; align-items: center; gap: 8px; }
  .encap-chip { font-family: Consolas, monospace; font-size: 12px; font-weight: 700; padding: 2px 7px; border-radius: 4px; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
  .encap-step-note { font-size: 12.5px; color: #475569; }

  /* Reference table matching PDF Page 35 */
  .ref-table { width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 6px; }
  .ref-table th { background: #0f766e; color: #ffffff; text-align: left; padding: 7px 10px; font-weight: 700; border: 1px solid #0f766e; }
  .ref-table td { padding: 5.5px 10px; border: 1px solid #cbd5e1; background: #fffbeb; color: #111827; vertical-align: top; }
  .ref-table tr:nth-child(even) td { background: #f8fafc; }
  .ref-table td.td-key { font-weight: 800; color: #0f172a; white-space: nowrap; }

  .rj45-schematic-wrap .eyebrow { display: block; font-size: 11px; font-weight: 800; letter-spacing: 0.06em; color: #1d4ed8; margin-bottom: 2px; }
  .rj45-schematic-title { margin: 0 0 8px; font-size: 16px; font-weight: 700; color: #0f172a; }
  .rj45-schematic-svg, .cable-diagram-svg, .pinout-diagram { width: 100%; max-height: 315px; height: auto; display: block; }
  .rj45-real-strip { display: flex; align-items: center; gap: 10px; margin-top: 8px; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc; }
  .rj45-real-thumb { width: 88px; height: 56px; object-fit: contain; border-radius: 4px; flex-shrink: 0; }
  .rj45-real-title { margin: 0; font-size: 13.5px; font-weight: 700; color: #0f172a; }
  .rj45-guide-grid, .pinout-visual, .pinout-photo-box { max-width: 100%; }
  .cable-real-photo, .pinout-photo-box img, .connector-photo-img { width: 100%; max-height: 140px; object-fit: contain; display: block; margin: 0 auto; }
  .rj45-pinout-grid { display: grid; grid-template-columns: 1fr; gap: 8px; }
  .pinout-photo-box, .connector-photo-card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px; background: #f8fafc; text-align: center; }
  .connectors-pair-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 10px; }
  .connector-photo-box { height: 120px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .connector-photo-title { margin: 6px 0 0; font-size: 14px; font-weight: 700; color: #0f172a; }
  .visual-right img { max-height: 135px; object-fit: contain; }
  .visual-right .bullet-list li { font-size: 18px; line-height: 1.32; }
  .visual-right .bullet-list { gap: 6px; margin-bottom: 10px; }
  .visual-right .slide-prose p { font-size: 18px; line-height: 1.4; }
  .visual-bottom { margin-top: 12px; }

  .ip-visual-card { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 12px; overflow: hidden; }
  .ip-visual-title { font-size: 13.5px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
  .ip-visual-table { width: 100%; border-collapse: collapse; font-size: 10.6px; line-height: 1.28; }
  .ip-visual-table th { background: #1d4ed8; color: #ffffff; text-align: left; padding: 4.5px 5px; font-weight: 700; border: 1px solid #1d4ed8; }
  .ip-visual-table td { padding: 4px 5px; border: 1px solid #cbd5e1; color: #0f172a; vertical-align: middle; }
  .ip-visual-table tbody tr:nth-child(even) td { background: #f8fafc; }
  .ip-td-strong { font-weight: 800; white-space: nowrap; }
  .ip-td-code { font-family: Consolas, monospace; font-weight: 700; color: #1d4ed8; white-space: nowrap; }
  .ip-visual-note { margin: 6px 0 0; font-size: 11.5px; line-height: 1.35; color: #475569; }
  .ip-compare-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
  .ip-compare-card { border-radius: 8px; padding: 8px 11px; border: 1px solid #cbd5e1; background: #ffffff; }
  .ip-compare-warn { border-color: #fca5a5; background: #fff5f5; }
  .ip-compare-ok { border-color: #86efac; background: #f0fdf4; }
  .ip-compare-badge { font-size: 10px; font-weight: 800; letter-spacing: 0.06em; color: #475569; margin-bottom: 2px; }
  .ip-compare-card h4 { margin: 0 0 4px; font-size: 13.5px; font-weight: 800; color: #0f172a; }
  .ip-compare-svg { width: 100%; height: auto; max-height: 98px; display: block; margin-bottom: 5px; }
  .ip-compare-card p { margin: 0; font-size: 12px; line-height: 1.34; color: #334155; }
  .visual-split-wide .visual-text .slide-prose p { font-size: 18px; line-height: 1.42; margin-bottom: 10px; }
  .visual-split-wide .visual-text .num-list.medium-list li { font-size: 14.5px; line-height: 1.34; margin-bottom: 5px; }
`;

function renderTopicHtml(topic) {
  const modNum = String(topic.number).padStart(2, '0');
  const slidesHtml = topic.slides.map((slide, idx) => {
    if (idx === 0 || slide.kind === 'title') {
      return `
        <section class="slide-page slide-cover">
          ${buildCoverSvg()}
          <div class="cover-foreground">
            <h1 class="cover-title">${esc(topic.title)}</h1>
            <div class="cover-gold-bar">Networking 1 · Module ${modNum}</div>
          </div>
        </section>
      `;
    }
    const longTitle = slide.title.length > 52 ? ' class="long-title"' : '';
    return `
      <section class="slide-page">
        <header class="slide-header-box">
          <h2${longTitle}>${esc(slide.title)}</h2>
        </header>
        <div class="slide-content-area">
          ${renderSlideBody(slide, topic)}
        </div>
      </section>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Module ${modNum} - ${esc(topic.title)}</title>
  <style>${moduleCss}</style>
</head>
<body>
${slidesHtml}
</body>
</html>`;
}

function slugify(text) {
  return text.replace(/[:/()&]+/g, ' ').replace(/[^a-zA-Z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

mkdirSync(modulesDir, { recursive: true });
mkdirSync(tmpHtmlDir, { recursive: true });

const browserExe = findBrowser();
console.log(`Generating 12 PDF modules in ${modulesDir} using ${browserExe}...`);

for (const topic of topics) {
  const num = String(topic.number).padStart(2, '0');
  const fileName = `Module-${num}-${slugify(topic.title)}.pdf`;
  const htmlPath = resolve(tmpHtmlDir, `module-${num}.html`);
  const pdfPath = resolve(modulesDir, fileName);

  const html = renderTopicHtml(topic);
  await import('node:fs/promises').then(fs => fs.writeFile(htmlPath, html, 'utf8'));

  const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
  execFileSync(browserExe, [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--print-to-pdf=' + pdfPath,
    fileUrl
  ], { stdio: 'pipe' });

  console.log(`  Created: modules/${fileName} (${topic.slides.length} slides)`);
}

rmSync(tmpHtmlDir, { recursive: true, force: true });
console.log('Done: All 12 modules created cleanly.');
