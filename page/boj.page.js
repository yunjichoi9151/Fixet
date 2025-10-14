(function () {
  function detectLang() {
    const span = document.querySelector("#language_chosen .chosen-single > span");
    if (!span) return null;
    const t = span.textContent.toLowerCase();
    if (t.includes("java")) return "java";
    if (t.includes("node") || t.includes("typescript")) return "javascript";
    return null;
  }

  function onPaste() {
    setTimeout(() => {
      const cm = window.ACF.getCM();
      if (!cm) return;

      const lang = detectLang();
      if (!lang) return;

      const before = cm.getValue();
      let after = before;

      if (lang === "java") {
        after = window.ACF.fixJava(before, "Main");
      } else if (lang === "javascript") {
        after = window.ACF.fixJS(before);
      }

      if (after !== before) {
        cm.setValue(after);
        cm.focus();
      }
    }, 0);
  }

  // 붙여넣기 리스너 1회만 연결
  let tries = 0;
  (function boot() {
    if (window.ACF.attachPasteOnce("__boj_paste_bound__", onPaste)) return;
    if (++tries < 10) setTimeout(boot, 200);
  })();
})();
