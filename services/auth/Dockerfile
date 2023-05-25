################################
# Build client
################################
FROM node:16.5.0-alpine as client

WORKDIR /app

COPY ./client .
RUN npm ci -D
RUN npm run build

################################
# Build server
################################
FROM node:16.5.0-alpine as builder

WORKDIR /app

COPY . .
RUN npm ci -D
RUN npm run build


################################
# Create Docker image
################################
FROM node:16.5.0-alpine

WORKDIR /app

ENV PORT=80

COPY package.json package-lock.json ./
COPY scripts/ ./scripts
COPY --from=builder /app/dist ./dist
COPY --from=client /app/build ./dist/client
RUN npm ci

ENTRYPOINT [ "npm" ]
CMD [  "run", "start:prod" ]
EXPOSE 80
