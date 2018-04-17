// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function search(text, tab) {
	let url =
    'https://google.com/search?q=' + text + ' site:' + tab.url.split("/")[2];
  chrome.tabs.create({url: url, index: tab.index + 1});
}
