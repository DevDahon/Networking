import {esc} from './ui.js';

export function renderCourseOutline(container) {
  const courseTopics = [
    {
      title: 'Introduction to Computer Networking',
      subtopics: [
        'Data communications and computers',
        'Network advantages, uses, and limitations',
        'Network components and end devices',
        'Peer-to-peer and client-server networks'
      ]
    },
    {
      title: 'Types of Networks',
      subtopics: [
        'PAN, LAN, WLAN, MAN, and WAN',
        'Internet, Intranet, and Extranet',
        'SOHO networks'
      ]
    },
    {
      title: 'Networking Basics',
      subtopics: [
        'Network components',
        'Network models',
        'Network types'
      ]
    },
    {
      title: 'Networking Reference Models',
      subtopics: [
        'Seven OSI layers',
        'TCP/IP model',
        'OSI and TCP/IP layer mapping',
        'Encapsulation and decapsulation'
      ]
    },
    {
      title: 'Network Media and Connectors',
      subtopics: [
        'Copper, fiber-optic, and wireless media',
        'UTP and STP cables',
        'RJ45 connectors and cable categories',
        'T568A and T568B',
        'Straight-through cabling',
        'Cable testing'
      ]
    },
    {
      title: 'Ethernet and Basic Network Protocols',
      subtopics: [
        'MAC addressing',
        'Ethernet frames and switching',
        'TCP and UDP',
        'IP and ICMP',
        'ARP, DNS, and DHCP',
        'HTTP and HTTPS',
        'Common ports and services'
      ]
    },
    {
      title: 'Introduction to IP Addressing',
      subtopics: [
        'IPv4 structure',
        'Dotted-decimal notation',
        'Public and private IPv4 addresses'
      ]
    },
    {
      title: 'Fundamentals of IPv4 Subnetting',
      subtopics: [
        'Subnet masks and default gateway',
        'DNS',
        'IPv4 classes',
        'Binary and decimal conversion',
        'CIDR notation',
        'Network and broadcast addresses',
        'Usable host addresses',
        'Basic IP address allocation'
      ]
    },
    {
      title: 'IP Configuration and IPv6 Fundamentals',
      subtopics: [
        'Static and dynamic IP configuration',
        'DHCP configuration',
        'Windows adapter settings',
        'ipconfig /all',
        'DHCP lease information',
        'Connectivity checks',
        'IPv6 address format and basic types'
      ]
    },
    {
      title: 'P2P Networking and File Sharing',
      subtopics: [
        'Workgroup and hostname',
        'Windows Network Discovery',
        'File and printer sharing',
        'Private Network Profile',
        'Sharing and NTFS permissions',
        'Mapped Network Drives',
        'Connectivity testing'
      ]
    },
    {
      title: 'Wireless Networking and Router Configuration',
      subtopics: [
        'Wi-Fi networks and SSID',
        'Frequency bands',
        'Wireless Access Points and home routers',
        'LAN/WAN configuration',
        'DHCP',
        'WPA2 and WPA3',
        'Strong passwords and safe administration'
      ]
    },
    {
      title: 'Introduction to Network Security',
      subtopics: [
        'Malware and phishing',
        'Unauthorized access',
        'Denial-of-Service (DoS) concepts',
        'Firewalls and endpoint protection',
        'HTTPS and TLS',
        'Security updates',
        'Password security and responsible use'
      ]
    }
  ];

  container.innerHTML = `
    <div class="outline-page outline-simple">
      <header class="outline-header">
        <span class="outline-kicker">Course Syllabus</span>
        <h1>NETWORKING 1 – COURSE OUTLINE</h1>
      </header>

      <div class="weekly-list outline-topic-list" role="list">
        ${courseTopics.map(item => `
          <section class="weekly-item outline-topic-item" role="listitem">
            <div class="weekly-header outline-topic-header">
              <h2 class="week-title outline-topic-title">${esc(item.title)}</h2>
            </div>
            <ul class="subtopics-list">
              ${item.subtopics.map(sub => `<li>${esc(sub)}</li>`).join('')}
            </ul>
          </section>
        `).join('')}
      </div>

      <footer class="outline-actions-footer">
        <a class="button" href="#/"><i data-lucide="layout-grid"></i> Return to Topic Dashboard</a>
      </footer>
    </div>
  `;
}
