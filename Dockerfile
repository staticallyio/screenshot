FROM node:alpine

WORKDIR /usr/src/app
COPY . .

RUN npm install --only=production
EXPOSE 5000
CMD [ "npm", "start" ]
