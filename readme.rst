Generate a link using HTTP redirect.

GitHub repository here:

https://github.com/nbeaver/save_link_webextension

Q & A

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
