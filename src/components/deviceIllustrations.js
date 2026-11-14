import { esc } from './ui.js';

export const deviceMetadata = {
  nic: {
    name: 'Network Interface Card (NIC)',
    shortName: 'NIC',
    role: 'Host Physical Interface & Hardware MAC Identifier',
    desc: 'Connects a computer to a wired cable or wireless radio network and handles signal conversion using its built-in MAC address.',
    image: 'images/devices/nic.jpg',
    photoCaption: 'PCIe Desktop Gigabit Network Interface Card'
  },
  hub: {
    name: 'Network Hub',
    shortName: 'Hub',
    role: 'Multiport Repeater & Shared Collision Domain',
    desc: 'Shares one electrical bus across all ports and repeats every incoming signal out to every other connected port without checking addresses.',
    image: 'images/devices/hub.jpg',
    photoCaption: '8-Port Fast Ethernet Multiport Repeater Hub'
  },
  switch: {
    name: 'Network Switch',
    shortName: 'Switch',
    role: 'Intelligent Multiport Bridge & MAC Learning Engine',
    desc: 'Records the hardware MAC address on each port and forwards local frames directly to the target device port.',
    image: 'images/devices/switch.jpg',
    photoCaption: '24-Port 1U Rackmount Gigabit Managed Switch'
  },
  router: {
    name: 'Network Router',
    shortName: 'Router',
    role: 'Inter-Network Gateway & IP Path Forwarding',
    desc: 'Links separate IP networks, keeps local broadcast traffic inside each LAN, and forwards packets using a routing table.',
    image: 'images/devices/router.jpg',
    photoCaption: 'Enterprise Branch Office Internetworking Router'
  },
  modem: {
    name: 'Modem (Modulator-Demodulator)',
    shortName: 'Modem',
    role: 'Digital ↔ Analog Signal Converter for Provider Media',
    desc: 'Modulates digital Ethernet signals onto coaxial, DSL, or fiber provider lines and demodulates incoming ISP signals back into data.',
    image: 'images/devices/modem.jpg',
    photoCaption: 'DOCSIS 3.1 Broadband Cable Modem'
  },
  ap: {
    name: 'Wireless Access Point (AP)',
    shortName: 'Access Point',
    role: 'Wi-Fi Transceiver & 802.11 ↔ 802.3 Bridge',
    desc: 'Provides Wi-Fi radio coverage and bridges wireless client frames onto a wired Ethernet switch.',
    image: 'images/devices/ap.jpg',
    photoCaption: 'Enterprise Ceiling-Mount Wi-Fi Access Point'
  },
  repeater: {
    name: 'Network Repeater',
    shortName: 'Repeater',
    role: 'Signal Regenerator & Distance Extender',
    desc: 'Reconstructs weakened digital pulses and amplifies faded wireless signals to extend transmission reach.',
    image: 'images/devices/repeater.jpg',
    photoCaption: 'Dual-Band AC Wall-Plug Wi-Fi Range Extender'
  },
  bridge: {
    name: 'Network Bridge',
    shortName: 'Bridge',
    role: 'Segment Isolator & Filtering Engine',
    desc: 'Joins two LAN segments and checks MAC destinations so local traffic stays on its own side.',
    image: 'images/devices/bridge.jpg',
    photoCaption: 'Point-to-Point Wireless / Multiport Ethernet Bridge'
  },
  firewall: {
    name: 'Network Firewall',
    shortName: 'Firewall',
    role: 'Traffic Policy Enforcement & Perimeter Defense',
    desc: 'Guards a network boundary by inspecting packet addresses, protocol ports, and connection states against security rules.',
    image: 'images/devices/firewall.jpg',
    photoCaption: 'Next-Gen Hardware Security Firewall Appliance'
  },
  server: {
    name: 'Enterprise Server',
    shortName: 'Server',
    role: 'Centralized Resource Provider & High-Availability Service Host',
    desc: 'Provides shared files, web applications, databases, and network directory services to connected clients.',
    image: 'images/devices/server.jpg',
    photoCaption: '2U Rackmount Enterprise Dual-Socket Server'
  }
};

/**
 * Renders the "How It Works" data flow / transmission diagram for a given device.
 * viewBox="0 0 520 180"
 */
export function renderHowItWorksSvg(deviceKey) {
  switch (deviceKey) {
    case 'nic':
      return `
      <svg class="device-flow-svg" viewBox="0 0 520 180" role="img" aria-label="How a Network Interface Card Works: Framing and Serializing Data">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb"/>
          </marker>
          <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#16a34a"/>
          </marker>
        </defs>

        <rect x="0" y="0" width="520" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>

        <!-- Flow Title -->
        <text x="20" y="22" font-size="11" fill="#0f172a" font-weight="800">HOW IT WORKS: Host Data → Ethernet Frame → Electrical Bitstream</text>

        <!-- Step 1: Host System -->
        <g transform="translate(15, 38)">
          <rect x="0" y="0" width="115" height="100" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="57" y="18" font-size="9" fill="#1e40af" font-weight="800" text-anchor="middle">1. HOST PC</text>
          <rect x="10" y="28" width="95" height="30" rx="3" fill="#ffffff" stroke="#93c5fd"/>
          <text x="57" y="42" font-size="8" fill="#1e3a8a" text-anchor="middle">Application & OS</text>
          <text x="57" y="52" font-size="8" fill="#2563eb" font-weight="700" text-anchor="middle">IP Packet Ready</text>
          <text x="57" y="80" font-size="7" fill="#475569" text-anchor="middle">Parallel PCIe bus</text>
        </g>

        <!-- Arrow 1 to 2 -->
        <path d="M 130 88 H 155" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow)"/>

        <!-- Step 2: NIC Controller Framing -->
        <g transform="translate(160, 38)">
          <rect x="0" y="0" width="180" height="100" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
          <text x="90" y="18" font-size="9" fill="#15803d" font-weight="800" text-anchor="middle">2. NIC CONTROLLER CHIP</text>
          <!-- Frame Structure -->
          <rect x="10" y="28" width="160" height="24" rx="2" fill="#ffffff" stroke="#86efac"/>
          <text x="18" y="43" font-size="7" fill="#15803d" font-weight="700">Preamble</text>
          <text x="56" y="43" font-size="7" fill="#0369a1" font-weight="800">Dst MAC</text>
          <text x="94" y="43" font-size="7" fill="#15803d" font-weight="800">Src MAC</text>
          <text x="135" y="43" font-size="7" fill="#b45309" font-weight="800">FCS/CRC</text>
          <line x1="50" y1="28" x2="50" y2="52" stroke="#86efac"/>
          <line x1="88" y1="28" x2="88" y2="52" stroke="#86efac"/>
          <line x1="128" y1="28" x2="128" y2="52" stroke="#86efac"/>
          <text x="90" y="70" font-size="8" fill="#14532d" font-weight="700" text-anchor="middle">Attaches Source MAC:</text>
          <text x="90" y="82" font-size="9" fill="#0f172a" font-weight="800" font-family="monospace" text-anchor="middle">00:1A:2B:3C:4D:5E</text>
          <text x="90" y="94" font-size="7" fill="#64748b" text-anchor="middle">Calculates CRC checksum</text>
        </g>

        <!-- Arrow 2 to 3 -->
        <path d="M 340 88 H 365" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrowGreen)"/>

        <!-- Step 3: PHY Transceiver Serialization -->
        <g transform="translate(370, 38)">
          <rect x="0" y="0" width="135" height="100" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5"/>
          <text x="67" y="18" font-size="9" fill="#854d0e" font-weight="800" text-anchor="middle">3. PHY TRANSCEIVER</text>
          <!-- Serial pulse diagram -->
          <rect x="10" y="28" width="115" height="34" rx="2" fill="#ffffff" stroke="#fde047"/>
          <path d="M 15 48 H 25 V 36 H 40 V 48 H 55 V 36 H 70 V 48 H 85 V 36 H 100 V 48 H 115" stroke="#ca8a04" stroke-width="1.8" fill="none"/>
          <text x="67" y="58" font-size="7" fill="#713f12" font-family="monospace" text-anchor="middle">0 1 1 0 1 0 1 0</text>
          <text x="67" y="78" font-size="8" fill="#854d0e" font-weight="700" text-anchor="middle">Serial Bitstream Out</text>
          <text x="67" y="90" font-size="7" fill="#475569" text-anchor="middle">Onto Cat6 Twisted Pairs</text>
        </g>

        <!-- Bottom takeaway banner -->
        <rect x="15" y="148" width="490" height="22" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="260" y="163" font-size="9" fill="#334155" text-anchor="middle">NIC converts host memory data into standard Ethernet frames and electrical pulses onto the cable.</text>
      </svg>`;

    case 'hub':
      return `
      <svg class="device-flow-svg" viewBox="0 0 520 180" role="img" aria-label="How a Network Hub Works: Blind Repeating to All Ports and Shared Collision Domain">
        <defs>
          <marker id="arrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#ef4444"/>
          </marker>
        </defs>

        <rect x="0" y="0" width="520" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="20" y="22" font-size="11" fill="#0f172a" font-weight="800">HOW IT WORKS: Frame In Port 1 → Blindly Repeated to Ports 2, 3, and 4</text>

        <!-- Sender: PC A on Port 1 -->
        <g transform="translate(20, 40)">
          <rect x="0" y="0" width="90" height="85" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="45" y="18" font-size="9" fill="#1e40af" font-weight="800" text-anchor="middle">PC A (Sender)</text>
          <rect x="15" y="26" width="60" height="22" rx="2" fill="#ffffff" stroke="#93c5fd"/>
          <text x="45" y="38" font-size="7" fill="#1e3a8a" text-anchor="middle">Frame to PC C</text>
          <text x="45" y="45" font-size="7" fill="#64748b" text-anchor="middle">(MAC CC)</text>
          <text x="45" y="65" font-size="8" fill="#2563eb" font-weight="700" text-anchor="middle">Port 1 IN</text>
          <text x="45" y="77" font-size="7" fill="#64748b" text-anchor="middle">Electrical Bits</text>
        </g>

        <!-- Arrow from PC A into Hub -->
        <path d="M 110 82 H 160" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arrow)"/>

        <!-- The Hub Core -->
        <g transform="translate(165, 38)">
          <rect x="0" y="0" width="160" height="95" rx="6" fill="#f8fafc" stroke="#475569" stroke-width="2"/>
          <rect x="10" y="8" width="140" height="20" rx="3" fill="#334155"/>
          <text x="80" y="22" font-size="9" fill="#ffffff" font-weight="800" text-anchor="middle">HUB CHASSIS (Shared Bus)</text>

          <!-- Shared bus split wire -->
          <circle cx="20" cy="50" r="5" fill="#3b82f6"/>
          <path d="M 20 50 H 70 V 38 H 140 M 70 50 H 140 M 70 50 V 68 H 140" stroke="#ef4444" stroke-width="2" fill="none"/>
          <circle cx="70" cy="50" r="4" fill="#ef4444"/>

          <text x="80" y="86" font-size="8" fill="#dc2626" font-weight="800" text-anchor="middle">NO MAC LOOKUP</text>
        </g>

        <!-- Repeated outputs to Ports 2, 3, 4 -->
        <g transform="translate(330, 36)">
          <!-- Port 2: PC B -->
          <g transform="translate(0, 0)">
            <path d="M 0 14 H 40" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
            <rect x="45" y="2" width="125" height="24" rx="3" fill="#fee2e2" stroke="#fca5a5"/>
            <text x="52" y="16" font-size="8" fill="#991b1b" font-weight="700">Port 2 (PC B):</text>
            <text x="110" y="16" font-size="8" fill="#ef4444" font-weight="800">Must Discard ✗</text>
          </g>
          <!-- Port 3: PC C (Intended Target) -->
          <g transform="translate(0, 34)">
            <path d="M 0 14 H 40" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowGreen)"/>
            <rect x="45" y="2" width="125" height="24" rx="3" fill="#f0fdf4" stroke="#86efac"/>
            <text x="52" y="16" font-size="8" fill="#15803d" font-weight="700">Port 3 (PC C):</text>
            <text x="110" y="16" font-size="8" fill="#16a34a" font-weight="800">Accepts Frame ✓</text>
          </g>
          <!-- Port 4: PC D -->
          <g transform="translate(0, 68)">
            <path d="M 0 14 H 40" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
            <rect x="45" y="2" width="125" height="24" rx="3" fill="#fee2e2" stroke="#fca5a5"/>
            <text x="52" y="16" font-size="8" fill="#991b1b" font-weight="700">Port 4 (PC D):</text>
            <text x="110" y="16" font-size="8" fill="#ef4444" font-weight="800">Must Discard ✗</text>
          </g>
        </g>

        <!-- Bottom Warning Callout -->
        <rect x="15" y="145" width="490" height="25" rx="4" fill="#fef2f2" stroke="#fecaca"/>
        <text x="260" y="161" font-size="9" fill="#991b1b" font-weight="700" text-anchor="middle">⚠️ Shared Collision Domain: If any other PC transmits at the same time, a Collision occurs!</text>
      </svg>`;

    case 'switch':
      return `
      <svg class="device-flow-svg" viewBox="0 0 520 180" role="img" aria-label="How a Network Switch Works: MAC Learning and Directed Unicast Forwarding">
        <defs>
          <marker id="arrowGreenLg" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#16a34a"/>
          </marker>
        </defs>

        <rect x="0" y="0" width="520" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="20" y="22" font-size="11" fill="#0f172a" font-weight="800">HOW IT WORKS: Switch Learns Source MAC → Forwards Known Unicast to Port 3 ONLY</text>

        <!-- Sender: PC A (Port 1) -->
        <g transform="translate(15, 38)">
          <rect x="0" y="0" width="95" height="92" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="47" y="16" font-size="9" fill="#1e40af" font-weight="800" text-anchor="middle">PC A on Port 1</text>
          <text x="47" y="28" font-size="7" fill="#64748b" text-anchor="middle" font-family="monospace">Src MAC: AA:AA</text>
          <rect x="8" y="34" width="79" height="34" rx="2" fill="#ffffff" stroke="#bfdbfe"/>
          <text x="47" y="48" font-size="7" fill="#1e40af" font-weight="700" text-anchor="middle">Frame to:</text>
          <text x="47" y="60" font-size="8" fill="#0f172a" font-weight="800" font-family="monospace" text-anchor="middle">Dst: CC:CC</text>
          <text x="47" y="80" font-size="7" fill="#16a34a" font-weight="700" text-anchor="middle">Enters Port 1</text>
        </g>

        <!-- Arrow into switch -->
        <path d="M 110 82 H 135" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arrow)"/>

        <!-- Switch MAC Learning Engine -->
        <g transform="translate(140, 36)">
          <rect x="0" y="0" width="195" height="98" rx="6" fill="#f8fafc" stroke="#1e293b" stroke-width="1.8"/>
          <text x="97" y="16" font-size="9" fill="#0f172a" font-weight="800" text-anchor="middle">SWITCH MAC TABLE (CAM)</text>

          <!-- Table Rows -->
          <rect x="10" y="24" width="175" height="48" rx="2" fill="#ffffff" stroke="#cbd5e1"/>
          <line x1="60" y1="24" x2="60" y2="72" stroke="#cbd5e1"/>
          <!-- Header -->
          <text x="35" y="35" font-size="7" fill="#64748b" font-weight="700" text-anchor="middle">PORT</text>
          <text x="115" y="35" font-size="7" fill="#64748b" font-weight="700" text-anchor="middle">LEARNED MAC ADDRESS</text>
          <line x1="10" y1="38" x2="185" y2="38" stroke="#cbd5e1"/>
          <!-- Row 1: Learned from Port 1 -->
          <text x="35" y="50" font-size="8" fill="#2563eb" font-weight="800" text-anchor="middle">Port 1</text>
          <text x="115" y="50" font-size="8" fill="#2563eb" font-family="monospace" text-anchor="middle">AA:AA:AA:AA:01 (New!)</text>
          <!-- Row 2: Target on Port 3 -->
          <text x="35" y="64" font-size="8" fill="#16a34a" font-weight="800" text-anchor="middle">Port 3</text>
          <text x="115" y="64" font-size="8" fill="#16a34a" font-family="monospace" text-anchor="middle">CC:CC:CC:CC:03 (Match!)</text>

          <text x="97" y="88" font-size="8" fill="#15803d" font-weight="800" text-anchor="middle">Direct Unicast: Forward to Port 3 ONLY</text>
        </g>

        <!-- Outputs to Ports -->
        <g transform="translate(340, 36)">
          <!-- Port 2 (Silent) -->
          <g transform="translate(0, 0)">
            <rect x="35" y="2" width="135" height="24" rx="3" fill="#f8fafc" stroke="#cbd5e1"/>
            <text x="42" y="16" font-size="8" fill="#64748b" font-weight="700">Port 2 (PC B):</text>
            <text x="105" y="16" font-size="8" fill="#64748b" font-weight="700">Quiet (No Flood)</text>
          </g>
          <!-- Port 3 (Direct Forwarding Match!) -->
          <g transform="translate(0, 34)">
            <path d="M 0 14 H 30" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrowGreenLg)"/>
            <rect x="35" y="2" width="135" height="26" rx="3" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
            <text x="42" y="17" font-size="8" fill="#15803d" font-weight="800">Port 3 (PC C):</text>
            <text x="105" y="17" font-size="8" fill="#16a34a" font-weight="800">Delivered! ✓</text>
          </g>
          <!-- Port 4 (Silent) -->
          <g transform="translate(0, 68)">
            <rect x="35" y="2" width="135" height="24" rx="3" fill="#f8fafc" stroke="#cbd5e1"/>
            <text x="42" y="16" font-size="8" fill="#64748b" font-weight="700">Port 4 (PC D):</text>
            <text x="105" y="16" font-size="8" fill="#64748b" font-weight="700">Quiet (No Flood)</text>
          </g>
        </g>

        <!-- Bottom Takeaway -->
        <rect x="15" y="146" width="490" height="24" rx="4" fill="#f0fdf4" stroke="#bbf7d0"/>
        <text x="260" y="162" font-size="9" fill="#15803d" font-weight="700" text-anchor="middle">✓ Zero Collisions: Each switch port is an independent, dedicated collision domain.</text>
      </svg>`;

    case 'router':
      return `
      <svg class="device-flow-svg" viewBox="0 0 520 180" role="img" aria-label="How a Network Router Works: IP Packet Forwarding via Routing Table">
        <rect x="0" y="0" width="520" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="20" y="22" font-size="11" fill="#0f172a" font-weight="800">HOW IT WORKS: Host IP Packet → Router Inspects IP → Consults Routing Table → WAN Hop</text>

        <!-- Source Host (Local LAN Subnet) -->
        <g transform="translate(15, 38)">
          <rect x="0" y="0" width="115" height="96" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="57" y="16" font-size="8" fill="#1e40af" font-weight="800" text-anchor="middle">LOCAL SUBNET</text>
          <text x="57" y="28" font-size="7" fill="#64748b" text-anchor="middle">192.168.1.0/24</text>
          <rect x="10" y="34" width="95" height="34" rx="2" fill="#ffffff" stroke="#bfdbfe"/>
          <text x="57" y="46" font-size="7" fill="#1e40af" text-anchor="middle">Host: 192.168.1.10</text>
          <text x="57" y="58" font-size="8" fill="#dc2626" font-weight="800" text-anchor="middle">Dst IP: 10.0.0.5</text>
          <text x="57" y="80" font-size="7" fill="#2563eb" font-weight="700" text-anchor="middle">Sends to Gateway</text>
        </g>

        <!-- Arrow LAN to Router -->
        <path d="M 130 84 H 155" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arrow)"/>

        <!-- Router Engine -->
        <g transform="translate(160, 36)">
          <rect x="0" y="0" width="195" height="100" rx="6" fill="#f8fafc" stroke="#0f172a" stroke-width="1.8"/>
          <text x="97" y="16" font-size="9" fill="#0f172a" font-weight="800" text-anchor="middle">ROUTER (Routing Engine)</text>

          <!-- Routing Table Inset -->
          <rect x="8" y="24" width="179" height="42" rx="2" fill="#ffffff" stroke="#cbd5e1"/>
          <line x1="75" y1="24" x2="75" y2="66" stroke="#cbd5e1"/>
          <line x1="125" y1="24" x2="125" y2="66" stroke="#cbd5e1"/>
          <text x="41" y="34" font-size="7" fill="#64748b" font-weight="700" text-anchor="middle">PREFIX</text>
          <text x="100" y="34" font-size="7" fill="#64748b" font-weight="700" text-anchor="middle">NEXT HOP</text>
          <text x="152" y="34" font-size="7" fill="#64748b" font-weight="700" text-anchor="middle">INTF</text>
          <line x1="8" y1="37" x2="187" y2="37" stroke="#cbd5e1"/>
          <text x="41" y="48" font-size="7" fill="#0f172a" text-anchor="middle">192.168.1.0/24</text>
          <text x="100" y="48" font-size="7" fill="#64748b" text-anchor="middle">Direct</text>
          <text x="152" y="48" font-size="7" fill="#2563eb" font-weight="700" text-anchor="middle">LAN</text>
          <!-- Matched Route -->
          <text x="41" y="60" font-size="7" fill="#16a34a" font-weight="800" text-anchor="middle">10.0.0.0/8</text>
          <text x="100" y="60" font-size="7" fill="#16a34a" text-anchor="middle">203.0.113.1</text>
          <text x="152" y="60" font-size="7" fill="#16a34a" font-weight="800" text-anchor="middle">WAN ✓</text>

          <text x="97" y="82" font-size="7.5" fill="#1e3a8a" text-anchor="middle">1. Decrements TTL by 1</text>
          <text x="97" y="93" font-size="7.5" fill="#15803d" font-weight="700" text-anchor="middle">2. Rebuilds MAC header for WAN link</text>
        </g>

        <!-- Arrow Router to WAN -->
        <path d="M 355 84 H 380" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrowGreen)"/>

        <!-- Destination Remote Subnet -->
        <g transform="translate(385, 38)">
          <rect x="0" y="0" width="120" height="96" rx="5" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
          <text x="60" y="16" font-size="8" fill="#15803d" font-weight="800" text-anchor="middle">REMOTE NETWORK</text>
          <text x="60" y="28" font-size="7" fill="#64748b" text-anchor="middle">10.0.0.0/8 Subnet</text>
          <rect x="10" y="34" width="100" height="34" rx="2" fill="#ffffff" stroke="#86efac"/>
          <text x="60" y="48" font-size="8" fill="#0f172a" font-weight="800" text-anchor="middle">Server: 10.0.0.5</text>
          <text x="60" y="60" font-size="7" fill="#15803d" font-weight="700" text-anchor="middle">Packet Arrives!</text>
          <text x="60" y="80" font-size="7" fill="#475569" text-anchor="middle">Routed across WAN</text>
        </g>

        <rect x="15" y="146" width="490" height="24" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="260" y="162" font-size="9" fill="#0f172a" text-anchor="middle">Routers make forwarding decisions based on destination IP addresses and routing tables, not MAC addresses.</text>
      </svg>`;

    case 'modem':
      return `
      <svg class="device-flow-svg" viewBox="0 0 520 180" role="img" aria-label="How a Modem Works: Digital Baseband to Analog RF Carrier Modulation">
        <rect x="0" y="0" width="520" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="20" y="22" font-size="11" fill="#0f172a" font-weight="800">HOW IT WORKS: Digital Ethernet Pulses (0/1) ⇄ Analog RF Carrier Over Coax/DSL</text>

        <!-- Step 1: Digital Side (PC / Router) -->
        <g transform="translate(15, 38)">
          <rect x="0" y="0" width="125" height="96" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="62" y="16" font-size="8" fill="#1e40af" font-weight="800" text-anchor="middle">ROUTER / LAN ETHERNET</text>
          <text x="62" y="28" font-size="7" fill="#64748b" text-anchor="middle">Digital Baseband (0V / 5V)</text>
          <!-- Square pulse wave -->
          <rect x="10" y="34" width="105" height="34" rx="2" fill="#ffffff" stroke="#93c5fd"/>
          <path d="M 15 54 V 40 H 35 V 54 H 55 V 40 H 75 V 54 H 95 V 40 H 110" stroke="#2563eb" stroke-width="2" fill="none"/>
          <text x="62" y="80" font-size="8" fill="#1e40af" font-family="monospace" font-weight="800" text-anchor="middle">1 0 1 0 1 0</text>
          <text x="62" y="92" font-size="7" fill="#475569" text-anchor="middle">Standard RJ45 Cat6</text>
        </g>

        <!-- Arrow to Modem -->
        <path d="M 140 84 H 165" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arrow)"/>

        <!-- Modem Core -->
        <g transform="translate(170, 36)">
          <rect x="0" y="0" width="175" height="100" rx="6" fill="#f8fafc" stroke="#1e293b" stroke-width="1.8"/>
          <text x="87" y="16" font-size="9" fill="#0f172a" font-weight="800" text-anchor="middle">MODEM CIRCUITS</text>

          <!-- Modulator Box -->
          <rect x="10" y="24" width="155" height="32" rx="3" fill="#fef3c7" stroke="#f59e0b"/>
          <text x="87" y="38" font-size="8" fill="#92400e" font-weight="800" text-anchor="middle">MODULATOR (Transmit)</text>
          <text x="87" y="49" font-size="7" fill="#78350f" text-anchor="middle">Encodes digital bits into RF wave</text>

          <!-- Demodulator Box -->
          <rect x="10" y="60" width="155" height="32" rx="3" fill="#e0e7ff" stroke="#6366f1"/>
          <text x="87" y="74" font-size="8" fill="#3730a3" font-weight="800" text-anchor="middle">DEMODULATOR (Receive)</text>
          <text x="87" y="85" font-size="7" fill="#312e81" text-anchor="middle">Decodes RF wave into digital bits</text>
        </g>

        <!-- Arrow to ISP Line -->
        <path d="M 345 84 H 370" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow)"/>

        <!-- Step 3: Provider Medium -->
        <g transform="translate(375, 38)">
          <rect x="0" y="0" width="130" height="96" rx="5" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="65" y="16" font-size="8" fill="#b45309" font-weight="800" text-anchor="middle">ISP ACCESS LINE</text>
          <text x="65" y="28" font-size="7" fill="#64748b" text-anchor="middle">Coax Cable / DSL / Fiber</text>
          <!-- Modulated Sine wave -->
          <rect x="10" y="34" width="110" height="34" rx="2" fill="#ffffff" stroke="#fde68a"/>
          <path d="M 15 51 Q 25 39 35 51 T 55 51 T 75 51 T 95 51 T 115 51" stroke="#d97706" stroke-width="2" fill="none"/>
          <text x="65" y="80" font-size="8" fill="#b45309" font-weight="800" text-anchor="middle">Analog Carrier Wave</text>
          <text x="65" y="92" font-size="7" fill="#475569" text-anchor="middle">Traverses miles to ISP CMTS</text>
        </g>

        <rect x="15" y="146" width="490" height="24" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="260" y="162" font-size="9" fill="#0f172a" text-anchor="middle">A modem changes signal format, not network topology: it translates between LAN Ethernet and provider media.</text>
      </svg>`;

    case 'ap':
      return `
      <svg class="device-flow-svg" viewBox="0 0 520 180" role="img" aria-label="How a Wireless Access Point Works: 802.11 Wi-Fi to 802.3 Ethernet Frame Bridging">
        <rect x="0" y="0" width="520" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="20" y="22" font-size="11" fill="#0f172a" font-weight="800">HOW IT WORKS: 802.11 Wireless RF Frames ⇄ Frame Bridge ⇄ 802.3 Wired Ethernet</text>

        <!-- Wireless Client (Laptop) -->
        <g transform="translate(15, 38)">
          <rect x="0" y="0" width="115" height="96" rx="5" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
          <text x="57" y="16" font-size="8" fill="#0369a1" font-weight="800" text-anchor="middle">WI-FI CLIENT (Laptop)</text>
          <text x="57" y="28" font-size="7" fill="#64748b" text-anchor="middle">Associated to SSID</text>
          <rect x="8" y="34" width="99" height="34" rx="2" fill="#ffffff" stroke="#bae6fd"/>
          <text x="57" y="47" font-size="7.5" fill="#0284c7" font-weight="700" text-anchor="middle">IEEE 802.11 Frame</text>
          <text x="57" y="59" font-size="7" fill="#64748b" text-anchor="middle">Radio RF Carrier</text>
          <text x="57" y="80" font-size="7" fill="#0369a1" font-weight="800" text-anchor="middle">Radio Air Waves (~5 GHz)</text>
        </g>

        <!-- Radio waves moving to AP -->
        <g transform="translate(132, 70)">
          <path d="M 0 14 A 14 14 0 0 1 0 0" stroke="#0284c7" stroke-width="2" fill="none"/>
          <path d="M 8 18 A 20 20 0 0 1 8 -4" stroke="#0284c7" stroke-width="2" fill="none"/>
          <path d="M 16 22 A 26 26 0 0 1 16 -8" stroke="#0284c7" stroke-width="2.5" fill="none"/>
        </g>

        <!-- Access Point Bridge -->
        <g transform="translate(165, 36)">
          <rect x="0" y="0" width="180" height="100" rx="6" fill="#f8fafc" stroke="#0284c7" stroke-width="1.8"/>
          <text x="90" y="16" font-size="9" fill="#0f172a" font-weight="800" text-anchor="middle">ACCESS POINT (Bridge)</text>

          <!-- Header translation diagram -->
          <rect x="10" y="24" width="160" height="24" rx="2" fill="#e0f2fe" stroke="#38bdf8"/>
          <text x="90" y="38" font-size="7" fill="#0369a1" font-weight="800" text-anchor="middle">802.11 Wi-Fi Frame Header (Stripped)</text>

          <path d="M 90 48 V 56" stroke="#0284c7" stroke-width="2" marker-end="url(#arrow)"/>

          <rect x="10" y="58" width="160" height="24" rx="2" fill="#dcfce7" stroke="#22c55e"/>
          <text x="90" y="73" font-size="7" fill="#15803d" font-weight="800" text-anchor="middle">802.3 Ethernet Header (Attached)</text>

          <text x="90" y="94" font-size="7" fill="#475569" text-anchor="middle">IP Payload remains identical!</text>
        </g>

        <!-- Arrow AP to Switch -->
        <path d="M 350 84 H 375" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrowGreen)"/>

        <!-- Wired LAN Switch -->
        <g transform="translate(380, 38)">
          <rect x="0" y="0" width="125" height="96" rx="5" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
          <text x="62" y="16" font-size="8" fill="#15803d" font-weight="800" text-anchor="middle">WIRED LAN SWITCH</text>
          <text x="62" y="28" font-size="7" fill="#64748b" text-anchor="middle">Cat6 PoE Uplink</text>
          <rect x="10" y="34" width="105" height="34" rx="2" fill="#ffffff" stroke="#86efac"/>
          <text x="62" y="47" font-size="7.5" fill="#15803d" font-weight="800" text-anchor="middle">IEEE 802.3 Frame</text>
          <text x="62" y="59" font-size="7" fill="#475569" text-anchor="middle">Standard copper wire</text>
          <text x="62" y="80" font-size="7" fill="#15803d" font-weight="700" text-anchor="middle">Switched to Local LAN</text>
        </g>

        <rect x="15" y="146" width="490" height="24" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="260" y="162" font-size="9" fill="#0f172a" text-anchor="middle">An AP bridges Wi-Fi frames onto wired Ethernet while keeping the destination IP packet intact.</text>
      </svg>`;

    case 'repeater':
      return `
      <svg class="device-flow-svg" viewBox="0 0 520 180" role="img" aria-label="How a Network Repeater Works: Attenuated Signal Reconstruction Without Noise Amplification">
        <rect x="0" y="0" width="520" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="20" y="22" font-size="11" fill="#0f172a" font-weight="800">HOW IT WORKS: Attenuated/Degraded Signal → Regenerated Full-Voltage Waveform</text>

        <!-- Step 1: Weak Input Signal -->
        <g transform="translate(15, 38)">
          <rect x="0" y="0" width="125" height="96" rx="5" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.5"/>
          <text x="62" y="16" font-size="8" fill="#be123c" font-weight="800" text-anchor="middle">1. ATTENUATED INPUT</text>
          <text x="62" y="28" font-size="7" fill="#64748b" text-anchor="middle">Signal loss over distance</text>
          <rect x="10" y="34" width="105" height="34" rx="2" fill="#ffffff" stroke="#fecdd3"/>
          <!-- Attenuated rounded noisy wave -->
          <path d="M 15 54 Q 25 46 35 52 T 55 52 T 75 52 T 95 52 T 110 52" stroke="#e11d48" stroke-width="1.8" fill="none"/>
          <text x="62" y="80" font-size="8" fill="#be123c" font-weight="800" text-anchor="middle">Low Amplitude + Noise</text>
          <text x="62" y="92" font-size="7" fill="#475569" text-anchor="middle">Cable limit exceeded</text>
        </g>

        <!-- Arrow to Repeater -->
        <path d="M 140 84 H 165" stroke="#f43f5e" stroke-width="2.5" marker-end="url(#arrow)"/>

        <!-- Repeater Regeneration Circuit -->
        <g transform="translate(170, 36)">
          <rect x="0" y="0" width="175" height="100" rx="6" fill="#f8fafc" stroke="#1e293b" stroke-width="1.8"/>
          <text x="87" y="16" font-size="9" fill="#0f172a" font-weight="800" text-anchor="middle">REPEATER (Signal Rebuilder)</text>

          <rect x="10" y="24" width="155" height="26" rx="3" fill="#fef3c7" stroke="#f59e0b"/>
          <text x="87" y="36" font-size="7.5" fill="#92400e" font-weight="800" text-anchor="middle">Threshold Detector (0 vs 1)</text>
          <text x="87" y="46" font-size="6.5" fill="#78350f" text-anchor="middle">Reads logic level above noise</text>

          <rect x="10" y="54" width="155" height="26" rx="3" fill="#dcfce7" stroke="#22c55e"/>
          <text x="87" y="66" font-size="7.5" fill="#15803d" font-weight="800" text-anchor="middle">Clock Retimer & Rebuilder</text>
          <text x="87" y="76" font-size="6.5" fill="#166534" text-anchor="middle">Generates pristine fresh pulse</text>

          <text x="87" y="94" font-size="7" fill="#0284c7" font-weight="700" text-anchor="middle">Zero Noise Amplified!</text>
        </g>

        <!-- Arrow from Repeater -->
        <path d="M 345 84 H 370" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrowGreen)"/>

        <!-- Step 3: Full-Strength Output -->
        <g transform="translate(375, 38)">
          <rect x="0" y="0" width="130" height="96" rx="5" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
          <text x="65" y="16" font-size="8" fill="#15803d" font-weight="800" text-anchor="middle">2. REGENERATED SIGNAL</text>
          <text x="65" y="28" font-size="7" fill="#64748b" text-anchor="middle">Full transmission reach</text>
          <rect x="10" y="34" width="110" height="34" rx="2" fill="#ffffff" stroke="#86efac"/>
          <!-- Clean sharp square wave -->
          <path d="M 15 56 V 38 H 35 V 56 H 55 V 38 H 75 V 56 H 95 V 38 H 115" stroke="#16a34a" stroke-width="2.2" fill="none"/>
          <text x="65" y="80" font-size="8" fill="#15803d" font-weight="800" text-anchor="middle">100% Crisp Pulse</text>
          <text x="65" y="92" font-size="7" fill="#475569" text-anchor="middle">Travels another 100 meters</text>
        </g>

        <rect x="15" y="146" width="490" height="24" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="260" y="162" font-size="9" fill="#0f172a" text-anchor="middle">Analog amplifiers boost signal and noise; digital repeaters reconstruct only the clean binary bits.</text>
      </svg>`;

    case 'bridge':
      return `
      <svg class="device-flow-svg" viewBox="0 0 520 180" role="img" aria-label="How a Network Bridge Works: MAC Filtering Table Isolating Local Traffic">
        <rect x="0" y="0" width="520" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="20" y="22" font-size="11" fill="#0f172a" font-weight="800">HOW IT WORKS: Bridge Filters Local Traffic & Forwards Only Cross-Segment Frames</text>

        <!-- Segment A Hosts -->
        <g transform="translate(15, 38)">
          <rect x="0" y="0" width="130" height="96" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="65" y="16" font-size="8.5" fill="#1e40af" font-weight="800" text-anchor="middle">SEGMENT A (LAN 1)</text>

          <rect x="10" y="24" width="110" height="30" rx="2" fill="#ffffff" stroke="#bfdbfe"/>
          <text x="65" y="36" font-size="7.5" fill="#0f172a" font-weight="700" text-anchor="middle">PC 1 (MAC: 00:11)</text>
          <text x="65" y="47" font-size="7" fill="#2563eb" text-anchor="middle">Sends to PC 2 (MAC: 00:22)</text>

          <rect x="10" y="58" width="110" height="30" rx="2" fill="#ffffff" stroke="#bfdbfe"/>
          <text x="65" y="72" font-size="7.5" fill="#0f172a" font-weight="700" text-anchor="middle">PC 2 (MAC: 00:22)</text>
          <text x="65" y="82" font-size="7" fill="#16a34a" font-weight="700" text-anchor="middle">Receives locally on Seg A</text>
        </g>

        <!-- Middle: Bridge Filtering Decision -->
        <g transform="translate(160, 36)">
          <rect x="0" y="0" width="195" height="100" rx="6" fill="#f8fafc" stroke="#1e293b" stroke-width="1.8"/>
          <text x="97" y="16" font-size="9" fill="#0f172a" font-weight="800" text-anchor="middle">BRIDGE FILTERING ENGINE</text>

          <!-- Scenario 1: Local Traffic Filtered -->
          <rect x="10" y="24" width="175" height="32" rx="3" fill="#fee2e2" stroke="#f87171"/>
          <text x="97" y="37" font-size="7.5" fill="#991b1b" font-weight="800" text-anchor="middle">TEST 1: PC 1 → PC 2 (Both Seg A)</text>
          <text x="97" y="48" font-size="7.5" fill="#dc2626" font-weight="800" text-anchor="middle">🚫 FILTERED (Blocked from Segment B)</text>

          <!-- Scenario 2: Cross Segment Traffic Forwarded -->
          <rect x="10" y="60" width="175" height="32" rx="3" fill="#dcfce7" stroke="#4ade80"/>
          <text x="97" y="73" font-size="7.5" fill="#166534" font-weight="800" text-anchor="middle">TEST 2: PC 1 → PC 3 (PC 3 on Seg B)</text>
          <text x="97" y="84" font-size="7.5" fill="#15803d" font-weight="800" text-anchor="middle">✓ FORWARDED across to Segment B</text>
        </g>

        <!-- Segment B Hosts -->
        <g transform="translate(370, 38)">
          <rect x="0" y="0" width="135" height="96" rx="5" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
          <text x="67" y="16" font-size="8.5" fill="#334155" font-weight="800" text-anchor="middle">SEGMENT B (LAN 2)</text>

          <rect x="10" y="24" width="115" height="30" rx="2" fill="#ffffff" stroke="#cbd5e1"/>
          <text x="67" y="37" font-size="7.5" fill="#64748b" text-anchor="middle">During Test 1:</text>
          <text x="67" y="48" font-size="7.5" fill="#16a34a" font-weight="700" text-anchor="middle">100% Quiet! No Traffic</text>

          <rect x="10" y="58" width="115" height="30" rx="2" fill="#ffffff" stroke="#86efac"/>
          <text x="67" y="72" font-size="7.5" fill="#0f172a" font-weight="700" text-anchor="middle">PC 3 (MAC: 00:33)</text>
          <text x="67" y="82" font-size="7" fill="#15803d" font-weight="700" text-anchor="middle">Receives during Test 2 ✓</text>
        </g>

        <rect x="15" y="146" width="490" height="24" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="260" y="162" font-size="9" fill="#0f172a" text-anchor="middle">A bridge isolates collisions by filtering local frames, while a switch is essentially a multiport bridge.</text>
      </svg>`;

    case 'firewall':
      return `
      <svg class="device-flow-svg" viewBox="0 0 520 180" role="img" aria-label="How a Network Firewall Works: Stateful Packet Filtering and Rule Enforcement">
        <rect x="0" y="0" width="520" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="20" y="22" font-size="11" fill="#0f172a" font-weight="800">HOW IT WORKS: Stateful Packet Inspection Enforces Security Rules at Perimeter</text>

        <!-- Untrusted Incoming Packets (WAN) -->
        <g transform="translate(15, 38)">
          <rect x="0" y="0" width="125" height="96" rx="5" fill="#fff1f2" stroke="#ef4444" stroke-width="1.5"/>
          <text x="62" y="16" font-size="8" fill="#b91c1c" font-weight="800" text-anchor="middle">UNTRUSTED TRAFFIC (WAN)</text>

          <!-- Packet 1: Legitimate HTTPS -->
          <rect x="8" y="24" width="109" height="30" rx="2" fill="#ffffff" stroke="#86efac"/>
          <text x="14" y="37" font-size="7.5" fill="#15803d" font-weight="800">Packet A: Web/TLS</text>
          <text x="14" y="48" font-size="7" fill="#475569">Dst Port 443 (HTTPS)</text>

          <!-- Packet 2: Telnet / Exploit -->
          <rect x="8" y="58" width="109" height="30" rx="2" fill="#ffffff" stroke="#fca5a5"/>
          <text x="14" y="71" font-size="7.5" fill="#dc2626" font-weight="800">Packet B: Attack/Probe</text>
          <text x="14" y="82" font-size="7" fill="#475569">Dst Port 23 (Telnet)</text>
        </g>

        <!-- Arrow to Firewall -->
        <path d="M 140 84 H 165" stroke="#ef4444" stroke-width="2.5" marker-end="url(#arrow)"/>

        <!-- Firewall Inspection Engine -->
        <g transform="translate(170, 36)">
          <rect x="0" y="0" width="180" height="100" rx="6" fill="#f8fafc" stroke="#4338ca" stroke-width="1.8"/>
          <text x="90" y="16" font-size="9" fill="#1e1b4b" font-weight="800" text-anchor="middle">FIREWALL POLICY ENGINE</text>

          <!-- Rule 1: Allow 443 -->
          <rect x="8" y="24" width="164" height="28" rx="2" fill="#dcfce7" stroke="#22c55e"/>
          <text x="14" y="36" font-size="7" fill="#166534" font-weight="800">RULE 101: Port 443 (HTTPS)</text>
          <text x="14" y="46" font-size="7" fill="#15803d" font-weight="800">ACTION: ALLOW (State: ESTABLISHED)</text>

          <!-- Rule 2: Deny 23 -->
          <rect x="8" y="56" width="164" height="28" rx="2" fill="#fee2e2" stroke="#ef4444"/>
          <text x="14" y="68" font-size="7" fill="#991b1b" font-weight="800">RULE 205: Port 23 (Inbound)</text>
          <text x="14" y="78" font-size="7" fill="#dc2626" font-weight="800">ACTION: DENY & DROP (Blocked!)</text>

          <text x="90" y="94" font-size="7" fill="#475569" text-anchor="middle">Tracks TCP 3-Way Handshake State</text>
        </g>

        <!-- Arrow to Protected LAN -->
        <path d="M 350 56 H 375" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrowGreen)"/>

        <!-- Protected Internal Network (LAN) -->
        <g transform="translate(380, 38)">
          <rect x="0" y="0" width="125" height="96" rx="5" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
          <text x="62" y="16" font-size="8" fill="#15803d" font-weight="800" text-anchor="middle">PROTECTED LAN</text>

          <!-- Packet A Delivered -->
          <rect x="8" y="24" width="109" height="30" rx="2" fill="#ffffff" stroke="#86efac"/>
          <text x="14" y="37" font-size="7.5" fill="#15803d" font-weight="800">Packet A Delivered ✓</text>
          <text x="14" y="48" font-size="7" fill="#475569">Web session succeeds</text>

          <!-- Threat Blocked -->
          <rect x="8" y="58" width="109" height="30" rx="2" fill="#fef2f2" stroke="#fecaca"/>
          <text x="14" y="71" font-size="7.5" fill="#dc2626" font-weight="800">Packet B Dropped ✗</text>
          <text x="14" y="82" font-size="7" fill="#991b1b">LAN remains secure</text>
        </g>

        <rect x="15" y="146" width="490" height="24" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="260" y="162" font-size="9" fill="#0f172a" text-anchor="middle">Firewalls enforce access control at network perimeters and track session states to defend trusted hosts.</text>
      </svg>`;

    case 'server':
      return `
      <svg class="device-flow-svg" viewBox="0 0 520 180" role="img" aria-label="How a Server Works: Handling Concurrent Client Network Requests">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb"/>
          </marker>
          <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#16a34a"/>
          </marker>
        </defs>

        <rect x="0" y="0" width="520" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>

        <!-- Flow Title -->
        <text x="20" y="22" font-size="11" fill="#0f172a" font-weight="800">HOW IT WORKS: Client Request → Socket Listener → Application Daemon → Return Response</text>

        <!-- Step 1: Client Host -->
        <g transform="translate(15, 38)">
          <rect x="0" y="0" width="110" height="96" rx="5" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="55" y="16" font-size="8.5" fill="#1d4ed8" font-weight="800" text-anchor="middle">1. CLIENT HOST</text>
          <rect x="8" y="26" width="94" height="28" rx="2" fill="#ffffff" stroke="#93c5fd"/>
          <text x="55" y="38" font-size="7.5" fill="#1e40af" text-anchor="middle">Browser / OS</text>
          <text x="55" y="48" font-size="7" fill="#2563eb" font-weight="700" text-anchor="middle">Port 53000</text>
          <text x="55" y="70" font-size="7" fill="#475569" text-anchor="middle">GET /index.html</text>
          <text x="55" y="82" font-size="7" fill="#2563eb" font-weight="700" text-anchor="middle">TCP SYN → Connect</text>
        </g>

        <!-- Arrow 1 to 2 -->
        <path d="M 125 86 H 148" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow)"/>

        <!-- Step 2: Server Socket Listener -->
        <g transform="translate(152, 38)">
          <rect x="0" y="0" width="170" height="96" rx="5" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
          <text x="85" y="16" font-size="8.5" fill="#15803d" font-weight="800" text-anchor="middle">2. NETWORK PROTOCOL STACK</text>
          <rect x="8" y="24" width="154" height="30" rx="2" fill="#ffffff" stroke="#86efac"/>
          <text x="14" y="36" font-size="7" fill="#166534" font-weight="700">Listening Ports: 80 (HTTP), 443 (HTTPS)</text>
          <text x="14" y="48" font-size="7" fill="#15803d" font-weight="800">Binds to IP: 192.168.1.100</text>

          <rect x="8" y="58" width="154" height="28" rx="2" fill="#dcfce7" stroke="#22c55e"/>
          <text x="14" y="70" font-size="7" fill="#15803d" font-weight="800">OS TCP Session Manager</text>
          <text x="14" y="80" font-size="7" fill="#14532d">Passes byte stream to HTTP Daemon</text>
        </g>

        <!-- Arrow 2 to 3 -->
        <path d="M 322 86 H 345" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrowGreen)"/>

        <!-- Step 3: Application Server & Database Backend -->
        <g transform="translate(350, 38)">
          <rect x="0" y="0" width="155" height="96" rx="5" fill="#faf5ff" stroke="#a855f7" stroke-width="1.5"/>
          <text x="77" y="16" font-size="8.5" fill="#6b21a8" font-weight="800" text-anchor="middle">3. APPLICATION SERVICE</text>
          <rect x="8" y="24" width="139" height="30" rx="2" fill="#ffffff" stroke="#d8b4fe"/>
          <text x="14" y="36" font-size="7" fill="#6b21a8" font-weight="700">Web Engine (Nginx / Apache)</text>
          <text x="14" y="48" font-size="7" fill="#9333ea" font-weight="800">Queries database / file storage</text>

          <rect x="8" y="58" width="139" height="28" rx="2" fill="#f3e8ff" stroke="#c084fc"/>
          <text x="14" y="70" font-size="7" fill="#6b21a8" font-weight="800">Response: HTTP 200 OK</text>
          <text x="14" y="80" font-size="7" fill="#475569">Transmits requested payload</text>
        </g>

        <rect x="15" y="146" width="490" height="24" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="260" y="162" font-size="9" fill="#0f172a" text-anchor="middle">Servers listen on known service ports (e.g. 80, 443, 53) to concurrently serve hundreds of client requests.</text>
      </svg>`;

    default:
      return '';
  }
}

/**
 * Renders the real studio photograph card body with device name only.
 */
export function renderDevicePhotoBox(deviceKey) {
  const meta = deviceMetadata[deviceKey];
  if (!meta) return '';

  return `
    <div class="device-photo-view">
      <div class="device-photo-box">
        <img src="${meta.image}" alt="${esc(meta.photoCaption || meta.name)}" class="device-real-photo" loading="lazy" />
      </div>
      <div class="device-photo-meta">
        <h4 class="physical-photo-title">${esc(meta.photoCaption || meta.name)}</h4>
      </div>
    </div>
  `;
}

/**
 * Renders real hardware photography for concept device slides.
 */
export function renderDeviceSlideVisual(deviceKey) {
  const photoView = renderDevicePhotoBox(deviceKey);
  if (!photoView) return '';

  return `<div class="device-visual-card">${photoView}</div>`;
}

export function routerGatewayPortsVisual() {
  return `
    <div class="device-visual-card router-rear-card">
      <div class="router-rear-box">
        <img src="images/router/router_rear.jpg" alt="Home Gateway Router Rear Ports" class="router-rear-photo" loading="lazy" />
      </div>
      <div class="router-rear-meta">
        <h4 class="physical-photo-title">Home Gateway Router (Rear Ports)</h4>
      </div>
    </div>
  `;
}
