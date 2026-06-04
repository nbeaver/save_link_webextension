ZIP :=save_link.zip

.PHONY : all
all : $(ZIP)

$(ZIP): generate_link.js manifest.json icons/icon.svg
	zip --quiet $@ $^

.PHONY : lint
lint :
	npm exec -- web-ext lint
	#gjslint --nojsdoc generate_link.js

.PHONY: lint-js
lint-js:
	npm exec -- eslint "**/*.js"

.PHONY: install-npm
install-npm:
	npm clean-install
	# npm install web-ext eslint

.PHONY: outdated-npm
outdated-npm:
	npm outdated

.PHONY: update-npm
update-npm:
	npm update

IGNORE:=changelog.txt eslint.config.mjs issues/ LICENSE.txt $(wildcard *.desktop) $(wildcard *.zip) $(wildcard *.md) $(wildcard *.rst) package-lock.json package.json Makefile mozilla-addon-product-page/ node_modules/ relevant-links/ tests/
.PHONY: web-ext-build
web-ext-build :
	npm exec -- web-ext build --overwrite-dest --ignore-files $(IGNORE)


.PHONY : clean
clean :
	rm -f -- $(ZIP)
