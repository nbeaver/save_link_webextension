In addition to a toolbar icon, it would be helpful if one could save a link by right-clicking and selecting an option from the context menu. Links to relevant documentation:

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Context_menu_items

Note that this will require additional permissions such as `menus` and `contextMenus`:

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions

and could be complicated if the user right-clicks on a tab that is not active:

https://bugzilla.mozilla.org/show_bug.cgi?id=1446956
