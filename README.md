# spuxx-dev-mono

## Build an application

From the monorepo's root folder, run:

- `docker buildx build . -f ./apps/spuxx-api/Dockerfile` to build the [spuxx-api](./apps/spuxx-api) application
- `docker buildx build . -f ./apps/toledo/Dockerfile` to build the [toledo](./apps/toledo) application
