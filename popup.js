// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function getCurrentTab(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    callback(tab);
  });
}
var curTab;
getCurrentTab((tab) => {
    curTab = tab;
    document.getElementById("searchSite").innerText = "Search on: " + tab.url.split("/")[2];
  });

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];

    if (activeTab && activeTab.id) {
        chrome.scripting.executeScript(
            {
                target: { tabId: activeTab.id },
                func: getSelectedText
            },
            (results) => {
                if (results && results[0] && results[0].result) {
                    document.getElementById("searchText").value = results[0].result;
                }
            }
        );
    }
});

// This function will run in the context of the web page
function getSelectedText() {
    return window.getSelection().toString();
}

function search(text, tab) {
  let url =
    'https://google.com/search?q=' + text + ' site:' + tab.url.split("/")[2];
  chrome.tabs.create({url: url, index: tab.index + 1});
}

document.getElementById('idSubmit').onclick = function() {
  console.log("submit");
  var searchText = document.getElementById("searchText").value;
  console.log(searchText);
  search(searchText, curTab);
  window.close();
}
