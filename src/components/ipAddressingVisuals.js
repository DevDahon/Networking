export function ipClassesVisual() {
  const rows = [
    ['Class A', '0', '0.0.0.0 – 127.255.255.255', 'N.H.H.H', '255.0.0.0 (/8)', '126 nets / 16,777,214 hosts'],
    ['Class B', '10', '128.0.0.0 – 191.255.255.255', 'N.N.H.H', '255.255.0.0 (/16)', '16,384 nets / 65,534 hosts'],
    ['Class C', '110', '192.0.0.0 – 223.255.255.255', 'N.N.N.H', '255.255.255.0 (/24)', '2,097,152 nets / 254 hosts'],
    ['Class D', '1110', '224.0.0.0 – 239.255.255.255', 'Multicast', 'N/A', 'Group / Multicast routing'],
    ['Class E', '1111', '240.0.0.0 – 255.255.255.255', 'Experimental', 'N/A', 'Research & development']
  ];
  return `
    <div class="ip-visual-card" role="region" aria-label="IPv4 address classes A through E reference">
      <div class="ip-visual-title">Classful Priority Bits, Octet Format &amp; Default Masks</div>
      <table class="ip-visual-table">
        <thead>
          <tr><th>Class</th><th>Priority Bits</th><th>Range</th><th>Format</th><th>Default Mask</th><th>Networks / Hosts</th></tr>
        </thead>
        <tbody>
          ${rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="ip-td-strong"' : i === 1 ? ' class="ip-td-code"' : ''}>${c}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
      <p class="ip-visual-note">Note: In Class A, <code>0.x.x.x</code> and <code>127.x.x.x</code> (loopback) are reserved, leaving <code>2⁷ − 2 = 126</code> assignable networks.</p>
    </div>
  `;
}

export function subnetComparisonVisual() {
  return `
    <div class="ip-compare-grid" role="region" aria-label="Without subnetting versus with subnetting">
      <article class="ip-compare-card ip-compare-warn">
        <div class="ip-compare-badge">WITHOUT SUBNETTING</div>
        <h4>One Large Flat Broadcast Domain</h4>
        <svg viewBox="0 0 360 120" class="ip-compare-svg" role="img" aria-label="Flat unsegmented 18.0.0.0/24 network">
          <rect x="8" y="8" width="344" height="104" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
          <rect x="136" y="42" width="88" height="34" rx="6" fill="#ffffff" stroke="#dc2626" stroke-width="1.8"/>
          <text x="180" y="63" text-anchor="middle" font-size="11" font-weight="700" fill="#991b1b">Single Switch</text>
          <rect x="24" y="18" width="84" height="24" rx="4" fill="#ffffff" stroke="#94a3b8"/>
          <text x="66" y="34" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">Dept 1 PC</text>
          <rect x="24" y="76" width="84" height="24" rx="4" fill="#ffffff" stroke="#94a3b8"/>
          <text x="66" y="92" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">Dept 2 PC</text>
          <rect x="252" y="18" width="84" height="24" rx="4" fill="#ffffff" stroke="#94a3b8"/>
          <text x="294" y="34" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">Dept 1 PC</text>
          <rect x="252" y="76" width="84" height="24" rx="4" fill="#ffffff" stroke="#94a3b8"/>
          <text x="294" y="92" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">Dept 2 PC</text>
          <line x1="108" y1="30" x2="136" y2="54" stroke="#dc2626" stroke-width="1.6"/>
          <line x1="108" y1="88" x2="136" y2="64" stroke="#dc2626" stroke-width="1.6"/>
          <line x1="252" y1="30" x2="224" y2="54" stroke="#dc2626" stroke-width="1.6"/>
          <line x1="252" y1="88" x2="224" y2="64" stroke="#dc2626" stroke-width="1.6"/>
        </svg>
        <p>All departments share one subnet (<code>18.0.0.0/24</code>), spreading heavy broadcast traffic everywhere and wasting IP blocks.</p>
      </article>
      <article class="ip-compare-card ip-compare-ok">
        <div class="ip-compare-badge">WITH SUBNETTING</div>
        <h4>Separated Departmental Subnets</h4>
        <svg viewBox="0 0 360 120" class="ip-compare-svg" role="img" aria-label="Router separating Department 1 and Department 2 subnets">
          <rect x="8" y="8" width="128" height="104" rx="8" fill="#ecfdf5" stroke="#6ee7b7" stroke-width="1.5"/>
          <text x="72" y="25" text-anchor="middle" font-size="10.5" font-weight="700" fill="#065f46">Dept 1 · 18.0.1.0/24</text>
          <rect x="22" y="46" width="100" height="30" rx="5" fill="#ffffff" stroke="#0d9488" stroke-width="1.6"/>
          <text x="72" y="65" text-anchor="middle" font-size="10.5" font-weight="600" fill="#0f172a">Dept 1 Hosts</text>
          <circle cx="180" cy="60" r="24" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
          <text x="180" y="64" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1d4ed8">Router</text>
          <rect x="224" y="8" width="128" height="104" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5"/>
          <text x="288" y="25" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1e40af">Dept 2 · 18.0.3.0/24</text>
          <rect x="238" y="46" width="100" height="30" rx="5" fill="#ffffff" stroke="#2563eb" stroke-width="1.6"/>
          <text x="288" y="65" text-anchor="middle" font-size="10.5" font-weight="600" fill="#0f172a">Dept 2 Hosts</text>
          <line x1="122" y1="60" x2="156" y2="60" stroke="#0d9488" stroke-width="2"/>
          <line x1="204" y1="60" x2="238" y2="60" stroke="#2563eb" stroke-width="2"/>
        </svg>
        <p>Broadcasts stay inside each subnet, IPs fit actual group sizes, and the router enforces access policies between departments.</p>
      </article>
    </div>
  `;
}

export function cidrCheatsheetVisual() {
  const rows = [
    ['/24', '255.255.255.0', '1', '256', '254 usable'],
    ['/25', '255.255.255.128', '2', '128', '126 usable'],
    ['/26', '255.255.255.192', '4', '64', '62 usable'],
    ['/27', '255.255.255.224', '8', '32', '30 usable'],
    ['/28', '255.255.255.240', '16', '16', '14 usable'],
    ['/29', '255.255.255.248', '32', '8', '6 usable'],
    ['/30', '255.255.255.252', '64', '4', '2 usable (P2P)']
  ];
  return `
    <div class="ip-visual-card" role="region" aria-label="CIDR notation and /24 to /30 subnetting cheatsheet">
      <div class="ip-visual-title">CIDR Notation &amp; /24–/30 Subnetting Cheatsheet</div>
      <table class="ip-visual-table">
        <thead>
          <tr><th>CIDR</th><th>Subnet Mask</th><th>Subnets</th><th>Block Size</th><th>Usable Hosts</th></tr>
        </thead>
        <tbody>
          ${rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="ip-td-strong"' : i === 1 ? ' class="ip-td-code"' : ''}>${c}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
      <p class="ip-visual-note">Also standard defaults: <code>/8</code> (255.0.0.0 · 16,777,214 hosts) &amp; <code>/16</code> (255.255.0.0 · 65,534 hosts).</p>
    </div>
  `;
}
