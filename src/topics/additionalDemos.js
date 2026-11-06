import {addPresenterNotes} from './createTopic.js';

const definitions=[
 ['01-introduction-to-networking','Bandwidth, delay, and file delivery','transferDemo','Change file size, link rate, one-way delay, or link state and compare the calculated transfer.','Use Play/Pause or step through delivery. Contrast serialization time with latency and show why a disconnected link transfers nothing.'],
 ['03-network-topologies','Trace a path through the topology','pathTraceDemo','Follow a computed shortest available path and see how a failed link changes it.','Choose source, destination, topology and failed link. Play the graph traversal; explain the explicit ring/bus assumptions and distinction from real switching control protocols.'],
 ['04-network-devices','Watch a switch learn source MAC addresses','macLearningDemo','Inject frames between three modeled ports and observe flooding, learning, and directed forwarding.','Send A to B with an empty table, then B to A. Read the source-learned table and compare the outgoing port copies. Clear the table to repeat.'],
 ['osi-reference-model','Investigate communication at functional boundaries','layerBoundaryDemo','Compare physical, frame, IP, transport, and application observations under one selected fault.','Play the functional inspection and explain why a lower failure leaves higher functions unestablished. Do not infer one exclusive layer from a symptom.'],
 ['06-network-cables-media','Compare link requirements with a rated medium','mediumBudgetDemo','Change reach, required rate, profile, and cable condition to inspect physical suitability limits.','Compare 30 m and 180 m copper channels, then use the explicitly assumed fiber optics profile. Explain why passing limits does not certify installation quality.'],
 ['08-ip-addressing','Compute network bits with address AND mask','bitwiseDemo','Display address bits, mask bits, and the actual bitwise network result.','Enter an address/prefix and reveal mask and AND result step by step. Contrast ordinary broadcast subnets with /31 and /32 conventions.'],
 ['09-basic-subnetting','Split a parent network into equal child subnets','partitionDemo','Calculate and reveal non-overlapping child blocks covering the selected parent.','Choose parent/child prefixes and reveal each child. Compare the sum of child address counts to the parent, then inspect network and usable ranges.'],
 ['network-protocols-services','DNS cache hits, record changes, and expiry','dnsCacheDemo','Resolve names, change a server record, and advance the client cache lifetime.','Populate the cache, take the resolver offline, and resolve again before expiry. Advance time past TTL and compare the miss. Change a server record to show why a cached answer can persist.'],
 ['11-dhcp','DHCP reservations, exclusions, and active leases','reservedPoolDemo','Allocate a bounded pool while reserving or excluding selected addresses.','Reserve .100 for PC 1, exclude .101, and request other clients. Demonstrate exhaustion and refusal to reserve another client’s active address; release and retry.'],
 ['12-router-wireless','Guest isolation versus Internet availability','guestIsolationDemo','Change guest association, isolation policy, WAN state, and destination to separate connectivity conditions.','Compare guest-to-staff denial with permitted guest Internet access, then take WAN down and test the local gateway. Explain the assumptions instead of claiming real VLAN configuration.'],
 ['13-file-printer-sharing','A shared printer queue with unavailable devices','printQueueDemo','Submit modeled jobs and observe FIFO page processing, retained queues, and new-job permissions.','Submit jobs from different clients. Pause the printer/host and process a page; restore availability and resume. Deny new submissions while existing accepted jobs remain queued.'],
 ['14-network-troubleshooting','Traceroute TTLs and missing hop replies','ttlTraceDemo','Inspect modeled ICMP TTL-expiry evidence, hidden replies, and an explicit broken-link report.','Run the healthy trace, suppress router 2’s expiry reply while preserving forwarding, then demonstrate the unavailable link. Compare a missing reply with explicit unreachable evidence.']
];

export const additionalDemos=Object.fromEntries(definitions.map(([id,title,type,lead,demo])=>[id,{kind:'demo',title,type,lead,demo}]));

export function withAdditionalDemo(topic){
 const extra={...additionalDemos[topic.id]};
 if(!extra.type)throw new Error(`Missing additional demonstration for ${topic.id}.`);
 addPresenterNotes([extra],{title:topic.title,description:extra.lead,example:topic.description});
 const slides=[...topic.slides];
 const index=topic.id==='01-introduction-to-networking'
  ?slides.findIndex(slide=>slide.title==='Two performance measures')+1
  :slides.length-1;
 const previous=slides[index-1];
 extra.notes.transition=`Next: ${slides[index].title}. Connect the demonstration to the next discussion.`;
 slides[index-1]={...previous,notes:{...previous.notes,transition:`Next: ${extra.title}. Use its controls to demonstrate the discussed behavior.`}};
 slides.splice(index,0,extra);
 return {...topic,slides};
}
