import { esc } from './ui.js';

export const toolsMetadata = {
  'rj45-setup': {
    name: 'RJ45 Modular Cable Crimping Toolkit',
    shortName: 'RJ45 Crimping Setup',
    tools: [
      {
        num: '01',
        id: 'crimper',
        name: 'RJ45 Modular Crimper',
        badge: 'Primary Tool',
        badgeClass: 'badge-primary',
        image: 'images/tools/rj45_crimper.jpg',
        desc: 'Heavy-duty ratcheting tool with precision 8P8C dies to compress contacts into copper conductors and engage jacket strain relief.'
      },
      {
        num: '02',
        id: 'stripper',
        name: 'UTP Cable Stripper',
        badge: 'Prep Tool',
        badgeClass: 'badge-prep',
        image: 'images/tools/wire_stripper.jpg',
        desc: 'Compact rotary stripper calibrated to score and remove outer PVC jacket cleanly without nicking inner conductor insulation.'
      },
      {
        num: '03',
        id: 'plugs',
        name: 'Modular RJ45 Plugs',
        badge: 'Connector',
        badgeClass: 'badge-conn',
        image: 'images/tools/rj45_plugs.jpg',
        desc: 'Cat 5e/Cat 6 clear polycarbonate male 8P8C plugs with eight gold-plated contact pins and flexible locking tab.'
      },
      {
        num: '04',
        id: 'cable',
        name: 'UTP Patch Cable',
        badge: 'Media',
        badgeClass: 'badge-media',
        image: 'images/tools/utp_cable.jpg',
        desc: 'Four-pair 24 AWG stranded copper Ethernet cable designed for flexible patch cords between workstations and wall jacks.'
      },
      {
        num: '05',
        id: 'cutters',
        name: 'Flush Wire Cutters',
        badge: 'Trimming',
        badgeClass: 'badge-trim',
        image: 'images/tools/flush_cutters.jpg',
        desc: 'Precision micro diagonal cutting snips used to trim aligned conductors square and flat to exactly 1/2-inch length.'
      },
      {
        num: '06',
        id: 'tester',
        name: 'LAN Cable Tester',
        badge: 'Verification',
        badgeClass: 'badge-test',
        image: 'images/tools/cable_tester.jpg',
        desc: 'Dual-unit master and remote continuity wire-map tester to confirm all 8 pin paths and detect open circuits or short circuits.'
      }
    ]
  },
  'keystone-setup': {
    name: 'Keystone Jack 110 Punch-Down Toolkit',
    shortName: 'Keystone Punch-Down Setup',
    tools: [
      {
        num: '01',
        id: 'punchdown',
        name: '110 Impact Punch Tool',
        badge: 'Primary Tool',
        badgeClass: 'badge-primary',
        image: 'images/tools/punchdown_tool.jpg',
        desc: 'Spring-loaded impact driver with reversible 110/66 blade; seats wires into IDC V-notches and cuts excess wire flush in one motion.'
      },
      {
        num: '02',
        id: 'keystone',
        name: 'Keystone Jack (110 IDC)',
        badge: 'Connector',
        badgeClass: 'badge-conn',
        image: 'images/tools/keystone_jack.jpg',
        desc: 'Modular female RJ45 jack with 110 insulation displacement contacts, universal T568A/T568B color coding, and faceplate clips.'
      },
      {
        num: '03',
        id: 'stripper',
        name: 'UTP Cable Stripper',
        badge: 'Prep Tool',
        badgeClass: 'badge-prep',
        image: 'images/tools/wire_stripper.jpg',
        desc: 'Round jacket stripper used to remove 1 to 1.5 inches of outer sheath while preserving tight pair twists up to the IDC blocks.'
      },
      {
        num: '04',
        id: 'cable',
        name: 'Solid-Core UTP Cable',
        badge: 'Media',
        badgeClass: 'badge-media',
        image: 'images/tools/utp_cable.jpg',
        desc: 'Four-pair 23/24 AWG solid copper horizontal cabling engineered for structured permanent in-wall and ceiling conduit runs.'
      },
      {
        num: '05',
        id: 'stand',
        name: 'Punch-Down Palm Stand',
        badge: 'Safety Support',
        badgeClass: 'badge-safety',
        image: 'images/tools/punchdown_stand.jpg',
        desc: 'Contoured palm puck / base cradle that securely holds the jack to prevent hand injury and ensure even downward punching pressure.'
      },
      {
        num: '06',
        id: 'tester',
        name: 'LAN Tester & Dust Caps',
        badge: 'Verification',
        badgeClass: 'badge-test',
        image: 'images/tools/cable_tester.jpg',
        desc: 'Snap-on IDC dust covers to lock seated wires, plus a LAN tester and patch cord to verify complete end-to-end pin mapping.'
      }
    ]
  }
};

export function renderHorizontalToolsSlide(toolKey) {
  const meta = toolsMetadata[toolKey];
  if (!meta) return '';

  return `
    <div class="tools-horizontal-layout">
      <div class="tools-horizontal-grid">
        ${meta.tools.map(tool => `
          <div class="tool-wide-card" data-tool-id="${tool.id}">
            <div class="tool-wide-img-box">
              <img src="${tool.image}" alt="${esc(tool.name)}" class="tool-wide-img" loading="lazy" />
            </div>
            <div class="tool-wide-body">
              <div class="tool-wide-top">
                <span class="tool-num-badge">${tool.num}</span>
                <span class="tool-chip ${tool.badgeClass}">${tool.badge}</span>
              </div>
              <h4 class="tool-wide-title">${esc(tool.name)}</h4>
              <p class="tool-wide-desc">${esc(tool.desc)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
