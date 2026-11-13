import {layouts} from '../simulations/models.js';
import {topologyCoordinates} from '../components/topologyDiagram.js';

const content={
 Bus:['Bus Topology','Five computers share one coaxial backbone','A bus connects devices to a shared backbone cable that requires terminators at both ends.',['Shared cable: Every computer taps into one common backbone wire.','Single point of failure: A break anywhere in the main backbone stops the whole segment.']],
 Ring:['Ring Topology','Five devices form a closed loop','A ring connects each device to two neighbors in a closed circle.',['Neighbor-to-neighbor: Data passes around the ring from one device to the next.','Loop break: Breaking one link stops an unprotected ring unless a backup ring exists.']],
 Mesh:['Mesh Topology','Five nodes have a direct link to every other node','A full mesh connects every node directly to every other node for maximum redundancy.',['Ten direct links: Five fully connected nodes require 10 separate links.','High fault tolerance: If one link fails, traffic automatically takes another path.']],
 Tree:['Tree Topology','Two branches connect to a core device','A tree arranges star networks in a hierarchy under a central core switch.',['Hierarchical path: Computer A reaches Computer B through Branch A, the Core, and Branch B.','Branch isolation: If the Core-to-Branch B link fails, Branch B is isolated while Branch A keeps working.']],
 Hybrid:['Hybrid Topology','Two switched groups share a backbone link','A hybrid combines two or more topologies, such as two star switches joined by a backbone link.',['Combined layout: Devices in different rooms communicate across both switches and the backbone.','Group separation: If the backbone breaks, each room switch still works locally on its own.']]
};

export function moreTopologyExamples(){
 return Object.entries(content).map(([kind,[title,exampleTitle,lead,items]])=>{
  const model=layouts[kind],xy=topologyCoordinates(kind,model.nodes.length);
  return {kind:'example',title,exampleTitle:`Example: ${exampleTitle}`,lead,items,topologyKind:kind,
   diagram:{nodes:model.nodes.map((label,i)=>({label:label.replace(/^PC /,'Computer '),x:xy[i][0],y:xy[i][1],detail:'',kind:/Switch|Core|Branch/.test(label)?'switch':'computer'})),edges:model.edges}
  };
 });
}
