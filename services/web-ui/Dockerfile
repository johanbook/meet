################################
# Build assets
################################
FROM node:25.2.1-alpine as builder

ARG VITE_SENTRY_DSN

WORKDIR /app

COPY . .
RUN npm ci -D --legacy-peer-deps
RUN npm run build


################################
# Create server
################################
FROM nginx:1.29.4

COPY --from=builder /app/dist /etc/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
