## Introduction

### syncretis Portal Client

- Typescript
- React
- Apollo Client
- Ant Design
- Oauth

## Links

### DEV

* CMS Admin: https://portal-strapi.dev.syncretis.com/admin
* Storybook: https://portal-storybook.dev.syncretis.com
* API Sandbox: https://portal.dev.syncretis.com/graphql
* Client: https://portal.dev.syncretis.com

### PROD

**in current release 1.10**

* CMS Admin: https://portal.syncretis.com/admin (ONLY WITHIN INTRANET)
* Storybook: not available
* API Sandbox: not available, api link is https://portal.syncretis.com/gateway/graphql
* Client: https://portal.syncretis.com/client

**next release: 1.11**

* CMS Admin: https://portal-strapi.syncretis.com/admin (ONLY WITHIN INTRANET)
* Storybook: not available
* API Sandbox: not available, api link is https://portal.syncretis.com/graphql
* Client: https://portal.syncretis.com

## Installation process

1nstall deps

`npm install -g yarn && yarn install`

Run application

`yarn start`

open http://localhost:3000

## Local development (gateway)

Create file .env.local in root folder and point at API host

`REACT_APP_GATEWAY=https://localhost:4000`

Then run application

# Build

Build with:

`yarn build`

This command will create artifact in folder /build

Analyze bundle size with:

`yarn analyze`

# Testing

Install deps

`npm install -g yarn && yarn install`

Run application

`yarn start`

Run cypress

`yarn cypress:open`

# Contribute

Please check https://portal.syncretis.com/projects/guild-portal/managers and contact anyone from the list
