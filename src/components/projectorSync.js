/**
 * PowerPoint-style Extend Display / Projector synchronization module.
 * Allows the instructor to keep controls, simulations, and pen/laser tools on
 * the laptop screen while projecting a clean, live-mirrored full-screen slide
 * stage on an extended projector display.
 */
export function isProjectorMode(win = window) {
  try {
    const params = new URLSearchParams(win.location?.search || '');
    return params.get('projector') === '1' || win.name === 'networking1-projector';
  } catch {
    return false;
  }
}

export function createProjectorSync(root, { onRemoteNavigate, onRemoteTheme, onStateChange } = {}) {
  const isProjector = isProjectorMode(window);
  let popup = null;
  let channel = null;
  let contentObserver = null;
  let applyingRemoteDom = false;
  let floatingBar = null;
  let pollTimer = null;

  try {
    if (typeof BroadcastChannel === 'function') {
      channel = new BroadcastChannel('networking1-projector-v1');
    }
  } catch {
    channel = null;
  }

  function send(payload) {
    const msg = { ...payload, source: isProjector ? 'projector' : 'controller' };
    try {
      channel?.postMessage(msg);
    } catch {}
    try {
      if (!isProjector && popup && !popup.closed) {
        popup.postMessage(msg, '*');
      } else if (isProjector && window.opener && !window.opener.closed) {
        window.opener.postMessage(msg, '*');
      }
    } catch {}
  }

  function captureSlideState() {
    const content = root.querySelector('#slide-content');
    if (!content) return null;
    const controls = [...content.querySelectorAll('input, select, textarea')].map(el => ({
      value: el.value,
      checked: Boolean(el.checked)
    }));
    const details = [...content.querySelectorAll('details')].map(el => Boolean(el.open));
    return {
      type: 'dom-sync',
      hash: location.hash,
      html: content.innerHTML,
      controls,
      details
    };
  }

  function broadcastSlideDom() {
    if (isProjector || applyingRemoteDom) return;
    const snapshot = captureSlideState();
    if (snapshot) send(snapshot);
  }

  function applyRemoteDom(msg) {
    if (!msg || msg.hash !== location.hash) return;
    const content = root.querySelector('#slide-content');
    if (!content) return;
    applyingRemoteDom = true;
    try {
      if (typeof msg.html === 'string' && content.innerHTML !== msg.html) {
        content.innerHTML = msg.html;
      }
      if (Array.isArray(msg.controls)) {
        const els = content.querySelectorAll('input, select, textarea');
        msg.controls.forEach((state, idx) => {
          const el = els[idx];
          if (!el) return;
          if (el.value !== state.value) el.value = state.value;
          if ('checked' in el) el.checked = Boolean(state.checked);
        });
      }
      if (Array.isArray(msg.details)) {
        const dets = content.querySelectorAll('details');
        msg.details.forEach((isOpen, idx) => {
          if (dets[idx]) dets[idx].open = Boolean(isOpen);
        });
      }
    } finally {
      applyingRemoteDom = false;
    }
  }

  function applyRemoteInk(msg) {
    if (!msg || msg.hash !== location.hash) return;
    const svg = root.querySelector('.slide-ink');
    if (svg && typeof msg.svgHtml === 'string') {
      svg.innerHTML = msg.svgHtml;
    }
  }

  function broadcastFullState() {
    const isDark = document.documentElement.classList.contains('dark');
    send({ type: 'route', hash: location.hash, theme: isDark ? 'dark' : 'light' });
    broadcastSlideDom();
    const svg = root.querySelector('.slide-ink');
    if (svg) send({ type: 'ink-sync', hash: location.hash, svgHtml: svg.innerHTML });
  }

  function handleMessage(raw) {
    const msg = raw?.data || raw;
    if (!msg || typeof msg !== 'object' || !msg.type) return;
    if (msg.source === (isProjector ? 'projector' : 'controller')) return;

    if (msg.type === 'hello' && !isProjector) {
      broadcastFullState();
      onStateChange?.();
      return;
    }
    if (msg.type === 'bye') {
      popup = null;
      onStateChange?.();
      return;
    }
    if (msg.type === 'theme' && msg.theme) {
      onRemoteTheme?.(msg.theme === 'dark');
      return;
    }
    if (msg.type === 'route') {
      if (msg.theme) onRemoteTheme?.(msg.theme === 'dark');
      if (msg.hash && msg.hash !== location.hash) {
        onRemoteNavigate?.(msg.hash);
      }
      return;
    }
    if (isProjector && msg.type === 'dom-sync') {
      applyRemoteDom(msg);
      return;
    }
    if (isProjector && msg.type === 'ink-sync') {
      applyRemoteInk(msg);
    }
  }

  const onWindowMessage = event => handleMessage(event.data);
  if (channel) channel.onmessage = event => handleMessage(event.data);
  window.addEventListener('message', onWindowMessage);

  function observeSlideContent() {
    contentObserver?.disconnect();
    contentObserver = null;
    if (isProjector) return;
    const content = root.querySelector('#slide-content');
    if (!content || typeof MutationObserver !== 'function') return;
    contentObserver = new MutationObserver(() => broadcastSlideDom());
    contentObserver.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });
  }

  const onContentInteract = event => {
    if (isProjector) return;
    if (event.target?.closest?.('#slide-content')) {
      broadcastSlideDom();
    }
  };
  root.addEventListener('input', onContentInteract);
  root.addEventListener('change', onContentInteract);
  root.addEventListener('click', onContentInteract);

  async function placeOnExtendedScreen(targetWindow) {
    if (!targetWindow) return;
    if (typeof window.getScreenDetails === 'function') {
      try {
        const details = await window.getScreenDetails();
        const external = details.screens?.find(s => s !== details.currentScreen) || details.screens?.[0];
        if (external) {
          targetWindow.moveTo?.(external.availLeft ?? external.left ?? 0, external.availTop ?? external.top ?? 0);
          targetWindow.resizeTo?.(external.availWidth ?? external.width ?? 1280, external.availHeight ?? external.height ?? 720);
          try {
            await targetWindow.document?.documentElement?.requestFullscreen?.({ navigationUI: 'hide', screen: external });
          } catch {}
          return;
        }
      } catch {}
    }
    try {
      await targetWindow.document?.documentElement?.requestFullscreen?.({ navigationUI: 'hide' });
    } catch {}
  }

  function isActive() {
    return Boolean(popup && !popup.closed);
  }

  function stopPoll() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }

  function startCloseWatch() {
    stopPoll();
    if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '')) return;
    pollTimer = setInterval(() => {
      if (!popup || popup.closed) {
        popup = null;
        stopPoll();
        onStateChange?.();
      }
    }, 1000);
  }

  function toggleExtendDisplay() {
    if (isActive()) {
      try {
        popup.close();
      } catch {}
      popup = null;
      stopPoll();
      onStateChange?.();
      return false;
    }
    const base = `${location.origin}${location.pathname}`;
    const targetUrl = `${base}?projector=1${location.hash || '#/topic/01-introduction-to-networking/slide/1'}`;
    const leftOffset = (window.screen?.availWidth || 1280);
    const features = `popup=yes,width=1280,height=720,left=${leftOffset},top=0`;
    popup = window.open(targetUrl, 'networking1-projector', features);
    if (popup) {
      placeOnExtendedScreen(popup);
      startCloseWatch();
      broadcastFullState();
      onStateChange?.();
      return true;
    }
    return false;
  }

  function updateProjectorBarVisibility() {
    if (!floatingBar) return;
    floatingBar.hidden = Boolean(document.fullscreenElement);
  }

  function mountProjectorFloatingBar() {
    if (!isProjector) return;
    document.body.classList.add('projector-display-mode');
    if (!floatingBar) {
      floatingBar = document.createElement('div');
      floatingBar.className = 'projector-floating-bar';
      floatingBar.setAttribute('role', 'region');
      floatingBar.setAttribute('aria-label', 'Extended projector display controls');
      floatingBar.innerHTML = `
        <span class="projector-badge-dot" aria-hidden="true"></span>
        <span class="projector-bar-text"><b>Extended Projector View</b> · Move to projector screen &amp; fullscreen</span>
        <button type="button" class="button primary projector-fs-btn" data-projector-fullscreen>Fullscreen Projector (F)</button>
      `;
      floatingBar.querySelector('[data-projector-fullscreen]').onclick = () => {
        try {
          document.documentElement.requestFullscreen?.();
        } catch {}
      };
      document.body.append(floatingBar);
    }
    updateProjectorBarVisibility();
  }

  if (isProjector) {
    mountProjectorFloatingBar();
    document.addEventListener('fullscreenchange', updateProjectorBarVisibility);
    send({ type: 'hello' });
  }

  return {
    isProjector,
    isActive,
    toggleExtendDisplay,
    notifyRouteChange() {
      observeSlideContent();
      if (isProjector) {
        mountProjectorFloatingBar();
      }
      broadcastFullState();
    },
    notifyThemeChange(isDark) {
      send({ type: 'theme', theme: isDark ? 'dark' : 'light' });
    },
    syncInk(svgHtml) {
      if (!isProjector) {
        send({ type: 'ink-sync', hash: location.hash, svgHtml });
      }
    },
    destroy() {
      stopPoll();
      contentObserver?.disconnect();
      contentObserver = null;
      root.removeEventListener('input', onContentInteract);
      root.removeEventListener('change', onContentInteract);
      root.removeEventListener('click', onContentInteract);
      window.removeEventListener('message', onWindowMessage);
      if (isProjector) {
        document.removeEventListener('fullscreenchange', updateProjectorBarVisibility);
        document.body.classList.remove('projector-display-mode');
        floatingBar?.remove();
        floatingBar = null;
        send({ type: 'bye' });
      }
      try {
        channel?.close();
      } catch {}
    }
  };
}

