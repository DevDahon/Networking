import {topic} from './createTopic.js';
export default topic({
  "id": "01-introduction-to-networking",
  "title": "Introduction to Networking",
  "icon": "Network",
  "description": "Discover everyday networking, recognize the main components, and follow a simple exchange between devices.",
  "objectives": [
    "Explain what a computer network does using familiar examples.",
    "Recognize end devices, connecting devices, and wired or wireless links.",
    "Distinguish a working local network from Internet access.",
    "Identify the five communication elements in a request and response.",
    "Describe networking benefits, risks, bandwidth, and latency."
  ],
  "concepts": [
    {
      "title": "What Is a Computer Network?",
      "lead": "A computer network is a system of two or more connected devices that exchange data and share resources. The devices communicate through wired or wireless links using agreed rules called protocols.",
      "items": [
        "Connected devices: computers, phones, servers, and printers can all participate in a network; the devices do not have to be identical.",
        "Communication: a device sends data through a connection, and another device receives and interprets it using compatible communication rules.",
        "Shared access: connected users can exchange messages, use shared files, or send work to a network printer. A local network can provide these services without Internet access."
      ],
      "ask": "Can two computers share a file without Internet access?"
    },
    {
      "title": "Everyday Uses of Networks",
      "lead": "Networks support familiar tasks by connecting people, applications, and shared resources.",
      "items": [
        "Messaging: a phone sends a message to another person through a connected service.",
        "Online learning: a student accesses course materials hosted by a school or Internet service.",
        "Shared resources: several computers use the same printer or store files on a shared host."
      ]
    },
    {
      "title": "Basic Network Components",
      "lead": "Three broad groups work together to make a network useful.",
      "items": [
        "End devices create or receive data: computers, phones, servers, and printers.",
        "Connecting devices provide paths: a switch joins local wired devices, a wireless access point connects wireless devices, and a router joins networks.",
        "Links carry signals: Ethernet cables, optical fiber, and wireless radio connect compatible interfaces."
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
    }
  ],
  "walkthrough": false
});
