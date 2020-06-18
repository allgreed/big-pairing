.DEFAULT_GOAL := help
SOURCES_DIR := src

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
run: setup ## run the app
	$(BLE) FLASK_APP=src/main.py flask run

env-up: ## set up dev environment
	@echo "Not implemented"; false

env-down: ## tear down dev environment
	@echo "Not implemented"; false

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
.PHONY: setup

setup:
	@# noop

# Utilities
# ###############
.PHONY: help
help: ## print this message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
