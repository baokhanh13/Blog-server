FROM node:12.18-alpine

ENV NODE_ENV=production
ENV MONGODB_URL mongodb://mongo:27017/blog-server

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 4000
CMD ["yarn", "start"]
