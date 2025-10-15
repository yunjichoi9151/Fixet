(async function () {
  const $toggle = document.getElementById("toggle");
  const $switch = document.getElementById("switch");
  const $state  = document.getElementById("state");
  const $open   = document.getElementById("openGuide");

  function renderUI(on) {
    $toggle.setAttribute("aria-checked", on ? "true" : "false");
    $switch.classList.toggle("on", !!on);
    $state.textContent = on ? "ON" : "OFF";
  }

  async function render(on) {
    chrome.action.setBadgeText({ text: "" });

    await chrome.action.setIcon({
      path: on
        ? { "16": "assets/icon-16.png",      "32": "assets/icon-32.png" }
        : { "16": "assets/icon-16-off.png",  "32": "assets/icon-32-off.png" }
    });

    renderUI(on);
  }

  const { enabled = true } = await chrome.storage.sync.get("enabled");
  await render(enabled);

  async function setEnabled(on) {
    await chrome.storage.sync.set({ enabled: !!on });
    await render(on);
  }

  $toggle.addEventListener("click", () => {
    const next = $toggle.getAttribute("aria-checked") !== "true";
    setEnabled(next);
  });
  $toggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const next = $toggle.getAttribute("aria-checked") !== "true";
      setEnabled(next);
    }
  });

  $open.addEventListener("click", (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL("pages/index.html") });
  });
})();
