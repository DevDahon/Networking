import {topic} from './createTopic.js';
export default topic({
  "id": "05-network-communication",
  "title": "Network Communication Fundamentals",
  "icon": "Layers",
  "description": "Follow encapsulation, explore the OSI layers, and compare reliable delivery with best-effort datagrams.",
  "objectives": [
    "Describe the seven OSI layers and the TCP/IP grouping.",
    "Distinguish frames, packets, TCP segments, and UDP datagrams.",
    "Explain MAC versus IP addressing and local versus remote delivery."
  ],
  "concepts": [
    {
      "title": "Seven OSI layer responsibilities",
      "items": [
        "Application: network services used by applications; grouped into TCP/IP Application.",
        "Presentation: representation, encoding, and encryption concepts; grouped into TCP/IP Application.",
        "Session: dialog and session coordination concepts; grouped into TCP/IP Application.",
        "Transport: process-to-process delivery using TCP or UDP; maps to TCP/IP Transport.",
        "Network: logical addressing and routing using IP; maps to TCP/IP Internet.",
        "Data Link: local frames, MAC addressing, and media access; grouped into TCP/IP Link.",
        "Physical: signals and bit transmission through a medium; grouped into TCP/IP Link."
      ],
      "expectedCount": 7,
      "lead": "OSI has seven layers; the common TCP/IP view groups functions into four layers.",
      "itemLabels": [
        "7",
        "6",
        "5",
        "4",
        "3",
        "2",
        "1"
      ],
      "footnote": "Mappings are approximate; real implementations do not always fit into separate conceptual boxes."
    },
    {
      "title": "Four layers in the TCP/IP model",
      "items": [
        "Application: application protocols plus representation and dialog functions.",
        "Transport: process-to-process services, including TCP and UDP.",
        "Internet: IP logical addressing and forwarding across networks.",
        "Link: local framing, media access, and physical transmission."
      ],
      "expectedCount": 4
    },
    {
      "title": "Wrap the data, then unwrap it",
      "lead": "Encapsulation adds control information as data passes toward the transmission medium.",
      "items": [
        "Application data is carried in a TCP segment or UDP datagram, then an IP packet, then a link-layer frame. Physical signals carry the frame bits.",
        "The receiver interprets and removes the relevant headers. Ethernet also uses a trailer for error detection."
      ]
    },
    {
      "title": "Two transport services: TCP and UDP",
      "items": [
        "TCP: an ordered reliable byte stream with sequence numbers, acknowledgments, and retransmission.",
        "UDP: datagrams without built-in delivery or ordering guarantees; applications may add reliability."
      ],
      "expectedCount": 2
    },
    {
      "title": "Local delivery and the next hop",
      "lead": "IP identifies an interface’s logical network address. A MAC address identifies a link-layer interface within the local link context.",
      "items": [
        "For a local IPv4 destination, ARP resolves its local MAC address before Ethernet delivery.",
        "For a remote destination, the host sends the frame to the gateway’s MAC. The packet still names the remote destination IP.",
        "A router replaces link-layer framing at each hop; MAC addresses do not serve as end-to-end Internet destination addresses."
      ]
    }
  ],
  "demo": {
    "type": "osi",
    "title": "Inside the message",
    "lead": "Conceptual walkthrough • select any OSI layer, step through encapsulation, and compare TCP/UDP loss handling."
  },
  "application": {
    "title": "Open a school website",
    "lead": "A laptop sends a request to a web server outside the classroom LAN.",
    "items": [
      "DNS resolves a name; a transport such as TCP or QUIC over UDP carries the web exchange.",
      "The laptop frames traffic toward its gateway because the server is remote.",
      "Use the models to organize reasoning, not to claim every application executes seven literal separate operations."
    ]
  },
  "installation": {
    "equipment": "Paper, colored labels, optional instructor-provided packet capture.",
    "mistakes": "Calling every data unit a packet; treating OSI as a literal implementation.",
    "safety": "Do not capture other users’ traffic without explicit permission."
  }
});
