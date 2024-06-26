FROM node:18 as clientbuild
WORKDIR /usr/local/app
COPY ./ClientApp/package.json ./ClientApp/package-lock.json .
RUN npm install
COPY ./ClientApp .
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
