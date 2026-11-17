import { esc } from './ui.js';

const protocolOverviewSvg = `
  <svg class="physical-photo-svg" viewBox="0 0 220 112" role="img" aria-label="Network protocol rules diagram">
    <rect x="14" y="10" width="192" height="24" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="110" y="26" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8">HTTP · DNS · DHCP</text>
    <rect x="14" y="42" width="192" height="24" rx="6" fill="#ecfdf5" stroke="#0d9488" stroke-width="1.5"/>
    <text x="110" y="58" text-anchor="middle" font-size="11" font-weight="700" fill="#065f46">TCP · UDP · IP Rules</text>
    <rect x="14" y="74" width="192" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="110" y="90" text-anchor="middle" font-size="10.5" font-weight="600" fill="#475569">Format · Address · Deliver</text>
  </svg>
`;

const clientNodesSvg = `
  <svg class="physical-photo-svg" viewBox="0 0 220 112" role="img" aria-label="Workstation and laptop client end devices">
    <rect x="20" y="16" width="84" height="54" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
    <line x1="62" y1="70" x2="62" y2="86" stroke="#2563eb" stroke-width="3"/>
    <line x1="40" y1="86" x2="84" y2="86" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>
    <text x="62" y="47" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8">Desktop PC</text>
    <rect x="122" y="26" width="76" height="46" rx="5" fill="#ecfdf5" stroke="#0d9488" stroke-width="2"/>
    <polygon points="112,72 208,72 214,86 106,86" fill="#ecfdf5" stroke="#0d9488" stroke-width="2"/>
    <text x="160" y="53" text-anchor="middle" font-size="11" font-weight="700" fill="#065f46">Laptop</text>
  </svg>
`;

const peripheralNodesSvg = `
  <svg class="physical-photo-svg" viewBox="0 0 220 112" role="img" aria-label="Smartphone and network printer end devices">
    <rect x="28" y="16" width="44" height="76" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
    <circle cx="50" cy="82" r="3" fill="#2563eb"/>
    <text x="50" y="54" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1d4ed8">Phone</text>
    <rect x="108" y="20" width="76" height="22" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect x="94" y="38" width="104" height="36" rx="6" fill="#ecfdf5" stroke="#0d9488" stroke-width="2"/>
    <rect x="114" y="64" width="64" height="22" rx="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="146" y="57" text-anchor="middle" font-size="10.5" font-weight="700" fill="#065f46">Printer</text>
  </svg>
`;

const protocolFormatSvg = `
  <svg class="physical-photo-svg" viewBox="0 0 220 112" role="img" aria-label="Protocol message structure">
    <rect x="14" y="20" width="54" height="40" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>
    <text x="41" y="44" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1d4ed8">Header</text>
    <rect x="74" y="20" width="84" height="40" rx="6" fill="#ecfdf5" stroke="#0d9488" stroke-width="1.8"/>
    <text x="116" y="44" text-anchor="middle" font-size="10.5" font-weight="700" fill="#065f46">User Data</text>
    <rect x="164" y="20" width="42" height="40" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.8"/>
    <text x="185" y="44" text-anchor="middle" font-size="10" font-weight="700" fill="#475569">Check</text>
    <text x="110" y="88" text-anchor="middle" font-size="10.5" font-weight="600" fill="#475569">Consistent Format &amp; Encoding</text>
  </svg>
`;

const protocolDeliverySvg = `
  <svg class="physical-photo-svg" viewBox="0 0 220 112" role="img" aria-label="Protocol addressing and acknowledgment timing">
    <rect x="16" y="20" width="64" height="32" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>
    <text x="48" y="40" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1d4ed8">Sender</text>
    <rect x="140" y="20" width="64" height="32" rx="6" fill="#ecfdf5" stroke="#0d9488" stroke-width="1.8"/>
    <text x="172" y="40" text-anchor="middle" font-size="10.5" font-weight="700" fill="#065f46">Receiver</text>
    <line x1="84" y1="30" x2="134" y2="30" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
    <line x1="136" y1="44" x2="86" y2="44" stroke="#0d9488" stroke-width="2" stroke-dasharray="4 3" stroke-linecap="round"/>
    <text x="110" y="76" text-anchor="middle" font-size="10.5" font-weight="600" fill="#475569">Address · Request · Reply</text>
    <text x="110" y="94" text-anchor="middle" font-size="10" font-weight="600" fill="#64748b">Flow &amp; Error Control</text>
  </svg>
`;

const panelConfigs = {
  basicComponentsPhotos: {
    variant: 'strip-4',
    label: 'Four core components of computer networks',
    cards: [
      {
        src: 'images/devices/server.webp',
        alt: 'Enterprise Rackmount Server and workstation endpoint hardware',
        title: '1. End Devices (Nodes)'
      },
      {
        src: 'images/devices/switch.webp',
        alt: '24-Port Managed Ethernet Switch for connecting network endpoints',
        title: '2. Networking Devices'
      },
      {
        src: 'images/media/utp_cable.webp',
        alt: 'Cat 6 Twisted-Pair Copper Cable for signal transmission',
        title: '3. Transmission Media'
      },
      {
        svg: protocolOverviewSvg,
        title: '4. Protocols'
      }
    ]
  },
  endDevicesComponent: {
    variant: 'strip-3',
    label: 'End devices and host nodes on a network',
    cards: [
      {
        src: 'images/devices/server.webp',
        alt: 'Enterprise Rackmount Server providing files and services',
        title: 'Servers (Service Providers)'
      },
      {
        svg: clientNodesSvg,
        title: 'Workstations & Laptops (Clients)'
      },
      {
        svg: peripheralNodesSvg,
        title: 'Phones & Network Printers'
      }
    ]
  },
  networkingDevicesComponent: {
    variant: 'strip-3',
    label: 'Intermediary networking devices',
    cards: [
      {
        src: 'images/devices/switch.webp',
        alt: '24-Port Managed Ethernet Switch',
        title: 'Switch (Local Wired LAN)'
      },
      {
        src: 'images/devices/ap.webp',
        alt: 'Wireless Access Point bridging Wi-Fi to LAN',
        title: 'Access Point (Wi-Fi Bridge)'
      },
      {
        src: 'images/devices/router.webp',
        alt: 'Enterprise Router forwarding traffic between networks',
        title: 'Router (Between Networks)'
      }
    ]
  },
  transmissionMediaComponent: {
    variant: 'strip-3',
    label: 'Wired and wireless transmission media',
    cards: [
      {
        src: 'images/media/utp_cable.webp',
        alt: 'Cat 6 Twisted-Pair Copper Cable',
        title: 'Copper Cable (Electrical)'
      },
      {
        src: 'images/media/fiber_optic.webp',
        alt: 'Duplex LC Fiber Optic Patch Cable',
        title: 'Fiber Optic (Light Pulses)'
      },
      {
        src: 'images/devices/ap.webp',
        alt: 'Wireless Access Point transmitting radio waves',
        title: 'Wireless Radio (Wi-Fi)'
      }
    ]
  },
  protocolsComponent: {
    variant: 'strip-3',
    label: 'Network protocol functions and open standards',
    cards: [
      {
        svg: protocolFormatSvg,
        title: 'Formatting & Structure'
      },
      {
        svg: protocolDeliverySvg,
        title: 'Addressing & Reliability'
      },
      {
        svg: protocolOverviewSvg,
        title: 'Core Open Standards'
      }
    ]
  },
  mediaChoicesPhotos: {
    variant: 'strip-5',
    label: 'Network transmission media',
    cards: [
      {
        src: 'images/media/utp_cable.webp',
        alt: 'Stripped Cat 6 UTP Twisted Pair Copper Cable',
        title: 'UTP Copper Cable'
      },
      {
        src: 'images/media/stp_cable.webp',
        alt: 'Stripped STP Shielded Twisted Pair Ethernet Cable',
        title: 'STP Shielded Cable'
      },
      {
        src: 'images/media/fiber_optic.webp',
        alt: 'Duplex LC Fiber Optic Patch Cable',
        title: 'Fiber-Optic Cable'
      },
      {
        src: 'images/media/coaxial_cable.webp',
        alt: 'White Coaxial Cable with Threaded F-Connector',
        title: 'Coaxial Cable'
      },
      {
        src: 'images/devices/ap.webp',
        alt: 'Wireless Access Point Radio Hardware',
        title: 'Wi-Fi Access Point'
      }
    ]
  },
  ethernetCategoriesPhoto: {
    variant: 'feature',
    label: 'Ethernet cable categories',
    cards: [
      {
        src: 'images/media/ethernet_categories.webp',
        alt: 'Side-by-side stripped Cat 5e, Cat 6, and Cat 6A Ethernet cables',
        title: 'Cat 5e / Cat 6 / Cat 6A Cables'
      }
    ]
  },
  fiberOpticPhotos: {
    variant: 'stack-2',
    label: 'Fiber-optic patch cables',
    cards: [
      {
        src: 'images/media/fiber_types.webp',
        alt: 'Yellow Single-Mode and Aqua Multi-Mode LC Duplex Fiber Patch Cables',
        title: 'Single-Mode (Yellow) & Multi-Mode (Aqua) Fiber'
      },
      {
        src: 'images/media/fiber_optic.webp',
        alt: 'Duplex LC Fiber Connector Closeup',
        title: 'Duplex LC Fiber Patch Cord'
      }
    ]
  },
  coaxialCablePhotos: {
    variant: 'stack-2',
    label: 'Coaxial cable and F-connector',
    cards: [
      {
        src: 'images/media/coaxial_cutaway.webp',
        alt: 'Stepped cutaway of RG-6 coaxial cable showing jacket, braid, foil, dielectric, and copper core',
        title: 'Coaxial Cable Cutaway'
      },
      {
        src: 'images/media/coaxial_cable.webp',
        alt: 'Coaxial cable with crimped threaded F-connector',
        title: 'Coaxial Cable with F-Connector'
      }
    ]
  },
  wirelessHardwarePhotos: {
    variant: 'stack-2',
    label: 'Wireless network hardware',
    cards: [
      {
        src: 'images/devices/ap.webp',
        alt: 'Ceiling-Mount Wireless Access Point',
        title: 'Wi-Fi Access Point'
      },
      {
        src: 'images/devices/repeater.webp',
        alt: 'Dual-Band Wi-Fi Range Extender with External Antennas',
        title: 'Dual-Band Wi-Fi Range Extender'
      }
    ]
  },
  patchCableRealPhoto: {
    variant: 'feature',
    label: 'Cat 6 patch cable',
    cards: [
      {
        src: 'images/tools/ethernet_patch_cable.webp',
        alt: 'Coiled Blue Cat 6 Straight-Through Patch Cable with RJ45 Ends',
        title: 'Cat 6 Straight-Through Patch Cable'
      }
    ]
  },
  wireMapFaultsPhoto: {
    variant: 'stack-2',
    label: 'RJ45 termination and cable tester',
    cards: [
      {
        src: 'images/tools/rj45_good_vs_bad.webp',
        alt: 'Side-by-side comparison of proper RJ45 crimp on left and faulty crimp on right',
        title: 'RJ45 Crimp (Good vs. Faulty)'
      },
      {
        src: 'images/tools/cable_tester.webp',
        alt: 'Dual-Unit Master and Remote LAN Cable Continuity Tester',
        title: 'LAN Cable Continuity Tester'
      }
    ]
  },
  gatewayInterfacesPhotos: {
    variant: 'feature',
    label: 'Home router rear panel',
    cards: [
      {
        src: 'images/router/router_rear.webp',
        alt: 'Rear panel of home router showing WAN uplink and four LAN switch ports',
        title: 'Home Router (Rear WAN & LAN Ports)'
      }
    ]
  },
  wifiRouterHardwarePhoto: {
    variant: 'feature',
    label: 'TP-Link dual-band Wi-Fi router',
    cards: [
      {
        src: 'images/router/wifi_router.webp',
        alt: 'TP-Link Dual-Band Wireless Router with Four External Antennas and Status LEDs',
        title: 'TP-Link Wireless Router'
      }
    ]
  }
};

/**
 * Renders a light/dark-mode hardware photograph panel with device names only.
 */
export function renderPhotoPanel(key) {
  const cfg = panelConfigs[key];
  if (!cfg) return '';

  return `
    <section class="physical-photo-panel physical-panel-${cfg.variant}" aria-label="${esc(cfg.label || 'Physical network hardware')}">
      <div class="physical-cards-grid">
        ${cfg.cards.map(card => `
          <figure class="physical-photo-card">
            <div class="physical-photo-box">
              ${card.svg ? card.svg : `<img src="${card.src}" alt="${esc(card.alt)}" class="physical-photo-img" decoding="async" />`}
            </div>
            <figcaption class="physical-photo-meta">
              <h4 class="physical-photo-title">${esc(card.title)}</h4>
            </figcaption>
          </figure>
        `).join('')}
      </div>
    </section>
  `;
}

export const physicalVisualPanels = Object.fromEntries(
  Object.keys(panelConfigs).map(key => [key, () => renderPhotoPanel(key)])
);

export function physicalPanelImages(key) {
  return panelConfigs[key]?.cards.map(card => card.src).filter(Boolean) || [];
}
