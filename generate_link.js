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
  var payload = createRedirectHTML(tab.url, tab.title);
  var HTMLBlob = new Blob([payload.outerHTML], {type: 'text/html'});
  var myURL = URL.createObjectURL(HTMLBlob);
  var hostname = parseURL(tab.url).hostname
  var link_filename = 'link-to-' + tab.title + '_' + hostname + '.link.html';
  link_filename = link_filename.split(' ').join('_');
  var downloading = browser.downloads.download({
    url: myURL,
    filename : link_filename,
    conflictAction: 'uniquify',
    saveAs: true
  });
}
browser.browserAction.onClicked.addListener(generateLink);
