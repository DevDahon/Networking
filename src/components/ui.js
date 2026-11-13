export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function formatItemText(item){
 if(!item)return '';
 if(item.includes('**'))return esc(item).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
 const colonIndex=item.indexOf(': ');
 if(colonIndex>0&&colonIndex<40&&!item.slice(0,colonIndex).includes('\n')){
  const label=item.slice(0,colonIndex);
  const rest=item.slice(colonIndex+2);
  return `<strong>${esc(label)}:</strong> ${esc(rest)}`;
 }
 return esc(item);
}
export const button=(label,id,cls='')=>`<button type="button" data-action="${id}" class="${cls}">${label}</button>`;
export const select=(label,id,options,value)=>`<label for="${id}">${label}<select name="${id}" id="${id}">${options.map(o=>{const [v,t]=Array.isArray(o)?o:[o,o];return `<option value="${esc(v)}" ${String(v)===String(value)?'selected':''}>${esc(t)}</option>`;}).join('')}</select></label>`;
export const input=(label,id,value,type='text')=>`<label for="${id}">${label}<input name="${id}" id="${id}" type="${type}" value="${esc(value)}" autocomplete="off"></label>`;
export const result=(text,ok=true)=>`<div class="feedback ${ok?'success':'error'}" role="status">${esc(text)}</div>`;
export function wire(root,handlers){root.querySelectorAll('[data-action]').forEach(el=>el.onclick=()=>handlers[el.dataset.action]?.(el));}
export const read=(r,n)=>r.querySelector(`[name="${n}"]`).value;
export function networkSVG(labels=['PC 1','Switch','PC 2'],active=0,packetIndex=null,customPacketX=null,options={}){
 const pIdx=packetIndex!==null?packetIndex:active;
 const stepSpan=600/Math.max(1,labels.length-1);
 const packetX=typeof customPacketX==='number'?customPacketX:100+Math.max(0,Math.min(labels.length-1,Number(pIdx)||0))*stepSpan;
 const {direction=null,badge='',fault=false,broadcast=false,sublabels=[]}=options||{};
 const isReverse=direction==='reverse'||direction==='left';
 const activeSegStart=isReverse?Math.min(labels.length-2,Math.max(0,active)):Math.max(0,active-1);
 const segX1=100+activeSegStart*stepSpan+62;
 const segX2=100+(activeSegStart+1)*stepSpan-62;
 const midX=(segX1+segX2)/2;
 const arrowChar=isReverse?'◀ ▶'.slice(0,1):'▶';
 return `<svg class="network-diagram" viewBox="0 0 800 210" role="img" aria-label="${esc(labels.join(' connected to '))}">
  <path d="M140 100H660" stroke="#cbd5e1" stroke-width="5"/>
  ${active>0||direction?`<line x1="${segX1}" y1="100" x2="${segX2}" y2="100" stroke="${fault?'#ef4444':broadcast?'#f59e0b':'#0d9488'}" stroke-width="5" ${broadcast?'stroke-dasharray="8 5"':''} class="active-hop-line"/><text x="${midX}" y="90" text-anchor="middle" font-size="12" font-weight="800" fill="${fault?'#dc2626':broadcast?'#d97706':'#0f766e'}" class="hop-chevrons">${arrowChar} ${arrowChar} ${arrowChar}</text>`:''}
  ${broadcast?`<circle cx="${packetX}" cy="100" r="24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" class="broadcast-ring"/><circle cx="${packetX}" cy="100" r="38" fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="3 4" class="broadcast-ring"/>`:''}
  ${labels.map((l,i)=>{
   const x=100+i*stepSpan;
   const isCurrent=i===active;
   const sub=sublabels[i]||'';
   return `<g transform="translate(${x},100)">
    <rect x="-62" y="-38" width="124" height="76" rx="12" fill="${isCurrent?(fault?'#fef2f2':'#eff6ff'):'white'}" stroke="${isCurrent?(fault?'#dc2626':'#2563eb'):'#94a3b8'}" stroke-width="${isCurrent?'2.5':'2'}"/>
    <path d="M-35 -15H35M-35 -3H35M-35 9H10" stroke="${isCurrent?'#60a5fa':'#94a3b8'}" stroke-width="2"/>
    <text y="64" text-anchor="middle" fill="#0f172a" font-size="16" font-weight="${isCurrent?'700':'500'}">${esc(l)}</text>
    ${sub?`<text y="82" text-anchor="middle" fill="#64748b" font-size="11" font-family="monospace">${esc(sub)}</text>`:''}
   </g>`;
  }).join('')}
  ${badge?`<g transform="translate(${Math.max(95,Math.min(705,packetX))},42)" class="packet-badge-group"><rect x="-85" y="-14" width="170" height="22" rx="11" fill="${fault?'#fef2f2':broadcast?'#fffbeb':'#f0fdfa'}" stroke="${fault?'#ef4444':broadcast?'#f59e0b':'#0d9488'}" stroke-width="1.5"/><text y="1" text-anchor="middle" font-size="11" font-weight="700" font-family="monospace" fill="${fault?'#b91c1c':broadcast?'#b45309':'#0f766e'}">${esc(badge.slice(0,26))}</text></g>`:''}
  ${fault?`<g transform="translate(${packetX},100)"><circle r="14" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/><path d="M-5 -5L5 5M5 -5L-5 5" stroke="#dc2626" stroke-width="2.5"/></g>`:''}
  <circle class="packet" data-network-packet cx="${packetX}" cy="100" r="7" fill="${fault?'#dc2626':broadcast?'#f59e0b':'#0d9488'}" stroke="#ffffff" stroke-width="2"/>
 </svg>`;
}
