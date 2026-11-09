import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { topics } from '../src/topics/topicRegistry.js';

// Topic 1 Discussion Notes Database
const topic1Notes = {
  "What Is a Computer Network?": {
    analogy: "A standalone computer is like an isolated island. Networking is building bridges between islands so people can trade goods, share resources, and send letters.",
    talkingPoints: [
      "Emphasize that 'devices' does not just mean identical laptops; printers, security cameras, smartphones, smart TVs, and industrial sensors are all network endpoints.",
      "A network must have at least two devices, a transmission medium (copper cable, optical fiber, or radio waves), and shared rules called protocols."
    ],
    askTheClass: "If two laptops are sitting next to each other on a table, are they a network? What is missing?",
    answer: "No. They need an active physical or wireless connection and compatible communication rules (protocols) to share data.",
    takeaway: "A network requires at least two devices, a physical or wireless medium, and agreed protocols."
  },
  "Everyday Uses of Networks": {
    analogy: "Think about life before networking: if you needed to share a file, you had to save it onto a physical floppy disk or USB flash drive and walk it to your friend's desk (the 'sneakernet').",
    talkingPoints: [
      "Modern daily life runs on background networks: instant messaging, streaming video, web portals, cloud storage, and shared office printers.",
      "Local resource sharing (like printing or accessing files in a computer lab) works locally even without an active Internet connection."
    ],
    askTheClass: "Which network service do you rely on most every day, and what happens to your workflow if it goes down for 24 hours?",
    answer: "Helps students realize how critical messaging, cloud backups, and online learning portals are to modern education and work.",
    takeaway: "Networks transform isolated computing power into collective collaboration and instant access to services."
  },
  "Basic Network Components": {
    analogy: "Think of a highway transportation system: End devices are houses and destinations, links are the roads, and connecting devices (switches, routers) are traffic intersections and highway interchanges directing traffic.",
    talkingPoints: [
      "End devices (PCs, phones, servers, printers) create or consume the actual data.",
      "Connecting devices (switches, routers, access points) forward traffic along the path without modifying user content.",
      "Links (twisted-pair copper cables, glass fiber optics, wireless radio) physically carry the signals."
    ],
    askTheClass: "Is your smartphone an end device or a connecting device? What about your home Wi-Fi router?",
    answer: "A smartphone is an end device (creates/consumes data). The home Wi-Fi router is a connecting device (forwards data between your home and your ISP).",
    takeaway: "Every network consists of endpoints that generate data, links that carry signals, and connecting devices that direct traffic."
  },
  "How Devices Connect": {
    analogy: "Wired is like speaking through a landline phone (shielded, zero outside interference, fixed location). Wireless is like using a walkie-talkie (convenient, free to move around, but subject to wall obstruction and radio noise).",
    talkingPoints: [
      "Wired Ethernet uses copper pulses or fiber light beams. It provides maximum bandwidth, minimum latency, and immune reliability.",
      "Wireless uses radio frequencies (2.4 GHz, 5 GHz, 6 GHz). It offers mobility but can suffer from distance attenuation and physical obstacles."
    ],
    askTheClass: "Why do esports gaming tournaments and enterprise server rooms strictly use wired Ethernet cables instead of Wi-Fi?",
    answer: "Zero radio interference, predictable microsecond latency, and immune stability against signal drops.",
    takeaway: "Use wired links for speed and mission-critical stability; use wireless links for mobile convenience."
  },
  "Local Network vs. Internet": {
    analogy: "A local network is your school's private intercom system: you can broadcast announcements to every classroom down the hall without paying a phone bill. The Internet is the international public telephone network.",
    talkingPoints: [
      "This addresses the #1 misconception among beginners: 'If the Internet is down, my network is dead.'",
      "Demonstrate that if the ISP modem or external cable is unplugged, computers on the local LAN can still share files, stream from a local media server, and print documents seamlessly."
    ],
    askTheClass: "If your Internet provider experiences an outage, can you still print a research paper on your classroom Wi-Fi printer?",
    answer: "Yes! Local print traffic travels through the local switch/access point and never needs to leave the building.",
    takeaway: "The local network operates independently; the Internet is simply an external destination reachable through your router."
  },
  "Five Elements of Data Communication": {
    analogy: "Imagine a classroom lecture: The teacher is the Sender, the student is the Receiver, the lesson is the Message, the air carrying sound vibrations is the Medium, and speaking in English is the Protocol. If the teacher speaks Russian, communication fails even if the room has perfect acoustics!",
    talkingPoints: [
      "Sender: originates the transmission.",
      "Receiver: destination endpoint that decodes the transmission.",
      "Message: the actual payload/data.",
      "Medium: the physical cable or wireless air channel carrying signals.",
      "Protocol: the rules, syntax, and timing that ensure both sides understand the data."
    ],
    askTheClass: "If your phone tries to send a text message while inside an underground concrete elevator with no signal, which of the 5 elements failed?",
    answer: "The Medium. The sender, receiver, message, and protocol are ready, but the physical signal path is blocked.",
    takeaway: "Successful communication requires all five elements: both endpoints, the data, a transmission path, and a shared protocol."
  },
  "Example: one printer, five connected computers": {
    analogy: "Before network switches, an office had to buy a separate printer for every single desk, or employees had to physically unplug cables and carry flash drives around.",
    talkingPoints: [
      "Computer 3 is the Sender; the Network Printer is the Receiver; the print job is the Message; Ethernet cables are the Medium.",
      "The central switch maintains independent connections: Computer 3 printing does not disconnect or interfere with Computers 1, 2, 4, or 5.",
      "If Computer 1's cable gets unplugged, only Computer 1 loses access; the printer and remaining computers continue operating normally."
    ],
    askTheClass: "What happens to Computer 3's print job if Computer 2 shuts down? What if the central switch loses power?",
    answer: "Computer 2 shutting down has zero effect. If the central switch loses power, all communication across the star topology stops.",
    takeaway: "A central switch connects multiple endpoints to shared equipment safely and independently."
  },
  "A Simple Data Exchange": {
    analogy: "Ordering food at a counter: You start as the Sender asking for lunch (the Request). The cashier is the Receiver. When the cashier hands you your receipt and meal (the Reply), roles reverse: the cashier is the Sender and you are the Receiver.",
    talkingPoints: [
      "Network exchanges are almost always bidirectional conversations.",
      "A client device sends a request packet, then switches to listening/receiving mode to accept the server's reply.",
      "The terms 'sender' and 'receiver' describe temporary roles during a specific step, not permanent physical device types."
    ],
    askTheClass: "When you click a link on a web browser, who is the sender initially, and who becomes the sender half a second later?",
    answer: "Your browser is the initial sender (sending an HTTP GET request). The web server becomes the sender when delivering the HTML web page.",
    takeaway: "Communication roles are dynamic: devices alternate between sender and receiver as messages and replies travel back and forth."
  },
  "Three Benefits of Networking": {
    analogy: "In an office of 100 employees, buying 100 color laser printers would cost thousands and clutter every desk. Placing 2 high-capacity networked printers in the hallway saves money, supplies, and maintenance.",
    talkingPoints: [
      "1. Resource Sharing: Cost savings through shared hardware, software licenses, and Internet uplinks.",
      "2. Collaboration: Real-time co-authoring, instant file sharing, and remote meetings.",
      "3. Centralized Management & Backups: IT staff can back up one server cluster overnight instead of hoping 100 individual laptops remember to backup."
    ],
    askTheClass: "Why do cloud suites like Google Docs or Microsoft 365 allow teams to work faster than emailing document versions back and forth?",
    answer: "Eliminates duplicate versions, enables real-time multi-user edits, and centralizes revision history on network servers.",
    takeaway: "Networking drastically reduces hardware costs, accelerates team collaboration, and protects vital records through centralized management."
  },
  "Two Risks of Networking": {
    analogy: "An isolated offline computer is like a house in the middle of a desert: inconvenient to visit, but safe from burglars. Connecting to a network is building a paved highway right to your front door: highly convenient, but you must now install locks, security cameras, and fences.",
    talkingPoints: [
      "1. Security Exposure: Any connected device can potentially be targeted by unauthorized access, malware, or data leaks if access controls are misconfigured.",
      "2. Shared Outages: When central equipment (like a core switch or server) fails, many connected users lose service at once."
    ],
    askTheClass: "If a school's central authentication server crashes, what happens to student logins across all classrooms?",
    answer: "All students are blocked from logging in simultaneously because authentication is centralized.",
    takeaway: "Connectivity creates immense value, but demands strict security controls and redundant infrastructure against single points of failure."
  },
  "Two Performance Measures: Bandwidth and Latency": {
    analogy: "The classic Water Pipe analogy: Bandwidth is the width/diameter of the pipe (how many gallons per second can flow). Latency is the length of the pipe (how many seconds it takes for the first drop of water to travel from the reservoir to your kitchen tap).",
    talkingPoints: [
      "Bandwidth is capacity: measured in bits per second (Mbps or Gbps).",
      "Latency is delay: measured in milliseconds (ms).",
      "A satellite link has huge bandwidth (100 Mbps) but high latency (600 ms round-trip to space). That is why video streaming works fine on satellite, but live gaming or zoom calls feel laggy!"
    ],
    askTheClass: "Why does an online multiplayer game feel unplayable when your 'ping' is 300 ms, even if your download speed is a fast 200 Mbps?",
    answer: "Because gaming requires instant reaction time (low latency), not massive download capacity (bandwidth).",
    takeaway: "Bandwidth determines how much data moves at once; latency determines how quickly a response arrives. Both govern perceived performance."
  },
  "Bandwidth, delay, and file delivery": {
    analogy: "Shipping cargo: Bandwidth is the capacity of a freight train (how many containers it holds). Latency is the travel time of the train tracks between two cities.",
    talkingPoints: [
      "Total delivery time = (File Size / Bandwidth) + Latency Delay.",
      "Upgrading bandwidth from 10 Mbps to 100 Mbps dramatically speeds up large file transfers (e.g. 500 MB video).",
      "However, for tiny requests (like a 1 KB web click or DNS query), bandwidth makes almost no difference—latency dominates the delay!"
    ],
    askTheClass: "If you send a tiny 1-byte message over a 10 Gbps fiber line across the Pacific Ocean (80 ms latency), how long does it take to arrive?",
    answer: "Approximately 80 milliseconds. Light speed through glass takes time regardless of how wide the channel is.",
    takeaway: "Large transfers are limited by bandwidth; quick interactive exchanges are limited by latency."
  },
  "Four network coverage types": {
    analogy: "Think of transportation bubbles: PAN is your bicycle (personal travel bubble). LAN is your school campus shuttle. MAN is the city subway system. WAN is the international airline network.",
    talkingPoints: [
      "PAN (Personal Area Network): Under 10 meters, centered around one individual.",
      "LAN (Local Area Network): A room, building, or campus with high speed and private ownership.",
      "MAN (Metropolitan Area Network): Spans a town or city, linking municipal offices or multi-site organizations.",
      "WAN (Wide Area Network): Spans regions, countries, or the globe using telecom provider services."
    ],
    askTheClass: "Which network type connects your laptop to your wireless printer at home? Which connects your home to Google's servers?",
    answer: "Home Wi-Fi to printer = LAN. Home router to Google = WAN (Internet).",
    takeaway: "Network types describe geographic scope and administrative ownership, not arbitrary physical distance cutoffs."
  },
  "Personal Area Network (PAN)": {
    analogy: "Your personal electronic bubble: a smartphone paired with a smartwatch, wireless earbuds, and a fitness ring.",
    talkingPoints: [
      "Typically uses Bluetooth, NFC, or USB cables within a 10-meter (30-foot) range.",
      "Designed for low power consumption so smartwatch and headphone batteries last all day.",
      "Operates entirely offline without needing an active Internet plan."
    ],
    askTheClass: "Does a Bluetooth heart rate monitor need cellular data to send your pulse rate to your smartwatch?",
    answer: "No, the PAN connection operates locally over Bluetooth radio.",
    takeaway: "A PAN connects personal devices around one individual using short-range, energy-efficient links."
  },
  "Local Area Network (LAN)": {
    analogy: "A single home, classroom, office floor, or school building where all computers and shared printers belong to one private entity.",
    talkingPoints: [
      "Privately owned and managed by the school or company—no monthly telecom line charges between local rooms.",
      "High data rates (typically 1 Gbps to 10 Gbps) and ultra-low latency (< 1 ms).",
      "All connected devices share the same local broadcast domain and switch infrastructure."
    ],
    askTheClass: "Who is responsible for fixing a broken Ethernet cable in a school computer lab: the school IT staff or the Internet Service Provider (ISP)?",
    answer: "The school IT staff, because the LAN is private on-premises property.",
    takeaway: "LANs provide fast, privately controlled resource sharing across a single building or site."
  },
  "Metropolitan Area Network (MAN)": {
    analogy: "A city-wide library system where five branch libraries across town share a central patron database and catalog system.",
    talkingPoints: [
      "Spans an entire city or metropolitan municipality (larger than a single LAN, smaller than a nationwide WAN).",
      "Often operated by city governments, regional police, university multi-campus systems, or health networks.",
      "Utilizes leased dark fiber lines or high-speed point-to-point microwave links."
    ],
    askTheClass: "Why would a city government build a dedicated MAN for police and traffic cameras instead of using residential public Wi-Fi?",
    answer: "For guaranteed bandwidth, high-priority emergency availability, and strict government security isolation.",
    takeaway: "MANs interconnect multiple organizational locations across a single metropolitan urban area."
  },
  "Wide Area Network (WAN)": {
    analogy: "A university with a main campus in Manila and a satellite campus in Cebu. Because they cannot dig trenches across the ocean to lay their own private cable, they lease connectivity from telecom carriers.",
    talkingPoints: [
      "WANs span broad geographic territories: across provinces, countries, or oceans.",
      "Operated by telecommunications providers (telecom carriers, satellite providers, submarine cable operators).",
      "Routers sit at the boundary: they connect the local private LAN to the leased public WAN circuits.",
      "The global Internet is the largest example of a WAN in human history."
    ],
    askTheClass: "What boundary device connects your school's private LAN to the ISP's wide area network?",
    answer: "The router (specifically the default gateway router).",
    takeaway: "WANs link distant local networks across vast distances through public and private telecommunication service providers."
  },
  "Two network service architectures": {
    analogy: "P2P is like a study group where every classmate brings their own notebook and shares freely with neighbors. Client-Server is like a university lecture where the professor holds the master curriculum textbook (Server) and students request materials (Clients).",
    talkingPoints: [
      "Peer-to-Peer (P2P): Every computer acts as both a client and a server. Inexpensive, simple for 2–5 PCs, but hard to secure and back up.",
      "Client-Server: Dedicated servers provide specialized services (files, web, authentication, email) to client computers. Centralized, scalable, secure, but requires dedicated hardware and admin skills."
    ],
    askTheClass: "When you download files from BitTorrent, which architecture are you using? When you watch a YouTube video?",
    answer: "BitTorrent = Peer-to-Peer (downloading chunks from peers). YouTube = Client-Server (streaming from Google's data center servers).",
    takeaway: "Peer-to-peer distributes responsibilities equally among endpoints; client-server centralizes management and security."
  },
  "Resource Availability in Peer-to-Peer and Client-Server Networks": {
    analogy: "If your coworker saves the project budget spreadsheet on their personal laptop, and then goes home and turns off their laptop, nobody can work! On a client-server network, the budget is on a server that stays powered on 24/7.",
    talkingPoints: [
      "In P2P, resource availability depends on whether individual peer PCs remain powered on and connected.",
      "In Client-Server, servers are hosted in data centers with battery backups (UPS), redundant power supplies, and enterprise storage arrays.",
      "Demonstrate in the simulation: taking Peer A offline cuts off Peer A's shared file, whereas the server serves all clients continuously."
    ],
    askTheClass: "Why do banks, hospitals, and airlines strictly rely on client-server infrastructure for their operational records?",
    answer: "To guarantee 24/7/365 uninterrupted availability, automated backups, and strict role-based access security.",
    takeaway: "Client-server networks ensure predictable 24/7 resource availability through dedicated, monitored infrastructure."
  },
  "Two link choices: wired and wireless": {
    analogy: "Installing a Wi-Fi router in your house does not turn your house into a WAN; it is still a home LAN, just with both wired cables and radio waves in the air!",
    talkingPoints: [
      "Media describes how signals physically travel (cables vs. radio).",
      "Network coverage describes the geographic scope (LAN vs. WAN).",
      "Modern networks are almost always hybrid: desktop workstations, servers, and network switches use copper cables, while laptops and phones use Wi-Fi access points connected to those exact same switches."
    ],
    askTheClass: "Does switching your smartphone from home Wi-Fi to a wired USB-C Ethernet adapter change your home network type?",
    answer: "No, it is still the same home Local Area Network (LAN); only the transmission medium changed.",
    takeaway: "Wired and wireless are transmission media; they describe signal transport, not the network's geographic classification."
  },
  "Network Coverage and Service Architecture": {
    analogy: "Think of vehicles: 'Electric vs. Gasoline' is the engine technology (Architecture). 'Sedan vs. Bus vs. Cargo Ship' is the size and capacity (Coverage). You can have a small electric car or a giant electric city bus!",
    talkingPoints: [
      "Coverage (PAN/LAN/MAN/WAN) and Architecture (P2P/Client-Server) are independent design choices.",
      "A LAN can be Client-Server (school file server) or P2P (AirDrop between iPhones in a room).",
      "A WAN can also be Client-Server (web browsing) or P2P (cryptocurrency blockchain nodes across the world)."
    ],
    askTheClass: "Can a peer-to-peer network operate across a global WAN? Give an everyday example.",
    answer: "Yes! BitTorrent file sharing and Bitcoin blockchain networks run peer-to-peer across the global Internet.",
    takeaway: "Geographic coverage and service architecture are independent dimensions of network engineering."
  },
  "A school with two campuses": {
    analogy: "Bringing everything in Topic 1 together: Two school campuses in different districts of a city need to share learning materials stored on a central server.",
    talkingPoints: [
      "Campus A has a LAN (switches, local PCs, network printer). Campus B has a LAN.",
      "A telecom provider WAN link interconnects the two campus router gateways.",
      "Students at Campus B can print to their local printer on their LAN even if the wide-area link to Campus A is temporarily down.",
      "This practical scenario synthesizes endpoints, switches, routers, LANs, WANs, and client-server roles."
    ],
    askTheClass: "If an excavator accidentally cuts the underground provider fiber between Campus A and Campus B, can Campus B students still print locally? Can they access the server at Campus A?",
    answer: "Campus B students can still print locally on their own LAN. However, they cannot reach the server at Campus A until the WAN link is repaired.",
    takeaway: "Synthesizing coverage boundaries, link types, and service roles allows network technicians to diagnose faults accurately."
  }
};

export function generateTopic1Html() {
  const topic = topics[0];
  const allSlides = topic.slides.map((s, i) => ({ slideNumber: i + 1, ...s }));
  const discussionSlides = allSlides.filter(s => !['title', 'objectives', 'summary'].includes(s.kind));

  let cardsHtml = '';

  discussionSlides.forEach(slide => {
    const notes = topic1Notes[slide.title] || {
      analogy: "Relate this concept to familiar real-world technology.",
      talkingPoints: [slide.lead],
      askTheClass: "How does this concept apply in your daily computing experience?",
      answer: "Encourages students to connect theoretical definitions with practical operations.",
      takeaway: slide.lead
    };

    let itemsHtml = '';
    if (slide.items && slide.items.length > 0) {
      itemsHtml = `
        <ul class="content-bullets">
          ${slide.items.map(it => `<li>${it}</li>`).join('')}
        </ul>
      `;
    } else if (slide.type) {
      itemsHtml = `
        <div class="demo-badge">
          <b>Interactive Simulation:</b> <code>${slide.type}</code> — Use the on-screen controls to step through or demonstrate the concept visually.
        </div>
      `;
    }

    cardsHtml += `
      <div class="slide-card">
        <div class="card-header">
          <span class="slide-pill">Slide ${slide.slideNumber} of ${allSlides.length}</span>
          <h2 class="slide-title">${slide.title}</h2>
          <span class="type-tag ${slide.kind}">${slide.type ? 'Simulation' : slide.kind}</span>
        </div>

        <div class="reading-box">
          <div class="box-label">📖 What to Read & Display on Screen</div>
          <p class="lead-text">${slide.lead || ''}</p>
          ${itemsHtml}
        </div>

        <div class="teacher-guide-box">
          <div class="guide-header">
            <span class="guide-icon">💡</span>
            <span class="guide-title">Brief Explanation After Reading (Teacher's Discussion Notes)</span>
          </div>

          <div class="guide-section">
            <h4 class="section-title">🌟 Real-World Analogy / Everyday Intuition</h4>
            <p class="analogy-text">${notes.analogy}</p>
          </div>

          <div class="guide-section">
            <h4 class="section-title">🗣️ How to Explain It (Talking Points)</h4>
            <ul class="talking-points">
              ${notes.talkingPoints.map(tp => `<li>${tp}</li>`).join('')}
            </ul>
          </div>

          <div class="guide-section q-and-a">
            <h4 class="section-title">❓ Quick Check for Understanding (Ask the Class)</h4>
            <p class="question-text"><strong>Teacher Asks:</strong> "${notes.askTheClass}"</p>
            <p class="answer-text"><strong>Expected Answer / Guidance:</strong> ${notes.answer}</p>
          </div>

          <div class="takeaway-banner">
            <strong>Key Takeaway:</strong> ${notes.takeaway}
          </div>
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Topic 1: Introduction to Networking — Instructor Discussion Guide</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 14mm 16mm 14mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.5;
      font-size: 13px;
    }
    .guide-header-cover {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
      color: #ffffff;
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    .guide-header-cover .badge {
      display: inline-block;
      background: #38bdf8;
      color: #0f172a;
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 3px 8px;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    .guide-header-cover h1 {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 6px;
      color: #ffffff;
    }
    .guide-header-cover p {
      font-size: 13px;
      color: #cbd5e1;
      max-width: 95%;
    }
    .meta-bar {
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid rgba(255,255,255,0.2);
      display: flex;
      gap: 20px;
      font-size: 11px;
      color: #94a3b8;
    }
    .meta-bar b {
      color: #ffffff;
    }

    .slide-card {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      margin-bottom: 20px;
      background: #ffffff;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      overflow: hidden;
    }
    .card-header {
      background: #f1f5f9;
      padding: 10px 14px;
      border-bottom: 1px solid #cbd5e1;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .slide-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 12px;
      white-space: nowrap;
    }
    .slide-title {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      flex-grow: 1;
    }
    .type-tag {
      font-size: 10px;
      text-transform: uppercase;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      background: #e2e8f0;
      color: #475569;
    }
    .type-tag.example {
      background: #fef3c7;
      color: #92400e;
    }

    .reading-box {
      background: #f8fafc;
      padding: 12px 14px;
      border-bottom: 1px dashed #cbd5e1;
    }
    .box-label {
      font-size: 10px;
      text-transform: uppercase;
      font-weight: 800;
      color: #64748b;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .lead-text {
      font-weight: 600;
      color: #1e293b;
      font-size: 13px;
      margin-bottom: 6px;
    }
    .content-bullets {
      margin-left: 18px;
      font-size: 12px;
      color: #334155;
    }
    .content-bullets li {
      margin-bottom: 3px;
    }
    .demo-badge {
      background: #e0f2fe;
      border: 1px solid #bae6fd;
      color: #0369a1;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 12px;
      margin-top: 4px;
    }

    .teacher-guide-box {
      background: #eff6ff;
      border-left: 4px solid #2563eb;
      padding: 12px 14px;
    }
    .guide-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
    }
    .guide-icon {
      font-size: 14px;
    }
    .guide-title {
      font-weight: 800;
      font-size: 12px;
      text-transform: uppercase;
      color: #1e40af;
      letter-spacing: 0.3px;
    }

    .guide-section {
      margin-bottom: 8px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 3px;
    }
    .analogy-text {
      font-size: 12px;
      color: #1e293b;
      font-style: italic;
      background: rgba(255,255,255,0.7);
      padding: 6px 8px;
      border-radius: 4px;
      border-left: 2px solid #3b82f6;
    }
    .talking-points {
      margin-left: 16px;
      font-size: 12px;
      color: #1e293b;
    }
    .talking-points li {
      margin-bottom: 3px;
    }

    .q-and-a {
      background: #ffffff;
      border: 1px solid #bfdbfe;
      padding: 8px 10px;
      border-radius: 4px;
      font-size: 12px;
    }
    .question-text {
      color: #1e3a8a;
      margin-bottom: 4px;
    }
    .answer-text {
      color: #047857;
    }

    .takeaway-banner {
      margin-top: 8px;
      background: #dbeafe;
      color: #1e40af;
      font-size: 12px;
      padding: 5px 8px;
      border-radius: 4px;
    }
  </style>
</head>
<body>

  <div class="guide-header-cover">
    <span class="badge">Instructor's Discussion Guide</span>
    <h1>Topic 1: Introduction to Networking & Architecture</h1>
    <p>Comprehensive lecture notes and pedagogical explanations for each discussion slide. Designed to help instructors deliver engaging real-world analogies, explain theoretical concepts in plain English, and lead active classroom discussions.</p>
    <div class="meta-bar">
      <span><b>Curriculum:</b> Networking 1</span>
      <span><b>Included Slides:</b> Slides 3 to ${topic.slides.length - 1} (Slide 1 Title, Slide 2 Objectives, and Slide ${topic.slides.length} Summary excluded)</span>
      <span><b>Total Discussion Units:</b> ${discussionSlides.length} Slides</span>
    </div>
  </div>

  ${cardsHtml}

</body>
</html>
  `;
}

// Generate the HTML and PDF
const htmlContent = generateTopic1Html();
const htmlPath = path.resolve('discussion_guides/Topic-01-Introduction-to-Networking.html');
const pdfPath = path.resolve('discussion_guides/Topic-01-Introduction-to-Networking.pdf');

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log(`Wrote HTML to ${htmlPath}`);

// Run Chrome Headless to print to PDF
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const command = `"${chromePath}" --headless=new --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "file:///${htmlPath.replace(/\\/g, '/')}"`;

console.log('Generating PDF via headless Chrome...');
execSync(command);

if (fs.existsSync(pdfPath)) {
  const stats = fs.statSync(pdfPath);
  console.log(`Success! PDF generated at ${pdfPath} (${stats.size} bytes)`);
} else {
  console.error('PDF generation failed.');
}

