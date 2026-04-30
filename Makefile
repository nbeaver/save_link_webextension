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

.PHONY : clean
clean :
	rm -f -- $(ZIP)
