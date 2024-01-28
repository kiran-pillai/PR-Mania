FROM node:18-alpine
WORKDIR /api 
COPY package*.json ./
RUN npm install
COPY src src
CMD ["npx", "ts-node", "src/app.ts"]
EXPOSE 8000