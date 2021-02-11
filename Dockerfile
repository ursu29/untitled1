# Stage 1 - the build process
FROM node:10.16 as build-deps
LABEL stage=builder

ARG REACT_APP_DT_BRANCH_NAME
ENV REACT_APP_DT_BRANCH_NAME=$REACT_APP_DT_BRANCH_NAME
ARG REACT_APP_DT_REPO_NAME
ENV REACT_APP_DT_REPO_NAME=$REACT_APP_DT_REPO_NAME
ARG REACT_APP_DT_SOURCE_VERSION
ENV REACT_APP_DT_SOURCE_VERSION=$REACT_APP_DT_SOURCE_VERSION
ARG REACT_APP_DT_SOURCE_VERSION_MSG
ENV REACT_APP_DT_SOURCE_VERSION_MSG=$REACT_APP_DT_SOURCE_VERSION_MSG

ARG PUBLIC_URL="/"
ARG REACT_APP_AZURE_TENANT="27d1d5a7-306f-4239-ab67-3bd61777078a"
ARG REACT_APP_AZURE_CLIENT="c0cf86b2-92ae-4ae4-b5c1-afeb1cec58d8"
ARG GENERATE_SOURCEMAP=false
ARG REACT_APP_YANDEX_METRIKA="68498656"
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.19-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY --from=build-deps /usr/src/app/default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]