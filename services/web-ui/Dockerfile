################################
# Build assets
################################
FROM node:20.7-alpine as builder

WORKDIR /app

COPY . .
RUN npm ci -D --legacy-peer-deps
RUN npm run build


################################
# Create server
################################
FROM node:20.7-alpine

WORKDIR /app

ENV PORT=80

COPY --from=builder /app/build ./build
COPY server.js .
RUN npm i fastify @fastify/static

ENTRYPOINT [ "node" ]
CMD [  "server.js" ]
EXPOSE 80
