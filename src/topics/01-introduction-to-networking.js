import {topic} from './createTopic.js';
export default topic({
  "id": "01-introduction-to-networking",
  "title": "Introduction to Networking and Network Architecture",
  "icon": "Network",
  "description": "Discover everyday networking, classify network coverage and architectures, and follow a simple exchange between devices.",
  "objectives": [
    "Explain what a computer network does and summarize the uses and importance of networking.",
    "Identify the four core components of computer networks: end devices (nodes), networking devices, transmission media, and protocols.",
    "Classify everyday networks as PAN, LAN, MAN, or WAN.",
    "Compare peer-to-peer and client-server service architectures.",
    "Identify the five communication elements and key performance measures.",
    "Describe the key characteristics of computer networking: security, reliability, scalability, data flow, high performance, fault tolerance, QoS, and compatibility."
  ],
  "concepts": [
    {
      "title": "What Is a Computer Network?",
      "lead": "A computer network is a system of two or more connected devices that exchange data and share resources using agreed rules called protocols.",
      "paragraphs": [
        "Computers, phones, servers, and network printers join together over wired Ethernet cables or wireless radio links so they can communicate reliably.",
        "Once connected, devices send and interpret messages using shared communication rules, allowing users to share files, messages, and printers even without Internet access."
      ],
      "ask": "Can two computers share a file without Internet access?"
    },
    {
      "title": "Overview of the Components of Computer Networks (1–2)",
      "lead": "Four core components work together so devices can create, forward, carry, and interpret data.",
      "stackedDescriptions": true,
      "itemLabels": ["1", "2"],
      "items": [
        "End Devices (Nodes): Computers, laptops, smartphones, servers, and network printers that sit at the edge of a network and originate or receive data.",
        "Networking Devices: Switches, wireless access points, and routers that sit inside the network to connect endpoints, forward local traffic, and direct data between networks."
      ]
    },
    {
      "title": "Overview of the Components of Computer Networks (3–4)",
      "lead": "Every message travels over a wired or wireless channel and follows shared communication rules.",
      "stackedDescriptions": true,
      "itemLabels": ["3", "4"],
      "items": [
        "Transmission Media: Copper Ethernet cables, fiber-optic strands, and wireless radio waves that provide the path carrying signals from one device to another.",
        "Protocols: Agreed communication rules—such as IP, TCP, HTTP, DNS, and DHCP—that control how messages are formatted, addressed, sent, and verified."
      ]
    },
    {
      "title": "How Devices Connect",
      "kind": "demo",
      "lead": "Wired connections carry signals through a cable. Wireless connections carry signals over radio between compatible devices.",
      "type": "introConnections"
    },
    {
      "title": "Local Network vs. Internet",
      "kind": "demo",
      "lead": "A local network connects nearby devices so they can share data and resources. Internet access connects that network to services on other networks around the world.",
      "type": "introConnectivity"
    },
    {
      "title": "Five parts of a conversation",
      "lead": "Think of sending a classroom instruction: someone speaks, someone listens, and both understand the language.",
      "items": [
        "Sender: The device or computer that creates and starts sending a message—such as your laptop opening a webpage or a phone sending a chat.",
        "Receiver: The target device meant to get and read the message, such as a friend’s smartphone, a shared office printer, or a web server.",
        "Message: The actual information being sent across the network, whether it is text, a photo, an email, a print job, or a video stream.",
        "Medium: The physical pathway (copper Ethernet cable or glass optical fiber) or wireless radio waves carrying signals from sender to receiver.",
        "Protocol: The shared rulebook for formatting, addressing, sending, and checking messages so both devices speak the same digital language."
      ],
      "expectedCount": 5
    },
    {
      "title": "A Simple Data Exchange",
      "kind": "demo",
      "lead": "One computer requests a shared document and another responds. Sender and receiver roles change when the reply travels back.",
      "type": "introExchange"
    },
    {
      "title": "Uses and Importance of Networking (1–4)",
      "lead": "Computer networks improve everyday communication, resource sharing, centralized storage, and team collaboration.",
      "stackedDescriptions": true,
      "itemLabels": ["1", "2", "3", "4"],
      "items": [
        "Communication: Networking makes communication faster and easier by connecting people through email, instant messaging, video calls, and social media. It allows individuals and organizations to exchange information in real time, regardless of distance.",
        "Resource Sharing: Networks allow multiple users to share resources such as printers, files, and applications. This reduces costs and improves efficiency since devices and data can be accessed by anyone connected to the network.",
        "Data Access and Storage: Networking enables centralized data storage in servers or cloud systems. This makes information easier to manage, secure, and retrieve, ensuring that users can access the same updated data from different locations.",
        "Collaboration: Through networking, teams can work together on shared platforms like Google Drive or Microsoft Teams. It supports group projects, online learning, and business operations by allowing multiple users to edit and access documents simultaneously."
      ]
    },
    {
      "title": "Uses and Importance of Networking (5–7)",
      "lead": "From digital media and daily business workflows to global classrooms, networks support modern life.",
      "stackedDescriptions": true,
      "itemLabels": ["5", "6", "7"],
      "items": [
        "Entertainment: Networking powers online gaming, video streaming, and music platforms. It connects users to digital content instantly, making entertainment more interactive and accessible worldwide.",
        "Business Operations: Companies rely on networking for e-commerce, banking, logistics, and customer service. It ensures smooth transactions, secure communication, and efficient management of business processes.",
        "Education and Research: Networking supports online classes, digital libraries, and research collaboration. Students and educators can access learning materials, share knowledge, and connect with experts globally, making education more flexible and inclusive."
      ]
    },
    {
      "title": "Two risks of shared infrastructure",
      "items": [
        "Security exposure: Sharing folders or services across a network can accidentally expose private files or allow unauthorized edits if permissions and passwords are weak.",
        "Shared failures: Because connected users depend on central switches, routers, and servers, one failing device or broken main link can interrupt everyone at once."
      ],
      "expectedCount": 2,
      "lead": "Access controls and maintenance address different networking risks."
    },
    {
      "title": "Characteristics of Computer Networking (1–3)",
      "lead": "Dependable networks protect sensitive data, remain consistently available, and scale as users grow.",
      "stackedDescriptions": true,
      "itemLabels": ["1", "2", "3"],
      "items": [
        "Security: Networks must protect data from unauthorized access, hacking, and malware. Security features like firewalls, encryption, and authentication help safeguard sensitive information and ensure privacy.",
        "Reliability: A reliable network ensures consistent availability of data and services. Backup systems and redundancy help maintain operations even during failures or disruptions.",
        "Scalability: Scalable networks can grow by adding more devices or users without losing performance. This is essential for expanding businesses, schools, or online platforms."
      ]
    },
    {
      "title": "Characteristics of Computer Networking (4–6)",
      "lead": "Smooth data transfer, responsive speed, and alternate recovery paths keep users productive without interruption.",
      "stackedDescriptions": true,
      "itemLabels": ["4", "5", "6"],
      "items": [
        "Flow of Data: Networking enables smooth data transfer between devices. Whether sharing files or accessing cloud services, networks ensure that information moves efficiently.",
        "High Performance: Performance refers to speed and responsiveness. Fast data transfer, low latency, and high bandwidth improve user experience and support real-time communication.",
        "Fault Tolerance: Fault-tolerant networks continue to operate even when part of the system fails. Alternate paths or backup connections ensure uninterrupted communication."
      ]
    },
    {
      "title": "Characteristics of Computer Networking (7–8)",
      "lead": "Traffic prioritization and cross-system compatibility ensure critical tasks and diverse devices work smoothly together.",
      "stackedDescriptions": true,
      "itemLabels": ["7", "8"],
      "items": [
        "Quality of Service (QoS): QoS prioritizes certain types of data (like video calls or urgent messages) to ensure smooth delivery. It helps manage bandwidth and reduce delays for critical tasks.",
        "Compatibility with Hardware and Software: Networks should support various devices and applications. Compatibility ensures that different systems can work together, improving flexibility and resource use."
      ]
    },
    {
      "title": "Two performance measures",
      "visualKey": "performanceMeasures",
      "items": [
        "Bandwidth: The maximum amount of data a network link can carry per second, measured in Mbps or Gbps—similar to how many lanes a highway has.",
        "Latency: The time delay it takes a small message to travel from sender to receiver, measured in milliseconds (ms). Even a fast, wide connection can still feel sluggish if delay is high."
      ],
      "expectedCount": 2
    },
    {
      "title": "Four network coverage types",
      "lead": "Coverage describes the geographic scope, rather than a strict distance limit.",
      "items": [
        "Personal Area Network (PAN): A tiny network within arm’s reach around one person—like a phone connected to wireless earbuds, a smartwatch, or a Bluetooth keyboard.",
        "Local Area Network (LAN): Connects nearby computers, printers, and Wi-Fi devices inside one home, classroom, office, or school campus under local management.",
        "Metropolitan Area Network (MAN): Links multiple buildings or branch offices together across a city or town, such as connecting city halls or public library branches.",
        "Wide Area Network (WAN): Connects distant cities, regions, or countries using telecom provider lines. The global Internet is the largest WAN interconnecting millions of networks."
      ],
      "expectedCount": 4
    },
    {
      "title": "Two network service architectures",
      "lead": "Architecture describes service roles. It is a different dimension from geographic coverage.",
      "items": [
        "Peer-to-peer: Everyday computers share files or a connected printer directly with each other as equals, without needing a separate server—easy to set up for small rooms.",
        "Client-server: A dedicated server hosts shared files, websites, or user logins so many student or worker client devices can request services reliably in one place."
      ],
      "ask": "Can a Local Area Network (LAN) use client-server architecture? Why?",
      "expectedCount": 2
    },
    {
      "title": "Two link choices: wired and wireless",
      "lead": "Choose between a wired cable for steady speed and wireless Wi-Fi for convenient mobility.",
      "items": [
        "Wired (Ethernet cable): Delivers fast, consistent speeds with minimal interference, but each device must plug into a network port.",
        "Wireless (Wi-Fi radio): Lets laptops and mobile devices connect without cables, though walls, distance, and congestion can slow the signal."
      ],
      "expectedCount": 2
    }
  ],
  "walkthrough": false
});
