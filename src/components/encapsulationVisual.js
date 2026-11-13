const encapSteps = [
  {
    layer: 'L7–5 · Data',
    chips: [{ text: '"Hello!"', role: 'data' }],
    note: 'App message'
  },
  {
    layer: 'L4 · Segment',
    chips: [
      { text: '+ TCP :443', role: 'added' },
      { text: '"Hello!"', role: 'data' }
    ]
  },
  {
    layer: 'L3 · Packet',
    chips: [
      { text: '+ IP .10→.20', role: 'added' },
      { text: 'TCP', role: 'inner' },
      { text: '"Hello!"', role: 'data' }
    ]
  },
  {
    layer: 'L2 · Frame',
    chips: [
      { text: '+ MAC A→B', role: 'added' },
      { text: 'IP', role: 'inner' },
      { text: 'TCP', role: 'inner' },
      { text: '"Hello!"', role: 'data' },
      { text: '+ FCS', role: 'added' }
    ]
  },
  {
    layer: 'L1 · Bits',
    chips: [{ text: '01001000 01101001 …', role: 'bits' }],
    note: 'Link signals'
  }
];

const decapSteps = [
  {
    layer: 'L1 · Bits',
    chips: [{ text: '01001000 01101001 …', role: 'bits' }],
    note: 'Read signals'
  },
  {
    layer: 'L2 · Frame',
    chips: [
      { text: '− MAC', role: 'removed' },
      { text: 'IP', role: 'inner' },
      { text: 'TCP', role: 'inner' },
      { text: '"Hello!"', role: 'data' },
      { text: '− FCS ✓', role: 'removed' }
    ]
  },
  {
    layer: 'L3 · Packet',
    chips: [
      { text: '− IP ✓', role: 'removed' },
      { text: 'TCP', role: 'inner' },
      { text: '"Hello!"', role: 'data' }
    ]
  },
  {
    layer: 'L4 · Segment',
    chips: [
      { text: '− TCP :443 ✓', role: 'removed' },
      { text: '"Hello!"', role: 'data' }
    ]
  },
  {
    layer: 'L7–5 · Data',
    chips: [{ text: '"Hello!"', role: 'data' }],
    note: 'App reads text'
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

/**
 * Renders a static side-by-side example illustrating encapsulation (7 -> 1)
 * and decapsulation (1 -> 7) for a short "Hello!" message.
 */
export function encapsulationExampleVisual() {
  return `
    <section class="perf-examples-grid encap-examples-grid" aria-label="Example of encapsulation and decapsulation">
      <article class="perf-example-card">
        <div class="perf-card-header">
          <span class="perf-card-tag perf-tag-bandwidth">SENDER · ENCAPSULATION (7 → 1)</span>
        </div>
        <h3 class="perf-card-title">Wrapping "Hello!" With Delivery Headers</h3>
        ${renderStepRows(encapSteps)}
      </article>

      <article class="perf-example-card">
        <div class="perf-card-header">
          <span class="perf-card-tag perf-tag-latency">RECEIVER · DECAPSULATION (1 → 7)</span>
        </div>
        <h3 class="perf-card-title">Checking and Stripping Each Wrapper</h3>
        ${renderStepRows(decapSteps)}
      </article>
    </section>
  `;
}

