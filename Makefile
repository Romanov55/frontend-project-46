install:
	npm ci

gendif:
	node bin/gendiff.js

lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage: 
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage