.DEFAULT_GOAL := help
SOURCES_DIR := src
DB_FILE := sqlite.db

PWD = $(shell pwd)
DB_CONN_STR := sqlite:///${PWD}/$(DB_FILE)
WITH_DB := DATABASE_CONNECTION_STRING=$(DB_CONN_STR)


# TODO: make 'w' flag instead of 's' flag xD
# TODO: this apparently doesn't work, but is worth fixin'
ifneq (,$(findstring s,$(MAKEFLAGS)))
	# interactive
	BLE:= echo $(SOURCES_DIR)/* | entr -c
else
	# non-interactive
	BLE:=
endif

# Porcelain
# ###############
.PHONY: env-up env-down env-recreate container ci run build lint test init

# TODO: add watchmode
run: setup $(DB_FILE) ## run the app
	$(WITH_DB) uvicorn src.main:app --reload

env-up: setup-db ## set up dev environment
	@#noop	

env-down: remove-db ## tear down dev environment
	@#noop	

env-recreate: env-down env-up ## deconstruct current env and create another one

todo: ## list all TODOs in the project
	git grep -I --line-number TODO | grep -v 'list all TODOs in the project' | grep TODO

build: setup ## create artifact
	@echo "Not implemented"; false

lint: setup ## run static analysis
	@echo "Not implemented"; false

test: setup ## run all tests
	@echo "Not implemented"; false

container: build ## create Docker container
	@echo "Not implemented"; false

init: ## one time setup
	direnv allow .

clean: ## remove artifacts
	@# will remove everything in .gitignore expect for blocks starting with dep* or lib* comment
	@# TODO: add actual removal xD
	diff --new-line-format="" --unchanged-line-format="" <(grep -v '^#' | grep '\S' | sort) <(awk '/^# *(dep|lib)/,/^$/' testowy | head -n -1 | tail -n +2 | sort) 

# Plumbing
# ###############
.PHONY: setup remove-db setup-db

setup:
	@# noop

remove-db:
	rm -f $(DB_FILE)

setup-db: $(DB_FILE)
	@# noop

$(DB_FILE):
	$(WITH_DB) ./migrate.py $(DB_FILE)

# TODO: figure out why can't move nix stuff here :c
install:
	@# noop

# Utilities
# ###############
.PHONY: help
help: ## print this message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
