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
    newAnchor.href = URL;
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
                     .replace(/\uFEFF/g, '') // byte-order mark (BOM) a.k.a ZERO WIDTH NO-BREAK SPACE
                     .replace(/\u200C/g, '') // zero-width non-joiner
                     .replace(/\u200D/g, '') // zero-width joiner
                     .replace(/\u200E/g, '') // left-to-right mark
                     .replace(/\u200F/g, '') // right-to-left mark
                     .replace(/\u00A0/g, ' ') // non-breaking space
                     .replace(/\u202F/g, ' ') // narrow non-breaking space
                     .replace(/\uFFFD/g, '_'); // replacement character
  }
  // https://searchfox.org/mozilla-esr91/rev/f3f439e007bdd4b5b1c2ba05ca706b68563413b2/toolkit/components/downloads/DownloadPaths.jsm#75
  // "extension is responsible for both making the filename valid, and catching errors when that fails."
  //  https://bugzilla.mozilla.org/show_bug.cgi?id=1390473
  function truncateFilename(filename, n_bytes) {
    var encoder = new TextEncoder();
    var decoder = new TextDecoder('utf-8');
    var filename_uint8 = encoder.encode(filename);
    var truncated_uint8 = filename_uint8.slice(0, n_bytes);
    var truncated = decoder.decode(truncated_uint8);
    return truncated;
  }
  // https://stackoverflow.com/questions/57769465/javascript-truncate-text-by-bytes-length
  function getFilename(tab) {
    let hostname = parseURL(tab.url).hostname;
    const prefix = 'link-to-';
    let filename = prefix + tab.title + '_' + hostname;
    filename = sanitizeFilename(filename); // might produce more spaces and underscores
    filename = filename.split(' ').join('_'); // replace spaces with underscores
    filename = filename.replace(/_+/g, '_');
    const suffix = '.link.html';
    const suffix_bytes = new Blob([suffix]).size;
    // On Linux ext4 NAME_MAX is 255 bytes, on Windows it is 255 characters.
    // However empirically browser.downloads.download will fail when filename
    // has more than 250 bytes. I'm not sure why this is.
    const bytes_max = 250;
    filename = truncateFilename(filename, bytes_max - suffix_bytes);
    filename += suffix;
    // sanitize again in case suffix or truncation produces invalid input.
    filename = sanitizeFilename(filename);
    // console.log(`filename = ${JSON.stringify(filename)}`);
    // let filename_bytes =  new Blob([filename]).size;
    // console.log(`filename_bytes = ${filename_bytes}`);
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
