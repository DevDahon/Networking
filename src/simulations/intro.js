import {classroomExample} from '../components/classroomExample.js';
import {automaticExample} from './automaticExamples.js';

const device=(label,x,y,detail='',kind='computer')=>({label,x,y,detail,kind});
export const introDiagrams={
 internet:{nodes:[device('Computer',110,70),device('Local switch',350,70,'Local connections','switch'),device('Local printer',350,250,'Shared resource','printer'),device('Router',610,70,'Network gateway','network'),device('Website server',850,250,'Beyond the local network')],edges:[[0,1],[1,2],[1,3],[3,4]]},
 exchange:{nodes:[device('Computer A',140,140,'Requests a document'),device('Local switch',500,140,'Connects the computers','switch'),device('Computer B',850,140,'Holds the shared document')],edges:[[0,1],[1,2]]}
};
export function introConnectivity(root){return automaticExample(root,{title:'Local Network vs. Internet',exampleId:'intro-internet',diagram:introDiagrams.internet,items:[]},'01-introduction-to-networking');}
export function introExchange(root){return automaticExample(root,{title:'A Simple Data Exchange',exampleId:'intro-exchange',diagram:introDiagrams.exchange,items:[]},'01-introduction-to-networking');}
export function introConnections(root){
 root.innerHTML=classroomExample({title:'Wired and wireless connections',diagram:{nodes:[device('Desktop computer',180,60,'Ethernet cable'),device('Switch',720,60,'Wired connection','switch'),device('Laptop',180,235,'Radio link'),device('Wireless access point',720,235,'Wireless connection','network')],edges:[[0,1],[2,3]]},items:['Wired example: a desktop computer connects to a switch with an Ethernet cable.','Wireless example: a laptop connects to a wireless access point over radio. Both methods can provide access to a local network.']});
 const radio=root.querySelectorAll('svg>g:first-child path')[1];
 if(radio){radio.setAttribute('stroke-dasharray','10 8');radio.setAttribute('stroke','#0d9488');}
}
