FROM node:alpine

RUN apk add chromium

WORKDIR /usr/src/app
COPY . .

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN npm install --only=production
EXPOSE 5050
CMD [ "npm", "start" ]