TESTS = test/*.js
REPORTER = spec
TIMEOUT = 20000
MOCHA = ./node_modules/mocha/bin/_mocha
PATH := ./node_modules/.bin:$(PATH)

lint:
	@eslint --fix lib index.js test

test: lint
	@nyc --reporter=html --reporter=text mocha -t $(TIMEOUT) -R spec $(TESTS)

test-coveralls:
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@nyc report --reporter=text-lcov | coveralls

test-all: test test-coveralls

.PHONY: test
