################################
# Build server
################################
FROM node:24.6.0-alpine as builder

WORKDIR /app

COPY . .
RUN npm ci -D
RUN npm run build


################################
# Create Docker image
################################
FROM node:24.6.0-alpine

WORKDIR /app

ENV PORT=80

COPY package.json package-lock.json ./
COPY scripts/ ./scripts
COPY --from=builder /app/dist ./dist
RUN npm ci

USER node

ENTRYPOINT [ "sh" ]
CMD [   "scripts/start" ]
EXPOSE 80
