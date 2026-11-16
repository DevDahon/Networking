import { esc } from './ui.js';

export const deviceMetadata = {
  nic: {
    name: 'Network Interface Card (NIC)',
    shortName: 'NIC',
    role: 'Host Physical Interface & Hardware MAC Identifier',
    desc: 'Connects a computer to a wired cable or wireless radio network and handles signal conversion using its built-in MAC address.',
    image: 'images/devices/nic.webp',
    photoCaption: 'PCIe Desktop Gigabit Network Interface Card'
  },
  hub: {
    name: 'Network Hub',
    shortName: 'Hub',
    role: 'Multiport Repeater & Shared Collision Domain',
    desc: 'Shares one electrical bus across all ports and repeats every incoming signal out to every other connected port without checking addresses.',
    image: 'images/devices/hub.webp',
    photoCaption: '8-Port Fast Ethernet Multiport Repeater Hub'
  },
  switch: {
    name: 'Network Switch',
    shortName: 'Switch',
    role: 'Intelligent Multiport Bridge & MAC Learning Engine',
    desc: 'Records the hardware MAC address on each port and forwards local frames directly to the target device port.',
    image: 'images/devices/switch.webp',
    photoCaption: '24-Port 1U Rackmount Gigabit Managed Switch'
  },
  router: {
    name: 'Network Router',
    shortName: 'Router',
    role: 'Inter-Network Gateway & IP Path Forwarding',
    desc: 'Links separate IP networks, keeps local broadcast traffic inside each LAN, and forwards packets using a routing table.',
    image: 'images/devices/router.webp',
    photoCaption: 'TP-Link Wireless Router'
  },
  modem: {
    name: 'Modem (Modulator-Demodulator)',
    shortName: 'Modem',
    role: 'Digital ↔ Analog Signal Converter for Provider Media',
    desc: 'Modulates digital Ethernet signals onto coaxial, DSL, or fiber provider lines and demodulates incoming ISP signals back into data.',
    image: 'images/devices/modem.webp',
    photoCaption: 'DOCSIS 3.1 Broadband Cable Modem'
  },
  ap: {
    name: 'Wireless Access Point (AP)',
    shortName: 'Access Point',
    role: 'Wi-Fi Transceiver & 802.11 ↔ 802.3 Bridge',
    desc: 'Provides Wi-Fi radio coverage and bridges wireless client frames onto a wired Ethernet switch.',
    image: 'images/devices/ap.webp',
    photoCaption: 'Enterprise Ceiling-Mount Wi-Fi Access Point'
  },
  repeater: {
    name: 'Network Repeater',
    shortName: 'Repeater',
    role: 'Signal Regenerator & Distance Extender',
    desc: 'Reconstructs weakened digital pulses and amplifies faded wireless signals to extend transmission reach.',
    image: 'images/devices/repeater.webp',
    photoCaption: 'Dual-Band AC Wall-Plug Wi-Fi Range Extender'
  },
  server: {
    name: 'Enterprise Server',
    shortName: 'Server',
    role: 'Centralized Resource Provider & High-Availability Service Host',
    desc: 'Provides shared files, web applications, databases, and network directory services to connected clients.',
    image: 'images/devices/server.webp',
    photoCaption: '2U Rackmount Enterprise Dual-Socket Server'
  }
};

/**
 * Renders the real studio photograph card body with device name only.
 */
export function renderDevicePhotoBox(deviceKey) {
  const meta = deviceMetadata[deviceKey];
  if (!meta) return '';

  return `
    <div class="device-photo-view">
      <div class="device-photo-box">
        <img src="${meta.image}" alt="${esc(meta.photoCaption || meta.name)}" class="device-real-photo" decoding="async" />
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
