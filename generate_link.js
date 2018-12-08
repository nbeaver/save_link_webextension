function generateLink(tab) {
  function createRedirectHTML(myURL, myTitle) {
    var newHTML = document.createElement('html');
    var newHead = document.createElement('head');
    var newTitle = document.createElement('title');
    newTitle.text = myTitle;
    var newMeta = document.createElement('meta');
    newMeta.httpEquiv = "refresh";
    newMeta.setAttribute("charset", "utf-8");
    newMeta.content = "0;url=" + myURL;
    var newBody = document.createElement('body');
    var newPar = document.createElement('p');
    var before = document.createTextNode('Loading ');
    var after = document.createTextNode('...');
    var newAnchor = document.createElement('a');
    newAnchor.href = myURL;
    newAnchor.text = myTitle;
    newPar.appendChild(before);
    newPar.appendChild(newAnchor);
    newPar.appendChild(after);
    newBody.appendChild(newPar);
    newHead.appendChild(newMeta);
    newHead.appendChild(newTitle);
    newHTML.append(newHead);
    newHTML.append(newBody);
    return newHTML;
  }
  function parseURL(URL) {
    var newAnchor = document.createElement('a');
    newAnchor.href = tab.url;
    return newAnchor;
  }
  function sanitizeFilename(filename) {
      return filename.replace(/</g, "(")
                     .replace(/>/g, ")")
                     .replace(/"/g, "'")
                     .replace(/[\\/]+/g, "_")
                     .replace(/[\u200e\u200f\u202a-\u202e]/g, "")
                     .replace(/[\x00-\x1f\x7f-\x9f:*?|"<>;,+=\[\]]+/g, " ")
                     .replace(/^[\s\u180e.]+|[\s\u180e.]+$/g, "");
  }
  // https://searchfox.org/mozilla-central/source/toolkit/components/downloads/DownloadPaths.jsm#68
  function getFilename(tab) {
    var hostname = parseURL(tab.url).hostname
    var filename = 'link-to-' + tab.title + '_' + hostname + '.link.html';
    filename = filename.split(' ').join('_');
    filename = sanitizeFilename(filename);
    return filename
  }
  var payload = createRedirectHTML(tab.url, tab.title);
  var paylodBlob = new Blob([payload.outerHTML], {type: 'text/html'});
  var payloadURL = URL.createObjectURL(paylodBlob);
  var payload_filename = getFilename(tab);
  var downloading = browser.downloads.download({
    url: payloadURL,
    filename : payload_filename,
    conflictAction: 'uniquify',
    saveAs: true,
  });
}
browser.browserAction.onClicked.addListener(generateLink);
