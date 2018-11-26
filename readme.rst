Generate an HTML stub file linking to the current tab.

GitHub repository here:

https://github.com/nbeaver/save_link_webextension

Hosted on addons.mozilla.org here:

https://addons.mozilla.org/en-US/firefox/addon/save-link-to-current-tab/

- Name: Save link to current tab

- Summary: Generates an HTML stub file that links to the current tab.

- Description: This saves a cross-platform link to the current tab as an HTML stub file. The redirect is performed using a meta refresh. It does *not* save a copy of the current page. 

Questions & Answers

- What is this for?

Sometimes it's useful to save a link to a webpage as a file
that can be copied and moved around.
Unfortunately, the defaults are not cross-platform;
Linux has Link type desktop files,
Microsoft Windows has `Internet Shortcuts`_,
and Mac OS X has
`webloc<https://apple.stackexchange.com/questions/258033/how-to-change-the-default-application-for-webloc-files>`_
`files<https://blog.scottlowe.org/2016/12/21/opening-webloc-files-ubuntu/>`_.
They are all mutually incompatible.

.. _Internet Shortcuts: https://docs.microsoft.com/en-us/windows/desktop/lwef/internet-shortcuts

Fortunately, there is an alternative:
use an HTML stub file and tell the browser itself to perform the redirect.

https://superuser.com/questions/538089/how-to-create-cross-platform-internet-shortcut-files

- How does this work?

It uses the meta tag in an HTML file
to perform a client-side redirect.

https://www.w3.org/TR/WCAG20-TECHS/H76.html

https://en.wikipedia.org/wiki/Meta_refresh

https://stackoverflow.com/questions/5411538/redirect-from-an-html-page

- Has this been done already?

Yes, the WebCuts extension appears to do this for Chrome browsers.

https://chrome.google.com/webstore/detail/webcuts/kehckhdcknjaadegmihldoedmdfmpcmk

However, this extension relies on Javascript.

- Why not use Javascript to change ``window.location.href``?

Not everyone uses a browser with Javascript enabled.
There are many reasons why.

https://www.wired.com/2015/11/i-turned-off-javascript-for-a-whole-week-and-it-was-glorious/

https://blockmetry.com/blog/javascript-disabled

https://www.smashingmagazine.com/2018/05/using-the-web-with-javascript-turned-off/

https://softwareengineering.stackexchange.com/questions/26179/why-do-people-disable-javascript

- What permissions does this extension need, and why?

We need ``activeTab`` permissions to access the tab title and URL.

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#activeTab_permission

We need ``download`` permissions to download the generated HTML file.

https://stackoverflow.com/questions/53474726/generating-html-in-webextension-results-in-this-mdialog-is-null-and-cant-acc/

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download#Examples

- Why not just `use a bookmarklet`_?

.. _use a bookmarklet: https://support.mozilla.org/en-US/kb/bookmarklets-perform-common-web-page-tasks

Because `Content Security Policy`_ (CSP)
`prevents`_ `bookmarklets`_ `from running`_ on `some pages`_,
such as this one:

https://sourceware.org/gdb/onlinedocs/gdb/index.html

.. _Content Security Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

.. _prevents: https://medium.com/making-instapaper/bookmarklets-are-dead-d470d4bbb626
.. _bookmarklets: https://stackoverflow.com/questions/7607605/does-content-security-policy-block-bookmarklets
.. _from running: http://jcardy.co.uk/the-slow-death-of-bookmarklets/
.. _some pages: https://blog.github.com/2013-04-19-content-security-policy/

The only `workaround is to disable CSP entirely`_.

.. _workaround is to disable CSP entirely: https://www.stierand.org/2016/12/content-security-policy
