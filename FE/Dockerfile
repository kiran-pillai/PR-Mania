FROM node:18-bullseye-slim AS build-app
WORKDIR /app

ARG CACHE_BUST

RUN echo $CACHE_BUST > /dev/null

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

ENV PORT=3001

EXPOSE 3000

CMD ["npm", "run", "dev"]
