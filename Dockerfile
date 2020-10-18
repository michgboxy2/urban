FROM node:alpine

WORKDIR /usr/src/urban-api

COPY package.json .

RUN npm install --only=prod

COPY . .

EXPOSE 3000:3000

CMD ["npm", "start"]