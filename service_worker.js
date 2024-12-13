// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function search(text, tab) {
	let url =
    'https://google.com/search?q=' + text + ' site:' + tab.url.split("/")[2];
  chrome.tabs.create({url: url, index: tab.index + 1});
}

// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "1",
    title: "Search '%s' on current site",
    type: 'normal',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  search(info.selectionText, tab);
});
