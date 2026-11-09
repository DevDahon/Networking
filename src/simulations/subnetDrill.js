import {subnet,ipv4} from '../utils/network.js';
import {esc,button} from '../components/ui.js';

export function generateSubnetProblem(typeIndex = -1) {
 const types = ['hostsToPrefix', 'findBoundaries', 'equalSubnets', 'validHost'];
 const selectedType = typeIndex >= 0 && typeIndex < types.length ? types[typeIndex] : types[Math.floor(Math.random() * types.length)];

 if (selectedType === 'hostsToPrefix') {
  // e.g. "We need at least N hosts"
  const hostTargets = [
   {hosts: 6, prefix: 28, mask: '255.255.255.240', usable: 14, total: 16},
   {hosts: 12, prefix: 28, mask: '255.255.255.240', usable: 14, total: 16},
   {hosts: 25, prefix: 27, mask: '255.255.255.224', usable: 30, total: 32},
   {hosts: 28, prefix: 27, mask: '255.255.255.224', usable: 30, total: 32},
   {hosts: 50, prefix: 26, mask: '255.255.255.192', usable: 62, total: 64},
   {hosts: 60, prefix: 26, mask: '255.255.255.192', usable: 62, total: 64},
   {hosts: 100, prefix: 25, mask: '255.255.255.128', usable: 126, total: 128},
   {hosts: 120, prefix: 25, mask: '255.255.255.128', usable: 126, total: 128}
  ];
  const item = hostTargets[Math.floor(Math.random() * hostTargets.length)];
  const netOctet = Math.floor(Math.random() * 200) + 10;
  const baseNet = `192.168.${netOctet}.0/24`;

  return {
   type: 'hostsToPrefix',
   title: 'Determine Required Prefix and Subnet Mask',
   question: `A local department requires addresses for at least <strong>${item.hosts} usable hosts</strong> (including PCs, printers, and a gateway). Using the parent address block <code>${baseNet}</code>:`,
   prompts: [
    {key: 'prefix', label: 'Minimum CIDR prefix length (number after /):', placeholder: 'e.g. 27'},
    {key: 'mask', label: 'Dotted-decimal subnet mask:', placeholder: 'e.g. 255.255.255.224'}
   ],
   answers: {
    prefix: String(item.prefix),
    mask: item.mask
   },
   solution: {
    steps: [
     `Formula for usable hosts: 2^h - 2 >= ${item.hosts}, where h is the number of host bits.`,
     `2^${32 - item.prefix} - 2 = ${item.total} - 2 = ${item.usable} usable hosts (fits ${item.hosts} hosts).`,
     `Network bits = 32 - ${32 - item.prefix} = /${item.prefix}.`,
     `Subnet mask: ${item.mask} (the last octet has ${item.prefix - 24} network ones: ${Array(item.prefix - 24).fill(1).join('')}${Array(32 - item.prefix).fill(0).join('')}₂ = ${item.total === 128 ? 128 : item.total === 64 ? 192 : item.total === 32 ? 224 : 240}).`
    ]
   }
  };
 }

 if (selectedType === 'findBoundaries') {
  // e.g. "Given IP and prefix, calculate network, broadcast, first and last"
  const candidates = [
   {ip: '192.168.10.75', prefix: 26},
   {ip: '192.168.1.135', prefix: 26},
   {ip: '172.16.50.85', prefix: 27},
   {ip: '172.16.20.198', prefix: 27},
   {ip: '10.0.1.42', prefix: 28},
   {ip: '10.0.4.110', prefix: 28},
   {ip: '192.168.100.220', prefix: 29}
  ];
  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  const s = subnet(chosen.ip, chosen.prefix);

  return {
   type: 'findBoundaries',
   title: 'Calculate Subnet Boundaries and Usable Range',
   question: `A workstation has been assigned IPv4 configuration <code>${chosen.ip}/${chosen.prefix}</code>. Calculate the boundaries of its subnet:`,
   prompts: [
    {key: 'network', label: 'Network address (subnet ID):', placeholder: 'e.g. ' + s.network},
    {key: 'first', label: 'First usable host IP:', placeholder: 'e.g. ' + s.first},
    {key: 'last', label: 'Last usable host IP:', placeholder: 'e.g. ' + s.last},
    {key: 'broadcast', label: 'Broadcast address:', placeholder: 'e.g. ' + s.broadcast}
   ],
   answers: {
    network: s.network,
    first: s.first,
    last: s.last,
    broadcast: s.broadcast
   },
   solution: {
    steps: [
     `Prefix /${chosen.prefix} leaves ${32 - chosen.prefix} host bits.`,
     `Block size = 2^${32 - chosen.prefix} = ${s.total} addresses.`,
     `Network address is the block boundary containing ${chosen.ip}: ${s.network}.`,
     `First usable host = Network + 1 = ${s.first}.`,
     `Broadcast address = Network + ${s.total - 1} = ${s.broadcast}.`,
     `Last usable host = Broadcast - 1 = ${s.last}.`
    ]
   }
  };
 }

 if (selectedType === 'equalSubnets') {
  // e.g. "Divide /24 into 4 equal subnets"
  const divisors = [
   {count: 4, addBits: 2, prefix: 26, mask: '255.255.255.192', total: 64, usable: 62},
   {count: 8, addBits: 3, prefix: 27, mask: '255.255.255.224', total: 32, usable: 30},
   {count: 2, addBits: 1, prefix: 25, mask: '255.255.255.128', total: 128, usable: 126}
  ];
  const item = divisors[Math.floor(Math.random() * divisors.length)];
  const netOctet = Math.floor(Math.random() * 200) + 1;
  const baseNet = `192.168.${netOctet}.0/24`;

  return {
   type: 'equalSubnets',
   title: 'Equal Subnet Partitioning',
   question: `You are asked to divide the class C network <code>${baseNet}</code> into <strong>${item.count} equal subnets</strong> for different building floors.`,
   prompts: [
    {key: 'prefix', label: 'What is the new CIDR prefix for each subnet? (number only):', placeholder: 'e.g. ' + item.prefix},
    {key: 'usable', label: 'How many ordinary usable hosts does each subnet support?:', placeholder: 'e.g. ' + item.usable},
    {key: 'mask', label: 'What is the new subnet mask?:', placeholder: 'e.g. ' + item.mask}
   ],
   answers: {
    prefix: String(item.prefix),
    usable: String(item.usable),
    mask: item.mask
   },
   solution: {
    steps: [
     `To create ${item.count} subnets, we need 2^n >= ${item.count} bits. 2^${item.addBits} = ${item.count}, so borrow ${item.addBits} network bits.`,
     `New prefix = 24 + ${item.addBits} = /${item.prefix}.`,
     `Remaining host bits = 32 - ${item.prefix} = ${32 - item.prefix}.`,
     `Total addresses per subnet = 2^${32 - item.prefix} = ${item.total}.`,
     `Usable hosts per subnet = ${item.total} - 2 = ${item.usable}.`,
     `Subnet mask = ${item.mask}.`
    ]
   }
  };
 }

 // validHost: "Is X a valid usable host IP on network Y?"
 const hostCases = [
  {ip: '192.168.1.63', prefix: 26, valid: 'no', reason: 'It is the broadcast address for subnet 192.168.1.0/26 (ends on 63).'},
  {ip: '192.168.1.64', prefix: 26, valid: 'no', reason: 'It is the network address (subnet ID) for 192.168.1.64/26.'},
  {ip: '192.168.1.65', prefix: 26, valid: 'yes', reason: 'It is the first usable host address on 192.168.1.64/26.'},
  {ip: '172.16.10.127', prefix: 25, valid: 'no', reason: 'It is the broadcast address for 172.16.10.0/25.'},
  {ip: '172.16.10.128', prefix: 25, valid: 'no', reason: 'It is the network ID for 172.16.10.128/25.'},
  {ip: '10.0.0.15', prefix: 28, valid: 'no', reason: 'It is the broadcast address for 10.0.0.0/28 (block size 16: 0 to 15).'},
  {ip: '10.0.0.14', prefix: 28, valid: 'yes', reason: 'It is a valid usable host address on 10.0.0.0/28 (usable range .1 to .14).'}
 ];
 const chosenCase = hostCases[Math.floor(Math.random() * hostCases.length)];

 return {
  type: 'validHost',
  title: 'Validate Usable Host Address',
  question: `A technician wants to configure a computer with IP address <code>${chosenCase.ip}</code> on subnet <code>/${chosenCase.prefix}</code>. Is <strong>${chosenCase.ip}</strong> a valid, usable host address that can be assigned to a computer interface?`,
  prompts: [
   {key: 'valid', label: 'Is this a usable host address? (yes or no):', placeholder: 'yes or no'}
  ],
  answers: {
   valid: chosenCase.valid
  },
  solution: {
   steps: [
    `Prefix /${chosenCase.prefix} calculates block size 2^${32 - chosenCase.prefix}.`,
    `Answer: ${chosenCase.valid.toUpperCase()}.`,
    chosenCase.reason
   ]
  }
 };
}

export function renderSubnetDrill(container) {
 let currentProblem = generateSubnetProblem();
 let score = 0;
 let totalAttempts = 0;
 let streak = 0;
 let feedback = null;
 let showSolution = false;

 function draw() {
  container.innerHTML = `
   <div class="subnet-drill-container">
    <div class="subnet-drill-header">
     <div class="drill-stats">
      <span class="pill-stat"><strong>Score:</strong> ${score} / ${totalAttempts} (${totalAttempts ? Math.round((score / totalAttempts) * 100) : 0}%)</span>
      <span class="pill-stat"><strong>Streak:</strong> ${streak} ${streak >= 3 ? '🔥' : ''}</span>
     </div>
     <div class="drill-actions-top">
      ${button('New Random Problem', 'new-problem', 'quiet')}
     </div>
    </div>

    <div class="drill-problem-card">
     <div class="drill-badge">${esc(currentProblem.title)}</div>
     <p class="drill-question">${currentProblem.question}</p>

     <form class="drill-form" id="subnet-drill-form">
      <div class="drill-inputs-grid">
       ${currentProblem.prompts.map(p => `
        <div class="drill-field">
         <label for="drill-${p.key}">${esc(p.label)}</label>
         <input type="text" id="drill-${p.key}" name="drill-${p.key}" placeholder="${esc(p.placeholder)}" autocomplete="off" />
        </div>
       `).join('')}
      </div>
      <div class="control-row drill-controls">
       <button type="submit" class="primary" data-action="check">Check Answer</button>
       ${button(showSolution ? 'Hide Solution' : 'Reveal Step-by-Step Solution', 'toggle-solution')}
       ${button('Next Problem', 'next-problem')}
      </div>
     </form>

     ${feedback ? `
      <div class="feedback ${feedback.ok ? 'success' : 'error'}" role="alert">
       <strong>${feedback.ok ? '✓ Correct!' : '✗ Not quite correct.'}</strong>
       <p>${esc(feedback.message)}</p>
      </div>
     ` : ''}

     ${showSolution ? `
      <div class="drill-solution-card">
       <h4>Step-by-Step Calculation:</h4>
       <ol>
        ${currentProblem.solution.steps.map(step => `<li>${esc(step)}</li>`).join('')}
       </ol>
       <div class="drill-answers-summary">
        <strong>Expected Answers:</strong>
        <ul>
         ${Object.entries(currentProblem.answers).map(([k, v]) => `<li><code>${esc(k)}</code>: <strong>${esc(v)}</strong></li>`).join('')}
        </ul>
       </div>
      </div>
     ` : ''}
    </div>
   </div>
  `;

  // Wire events
  const form = container.querySelector('#subnet-drill-form');
  if (form) {
   form.onsubmit = e => {
    e.preventDefault();
    checkAnswers();
   };
  }

  container.querySelector('[data-action="new-problem"]')?.addEventListener('click', () => {
   currentProblem = generateSubnetProblem();
   feedback = null;
   showSolution = false;
   draw();
  });

  container.querySelector('[data-action="next-problem"]')?.addEventListener('click', () => {
   currentProblem = generateSubnetProblem();
   feedback = null;
   showSolution = false;
   draw();
  });

  container.querySelector('[data-action="toggle-solution"]')?.addEventListener('click', () => {
   showSolution = !showSolution;
   draw();
  });
 }

 function checkAnswers() {
  const userAnswers = {};
  let allCorrect = true;
  const incorrectFields = [];

  for (const p of currentProblem.prompts) {
   const input = container.querySelector(`[name="drill-${p.key}"]`);
   const rawVal = (input?.value || '').trim().toLowerCase().replace(/^\//, '');
   const expected = String(currentProblem.answers[p.key]).toLowerCase().trim();
   userAnswers[p.key] = rawVal;

   if (rawVal !== expected) {
    allCorrect = false;
    incorrectFields.push(p.label);
   }
  }

  totalAttempts++;
  if (allCorrect) {
   score++;
   streak++;
   feedback = {
    ok: true,
    message: `All answers are correct! You've mastered this concept. +1 to your streak!`
   };
  } else {
   streak = 0;
   feedback = {
    ok: false,
    message: `Review your calculation for: ${incorrectFields.map(f => f.split('(')[0].trim()).join(', ')}. Click "Reveal Step-by-Step Solution" to check the math.`
   };
  }

  draw();
 }

 draw();
}

