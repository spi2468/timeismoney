chrome.browserAction.onClicked.addListener(function() {
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.runtime.openOptionsPage();
});

function createToggleMenu(disable) {
  chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    title: disable ? "Disable" : "Enable",
    contexts: ["browser_action"],
    onclick: function() {
      chrome.storage.sync.set({
        disabled: disable
      }, function() {
        createToggleMenu(!disable);
      });
    }
  });
}

chrome.storage.sync.set({
  disabled: false
});
createToggleMenu(true);
