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

COPY --from=builder /app/build ./build
RUN npm i serve

ENTRYPOINT [ "npx" ]
CMD [  "serve", "build", "-l", "80" ]
EXPOSE 80
