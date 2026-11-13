export const layouts={
 Star:{
  nodes:['Switch','PC 1','PC 2','PC 3','PC 4'],
  edges:[[0,1],[0,2],[0,3],[0,4]],
  note:'Independent switched links; losing the central switch isolates all endpoints.',
  dataFlow:'Centralized: Packets pass from sender into central switch, which forwards only to destination port.',
  pros:'Fault isolation (one broken cable affects only that device); easy troubleshooting and expansion.',
  cons:'Single point of failure at central switch; requires more cabling than a bus.',
  example:'Standard modern office, campus, and home Ethernet LANs.'
 },
 Bus:{
  nodes:['PC 1','PC 2','PC 3','PC 4','PC 5'],
  edges:[[0,1],[1,2],[2,3],[3,4]],
  note:'Classic shared coax bus with required termination. A backbone break is modeled as disrupting the whole segment.',
  dataFlow:'Broadcast: Signals travel along single shared trunk in both directions; terminators absorb signals at ends.',
  pros:'Minimal cabling required; simple and inexpensive for small, temporary setups.',
  cons:'A break anywhere in backbone halts all communication; difficult fault isolation; collision-prone.',
  example:'Early legacy 10BASE2/10BASE5 coaxial Ethernet and automotive sensor buses.'
 },
 Ring:{
  nodes:['PC 1','PC 2','PC 3','PC 4','PC 5'],
  edges:[[0,1],[1,2],[2,3],[3,4],[4,0]],
  note:'Unprotected single logical ring. Any break disrupts this ring; protected dual rings are outside the model.',
  dataFlow:'Unidirectional: Data travels around the closed ring from node to node; each device acts as a repeater.',
  pros:'Predictable transmission timing; equal access for all nodes without collision overhead.',
  cons:'Failure of any single device or link breaks communication for the entire ring.',
  example:'Fiber Distributed Data Interface (FDDI) and SONET metro optical ring backbones.'
 },
 Mesh:{
  nodes:['PC 1','PC 2','PC 3','PC 4','PC 5'],
  edges:[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]],
  note:'Abstract routed graph with alternate paths; Ethernet loop-control behavior is outside this model.',
  dataFlow:'Multipath: Nodes interconnect with multiple paths, routing around failed links to reach destination.',
  pros:'Maximum fault tolerance and redundancy; no single point of failure; high traffic capacity.',
  cons:'Expensive cabling and port requirements; complex installation; difficult scalability.',
  example:'Core Internet service provider backbones and mission-critical data center links.'
 },
 Tree:{
  nodes:['Core','Branch A','Branch B','PC A','PC B'],
  edges:[[0,1],[0,2],[1,3],[2,4]],
  note:'Hierarchical branches; an upstream break separates the downstream subtree.',
  dataFlow:'Hierarchical: Data travels up to core/distribution nodes and branches down to access leaf nodes.',
  pros:'Highly scalable; clear hierarchical organization by department or floor; structured expansion.',
  cons:'If an upstream distribution link or core switch fails, all downstream branches are cut off.',
  example:'Enterprise multi-floor campus LANs and corporate structured cabling hierarchies.'
 },
 Hybrid:{
  nodes:['Switch A','PC A','Switch B','PC B','PC C'],
  edges:[[0,1],[0,2],[2,3],[2,4]],
  note:'Two stars joined by one backbone. Loss of the backbone separates the groups.',
  dataFlow:'Combined: Blends multiple topologies (e.g. Star-Bus) connected through backbone interconnects.',
  pros:'Combines advantages of multiple topologies; highly adaptable to diverse building layouts.',
  cons:'Complex network design; troubleshooting requires understanding multiple topologies.',
  example:'University campus connecting separate departmental star LANs across a building backbone.'
 }
};
export function reachable(nodes,edges,start,failed=-1,dead=-1,kind='Mesh') {
 if(start===dead)return [];
 if(kind==='Ring'&&(failed>=0||dead>=0))return [start];
 if(kind==='Bus'&&failed>=0)return [start];
 if(kind==='Bus'&&dead>=0)return nodes.map((_,i)=>i).filter(i=>i!==dead);
 const seen=new Set([start]);let change=true;
 while(change){change=false;edges.forEach(([a,b],i)=>{if(i===failed||a===dead||b===dead)return;if(seen.has(a)&&!seen.has(b)){seen.add(b);change=true;}if(seen.has(b)&&!seen.has(a)){seen.add(a);change=true;}});}
 return [...seen];
}
export const faults=['Ethernet cable disconnected','Incorrect static IP address','Incorrect subnet mask','Duplicate IP address','DHCP server unavailable','Incorrect default gateway','DNS server problem','File-sharing permission denied','Wireless client disconnected'];
export function diagnosticState(fault=-1){
 return {fault,link:![0,8].includes(fault),ip:fault===1?'192.168.2.10':fault===4?'169.254.10.10':'192.168.1.10',mask:fault===2?'255.255.255.128':fault===4?'255.255.0.0':'255.255.255.0',gateway:fault===5?'192.168.1.254':fault===4?'—':'192.168.1.1',dns:fault===6?'192.168.1.250':'192.168.1.1',duplicate:fault===3,dhcp:fault!==4,permission:fault!==7};
}
export function diagnose(s,command) {
 const cmd = (command || '').trim();
 const lower = cmd.toLowerCase();
 const local=s.link&&![1,3,4].includes(s.fault),peer=local&&s.fault!==2,remote=local&&s.fault!==5,dns=remote&&s.fault!==6;

 if(lower==='help'){
  return `Available diagnostic commands:
  ipconfig            Basic IP address, subnet mask, default gateway
  ipconfig /all       Detailed configuration, DNS, DHCP, MAC address
  ipconfig /release   Release current DHCP address lease
  ipconfig /renew     Request new configuration from DHCP server
  ping <target>       Send ICMP Echo requests to verify reachability
  tracert <target>    Trace hops along the path to destination
  nslookup <domain>   Query DNS name resolution
  arp -a              Display local ARP cache table
  cls / clear         Clear terminal output`;
 }
 if(lower==='cls'||lower==='clear') return '';
 if(lower==='ipconfig /release') return `Ethernet adapter Ethernet0:
   Connection-specific DNS Suffix  . :
   IPv4 Address. . . . . . . . . . . : 0.0.0.0
   Subnet Mask . . . . . . . . . . . : 0.0.0.0
   Default Gateway . . . . . . . . . :
(IP address released. Type 'ipconfig /renew' to request a new lease.)`;
 if(lower==='ipconfig /renew') return s.dhcp?`Ethernet adapter Ethernet0:
   Connection-specific DNS Suffix  . : classroom.local
   IPv4 Address. . . . . . . . . . . : ${s.ip}
   Subnet Mask . . . . . . . . . . . : ${s.mask}
   Default Gateway . . . . . . . . . : ${s.gateway}
(DHCP lease successfully obtained from 192.168.1.1.)`:`An error occurred while renewing interface Ethernet0: No response from DHCP server.
Autoconfiguration IPv4 Address: 169.254.88.14 (APIPA assigned)`;

 if(lower==='ipconfig'||lower==='ipconfig /all') return `Lab adapter: ${s.link?'Connected':'Media disconnected'}\nIPv4: ${s.ip}${s.duplicate?' (duplicate detected)':''}\nMask: ${s.mask}\nGateway: ${s.gateway}${lower.endsWith('/all')?`\nDNS: ${s.dns}\nDHCP service: ${s.dhcp?'reachable; server 192.168.1.1':'no response'}\nLease: ${s.dhcp?'60 teaching seconds':'none'}\nPhysical address: 02-00-00-00-00-10`:''}`;
 if(lower.startsWith('nslookup')) return dns?`Server:  192.168.1.1\nAddress: 192.168.1.1#53\n\nNon-authoritative answer:\nName:    ${cmd.split(' ')[1]||'classroom.example'}\nAddress: 203.0.113.20 (documentation target in this model)`:'DNS query timed out: resolver cannot be reached or is not responding in this model.';
 if(lower==='arp -a') return local?`Interface: 192.168.1.10 --- 0x2\n  Internet Address      Physical Address      Type\n  192.168.1.1           02-00-00-00-00-01     dynamic\n  192.168.1.200         02-00-00-00-00-c8     dynamic\n  192.168.1.255         ff-ff-ff-ff-ff-ff     static`:'No dynamic neighbor entries in the modeled cache.';
 if(lower.startsWith('tracert')) {
  const target = cmd.split(' ')[1]||'203.0.113.20';
  return remote?`Tracing route to ${target} over a maximum of 30 hops:\n  1    <1 ms    <1 ms    <1 ms  192.168.1.1\n  2    12 ms    11 ms    12 ms  203.0.113.20\nTrace complete (two-hop teaching model).`:'*  No usable path in this state. Real traces can also have filtered or missing replies.';
 }
 if(cmd==='Open shared folder'||lower==='net view') return !peer?'Share host unreachable in this state.':s.permission?'ClassFiles opened: authorized read access.':'Access denied: host reachable, but this account lacks share access.';

 if(lower.startsWith('ping')){
  if(lower.includes('127.0.0.1')||lower.includes('localhost')) {
   return `Pinging 127.0.0.1 with 32 bytes of data:\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\n(Loopback test successful: TCP/IP stack is working properly.)`;
  }
  const ok=lower.includes('192.168.1.200')?peer:lower.includes('192.168.1.1')?local:remote;
  return ok?'Reply received from modeled destination. ICMP is explicitly permitted in this lab model.':'No reply in the modeled network state. In real networks, filtering or packet loss can also cause timeouts.';
 }

 return `'${cmd}' is not recognized as an internal or external command. Type 'help' for available commands.`;
}
