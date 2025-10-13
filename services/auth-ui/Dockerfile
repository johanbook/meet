################################
# Build assets
################################
FROM node:24.9.0-alpine AS builder

ARG VITE_SENTRY_DSN

WORKDIR /app

COPY . .
RUN npm ci -D --legacy-peer-deps
RUN npm run build


################################
# Create server
################################
FROM nginx:1.29.2

COPY --from=builder /app/dist /etc/nginx/html/login
COPY nginx.conf /etc/nginx/conf.d/default.conf
