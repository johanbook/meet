################################
# Build server
################################
FROM node:20.18.2-alpine as builder

WORKDIR /app

COPY . .
RUN npm ci -D
RUN npm run build


################################
# Create Docker image
################################
FROM node:20.18.2-alpine

WORKDIR /app

ENV PORT=80

COPY package.json package-lock.json ./
COPY --from=builder /app/dist ./dist
RUN npm ci

ENTRYPOINT [ "npm" ]
CMD [  "run", "start:prod" ]
EXPOSE 80
