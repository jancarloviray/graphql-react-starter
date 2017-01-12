.PHONY: build install start migrate rollback seed clean

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

KNEXFILE = ./src/api/knexfile.js
# get filename of devdb
DEVDB = ./$(shell grep -o "\([[:alpha:]]*\.sqlite3\)" ${KNEXFILE})
DEFAULT_MIGRATION_NAME = migration
DEFAULT_SEED_NAME = $(shell date +%s)-new-seed

build: clean build-client build-api

build-client:
	NODE_ENV=$(NODE_ENV) \
	webpack --config ./config/client.webpack.config.js

build-api:
	NODE_ENV=$(NODE_ENV) \
	webpack --config ./config/api.webpack.config.js

install:
	rm -rf ./node_modules
	type yarn && yarn install || npm install

# for production should use NGINX! change command after endif
# change commands to use pm2!
# pm2 start --interpreter babel-node server.js
start: killall
	@if [[ $(NODE_ENV) == "production" ]] ; then \
		echo "In production mode:" ; \
		$(MAKE) build ; \
		NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) PORT=$(PORT) API_PORT=$(API_PORT) \
		pm2 start ecosystem.config.js --env production ; \
		echo "client port: $(PORT)" ; \
		echo "api port: $(API_PORT)" ; \
	else \
		echo "In development mode:" ; \
		NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) PORT=$(PORT) API_PORT=$(API_PORT) \
		pm2 start ecosystem.config.js --env development ; \
		echo "client port: $(PORT)" ; \
		echo "api port: $(API_PORT)" ; \
	fi

killall:
	pm2 kill

api:
	@echo "This will be deprecated soon in favor of `make start`"
	NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) API_PORT=$(API_PORT) \
	babel-node ./src/api/index.js

lint:
	eslint . --fix

migrate:
	NODE_ENV=$(NODE_ENV) \
	knex --knexfile $(KNEXFILE) migrate:latest

rollback:
	NODE_ENV=$(NODE_ENV) \
	knex --knexfile $(KNEXFILE) migrate:rollback

seed:
	NODE_ENV=$(NODE_ENV) \
	knex --knexfile $(KNEXFILE) seed:run

new-migration:
	NODE_ENV=$(NODE_ENV) \
	knex --knexfile $(KNEXFILE) migrate:make $(DEFAULT_MIGRATION_NAME)

new-seed:
	NODE_ENV=$(NODE_ENV) \
	knex --knexfile $(KNEXFILE) seed:make $(DEFAULT_SEED_NAME)

reset-dev-db:
	[[ ! -f $(DEVDB) ]] || rm $(DEVDB)
	NODE_ENV=$(NODE_ENV) $(MAKE) migrate
	NODE_ENV=$(NODE_ENV) $(MAKE) seed

deploy-app:


deploy-api:


# `-` means don't break targets dependent on this
# even if it causes error like if files do not exist
clean:
	@-rm -rf ./dist
