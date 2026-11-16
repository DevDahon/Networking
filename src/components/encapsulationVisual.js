const encapSteps = [
  {
    layer: '7–5 · Upper Layers',
    chip: { text: '"Meet at 3 PM!"', role: 'data' },
    note: 'Data · App creates message'
  },
  {
    layer: '4 · Transport',
    chip: { text: '+ Port :5000', role: 'added' },
    note: 'Segment · App port added'
  },
  {
    layer: '3 · Network',
    chip: { text: '+ IP Header', role: 'added' },
    note: 'Packet · Source & dest IP'
  },
  {
    layer: '2 · Data Link',
    chip: { text: '+ MAC & FCS', role: 'added' },
    note: 'Frame · Local MAC & check'
  },
  {
    layer: '1 · Physical',
    chip: { text: '01001101 01100101…', role: 'bits' },
    note: 'Bits · Sent on cable / Wi-Fi'
  }
];

const decapSteps = [
  {
    layer: '1 · Physical',
    chip: { text: '01001101 01100101…', role: 'bits' },
    note: 'Bits · Signals read as bits'
  },
  {
    layer: '2 · Data Link',
    chip: { text: '− MAC & FCS ✓', role: 'removed' },
    note: 'Frame · MAC verified'
  },
  {
    layer: '3 · Network',
    chip: { text: '− IP Header ✓', role: 'removed' },
    note: 'Packet · IP matches PC 2'
  },
  {
    layer: '4 · Transport',
    chip: { text: '− Port :5000 ✓', role: 'removed' },
    note: 'Segment · Sent to chat app'
  },
  {
    layer: '5–7 · Upper Layers',
    chip: { text: '"Meet at 3 PM!"', role: 'data' },
    note: 'Data · Displayed on screen'
  }
];

function renderStepRows(steps) {
  return `
    <ol class="encap-steps">
      ${steps.map(step => `
        <li class="encap-step">
          <span class="encap-layer-label">${step.layer}</span>
          <div class="encap-chips">
            <span class="encap-chip encap-chip-${step.chip.role}">${step.chip.text}</span>
            <span class="encap-step-note">${step.note}</span>
          </div>
        </li>
      `).join('')}
    </ol>
  `;
}

/**
 * Renders a simplified 5-step comparison where Computer 1 wraps a message
 * down the stack (Encapsulation, 7 -> 1) and Computer 2 unwraps it back up
 * (Decapsulation, 1 -> 7).
 */
export function encapsulationExampleVisual() {
  return `
    <section class="encap-scenario-wrap" aria-label="Simplified encapsulation and decapsulation example">
      <div class="perf-examples-grid encap-examples-grid">
        <article class="perf-example-card">
          <div class="perf-card-header">
            <span class="perf-card-tag perf-tag-bandwidth">COMPUTER 1 · ENCAPSULATION (7 → 1)</span>
          </div>
          <h3 class="perf-card-title">Sender: Wrapping the Message ↓</h3>
          ${renderStepRows(encapSteps)}
        </article>

        <article class="perf-example-card">
          <div class="perf-card-header">
            <span class="perf-card-tag perf-tag-latency">COMPUTER 2 · DECAPSULATION (1 → 7)</span>
          </div>
          <h3 class="perf-card-title">Receiver: Unwrapping the Message ↑</h3>
          ${renderStepRows(decapSteps)}
        </article>
      </div>
    </section>
  `;
}
