bins := ./node_modules/.bin
src := index.js
test := test/*.js

all: install lint test

install:
	@ npm install

lint: $(src) $(test)
	@ $(bins)/jshint --show-non-errors $^

test: $(test)
	@ $(bins)/mocha $(test) --reporter spec

.PHONY: all install lint test
