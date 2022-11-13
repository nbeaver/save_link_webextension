- [x] Upload to Github
- [x] Upload to addons.mozilla.org
- [x] Remove `/` from filenames.
- [x] Make a corpus of HTML files with different titles and encodings to test it on.
- [x] Test to make sure it works with URL fragments
- [ ] Add URL fragment to filename? (useful for links to different anchors on the same page)
- [ ] Add naked link to loading screen to it's apparent exactly where the page is redirecting.
- [ ] Add an item to the right-click context menu (useful when the addon toolbar is not visible when e.g. Javascript uses `window.open`)
    - <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus>
    - <https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Context_menu_items>
- [ ] Use `URL.revokeObjectURL` to free memory once the download has completed (`downloadDelta.state.current === 'complete'`).
    - <https://gist.github.com/tkrkt/44949fe3f0cac2040c3ce3004fe1fe9c#file-download-js-L35>
    - <https://bugzilla.mozilla.org/show_bug.cgi?id=1271345>
    - <https://bugzilla.mozilla.org/show_bug.cgi?id=1521308>
    - <https://hg.mozilla.org/mozilla-central/file/1325e2a34dfca0ff84f269d010cfc9830b0f101d/toolkit/components/extensions/test/mochitest/test_chrome_ext_downloads_saveAs.html>
    - <https://github.com/eight04/image-picka/blob/8196221de1732210f42f6faa60bd8e44cde594b0/extension/background/download.js>
    - <https://github.com/jacobmischka/ics-merger-screenshot-plugin/blob/c1179b3326c2e17aa40183122632d4b4e9e78aef/src/background.js>
- [x] Make it work on Emoji surrogate pairs ("Error: filename must not contain illegal characters")
    - <https://emojipedia.org/man-farmer/>
    - <https://stackoverflow.com/questions/73036830/sanitise-unicode-pair-for-filename-in-javascript>
    - <https://stackoverflow.com/questions/61801645/web-extension-code-to-download-file-works-in-chrome-but-fails-in-firefox-with-i>
- [x] Make it work on plain image URLs
    - <https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Birthday_Paradox.svg/1024px-Birthday_Paradox.svg.png>

Lower priority

- [ ] Make it work on right-clicked URLs (problem: can't get title easily)
- [ ] Make it compatible with the chromium browser.
- [ ] Make it compatible with Firefox for Android
