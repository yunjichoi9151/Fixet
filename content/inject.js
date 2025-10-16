(function () {
  chrome.storage.sync.get({ enabled: true }, ({ enabled }) => {
    const setGate = (v) =>
      document.documentElement.setAttribute('data-fixet-enabled', v ? 'true' : 'false');
    setGate(enabled);
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync' && changes.enabled) setGate(!!changes.enabled.newValue);
    });

    const host = location.hostname;
    let pageScript = null;

    if (host.includes('acmicpc.net') && location.pathname.startsWith('/submit/')) {
      pageScript = 'content/boj.js';
    } else if (host.includes('swexpertacademy.com')) {
      pageScript = 'content/swea.js';
    } else {
      return;
    }

    function inject(src, onload) {
      const url = chrome.runtime.getURL(src);
      const s = document.createElement('script');
      s.src = url;
      s.type = 'text/javascript';
      if (onload) s.onload = onload;
      s.onerror = () => console.error('[ACF] inject failed:', url);
      (document.head || document.documentElement).appendChild(s);
    }

    inject('lib/utils.js', () => {
      inject(pageScript, function () {
        this.remove();
      });
    });
  });
})();
