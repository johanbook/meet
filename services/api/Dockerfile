################################
# Build assets
################################
FROM node:24.4.1-alpine as builder

WORKDIR /app

COPY . .
RUN npm ci -D
RUN npm run build


################################
# Create server
################################
FROM node:24.4.1-alpine

WORKDIR /app

ENV PORT=80
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY scripts/ ./scripts
COPY --from=builder /app/dist ./dist
RUN npm ci

USER node

ENTRYPOINT [ "sh" ]
CMD [   "scripts/start" ]
EXPOSE 80
