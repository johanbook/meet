################################
# Build assets
################################
FROM node:16.5.0-alpine as builder

WORKDIR /app

COPY . .
RUN npm ci -D
RUN npm run build


################################
# Create server
################################
FROM node:16.5.0-alpine

WORKDIR /app

ENV PORT=80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD node /usr/src/app/healthcheck

COPY package.json package-lock.json ./
COPY scripts/ ./scripts
COPY --from=builder /app/dist ./dist
RUN npm ci

ENTRYPOINT [ "npm" ]
CMD [  "run", "start:prod" ]
EXPOSE 80
