import {topic} from './createTopic.js';
export default topic({
  "id": "01-introduction-to-networking",
  "title": "Introduction to Networking and Network Architecture",
  "icon": "Network",
  "description": "Discover everyday networking, classify network coverage and architectures, and follow a simple exchange between devices.",
  "objectives": [
    "Explain what a computer network does using familiar examples.",
    "Recognize end devices, connecting devices, and wired or wireless links.",
    "Classify everyday networks as PAN, LAN, MAN, or WAN.",
    "Compare peer-to-peer and client-server service architectures.",
    "Identify the five communication elements and key performance measures."
  ],
  "concepts": [
    {
      "title": "What Is a Computer Network?",
      "lead": "A computer network is a system of two or more connected devices that exchange data and share resources. The devices communicate through wired or wireless links using agreed rules called protocols.",
      "items": [
        "Connected devices: Computers, phones, servers, and printers join together to communicate.",
        "Communication: Devices send and interpret data using shared communication rules.",
        "Shared access: Users share files, messages, and printers even without Internet access."
      ],
      "ask": "Can two computers share a file without Internet access?"
    },
    {
      "title": "Everyday Uses of Networks",
      "lead": "Networks support familiar tasks by connecting people, applications, and shared resources across private and public environments.",
      "items": [
        "Communication and learning: Devices exchange messages and open course materials.",
        "Network boundaries: Intranet (private organization), Extranet (trusted partners), and Internet (public worldwide).",
        "Small Office / Home Office (SOHO): Connects home or small office devices to an ISP through one gateway router."
      ]
    },
    {
      "title": "Basic Network Components",
      "lead": "Three broad groups work together to make a network useful.",
      "items": [
        "End devices: Computers, phones, servers, and printers that create or receive data.",
        "Connecting devices: Switches (local wired), access points (wireless), and routers (between networks).",
        "Links: Copper cables, fiber optics, and wireless radio signals."
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
        "Sender: the device originating a message.",
        "Receiver: the intended destination of the message.",
        "Message: the data being exchanged.",
        "Medium: the physical or wireless path carrying the message.",
        "Protocol: rules for formatting, addressing, and exchanging the message. Both sides must support compatible rules."
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
      "title": "Three practical benefits of networking",
      "items": [
        "Resource sharing: devices can use shared printers, storage, and an Internet connection.",
        "Collaboration: people exchange documents and work with shared information.",
        "Centralized backups: managed copies reduce scattered files and support recovery."
      ],
      "expectedCount": 3,
      "lead": "Networks let people collaborate without copying everything onto individual devices."
    },
    {
      "title": "Two risks of shared infrastructure",
      "items": [
        "Security exposure: an improperly exposed share can reveal data or permit unwanted changes.",
        "Shared failures: a failed central device or service can affect many connected users."
      ],
      "expectedCount": 2,
      "lead": "Access controls and maintenance address different networking risks."
    },
    {
      "title": "Two performance measures",
      "items": [
        "Bandwidth: the capacity of a link, usually measured in bits per second.",
        "Latency: the time delay in communication. A high-capacity link may still have high delay."
      ],
      "expectedCount": 2
    },
    {
      "title": "Four network coverage types",
      "lead": "Coverage describes the geographic scope, rather than a strict distance limit.",
      "items": [
        "Personal Area Network (PAN): devices around a person, such as a phone and Bluetooth headset.",
        "Local Area Network (LAN): a room, building, or local campus network, including a Wireless LAN (WLAN).",
        "Metropolitan Area Network (MAN): interconnects sites across a metropolitan area.",
        "Wide Area Network (WAN): spans wider regions, often using carrier links. The Internet interconnects many networks."
      ],
      "expectedCount": 4
    },
    {
      "title": "Two network service architectures",
      "lead": "Architecture describes service roles. It is a different dimension from geographic coverage.",
      "items": [
        "Peer-to-peer: peers can both request and provide resources, such as one PC sharing a folder with another.",
        "Client-server: clients request services from dedicated service providers, such as a school file server."
      ],
      "ask": "Can a Local Area Network (LAN) use client-server architecture? Why?",
      "footnote": "One Local Area Network (LAN) can use both architectures. A server is a role, not simply a large or expensive computer.",
      "expectedCount": 2
    },
    {
      "title": "Resource availability in peer and server networks",
      "kind": "demo",
      "lead": "Compare the same shared files when a peer or the central server goes offline.",
      "type": "availabilityDemo"
    },
    {
      "title": "Two link choices: wired and wireless",
      "lead": "A single network often combines multiple transmission media.",
      "items": [
        "Ethernet provides a cabled link with predictable interference characteristics and a physical port requirement.",
        "Wi-Fi provides radio access and mobility; walls, interference, distance, and shared airtime affect performance."
      ],
      "footnote": "Neither medium is automatically secure. Use authentication, encryption, and appropriate access controls.",
      "expectedCount": 2
    }
  ],
  "walkthrough": false
});
