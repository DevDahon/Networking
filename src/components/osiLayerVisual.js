const groupDetails = {
  upper: {
    group: 'create',
    groupLabel: 'Upper Layers 7–5 · How Data Is Created',
    pdu: 'PDU: Data',
    cards: [
      { label: '7 · Application Examples', text: 'HTTP / HTTPS (web), DNS (domain names), SMTP / IMAP (email), DHCP (auto setup)' },
      { label: '6 · Presentation Examples', text: 'UTF-8 / ASCII text, JPEG / PNG / MP4 media, ZIP compression, TLS encryption' },
      { label: '5 · Session Examples', text: 'Login session tokens, active chat or call dialogs, sync checkpoints, clean teardown' }
    ]
  },
  lower: {
    group: 'travel',
    groupLabel: 'Lower Layers 4–1 · How Data Travels',
    pdu: 'PDUs: Segment → Packet → Frame → Bits',
    cards: [
      { label: '4 · Transport & 3 · Network', text: 'Port numbers (:443, :5000) reach the right app; IP addresses & Routers pick the path' },
      { label: '2 · Data Link (Local Hop)', text: 'Hardware MAC addresses, Ethernet frames, FCS check, Switches, and NICs' },
      { label: '1 · Physical (Link Signals)', text: 'Cat 5e / Cat 6 copper, fiber-optic glass, Wi-Fi radio waves, and RJ45 plugs' }
    ]
  }
};

export function osiUpperLayersVisual() {
  const info = groupDetails.upper;
  return `
    <section class="osi-layer-lens osi-lens-${info.group}" aria-label="Upper Layers 7 to 5 summary">
      <div class="osi-lens-header">
        <span class="osi-lens-badge">${info.groupLabel}</span>
        <span class="osi-lens-pdu">${info.pdu}</span>
      </div>
      <div class="osi-lens-grid">
        ${info.cards.map(card => `
          <article class="osi-lens-card">
            <h3>${card.label}</h3>
            <p>${card.text}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

export function osiLowerLayersVisual() {
  const info = groupDetails.lower;
  return `
    <section class="osi-layer-lens osi-lens-${info.group}" aria-label="Lower Layers 4 to 1 summary">
      <div class="osi-lens-header">
        <span class="osi-lens-badge">${info.groupLabel}</span>
        <span class="osi-lens-pdu">${info.pdu}</span>
      </div>
      <div class="osi-lens-grid">
        ${info.cards.map(card => `
          <article class="osi-lens-card">
            <h3>${card.label}</h3>
            <p>${card.text}</p>
          </article>
        `).join('')}
      </div>
      <div class="osi-physical-thumbs" aria-label="Real Layer 1 physical media">
        <figure class="osi-mini-photo"><img src="images/media/utp_cable.webp" alt="Cat 6 UTP Copper Cable" decoding="async" /><figcaption>Cat 6 UTP</figcaption></figure>
        <figure class="osi-mini-photo"><img src="images/tools/rj45_plugs.webp" alt="8P8C RJ45 Plugs" decoding="async" /><figcaption>RJ45 Plug</figcaption></figure>
        <figure class="osi-mini-photo"><img src="images/media/fiber_optic.webp" alt="Duplex Fiber Optic Cable" decoding="async" /><figcaption>Fiber Optic</figcaption></figure>
      </div>
    </section>
  `;
}

export function osiLayerDetailVisual(layerNumber) {
  return layerNumber >= 5 ? osiUpperLayersVisual() : osiLowerLayersVisual();
}
