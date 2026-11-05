export const layouts={
 Star:{nodes:['Switch','PC 1','PC 2','PC 3','PC 4'],edges:[[0,1],[0,2],[0,3],[0,4]],note:'Independent switched links; losing the central switch isolates all endpoints.'},
 Bus:{nodes:['PC 1','PC 2','PC 3','PC 4','PC 5'],edges:[[0,1],[1,2],[2,3],[3,4]],note:'Classic shared coax bus with required termination. A backbone break is modeled as disrupting the whole segment.'},
 Ring:{nodes:['PC 1','PC 2','PC 3','PC 4','PC 5'],edges:[[0,1],[1,2],[2,3],[3,4],[4,0]],note:'Unprotected single logical ring. Any break disrupts this ring; protected dual rings are outside the model.'},
 Mesh:{nodes:['PC 1','PC 2','PC 3','PC 4','PC 5'],edges:[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]],note:'Abstract routed graph with alternate paths; Ethernet loop-control behavior is outside this model.'},
 Tree:{nodes:['Core','Branch A','Branch B','PC A','PC B'],edges:[[0,1],[0,2],[1,3],[2,4]],note:'Hierarchical branches; an upstream break separates the downstream subtree.'},
 Hybrid:{nodes:['Switch A','PC A','Switch B','PC B','PC C'],edges:[[0,1],[0,2],[2,3],[2,4]],note:'Two stars joined by one backbone. Loss of the backbone separates the groups.'}
};
export function reachable(nodes,edges,start,failed=-1,dead=-1,kind='Mesh') {
 if(start===dead)return [];
 if((kind==='Ring'||kind==='Bus')&&(failed>=0||dead>=0))return [start];
 const seen=new Set([start]);let change=true;
 while(change){change=false;edges.forEach(([a,b],i)=>{if(i===failed||a===dead||b===dead)return;if(seen.has(a)&&!seen.has(b)){seen.add(b);change=true;}if(seen.has(b)&&!seen.has(a)){seen.add(a);change=true;}});}
 return [...seen];
}
export const faults=['Ethernet cable disconnected','Incorrect static IP address','Incorrect subnet mask','Duplicate IP address','DHCP server unavailable','Incorrect default gateway','DNS server problem','File-sharing permission denied','Wireless client disconnected'];
export function diagnosticState(fault=-1){
 return {fault,link:![0,8].includes(fault),ip:fault===1?'192.168.2.10':fault===4?'169.254.10.10':'192.168.1.10',mask:fault===2?'255.255.255.128':fault===4?'255.255.0.0':'255.255.255.0',gateway:fault===5?'192.168.1.254':fault===4?'—':'192.168.1.1',dns:fault===6?'192.168.1.250':'192.168.1.1',duplicate:fault===3,dhcp:fault!==4,permission:fault!==7};
}
export function diagnose(s,command) {
 const local=s.link&&![1,3,4].includes(s.fault),peer=local&&s.fault!==2,remote=local&&s.fault!==5,dns=remote&&s.fault!==6;
 if(command==='ipconfig'||command==='ipconfig /all') return `Lab adapter: ${s.link?'Connected':'Media disconnected'}\nIPv4: ${s.ip}${s.duplicate?' (duplicate detected)':''}\nMask: ${s.mask}\nGateway: ${s.gateway}${command.endsWith('/all')?`\nDNS: ${s.dns}\nDHCP service: ${s.dhcp?'reachable; server 192.168.1.1':'no response'}\nLease: ${s.dhcp?'60 teaching seconds':'none'}\nPhysical address: 02-00-00-00-00-10`:''}`;
 if(command==='nslookup classroom.example')return dns?'Server: 192.168.1.1\nName: classroom.example\nAddress: 203.0.113.20 (documentation target in this model)':'DNS query timed out: resolver cannot be reached or is not responding in this model.';
 if(command==='arp -a')return local?'192.168.1.1 → 02-00-00-00-00-01 (modeled cached gateway)':'No dynamic neighbor entries in the modeled cache.';
 if(command==='tracert 203.0.113.20')return remote?'1  192.168.1.1\n2  203.0.113.20\nTrace complete (two-hop teaching model).':'*  No usable path in this state. Real traces can also have filtered or missing replies.';
 if(command==='Open shared folder')return !peer?'Share host unreachable in this state.':s.permission?'ClassFiles opened: authorized read access.':'Access denied: host reachable, but this account lacks share access.';
 const ok=command.includes('192.168.1.200')?peer:command.includes('192.168.1.1')?local:remote;
 return ok?'Reply received from modeled destination. ICMP is explicitly permitted in this lab model.':'No reply in the modeled network state. In real networks, filtering or packet loss can also cause timeouts.';
}
