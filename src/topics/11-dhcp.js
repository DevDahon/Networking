import {topic} from './createTopic.js';
export default topic({
  "id": "11-dhcp",
  "title": "Dynamic Host Configuration Protocol (DHCP)",
  "icon": "RefreshCw",
  "description": "Step through DORA and manage a real simulated pool with leases, renewal, and exhaustion.",
  "objectives": [
    "Explain Discover, Offer, Request, and Acknowledgment.",
    "Allocate unique addresses within a configured pool.",
    "Diagnose pool exhaustion, expired leases, and unreachable DHCP service."
  ],
  "concepts": [
    {
      "title": "A lease supplies configuration",
      "lead": "DHCP lets a client obtain configuration automatically from an authorized server rather than entering each value manually.",
      "items": [
        "Address pool: Range of usable IPs ready to hand out, excluding reserved server IPs.",
        "Temporary lease: Assigns an IP for a set time along with mask, gateway, and DNS.",
        "Conflict prevention: Tracks active leases so two devices never get the same IP."
      ]
    },
    {
      "title": "Four messages in the initial DHCP exchange",
      "lead": "An unconfigured IPv4 client starts by discovering a server on its local network (or through a configured relay).",
      "items": [
        "Discover: Client broadcasts to find an available DHCP server.",
        "Offer: Server proposes an available IP address and settings.",
        "Request: Client asks to use the offered IP address.",
        "Acknowledgment (ACK): Server confirms the lease so the client can start using the IP."
      ],
      "expectedCount": 4,
      "footnote": "Remember DORA: Discover, Offer, Request, Acknowledgment."
    },
    {
      "title": "Five lease lifecycle and failure events",
      "lead": "Leases have lifetimes; a client should renew before expiry rather than keep an address forever.",
      "items": [
        "Renewal: Client extends its current lease before time runs out.",
        "Release: Client gives its IP address back to the server early.",
        "Expiry: Lease time ends and the IP returns to the available pool.",
        "Pool exhaustion: All IPs are taken, so new devices cannot join.",
        "Server unavailable: Client falls back to a 169.254.x.x self-assigned address with no Internet."
      ],
      "expectedCount": 5
    }
  ],
  "demo": {
    "type": "dhcp",
    "title": "DHCP lease desk",
    "lead": "Modeled protocol • configure a pool, step DORA, allocate clients, release or renew, and advance lease time."
  },
  "application": {
    "title": "Thirty laptops join a lab",
    "lead": "The router has a DHCP pool of only twenty addresses and several existing leases.",
    "items": [
      "Some new clients cannot obtain an address even though their Wi-Fi association succeeds.",
      "Inspect pool capacity and active leases before replacing cables.",
      "An unauthorized second DHCP server can supply conflicting options; keep the lab isolated."
    ]
  },
  "installation": {
    "equipment": "Lab router with DHCP, two PCs, cables or approved Wi-Fi.",
    "mistakes": "Including the router in a pool; a pool in a different subnet; testing on a production LAN.",
    "safety": "Never attach an unapproved DHCP server to the school network."
  }
});
