import { esc } from './ui.js';

const panelConfigs = {
  basicComponentsPhotos: {
    variant: 'strip-4',
    cards: [
      {
        src: 'images/devices/server.jpg',
        alt: 'Enterprise Rackmount Server',
        tag: 'End Device',
        tagClass: 'badge-blue',
        title: 'Server & Client Hosts',
        caption: 'Computers, servers, phones, and printers originate or consume network data.'
      },
      {
        src: 'images/devices/switch.jpg',
        alt: '24-Port Managed Ethernet Switch',
        tag: 'Connecting Device',
        tagClass: 'badge-teal',
        title: 'Ethernet Switch',
        caption: 'Connects wired devices on a local network using learned hardware addresses.'
      },
      {
        src: 'images/devices/ap.jpg',
        alt: 'Wireless Access Point',
        tag: 'Wireless Bridge',
        tagClass: 'badge-teal',
        title: 'Wi-Fi Access Point',
        caption: 'Links mobile wireless devices onto the wired Ethernet LAN switch.'
      },
      {
        src: 'images/media/utp_cable.jpg',
        alt: 'Cat 6 Twisted-Pair Copper Cable',
        tag: 'Physical Link',
        tagClass: 'badge-amber',
        title: 'Copper & Fiber Media',
        caption: 'Carries electrical pulses or light beams reliably between network ports.'
      }
    ]
  },
  linkChoicesPhotos: {
    variant: 'stack-2',
    eyebrow: 'REAL CONNECTION MEDIA',
    cards: [
      {
        src: 'images/tools/ethernet_patch_cable.jpg',
        alt: 'Blue Cat 6 Ethernet Patch Cable with RJ45 Plugs',
        tag: 'Wired Link',
        tagClass: 'badge-blue',
        title: 'Cat 6 Ethernet Patch Cord',
        caption: 'Plugs directly into PC and switch RJ45 ports for steady gigabit throughput and minimal interference.'
      },
      {
        src: 'images/devices/ap.jpg',
        alt: 'Dual-Band Wireless Access Point',
        tag: 'Wireless Link',
        tagClass: 'badge-teal',
        title: 'Wi-Fi Access Point (AP)',
        caption: 'Connects laptops and phones over radio waves without cables, though walls and distance reduce speed.'
      }
    ]
  },
  mediaChoicesPhotos: {
    variant: 'strip-5',
    cards: [
      {
        src: 'images/media/utp_cable.jpg',
        alt: 'Stripped Cat 6 UTP Twisted Pair Copper Cable',
        tag: 'UTP',
        tagClass: 'badge-blue',
        title: 'Unshielded Copper',
        caption: '4 color-coded twisted wire pairs in a flexible outer jacket.'
      },
      {
        src: 'images/media/stp_cable.jpg',
        alt: 'Stripped STP Shielded Twisted Pair Ethernet Cable',
        tag: 'STP',
        tagClass: 'badge-slate',
        title: 'Shielded Copper',
        caption: 'Woven metal braid, foil shield, and ground wire block heavy EMI.'
      },
      {
        src: 'images/media/fiber_optic.jpg',
        alt: 'Duplex LC Fiber Optic Patch Cable',
        tag: 'Fiber',
        tagClass: 'badge-teal',
        title: 'Optical Glass Fiber',
        caption: 'Microscopic silica glass core transmitting modulated laser or LED light.'
      },
      {
        src: 'images/media/coaxial_cable.jpg',
        alt: 'White Coaxial Cable with Threaded F-Connector',
        tag: 'Coaxial',
        tagClass: 'badge-amber',
        title: 'Coaxial Copper',
        caption: 'Shielded single solid copper core ending in a threaded F-connector.'
      },
      {
        src: 'images/devices/ap.jpg',
        alt: 'Wireless Access Point Radio Hardware',
        tag: 'Wireless AP',
        tagClass: 'badge-teal',
        title: 'Radio Hardware',
        caption: 'Access point transceivers send invisible RF waves through the air.'
      }
    ]
  },
  ethernetCategoriesPhoto: {
    variant: 'feature',
    eyebrow: 'PHYSICAL CONSTRUCTION COMPARISON',
    cards: [
      {
        src: 'images/media/ethernet_categories.jpg',
        alt: 'Side-by-side stripped Cat 5e, Cat 6, and Cat 6A Ethernet cables',
        tag: 'Cat 5e → Cat 6 → Cat 6A',
        tagClass: 'badge-blue',
        title: 'How Ethernet Categories Differ Physically',
        caption: 'Top (Gray): Cat 5e has looser twists and no divider. Middle (Blue): Cat 6 adds tighter twists and a plastic cross-spline separator. Bottom (Navy): Cat 6A uses thicker conductors and metallic foil shielding for 10 Gbps at 100 m.'
      }
    ]
  },
  fiberOpticPhotos: {
    variant: 'stack-2',
    eyebrow: 'REAL FIBER PATCH CORDS',
    cards: [
      {
        src: 'images/media/fiber_types.jpg',
        alt: 'Yellow Single-Mode and Aqua Multi-Mode LC Duplex Fiber Patch Cables',
        tag: 'SMF vs. MMF',
        tagClass: 'badge-teal',
        title: 'Color-Coded Jackets: Yellow vs. Aqua',
        caption: 'Standard industry jackets identify the core: yellow (top) indicates narrow 9 µm Single-Mode fiber for long distances; aqua (bottom) indicates 50 µm Multi-Mode fiber for shorter building runs.'
      },
      {
        src: 'images/media/fiber_optic.jpg',
        alt: 'Duplex LC Fiber Connector Closeup',
        tag: 'LC Connectors',
        tagClass: 'badge-blue',
        title: 'Duplex TX/RX Fiber Jumpers',
        caption: 'Two parallel fibers separate transmit (TX) and receive (RX) light beams via precision ceramic ferrules.'
      }
    ]
  },
  coaxialCablePhotos: {
    variant: 'stack-2',
    eyebrow: 'CONCENTRIC LAYERS & CONNECTOR',
    cards: [
      {
        src: 'images/media/coaxial_cutaway.jpg',
        alt: 'Stepped cutaway of RG-6 coaxial cable showing jacket, braid, foil, dielectric, and copper core',
        tag: '4-Layer Cutaway',
        tagClass: 'badge-amber',
        title: 'Four Concentric Shielded Layers',
        caption: 'From outside in: dark PVC jacket, woven wire braid, metallic foil shield, white foam dielectric insulator, and solid copper center conductor.'
      },
      {
        src: 'images/media/coaxial_cable.jpg',
        alt: 'Coaxial cable with crimped threaded F-connector',
        tag: 'F-Connector',
        tagClass: 'badge-blue',
        title: 'Threaded Broadband Termination',
        caption: 'Hexagonal F-connectors screw onto DOCSIS cable modems and splitters while maintaining continuous ground shielding.'
      }
    ]
  },
  wirelessHardwarePhotos: {
    variant: 'stack-2',
    eyebrow: 'PHYSICAL RADIO HARDWARE',
    cards: [
      {
        src: 'images/devices/ap.jpg',
        alt: 'Ceiling-Mount Wireless Access Point',
        tag: '802.11 Access Point',
        tagClass: 'badge-teal',
        title: 'Access Point Transceiver',
        caption: 'Mounts on ceilings or walls to send and receive 2.4 GHz, 5 GHz, and 6 GHz radio signals cleanly.'
      },
      {
        src: 'images/devices/repeater.jpg',
        alt: 'Dual-Band Wi-Fi Range Extender with External Antennas',
        tag: 'Folding Antennas',
        tagClass: 'badge-blue',
        title: 'Multi-Band Antenna Arrays',
        caption: 'External antennas capture weak wireless signals and extend coverage around concrete walls and hallways.'
      }
    ]
  },
  patchCableRealPhoto: {
    variant: 'feature',
    eyebrow: 'REAL TERMINATED CORD',
    cards: [
      {
        src: 'images/tools/ethernet_patch_cable.jpg',
        alt: 'Coiled Blue Cat 6 Straight-Through Patch Cable with RJ45 Ends',
        tag: 'Patch Cord',
        tagClass: 'badge-blue',
        title: 'Finished Straight-Through Patch Cable',
        caption: 'Both ends use identical T568B conductor order inside clear plugs protected by snagless strain-relief boots.'
      }
    ]
  },
  wireMapFaultsPhoto: {
    variant: 'stack-2',
    eyebrow: 'INSPECTION & TESTING HARDWARE',
    cards: [
      {
        src: 'images/tools/rj45_good_vs_bad.jpg',
        alt: 'Side-by-side comparison of proper RJ45 crimp on left and faulty crimp with exposed wires and recessed conductor on right',
        tag: 'Proper vs. Faulty',
        tagClass: 'badge-amber',
        title: 'Spotting Physical Termination Errors',
        caption: 'Left: jacket locked under strain relief and wires flush to gold pins. Right: untwisted wires exposed outside the plug plus one short conductor causing an Open fault.'
      },
      {
        src: 'images/tools/cable_tester.jpg',
        alt: 'Dual-Unit Master and Remote LAN Cable Continuity Tester',
        tag: 'Pin-by-Pin Test',
        tagClass: 'badge-teal',
        title: 'Wire-Map Tester Verification',
        caption: 'Tests continuity across pins 1–8 from one end of a run to the other to confirm opens, shorts, or crossed wires.'
      }
    ]
  },
  gatewayInterfacesPhotos: {
    variant: 'feature',
    eyebrow: 'PHYSICAL GATEWAY INTERFACES',
    cards: [
      {
        src: 'images/router/router_rear.jpg',
        alt: 'Rear panel of home router showing WAN uplink and four LAN switch ports',
        tag: 'WAN + LAN Ports',
        tagClass: 'badge-blue',
        title: 'Where LAN Meets WAN on a Physical Router',
        caption: 'The single WAN port connects upstream toward your ISP modem using a public IP; the four switched LAN ports serve your private internal subnet through NAT.'
      }
    ]
  },
  wifiRouterHardwarePhoto: {
    variant: 'feature',
    eyebrow: 'SOHO WIRELESS GATEWAY',
    cards: [
      {
        src: 'images/router/wifi_router.jpg',
        alt: 'Modern Black Dual-Band Wi-Fi 6 Router with Four Antennas and Status LEDs',
        tag: '2.4 GHz & 5 GHz Radios',
        tagClass: 'badge-teal',
        title: 'Dual-Band Wi-Fi 6 Wireless Router',
        caption: 'External antennas broadcast 2.4 GHz (wide wall penetration) and 5 GHz (high-throughput) signals simultaneously while front LEDs monitor power, WAN link, and active wireless bands.'
      }
    ]
  }
};

/**
 * Renders a standardized light/dark-mode hardware photograph panel for concept slides.
 */
export function renderPhotoPanel(key) {
  const cfg = panelConfigs[key];
  if (!cfg) return '';

  return `
    <section class="physical-photo-panel physical-panel-${cfg.variant}" aria-label="${esc(cfg.eyebrow || 'Real hardware photographs')}">
      ${cfg.eyebrow ? `<div class="physical-panel-header"><span class="physical-panel-eyebrow">${esc(cfg.eyebrow)}</span></div>` : ''}
      <div class="physical-cards-grid">
        ${cfg.cards.map(card => `
          <figure class="physical-photo-card">
            <div class="physical-photo-box">
              <img src="${card.src}" alt="${esc(card.alt)}" class="physical-photo-img" loading="lazy" />
            </div>
            <figcaption class="physical-photo-meta">
              <span class="physical-photo-tag ${card.tagClass || 'badge-blue'}">${esc(card.tag)}</span>
              <h4 class="physical-photo-title">${esc(card.title)}</h4>
              <p class="physical-photo-desc">${esc(card.caption)}</p>
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

