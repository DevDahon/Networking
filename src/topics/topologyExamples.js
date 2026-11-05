import {layouts} from '../simulations/models.js';
import {topologyCoordinates} from '../components/topologyDiagram.js';

const content={
 Bus:['Bus Topology','Five computers share one coaxial backbone','A bus connects devices to a shared backbone rather than to a central switch. Signals use the common cable, and correct termination is needed at its ends.',['Each computer attaches through a tap to the same backbone; computers do not forward traffic for their neighbors.','This classic-bus model treats a broken backbone as disrupting the entire segment.']],
 Ring:['Ring Topology','Five devices form a closed loop','A ring connects each device to two neighbors to form a closed loop. This example uses an unprotected logical ring, so a break interrupts its circulation.',['The highlighted sequence follows neighboring connections around the loop.','A protected ring can recover differently; this example deliberately has no protection path.']],
 Mesh:['Mesh Topology','Five nodes have a direct link to every other node','A full mesh connects every node directly to every other node. This provides alternate paths but requires more links as the network grows.',['Five fully interconnected nodes need ten distinct links.','The path demonstration is an abstract routed graph; Ethernet loops require separate control mechanisms.']],
 Tree:['Tree Topology','Two branches connect to a core device','A tree arranges connections in levels, with branches below a central root. An upstream link can affect every endpoint in the branch beneath it.',['Computer A reaches Computer B through Branch A, the core, and Branch B.','Removing the core-to-Branch B link isolates Computer B while Branch A keeps its core connection.']],
 Hybrid:['Hybrid Topology','Two switched groups share a backbone link','A hybrid combines connection patterns within one network. This example joins two switched groups through one inter-switch link.',['Computers in different groups use both switches and the connecting backbone.','If that backbone fails, the groups separate; devices on the same working switch can remain connected.']]
};

export function moreTopologyExamples(){
 return Object.entries(content).map(([kind,[title,exampleTitle,lead,items]])=>{
  const model=layouts[kind],xy=topologyCoordinates(kind,model.nodes.length);
  return {kind:'example',title,exampleTitle:`Example: ${exampleTitle}`,lead,items,topologyKind:kind,
   diagram:{nodes:model.nodes.map((label,i)=>({label:label.replace(/^PC /,'Computer '),x:xy[i][0],y:xy[i][1],detail:'',kind:/Switch|Core|Branch/.test(label)?'switch':'computer'})),edges:model.edges}
  };
 });
}
