FROM node:alpine

WORKDIR /usr/src/app
COPY . .

RUN npm ci
EXPOSE 5000
CMD [ "npm", "start" ]
