# WebcamImageViewer

There are two pieces in this project:
1. ASP.NET Core Web API
2. Angular app

## ASP.NET Core Web API

I created this using this tutorial: https://dotnet.microsoft.com/en-us/learn/aspnet/microservice-tutorial/create

Currently everything for the api lives in the base directory.

When launched through Visual Studio Code, this api runs on port 5039.

## Angular app

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

To get started, run `npm install`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. When run as a dev server, all api calls will proxy to the web api running on port 5039.

## Deployment

Build docker image:

```
docker build -t jdeeezy/webcam-image-viewer:0.0.1 .
```

Run container:
```
docker run -it --rm -p 3000:80 --name webcam-image-viewer jdeeezy/webcam-image-viewer:0.0.1
```