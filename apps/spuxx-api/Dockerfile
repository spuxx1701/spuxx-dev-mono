# Build stage
FROM node:22-alpine AS build-env
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory to /project
WORKDIR /project

# Copy the entire project structure
COPY . .

# Install dependencies and build
WORKDIR /project/apps/spuxx-api
RUN pnpm install --frozen-lockfile
RUN pnpm build
RUN pnpm deploy --filter=spuxx-api --prod out

# Production stage
FROM gcr.io/distroless/nodejs22-debian12
WORKDIR /usr/app
COPY --from=build-env /project/apps/spuxx-api/out ./
USER 9999
CMD ["dist/main.mjs"]
