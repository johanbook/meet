FROM node:16.5.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

ENTRYPOINT [ "node" ]
CMD [  "server.js" ]
EXPOSE 80
