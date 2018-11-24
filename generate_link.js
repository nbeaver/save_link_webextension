function f() {
  // This is the code that actually gets executed by the bookmarklet.
  function createRedirectHTML(URL, title) {
    var newHTML = document.createElement('html');
    var newHead = document.createElement('head');
    var newTitle = document.createElement('title');
    newTitle.text = title;
    var newMeta = document.createElement('meta');
    newMeta.httpEquiv = "refresh";
    newMeta.setAttribute("charset", "utf-8");
    newMeta.content = "0;url=" + URL;
    var newBody = document.createElement('body');
    var newPar = document.createElement('p');
    var before = document.createTextNode('Loading ');
    var after = document.createTextNode('...');
    var newAnchor = document.createElement('a');
    newAnchor.href = URL;
    newAnchor.text = title;
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
  var tempAnchor = window.document.createElement('a');
  var newHTML = createRedirectHTML(document.location, document.title);
  HTMLBlob = new Blob([newHTML.outerHTML], {type: 'text/html'});
  tempAnchor.href = window.URL.createObjectURL(HTMLBlob);
  var hostname = window.location.hostname;
  var filename = 'link-to-' + document.title + '_' + hostname + '.link.html';
  filename = filename.split(' ').join('_');
  tempAnchor.download = filename
  tempAnchor.style.display = 'none';
  document.body.appendChild(tempAnchor);
  tempAnchor.click();
  document.body.removeChild(tempAnchor);
}
// This is the code that sets up the bookmarklet.
document.getElementById("bookmarklet").href = "javascript:(" + f.toString() + ")();"
// https://juhukinners.wordpress.com/2009/01/08/how-to-write-a-bookmarklet/
// TODO: check length limits? 
