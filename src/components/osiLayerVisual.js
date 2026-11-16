const layerDetails = {
  7: {
    group: 'create',
    groupLabel: 'Upper Layer 7 · How Data Is Created',
    pdu: 'PDU: Data',
    cards: [
      { label: 'Protocols You Encounter', text: 'HTTP / HTTPS (web), DNS (domain names), SMTP / IMAP (email), DHCP (auto setup)' },
      { label: 'Real Clues You See', text: 'Address-bar URLs (https://…), web status codes (200 OK, 404), DNS replies, chat apps' },
      { label: 'Boundary & Software', text: 'Runs inside user applications on Computer 1 and Computer 2' }
    ]
  },
  6: {
    group: 'create',
    groupLabel: 'Upper Layer 6 · How Data Is Created',
    pdu: 'PDU: Data',
    cards: [
      { label: 'Formats & Security', text: 'UTF-8 / ASCII text, JPEG / PNG / MP4 media, ZIP / GZIP compression, TLS encryption' },
      { label: 'Real Clues You See', text: 'Browser padlock alerts, file formats (.png, .json), readable text ↔ hex bytes' },
      { label: 'Boundary & Role', text: 'Translates, shrinks, and encrypts data before lower layers add travel headers' }
    ]
  },
  5: {
    group: 'create',
    groupLabel: 'Upper Layer 5 · How Data Is Created',
    pdu: 'PDU: Data',
    cards: [
      { label: 'Controls You Encounter', text: 'Session setup (open talk), turn coordination, sync checkpoints, clean teardown' },
      { label: 'Real Clues You See', text: '"Session expired" prompts, login session tokens, active video-call or chat rooms' },
      { label: 'Boundary & Role', text: 'Completes How Data Is Created (7–5) and hands Data down to Layer 4' }
    ]
  },
  4: {
    group: 'travel',
    groupLabel: 'Lower Layer 4 · How Data Travels',
    pdu: 'PDU: Segment',
    cards: [
      { label: 'Mechanisms You Encounter', text: 'Source & destination port numbers (:5000, :443), segmentation (#1, #2), acknowledgments' },
      { label: 'Real Clues You See', text: 'Listening port tables (netstat), firewall port blocks, buffered retry pauses' },
      { label: 'Boundary & Host Stack', text: 'First step of How Data Travels (4–1); runs in each device OS network stack' }
    ]
  },
  3: {
    group: 'travel',
    groupLabel: 'Lower Layer 3 · How Data Travels',
    pdu: 'PDU: Packet',
    cards: [
      { label: 'Standards You Encounter', text: 'IPv4 / IPv6 addresses (192.168.1.10), subnet masks (/24), default gateway, ICMP' },
      { label: 'Real Clues You See', text: 'ipconfig settings, ping & tracert hops, TTL limits, "Destination host unreachable"' },
      { label: 'Boundary & Device', text: 'Chooses routes across separate networks; primary device is the Router' }
    ]
  },
  2: {
    group: 'travel',
    groupLabel: 'Lower Layer 2 · How Data Travels',
    pdu: 'PDU: Frame',
    cards: [
      { label: 'Standards You Encounter', text: 'Hardware MAC addresses (AA:BB:CC:11:22:33), Ethernet frames, Wi-Fi access rules, FCS' },
      { label: 'Real Clues You See', text: 'Switch MAC tables (Port 3 → PC), arp -a local cache, dropped damaged/CRC frames' },
      { label: 'Boundary & Devices', text: 'Handles hop-by-hop local LAN delivery; primary devices are the Switch and NIC' }
    ]
  },
  1: {
    group: 'travel',
    groupLabel: 'Lower Layer 1 · How Data Travels',
    pdu: 'PDU: Bits',
    cards: [
      { label: 'Media You Encounter', text: 'Cat 5e / Cat 6 copper cables, fiber-optic glass, Wi-Fi radio waves, RJ45 plugs' },
      { label: 'Real Clues You See', text: 'Bit signals (01001101…), NIC green/amber link LEDs, cable-tester pins (1–8), Wi-Fi bars' },
      { label: 'Boundary & Hardware', text: 'Moves raw 1s and 0s across cables, plugs, Access Points, and hubs' }
    ]
  }
};

/**
 * Renders the bottom deeper-look strip for an OSI layer slide, showing real protocols/media,
 * visible clues, and boundary/hardware split into Upper (create) vs Lower (travel) bands.
 */
export function osiLayerDetailVisual(layerNumber) {
  const layer = layerDetails[layerNumber];
  if (!layer) return '';
  const physicalThumbs = layerNumber === 1
    ? `
      <div class="osi-physical-thumbs" aria-label="Real Layer 1 physical media">
        <figure class="osi-mini-photo"><img src="images/media/utp_cable.webp" alt="Cat 6 UTP Copper Cable" decoding="async" /><figcaption>Cat 6 UTP</figcaption></figure>
        <figure class="osi-mini-photo"><img src="images/tools/rj45_plugs.webp" alt="8P8C RJ45 Plugs" decoding="async" /><figcaption>RJ45 Plug</figcaption></figure>
        <figure class="osi-mini-photo"><img src="images/media/fiber_optic.webp" alt="Duplex Fiber Optic Cable" decoding="async" /><figcaption>Fiber Optic</figcaption></figure>
      </div>
    `
    : '';
  return `
    <section class="osi-layer-lens osi-lens-${layer.group}" aria-label="What you encounter deeper inside Layer ${layerNumber}">
      <div class="osi-lens-header">
        <span class="osi-lens-badge">${layer.groupLabel}</span>
        <span class="osi-lens-pdu">${layer.pdu}</span>
      </div>
      <div class="osi-lens-grid">
        ${layer.cards.map(card => `
          <article class="osi-lens-card">
            <h3>${card.label}</h3>
            <p>${card.text}</p>
          </article>
        `).join('')}
      </div>
      ${physicalThumbs}
    </section>
  `;
}

