import { esc } from './ui.js';

const panelConfigs = {
  basicComponentsPhotos: {
    variant: 'strip-4',
    label: 'Basic network hardware',
    cards: [
      {
        src: 'images/devices/server.jpg',
        alt: 'Enterprise Rackmount Server',
        title: 'Enterprise Server'
      },
      {
        src: 'images/devices/switch.jpg',
        alt: '24-Port Managed Ethernet Switch',
        title: 'Ethernet Switch'
      },
      {
        src: 'images/devices/ap.jpg',
        alt: 'Wireless Access Point',
        title: 'Wi-Fi Access Point'
      },
      {
        src: 'images/media/utp_cable.jpg',
        alt: 'Cat 6 Twisted-Pair Copper Cable',
        title: 'Cat 6 UTP Copper Cable'
      }
    ]
  },
  linkChoicesPhotos: {
    variant: 'stack-2',
    label: 'Wired and wireless connection hardware',
    cards: [
      {
        src: 'images/tools/ethernet_patch_cable.jpg',
        alt: 'Blue Cat 6 Ethernet Patch Cable with RJ45 Plugs',
        title: 'Cat 6 Ethernet Patch Cable'
      },
      {
        src: 'images/devices/ap.jpg',
        alt: 'Dual-Band Wireless Access Point',
        title: 'Wi-Fi Access Point'
      }
    ]
  },
  mediaChoicesPhotos: {
    variant: 'strip-5',
    label: 'Network transmission media',
    cards: [
      {
        src: 'images/media/utp_cable.jpg',
        alt: 'Stripped Cat 6 UTP Twisted Pair Copper Cable',
        title: 'UTP Copper Cable'
      },
      {
        src: 'images/media/stp_cable.jpg',
        alt: 'Stripped STP Shielded Twisted Pair Ethernet Cable',
        title: 'STP Shielded Cable'
      },
      {
        src: 'images/media/fiber_optic.jpg',
        alt: 'Duplex LC Fiber Optic Patch Cable',
        title: 'Fiber-Optic Cable'
      },
      {
        src: 'images/media/coaxial_cable.jpg',
        alt: 'White Coaxial Cable with Threaded F-Connector',
        title: 'Coaxial Cable'
      },
      {
        src: 'images/devices/ap.jpg',
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
        src: 'images/media/ethernet_categories.jpg',
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
        src: 'images/media/fiber_types.jpg',
        alt: 'Yellow Single-Mode and Aqua Multi-Mode LC Duplex Fiber Patch Cables',
        title: 'Single-Mode (Yellow) & Multi-Mode (Aqua) Fiber'
      },
      {
        src: 'images/media/fiber_optic.jpg',
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
        src: 'images/media/coaxial_cutaway.jpg',
        alt: 'Stepped cutaway of RG-6 coaxial cable showing jacket, braid, foil, dielectric, and copper core',
        title: 'Coaxial Cable Cutaway'
      },
      {
        src: 'images/media/coaxial_cable.jpg',
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
        src: 'images/devices/ap.jpg',
        alt: 'Ceiling-Mount Wireless Access Point',
        title: 'Wi-Fi Access Point'
      },
      {
        src: 'images/devices/repeater.jpg',
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
        src: 'images/tools/ethernet_patch_cable.jpg',
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
        src: 'images/tools/rj45_good_vs_bad.jpg',
        alt: 'Side-by-side comparison of proper RJ45 crimp on left and faulty crimp on right',
        title: 'RJ45 Crimp (Good vs. Faulty)'
      },
      {
        src: 'images/tools/cable_tester.jpg',
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
        src: 'images/router/router_rear.jpg',
        alt: 'Rear panel of home router showing WAN uplink and four LAN switch ports',
        title: 'Home Router (Rear WAN & LAN Ports)'
      }
    ]
  },
  wifiRouterHardwarePhoto: {
    variant: 'feature',
    label: 'Dual-band Wi-Fi 6 router',
    cards: [
      {
        src: 'images/router/wifi_router.jpg',
        alt: 'Modern Black Dual-Band Wi-Fi 6 Router with Four Antennas and Status LEDs',
        title: 'Dual-Band Wi-Fi 6 Router'
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
              <img src="${card.src}" alt="${esc(card.alt)}" class="physical-photo-img" loading="lazy" />
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
