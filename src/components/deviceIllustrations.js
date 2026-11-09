import { esc } from './ui.js';

export const deviceMetadata = {
  nic: {
    name: 'Network Interface Card (NIC)',
    shortName: 'NIC',
    layer: 'Layer 1 & Layer 2',
    role: 'Host Physical Interface & Hardware MAC Identifier',
    desc: 'Provides the physical port and controller for sending and receiving frames on a network medium.',
    image: 'images/devices/nic.jpg',
    photoCaption: 'PCIe Desktop Gigabit Network Interface Card',
    specs: 'Host Bus: PCIe x1 • Media Port: RJ45 1000BASE-T • Addressing: Factory 48-bit MAC'
  },
  hub: {
    name: 'Network Hub',
    shortName: 'Hub',
    layer: 'Layer 1 (Physical)',
    role: 'Multiport Repeater & Shared Collision Domain',
    desc: 'Repeats all incoming electrical signals to every other port without inspecting addresses.',
    image: 'images/devices/hub.jpg',
    photoCaption: '8-Port Fast Ethernet Multiport Repeater Hub',
    specs: 'Ports: 8× RJ45 10/100 Mbps • Domain: 1 Shared Collision Domain • Layer: Pure Layer 1'
  },
  switch: {
    name: 'Network Switch',
    shortName: 'Switch',
    layer: 'Layer 2 (Data Link)',
    role: 'Intelligent Multiport Bridge & MAC Learning Engine',
    desc: 'Inspects source MAC addresses to learn ports and forwards frames directly to destination ports.',
    image: 'images/devices/switch.jpg',
    photoCaption: '24-Port 1U Rackmount Gigabit Managed Switch',
    specs: 'Ports: 24× Gigabit RJ45 + 2× SFP Uplinks • Forwarding: MAC Table (CAM) • Layer 2'
  },
  router: {
    name: 'Network Router',
    shortName: 'Router',
    layer: 'Layer 3 (Network)',
    role: 'Inter-Network Gateway & IP Path Forwarding',
    desc: 'Connects different broadcast domains and uses routing tables to forward packets across networks.',
    image: 'images/devices/router.jpg',
    photoCaption: 'Enterprise Branch Office Internetworking Router',
    specs: 'Interfaces: Dual Gigabit WAN + Switched LAN + RJ45 Console • Routing: IP Table • Layer 3'
  },
  modem: {
    name: 'Modem (Modulator-Demodulator)',
    shortName: 'Modem',
    layer: 'Layer 1 (Physical)',
    role: 'Digital ↔ Analog Signal Converter for Provider Media',
    desc: 'Converts digital computer data into analog carrier waves for transmission over cable, DSL, or fiber.',
    image: 'images/devices/modem.jpg',
    photoCaption: 'DOCSIS 3.1 Broadband Cable Modem',
    specs: 'Inputs: Coaxial 75Ω F-Connector • Output: Gigabit LAN • Modulation: QAM/OFDM'
  },
  ap: {
    name: 'Wireless Access Point (AP)',
    shortName: 'Access Point',
    layer: 'Layer 2 (Data Link)',
    role: 'Wi-Fi Transceiver & 802.11 ↔ 802.3 Bridge',
    desc: 'Connects Wi-Fi client stations to a wired local area network by bridging wireless and wired frames.',
    image: 'images/devices/ap.jpg',
    photoCaption: 'Enterprise Ceiling-Mount Wi-Fi Access Point',
    specs: 'Radios: Dual-Band 2.4/5 GHz 802.11ac/ax • Uplink: 802.3af PoE RJ45 • Bridging: 802.11 ↔ 802.3'
  },
  repeater: {
    name: 'Network Repeater',
    shortName: 'Repeater',
    layer: 'Layer 1 (Physical)',
    role: 'Signal Regenerator & Distance Extender',
    desc: 'Cleans, retimes, and amplifies attenuated signals to extend transmission distance across media.',
    image: 'images/devices/repeater.jpg',
    photoCaption: 'Dual-Band AC Wall-Plug Wi-Fi Range Extender',
    specs: 'Form Factor: Direct AC Plug • Antennas: Dual Folding • Extension: Signal Regeneration'
  },
  bridge: {
    name: 'Network Bridge',
    shortName: 'Bridge',
    layer: 'Layer 2 (Data Link)',
    role: 'Segment Isolator & Filtering Engine',
    desc: 'Connects two physical LAN segments, filtering local traffic and forwarding inter-segment frames.',
    image: 'images/devices/bridge.jpg',
    photoCaption: 'Point-to-Point Wireless / Multiport Ethernet Bridge',
    specs: 'Function: Joins Link Segments • Filtering: Inter-segment MAC Forwarding • Layer 2'
  },
  firewall: {
    name: 'Network Firewall',
    shortName: 'Firewall',
    layer: 'Layer 3, 4 & 7 (Security)',
    role: 'Traffic Policy Enforcement & Perimeter Defense',
    desc: 'Monitors and filters network traffic based on configured security rules and connection states.',
    image: 'images/devices/firewall.jpg',
    photoCaption: 'Next-Gen Hardware Security Firewall Appliance',
    specs: 'Dedicated Interfaces: MGMT, WAN1/2, DMZ, Internal LAN • Inspection: Stateful Packet Filter'
  }
};

/**
 * Renders the crisp physical hardware SVG for a given device.
 * viewBox="0 0 520 160"
 */
export function renderPhysicalDeviceSvg(deviceKey) {
  switch (deviceKey) {
    case 'nic':
      return `
      <svg class="device-hardware-svg" viewBox="0 0 520 160" role="img" aria-label="Physical PCIe Network Interface Card with RJ45 Port">
        <defs>
          <linearGradient id="pcbGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#15803d"/>
            <stop offset="100%" stop-color="#14532d"/>
          </linearGradient>
          <linearGradient id="bracketGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#94a3b8"/>
            <stop offset="50%" stop-color="#cbd5e1"/>
            <stop offset="100%" stop-color="#64748b"/>
          </linearGradient>
          <linearGradient id="goldPin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#facc15"/>
            <stop offset="100%" stop-color="#ca8a04"/>
          </linearGradient>
        </defs>

        <!-- Background grid hint -->
        <rect x="0" y="0" width="520" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>

        <!-- Metal Mounting Bracket (Left) -->
        <rect x="30" y="10" width="22" height="140" rx="2" fill="url(#bracketGrad)" stroke="#475569" stroke-width="1.2"/>
        <path d="M30 18 Q22 18 22 28 Q22 38 30 38" fill="none" stroke="#475569" stroke-width="1.2"/>
        <!-- Bracket mounting screw slot -->
        <circle cx="41" cy="24" r="3.5" fill="#334155"/>

        <!-- Main PCB Board -->
        <rect x="52" y="24" width="348" height="100" rx="4" fill="url(#pcbGrad)" stroke="#052e16" stroke-width="1.5"/>

        <!-- PCIe Golden Connector Fingers (Bottom edge) -->
        <rect x="90" y="124" width="130" height="18" rx="1" fill="url(#goldPin)" stroke="#854d0e" stroke-width="0.8"/>
        <!-- Notch in PCIe connector -->
        <rect x="135" y="124" width="8" height="18" fill="#f8fafc"/>
        ${Array.from({ length: 18 }, (_, i) => `<line x1="${93 + i * 7}" y1="125" x2="${93 + i * 7}" y2="140" stroke="#713f12" stroke-width="1.2"/>`).join('')}

        <!-- RJ45 Jack Housing on Bracket -->
        <rect x="36" y="52" width="46" height="42" rx="3" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
        <rect x="42" y="58" width="28" height="30" rx="2" fill="#0f172a"/>
        <!-- Copper pins inside RJ45 jack -->
        ${Array.from({ length: 8 }, (_, i) => `<line x1="${45 + i * 3}" y1="60" x2="${45 + i * 3}" y2="70" stroke="#eab308" stroke-width="1"/>`).join('')}

        <!-- Status LEDs on bracket -->
        <circle cx="75" cy="58" r="3" fill="#22c55e"><animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite"/></circle>
        <circle cx="75" cy="88" r="3" fill="#eab308"><animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite"/></circle>
        <text x="73" y="52" font-size="8" fill="#64748b" font-weight="600" text-anchor="middle">LNK</text>
        <text x="73" y="98" font-size="8" fill="#64748b" font-weight="600" text-anchor="middle">ACT</text>

        <!-- Gigabit Ethernet Controller Chip (ASIC) -->
        <rect x="185" y="44" width="60" height="58" rx="3" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        <text x="215" y="70" font-size="9" fill="#94a3b8" font-weight="700" text-anchor="middle" font-family="monospace">GbE MAC</text>
        <text x="215" y="82" font-size="8" fill="#64748b" text-anchor="middle" font-family="monospace">CONTROLLER</text>
        <!-- Chip pins -->
        ${Array.from({ length: 8 }, (_, i) => `<line x1="${191 + i * 6}" y1="40" x2="${191 + i * 6}" y2="44" stroke="#94a3b8" stroke-width="1"/>`).join('')}
        ${Array.from({ length: 8 }, (_, i) => `<line x1="${191 + i * 6}" y1="102" x2="${191 + i * 6}" y2="106" stroke="#94a3b8" stroke-width="1"/>`).join('')}

        <!-- Pulse Transformer / Magnetic Module -->
        <rect x="110" y="50" width="48" height="44" rx="2" fill="#1e293b" stroke="#334155"/>
        <text x="134" y="75" font-size="8" fill="#64748b" text-anchor="middle" font-family="monospace">MAGNETICS</text>

        <!-- MAC Address EEPROM Sticker -->
        <rect x="278" y="46" width="112" height="34" rx="2" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
        <text x="284" y="58" font-size="7.5" fill="#64748b" font-weight="700">MAC ADDRESS:</text>
        <text x="284" y="72" font-size="9" fill="#0f172a" font-weight="800" font-family="monospace">00:1A:2B:3C:4D:5E</text>

        <!-- Clock Crystal Oscillator -->
        <rect x="256" y="86" width="20" height="14" rx="2" fill="#e2e8f0" stroke="#94a3b8"/>
        <text x="266" y="96" font-size="7" fill="#475569" text-anchor="middle" font-weight="600">25M</text>

        <!-- PCB Printed Circuit Traces -->
        <path d="M158 72 H 185 M245 72 H 278" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="3,2"/>
        <path d="M215 102 V 124" stroke="#16a34a" stroke-width="1.5"/>

        <!-- Hardware labels -->
        <text x="412" y="42" font-size="10" fill="#0f172a" font-weight="700">PCIe Host NIC</text>
        <text x="412" y="58" font-size="8.5" fill="#64748b">1000BASE-T RJ45</text>
        <text x="412" y="72" font-size="8.5" fill="#16a34a" font-weight="600">Hardware L1/L2</text>
        <text x="412" y="88" font-size="8.5" fill="#64748b">Burned-in MAC</text>
        <text x="412" y="104" font-size="8.5" fill="#64748b">Bus: PCIe x1</text>
      </svg>`;

    case 'hub':
      return `
      <svg class="device-hardware-svg" viewBox="0 0 520 160" role="img" aria-label="Physical 8-Port Network Hub Hardware Chassis">
        <rect x="0" y="0" width="520" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>

        <!-- Main Hub Metal Chassis -->
        <rect x="20" y="30" width="480" height="96" rx="6" fill="#334155" stroke="#1e293b" stroke-width="2"/>
        <!-- Top bevel shadow -->
        <line x1="20" y1="36" x2="500" y2="36" stroke="#475569" stroke-width="1.5"/>

        <!-- Model branding -->
        <text x="36" y="54" font-size="11" fill="#f8fafc" font-weight="800" letter-spacing="1">FASTNET 800H</text>
        <text x="145" y="54" font-size="8.5" fill="#94a3b8">8-Port Repeater Hub</text>

        <!-- Power & Collision LEDs on Left -->
        <g transform="translate(36, 70)">
          <!-- PWR LED -->
          <circle cx="6" cy="6" r="4" fill="#22c55e"/>
          <text x="16" y="9" font-size="8" fill="#cbd5e1" font-weight="700">PWR</text>
          <!-- COL (Collision) LED -->
          <circle cx="6" cy="24" r="4" fill="#ef4444"><animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/></circle>
          <text x="16" y="27" font-size="8" fill="#fca5a5" font-weight="700">COL (Collision)</text>
        </g>

        <!-- 8 RJ45 Ports in a row -->
        <g transform="translate(130, 60)">
          ${Array.from({ length: 8 }, (_, i) => `
            <g transform="translate(${i * 44}, 0)">
              <!-- Port Jack Receptacle -->
              <rect x="0" y="10" width="34" height="38" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="1"/>
              <!-- RJ45 Opening -->
              <rect x="5" y="16" width="24" height="24" rx="2" fill="#1e293b"/>
              <rect x="9" y="32" width="16" height="8" rx="1" fill="#0f172a"/>
              <!-- Green Link/Act LED above port -->
              <circle cx="17" cy="4" r="3" fill="#22c55e"/>
              <!-- Port number label -->
              <text x="17" y="58" font-size="9" fill="#94a3b8" font-weight="700" text-anchor="middle">${i + 1}</text>
            </g>
          `).join('')}
        </g>

        <!-- Shared Bus Internal Connection Line -->
        <path d="M 130 118 H 470" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,3"/>
        <text x="300" y="138" font-size="10" fill="#d97706" font-weight="700" text-anchor="middle">▲ Shared Internal Electrical Bus (One Single Collision Domain) ▲</text>
      </svg>`;

    case 'switch':
      return `
      <svg class="device-hardware-svg" viewBox="0 0 520 160" role="img" aria-label="Physical 16-Port 1U Rackmount Managed Network Switch">
        <rect x="0" y="0" width="520" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>

        <!-- Rackmount Ears -->
        <rect x="10" y="35" width="18" height="90" rx="2" fill="#94a3b8" stroke="#475569"/>
        <circle cx="19" cy="48" r="3.5" fill="#334155"/>
        <circle cx="19" cy="112" r="3.5" fill="#334155"/>
        <rect x="492" y="35" width="18" height="90" rx="2" fill="#94a3b8" stroke="#475569"/>
        <circle cx="501" cy="48" r="3.5" fill="#334155"/>
        <circle cx="501" cy="112" r="3.5" fill="#334155"/>

        <!-- 1U Chassis Body -->
        <rect x="28" y="40" width="464" height="80" rx="3" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <line x1="28" y1="46" x2="492" y2="46" stroke="#334155" stroke-width="1"/>

        <!-- Left Brand & Status Panel -->
        <text x="38" y="60" font-size="11" fill="#f8fafc" font-weight="800">CATALYST 2960</text>
        <text x="38" y="72" font-size="8" fill="#94a3b8">Layer 2 Gigabit Switch</text>
        <g transform="translate(38, 80)">
          <circle cx="4" cy="4" r="2.5" fill="#22c55e"/>
          <text x="12" y="7" font-size="7" fill="#cbd5e1">SYS</text>
          <circle cx="4" cy="16" r="2.5" fill="#22c55e"/>
          <text x="12" y="19" font-size="7" fill="#cbd5e1">RPS</text>
        </g>

        <!-- Console Port (Light Blue RJ45) -->
        <g transform="translate(130, 62)">
          <rect x="0" y="0" width="22" height="24" rx="2" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
          <text x="11" y="34" font-size="7" fill="#38bdf8" font-weight="700" text-anchor="middle">CONSOLE</text>
        </g>

        <!-- 16 Gigabit Ports in 2 Stacked Rows (8 top, 8 bottom) -->
        <g transform="translate(175, 48)">
          ${Array.from({ length: 8 }, (_, i) => `
            <g transform="translate(${i * 34}, 0)">
              <!-- Top Port (Odd: 1, 3, 5...) -->
              <rect x="0" y="4" width="26" height="24" rx="1.5" fill="#0f172a" stroke="#475569" stroke-width="0.8"/>
              <rect x="4" y="8" width="18" height="15" fill="#1e293b"/>
              <circle cx="2" cy="2" r="1.8" fill="#22c55e"><animate attributeName="opacity" values="1;0.3;1" dur="${0.5 + i * 0.2}s" repeatCount="indefinite"/></circle>
              <!-- Bottom Port (Even: 2, 4, 6...) -->
              <rect x="0" y="32" width="26" height="24" rx="1.5" fill="#0f172a" stroke="#475569" stroke-width="0.8"/>
              <rect x="4" y="36" width="18" height="15" fill="#1e293b"/>
              <circle cx="2" cy="30" r="1.8" fill="#22c55e"><animate attributeName="opacity" values="0.3;1;0.3" dur="${0.6 + i * 0.15}s" repeatCount="indefinite"/></circle>
              <!-- Labels -->
              <text x="13" y="2" font-size="7" fill="#94a3b8" text-anchor="middle">${i * 2 + 1}</text>
              <text x="13" y="64" font-size="7" fill="#94a3b8" text-anchor="middle">${i * 2 + 2}</text>
            </g>
          `).join('')}
        </g>

        <!-- SFP Gigabit Fiber Uplink Ports on Right -->
        <g transform="translate(452, 54)">
          <rect x="0" y="0" width="16" height="20" rx="1.5" fill="#0f172a" stroke="#eab308"/>
          <rect x="18" y="0" width="16" height="20" rx="1.5" fill="#0f172a" stroke="#eab308"/>
          <text x="17" y="30" font-size="7" fill="#eab308" font-weight="700" text-anchor="middle">SFP UPLINK</text>
        </g>

        <text x="260" y="145" font-size="10" fill="#2563eb" font-weight="700" text-anchor="middle">ASIC MAC Switching Matrix • Dedicated Collision-Free Microsegments</text>
      </svg>`;

    case 'router':
      return `
      <svg class="device-hardware-svg" viewBox="0 0 520 160" role="img" aria-label="Physical Gigabit Broadband Router with Antennas and Labeled WAN LAN Ports">
        <rect x="0" y="0" width="520" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>

        <!-- Left Antenna -->
        <line x1="100" y1="20" x2="80" y2="70" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
        <circle cx="80" cy="70" r="5" fill="#334155"/>
        <!-- Right Antenna -->
        <line x1="420" y1="20" x2="440" y2="70" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
        <circle cx="440" cy="70" r="5" fill="#334155"/>

        <!-- Router Chassis (Rear / Perspective View) -->
        <rect x="65" y="65" width="390" height="75" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <path d="M75 65 Q260 55 445 65" stroke="#334155" stroke-width="2" fill="none"/>

        <!-- Front Status LEDs (Top Lip) -->
        <g transform="translate(100, 72)">
          <circle cx="0" cy="0" r="2.5" fill="#22c55e"/><text x="0" y="9" font-size="6" fill="#94a3b8" text-anchor="middle">PWR</text>
          <circle cx="20" cy="0" r="2.5" fill="#0284c7"/><text x="20" y="9" font-size="6" fill="#94a3b8" text-anchor="middle">WAN</text>
          <circle cx="40" cy="0" r="2.5" fill="#22c55e"/><text x="40" y="9" font-size="6" fill="#94a3b8" text-anchor="middle">2.4G</text>
          <circle cx="60" cy="0" r="2.5" fill="#22c55e"/><text x="60" y="9" font-size="6" fill="#94a3b8" text-anchor="middle">5G</text>
          <circle cx="80" cy="0" r="2.5" fill="#22c55e"/><text x="80" y="9" font-size="6" fill="#94a3b8" text-anchor="middle">LAN</text>
        </g>

        <!-- Rear Interfaces Box -->
        <!-- Blue WAN (Internet) Port -->
        <g transform="translate(100, 92)">
          <rect x="0" y="0" width="40" height="34" rx="3" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
          <rect x="8" y="8" width="24" height="20" rx="2" fill="#0f172a"/>
          <text x="20" y="44" font-size="8" fill="#0284c7" font-weight="800" text-anchor="middle">WAN (Internet)</text>
        </g>

        <!-- 4 Yellow LAN Gigabit Ports -->
        <g transform="translate(170, 92)">
          ${Array.from({ length: 4 }, (_, i) => `
            <g transform="translate(${i * 44}, 0)">
              <rect x="0" y="0" width="36" height="34" rx="3" fill="#eab308" stroke="#ca8a04" stroke-width="1.5"/>
              <rect x="6" y="8" width="24" height="20" rx="2" fill="#0f172a"/>
              <text x="18" y="44" font-size="8" fill="#ca8a04" font-weight="800" text-anchor="middle">LAN ${i + 1}</text>
            </g>
          `).join('')}
        </g>

        <!-- Power Barrel Jack & Reset Pinhole -->
        <g transform="translate(370, 98)">
          <circle cx="10" cy="10" r="8" fill="#0f172a" stroke="#64748b"/>
          <circle cx="10" cy="10" r="3" fill="#e2e8f0"/>
          <text x="10" y="28" font-size="7" fill="#64748b" text-anchor="middle">12V DC</text>
          <circle cx="34" cy="10" r="2" fill="#ef4444"/>
          <text x="34" y="24" font-size="6" fill="#94a3b8" text-anchor="middle">RESET</text>
        </g>

        <text x="260" y="152" font-size="10" fill="#0f172a" font-weight="700" text-anchor="middle">Layer 3 Gateway: Connects Distinct IP Subnets & Routes via Routing Table</text>
      </svg>`;

    case 'modem':
      return `
      <svg class="device-hardware-svg" viewBox="0 0 520 160" role="img" aria-label="Physical Standup Cable Broadband Modem with Indicator Lights">
        <rect x="0" y="0" width="520" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>

        <!-- Stand / Pedestal -->
        <ellipse cx="260" cy="142" rx="120" ry="12" fill="#cbd5e1" stroke="#94a3b8"/>
        <rect x="235" y="128" width="50" height="15" fill="#334155"/>

        <!-- Standup Modem Tower Chassis -->
        <rect x="180" y="15" width="160" height="118" rx="12" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <!-- Side ventilation grill -->
        ${Array.from({ length: 6 }, (_, i) => `<line x1="192" y1="${35 + i * 12}" x2="204" y2="${35 + i * 12}" stroke="#334155" stroke-width="2"/>`).join('')}

        <!-- Front Status LEDs Panel -->
        <g transform="translate(230, 25)">
          <!-- Power LED -->
          <circle cx="10" cy="10" r="3.5" fill="#22c55e"/>
          <text x="22" y="13" font-size="8" fill="#e2e8f0" font-weight="700">POWER</text>
          <!-- Downstream LED -->
          <circle cx="10" cy="28" r="3.5" fill="#0284c7"><animate attributeName="opacity" values="1;0.4;1" dur="0.9s" repeatCount="indefinite"/></circle>
          <text x="22" y="31" font-size="8" fill="#38bdf8" font-weight="700">DS (Downstream)</text>
          <!-- Upstream LED -->
          <circle cx="10" cy="46" r="3.5" fill="#0284c7"><animate attributeName="opacity" values="0.4;1;0.4" dur="0.9s" repeatCount="indefinite"/></circle>
          <text x="22" y="49" font-size="8" fill="#38bdf8" font-weight="700">US (Upstream)</text>
          <!-- Online LED -->
          <circle cx="10" cy="64" r="3.5" fill="#22c55e"/>
          <text x="22" y="67" font-size="8" fill="#4ade80" font-weight="700">ONLINE</text>
          <!-- LAN Link LED -->
          <circle cx="10" cy="82" r="3.5" fill="#22c55e"><animate attributeName="opacity" values="1;0.2;1" dur="0.4s" repeatCount="indefinite"/></circle>
          <text x="22" y="85" font-size="8" fill="#cbd5e1" font-weight="700">ETHERNET</text>
        </g>

        <!-- Left Inset: Coaxial Cable Line (ISP In) -->
        <g transform="translate(45, 50)">
          <rect x="0" y="0" width="105" height="50" rx="4" fill="#ffffff" stroke="#94a3b8"/>
          <circle cx="20" cy="25" r="9" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
          <circle cx="20" cy="25" r="3" fill="#eab308"/>
          <text x="36" y="22" font-size="8" fill="#0f172a" font-weight="800">COAX / DSL IN</text>
          <text x="36" y="34" font-size="7" fill="#64748b">RF Carrier from ISP</text>
          <path d="M 105 25 L 180 40" stroke="#0284c7" stroke-width="2" stroke-dasharray="3,2"/>
        </g>

        <!-- Right Inset: RJ45 Gigabit Out (To Router) -->
        <g transform="translate(370, 50)">
          <rect x="0" y="0" width="115" height="50" rx="4" fill="#ffffff" stroke="#94a3b8"/>
          <rect x="10" y="12" width="22" height="26" rx="2" fill="#0f172a" stroke="#eab308"/>
          <text x="40" y="22" font-size="8" fill="#0f172a" font-weight="800">LAN OUT (RJ45)</text>
          <text x="40" y="34" font-size="7" fill="#64748b">Digital to Router WAN</text>
          <path d="M 340 90 L 370 75" stroke="#16a34a" stroke-width="2" stroke-dasharray="3,2"/>
        </g>

        <text x="260" y="155" font-size="10" fill="#0f172a" font-weight="700" text-anchor="middle">Modulator / Demodulator: RF Analog Waves ⇄ Digital 0s and 1s</text>
      </svg>`;

    case 'ap':
      return `
      <svg class="device-hardware-svg" viewBox="0 0 520 160" role="img" aria-label="Physical Enterprise Ceiling-Mount Wireless Access Point with Glowing LED Ring">
        <rect x="0" y="0" width="520" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>

        <!-- Ceiling Mounting Surface Line -->
        <line x1="80" y1="20" x2="440" y2="20" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8,6"/>
        <text x="260" y="15" font-size="8" fill="#64748b" text-anchor="middle" font-weight="600">CEILING / WALL MOUNTED</text>

        <!-- Radiating Wi-Fi Radio Waves Left & Right -->
        <path d="M 170 50 A 60 60 0 0 0 170 110" stroke="#38bdf8" stroke-width="2" fill="none" opacity="0.4"><animate attributeName="opacity" values="0.1;0.8;0.1" dur="2s" repeatCount="indefinite"/></path>
        <path d="M 150 40 A 80 80 0 0 0 150 120" stroke="#38bdf8" stroke-width="2.5" fill="none" opacity="0.6"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="0.3s" repeatCount="indefinite"/></path>
        <path d="M 130 30 A 100 100 0 0 0 130 130" stroke="#38bdf8" stroke-width="3" fill="none" opacity="0.8"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.6s" repeatCount="indefinite"/></path>

        <path d="M 350 50 A 60 60 0 0 1 350 110" stroke="#38bdf8" stroke-width="2" fill="none" opacity="0.4"><animate attributeName="opacity" values="0.1;0.8;0.1" dur="2s" repeatCount="indefinite"/></path>
        <path d="M 370 40 A 80 80 0 0 1 370 120" stroke="#38bdf8" stroke-width="2.5" fill="none" opacity="0.6"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="0.3s" repeatCount="indefinite"/></path>
        <path d="M 390 30 A 100 100 0 0 1 390 130" stroke="#38bdf8" stroke-width="3" fill="none" opacity="0.8"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.6s" repeatCount="indefinite"/></path>

        <!-- Access Point Disc Body -->
        <circle cx="260" cy="80" r="54" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
        <circle cx="260" cy="80" r="48" fill="#f1f5f9"/>

        <!-- Glowing Blue/Cyan LED Ring -->
        <circle cx="260" cy="80" r="24" fill="none" stroke="#06b6d4" stroke-width="3.5">
          <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="260" cy="80" r="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <!-- Brand logo center -->
        <path d="M 255 83 L 260 76 L 265 83" stroke="#0891b2" stroke-width="2" fill="none"/>

        <!-- Ethernet PoE Uplink Wire coming through ceiling -->
        <path d="M 260 20 V 32" stroke="#eab308" stroke-width="4"/>
        <rect x="252" y="24" width="16" height="10" rx="1" fill="#1e293b"/>
        <text x="274" y="32" font-size="7" fill="#ca8a04" font-weight="800">PoE UPLINK</text>

        <!-- Left Specs Pill -->
        <g transform="translate(18, 55)">
          <rect x="0" y="0" width="105" height="50" rx="4" fill="#ffffff" stroke="#e2e8f0"/>
          <text x="8" y="16" font-size="8" fill="#0f172a" font-weight="700">RADIO BANDS</text>
          <text x="8" y="28" font-size="7" fill="#0284c7" font-weight="600">Dual Band: 2.4 / 5 GHz</text>
          <text x="8" y="40" font-size="7" fill="#64748b">Wi-Fi 6 (802.11ax) MIMO</text>
        </g>

        <!-- Right Specs Pill -->
        <g transform="translate(400, 55)">
          <rect x="0" y="0" width="105" height="50" rx="4" fill="#ffffff" stroke="#e2e8f0"/>
          <text x="8" y="16" font-size="8" fill="#0f172a" font-weight="700">POWER & UPLINK</text>
          <text x="8" y="28" font-size="7" fill="#16a34a" font-weight="600">802.3at PoE+ (Power)</text>
          <text x="8" y="40" font-size="7" fill="#64748b">GbE RJ45 to LAN Switch</text>
        </g>

        <text x="260" y="150" font-size="10" fill="#0284c7" font-weight="700" text-anchor="middle">Layer 2 Wireless Bridge: Translates 802.11 Radio Frames to 802.3 Wired Ethernet</text>
      </svg>`;

    case 'repeater':
      return `
      <svg class="device-hardware-svg" viewBox="0 0 520 160" role="img" aria-label="Physical Wi-Fi Range Extender and Signal Repeater with Antennas">
        <rect x="0" y="0" width="520" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>

        <!-- External Antennas -->
        <line x1="220" y1="20" x2="220" y2="45" stroke="#475569" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="300" y1="20" x2="300" y2="45" stroke="#475569" stroke-width="4.5" stroke-linecap="round"/>

        <!-- Wall Plug Repeater Body -->
        <rect x="205" y="45" width="110" height="95" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
        <rect x="215" y="55" width="90" height="75" rx="4" fill="#f8fafc"/>

        <!-- Signal Strength LED Bar Meter -->
        <g transform="translate(230, 65)">
          <text x="30" y="0" font-size="7" fill="#64748b" font-weight="700" text-anchor="middle">SIGNAL METER</text>
          <rect x="10" y="8" width="8" height="6" rx="1" fill="#22c55e"/>
          <rect x="22" y="6" width="8" height="8" rx="1" fill="#22c55e"/>
          <rect x="34" y="4" width="8" height="10" rx="1" fill="#22c55e"/>
          <rect x="46" y="2" width="8" height="12" rx="1" fill="#22c55e"/>
        </g>

        <!-- WPS Push Button -->
        <circle cx="260" cy="100" r="10" fill="#0284c7" stroke="#38bdf8"/>
        <text x="260" y="103" font-size="6" fill="#ffffff" font-weight="800" text-anchor="middle">WPS</text>

        <!-- Bottom Pass-Through RJ45 Port -->
        <rect x="246" y="132" width="28" height="10" rx="1" fill="#1e293b"/>
        <text x="260" y="148" font-size="6" fill="#64748b" text-anchor="middle">ETHERNET OUT</text>

        <!-- Left Inset: Weak Incoming Signal -->
        <g transform="translate(30, 45)">
          <rect x="0" y="0" width="150" height="75" rx="4" fill="#fff1f2" stroke="#fecdd3"/>
          <text x="10" y="16" font-size="8" fill="#e11d48" font-weight="800">INPUT: ATTENUATED SIGNAL</text>
          <!-- Distorted, low amplitude wave -->
          <path d="M 15 48 Q 30 38 45 48 T 75 48 T 105 48 T 135 48" stroke="#e11d48" stroke-width="1.8" fill="none" stroke-dasharray="2,1"/>
          <text x="10" y="66" font-size="7" fill="#9f1239">Degraded by distance & noise</text>
          <!-- Arrow pointing to repeater -->
          <path d="M 150 48 L 200 65" stroke="#e11d48" stroke-width="2" marker-end="url(#arrow)"/>
        </g>

        <!-- Right Inset: Clean Regenerated Signal -->
        <g transform="translate(340, 45)">
          <rect x="0" y="0" width="150" height="75" rx="4" fill="#f0fdf4" stroke="#bbf7d0"/>
          <text x="10" y="16" font-size="8" fill="#16a34a" font-weight="800">OUTPUT: REGENERATED</text>
          <!-- Crisp full-height square wave -->
          <path d="M 15 55 V 35 H 35 V 55 H 55 V 35 H 75 V 55 H 95 V 35 H 115 V 55 H 135" stroke="#16a34a" stroke-width="2" fill="none"/>
          <text x="10" y="68" font-size="7" fill="#166534">100% Full-strength square pulses</text>
          <!-- Arrow from repeater -->
          <path d="M 315 65 L 340 48" stroke="#16a34a" stroke-width="2"/>
        </g>

        <text x="260" y="155" font-size="10" fill="#0f172a" font-weight="700" text-anchor="middle">Physical Layer Regeneration: Retimes and Reconstructs Bits Without Amplifying Noise</text>
      </svg>`;

    case 'bridge':
      return `
      <svg class="device-hardware-svg" viewBox="0 0 520 160" role="img" aria-label="Physical 2-Port Network Bridge Hardware Device">
        <rect x="0" y="0" width="520" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>

        <!-- Industrial Metal Bridge Appliance -->
        <rect x="70" y="30" width="380" height="96" rx="6" fill="#334155" stroke="#1e293b" stroke-width="2"/>

        <!-- Model branding -->
        <text x="90" y="52" font-size="11" fill="#f8fafc" font-weight="800">BRIDGE-LINK 200</text>
        <text x="220" y="52" font-size="8" fill="#94a3b8">Two-Port Layer 2 Segment Bridge</text>

        <!-- Segment A Port (Left) -->
        <g transform="translate(100, 68)">
          <rect x="0" y="0" width="46" height="42" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <rect x="8" y="8" width="30" height="26" rx="2" fill="#1e293b"/>
          <circle cx="23" cy="-6" r="3" fill="#22c55e"/>
          <text x="23" y="54" font-size="9" fill="#38bdf8" font-weight="800" text-anchor="middle">SEGMENT A</text>
        </g>

        <!-- Center Filter / Forward Logic Chip Visual -->
        <g transform="translate(200, 64)">
          <rect x="0" y="0" width="120" height="48" rx="4" fill="#0f172a" stroke="#64748b"/>
          <text x="60" y="18" font-size="8" fill="#38bdf8" font-weight="800" text-anchor="middle">L2 FILTERING TABLE</text>
          <text x="60" y="30" font-size="7" fill="#cbd5e1" text-anchor="middle">Seg A: MAC 1, 2</text>
          <text x="60" y="40" font-size="7" fill="#cbd5e1" text-anchor="middle">Seg B: MAC 3, 4</text>
          <!-- Forward / Filter Indicator LEDs -->
          <circle cx="10" cy="10" r="2.5" fill="#22c55e"/>
          <circle cx="110" cy="10" r="2.5" fill="#eab308"/>
        </g>

        <!-- Segment B Port (Right) -->
        <g transform="translate(370, 68)">
          <rect x="0" y="0" width="46" height="42" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <rect x="8" y="8" width="30" height="26" rx="2" fill="#1e293b"/>
          <circle cx="23" cy="-6" r="3" fill="#22c55e"/>
          <text x="23" y="54" font-size="9" fill="#38bdf8" font-weight="800" text-anchor="middle">SEGMENT B</text>
        </g>

        <!-- Arrows connecting segments through chip -->
        <path d="M 148 88 H 200" stroke="#38bdf8" stroke-width="2"/>
        <path d="M 320 88 H 368" stroke="#38bdf8" stroke-width="2"/>

        <text x="260" y="145" font-size="10" fill="#0284c7" font-weight="700" text-anchor="middle">Layer 2 Bridge: Isolates Collision Domains while Preserving a Single Broadcast Subnet</text>
      </svg>`;

    case 'firewall':
      return `
      <svg class="device-hardware-svg" viewBox="0 0 520 160" role="img" aria-label="Physical 1U Rackmount Enterprise Security Firewall Appliance">
        <rect x="0" y="0" width="520" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>

        <!-- Rack Ears -->
        <rect x="10" y="35" width="18" height="90" rx="2" fill="#94a3b8" stroke="#475569"/>
        <circle cx="19" cy="48" r="3.5" fill="#334155"/>
        <circle cx="19" cy="112" r="3.5" fill="#334155"/>
        <rect x="492" y="35" width="18" height="90" rx="2" fill="#94a3b8" stroke="#475569"/>
        <circle cx="501" cy="48" r="3.5" fill="#334155"/>
        <circle cx="501" cy="112" r="3.5" fill="#334155"/>

        <!-- 1U Firewall Chassis in Crimson / Charcoal -->
        <rect x="28" y="40" width="464" height="80" rx="3" fill="#1e1b4b" stroke="#0f172a" stroke-width="2"/>
        <line x1="28" y1="46" x2="492" y2="46" stroke="#4338ca" stroke-width="1"/>

        <!-- Brand & Security Shield Logo -->
        <g transform="translate(42, 54)">
          <!-- Shield icon -->
          <path d="M 12 4 L 22 8 V 18 C 22 24 12 28 12 28 C 12 28 2 24 2 18 V 8 Z" fill="#ef4444" stroke="#fca5a5" stroke-width="1.5"/>
          <path d="M 8 16 L 11 19 L 16 13" stroke="#ffffff" stroke-width="1.8" fill="none" stroke-linecap="round"/>
          <text x="30" y="14" font-size="11" fill="#f8fafc" font-weight="800">SECUREGUARD 500</text>
          <text x="30" y="24" font-size="8" fill="#a5b4fc">Next-Gen Stateful Firewall</text>
        </g>

        <!-- Status LEDs -->
        <g transform="translate(195, 60)">
          <circle cx="0" cy="0" r="2.5" fill="#22c55e"/><text x="8" y="3" font-size="7" fill="#cbd5e1">PWR</text>
          <circle cx="0" cy="12" r="2.5" fill="#22c55e"/><text x="8" y="15" font-size="7" fill="#cbd5e1">STATUS</text>
          <circle cx="0" cy="24" r="2.5" fill="#ef4444"><animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite"/></circle><text x="8" y="27" font-size="7" fill="#fca5a5">THREAT</text>
        </g>

        <!-- Interface Ports with Color-Coded Security Zones -->
        <g transform="translate(255, 52)">
          <!-- WAN Port (Red: Untrusted) -->
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="44" height="34" rx="2" fill="#450a0a" stroke="#ef4444" stroke-width="1.5"/>
            <rect x="10" y="8" width="24" height="20" rx="1.5" fill="#0f172a"/>
            <text x="22" y="44" font-size="7" fill="#ef4444" font-weight="800" text-anchor="middle">WAN</text>
            <text x="22" y="52" font-size="6" fill="#fca5a5" text-anchor="middle">Untrusted</text>
          </g>
          <!-- LAN Port (Green: Trusted) -->
          <g transform="translate(56, 0)">
            <rect x="0" y="0" width="44" height="34" rx="2" fill="#052e16" stroke="#22c55e" stroke-width="1.5"/>
            <rect x="10" y="8" width="24" height="20" rx="1.5" fill="#0f172a"/>
            <text x="22" y="44" font-size="7" fill="#22c55e" font-weight="800" text-anchor="middle">LAN</text>
            <text x="22" y="52" font-size="6" fill="#86efac" text-anchor="middle">Trusted</text>
          </g>
          <!-- DMZ Port (Orange: Public Servers) -->
          <g transform="translate(112, 0)">
            <rect x="0" y="0" width="44" height="34" rx="2" fill="#431407" stroke="#f97316" stroke-width="1.5"/>
            <rect x="10" y="8" width="24" height="20" rx="1.5" fill="#0f172a"/>
            <text x="22" y="44" font-size="7" fill="#f97316" font-weight="800" text-anchor="middle">DMZ</text>
            <text x="22" y="52" font-size="6" fill="#fdba74" text-anchor="middle">Public</text>
          </g>
          <!-- MGMT Port (Gray) -->
          <g transform="translate(168, 0)">
            <rect x="0" y="0" width="44" height="34" rx="2" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5"/>
            <rect x="10" y="8" width="24" height="20" rx="1.5" fill="#0f172a"/>
            <text x="22" y="44" font-size="7" fill="#94a3b8" font-weight="800" text-anchor="middle">MGMT</text>
            <text x="22" y="52" font-size="6" fill="#cbd5e1" text-anchor="middle">Admin</text>
          </g>
        </g>

        <text x="260" y="145" font-size="10" fill="#dc2626" font-weight="700" text-anchor="middle">Stateful Packet Inspection: Permitted Sessions Pass • Probes & Attacks Dropped</text>
      </svg>`;

    default:
      return '';
  }
}

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
        <text x="20" y="22" font-size="11" fill="#0f172a" font-weight="800">HOW IT WORKS: Host Data → L2 Ethernet Frame → Electrical Bitstream</text>

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
        <text x="260" y="163" font-size="9" fill="#334155" text-anchor="middle">NIC converts host memory bytes into standard Layer 2 Ethernet frames and physical electrical pulses.</text>
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
          <text x="80" y="22" font-size="9" fill="#ffffff" font-weight="800" text-anchor="middle">HUB CHASSIS (Layer 1)</text>

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
      <svg class="device-flow-svg" viewBox="0 0 520 180" role="img" aria-label="How a Network Router Works: Layer 3 IP Packet Forwarding via Routing Table">
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

        <!-- Router Layer 3 Engine -->
        <g transform="translate(160, 36)">
          <rect x="0" y="0" width="195" height="100" rx="6" fill="#f8fafc" stroke="#0f172a" stroke-width="1.8"/>
          <text x="97" y="16" font-size="9" fill="#0f172a" font-weight="800" text-anchor="middle">ROUTER (Layer 3 Engine)</text>

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
          <text x="97" y="93" font-size="7.5" fill="#15803d" font-weight="700" text-anchor="middle">2. Re-encapsulates L2 MAC for WAN link</text>
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
        <text x="20" y="22" font-size="11" fill="#0f172a" font-weight="800">HOW IT WORKS: 802.11 Wireless RF Frames ⇄ Layer 2 Bridge ⇄ 802.3 Wired Ethernet</text>

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

        <!-- Access Point Layer 2 Bridge -->
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
        <text x="260" y="162" font-size="9" fill="#0f172a" text-anchor="middle">An AP bridges Wi-Fi frames to wired Ethernet without routing or altering the Layer 3 IP packet.</text>
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
          <text x="87" y="16" font-size="9" fill="#0f172a" font-weight="800" text-anchor="middle">REPEATER (Layer 1)</text>

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
      <svg class="device-flow-svg" viewBox="0 0 520 180" role="img" aria-label="How a Network Bridge Works: Layer 2 Filtering Table Isolating Local Traffic">
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

    default:
      return '';
  }
}

/**
 * Combines physical hardware visual and "how it works" flow diagram into a presentation card.
 */
export function renderDeviceSlideVisual(deviceKey) {
  const meta = deviceMetadata[deviceKey];
  if (!meta) return '';

  return `
    <div class="device-visual-card">
      <div class="device-section-header">
        <div class="device-badges">
          <span class="device-hardware-badge">PHYSICAL HARDWARE</span>
          <span class="device-layer-badge">${esc(meta.layer)}</span>
        </div>
        <div class="device-view-tabs" role="tablist">
          <button type="button" class="device-tab-btn active" data-view="photo" title="Real hardware studio photo">📷 Real Photo</button>
          <button type="button" class="device-tab-btn" data-view="schematic" title="Hardware component schematic">📐 Schematic</button>
        </div>
      </div>
      <div class="device-views-wrapper">
        <div class="device-photo-view active">
          <div class="device-photo-box">
            <img src="${meta.image}" alt="${esc(meta.name)}" class="device-real-photo" loading="lazy" />
          </div>
          <div class="device-photo-meta">
            <span class="device-photo-model">${esc(meta.photoCaption)}</span>
            <span class="device-photo-specs">${esc(meta.specs)}</span>
          </div>
        </div>
        <div class="device-schematic-view" hidden>
          <div class="device-hardware-container">
            ${renderPhysicalDeviceSvg(deviceKey)}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function routerGatewayPortsVisual() {
  return `
    <div class="device-visual-card router-rear-card">
      <div class="device-section-header">
        <div class="device-badges">
          <span class="device-hardware-badge">PHYSICAL INTERFACES</span>
          <span class="device-layer-badge">SOHO Gateway Rear Panel</span>
        </div>
      </div>
      <div class="router-rear-box">
        <img src="images/router/router_rear.jpg" alt="Router Rear Physical Interfaces" class="router-rear-photo" loading="lazy" />
      </div>
      <div class="router-ports-callout-grid">
        <div class="router-port-chip chip-wan">
          <span class="port-chip-dot dot-wan"></span>
          <div class="port-chip-text">
            <strong>WAN / Internet Port</strong>
            <span>Dedicated uplink to ISP cable/fiber modem</span>
          </div>
        </div>
        <div class="router-port-chip chip-lan">
          <span class="port-chip-dot dot-lan"></span>
          <div class="port-chip-text">
            <strong>Switched LAN Ports (1–4)</strong>
            <span>Internal Gigabit switch for wired hosts &amp; APs</span>
          </div>
        </div>
        <div class="router-port-chip chip-wlan">
          <span class="port-chip-dot dot-wlan"></span>
          <div class="port-chip-text">
            <strong>Dual-Band Antennas</strong>
            <span>2.4 GHz &amp; 5 GHz Wi-Fi radio transmitters</span>
          </div>
        </div>
        <div class="router-port-chip chip-pwr">
          <span class="port-chip-dot dot-pwr"></span>
          <div class="port-chip-text">
            <strong>Power &amp; Factory Reset</strong>
            <span>DC power jack &amp; 10s reset pinhole</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
