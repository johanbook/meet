################################
# Build server
################################
FROM node:20.13.0-alpine as builder

WORKDIR /app

COPY . .
RUN npm ci -D --legacy-peer-deps
RUN npm run build


################################
# Create Docker image
################################
FROM node:20.13.0-alpine

WORKDIR /app

ENV PORT=80

COPY package.json package-lock.json ./
COPY --from=builder /app/dist ./dist
RUN npm ci --legacy-peer-deps

ENTRYPOINT [ "npm" ]
CMD [  "run", "start:prod" ]
EXPOSE 80
