(function () {
  function detectLang() {
    const sel = document.querySelector("#sel_lang");
    if (!sel) return null;
    return sel.value === "J" ? "java" : null;
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
        after = window.ACF.fixJava(before, "Solution");
      }

      if (after !== before) {
        cm.setValue(after);
        cm.focus();
      }
    }, 0);
  }

  let tries = 0;
  (function boot() {
    if (window.ACF.attachPasteOnce("__swea_paste_bound__", onPaste)) return;
    if (++tries < 10) setTimeout(boot, 200);
  })();
})();
