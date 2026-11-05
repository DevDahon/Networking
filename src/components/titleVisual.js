import {networkSVG} from './ui.js';
export function titleVisual(topic){
 if(topic.id==='network-protocols-services')return networkSVG(['Client','Protocol / port','Server']);
 if(topic.id==='osi-reference-model')return `<svg class="title-network" viewBox="0 0 900 220" role="img" aria-label="Seven stacked OSI layers"><g transform="translate(300,10)">${['Application','Presentation','Session','Transport','Network','Data Link','Physical'].map((name,i)=>`<g transform="translate(0,${i*29})"><rect width="300" height="25" rx="5" fill="${i<3?'#dbeafe':i<5?'#ccfbf1':'#e2e8f0'}"/><text x="20" y="18" font-size="15" fill="#0f172a">${7-i} · ${name}</text></g>`).join('')}</g></svg>`;
 const labels={communication:['PC A','Switch','PC B'],coverage:['PAN','LAN','WAN'],topology:['PC A','Switch','PC B'],devices:['NIC','Switch','Router'],osi:['Sender','Network','Receiver'],media:['Copper','Fiber','Radio'],cable:['T568A','8P8C','T568B'],ipv4:['IP address','Gateway','Remote host'],subnet:['Subnet A','Router','Subnet B'],static:['PC 1','LAN','PC 2'],dhcp:['Client','DHCP server','Lease pool'],router:['LAN','Router / AP','WAN'],sharing:['Client','LAN','File host'],troubleshoot:['Host','Link','Gateway']};
 return networkSVG(labels[topic.slides.find(s=>s.type)?.type]||['Host','Network','Host']);
}
