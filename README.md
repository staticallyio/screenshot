<p align="center">
  <a href="https://statically.io/screenshot/">
    <img src="https://cdn.statically.io/img/statically.io/images/branding/statically-mark.svg" alt="Screenshot" height="80"/>
  </a>
</p>

<h1 align="center">Screenshot</h1>

<p align="center">Automagically converts URLs into images and PDFs.</p>

<p align="center">
  <a href="https://statically.io">statically.io</a> |
  <a href="https://twitter.com/staticallyio">Twitter</a> |
  <a href="https://www.patreon.com/fransallen">Become A Backer</a>
  <br /><br />
	<a href="https://hub.docker.com/r/statically/screenshot">
    <img src="https://img.shields.io/docker/cloud/build/statically/screenshot" alt="Docker Cloud Build Status" />
  </a>
  <a href="https://hub.docker.com/r/statically/screenshot">
    <img src="https://img.shields.io/docker/pulls/statically/screenshot?color=success" alt="Docker Pulls" />
  </a>
  <a href="https://hub.docker.com/r/statically/screenshot">
    <img src="https://img.shields.io/docker/image-size/statically/screenshot/latest?color=success" alt="Docker Image Size" />
  </a>
</p>

## :sparkles: Overview

**Screenshot** is a simple application to automagically convert URLs into images and PDFs. It's designed to be simple and easy to install anywhere. This application is split into two distinct components, the core service to process the URL and then send it to a remote browser (Chrome). The remote browser to screenshot and generate PDF from a URL.

## :bulb: Features

- Screenshot website in desktop view.
- Screenshot website in mobile view.
- Converts URL into PDF.

## :zap: Installation

We'll be using Docker as an easy way to install. However since this is a Node.js application, you can run it with your current setup, if you choose this method, please see [config/index.js](config/index.js) to change the remote browser endpoint.

### Run the browser

We'll be using the **browserless/chrome** Docker image to do most of this work.

```bash
docker run -d \
  --name chrome \
  -e "ENABLE_DEBUGGER=false" \
  -e "DISABLE_AUTO_SET_DOWNLOAD_BEHAVIOR=true" \
  -e "DEFAULT_BLOCK_ADS=true" \
  -p 3000:3000 \
  browserless/chrome:latest
```

To see more options, you can check [full documentation](https://docs.browserless.io/docs/docker.html).

### Run the app

```bash
docker run -d \
  --name screenshot \
  -e "REMOTE_BROWSER=ws://172.17.0.1:3000" \
  -p 5000:5000 \
  statically/screenshot:latest
```

Replace the `REMOTE_BROWSER` variable with the remote browser endpoint that you set above. In this example we are using Docker's internal IP address, it should work if you are running both components on one machine.

## :fire: Fire it up

The application avalaible through `/screenshot/` path.

- Visit http://localhost:5000/screenshot/github.com for desktop view.

![Screenshot Desktop](https://cdn.statically.io/gh/staticallyio/screenshot/master/public/screenshot-desktop.png)

- Visit http://localhost:5000/screenshot/mobile/github.com for mobile view.

![Screenshot Mobile](https://cdn.statically.io/gh/staticallyio/screenshot/master/public/screenshot-mobile.png)

- Visit http://localhost:5000/screenshot/pdf/news.ycombinator.com for PDF.

![Screenshot PDF](https://cdn.statically.io/gh/staticallyio/screenshot/master/public/screenshot-pdf.png)