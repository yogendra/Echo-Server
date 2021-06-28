FROM --platform=$BUILDPLATFORM node:lts-alpine AS build
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /build/src/global.json .
COPY --from=build /build/dist/webserver.js .
USER 1000
ENTRYPOINT [ "node", "webserver" ]
