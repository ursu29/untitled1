# Introduction

Sidenis Portal Client - application built on top of React and Apollo

Language: Typescript 3.7

UI Kit: Ant Design

# Getting Started

## Installation process

1nstall deps

`npm install -g yarn && yarn install`

Run application

`yarn start`

open http://localhost:3000

## Local development (gateway)

Create file .env.local in root folder and point at gateway host

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

Please check https://portal.sidenis.com/client/projects/guild-Portal/managers and contact anyone from the list
