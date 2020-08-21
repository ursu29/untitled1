# Stage 1 - the build process
FROM node:10.16 as build-deps
LABEL stage=builder
ENV PUBLIC_URL="/client"
ENV REACT_APP_AZURE_TENANT="5acc8b65-db91-44ea-8d28-20f9e45b432e"
ENV  REACT_APP_AZURE_CLIENT="42b2f986-390a-4b73-81a0-deb06f79a7f0"
ARG GENERATE_SOURCEMAP=false
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY --from=build-deps /usr/src/app/default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]