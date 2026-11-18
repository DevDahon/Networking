# Networking 1 curriculum coverage review

Reviewed 18 November 2026. Sources: the seven teaching files in G:/My Drive/School/26-2/Networking 1 and Networking-1.docx in the supplied Syllabus folder. Compared with the twelve registered website presentations, their rendered-content helpers and simulations, the course outline, and the published JavaScript bundle fetched from https://devdahon.github.io/Networking/.

The website broadly follows the syllabus, but does not yet provide complete coverage. An outline entry, unused source file, or instructor note alone was not counted as a taught lesson. This is a content audit, not a visual or practical-skills certification. No application code was changed.

## Supplied teaching modules

| Supplied file | Website location | Finding |
|---|---|---|
| 1. Introduction to Computer Networks.pptx | Topic 1, Introduction to Networking and Network Architecture | Most concepts covered: components, network coverage, characteristics, uses and architecture. The historical milestones on source slide 3 are absent. |
| 2. Networking Standards and model.pdf | Topic 4, OSI, plus Topic 6, Protocols | Standards, organizations, formal/de facto standards, standardization steps, seven layers and encapsulation covered. The detailed IEEE 802.1–802.12 survey is reduced mainly to Ethernet and Wi-Fi. TCP/IP groups exist, but an explicit OSI-to-TCP/IP comparison is missing from the registered presentations. |
| 3. Networking Devices.pdf | Topic 3, with gateway context in Topics 7–10 | NIC, hub, switch, repeater and router covered. Standalone bridge, modem operation and protocol-converting gateway explanations are incomplete; an AP acting as a bridge is not equivalent to a dedicated bridge lesson. |
| 4. Computer Networks and Topologies.pdf | Topics 1 and 2 | Core network types, sharing, topology advantages and failure tradeoffs covered; hybrid topology is also included. Source material is not a requirement to repeat dated speed figures or universal claims about WAN reliability. |
| Bandwidth and Throughput.pdf | Topic 1 performance slide and helper visual | Partial. Bandwidth and latency are explained. Throughput is mentioned in wireless tradeoffs but lacks a definition, measurement example, comparison with bandwidth, bottleneck explanation and factors affecting actual delivery. |
| Introduction to IP Addressing.pptx | Topic 7, IP Addressing and Subnet Basics | Core IPv4/IPv6 structure, binary conversion, historical classes/leading bits, network/host portions, private ranges, masks and broadcast addresses covered. |
| Ip Subnetting.pdf | Topic 7 | Core material covered, including CIDR, borrowed bits, block size, usable hosts, and the matching 192.168.10.0/24 into four /26 networks example (slide 14). Addressing and subnetting share one presentation. |

## Syllabus learning plan

| Week | Syllabus expectation | Current coverage |
|---|---|---|
| 1 | Orientation, outcomes, grading, integrity, outputs | Not a complete orientation module. Topic outline exists, but it is not the complete syllabus or an assessment plan. |
| 2 | Introduction and architectures | Topic 1: broadly covered. |
| 3 | PAN/LAN/WLAN/MAN/WAN; Internet/intranet/extranet; SOHO | Partial. PAN/LAN/MAN/WAN taught; Wi-Fi LAN behavior appears elsewhere. Intranet/extranet are outline entries without substantive lessons. WLAN and SOHO need an explicit comparison/application discussion. |
| 4 | Devices, models, types and topology design | Topics 1–3: broadly covered conceptually. Packet Tracer activity not supplied. |
| 5 | Preliminary examination | External assessment; not implemented as a website assessment. |
| 6 | OSI, TCP/IP, layer mapping, encapsulation | Partial. OSI is Topic 4; four TCP/IP groups are later in Topic 6, after media. Explicit mapping needs to be added. |
| 7 | Media, connectors, color coding, construction/testing | Topic 5 covers concepts and procedures, including keystone tools. Actual cable construction and practical testing remain physical laboratory work. |
| 8 | Ethernet, MAC, frames/switching, protocols and ports | Topics 3, 4 and 6 collectively cover these; distributed rather than one complete Ethernet lesson. |
| 9 | Midterm examination | External assessment. |
| 10 | IPv4 structure, classes, public/private, mask/gateway/DNS | Topic 7 plus configuration context in Topic 8: broadly covered; public addressing is less explicit than private/special ranges. |
| 11 | Binary/CIDR, subnet addresses, host ranges, allocation | Topic 7: core coverage present, combined with week 10. |
| 12 | Static/DHCP, Windows, ipconfig /all, leases, IPv6 format/types | Topics 8 and 11 cover configuration/diagnostics. IPv6 is earlier in Topic 7 and its unicast/multicast/anycast types are named without enough explanation. |
| 13 | Workgroup/hostname, discovery, private profile, permissions, mapped drives | Topic 9: sharing/profile/permissions taught; workgroup and hostname setup missing, mapped drives mentioned without a full setup walkthrough. |
| 14–15 | Router/Wi-Fi, LAN/WAN/DHCP, WPA2/WPA3, safe administration | Topic 10, supported by Topic 8: broadly covered conceptually. Actual router/Wi-Fi dongle verification remains external. |
| 16–17 | Security; troubleshooting/documentation in intended outcomes | Topics 11–12 cover both areas. Website separates troubleshooting and security clearly. Syllabus itself mixes troubleshooting outcomes with a security-only topic list in this row. |
| 18 | Final examination | External assessment. |

## Priority corrections

1. Add substantive intranet/extranet, WLAN and SOHO examples; do not count their course-outline labels as coverage.
2. Put the TCP/IP comparison and explicit layer mapping with the OSI/reference-model lesson, before media, matching week 6.
3. Add bandwidth versus measured throughput, a units/worked example, bottlenecks and overhead/congestion/error/device effects.
4. Add workgroup/hostname setup and a mapped-drive procedure to sharing; explain IPv6 basic address types.
5. Add short source-module supplements for networking history, bridge/modem/gateway roles, and an appropriately historical IEEE standards overview where those source details are required.
6. Provide a separate teaching/laboratory plan for Packet Tracer, cabling, actual routers, Wi-Fi dongles, project outputs and assessments. Browser demonstrations alone cannot establish CO1–CO3 practical attainment. Preserve the website's existing presentation-only design unless its scope is explicitly changed.

## Additional findings

- The actual registry has twelve topics. README and page metadata still refer to fourteen and old topic positions. These descriptions need reconciliation.
- The published bundle includes the same twelve current presentation titles and the key findings above. Its asset filename differs from the local dist build; byte-for-byte deployment equivalence was not established.
- Some broad teaching statements need qualification: the ordinary first/last-address and 2^h−2 rules have /31 and /32 exceptions; TCP/IP Application should not be described simply as OSI Layer 7 because it broadly groups OSI 5–7; avoid presenting MAC addresses as permanently immutable or IPv6 address space as literally inexhaustible.
- The syllabus week 16–17 mismatch should be clarified by the instructor rather than silently changed by the website.

## Evidence pointers

Current route registry: src/topics/topicRegistry.js. Outline: src/components/courseOutline.js. Actual lesson definitions: src/topics/01-introduction-to-networking.js, osi-reference-model.js, network-protocols-services.js, 04-network-devices.js, 08-ip-addressing.js, 13-file-printer-sharing.js. Sharing procedure: src/simulations/services.js. Bandwidth illustration: src/components/performanceVisual.js. Extracted source texts and the expanded topic registry are retained alongside this report for review.
