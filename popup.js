const toggle = document.getElementById("toggle");

chrome.runtime.sendMessage({ action: "getState" }, (response) => {
  toggle.checked = response.enabled;
});

toggle.addEventListener("change", () => {
  const action = toggle.checked ? "enable" : "disable";
  chrome.runtime.sendMessage({ action }, (response) => {
    if (!response.success) {
      console.error("Toggle failed.");
    }
  });
});
