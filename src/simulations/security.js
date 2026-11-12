import {reserveSimulationSpace} from '../components/simulationSpace.js';
import {esc,button,select,result,wire,read,networkSVG} from '../components/ui.js';

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
  let simulationState = 'idle'; // 'idle', 'simulating', 'resolved'
  let log = 'Select a security scenario and test defense mechanisms against common threats.';

  function draw() {
    const sc = securityScenarios[selected];
    const isProtected = defenseActive === 'enabled';

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

    root.innerHTML = `
      <div class="control-row">
        ${select('Security scenario', 'scenario', securityScenarios.map((s, i) => [i, s.name]), selected)}
        ${select('Security defense state', 'defense', [['enabled', 'Defenses Active (Protected)'], ['disabled', 'Defenses Disabled (Vulnerable)']], defenseActive)}
        ${button('Simulate Threat Event', 'simulate', 'primary')}
        ${button('Reset Scenario', 'reset')}
      </div>
      ${networkSVG(sc.labels, simulationState === 'idle' ? 0 : simulationState === 'simulating' ? 1 : isProtected ? 1 : 0)}
      ${detailHtml}
      ${result(log, isProtected || simulationState === 'idle')}
      <p class="small">
        <b>Threat:</b> ${esc(sc.threat)}<br>
        <b>Outcome:</b> ${isProtected ? esc(sc.defenseOn) : esc(sc.defenseOff)}
      </p>
      <p class="small">This demonstration is a conceptual instructional model. It illustrates security principles (Confidentiality, Integrity, Availability) without generating real malicious network traffic or modifying local firewall configurations.</p>
    `;

    root.querySelector('[name="scenario"]').onchange = e => {
      selected = Number(e.target.value);
      simulationState = 'idle';
      log = `Scenario changed to "${securityScenarios[selected].name}". Test threat with defense active or disabled.`;
      draw();
    };

    root.querySelector('[name="defense"]').onchange = e => {
      defenseActive = e.target.value;
      simulationState = 'idle';
      log = `Defense state updated: ${defenseActive === 'enabled' ? 'Protected' : 'Vulnerable'}.`;
      draw();
    };

    wire(root, {
      simulate: () => {
        simulationState = 'resolved';
        if (isProtected) {
          log = `[DEFENSE SUCCESS] ${sc.defenseOn}`;
        } else {
          log = `[THREAT DETECTED - BREACH] ${sc.threat} ${sc.defenseOff}`;
        }
        draw();
      },
      reset: () => {
        simulationState = 'idle';
        log = 'Scenario reset. Choose a scenario or toggle defense state.';
        draw();
      }
    });
  }

  draw();
  return () => {};
}

const firewallPackets = [
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
  let evaluated = false;

  function draw() {
    const pkt = firewallPackets[selected];
    const isAllowed = mode === 'stateful'
      ? (pkt.allowed !== undefined ? pkt.allowed : pkt.allowedStateful)
      : (pkt.allowed !== undefined ? pkt.allowed : pkt.allowedStateless);

    let activeNode = 1;
    if (!evaluated) {
      activeNode = pkt.direction === 'outbound' ? 2 : 0;
    } else {
      if (isAllowed) {
        activeNode = pkt.direction === 'outbound' ? 0 : 2;
      } else {
        activeNode = 1;
      }
    }

    const labels = ['External / Internet', 'Stateful Firewall', 'Internal Protected Host'];

    const rulesHtml = `
      <div class="result-grid" style="margin: 12px 0; font-size: 13px;">
        <div style="grid-column: 1 / -1;">
          <b>Active Firewall Ruleset (Evaluated Top-to-Bottom):</b>
          <div style="font-family: monospace; background: var(--bg-surface, #f8fafc); padding: 8px; border-radius: 6px; margin-top: 4px; line-height: 1.5;">
            <div>1. [ALLOW] Outbound LAN -> WAN Any</div>
            <div>2. [ALLOW] Inbound Established & Related State</div>
            <div>3. [ALLOW] Inbound TCP 443 -> DMZ Web Server</div>
            <div>4. [DENY]  Inbound TCP 22, 3389 (Remote Management)</div>
            <div>5. [DROP]  Inbound Default Deny (Implicit Drop)</div>
          </div>
        </div>
        <div><b>Evaluated Packet:</b><br>${esc(pkt.proto)} ${esc(pkt.src)} &rarr; ${esc(pkt.dst)}</div>
        <div><b>Matched Rule:</b><br>${evaluated ? esc(pkt.matchedRule) : 'Awaiting inspection...'}</div>
      </div>
    `;

    const statusText = evaluated
      ? (isAllowed
        ? `[FIREWALL: PERMIT] ${pkt.name} is ALLOWED. ${mode === 'stateful' ? pkt.statefulStatus : pkt.statelessStatus}`
        : `[FIREWALL: DROP] ${pkt.name} is DROPPED. ${mode === 'stateful' ? pkt.statefulStatus : pkt.statelessStatus}`)
      : `Select a packet and inspection mode, then click "Evaluate Firewall Rules".`;

    root.innerHTML = `
      <div class="control-row">
        ${select('Select test packet', 'packet', firewallPackets.map((p, i) => [i, p.name]), selected)}
        ${select('Firewall mode', 'mode', [['stateful', 'Stateful Inspection (Connection Tracking)'], ['stateless', 'Stateless Packet Filter (ACLs only)']], mode)}
        ${button('Evaluate Firewall Rules', 'evaluate', 'primary')}
        ${button('Reset', 'reset')}
      </div>
      ${networkSVG(labels, activeNode)}
      ${rulesHtml}
      ${result(statusText, !evaluated || isAllowed)}
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
      evaluated = false;
      draw();
    };

    root.querySelector('[name="mode"]').onchange = e => {
      mode = e.target.value;
      evaluated = false;
      draw();
    };

    wire(root, {
      evaluate: () => {
        evaluated = true;
        draw();
      },
      reset: () => {
        evaluated = false;
        draw();
      }
    });
  }

  draw();
  return () => {};
}
