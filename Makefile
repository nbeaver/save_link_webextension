ZIP :=save_link.zip

.PHONY : all
all : $(ZIP)

$(ZIP): generate_link.js manifest.json icons/icon.svg
	zip --quiet $@ $^

.PHONY : lint
lint :
	gjslint --nojsdoc generate_link.js

.PHONY : clean
clean :
	rm -f -- $(ZIP)
