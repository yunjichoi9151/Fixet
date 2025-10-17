(async function () {
  const $toggle = document.getElementById('toggle');
  const $switch = document.getElementById('switch');
  // const $state = document.getElementById('state');

  const $linkIssues = document.getElementById('linkIssues');
  const $btnGithub = document.getElementById('btnGithub');
  const $btnHome = document.getElementById('btnHome');
  const $btnMail = document.getElementById('btnMail');

  const ISSUES_URL = 'https://github.com/yunjichoi9151/Fixet/issues';
  const REPO_URL = 'https://github.com/yunjichoi9151/Fixet';
  // const HOME_URL   = chrome.runtime.getURL("pages/index.html");
  const FEEDBACK_TO = 'cyjcode99@gmail.com';

  function openGmail({ to, subject, body }) {
    const enc = encodeURIComponent;
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}&su=${enc(
      subject
    )}&body=${enc(body)}`;
    chrome.tabs.create({ url });
  }

  function renderUI(on) {
    $toggle.setAttribute('aria-checked', on ? 'true' : 'false');
    $switch.classList.toggle('on', !!on);
    // $state.textContent = on ? 'ON' : 'OFF';
  }

  async function render(on) {
    chrome.action.setBadgeText({ text: '' });
    await chrome.action.setIcon({
      path: on
        ? {
            16: chrome.runtime.getURL('assets/icon-16.png'),
            32: chrome.runtime.getURL('assets/icon-32.png'),
          }
        : {
            16: chrome.runtime.getURL('assets/icon-16-off.png'),
            32: chrome.runtime.getURL('assets/icon-32-off.png'),
          },
    });
    renderUI(on);
  }

  const { enabled = true } = await chrome.storage.sync.get('enabled');
  await render(enabled);

  async function setEnabled(on) {
    await chrome.storage.sync.set({ enabled: !!on });
    await render(on);
  }

  $toggle.addEventListener('click', () => {
    const next = $toggle.getAttribute('aria-checked') !== 'true';
    setEnabled(next);
  });
  $toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const next = $toggle.getAttribute('aria-checked') !== 'true';
      setEnabled(next);
    }
  });

  $linkIssues.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: ISSUES_URL });
  });

  $btnGithub.addEventListener('click', () => chrome.tabs.create({ url: REPO_URL }));
  // $btnHome?.addEventListener("click",   () => chrome.tabs.create({ url: HOME_URL }));

  $btnMail?.addEventListener('click', () => {
    const subject = '[Fixet] 문의 드립니다';
    const body = `\n\n
    
────────────────────────────────

연락 주셔서 감사합니다. 가능한 빠르게 답장드리겠습니다.

Fixet 개발자 드림
`;
    openGmail({ to: FEEDBACK_TO, subject, body });
  });
})();
