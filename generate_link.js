function generateLink(tab) {
  function createRedirectHTML(myURL, myTitle) {
    var doc = document.implementation.createHTMLDocument(myTitle);

    var newMeta = document.createElement('meta');
    newMeta.httpEquiv = 'refresh';
    newMeta.setAttribute('charset', 'utf-8');
    newMeta.content = '0; url=' + myURL;
    doc.head.appendChild(newMeta);

    var newPar = document.createElement('p');
    var before = document.createTextNode('Loading ');
    var after = document.createTextNode('...');
    var newAnchor = document.createElement('a');
    newAnchor.href = myURL;
    newAnchor.text = myTitle;
    newPar.appendChild(before);
    newPar.appendChild(newAnchor);
    newPar.appendChild(after);

    doc.body.appendChild(newPar);

    return doc;
  }
  function parseURL(URL) {
    var newAnchor = document.createElement('a');
    newAnchor.href = tab.url;
    return newAnchor;
  }
  function sanitizeFilename(filename) {
      return filename.replace(/</g, '_')
                     .replace(/>/g, '_')
                     .replace(/"/g, '_')
                     .replace(/'/g, '_')
                     .replace(/[\\/]+/g, '_')
                     .replace(/[\u200e\u200f\u202a-\u202e]/g, '_')
                     .replace(/[\x00-\x1f\x7f-\x9f:*?|"<>;,+=\[\]]+/g, '_')
                     .replace(/^[\s\u180e.]+|[\s\u180e.]+$/g, '_')
                     .replace(/[\uFE00-\uFE0F]/g, '') // variation selectors
                     .replace(/\u200D/g, '') // zero-width joiner
                     .replace(/\u00A0/g, ' '); // no -break space
  }
  // https://searchfox.org/mozilla-central/source/toolkit/components/downloads/DownloadPaths.jsm#68
  function getFilename(tab) {
    var hostname = parseURL(tab.url).hostname;
    var filename = 'link-to-' + tab.title + '_' + hostname + '.link.html';
    filename = filename.split(' ').join('_');
    filename = sanitizeFilename(filename);
    return filename;
  }
  var payload = createRedirectHTML(tab.url, tab.title);
  var serializer = new XMLSerializer();
  var HTMLString = serializer.serializeToString(payload);
  var payloadBlob = new Blob([HTMLString], {type: 'text/html'});
  var payloadURL = URL.createObjectURL(payloadBlob);
  var payload_filename = getFilename(tab);
  var downloading = browser.downloads.download({
    url: payloadURL,
    filename: payload_filename,
    conflictAction: 'uniquify',
    saveAs: true,
  });
}
browser.browserAction.onClicked.addListener(generateLink);
