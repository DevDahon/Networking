import {ipv4,dotted,subnet,contains,validateHost,T568B,cableTest,DHCP} from '../utils/network.js';
import {layouts,reachable} from './models.js';

const finite=(n,label,min,max)=>{const v=Number(n);if(String(n).trim()===''||!Number.isFinite(v)||v<min||v>max)throw new Error(`${label} must be from ${min} to ${max}.`);return v;};
export function transferModel({size=10,rate=100,latency=20,link='up'}={}){
 size=finite(size,'File size (decimal MB)',.1,1000);rate=finite(rate,'Link rate (Mb/s)',1,10000);latency=finite(latency,'One-way delay (ms)',0,1000);
 return {size,rate,latency,ok:link==='up',serialization:size*8/rate,total:size*8/rate+latency/1000};
}
export function serviceAvailability({architecture='server',resource='A',peerA='on',peerB='on',server='on'}={}){
 const host=architecture==='server'?'Dedicated server':`Peer ${resource}`;
 const online=architecture==='server'?server==='on':resource==='A'?peerA==='on':peerB==='on';
 return {host,online,text:online?`${host} is available to provide File ${resource}.`:`File ${resource} is unavailable because its hosting ${host.toLowerCase()} is offline.`,scope:architecture==='server'?'Both files depend on the central server.':'Each file depends on its owning peer; losing one peer need not remove the other peer’s file.'};
}
export function topologyPath(kind='Star',source=1,target=4,failed=-1,dead=-1){
 const model=layouts[kind];if(!model)throw new Error('Choose a known topology.');
 source=Number(source);target=Number(target);failed=Number(failed);dead=Number(dead);
 if(!model.nodes[source]||!model.nodes[target])throw new Error('Choose valid source and destination nodes.');
 if(!reachable(model.nodes,model.edges,source,failed,dead,kind).includes(target))return [];
 const queue=[[source]],seen=new Set([source]);
 while(queue.length){const path=queue.shift(),last=path.at(-1);if(last===target)return path;model.edges.forEach(([a,b],i)=>{if(i===failed||a===dead||b===dead)return;const next=a===last?b:b===last?a:-1;if(next>=0&&!seen.has(next)){seen.add(next);queue.push([...path,next]);}});}
 return [];
}
export class LearningSwitch{
 constructor(){this.table={};this.frames=0;}
 send(source,destination){
  const hosts={A:{port:1,mac:'02:00:00:00:00:0A'},B:{port:2,mac:'02:00:00:00:00:0B'},C:{port:3,mac:'02:00:00:00:00:0C'}};
  const src=hosts[source],dst=hosts[destination];if(!src||!dst)throw new Error('Choose a known host.');
  if(source===destination)return {ports:[],text:'Same host: no Ethernet frame needs to enter the switch in this example.'};
  this.table[src.mac]=src.port;this.frames++;
  const learned=this.table[dst.mac],ports=learned?(learned===src.port?[]:[learned]):[1,2,3].filter(p=>p!==src.port);
  return {ports,source:src.mac,destination:dst.mac,text:`Learn source ${src.mac} on port ${src.port}. ${learned?`Destination known: forward to port ${learned}.`:`Destination unknown: flood ports ${ports.join(', ')} within this single VLAN.`}`};
 }
}
export function layerEvidence(fault='none'){
 const boundaries=[{layer:1,name:'Physical link'},{layer:2,name:'Local frame delivery'},{layer:3,name:'IP path'},{layer:4,name:'TCP service connection'},{layer:7,name:'Application response'}];
 let blocked=false;
 return boundaries.map(b=>{const status=blocked?'Not established by this test':String(b.layer)===String(fault)?'Modeled failure':'Pass in this model';if(String(b.layer)===String(fault))blocked=true;return {...b,status};});
}
export function hopFrames({destination='remote',transport='TCP'}={}){
 const remote=destination==='remote',ip=remote?'192.168.2.20':'192.168.1.20',data=transport==='TCP'?'TCP 53000 → 443':'UDP 53000 → 53';
 const frames=[{hop:'PC A → local next hop',sourceIP:'192.168.1.10',destinationIP:ip,sourceMAC:'PC-A MAC',destinationMAC:remote?'Router LAN-A MAC':'PC-B MAC',transport:data}];
 if(remote)frames.push({hop:'Router → remote LAN',sourceIP:'192.168.1.10',destinationIP:ip,sourceMAC:'Router LAN-B MAC',destinationMAC:'PC-B MAC',transport:data});
 return frames;
}
export const mediaProfiles={
 cat5e:{label:'Cat 5e · 1000BASE-T teaching profile',speed:1000,reach:100},
 cat6a:{label:'Cat 6A · 10GBASE-T teaching profile',speed:10000,reach:100},
 fiber:{label:'Fiber · assumed matching 1 Gb/s, 1 km optics',speed:1000,reach:1000}
};
export function mediaBudget({profile='cat5e',distance=30,speed=1000,damaged='no'}={}){
 const p=mediaProfiles[profile];if(!p)throw new Error('Choose a medium profile.');distance=finite(distance,'Channel distance (m)',1,5000);speed=finite(speed,'Required rate (Mb/s)',1,10000);
 const distanceOK=distance<=p.reach,speedOK=speed<=p.speed,conditionOK=damaged==='no';
 return {profile:p,distance,speed,distanceOK,speedOK,conditionOK,ok:distanceOK&&speedOK&&conditionOK};
}
export function pairIntegrity(preset='standard'){
 const a=[...T568B],b=[...T568B];
 if(preset==='split'){[a[2],a[3]]=[a[3],a[2]];[b[2],b[3]]=[b[3],b[2]];}
 if(preset==='miswire')[b[0],b[1]]=[b[1],b[0]];
 if(preset==='open')b[6]='';
 if(preset==='short')b[1]=b[0];
 const group=w=>w?.split('/').at(-1),pairs=[[0,1],[2,5],[3,4],[6,7]];
 const split=[a,b].some(end=>pairs.some(([x,y])=>end[x]&&end[y]&&group(end[x])!==group(end[y])));
 return {a,b,split,...cableTest(a,b)};
}
export function bitwiseAddress(ip,prefix){
 const s=subnet(ip,prefix),mask=ipv4(s.mask).toString(2).padStart(32,'0');
 return {...s,ip,maskBits:mask,networkBits:ipv4(s.network).toString(2).padStart(32,'0'),and:s.binary.split('').map((bit,i)=>String(Number(bit)&Number(mask[i]))).join('')};
}
export function partitionSubnet(ip='192.168.10.70',parent=24,child=26){
 const s=subnet(ip,parent),p=Number(child);
 if(String(child).trim()===''||!Number.isInteger(p)||p<s.prefix||p>32)throw new Error('Child prefix must be an integer from the parent prefix through 32.');
 const count=2**(p-s.prefix);if(count>16)throw new Error('This visualizer displays up to 16 equal children at once; use a prefix difference of at most 4.');
 const size=2**(32-p);
 return {parent:s,count,children:Array.from({length:count},(_,i)=>subnet(dotted(s.start+i*size),p))};
}
export class DNSCache{
 constructor(){this.time=0;this.online=true;this.records={'classroom.example':'203.0.113.20','files.example':'203.0.113.30'};this.entries={};this.queries=0;}
 expire(){for(const [name,entry] of Object.entries(this.entries))if(entry.expires<=this.time)delete this.entries[name];}
 resolve(name){this.expire();const cached=this.entries[name];if(cached)return {ip:cached.ip,cached:true,text:`Cache hit: ${name} → ${cached.ip}; ${cached.expires-this.time}s remain. No resolver query is sent.`};
  this.queries++;if(!this.online)throw new Error('Cache miss and resolver offline: name resolution cannot finish in this model.');
  if(!this.records[name])throw new Error('Name has no configured record in this teaching zone.');
  const ip=this.records[name];this.entries[name]={ip,expires:this.time+60};return {ip,cached:false,text:`Resolver query returned ${ip}; cache for 60 teaching seconds.`};}
 tick(){this.time+=30;this.expire();}
 setRecord(name,ip){ipv4(ip);this.records[name]=ip;}
}
export function asymmetricSubnet({a='192.168.1.10',aPrefix=24,b='192.168.1.200',bPrefix=25}={}){
 const sa=subnet(a,aPrefix),sb=subnet(b,bPrefix);validateHost({ip:a,mask:sa.mask,gateway:'',dns:''});validateHost({ip:b,mask:sb.mask,gateway:'',dns:''});
 if(a===b)throw new Error('Use distinct host addresses.');
 const aLocal=contains(b,a,sa.prefix),bLocal=contains(a,b,sb.prefix);
 return {a,b,sa,sb,aLocal,bLocal,ok:aLocal&&bLocal};
}
export class ReservedPool extends DHCP{
 constructor(){super('192.168.1.100','192.168.1.103');this.exclusions=new Set();this.reservations={};}
 checkAddress(ip){const n=ipv4(ip);if(n<this.start||n>this.end)throw new Error('This reservation model requires an address inside its four-address pool.');}
 reserve(client,ip,enabled=true){this.checkAddress(ip);this.expire();if(!enabled){delete this.reservations[client];return;}
  if(this.exclusions.has(ip))throw new Error('An excluded address cannot be reserved in this model.');
  if(Object.entries(this.reservations).some(([c,v])=>c!==client&&v===ip)||Object.entries(this.leases).some(([c,v])=>c!==client&&v.ip===ip))throw new Error('That address belongs to another reservation or active lease.');
  if(this.leases[client]&&this.leases[client].ip!==ip)throw new Error('Release this client’s active lease before moving its reservation.');
  this.reservations[client]=ip;
 }
 exclude(ip,enabled=true){this.checkAddress(ip);this.expire();if(enabled&&(Object.values(this.leases).some(l=>l.ip===ip)||Object.values(this.reservations).includes(ip)))throw new Error('Release the active lease or remove its reservation before excluding this address.');if(enabled)this.exclusions.add(ip);else this.exclusions.delete(ip);}
 available(){this.expire();for(let n=this.start;n<=this.end;n++){const candidate=dotted(n);if(!this.exclusions.has(candidate)&&!Object.values(this.reservations).includes(candidate)&&!Object.values(this.leases).some(l=>l.ip===candidate))return candidate;}return null;}
 request(client){this.expire();if(!this.online)throw new Error('DHCP server is offline.');let ip=this.leases[client]?.ip||this.reservations[client];
  if(!ip)ip=this.available();
  if(!ip)throw new Error('Pool exhausted for this client; reserved/excluded addresses are unavailable to it.');
  return this.leases[client]={ip,expires:this.time+60};
 }
}
export function guestPolicy({source='guest',destination='staff',associated='yes',isolation='on',wan='up',host='on'}={}){
 const linkOK=source==='staff'||associated==='yes',isolated=source==='guest'&&destination==='staff'&&isolation==='on';
 const pathOK=destination!=='internet'||wan==='up',serviceOK=destination!=='staff'||host==='on';
 return {linkOK,isolated,pathOK,serviceOK,ok:linkOK&&!isolated&&pathOK&&serviceOK};
}
export class PrintQueue{
 constructor(){this.jobs=[];this.completed=[];this.serial=0;this.host=true;this.printer=true;this.authorized=true;}
 submit(client,pages){pages=finite(pages,'Pages',1,20);if(!Number.isInteger(pages))throw new Error('Pages must be a whole number.');if(!this.host)throw new Error('Sharing host offline: the server queue cannot accept this job.');if(!this.authorized)throw new Error('This client lacks modeled print permission.');const job={id:++this.serial,client,pages,printed:0};this.jobs.push(job);return job;}
 process(){if(!this.jobs.length)return {ok:false,text:'Queue empty.'};if(!this.host||!this.printer)return {ok:false,text:'Queue retained: sharing host or printer is unavailable.'};const job=this.jobs[0];job.printed++;const text=`Job ${job.id} · ${job.client}: page ${job.printed} of ${job.pages} printed.`;if(job.printed===job.pages){this.completed.push({...job});this.jobs.shift();}return {ok:true,text};}
}
export const traceHops=['192.168.1.1','198.51.100.1','198.51.100.2','203.0.113.20'];
export function traceProbe(ttl,{hide='no',broken='no'}={}){
 ttl=finite(ttl,'TTL',1,4);if(!Number.isInteger(ttl))throw new Error('TTL must be a whole number.');
 if(broken==='yes'&&ttl>2)return {ttl,status:'Unreachable',address:traceHops[1],text:'Router 2 reports the next link unavailable in this model; no later hop is reached.'};
 if(hide==='yes'&&ttl===2)return {ttl,status:'No reply',address:'*',text:'Router 2 forwards traffic but suppresses its Time Exceeded reply in this model. A gap is not proof that forwarding stopped.'};
 return {ttl,status:ttl===4?'Destination reached':'Time Exceeded',address:traceHops[ttl-1],text:ttl===4?'The destination returns the modeled ICMP Echo Reply.':`Router ${ttl} reduces this probe’s TTL to zero and returns ICMP Time Exceeded.`};
}
