Hi @Paris-Man, I'm having some difficulty reproducing this. The [@hourlyfish](https://twitter.com/hourlyfish) Twitter account is gone, and the [Emojipedia homepage](https://emojipedia.org/) works fine for me:

link-to-📙_Emojipedia_—_😃_Home_of_Emoji_Meanings_💁👌🎍😍_emojipedia.org.link.html

As does the page for recent emoji like [heart hands](https://emojipedia.org/heart-hands/):

link-to-🫶_Heart_Hands_Emoji_emojipedia.org.link.html

I'm using Firefox 105.0 on Ubuntu 18.04 if that matters.

---

The [@hourlyfish](https://twitter.com/hourlyfish) Twitter account is back, but no emojis in the title. However, I think this may have been due to a [zero-width joiner](https://en.wikipedia.org/wiki/Zero-width_joiner) in the page title, e.g. here:

<https://emojipedia.org/man-farmer/>

Trying to run `downloads.download()` on a filename containing a ZWJ results in a failed download and an "Error: filename must not contain illegal characters" message.

I've added a [fix](https://github.com/nbeaver/save_link_webextension/commit/2e7ee84dd7a7e47c49824d5f4806bf03b77cf8fa) to strip out the ZWJ and I'll post a new version shortly, but there are probably other page titles that will fail to sanitize. Only the browser truly knows what characters are illegal, but the WebExtensions API doesn't provide access to the browser's filename sanitize function, so I don't know of a robust way to fix this in the general case.

Related:

https://github.com/solorey/Art-Saver/issues/18

https://github.com/eight04/image-picka/issues/208

https://bugzilla.mozilla.org/show_bug.cgi?id=1791530

https://stackoverflow.com/questions/73036830/sanitise-unicode-pair-for-filename-in-javascript
