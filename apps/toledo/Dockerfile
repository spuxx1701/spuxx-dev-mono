# Build stage
FROM node:22-alpine AS build-env
RUN npm install -g pnpm

# Set the working directory to /project
WORKDIR /project

# Copy the entire project structure
COPY . .

# Install dependencies and build
WORKDIR /project/apps/toledo
RUN pnpm install
RUN pnpm build

# Production stage
FROM nginxinc/nginx-unprivileged:alpine AS RUNTIME
COPY --from=build-env /project/apps/toledo/.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-env /project/apps/toledo/dist /usr/share/nginx/html
USER 9999
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
