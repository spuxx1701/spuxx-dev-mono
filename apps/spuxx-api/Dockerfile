# Build stage
FROM node:22-alpine AS build-env
RUN npm install -g pnpm

# Set the working directory to /project
WORKDIR /project

# Copy the entire project structure
COPY . .

# Install dependencies and build
WORKDIR /project/apps/spuxx-api
RUN pnpm install
RUN pnpm build

# Production stage
FROM node:22-alpine
WORKDIR /app
COPY --from=build-env /project/apps/spuxx-api/dist ./dist
COPY --from=build-env /project/apps/spuxx-api/package.json ./package.json
# Having issues with copying node_modules so we install them manually
# TODO: Get this to work at some point so we can use distroless
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm prune --prod
USER 9999
CMD [ "node", "dist/main.mjs" ]
