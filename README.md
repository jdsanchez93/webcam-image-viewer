# WebcamImageViewer

## Prerequisites

1. nodejs: https://nodejs.org/en/
2. npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. docker: https://docs.docker.com/desktop/install/windows-install/
3. .NET 6.0: https://dotnet.microsoft.com/en-us/download
4. aws cli https://aws.amazon.com/cli/

There are two pieces in this project:
1. ASP.NET Core Web API
2. Angular app

## ASP.NET Core Web API

I created this using this tutorial: https://dotnet.microsoft.com/en-us/learn/aspnet/microservice-tutorial/create

Currently everything for the api lives in the base directory.

This project is configured to use a mysql database.\
The connection string can be configured via the ConnectionStrings__Mysql environment variable.

For development, run `docker-compose up -d` to run a mysql db in docker.

The api requires access to an S3 bucket and SQS queue. \
You can configure a named profile using the AWS cli, e.g. `aws configure --profile webcam-image-viewer-dev` \
Reach out to the repository owner for the access key & secret key. And make sure to set a region.\
Then set the `AWS:Profile` config via Secrets Manager as explained in the next section. \
Alternatively, you can set the following environment variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION

For development, this project can use Secrets Manager to store sensitive data: https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-7.0&tabs=windows#secret-manager
From the base directory, you can run the following commands to set the required secrets:
```
dotnet user-secrets set "Aws:QueueUrl" "<value>"
dotnet user-secrets set "Aws:BucketName" "<value>"
dotnet user-secrets set "AWS:Profile" "webcam-image-viewer-dev"
dotnet user-secrets set "AWS:Region" "us-east-2"
dotnet user-secrets set "Cognito:ClientId" "<value>"
dotnet user-secrets set "Cognito:ClientSecret" "<value>"
dotnet user-secrets set "Cognito:MetadataAddress" "<value>"
dotnet user-secrets set "Cognito:Domain" "<value>"
```
Alternatively, you may use environment variables to set these values.

Launch the api in Visual Studio Code with launchSettings.json.\
Runs on port 5039.

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