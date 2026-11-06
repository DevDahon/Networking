import {esc} from './ui.js';
import {T568A,T568B} from '../utils/network.js';

const wireColors={
 'Green':'#16a34a',
 'Orange':'#ea580c',
 'Blue':'#2563eb',
 'Brown':'#854d0e',
 'White/Green':'url(#stripe-green)',
 'White/Orange':'url(#stripe-orange)',
 'White/Blue':'url(#stripe-blue)',
 'White/Brown':'url(#stripe-brown)'
};

const wireShortNames={
 'White/Green':'W-GRN',
 'Green':'GRN',
 'White/Orange':'W-ORG',
 'Orange':'ORG',
 'White/Blue':'W-BLU',
 'Blue':'BLU',
 'White/Brown':'W-BRN',
 'Brown':'BRN'
};

export function rj45Patterns(){
 return `
  <defs>
   <pattern id="stripe-orange" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
    <line x1="0" y1="0" x2="0" y2="8" stroke="#ea580c" stroke-width="4"/>
    <line x1="4" y1="0" x2="4" y2="8" stroke="#ffffff" stroke-width="4"/>
   </pattern>
   <pattern id="stripe-green" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
    <line x1="0" y1="0" x2="0" y2="8" stroke="#16a34a" stroke-width="4"/>
    <line x1="4" y1="0" x2="4" y2="8" stroke="#ffffff" stroke-width="4"/>
   </pattern>
   <pattern id="stripe-blue" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
    <line x1="0" y1="0" x2="0" y2="8" stroke="#2563eb" stroke-width="4"/>
    <line x1="4" y1="0" x2="4" y2="8" stroke="#ffffff" stroke-width="4"/>
   </pattern>
   <pattern id="stripe-brown" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
    <line x1="0" y1="0" x2="0" y2="8" stroke="#854d0e" stroke-width="4"/>
    <line x1="4" y1="0" x2="4" y2="8" stroke="#ffffff" stroke-width="4"/>
   </pattern>
  </defs>
 `;
}

export function connectorOrientationSVG(){
 return `
  <div class="rj45-schematic-wrap">
   <div class="rj45-schematic-label">
    <span class="eyebrow">CONNECTOR ORIENTATION</span>
    <p class="rj45-schematic-title">Contact Side vs. Latch Side</p>
   </div>
   <svg class="rj45-schematic-svg" viewBox="0 0 460 340" role="img" aria-label="RJ45 Front Contact View vs Latch-Facing View">
    ${rj45Patterns()}
    <!-- Standard Contact View -->
    <g transform="translate(10, 15)">
     <rect x="0" y="0" width="440" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
     <rect x="12" y="10" width="130" height="20" rx="4" fill="#eff6ff"/>
     <text x="77" y="24" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8" letter-spacing="0.05em">STANDARD REFERENCE</text>

     <!-- Connector body -->
     <g transform="translate(24, 40)">
      <!-- Housing outline -->
      <rect x="0" y="0" width="220" height="74" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- Latch outline behind (dashed) -->
      <path d="M75 0 L75 -12 L145 -12 L145 0" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 3"/>
      <text x="110" y="-16" text-anchor="middle" font-size="9" fill="#64748b">Latch Behind (Hidden)</text>
      <!-- 8 Gold pins -->
      ${Array.from({length:8},(_,i)=>`
       <rect x="${14+i*24}" y="6" width="16" height="26" rx="2" fill="#fef3c7" stroke="#b45309" stroke-width="1.2"/>
       <text x="${22+i*24}" y="23" text-anchor="middle" font-size="10" font-weight="700" fill="#78350f">${i+1}</text>
      `).join('')}
      <!-- Conductor entry channels -->
      ${Array.from({length:8},(_,i)=>`
       <rect x="${17+i*24}" y="36" width="10" height="26" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1"/>
      `).join('')}
      <!-- Cable jacket -->
      <rect x="25" y="66" width="170" height="18" rx="3" fill="#64748b"/>
     </g>

     <!-- Explanatory note -->
     <g transform="translate(265, 46)">
      <text x="0" y="14" font-size="12" font-weight="700" fill="#0f172a">Front Contact View</text>
      <text x="0" y="32" font-size="11" fill="#475569">Contacts facing you.</text>
      <text x="0" y="48" font-size="11" fill="#475569">Cable enters downward.</text>
      <rect x="0" y="60" width="160" height="24" rx="4" fill="#ecfdf5" stroke="#a7f3d0"/>
      <text x="80" y="76" text-anchor="middle" font-size="11" font-weight="700" fill="#065f46">&#10003; Pin 1 is on the LEFT</text>
     </g>
    </g>

    <!-- Inverted Latch View -->
    <g transform="translate(10, 175)">
     <rect x="0" y="0" width="440" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
     <rect x="12" y="10" width="140" height="20" rx="4" fill="#fef2f2"/>
     <text x="82" y="24" text-anchor="middle" font-size="10" font-weight="700" fill="#b91c1c" letter-spacing="0.05em">INVERTED PERSPECTIVE</text>

     <!-- Connector body inverted -->
     <g transform="translate(24, 46)">
      <rect x="0" y="0" width="220" height="74" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <!-- Prominent Latch tab facing viewer -->
      <path d="M75 10 L75 70 L95 70 L85 20 L135 20 L125 70 L145 70 L145 10 Z" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
      <text x="110" y="44" text-anchor="middle" font-size="9" font-weight="600" fill="#475569">Latch Tab Visible</text>
      <!-- Cable jacket -->
      <rect x="25" y="70" width="170" height="18" rx="3" fill="#94a3b8"/>
     </g>

     <!-- Explanatory note -->
     <g transform="translate(265, 46)">
      <text x="0" y="14" font-size="12" font-weight="700" fill="#0f172a">Latch Facing You</text>
      <text x="0" y="32" font-size="11" fill="#475569">Tab faces viewer.</text>
      <text x="0" y="48" font-size="11" fill="#475569">Contacts underneath.</text>
      <rect x="0" y="60" width="160" height="24" rx="4" fill="#fff7ed" stroke="#fed7aa"/>
      <text x="80" y="76" text-anchor="middle" font-size="11" font-weight="700" fill="#c2410c">Pin 1 is on the RIGHT</text>
     </g>
    </g>
   </svg>
  </div>
 `;
}

export function rj45PlugColorSVG(standard='B'){
 const pinColors=standard==='A'?T568A:T568B;
 const pairs=standard==='A'
  ?[{name:'Pair 3 (Green)',pins:'Pins 1 & 2',col:'#16a34a'},{name:'Pair 2 (Orange)',pins:'Pins 3 & 6',col:'#ea580c'},{name:'Pair 1 (Blue)',pins:'Pins 4 & 5',col:'#2563eb'},{name:'Pair 4 (Brown)',pins:'Pins 7 & 8',col:'#854d0e'}]
  :[{name:'Pair 2 (Orange)',pins:'Pins 1 & 2',col:'#ea580c'},{name:'Pair 3 (Green)',pins:'Pins 3 & 6',col:'#16a34a'},{name:'Pair 1 (Blue)',pins:'Pins 4 & 5',col:'#2563eb'},{name:'Pair 4 (Brown)',pins:'Pins 7 & 8',col:'#854d0e'}];

 return `
  <div class="rj45-schematic-wrap">
   <div class="rj45-schematic-label">
    <span class="eyebrow">WIRING SCHEMATIC · T568${standard}</span>
    <p class="rj45-schematic-title">8P8C Conductor Positions (Contact View)</p>
   </div>
   <svg class="rj45-schematic-svg" viewBox="0 0 460 380" role="img" aria-label="T568${standard} RJ45 Plug Pinout Diagram">
    ${rj45Patterns()}
    <!-- Outer Plug Housing -->
    <rect x="20" y="10" width="420" height="280" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>

    <!-- Housing top rim -->
    <rect x="35" y="18" width="390" height="34" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>

    <!-- 8 Gold Pins and Conductors -->
    ${pinColors.map((colorName,i)=>{
     const x=48+i*46;
     const fill=wireColors[colorName];
     const shortName=wireShortNames[colorName];
     return `
      <!-- Gold contact pin -->
      <rect x="${x}" y="22" width="28" height="26" rx="2" fill="#fef3c7" stroke="#b45309" stroke-width="1.2"/>
      <text x="${x+14}" y="39" text-anchor="middle" font-size="11" font-weight="700" fill="#78350f">${i+1}</text>
      <!-- Wire channel -->
      <rect x="${x+3}" y="56" width="22" height="110" rx="2" fill="${fill}" stroke="#64748b" stroke-width="1"/>
      <!-- Conductor label -->
      <text x="${x+14}" y="180" text-anchor="middle" font-size="9" font-weight="700" fill="#334155">${esc(shortName)}</text>
     `;
    }).join('')}

    <!-- Strain Relief Bar -->
    <rect x="50" y="196" width="360" height="18" rx="3" fill="#e2e8f0" stroke="#cbd5e1"/>
    <text x="230" y="209" text-anchor="middle" font-size="10" font-weight="600" fill="#64748b">Jacket Under Strain Relief Notch</text>

    <!-- Cable Jacket -->
    <rect x="80" y="222" width="300" height="38" rx="6" fill="#475569"/>
    <text x="230" y="246" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">4-Pair Category UTP Cable</text>

    <!-- Pair Grouping Summary Bar -->
    <g transform="translate(20, 305)">
     <rect x="0" y="0" width="420" height="65" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
     <text x="14" y="18" font-size="10" font-weight="700" fill="#64748b" letter-spacing="0.06em">TWISTED PAIR ASSIGNMENTS (T568${standard}):</text>
     ${pairs.map((p,idx)=>{
      const colX=14+(idx%2)*205;
      const rowY=34+Math.floor(idx/2)*20;
      return `
       <circle cx="${colX+5}" cy="${rowY-3}" r="4" fill="${p.col}"/>
       <text x="${colX+14}" y="${rowY}" font-size="10" font-weight="600" fill="#334155">${esc(p.name)}: <tspan font-weight="700" fill="#0f172a">${esc(p.pins)}</tspan></text>
      `;
     }).join('')}
    </g>
   </svg>
  </div>
 `;
}

export function straightVsCrossoverVisualSVG(){
 return `
  <div class="rj45-schematic-wrap">
   <div class="rj45-schematic-label">
    <span class="eyebrow">WIRING SCHEMATIC · CABLE TYPES</span>
    <p class="rj45-schematic-title">Straight-Through vs. Crossover Pinout</p>
   </div>
   <svg class="rj45-schematic-svg" viewBox="0 0 460 380" role="img" aria-label="Straight-Through vs Crossover Pinout Diagram">
    ${rj45Patterns()}
    <!-- Straight Through Box (Top) -->
    <g transform="translate(10, 10)">
     <rect x="0" y="0" width="440" height="165" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
     <rect x="12" y="10" width="220" height="20" rx="4" fill="#eff6ff"/>
     <text x="122" y="24" text-anchor="middle" font-size="10" font-weight="700" fill="#1d4ed8" letter-spacing="0.05em">STRAIGHT-THROUGH (T568B &rarr; T568B)</text>
     <text x="320" y="24" text-anchor="middle" font-size="10" fill="#64748b">Host to Switch / Switch to Router</text>

     <!-- End 1 pins -->
     <g transform="translate(30, 42)">
      <text x="0" y="0" font-size="10" font-weight="700" fill="#475569">End 1 (B)</text>
      ${T568B.map((c,i)=>`
       <rect x="0" y="${8+i*13}" width="16" height="9" rx="1.5" fill="${wireColors[c]}" stroke="#64748b" stroke-width="0.8"/>
       <text x="20" y="${16+i*13}" font-size="9" font-weight="700" fill="#0f172a">${i+1}</text>
      `).join('')}
     </g>

     <!-- Parallel Lines -->
     <g stroke-width="1.8">
      ${T568B.map((c,i)=>`
       <line x1="65" y1="${54+i*13}" x2="350" y2="${54+i*13}" stroke="${wireColors[c]}" stroke-dasharray="${c.startsWith('White')?'3 2':'none'}"/>
      `).join('')}
     </g>

     <!-- End 2 pins -->
     <g transform="translate(365, 42)">
      <text x="5" y="0" font-size="10" font-weight="700" fill="#475569">End 2 (B)</text>
      ${T568B.map((c,i)=>`
       <text x="0" y="${16+i*13}" font-size="9" font-weight="700" fill="#0f172a">${i+1}</text>
       <rect x="12" y="${8+i*13}" width="16" height="9" rx="1.5" fill="${wireColors[c]}" stroke="#64748b" stroke-width="0.8"/>
      `).join('')}
     </g>
    </g>

    <!-- Crossover Box (Bottom) -->
    <g transform="translate(10, 185)">
     <rect x="0" y="0" width="440" height="185" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
     <rect x="12" y="10" width="220" height="20" rx="4" fill="#f0fdfa"/>
     <text x="122" y="24" text-anchor="middle" font-size="10" font-weight="700" fill="#0f766e" letter-spacing="0.05em">CROSSOVER (T568A &rarr; T568B)</text>
     <text x="325" y="24" text-anchor="middle" font-size="10" fill="#64748b">Switch to Switch / PC to PC (Legacy)</text>

     <!-- End 1 (A) pins -->
     <g transform="translate(30, 42)">
      <text x="0" y="0" font-size="10" font-weight="700" fill="#475569">End 1 (A)</text>
      ${T568A.map((c,i)=>`
       <rect x="0" y="${8+i*13}" width="16" height="9" rx="1.5" fill="${wireColors[c]}" stroke="#64748b" stroke-width="0.8"/>
       <text x="20" y="${16+i*13}" font-size="9" font-weight="700" fill="#0f172a">${i+1}</text>
      `).join('')}
     </g>

     <!-- Crossed Lines (1<->3, 2<->6) -->
     <g stroke-width="1.8">
      <!-- 1 -> 3 -->
      <path d="M 65 54 C 180 54, 230 80, 350 80" stroke="${wireColors['White/Green']}" stroke-dasharray="3 2"/>
      <!-- 2 -> 6 -->
      <path d="M 65 67 C 180 67, 230 119, 350 119" stroke="${wireColors['Green']}"/>
      <!-- 3 -> 1 -->
      <path d="M 65 80 C 180 80, 230 54, 350 54" stroke="${wireColors['White/Orange']}" stroke-dasharray="3 2"/>
      <!-- 4 -> 4 -->
      <line x1="65" y1="93" x2="350" y2="93" stroke="${wireColors['Blue']}"/>
      <!-- 5 -> 5 -->
      <line x1="65" y1="106" x2="350" y2="106" stroke="${wireColors['White/Blue']}" stroke-dasharray="3 2"/>
      <!-- 6 -> 2 -->
      <path d="M 65 119 C 180 119, 230 67, 350 67" stroke="${wireColors['Orange']}"/>
      <!-- 7 -> 7 -->
      <line x1="65" y1="132" x2="350" y2="132" stroke="${wireColors['White/Brown']}" stroke-dasharray="3 2"/>
      <!-- 8 -> 8 -->
      <line x1="65" y1="145" x2="350" y2="145" stroke="${wireColors['Brown']}"/>
     </g>

     <!-- End 2 (B) pins -->
     <g transform="translate(365, 42)">
      <text x="5" y="0" font-size="10" font-weight="700" fill="#475569">End 2 (B)</text>
      ${T568B.map((c,i)=>`
       <text x="0" y="${16+i*13}" font-size="9" font-weight="700" fill="#0f172a">${i+1}</text>
       <rect x="12" y="${8+i*13}" width="16" height="9" rx="1.5" fill="${wireColors[c]}" stroke="#64748b" stroke-width="0.8"/>
      `).join('')}
     </g>

     <rect x="40" y="156" width="360" height="20" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
     <text x="220" y="170" text-anchor="middle" font-size="10" font-weight="600" fill="#64748b">TX Pair (Pins 1 &amp; 2) connects to RX Pair (Pins 3 &amp; 6)</text>
    </g>
   </svg>
  </div>
 `;
}
