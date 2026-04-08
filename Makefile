ZIP :=save_link.zip

.PHONY : all
all : $(ZIP)

$(ZIP): generate_link.js manifest.json icons/icon.svg
	zip --quiet $@ $^

.PHONY : lint
lint :
	npm exec -- web-ext lint
	#gjslint --nojsdoc generate_link.js

.PHONY: install-npm
install-npm:
	npm install web-ext

.PHONY : clean
clean :
	rm -f -- $(ZIP)
