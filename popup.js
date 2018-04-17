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

chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
    document.getElementById("searchText").value = selection[0];
});


document.getElementById('idSubmit').onclick = function() {
  console.log("submit");
  var searchText = document.getElementById("searchText").value;
  console.log(searchText);
  search(searchText, curTab);
  window.close();
}
