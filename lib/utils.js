(function () {
  const ACF = {
    fixJava(code, className) {
      let out = code.replace(/^\s*package\s+[^;]+;\s*/m, "");
      out = out.replace(/\bpublic\s+class\s+([A-Z]\w*)/m, (m, name) => m.replace(name, className));
      return out;
    },

    fixJS(code) {
      return code.replace(/\breadFileSync\s*\([^)]*\)/g, "readFileSync('/dev/stdin')");
    },

    getCM() {
      const root = document.querySelector(".CodeMirror");
      return root && root.CodeMirror ? root.CodeMirror : null;
    },

    attachPasteOnce(flagKey, handler) {
      const editor = document.querySelector(".CodeMirror");
      if (!editor || editor[flagKey]) return false;
      editor.addEventListener("paste", handler, false);
      editor[flagKey] = true;
      return true;
    }
  };

  window.ACF = ACF;
})();
