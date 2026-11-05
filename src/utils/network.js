export function ipv4(ip) {
  if (typeof ip !== 'string' || !/^(0|[1-9]\d{0,2})(\.(0|[1-9]\d{0,2})){3}$/.test(ip) || ip.split('.').some(n => +n > 255)) throw new Error('Enter four decimal octets, each from 0 to 255 (no leading zeros).');
  return ip.split('.').reduce((n, o) => n * 256 + +o, 0);
}
export const dotted = n => [24,16,8,0].map(b => Math.floor(n / 2 ** b) % 256).join('.');
export function subnet(ip, prefix) {
  const n = ipv4(ip); const p = Number(prefix);
  if (String(prefix).trim() === '' || !Number.isInteger(p) || p < 0 || p > 32) throw new Error('CIDR prefix must be an integer from 0 to 32.');
  const total = 2 ** (32-p), network = Math.floor(n/total)*total, end = network+total-1;
  return {prefix:p,mask:dotted(2**32-total),network:dotted(network),broadcast:p<31?dotted(end):null,total,usable:p<31?total-2:total,first:dotted(p<31?network+1:network),last:dotted(p<31?end-1:end),binary:n.toString(2).padStart(32,'0'),start:network,end};
}
export function maskPrefix(mask) {
  const bits = ipv4(mask).toString(2).padStart(32,'0');
  if (!/^1*0*$/.test(bits)) throw new Error('Subnet mask must have contiguous ones followed by zeros.');
  return bits.indexOf('0') === -1 ? 32 : bits.indexOf('0');
}
export const contains = (ip, base, prefix) => subnet(ip,prefix).network === subnet(base,prefix).network;
export function classify(ip) {
  ipv4(ip);
  if ([['10.0.0.0',8],['172.16.0.0',12],['192.168.0.0',16]].some(([b,p])=>contains(ip,b,p))) return 'Private — RFC 1918; use within private networks.';
  const ranges=[['0.0.0.0',8,'This network / unspecified'],['100.64.0.0',10,'Shared carrier-grade NAT'],['127.0.0.0',8,'Loopback'],['169.254.0.0',16,'Link-local (often no DHCP lease)'],['192.0.0.0',24,'IETF protocol assignments'],['192.0.2.0',24,'Documentation'],['192.88.99.0',24,'Special-purpose transition space'],['198.18.0.0',15,'Benchmarking'],['198.51.100.0',24,'Documentation'],['203.0.113.0',24,'Documentation'],['224.0.0.0',4,'Multicast'],['240.0.0.0',4,'Reserved / limited broadcast']];
  const r=ranges.find(([b,p])=>contains(ip,b,p));
  return r?`Special-purpose — ${r[2]}.`:'Global unicast candidate — actual Internet reachability depends on allocation and routing. Registry exceptions exist.';
}
export function validateHost(c) {
  const s=subnet(c.ip,maskPrefix(c.mask));
  if (s.prefix<31 && (c.ip===s.network||c.ip===s.broadcast)) throw new Error('A normal LAN host cannot use its network or broadcast address.');
  if (!classify(c.ip).startsWith('Private') && !classify(c.ip).startsWith('Global')) throw new Error('Choose a unicast host address for this LAN model.');
  if(c.gateway) {ipv4(c.gateway); if(!contains(c.gateway,c.ip,s.prefix)|| c.gateway===c.ip || (s.prefix<31 && [s.network,s.broadcast].includes(c.gateway))) throw new Error('Gateway must be a different usable host on the local subnet.');}
  if(c.dns) ipv4(c.dns);
  return s;
}
export function connectivity(a,b,routed=false,link=true) {
  try {
    const x=validateHost(a),y=validateHost(b);
    if(a.ip===b.ip) return {ok:false,text:'Duplicate IP: both computers claim the same address. Assign unique host addresses.'};
    if(!link) return {ok:false,text:'Link down. Valid addresses do not repair a disconnected cable.'};
    const local=contains(a.ip,b.ip,y.prefix)&&contains(b.ip,a.ip,x.prefix);
    if(local) return {ok:true,text:'Reachable on the connected LAN: both hosts consider each other local. A gateway and DNS are not required for this numeric-IP test.'};
    if(routed&&a.gateway&&b.gateway) return {ok:true,text:'Reachable through the modeled router, which has interfaces in both subnets and routes in both directions.'};
    return {ok:false,text:'Not reachable in this model. The hosts do not both consider each other local; configure appropriate gateways and bidirectional routing.'};
  } catch(e) {return {ok:false,text:`Invalid configuration: ${e.message}`};}
}
export const T568A=['White/Green','Green','White/Orange','Blue','White/Blue','Orange','White/Brown','Brown'];
export const T568B=['White/Orange','Orange','White/Green','Blue','White/Blue','Green','White/Brown','Brown'];
export function cableTest(a,b) {
  const mapping=a.map(w=>!w?[]:b.flatMap((v,i)=>v===w?[i+1]:[]));
  const open=mapping.some(m=>m.length===0)||b.some(w=>!w);
  const short=[a,b].some(end=>end.filter(Boolean).some((w,i,arr)=>arr.indexOf(w)!==i));
  const straight=!open&&!short&&mapping.every((m,i)=>m[0]===i+1);
  const crossover=!open&&!short&&mapping.every((m,i)=>m[0]===[3,6,1,4,5,2,7,8][i]);
  const standard=[T568A,T568B].some(s=>s.every((w,i)=>a[i]===w))&&[T568A,T568B].some(s=>s.every((w,i)=>b[i]===w));
  return {mapping,open,short,straight,crossover,standard,text:short?'Short / duplicate conductor assignment: more than one pin uses a conductor.':open?'Open circuit: at least one conductor has no end-to-end path.':straight?(standard?'Straight-through continuity PASS. Both ends follow a recognized standard.':'Continuity is straight-through, but color order is nonstandard; a basic tester cannot certify pair integrity or performance.'):crossover?'Traditional 10/100BASE-T crossover: 1↔3 and 2↔6. Modern auto-MDI/MDIX often adapts automatically.':'Miswire: one or more conductors terminate at unexpected pins.'};
}
export class DHCP {
  constructor(start='192.168.1.100',end='192.168.1.102',gateway='192.168.1.1',prefix=24,dns='192.168.1.1') {
    this.start=ipv4(start);this.end=ipv4(end);this.gateway=gateway;this.prefix=Number(prefix);this.dns=dns;this.leases={};this.time=0;this.online=true;
    const s=subnet(gateway,prefix);ipv4(dns);
    if(s.prefix>30||this.end<this.start||this.end-this.start>253||this.start<=s.start||this.end>=s.end||!contains(start,gateway,prefix)||!contains(end,gateway,prefix)) throw new Error('Use a pool of 1–254 usable addresses inside the router subnet.');
  }
  expire(){for(const [c,l] of Object.entries(this.leases)) if(l.expires<=this.time) delete this.leases[c];}
  available(){this.expire();const used=Object.values(this.leases).map(l=>l.ip);for(let n=this.start;n<=this.end;n++) if(dotted(n)!==this.gateway&&!used.includes(dotted(n))) return dotted(n);return null;}
  request(client){this.expire();if(!this.online) throw new Error('No DHCP server response. A client may eventually use a link-local address; it has no routable lease here.'); const ip=this.leases[client]?.ip||this.available();if(!ip) throw new Error('Pool exhausted: release a lease, wait for expiry, or enlarge the pool.');return this.leases[client]={ip,expires:this.time+60};}
  release(client){delete this.leases[client];}
  tick(){this.time+=30;this.expire();}
}
export function sharing({share,ntfs,action,online=true,shared=true,authenticated=true}) {
  if(!online)return 'Denied: the host is offline or disconnected.';
  if(!shared)return 'Denied: the resource has not been shared.';
  if(!authenticated)return 'Denied: use an authorized account on this trusted network.';
  const needed=action==='Read'?1:2;
  return Math.min(+share,+ntfs)>=needed?`Allowed: ${action}. Both share and file-system permissions allow this action.`:`Denied: ${action}. Effective access is limited by the more restrictive permission set.`;
}
