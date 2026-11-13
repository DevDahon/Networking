const encapUpperSteps = [
  {
    layer: '7 · Application',
    chips: [{ text: '"Meet at 3 PM!"', role: 'data' }],
    note: 'Typed in chat app'
  },
  {
    layer: '6 · Presentation',
    chips: [{ text: 'Text → Bytes', role: 'inner' }],
    note: 'Formats text'
  },
  {
    layer: '5 · Session',
    chips: [{ text: 'Chat C1 ↔ C2', role: 'inner' }],
    note: 'Opens session'
  }
];

const encapLowerSteps = [
  {
    layer: '4 · Transport',
    chips: [
      { text: '+ Port :5000', role: 'added' },
      { text: 'Data', role: 'data' }
    ],
    note: 'Segment'
  },
  {
    layer: '3 · Network',
    chips: [
      { text: '+ IP C1→C2', role: 'added' },
      { text: 'Port', role: 'inner' },
      { text: 'Data', role: 'data' }
    ],
    note: 'Packet'
  },
  {
    layer: '2 · Data Link',
    chips: [
      { text: '+ MAC', role: 'added' },
      { text: 'IP', role: 'inner' },
      { text: 'Port', role: 'inner' },
      { text: 'Data', role: 'data' },
      { text: '+ FCS', role: 'added' }
    ],
    note: 'Frame'
  },
  {
    layer: '1 · Physical',
    chips: [{ text: '01001101 01100101 …', role: 'bits' }],
    note: 'Bits on cable / Wi-Fi'
  }
];

const decapLowerSteps = [
  {
    layer: '1 · Physical',
    chips: [{ text: '01001101 01100101 …', role: 'bits' }],
    note: 'Signals read as bits'
  },
  {
    layer: '2 · Data Link',
    chips: [
      { text: '− MAC ✓', role: 'removed' },
      { text: 'IP', role: 'inner' },
      { text: 'Port', role: 'inner' },
      { text: 'Data', role: 'data' },
      { text: '− FCS ✓', role: 'removed' }
    ],
    note: 'Frame verified'
  },
  {
    layer: '3 · Network',
    chips: [
      { text: '− IP ✓', role: 'removed' },
      { text: 'Port', role: 'inner' },
      { text: 'Data', role: 'data' }
    ],
    note: 'Matches Computer 2'
  },
  {
    layer: '4 · Transport',
    chips: [
      { text: '− Port ✓', role: 'removed' },
      { text: 'Data', role: 'data' }
    ],
    note: 'Routed to chat app'
  }
];

const decapUpperSteps = [
  {
    layer: '5 · Session',
    chips: [{ text: 'Chat C1 ↔ C2', role: 'inner' }],
    note: 'Matches open chat'
  },
  {
    layer: '6 · Presentation',
    chips: [{ text: 'Bytes → Text', role: 'inner' }],
    note: 'Decodes text'
  },
  {
    layer: '7 · Application',
    chips: [{ text: '"Meet at 3 PM!"', role: 'data' }],
    note: 'Shown on screen'
  }
];

function renderStepRows(steps) {
  return `
    <ol class="encap-steps">
      ${steps.map(step => `
        <li class="encap-step">
          <span class="encap-layer-label">${step.layer}</span>
          <div class="encap-chips">
            ${step.chips.map(chip => `<span class="encap-chip encap-chip-${chip.role}">${chip.text}</span>`).join('')}
            ${step.note ? `<span class="encap-step-note">${step.note}</span>` : ''}
          </div>
        </li>
      `).join('')}
    </ol>
  `;
}

function renderZone(kind, title, subtitle, steps) {
  return `
    <div class="encap-zone encap-zone-${kind}">
      <div class="encap-zone-header">
        <span class="encap-zone-title">${title}</span>
        <span class="encap-zone-sub">${subtitle}</span>
      </div>
      ${renderStepRows(steps)}
    </div>
  `;
}

/**
 * Renders a static real-life scenario where Computer 1 sends a chat message
 * (Encapsulation, 7 -> 1) and Computer 2 receives and opens it (Decapsulation, 1 -> 7),
 * grouped into upper layers (How data is created) and lower layers (How data travels).
 */
export function encapsulationExampleVisual() {
  return `
    <section class="encap-scenario-wrap" aria-label="Real-life encapsulation and decapsulation example">
      <div class="encap-scenario-flow">
        <span class="encap-host"><b>Computer 1</b> sends <em>"Meet at 3 PM!"</em> (Encapsulation)</span>
        <span class="encap-flow-arrow" aria-hidden="true">──► Cable / Wi-Fi ──►</span>
        <span class="encap-host"><b>Computer 2</b> receives &amp; reads it (Decapsulation)</span>
      </div>
      <div class="perf-examples-grid encap-examples-grid">
        <article class="perf-example-card">
          <div class="perf-card-header">
            <span class="perf-card-tag perf-tag-bandwidth">COMPUTER 1 · ENCAPSULATION (7 → 1)</span>
          </div>
          <h3 class="perf-card-title">Sent Message: Creating &amp; Wrapping Data</h3>
          <div class="encap-zones">
            ${renderZone('create', '3 Upper Layers (7–5) · How Data Is Created', 'Prepared by app', encapUpperSteps)}
            ${renderZone('travel', '4 Lower Layers (4–1) · How Data Travels', 'Wrapped to send', encapLowerSteps)}
          </div>
        </article>

        <article class="perf-example-card">
          <div class="perf-card-header">
            <span class="perf-card-tag perf-tag-latency">COMPUTER 2 · DECAPSULATION (1 → 7)</span>
          </div>
          <h3 class="perf-card-title">Received Message: Unwrapping &amp; Reading Data</h3>
          <div class="encap-zones">
            ${renderZone('travel', '4 Lower Layers (1–4) · How Data Travels', 'Unwrapped upward', decapLowerSteps)}
            ${renderZone('create', '3 Upper Layers (5–7) · How Data Is Created', 'Opened by app', decapUpperSteps)}
          </div>
        </article>
      </div>
    </section>
  `;
}
