import {reserveSimulationSpace} from '../components/simulationSpace.js';
import {esc,button,select,result,wire,read,networkSVG} from '../components/ui.js';
import {createStepPlayback} from './playback.js';

export const securityScenarios = [
  {
    id: 'firewall',
    name: 'Unauthorized Inbound Scan & Firewall Defense',
    threat: 'External attacker probes port 22/3389 without authorization.',
    defenseOn: 'Firewall blocks unsolicited inbound packets while allowing established return traffic.',
    defenseOff: 'Unfiltered access reaches open internal ports, exposing the host.',
    labels: ['Internal Host', 'Stateful Firewall', 'External Threat']
  },
  {
    id: 'phishing',
    name: 'Phishing Link & Endpoint Web Filter',
    threat: 'User clicks a deceptive link mimicking a school portal.',
    defenseOn: 'Endpoint protection and browser filter block the fraudulent URL and alert the user.',
    defenseOff: 'Fake portal captures entered credentials and forwards them to the attacker.',
    labels: ['User Browser', 'Endpoint Filter', 'Phishing Server']
  },
  {
    id: 'https',
    name: 'Eavesdropping: Plaintext HTTP vs Encrypted HTTPS/TLS',
    threat: 'Attacker sniffs packets across an unencrypted wireless connection.',
    defenseOn: 'HTTPS with TLS encrypts data in transit into ciphertext (aes-256-gcm); payload is unreadable.',
    defenseOff: 'HTTP transmits user credentials in plain cleartext across the network.',
    labels: ['Client Station', 'TLS Encryption', 'Eavesdropper / Sniffer']
  },
  {
    id: 'dos',
    name: 'Denial of Service (DoS) Flood & Rate Limiting',
    threat: 'High-volume packet flood attempts to exhaust bandwidth and server resources.',
    defenseOn: 'Firewall rate-limiting and connection throttling drop excess floods, preserving valid traffic.',
    defenseOff: 'Flooded server drops legitimate user connections and becomes unavailable.',
    labels: ['Legitimate Client', 'Rate Limiter / WAF', 'DoS Botnet']
  },
  {
    id: 'mfa',
    name: 'Brute-Force Password Attack vs Multi-Factor Auth (MFA)',
    threat: 'Automated dictionary script tries thousands of common passwords.',
    defenseOn: 'Complex passphrases resist dictionary attacks; Multi-Factor Authentication stops logins without the second factor.',
    defenseOff: 'Simple 6-character password is recovered in seconds through automated brute-forcing.',
    labels: ['Account Owner', 'MFA Verification', 'Brute-Force Script']
  }
];

export function security(root) {
  let selected = 0;
  let defenseActive = 'enabled';
  let step = 0;

  const player = createStepPlayback({
    length: () => 3,
    getIndex: () => step,
    setIndex: v => { step = v; },
    render: draw
  });

  function draw() {
    const sc = securityScenarios[selected];
    const isProtected = defenseActive === 'enabled';

    let activeNode = 2;
    if (step === 0) activeNode = 2;
    else if (step === 1) activeNode = 1;
    else activeNode = isProtected ? 1 : 0;

    let detailHtml = '';
    if (sc.id === 'https') {
      detailHtml = `
        <div class="result-grid" style="margin: 12px 0;">
          <div><b>Protocol In Use:</b><br>${isProtected ? 'HTTPS (TLS 1.3 · Port 443)' : 'HTTP (Cleartext · Port 80)'}</div>
          <div><b>Payload Over Wire:</b><br><code class="binary" style="font-size:12px;">${isProtected ? '7f 9a 2b 8c 4d 1e (Encrypted Ciphertext)' : 'user=student&password=SecretPass123!'}</code></div>
        </div>`;
    } else if (sc.id === 'firewall') {
      detailHtml = `
        <div class="result-grid" style="margin: 12px 0;">
          <div><b>Boundary Policy:</b><br>${isProtected ? 'Default Deny (Drop unsolicited incoming)' : 'Default Allow (Unrestricted)'}</div>
          <div><b>State Table Match:</b><br>${isProtected ? 'No outbound session -> Blocked' : 'Bypassed -> Port Connected'}</div>
        </div>`;
    } else if (sc.id === 'dos') {
      detailHtml = `
        <div class="result-grid" style="margin: 12px 0;">
          <div><b>Traffic Rate:</b><br>10,000 SYN packets / sec</div>
          <div><b>Mitigation:</b><br>${isProtected ? 'SYN Cookies & Threshold Rate-Limiting' : 'No Filtering (Resource Exhaustion)'}</div>
        </div>`;
    } else if (sc.id === 'mfa') {
      detailHtml = `
        <div class="result-grid" style="margin: 12px 0;">
          <div><b>Authentication Method:</b><br>${isProtected ? 'Password + Authenticator OTP (MFA)' : 'Single Weak Password'}</div>
          <div><b>Compromise Risk:</b><br>${isProtected ? 'Negligible (Requires physical token)' : 'High (Dictionary match in seconds)'}</div>
        </div>`;
    } else {
      detailHtml = `
        <div class="result-grid" style="margin: 12px 0;">
          <div><b>Protection Engine:</b><br>${isProtected ? 'Active Endpoint Protection & DNS Filter' : 'Protection Disabled'}</div>
          <div><b>Threat Disposition:</b><br>${isProtected ? 'Signature / URL Reputation Quarantine' : 'Payload Executed'}</div>
        </div>`;
    }

    const stepTitles = [
      '1. Threat Event Triggered',
      '2. Threat Encounters Defense Perimeter',
      isProtected ? '3. Threat Mitigated (Protected)' : '3. Security Compromise (Breached)'
    ];

    const stepTexts = [
      `Threat: ${sc.threat}`,
      `Defense State: ${isProtected ? 'Active Protection Engaged' : 'Protective Controls Inactive'}. The event is inspected at the security boundary.`,
      isProtected ? `[DEFENSE SUCCESS] ${sc.defenseOn}` : `[THREAT DETECTED - BREACH] ${sc.threat} ${sc.defenseOff}`
    ];

    root.innerHTML = `
      <div class="control-row">
        ${select('Security scenario', 'scenario', securityScenarios.map((s, i) => [i, s.name]), selected)}
        ${select('Security defense state', 'defense', [['enabled', 'Defenses Active (Protected)'], ['disabled', 'Defenses Disabled (Vulnerable)']], defenseActive)}
        ${button(player.running ? 'Pause simulation' : 'Simulate Threat Event', 'simulate', 'primary')}
        ${button('Previous step', 'previous')}
        ${button('Next step', 'advance')}
        ${button('Reset Scenario', 'reset')}
        ${select('Speed', 'speed', [['0.5', '0.5×'], ['1', '1×'], ['2', '2×']], player.speed)}
      </div>
      ${networkSVG(sc.labels, activeNode, null, activeNode > 0 ? activeNode - 1 : 0, {
        direction: 'reverse',
        badge: step === 0 ? 'Threat Origin' : step === 1 ? 'Inspecting...' : (isProtected ? 'BLOCKED ✓' : 'BREACH !'),
        fault: step === 2 && isProtected
      })}
      ${detailHtml}
      <div class="step-scrubber" role="tablist" aria-label="Simulation steps">
        ${stepTitles.map((title, idx) => `
          <button type="button" class="scrubber-pill ${idx === step ? 'active' : idx < step ? 'completed' : ''}" data-step-jump="${idx}" aria-selected="${idx === step}">
            <span class="scrubber-num">${idx + 1}</span>
            <span class="scrubber-label">${esc(title.replace(/^\d+\.\s*/, ''))}</span>
          </button>
        `).join('')}
      </div>
      <div class="step-card" aria-live="polite">
        <b>Step ${step + 1} / 3 · ${esc(stepTitles[step])} · ${player.status}</b>
        <p>${esc(stepTexts[step])}</p>
      </div>
      ${result(stepTexts[step], isProtected || step < 2)}
      <p class="small">
        <b>Threat:</b> ${esc(sc.threat)}<br>
        <b>Outcome:</b> ${isProtected ? esc(sc.defenseOn) : esc(sc.defenseOff)}
      </p>
      <p class="small">This demonstration is a conceptual instructional model. It illustrates security principles (Confidentiality, Integrity, Availability) without generating real malicious network traffic or modifying local firewall configurations.</p>
    `;

    root.querySelector('[name="scenario"]').onchange = e => {
      selected = Number(e.target.value);
      player.reset();
      draw();
    };

    root.querySelector('[name="defense"]').onchange = e => {
      defenseActive = e.target.value;
      player.reset();
      draw();
    };

    root.querySelector('[name="speed"]').onchange = e => {
      player.setSpeed(e.target.value);
    };

    root.querySelectorAll('[data-step-jump]').forEach(btn => {
      btn.onclick = () => {
        player.pause();
        step = Number(btn.dataset.stepJump);
        draw();
      };
    });

    root.querySelector('[data-action="previous"]').disabled = step === 0;
    root.querySelector('[data-action="advance"]').disabled = step === 2;

    wire(root, {
      simulate: () => {
        if (player.running) {
          player.pause();
          draw();
        } else {
          player.replay();
        }
      },
      previous: () => {
        player.previous();
        draw();
      },
      advance: () => {
        player.next();
        draw();
      },
      reset: () => {
        player.reset();
        draw();
      }
    });
  }

  draw();
  return () => { player.dispose(); };
}

export const firewallPackets = [
  {
    id: 'out_web',
    name: 'Outbound HTTPS Request (LAN Host -> Web Server)',
    direction: 'outbound',
    src: '192.168.1.50:51234',
    dst: '93.184.216.34:443',
    proto: 'TCP',
    description: 'Internal client initiates an outbound web session to an external server.',
    matchedRule: 'Rule 1: ALLOW Outbound LAN -> WAN Any',
    action: 'ALLOW',
    statefulStatus: 'Creates new state table entry (OUTBOUND_SYN_SENT -> ESTABLISHED).',
    statelessStatus: 'Allowed by outbound rule.',
    allowed: true
  },
  {
    id: 'in_reply',
    name: 'Inbound Web Server Return Packet (External Web -> LAN Host)',
    direction: 'inbound',
    src: '93.184.216.34:443',
    dst: '192.168.1.50:51234',
    proto: 'TCP',
    description: 'Return packet containing requested web page data for the internal client.',
    matchedRule: 'Rule 2: ALLOW Inbound Established / Related Connections',
    action: 'ALLOW',
    statefulStatus: 'Matched active state table connection: permitted through to LAN host.',
    statelessStatus: 'Stateless filter lacks connection memory: DROPPED unless an explicit inbound port rule exists!',
    allowedStateful: true,
    allowedStateless: false
  },
  {
    id: 'in_ssh',
    name: 'Inbound Unsolicited SSH Probe (Attacker -> Internal Host Port 22)',
    direction: 'inbound',
    src: '203.0.113.88:49152',
    dst: '192.168.1.50:22',
    proto: 'TCP',
    description: 'External scanning tool attempts unauthorized administrative login over SSH.',
    matchedRule: 'Rule 4: DENY & LOG Inbound Management (Port 22/3389)',
    action: 'DROP',
    statefulStatus: 'No existing state found; explicitly matches Rule 4 deny list. Packet dropped.',
    statelessStatus: 'Explicitly matches Rule 4 deny list. Packet dropped.',
    allowed: false
  },
  {
    id: 'in_rdp',
    name: 'Inbound Remote Desktop Probe (Attacker -> Internal Host Port 3389)',
    direction: 'inbound',
    src: '198.51.100.4:53120',
    dst: '192.168.1.50:3389',
    proto: 'TCP',
    description: 'External attacker probes for open Windows Remote Desktop access.',
    matchedRule: 'Rule 4: DENY & LOG Inbound Management (Port 22/3389)',
    action: 'DROP',
    statefulStatus: 'No active session; matches Rule 4 deny. Connection blocked and logged.',
    statelessStatus: 'Matches Rule 4 deny. Connection blocked.',
    allowed: false
  },
  {
    id: 'in_ping',
    name: 'Inbound Ping Sweep (Attacker -> Router WAN IP)',
    direction: 'inbound',
    src: '203.0.113.88',
    dst: '203.0.113.1',
    proto: 'ICMP',
    description: 'External attacker sends ICMP Echo Request to locate live network hosts.',
    matchedRule: 'Rule 5: DEFAULT DROP Unsolicited Inbound',
    action: 'DROP',
    statefulStatus: 'No matching permit rule; dropped by implicit default deny policy.',
    statelessStatus: 'Dropped by default deny filter.',
    allowed: false
  }
];

export function securityFirewall(root) {
  let selected = 0;
  let mode = 'stateful';
  let step = 0;

  const player = createStepPlayback({
    length: () => 4,
    getIndex: () => step,
    setIndex: v => { step = v; },
    render: draw
  });

  function draw() {
    const pkt = firewallPackets[selected];
    const isAllowed = mode === 'stateful'
      ? (pkt.allowed !== undefined ? pkt.allowed : pkt.allowedStateful)
      : (pkt.allowed !== undefined ? pkt.allowed : pkt.allowedStateless);

    let activeNode = 1;
    if (step === 0) {
      activeNode = pkt.direction === 'outbound' ? 2 : 0;
    } else if (step === 1 || step === 2) {
      activeNode = 1;
    } else {
      activeNode = isAllowed ? (pkt.direction === 'outbound' ? 0 : 2) : 1;
    }

    const labels = ['External / Internet', 'Stateful Firewall', 'Internal Protected Host'];

    const stepTitles = [
      '1. Packet Generated at Origin',
      '2. Arrival at Security Perimeter',
      '3. Sequential Rule Inspection',
      isAllowed ? '4. Action: PERMIT & FORWARD' : '4. Action: DENY & DROP'
    ];

    const stepTexts = [
      pkt.direction === 'outbound'
        ? `Protected host initiates an outbound ${pkt.proto} packet (${pkt.src} → ${pkt.dst}).`
        : `External source generates an inbound ${pkt.proto} packet (${pkt.src} → ${pkt.dst}) targeting the network.`,
      `Packet arrives at the firewall interface. Headers (IP, protocol, port) are extracted for stateful inspection.`,
      `Evaluating rules top-to-bottom. Matched rule: "${pkt.matchedRule}". Mode: ${mode === 'stateful' ? 'Stateful table checked for established connection' : 'Stateless ACL match only'}.`,
      isAllowed
        ? `[FIREWALL: PERMIT] ${pkt.name} is ALLOWED. ${mode === 'stateful' ? pkt.statefulStatus : pkt.statelessStatus}`
        : `[FIREWALL: DROP] ${pkt.name} is DROPPED. ${mode === 'stateful' ? pkt.statefulStatus : pkt.statelessStatus}`
    ];

    const rulesHtml = `
      <div class="result-grid" style="margin: 12px 0; font-size: 13px;">
        <div style="grid-column: 1 / -1;">
          <b>Active Firewall Ruleset (Evaluated Top-to-Bottom):</b>
          <div style="font-family: monospace; background: var(--bg-surface, #f8fafc); padding: 8px; border-radius: 6px; margin-top: 4px; line-height: 1.5;">
            <div style="${step >= 2 && pkt.matchedRule.includes('Rule 1') ? 'color: #16a34a; font-weight: 700; background: #dcfce7; padding: 2px 4px; border-radius: 4px;' : ''}">1. [ALLOW] Outbound LAN -> WAN Any</div>
            <div style="${step >= 2 && pkt.matchedRule.includes('Rule 2') ? 'color: #16a34a; font-weight: 700; background: #dcfce7; padding: 2px 4px; border-radius: 4px;' : ''}">2. [ALLOW] Inbound Established & Related State</div>
            <div style="${step >= 2 && pkt.matchedRule.includes('Rule 3') ? 'color: #16a34a; font-weight: 700; background: #dcfce7; padding: 2px 4px; border-radius: 4px;' : ''}">3. [ALLOW] Inbound TCP 443 -> DMZ Web Server</div>
            <div style="${step >= 2 && pkt.matchedRule.includes('Rule 4') ? 'color: #dc2626; font-weight: 700; background: #fee2e2; padding: 2px 4px; border-radius: 4px;' : ''}">4. [DENY]  Inbound TCP 22, 3389 (Remote Management)</div>
            <div style="${step >= 2 && pkt.matchedRule.includes('Rule 5') ? 'color: #dc2626; font-weight: 700; background: #fee2e2; padding: 2px 4px; border-radius: 4px;' : ''}">5. [DROP]  Inbound Default Deny (Implicit Drop)</div>
          </div>
        </div>
        <div><b>Evaluated Packet:</b><br>${esc(pkt.proto)} ${esc(pkt.src)} &rarr; ${esc(pkt.dst)}</div>
        <div><b>Matched Rule:</b><br>${step >= 2 ? esc(pkt.matchedRule) : 'Awaiting inspection...'}</div>
      </div>
    `;

    root.innerHTML = `
      <div class="control-row">
        ${select('Select test packet', 'packet', firewallPackets.map((p, i) => [i, p.name]), selected)}
        ${select('Firewall mode', 'mode', [['stateful', 'Stateful Inspection (Connection Tracking)'], ['stateless', 'Stateless Packet Filter (ACLs only)']], mode)}
        ${button(player.running ? 'Pause simulation' : 'Start Simulation', 'evaluate', 'primary')}
        ${button('Previous step', 'previous')}
        ${button('Next step', 'advance')}
        ${button('Reset', 'reset')}
        ${select('Speed', 'speed', [['0.5', '0.5×'], ['1', '1×'], ['2', '2×']], player.speed)}
      </div>
      ${networkSVG(labels, activeNode, null, activeNode > 0 ? activeNode - 1 : 0, {
        direction: pkt.direction === 'outbound' ? 'reverse' : 'forward',
        badge: `${pkt.proto} ${step === 3 ? (isAllowed ? 'PERMIT ✓' : 'DROP ✕') : ''}`,
        fault: step === 3 && !isAllowed
      })}
      ${rulesHtml}
      <div class="step-scrubber" role="tablist" aria-label="Firewall inspection steps">
        ${stepTitles.map((title, idx) => `
          <button type="button" class="scrubber-pill ${idx === step ? 'active' : idx < step ? 'completed' : ''}" data-step-jump="${idx}" aria-selected="${idx === step}">
            <span class="scrubber-num">${idx + 1}</span>
            <span class="scrubber-label">${esc(title.replace(/^\d+\.\s*/, ''))}</span>
          </button>
        `).join('')}
      </div>
      <div class="step-card" aria-live="polite">
        <b>Step ${step + 1} / 4 · ${esc(stepTitles[step])} · ${player.status}</b>
        <p>${esc(stepTexts[step])}</p>
      </div>
      ${result(stepTexts[step], step < 3 || isAllowed)}
      <p class="small">
        <b>Packet Details:</b> ${esc(pkt.description)}<br>
        <b>Inspection Insight:</b> ${mode === 'stateful'
          ? 'Stateful firewalls remember outgoing requests so matching response packets pass through automatically without opening permanent incoming ports.'
          : 'Stateless filters check each packet in isolation, failing to recognize return traffic from legitimate outgoing requests.'}
      </p>
      <p class="small">This demonstration is a conceptual instructional model. It illustrates packet filtering and stateful inspection without modifying local host firewalls or generating real network traffic.</p>
    `;

    root.querySelector('[name="packet"]').onchange = e => {
      selected = Number(e.target.value);
      player.reset();
      draw();
    };

    root.querySelector('[name="mode"]').onchange = e => {
      mode = e.target.value;
      player.reset();
      draw();
    };

    root.querySelector('[name="speed"]').onchange = e => {
      player.setSpeed(e.target.value);
    };

    root.querySelectorAll('[data-step-jump]').forEach(btn => {
      btn.onclick = () => {
        player.pause();
        step = Number(btn.dataset.stepJump);
        draw();
      };
    });

    root.querySelector('[data-action="previous"]').disabled = step === 0;
    root.querySelector('[data-action="advance"]').disabled = step === 3;

    wire(root, {
      evaluate: () => {
        if (player.running) {
          player.pause();
          draw();
        } else {
          player.replay();
        }
      },
      previous: () => {
        player.previous();
        draw();
      },
      advance: () => {
        player.next();
        draw();
      },
      reset: () => {
        player.reset();
        draw();
      }
    });
  }

  draw();
  return () => { player.dispose(); };
}
