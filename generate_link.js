function generateLink() {
  // This is the code that actually gets executed by the bookmarklet.
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
    return newHTML
  }
  var tempAnchor = document.createElement('a');
  var newHTML = createRedirectHTML(Tab.url, Tab.title);
  HTMLBlob = new Blob([newHTML.outerHTML], {type: 'text/html'});
  tempAnchor.href = URL.createObjectURL(HTMLBlob);
  //var hostname = window.location.hostname;
  var hostname = 'temp hostname'
  var filename = 'link-to-' + Tab.title + '_' + hostname + '.link.html';
  filename = filename.split(' ').join('_');
  tempAnchor.download = filename
  tempAnchor.style.display = 'none';
  document.body.appendChild(tempAnchor);
  tempAnchor.click();
  document.body.removeChild(tempAnchor);
}
/*
Add generateLink() as a listener to clicks on the browser action.
*/
browser.browserAction.onClicked.addListener(generateLink);
