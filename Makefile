DOCKER_COMPOSE = docker-compose
DOCKER = docker

all: up

build:
	$(DOCKER_COMPOSE) up --build
up:
	$(DOCKER_COMPOSE) up
down:
	$(DOCKER_COMPOSE) down
restart:
	$(DOCKER_COMPOSE) down && $(DOCKER_COMPOSE) up --build
migrate:
	$(DOCKER_COMPOSE) run --rm prisma npx prisma migrate dev --name init
generate:
	$(DOCKER_COMPOSE) run --rm prisma npx prisma generate
seed:
	$(DOCKER_COMPOSE) run --rm prisma npx prisma db seed
studio:
	$(DOCKER_COMPOSE) run --rm -p 5555:5555 prisma npx prisma studio
logs:
	$(DOCKER_COMPOSE) logs -f
ps:
	$(DOCKER_COMPOSE) ps
clean:
	$(DOCKER_COMPOSE) down -v --remove-orphans
prune:
	$(DOCKER) system prune -f
shell-nextjs:
	$(DOCKER) exec -it nextjs_app sh
shell-db:
	$(DOCKER) exec -it postgres_db sh
