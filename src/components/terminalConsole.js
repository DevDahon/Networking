import {esc,button} from './ui.js';

export function createTerminalConsole({
 container,
 hostName = 'PC',
 prompt = 'C:\\Users\\Student>',
 onExecute = null,
 quickCommands = ['ipconfig', 'ipconfig /all', 'ping 192.168.1.1', 'help', 'cls'],
 initialOutput = 'Microsoft Windows [Version 10.0.19045.3803]\n(c) Microsoft Corporation. All rights reserved.\n\nType a command or click a quick command below to begin.'
}) {
 const history = [];
 let historyIndex = -1;
 const lines = initialOutput ? [initialOutput] : [];

 function render() {
  container.innerHTML = `
   <div class="mock-terminal-wrapper">
    <div class="mock-terminal-header">
     <div class="mock-terminal-dots">
      <span class="dot close"></span>
      <span class="dot minimize"></span>
      <span class="dot maximize"></span>
     </div>
     <div class="mock-terminal-title">Command Prompt - ${esc(hostName)}</div>
    </div>
    <div class="mock-terminal-screen">
     <pre class="terminal mock-terminal-output" role="log" aria-live="polite">${esc(lines.join('\n\n'))}</pre>
     <form class="mock-terminal-input-row" id="terminal-cmd-form">
      <span class="mock-terminal-prompt">${esc(prompt)}&nbsp;</span>
      <input 
       type="text" 
       name="terminal-cmd" 
       class="mock-terminal-input" 
       placeholder="Enter command (e.g. ping, ipconfig, tracert)..." 
       autocomplete="off" 
       spellcheck="false" 
      />
      <button type="submit" class="terminal-send-btn primary" data-action="run">Run</button>
     </form>
    </div>
    ${quickCommands && quickCommands.length ? `
     <div class="mock-terminal-quick-chips">
      <span class="quick-chips-label">Quick commands:</span>
      <div class="quick-chips-list">
       ${quickCommands.map(cmd => `<button type="button" class="quick-chip" data-cmd="${esc(cmd)}"><code>${esc(cmd)}</code></button>`).join('')}
      </div>
     </div>
    ` : ''}
   </div>
  `;

  const form = container.querySelector('#terminal-cmd-form');
  const inputEl = container.querySelector('[name="terminal-cmd"]');
  const outputEl = container.querySelector('.mock-terminal-output');

  if (outputEl) {
   outputEl.scrollTop = outputEl.scrollHeight;
  }

  if (form && inputEl) {
   form.onsubmit = e => {
    e.preventDefault();
    const cmd = inputEl.value.trim();
    if (!cmd) return;
    executeCommand(cmd);
    inputEl.value = '';
    history.push(cmd);
    historyIndex = history.length;
   };

   inputEl.onkeydown = e => {
    if (e.key === 'ArrowUp') {
     e.preventDefault();
     if (history.length && historyIndex > 0) {
      historyIndex--;
      inputEl.value = history[historyIndex];
     }
    } else if (e.key === 'ArrowDown') {
     e.preventDefault();
     if (historyIndex < history.length - 1) {
      historyIndex++;
      inputEl.value = history[historyIndex];
     } else {
      historyIndex = history.length;
      inputEl.value = '';
     }
    } else if (e.key === 'Tab') {
     e.preventDefault();
     const val = inputEl.value.trim().toLowerCase();
     const match = quickCommands.find(c => c.toLowerCase().startsWith(val));
     if (match) inputEl.value = match;
    }
   };
  }

  container.querySelectorAll('.quick-chip').forEach(btn => {
   btn.onclick = () => {
    const cmd = btn.dataset.cmd;
    if (inputEl) inputEl.value = cmd;
    executeCommand(cmd);
    history.push(cmd);
    historyIndex = history.length;
   };
  });
 }

 function executeCommand(cmd) {
  const cleanCmd = cmd.trim();
  if (cleanCmd.toLowerCase() === 'cls' || cleanCmd.toLowerCase() === 'clear') {
   lines.length = 0;
   render();
   return;
  }

  let resultText = '';
  if (typeof onExecute === 'function') {
   resultText = onExecute(cleanCmd);
  }

  lines.push(`${prompt} ${cleanCmd}\n${resultText}`);
  render();
 }

 render();

 return {
  print: (text) => {
   lines.push(text);
   render();
  },
  clear: () => {
   lines.length = 0;
   render();
  },
  execute: executeCommand
 };
}

