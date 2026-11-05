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
        "A pool is the set of available addresses. Exclusions and reservations keep infrastructure addresses under control.",
        "A lease grants temporary use; DHCP also supplies options such as subnet mask, gateway, and DNS.",
        "A server must avoid duplicate active assignments. Clients and servers also use conflict detection in real deployments."
      ]
    },
    {
      "title": "Four messages in the initial DHCP exchange",
      "lead": "An unconfigured IPv4 client starts by discovering a server on its local network (or through a configured relay).",
      "items": [
        "Discover: the client seeks DHCP servers.",
        "Offer: a server proposes an available address and configuration options.",
        "Request: the client identifies the chosen offer and requests its configuration.",
        "Acknowledgment (ACK): the server confirms the lease, after which the client can use the configuration."
      ],
      "expectedCount": 4,
      "footnote": "Initial discovery uses broadcast. Some replies can be unicast depending on client state; DORA is an introduction to a richer state machine."
    },
    {
      "title": "Five lease lifecycle and failure events",
      "lead": "Leases have lifetimes; a client should renew before expiry rather than keep an address forever.",
      "items": [
        "Renewal: requests an extension from the existing server; it need not repeat the initial full DORA exchange.",
        "Release: returns the address to the server.",
        "Expiry: makes an unrenewed lease available again.",
        "Pool exhaustion: no unused address is available for another client.",
        "Server unavailable: a client may eventually self-assign link-local configuration without ordinary routed access."
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
