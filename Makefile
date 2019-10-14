ZIP :=save_link.zip

.PHONY : all clean

all : $(ZIP)

$(ZIP): generate_link.js manifest.json icons/icon.svg
	zip --quiet $@ $^

.PHONY : lint
lint :
	gjslint --nojsdoc generate_link.js

clean :
	rm -f -- $(ZIP)
