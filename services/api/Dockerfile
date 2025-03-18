################################
# Build assets
################################
FROM node:20.19.0-alpine as builder

WORKDIR /app

COPY . .
RUN npm ci -D --legacy-peer-deps
RUN npm run build


################################
# Create server
################################
FROM node:20.19.0-alpine

WORKDIR /app

ENV PORT=80
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY scripts/ ./scripts
COPY --from=builder /app/dist ./dist
RUN npm ci --legacy-peer-deps

USER node

ENTRYPOINT [ "sh" ]
CMD [   "scripts/start" ]
EXPOSE 80
