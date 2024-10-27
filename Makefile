DOCKER_COMPOSE = docker-compose
DOCKER = docker

all: build

build:
	$(DOCKER_COMPOSE) up --build
up:
	$(DOCKER_COMPOSE) up
down:
	$(DOCKER_COMPOSE) down -v
restart:
	$(DOCKER_COMPOSE) down && $(DOCKER_COMPOSE) up --build
studio:
	$(DOCKER_COMPOSE) run --rm -p 5555:5555 prisma npx prisma studio
logs:
	$(DOCKER_COMPOSE) logs -f
ps:
	$(DOCKER_COMPOSE) ps
prune:
	$(DOCKER) system prune -a
