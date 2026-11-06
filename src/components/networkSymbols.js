import {esc} from './ui.js';

let memoryStyle = 'symbols';

export function getSavedNodeStyle() {
  try {
    return localStorage.getItem('network_node_style') || memoryStyle;
  } catch {
    return memoryStyle;
  }
}

export function setSavedNodeStyle(style) {
  if (!style) return;
  memoryStyle = style;
  try {
    if (localStorage.getItem('network_node_style') !== style) {
      localStorage.setItem('network_node_style', style);
    }
  } catch {
    // Ignore storage quota/permission issues
  }
}

export function getNodeDeviceKind(label, explicitKind) {
  if (explicitKind && explicitKind !== 'node' && explicitKind !== 'device') {
    return explicitKind;
  }
  const l = String(label || '').toLowerCase();
  if (/switch|sw|core|branch/i.test(l)) return 'switch';
  if (/router|gateway|default gw/i.test(l)) return 'router';
  if (/server|resolver|web host|file host/i.test(l)) return 'server';
  if (/printer|print/i.test(l)) return 'printer';
  if (/\bap\b|access point|wireless|wi-fi|wifi/i.test(l)) return 'wireless';
  if (/hub/i.test(l)) return 'hub';
  if (/phone|mobile/i.test(l)) return 'phone';
  if (/pc|computer|desktop|workstation|client|laptop/i.test(l)) return 'computer';
  if (/^[a-e]$/i.test(l)) return 'generic';
  return 'computer';
}

export function getDeviceSymbolSvg(kind, {fill = '#eff6ff', stroke = '#2563eb', isDead = false} = {}) {
  const deadBadge = isDead
    ? `<g transform="translate(19,-14)" aria-label="Device fault">
        <circle cx="0" cy="0" r="7" fill="#dc2626"/>
        <path d="M-3 -3 L3 3 M3 -3 L-3 3" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
       </g>`
    : '';

  switch (kind) {
    case 'switch':
      return `<g class="node-symbol-glyph symbol-switch" transform="translate(0,-3)">
        <!-- Switch chassis -->
        <rect x="-28" y="-14" width="56" height="28" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <!-- Top groove line -->
        <line x1="-28" y1="-2" x2="28" y2="-2" stroke="${stroke}" stroke-width="1" stroke-opacity="0.35"/>
        <!-- Opposing switching arrows (IEEE / Cisco standard) -->
        <path d="M-16 -7 H16 M10 -11 L16 -7 L10 -3" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M16 6 H-16 M-10 2 L-16 6 L-10 10" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        ${deadBadge}
      </g>`;

    case 'router':
      return `<g class="node-symbol-glyph symbol-router" transform="translate(0,-3)">
        <!-- Router circular body -->
        <circle cx="0" cy="0" r="18" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <!-- Four packet routing cross-arrows: two in, two out -->
        <path d="M0 -14 V-5 M-3 -8 L0 -5 L3 -8" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M0 14 V5 M-3 8 L0 5 L3 8" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M-5 0 H-14 M-10 -3 L-14 0 L-10 3" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M5 0 H14 M10 -3 L14 0 L10 3" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        ${deadBadge}
      </g>`;

    case 'server':
      return `<g class="node-symbol-glyph symbol-server" transform="translate(0,-3)">
        <!-- Rack unit chassis -->
        <rect x="-19" y="-17" width="38" height="34" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <!-- Drive bay 1 -->
        <rect x="-14" y="-13" width="28" height="6" rx="1" fill="white" stroke="${stroke}" stroke-width="1"/>
        <circle cx="9" cy="-10" r="1.2" fill="${stroke}"/>
        <!-- Drive bay 2 -->
        <rect x="-14" y="-4" width="28" height="6" rx="1" fill="white" stroke="${stroke}" stroke-width="1"/>
        <circle cx="9" cy="-1" r="1.2" fill="${stroke}"/>
        <!-- Drive bay 3 -->
        <rect x="-14" y="5" width="28" height="6" rx="1" fill="white" stroke="${stroke}" stroke-width="1"/>
        <circle cx="9" cy="8" r="1.2" fill="${stroke}"/>
        ${deadBadge}
      </g>`;

    case 'printer':
      return `<g class="node-symbol-glyph symbol-printer" transform="translate(0,-3)">
        <!-- Paper input tray -->
        <rect x="-12" y="-16" width="24" height="10" rx="1.5" fill="white" stroke="${stroke}" stroke-width="1.5"/>
        <!-- Main body -->
        <rect x="-23" y="-8" width="46" height="21" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <!-- Paper output slot -->
        <line x1="-15" y1="3" x2="15" y2="3" stroke="${stroke}" stroke-width="1.5"/>
        <!-- Printed sheet -->
        <rect x="-10" y="5" width="20" height="9" rx="1" fill="white" stroke="${stroke}" stroke-width="1.2"/>
        <circle cx="15" cy="-2" r="1.5" fill="${stroke}"/>
        ${deadBadge}
      </g>`;

    case 'wireless':
      return `<g class="node-symbol-glyph symbol-wireless" transform="translate(0,-2)">
        <!-- Antennas -->
        <line x1="-12" y1="-2" x2="-16" y2="-15" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>
        <line x1="12" y1="-2" x2="16" y2="-15" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>
        <!-- Device body -->
        <rect x="-22" y="-3" width="44" height="17" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <!-- Radio broadcast waves -->
        <path d="M-6 -9 A 7 7 0 0 1 6 -9" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M-10 -13 A 12 12 0 0 1 10 -13" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round"/>
        <!-- LEDs -->
        <circle cx="-10" cy="5" r="1.5" fill="${stroke}"/>
        <circle cx="-4" cy="5" r="1.5" fill="${stroke}"/>
        <circle cx="2" cy="5" r="1.5" fill="${stroke}"/>
        ${deadBadge}
      </g>`;

    case 'hub':
      return `<g class="node-symbol-glyph symbol-hub" transform="translate(0,-3)">
        <rect x="-26" y="-13" width="52" height="26" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <!-- Single bidirectional shared bus arrow -->
        <path d="M-14 0 H14 M-9 -4 L-14 0 L-9 4 M9 -4 L14 0 L9 4" stroke="${stroke}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        ${deadBadge}
      </g>`;

    case 'phone':
      return `<g class="node-symbol-glyph symbol-phone" transform="translate(0,-3)">
        <rect x="-13" y="-20" width="26" height="40" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <rect x="-9" y="-15" width="18" height="26" rx="1" fill="white" stroke="${stroke}" stroke-width="1"/>
        <circle cx="0" cy="15" r="1.5" fill="${stroke}"/>
        ${deadBadge}
      </g>`;

    case 'generic':
      return `<g class="node-symbol-glyph symbol-generic" transform="translate(0,-3)">
        <circle cx="0" cy="0" r="18" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="0" cy="0" r="10" fill="none" stroke="${stroke}" stroke-width="1.2" stroke-dasharray="3 2" opacity="0.6"/>
        ${deadBadge}
      </g>`;

    case 'computer':
    default:
      return `<g class="node-symbol-glyph symbol-pc" transform="translate(0,-4)">
        <!-- Outer Monitor Bezel -->
        <rect x="-24" y="-18" width="48" height="30" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <!-- Screen display area -->
        <rect x="-20" y="-14" width="40" height="21" rx="1.5" fill="white" stroke="${stroke}" stroke-width="1.2"/>
        <!-- Screen technical prompt graphic -->
        <path d="M-15 -9 L-12 -6 L-15 -3 M-9 -3 H-3" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.75"/>
        <!-- Stand neck -->
        <rect x="-3" y="12" width="6" height="5" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>
        <!-- Stand base -->
        <rect x="-14" y="17" width="28" height="3" rx="1.5" fill="${stroke}"/>
        ${deadBadge}
      </g>`;
  }
}

export function renderTopologyNode({
  x,
  y,
  label,
  kind,
  style = 'symbols',
  status = 'default',
  dataAttrs = ''
}) {
  const isDead = status === 'dead';
  const isActive = status === 'active';
  const isConnected = status === 'connected';
  const isUnreachable = status === 'unreachable';

  const fill = isDead ? '#fee2e2' : isActive ? '#ccfbf1' : isConnected ? '#dbeafe' : isUnreachable ? '#f1f5f9' : '#eff6ff';
  const stroke = isDead ? '#dc2626' : isActive ? '#0d9488' : isConnected ? '#2563eb' : isUnreachable ? '#94a3b8' : '#2563eb';
  const textFill = isDead ? '#991b1b' : '#0f172a';

  if (style === 'boxes') {
    return `<g ${dataAttrs} transform="translate(${x},${y})"><rect x="-53" y="-25" width="106" height="50" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2"/><text y="6" text-anchor="middle" font-size="16" font-weight="500" fill="${textFill}">${esc(label)}</text></g>`;
  }

  const deviceKind = getNodeDeviceKind(label, kind);
  const symbolSvg = getDeviceSymbolSvg(deviceKind, {fill, stroke, isDead});
  const textStr = String(label || '');
  const labelWidth = Math.max(74, Math.min(116, textStr.length * 8.5 + 20));

  return `<g ${dataAttrs} class="topology-symbol-node" transform="translate(${x},${y})">
    <!-- Solid white backdrop to neatly mask connecting lines -->
    <ellipse rx="36" ry="26" fill="white"/>
    ${symbolSvg}
    <!-- Clean legible label pill underneath the symbol -->
    <g class="symbol-label-pill">
      <rect x="${-(labelWidth / 2)}" y="21" width="${labelWidth}" height="20" rx="4" fill="white" stroke="${isDead ? '#fca5a5' : '#cbd5e1'}" stroke-width="1.2"/>
      <text y="35" text-anchor="middle" font-size="13" font-weight="600" fill="${textFill}">${esc(label)}</text>
    </g>
  </g>`;
}
