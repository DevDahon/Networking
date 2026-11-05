# Networking 1 — Interactive Presentations

Live website: **https://devdahon.github.io/Networking/**

Pushes to `main` run the tests, build with the `/Networking/` asset base, and deploy to GitHub Pages through `.github/workflows/deploy.yml`. The workflow can also be started manually from GitHub Actions. Local development remains `npm install` followed by `npm run dev`.

## OSI message walkthroughs

Topic 5 slides 12–13 use a simple message instead of another school webpage example. The first highlights all seven sender and receiver responsibilities. The next accepts an editable message, displays nested transport/network/local-link wrappers, previews actual encoded payload bits, and reconstructs the original text at the receiver. Both start paused, with Previous, Next step, Reset, and optional Autoplay. They are conceptual walkthroughs, not live network traffic or mandatory seven-module software implementations.

## Slide pen tool

Open a presentation and select **Pen tool** in the header. Draw with a mouse, touch, or stylus; choose a color and thickness, erase whole strokes, undo, or clear the current slide. Select **Pointer** to interact with the slide while keeping the toolbar open. Close the tool or press Escape to restore normal interaction. Drawings remain on their own slide when navigating during the current app session; refreshing the page clears them. Ink is positioned relative to the slide area and does not change slide sizing.

## OSI teaching flow

Topic 5 uses a school webpage example and seven focused responsibility demonstrations. Each answers a simple question before introducing technical detail. Automatic playback can be paused and stepped manually. The Session-layer illustration is conceptual, while the Presentation demonstration performs actual text encoding. TCP/IP mapping appears on the dedicated comparison slide.

Sixteen independently accessible presentations in the existing `Networking` repository. The course has **225 slides** across topic-appropriate discussions, including a eighteen-slide OSI Reference Model presentation. Each follows:

**Topic Title → Learning Objectives → Main Discussion and Demonstrations → Summary of the Discussion**

Title slides contain only the topic heading and a relevant visual. Every second slide is **Learning Objectives** with 3–6 concise outcomes; every final slide is **Summary of the Discussion** with 4–7 technical takeaways. There are no quizzes, scored questions, student laboratory tasks, completion requirements, or assessment result screens. Practical procedures use student-facing technical explanations.

## Run and verify

Use Node.js 22.12 or later (verified with Node 22.22.2) and npm.

```powershell
cd C:\Projects\Module\Networking
npm install
npm run dev
```

Open the Local URL printed by Vite, normally http://localhost:5173. Use `npm ci` for a reproducible lockfile installation.

```powershell
npm test
npm run build
npm run preview
npm audit
```

The production build is in `dist/`. Serve it through HTTP rather than opening index.html directly. Hash routes need no server-side rewrite rules, and Vite's relative base supports static subdirectory hosting. Fonts, icons, and diagrams are bundled locally; teaching does not require an external service after installation.

## Topics and demonstrations

| Display topic | Stable route | Preserved teaching demonstrations |
|---|---|---|
| 01 Introduction to Networking | `/#/topic/01-introduction-to-networking` | Automatic/manual message delivery, selectable medium, synchronized signal illustration |
| 02 Types of Networks and Network Architecture | `/#/topic/02-network-types-architecture` | Independent coverage and service-architecture viewers |
| 03 Network Topologies and Basic Network Design | `/#/topic/03-network-topologies` | Six topologies, modeled link/device failures, abstract connection builder |
| 04 Network Devices and Components | `/#/topic/04-network-devices` | Device functions, labeled ports, switching/routing comparison |
| 05 OSI Reference Model | `/#/topic/osi-reference-model` | Seven-layer viewer and individual examples, encapsulation playback, TCP/IP mapping, device-function explorer, explained diagnostic scenarios |
| 06 Network Communication Fundamentals | `/#/topic/05-network-communication` | Layer viewer, wrapping journey, TCP/UDP loss comparison |
| 07 Network Cables, Media, and Tools | `/#/topic/06-network-cables-media` | Cable cross-sections and tool walkthrough |
| 08 RJ45 Crimping, Color Coding, and Cable Testing | `/#/topic/07-rj45-crimping` | Both eight-pin ends, T568A/B references, conductor validation, calculated wire mapping and faults |
| 09 IP Addressing Fundamentals | `/#/topic/08-ip-addressing` | Range classification, network/host boundary, binary octet controls |
| 10 Basic IP Subnetting | `/#/topic/09-basic-subnetting` | Genuine IPv4/CIDR calculator, binary boundaries, explained calculations and worked examples |
| 11 Network Protocols and Services | `/#/topic/network-protocols-services` | 28 slides, 17-protocol/port directory, ARP next-hop journey, web and mail playback, reused TCP/UDP and DHCP demonstrations |
| 12 Static IP Configuration | `/#/topic/10-static-ip` | Editable PCs, link/routing conditions, address validation and reachability |
| 13 Dynamic IP Configuration (DHCP) | `/#/topic/11-dhcp` | Automatic/manual DORA, pool/leases, backward stepping, release/renewal/expiry/exhaustion |
| 14 Router and Wireless Network Configuration | `/#/topic/12-router-wireless` | LAN, pool, SSID, security, wired/wireless clients and address assignment |
| 15 Network File and Printer Sharing | `/#/topic/13-file-printer-sharing` | Host/client, shared resource, dual permission layers, read/write/print outcomes |
| 16 Network Testing and Troubleshooting | `/#/topic/14-network-troubleshooting` | Nine named faults, state-derived commands, direct targeted repair and retesting |

Original numeric route IDs remain permanent identities even when display numbers differ. For example, `05-network-communication` still opens Network Communication Fundamentals, now display Topic 6. The registry's `number` field controls presentation numbering. Existing bookmarks and localStorage topic keys remain compatible.

Counted teaching lists show one concept, message, pin, command, range, or prefix per visible item. Claimed totals are validated against the item count; longer lists use a compact two-column layout. OSI rows retain actual layer numbers and subnet examples retain CIDR labels.

## Additional simulations in every module

Each topic includes an additional demonstration positioned beside its supporting discussion. All earlier demonstrations remain available.

| Topic | Added simulation |
|---|---|
| 01 Introduction | File delivery: bandwidth, serialization, latency, disconnected links |
| 02 Network types and architecture | Peer/server resource availability during host failures |
| 03 Topologies | Calculated path traversal and failed-link alternatives |
| 04 Devices | Source MAC learning, unknown flooding, known forwarding |
| 05 OSI | Communication evidence across functional boundaries |
| 06 Communication | IP endpoints versus per-link next-hop MAC addresses |
| 07 Media | Rate, reach, and cable-condition suitability |
| 08 RJ45 | Eight-pin continuity versus split-pair integrity |
| 09 Addressing | Binary address AND mask calculation |
| 10 Subnetting | Equal child subnet partitioning and address coverage |
| 11 Protocols | DNS cache hits, record changes, TTL expiry, resolver outages |
| 12 Static IP | Independent host-mask decisions and asymmetric reachability |
| 13 DHCP | Reservations, exclusions, active leases, exhaustion |
| 14 Router/wireless | Guest isolation, association, and WAN availability |
| 15 Sharing | FIFO printer queue, page processing, outages, submission permissions |
| 16 Troubleshooting | Traceroute TTL expiry, hidden replies, broken links |

Timed scenes have playback, pause/resume, stepping, reset, and speed controls. Stateful demonstrations provide controls appropriate to their models. Configuration changes pause playback, invalid inputs produce feedback, and leaving a slide disposes its timer. These are teaching models, not connections to actual equipment or services. Transfer timing excludes overhead; fiber limits are an explicitly selected profile; split-pair checks illustrate pair grouping without cable certification; traceroute timing and fault responses are deterministic. DNS uses an explicit teaching clock, and subnet partitioning displays at most sixteen children.

Pure models live in `src/simulations/extraModels.js`; stepped scenes in `extraScenes.js`; stateful interfaces in `extraStateful.js`; slide integration in `src/topics/additionalDemos.js`. Regression coverage is in `tests/extraModels.test.js` and `tests/extraInteractions.test.js`.

## Presenting

- Select any topic card to open its title and request fullscreen in the same user gesture. The Continue Topic link resumes its saved position.
- Use **Previous**, **Next slide**, or the slide selector. The final summary returns directly to Topics without a completion step.
- Keyboard: **Right Arrow / Space** next; **Left Arrow** previous; **Home / End** first/last; **F** toggles fullscreen; **Escape** uses the browser's normal fullscreen or dialog exit behavior.
- Shortcuts do not interrupt form controls, buttons, links, editable content, or an open notes dialog. Simulation controls are bound separately from slide controls.
- Selecting a topic starts its presentation directly. Start, Fullscreen, Presenter Notes, and Restart buttons are omitted. Instructor note data remains in the topic modules.
- Use **Home** or select slide 1 to return to the title; changing slides disposes the active simulation.
- **Back to Topics** is always available; returning to the dashboard exits fullscreen.
- Fullscreen requires browser user activation. A refresh or direct URL load cannot automatically enter fullscreen; use **F** if needed. A blocked request leaves the presentation usable.
- Presentation slides fit the available viewport without scrolling. The outer slide container fills a consistent viewport area on every slide; only the inner content scales to fit, including dynamic output. Dense content on a small screen will appear smaller. The dashboard and explicitly opened notes dialog can scroll independently.
- Direct links can specify a one-based slide, such as `/#/topic/osi-reference-model/slide/12`. Refresh, Back, and Forward use hash routing.

## Demonstration controls and state

Communication, DHCP, and OSI encapsulation support timed playback with pause/resume, stepping, reset, and speed controls where relevant. Playback advances the same state used by the visible explanation and manual controls. Each automatic model owns its pending timer; slide changes, topic changes, restarts, and app teardown dispose it.

DHCP commits a lease at ACK, supports real pool exhaustion and unique active leases, and can restore the preceding exchange/lease table with Previous DORA step. Changing client, pool, or teaching time cancels exchange history. Reset Exchange preserves existing leases; Release or Apply Pool changes them. Lease time advances only with the explicit teaching-clock control.

Topology/device/media viewers remain selectable. Cable validation, IP validation, calculated subnet results, permission decisions, and fault explanations remain technical feedback rather than student grading. Former classification/answer forms are replaced by direct explanatory examples; OSI device matching is now a function explorer, and troubleshooting displays named faults with their evidence and corrective behavior.

## Browser-local storage

The versioned `networking1-v1` record preserves last topic and slide positions. Dashboard progress bars describe the last viewed slide, not mastery or assessment completion.

Old quiz scores, completion flags, laboratory checkboxes, and unrelated stored settings remain archived in the same records; the app neither renders nor updates them. Saving a new slide position preserves those legacy fields. **Reset positions** confirms and resets only slide positions and last topic; it does not delete archived results. No personal information or accounts are required.

## Structure and technology

HTML5, vanilla JavaScript ES modules, Vite, Tailwind CSS 4 plus custom CSS, SVG, Lucide icons, locally bundled Inter, and Vitest/jsdom. No frontend framework, backend, database, or external API.

```text
src/
  main.js                    entry point and local fonts
  app.js                     dashboard, shared presentation shell and controls
  router.js                  hash routes and keyboard eligibility
  components/
    ui.js                    controls and SVG primitives
    titleVisual.js           shared title-only illustrations
    fitSlide.js              viewport fitting and resize cleanup
  topics/
    topicRegistry.js         16 stable IDs, display numbers and topic order
    createTopic.js           shared standardized slides and current notes
    discussionData.js        topic takeaways, instructor walkthroughs, control guidance
    01-...14-*.js             original topic concepts, examples and metadata
    osi-reference-model.js   dedicated eighteen-slide OSI discussion
    network-protocols-services.js  28-slide Topic 11 and common services
  simulations/
    foundations.js           communication, coverage, topology, devices, media
    addressing.js            cable, IPv4/subnet and static configuration interfaces
    services.js              DHCP, router, sharing, troubleshooting interfaces
    playback.js              owned single-timer playback lifecycle
    protocols.js             ARP/web/mail playback and protocol directory
    protocolModels.js        17 protocol profiles, port bindings and exchange models
    osi.js / osiModel.js     OSI views and encapsulation state
    models.js                connectivity graph and diagnostic states
    index.js                 demonstration registration
  utils/
    network.js               tested IPv4, wire-map, DHCP and permission engines
    progress.js              non-destructive position persistence
  styles/main.css            existing light design and presentation layout
tests/
  network.test.js             networking calculation/state regressions
  app.test.js                 all 16 decks, every slide, controls, assessment absence
  interactions.test.js        simulator interactions through the application shell
  osi.test.js                 OSI models, playback, explained views and compatibility
  playback.test.js            communication/DHCP playback, rollback and cleanup
  fitSlide.test.js            canvas-fitting calculations
  counts.test.js              claimed counts, separate entries, pin order and subnet examples
  protocols.test.js           port references, exchange branches, playback and old routes
```

To add a topic, use the shared `topic` builder and provide topic-owned concepts, examples, objectives, metadata, and discussion data; a custom slide array is also supported. Register the stable semantic ID and any specialized demonstration. Keep title/objectives/summary conventions and return a cleanup function from timed simulations. Keep pure calculations separate from DOM controls and extend the structural/interaction tests.

## Modeling boundaries

- IPv4, masks, network/broadcast/range/count results, binary conversion, and conductor mapping are real calculations from entered values. /31 uses the point-to-point convention; /32 represents one address.
- Address classification covers private and common special-purpose ranges conservatively. Outside them, global unicast candidacy does not guarantee allocation or reachability; detailed IANA exceptions are not all enumerated.
- Topologies explicitly state classic unprotected bus/ring and abstract graph assumptions. Ethernet loop prevention, convergence, and vendor behavior are outside the model.
- Wire mapping is not certification of cable category, signal quality, or split-pair performance. Duplicate conductor selections model an accidental bridge/short.
- Static routing mode assumes working gateway interfaces and bidirectional routes. It omits actual ARP timing, VLAN/firewall policy, and host operating-system behavior.
- DHCP models one pending exchange and a 60-second teaching lease. Real DHCP has more states, conflict detection, relay behavior, and different timing.
- The router console models a private /24 LAN and bounded DHCP pool. It never configures real equipment. NAT/WAN and guest isolation are conceptual; Internet transit is not implemented.
- Folder permissions use one authenticated identity and simplified share/NTFS levels. Real ACLs include groups, inheritance, and explicit denies. Printer behavior assumes a ready driver/spooler.
- Diagnostic commands use deterministic modeled states and reserved documentation targets, not real probes. Real ping/tracert can be affected by filtering and loss.
- OSI/TCP-IP mappings and device-layer labels are approximate. UTF-8 encoding/decoding is genuine byte representation, not encryption/compression. Header, trailer, and signal illustrations omit implementation detail and measured timing.
- Reduced-motion settings disable visual animation. Explicit playback/steps still explain each state without sound.

Physical configuration walkthroughs are explanatory material for authorized instructor demonstrations. They do not modify Windows, a router, real shared files, or printers. The site is competency-inspired and does not award TESDA certification.

References: [IANA special-purpose IPv4 registry](https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml), [RFC 3021](https://www.rfc-editor.org/rfc/rfc3021), [RFC 2131](https://www.rfc-editor.org/rfc/rfc2131), [Microsoft OSI architecture](https://learn.microsoft.com/en-us/windows-hardware/drivers/network/windows-network-architecture-and-the-osi-model), [RFC 1122](https://www.rfc-editor.org/rfc/rfc1122).

## Network Protocols and Services — Topic 11

The independent route `/#/topic/network-protocols-services` contains 28 slides using the same title/objectives/discussion/summary structure. It explains TCP, UDP, IP, ARP, ICMP, DHCP, DNS, HTTP, HTTPS, FTP, SFTP, SSH, SMTP, POP3, IMAP, SNMP, and NTP, with common ports, practical uses, and approximate OSI/TCP-IP relationships. No quizzes or student tasks are added.

The topic reuses the existing TCP/UDP loss and DHCP lease/DORA interfaces. Its new ARP, HTTPS-request, and email journeys share the existing playback controller, with play/replay, pause/resume, previous/next step, reset, speed, and disposal on navigation. The web model changes its sequence for DNS failure, TLS validation failure, or an HTTP 503 response. Email compares SMTP submission/relay with IMAP or configurable POP3 retention. The directory exposes all seventeen names and individual transport/port bindings, distinguishing ARP/ICMP identifiers from service ports, FTP active/passive data behavior, SFTP over SSH, and HTTP/3 over UDP.

These are conceptual browser models, not real packet transmission, certificate verification, mailbox access, file operations, or network configuration. Example LAN/routing availability is stated explicitly. Client port numbers are illustrative; real services may use nondefault ports. Reset rewinds the sequence and preserves selected conditions.

Display Topic 12 is now Static IP, 13 DHCP, 14 Router/Wireless, 15 Sharing, and 16 Troubleshooting. Their permanent IDs, old links, content, positions, and historical storage records stay unchanged. New code and styling are limited to the new topic/views, registration, title visual, documentation, and regression coverage; the app shell and original topic sources are retained.

Technical references: [IANA service-name and port registry](https://www.iana.org/assignments/service-names-port-numbers), [DNS over TCP — RFC 7766](https://www.rfc-editor.org/rfc/rfc7766), [HTTP/3 — RFC 9114](https://www.rfc-editor.org/rfc/rfc9114), [mail TLS — RFC 8314](https://www.rfc-editor.org/rfc/rfc8314), [OpenSSH SFTP manual](https://man.openbsd.org/sftp.1).

## Verification limits

Automated tests cover all deck structures, every slide's DOM rendering, calculations, controls, route compatibility, archived-data preservation, and simulation lifecycle. The production build must pass before delivery. See IMPLEMENTATION_REPORT.md for actual results.

Browser automation currently reports that the browser-access host is unavailable. Actual browser/projector screenshots, precise viewport readability/overlap, native fullscreen, and browser-console checks therefore remain unverified. DOM tests and a successful build do not substitute for those visual checks or real hardware validation.

Technical abbreviations are expanded inline in lesson titles, explanations, objectives, and teaching points. Existing full names are retained without duplicate expansion. There is no separate glossary block. Definitions are in `src/components/terminology.js`.

Visual examples follow the concepts they illustrate in every topic. Network coverage has one overview listing all four types, followed by Personal, Local, Metropolitan, and Wide Area Network example slides. The local example shows five computers and one printer, each cabled to a switch. Nineteen example slides use reusable labeled SVG diagrams and two concise explanations. Definitions and placements are in `src/topics/visualExamples.js`; rendering is in `src/components/classroomExample.js`.

The final teaching sequence is reviewed in [SLIDE_SEQUENCE_AUDIT.md](SLIDE_SEQUENCE_AUDIT.md), including the numbered order of all 225 slides. Shared ordering rules live in `src/topics/sequenceTopics.js`; `tests/sequenceTopics.test.js` guards concept/demonstration adjacency and lesson boundaries. Numbered slide links and saved positions remain positional when a topic is reordered.

Topic ownership and cross-topic overlap for every slide are documented in [TOPIC_PLACEMENT_AUDIT.md](TOPIC_PLACEMENT_AUDIT.md). The star example emphasizes topology paths and failure scope; shared-resource examples in introductory lessons retain their own teaching purpose.

Topic 1 now uses the agreed fifteen-slide introductory overview. Components and connection methods are brief previews; detailed device functions, classifications, protocols, and configuration remain in their dedicated topics.

## Topic 1 introductory overview

1. Introduction to Networking
2. Learning Objectives
3. What Is a Computer Network?
4. Everyday Uses of Networks
5. Basic Network Components
6. How Devices Connect
7. Local Network vs. Internet
8. Example: one printer, five connected computers
9. Five Elements of Data Communication
10. A Simple Data Exchange
11. Three Benefits of Networking
12. Two Risks of Networking
13. Two Performance Measures: Bandwidth and Latency
14. Bandwidth, delay, and file delivery
15. Summary of the Discussion

Local Network vs. Internet and A Simple Data Exchange start automatic walkthroughs on entry, with pause, replay, manual steps, speed controls, reduced-motion support, and navigation cleanup. The Internet-availability control changes remote reachability while preserving local printing. How Devices Connect illustrates separate wired and radio links without configuration fields.

Slide headings and opening explanations are edited in `src/topics/clarifyTopics.js`. All 177 discussion/example/simulation slides state their main idea in plain language before the detailed content, while preserving original sequence keys, count metadata, and behavior. The editorial stage validates coverage for every topic and updates hidden transitions to the displayed headings.

Automatic example traffic markers use explicit SVG coordinates calculated along each route in `src/components/packetMotion.js`. The marker starts on its link, remains clipped to the diagram, preserves progress when paused, and cancels animation frames when a slide is left. Browser motion-path animation is no longer required.

Step-based demonstrations share `createStepPlayback` for pause/resume, replay/reset, boundary stepping, and completion after the final step interval. The 12 added scenes, ARP/web/mail journeys, OSI encapsulation, and legacy communication view use this controller. Moving markers use bounded SVG coordinates; static markers match the selected device and remain above device symbols. Stateful DHCP and printer queues retain their model-specific allocation and job rules. A completed DHCP exchange requires explicit replay rather than silently restarting through Resume.

Response arrows identify actual return messages: printer job-acceptance status, document data, name answers, configuration offers/acknowledgments, or error responses. The bidirectional printer example distinguishes job acceptance from completed printing, following the Internet Printing Protocol model in [RFC 8011](https://www.rfc-editor.org/rfc/rfc8011.html). Shared folders are stored resources associated with their host, not separate network endpoints; the host sends file data or an access-denied response.

Timed walkthroughs reserve space for their longest stage before playback through `src/components/simulationSpace.js`. Caption/result panels retain their measured height, so request, response, and status text do not repeatedly change the content scale. Content fitting retains its maximum required height until the viewport changes; browser resizing and fullscreen changes still refit the canvas.

Topic 3 follows concepts → six-endpoint star example and explanation → failure/path simulations → topology selection → eight-seat lab design. Both topology simulations use `src/components/topologyDiagram.js` for matching conventional layouts; bus connections are shown as taps on a shared backbone. The star walkthrough keeps five computers and one printer throughout, and the separate final design example introduces eight computers.

Topic 3 now has dedicated Star, Bus, Ring, Mesh, Tree, and Hybrid example slides, rather than exposing five layouts only through the workbench. Each example includes a description, diagram, automatic explanation, and a comparison condition. The mesh comparison retains a valid alternate path; the bus marker travels along its shared backbone instead of implying that intermediate computers forward it. Topic 3 now contains sixteen slides.

The six topology examples now have matching presentation structure and appear consecutively. The former extra Connections and Failures in a Switched Star slide has been removed; those ideas are already covered inside the Star example’s explanation and automatic steps. Topic 3 now has fifteen slides.
