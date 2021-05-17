# Stage 1 - the build process
FROM node:14.16-alpine3.13 as build-deps
LABEL stage=builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ARG REACT_APP_BUILD_META
RUN REACT_APP_BUILD_META=$REACT_APP_BUILD_META yarn build

# Stage 2 - the production environment
FROM nginx:1.19-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY --from=build-deps /usr/src/app/default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]