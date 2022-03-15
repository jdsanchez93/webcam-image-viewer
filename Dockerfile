FROM node:16.13.0 as clientbuild
WORKDIR /usr/local/app
COPY ./ClientApp /usr/local/app/
RUN npm install
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY webcam-image-viewer.csproj .
RUN dotnet restore
COPY . .
# TODO move the server into inner directory to avoid this
RUN rm -r ./ClientApp
COPY --from=clientbuild /usr/local/app/dist/webcam-image-viewer ./wwwroot
RUN dotnet publish -c release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "webcam-image-viewer.dll"]
