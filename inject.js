(function () {
  const host = location.hostname;
  let pageScript = null;

  if (host.includes("acmicpc.net") && location.pathname.startsWith("/submit/")) {
    pageScript = "page/boj.page.js";
  } else if (host.includes("swexpertacademy.com")) {
    pageScript = "page/swea.page.js";
  } else {
    return;
  }

  function inject(src, onload) {
    const url = chrome.runtime.getURL(src);
    const s = document.createElement("script");
    s.src = url;
    s.type = "text/javascript";
    if (onload) s.onload = onload;
    s.onerror = () => console.error("[ACF] inject failed:", url);
    (document.head || document.documentElement).appendChild(s);
  }

  inject("common/utils.js", () => {
    inject(pageScript, function () { this.remove(); });
  });
})();
