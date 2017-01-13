# Use bash not sh
SHELL := /bin/bash

# ./node_modules/.bin on the PATH
# `export` is only limited to this process and does not export to $(shell)
export PATH := ./node_modules/.bin:$(PATH)

# default values that can be overwritten. ifndef = if not defined in environment
# example: `NODE_ENV=production make build` will overwrite this
ifndef NODE_ENV
	NODE_ENV = development
endif

ifndef DEBUG
	DEBUG = app:*
endif

ifndef PORT
	PORT = 3000
endif

ifndef API_PORT
	API_PORT = 8080
endif

PROJECT_NAME = $(shell cat package.json | grep '"name"' | head -1 | awk -F: '{ print $$2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
KNEXFILE = ./src/api/knexfile.js
DEVDB = ./$(shell grep -o "\([[:alpha:]]*\.sqlite3\)" ${KNEXFILE})
DEFAULT_MIGRATION_NAME = migration
DEFAULT_SEED_NAME = $(shell date +%s)-new-seed

.PHONY: build
build: clean build-client build-api

.PHONY: build-client
build-client:
	NODE_ENV=production webpack --config ./config/client.webpack.config.js

.PHONY: build-api
build-api:
	NODE_ENV=production webpack --config ./config/api.webpack.config.js

.PHONY: install
install:
	rm -rf ./node_modules
	type yarn && yarn install || npm install
	[[ -f $(DEVDB) ]] || $(MAKE) setup-db

.PHONY: start
start: killall
	@if [[ $(NODE_ENV) == "production" ]] ; then \
		echo "In production mode:" ; \
		$(MAKE) build ; \
		NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) PORT=$(PORT) API_PORT=$(API_PORT) \
		PM2_HOME='.pm2' pm2 start ecosystem.config.js --name=$(PROJECT_NAME) --env production ; \
		echo "client port: $(PORT)" ; \
		echo "api port: $(API_PORT)" ; \
	else \
		echo "In development mode:" ; \
		NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) PORT=$(PORT) API_PORT=$(API_PORT) \
		PM2_HOME='.pm2' pm2 start ecosystem.config.js --name=$(PROJECT_NAME) --env development ; \
		echo "client port: $(PORT)" ; \
		echo "api port: $(API_PORT)" ; \
	fi

.PHONY: killall
killall:
	PM2_HOME='.pm2' pm2 kill
	@-rm -rf .pm2/*

.PHONY: list
list:
	PM2_HOME='.pm2' pm2 list

.PHONY: logs
logs:
	PM2_HOME='.pm2' DEBUG="*" pm2 logs --no-daemon

.PHONY: monit
monit:
	PM2_HOME='.pm2' pm2 monit

.PHONY: lint
lint:
	eslint . --fix

.PHONY: migrate
migrate:
	NODE_ENV=$(NODE_ENV) \
	knex --knexfile $(KNEXFILE) migrate:latest

.PHONY: rollback
rollback:
	NODE_ENV=$(NODE_ENV) \
	knex --knexfile $(KNEXFILE) migrate:rollback

.PHONY: seed
seed:
	NODE_ENV=$(NODE_ENV) \
	knex --knexfile $(KNEXFILE) seed:run

.PHONY: new-migration
new-migration:
	NODE_ENV=$(NODE_ENV) \
	knex --knexfile $(KNEXFILE) migrate:make $(DEFAULT_MIGRATION_NAME)

.PHONY: new-seed
new-seed:
	NODE_ENV=$(NODE_ENV) \
	knex --knexfile $(KNEXFILE) seed:make $(DEFAULT_SEED_NAME)

.PHONY: setup-db
setup-db:
	[[ ! -f $(DEVDB) ]] || rm $(DEVDB)
	NODE_ENV=$(NODE_ENV) $(MAKE) migrate
	NODE_ENV=$(NODE_ENV) $(MAKE) seed

.PHONY: deploy-client
deploy-client:

.PHONY: deploy-api
deploy-api:

# `-` means don't break targets dependent on this
# even if it causes error like if files do not exist
.PHONY: clean
clean:
	-rm -rf ./dist
