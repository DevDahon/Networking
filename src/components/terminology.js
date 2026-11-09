// Visible definitions follow the current slide and simulation state. Keep protocol
// identifiers, commands, port labels, and user-entered values unchanged.
export const terminology={
 PAN:'Personal Area Network',LAN:'Local Area Network',MAN:'Metropolitan Area Network',WAN:'Wide Area Network',WLAN:'Wireless Local Area Network',
 OSI:'Open Systems Interconnection',TCP:'Transmission Control Protocol',UDP:'User Datagram Protocol',IP:'Internet Protocol',IPv4:'Internet Protocol version 4',IPv6:'Internet Protocol version 6',
 ARP:'Address Resolution Protocol',ICMP:'Internet Control Message Protocol',ICMPv6:'Internet Control Message Protocol for IPv6',DHCP:'Dynamic Host Configuration Protocol',DNS:'Domain Name System',
 HTTP:'Hypertext Transfer Protocol',HTTPS:'Hypertext Transfer Protocol Secure',FTP:'File Transfer Protocol',FTPS:'File Transfer Protocol over Transport Layer Security',SFTP:'Secure Shell File Transfer Protocol',SSH:'Secure Shell',
 SMTP:'Simple Mail Transfer Protocol',POP3:'Post Office Protocol version 3',IMAP:'Internet Message Access Protocol',SNMP:'Simple Network Management Protocol',NTP:'Network Time Protocol',
 TLS:'Transport Layer Security',STARTTLS:'Start Transport Layer Security (upgrade an existing protocol connection)',
 MAC:'Media Access Control',NIC:'Network Interface Card',AP:'Access Point',PC:'Personal Computer',CIDR:'Classless Inter-Domain Routing',NAT:'Network Address Translation',VLAN:'Virtual Local Area Network',
 SSID:'Service Set Identifier',WPA:'Wi-Fi Protected Access',WPA2:'Wi-Fi Protected Access 2',WPA3:'Wi-Fi Protected Access 3',WEP:'Wired Equivalent Privacy',AES:'Advanced Encryption Standard',TKIP:'Temporal Key Integrity Protocol',
 UTP:'Unshielded Twisted Pair',STP:'Shielded Twisted Pair',RJ45:'Registered Jack 45',
 '8P8C':'Eight Positions, Eight Contacts',IDC:'Insulation-Displacement Contact',DSL:'Digital Subscriber Line',
 FCS:'Frame Check Sequence',TTL:'Time to Live',ACK:'Acknowledgment',DORA:'Discover, Offer, Request, Acknowledge',FIFO:'First In, First Out',
 NTFS:'New Technology File System',UNC:'Universal Naming Convention',UTF:'Unicode Transformation Format',
 MDI:'Medium Dependent Interface',MDIX:'Medium Dependent Interface Crossover',MB:'Megabyte',
 RFC:'Request for Comments',API:'Application Programming Interface',JSON:'JavaScript Object Notation',UI:'User Interface',
 MX:'Mail Exchange (DNS record)',AAAA:'IPv6 address record in the Domain Name System'
};

// Expand the first mention in a lesson sentence; preserve existing full names.
export function expandAbbreviations(text){
 if(typeof text!=='string')return text;
 const used=new Set();
 return text.replace(/\b(?:[A-Z][A-Za-z0-9]*|8P8C)\b/g,(short,offset)=>{
  const full=terminology[short];
  if(!full||used.has(short))return short;
  used.add(short);
  // A definition elsewhere in this sentence already supplies the meaning.
  if(text.toLowerCase().includes(full.toLowerCase()))return short;
  // Preserve addresses, port notation, and symbolic endpoint identifiers.
  if(/[A-Za-z0-9-]/.test(text[offset-1]||'')||/[A-Za-z0-9-]/.test(text[offset+short.length]||''))return short;
  return `${full} (${short})`;
 });
}

export function expandLessonTerms(topic){
 return {...topic,objectives:topic.objectives.map(expandAbbreviations),slides:topic.slides.map(slide=>{
  const expanded={...slide};
  for(const field of ['lead','footnote'])if(expanded[field])expanded[field]=expandAbbreviations(expanded[field]);
  if(expanded.items)expanded.items=expanded.items.map(expandAbbreviations);
  return expanded;
 })};
}
