TESTS = test/*.js
REPORTER = spec
TIMEOUT = 20000
MOCHA = ./node_modules/mocha/bin/_mocha
PATH := ./node_modules/.bin:$(PATH)

lint:
	@eslint --fix lib index.js test

test:
	@NODE_ENV=test mocha -R $(REPORTER) -t $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov:
	@istanbul cover --report html $(MOCHA) -- -t $(TIMEOUT) -R spec $(TESTS)

test-coveralls:
	@istanbul cover --report lcovonly $(MOCHA) -- -t $(TIMEOUT) -R spec $(TESTS)
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@cat ./coverage/lcov.info | coveralls && rm -rf ./coverage

test-all: test test-coveralls

.PHONY: test
