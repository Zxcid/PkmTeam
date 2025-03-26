FROM node:18.13-alpine AS builder

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install

COPY . ./

FROM builder AS dev

EXPOSE 4200
CMD ["npm", "run", "start-dev"]
