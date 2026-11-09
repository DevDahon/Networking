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
export function networkSVG(labels=['PC 1','Switch','PC 2'],active=0){
 const packetX=100+Math.max(0,Math.min(labels.length-1,Number(active)||0))*600/Math.max(1,labels.length-1);
 return `<svg class="network-diagram" viewBox="0 0 800 210" role="img" aria-label="${esc(labels.join(' connected to '))}"><path d="M140 100H660" stroke="#cbd5e1" stroke-width="5"/>${labels.map((l,i)=>{const x=100+i*600/Math.max(1,labels.length-1);return `<g transform="translate(${x},100)"><rect x="-62" y="-38" width="124" height="76" rx="12" fill="${i===active?'#eff6ff':'white'}" stroke="${i===active?'#2563eb':'#94a3b8'}" stroke-width="2"/><path d="M-35 -15H35M-35 -3H35M-35 9H10" stroke="#94a3b8" stroke-width="2"/><text y="67" text-anchor="middle" fill="#0f172a" font-size="18">${esc(l)}</text></g>`;}).join('')}<circle class="packet" data-network-packet cx="${packetX}" cy="100" r="7" fill="#0d9488"/></svg>`;
}
