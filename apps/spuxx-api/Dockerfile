FROM node:22 AS build-env
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
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=build-env /project/apps/spuxx-api/dist ./dist
COPY --from=build-env /project/node_modules ./node_modules
USER 9999
CMD [ "node", "dist/main.mjs" ]
