import {it,expect,beforeEach,afterEach,vi} from 'vitest';
import {generateSubnetProblem,renderSubnetDrill} from '../src/simulations/subnetDrill.js';
import {addressExplorer,staticIP} from '../src/simulations/addressing.js';
import {troubleshooting} from '../src/simulations/services.js';

let root;
beforeEach(()=>{
 document.body.innerHTML='<div id="app"></div>';
 root=document.querySelector('#app');
});
afterEach(()=>{
 root.innerHTML='';
});

it('generateSubnetProblem produces valid mathematical problems for all types',()=>{
 for (let i = 0; i < 4; i++) {
  const p = generateSubnetProblem(i);
  expect(p.title).toBeTruthy();
  expect(p.question).toBeTruthy();
  expect(p.prompts.length).toBeGreaterThan(0);
  expect(Object.keys(p.answers).length).toBe(p.prompts.length);
  expect(p.solution.steps.length).toBeGreaterThan(0);
 }
});

it('renderSubnetDrill supports checking answers, scoring, and toggling step-by-step solution',()=>{
 renderSubnetDrill(root);
 expect(root.querySelector('.subnet-drill-container')).not.toBeNull();
 expect(root.querySelector('.pill-stat').textContent).toContain('Score: 0 / 0');

 // Toggle solution
 const solutionBtn = root.querySelector('[data-action="toggle-solution"]');
 expect(solutionBtn).not.toBeNull();
 solutionBtn.click();
 expect(root.querySelector('.drill-solution-card')).not.toBeNull();
 solutionBtn.click();
 expect(root.querySelector('.drill-solution-card')).toBeNull();

 // Submit incorrect answers
 const form = root.querySelector('#subnet-drill-form');
 const firstInput = form.querySelector('input');
 firstInput.value = 'wrong-value';
 form.dispatchEvent(new Event('submit', {bubbles:true, cancelable:true}));
 expect(root.querySelector('.feedback.error')).not.toBeNull();
 expect(root.querySelector('.pill-stat').textContent).toContain('0 / 1');

 // Next problem
 root.querySelector('[data-action="next-problem"]').click();
 expect(root.querySelector('.feedback')).toBeNull();
});

it('addressExplorer allows switching between calculator and problem generator tabs',()=>{
 addressExplorer(root, true);
 expect(root.querySelector('#calculate')).not.toBeNull();
 expect(root.querySelector('.tab-btn[data-tab="calc"]').classList.contains('active')).toBe(true);

 // Switch to generator
 const drillTab = root.querySelector('.tab-btn[data-tab="drill"]');
 drillTab.click();
 expect(root.querySelector('.subnet-drill-container')).not.toBeNull();
 expect(root.querySelector('#calculate')).toBeNull();

 // Switch back to calculator
 const calcTab = root.querySelector('.tab-btn[data-tab="calc"]');
 calcTab.click();
 expect(root.querySelector('#calculate')).not.toBeNull();
 expect(root.querySelector('.subnet-drill-container')).toBeNull();
});

it('staticIP displays the Windows TCP/IPv4 Properties dialog visual and step-by-step configuration procedure',()=>{
 staticIP(root);
 expect(root.querySelector('.static-guide-grid')).not.toBeNull();
 expect(root.querySelector('.win-ipv4-dialog-svg')).not.toBeNull();
 expect(root.querySelector('#static-console-area')).toBeNull();
 expect(root.querySelectorAll('input, button')).toHaveLength(0);
 const steps = [...root.querySelectorAll('.static-procedure-list li')];
 expect(steps).toHaveLength(5);
 expect(root.textContent).toContain('ncpa.cpl');
 expect(root.textContent).toContain('192.168.1.10');
 expect(root.textContent).toContain('ipconfig /all');
});

it('troubleshooting provides an interactive prompt supporting typed commands, quick chips, help and cls',()=>{
 troubleshooting(root);
 expect(root.querySelector('.terminal-container')).not.toBeNull();

 // Quick command help
 const helpChip = root.querySelector('[data-cmd="help"]');
 helpChip.click();
 expect(root.querySelector('.terminal').textContent).toContain('Available diagnostic commands');

 // Quick command ping 127.0.0.1 (loopback)
 const loopChip = root.querySelector('[data-cmd="ping 127.0.0.1"]');
 loopChip.click();
 expect(root.querySelector('.terminal').textContent).toContain('Reply from 127.0.0.1');

 // Type command in prompt
 const input = root.querySelector('#command');
 input.value = 'ipconfig /all';
 root.querySelector('#terminal-prompt-form').dispatchEvent(new Event('submit', {bubbles:true, cancelable:true}));
 expect(root.querySelector('.terminal').textContent).toContain('192.168.1.10');
});
