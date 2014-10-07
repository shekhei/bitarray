default: build
production: build
	npm install --production
build: gulp
gulp:
	gulp build
test: test-cli
test-cli:
	gulp test
test-browser: build
	http-server .