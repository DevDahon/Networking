import {pairIntegrity} from '../simulations/extraModels.js';
import {esc} from './ui.js';

export function cableExample(index,scenario){
 const model=pairIntegrity(scenario==='fault'?'open':'standard');
 const colors={'White/Orange':'#ffedd5',Orange:'#ea580c','White/Green':'#dcfce7',Green:'#16a34a',Blue:'#2563eb','White/Blue':'#dbeafe','White/Brown':'#f5e5d3',Brown:'#92400e'};
 return `<svg class="classroom-example example-pin-map" viewBox="0 0 1000 320" role="img" aria-label="Eight numbered conductor paths between the two cable ends"><text x="20" y="24" font-size="18" fill="#334155">End A · T568B</text><text x="20" y="292" font-size="18" fill="#334155">End B · T568B</text>${model.a.map((wire,i)=>{
  const x=90+i*115,active=index===i,failed=!model.mapping[i].length;
  return `<g><rect x="${x-32}" y="42" width="64" height="47" rx="6" fill="${colors[wire]}" stroke="#64748b"/><text x="${x}" y="73" text-anchor="middle" font-size="22" fill="${['Orange','Green','Blue','Brown'].includes(wire)?'white':'#0f172a'}">${i+1}</text><path d="M${x} 89V${failed?160:226}" stroke="${failed?'#dc2626':active?'#0d9488':'#cbd5e1'}" stroke-width="${active?6:3}" ${failed?'stroke-dasharray="7 6"':''}/>${failed?`<text x="${x}" y="189" text-anchor="middle" font-size="16" fill="#b91c1c">Open</text>`:''}<rect x="${x-32}" y="226" width="64" height="47" rx="6" fill="${colors[model.b[i]]||'#fee2e2'}" stroke="#64748b"/><text x="${x}" y="257" text-anchor="middle" font-size="22" fill="${['Orange','Green','Blue','Brown'].includes(model.b[i])?'white':'#0f172a'}">${i+1}</text><text x="${x}" y="313" text-anchor="middle" font-size="12" fill="#475569">${esc(wire)}</text></g>`;
 }).join('')}</svg>`;
}
