# Introduction

Sidenis Portal Client - application built on top of React and Apollo

Language: Typescript 3.7 (If you see Typescript warning in your IDE, probably you need to upgrade it either by choosing to use version from project node_modules or select another version in your editor settings)

UI Kit: Ant Design

# Getting Started

## Installation process

1nstall deps

`npm install -g yarn && yarn install`

Create file .env.local in root folder and fill it with

`REACT_APP_GATEWAY=https://portal.dev.sidenis.com/gateway`

if gateway is running locally, use its address. example

`REACT_APP_GATEWAY=https://localhost:4000`

Run application

`yarn start`

open http://localhost:3000

# Build and Test

Build with:

`yarn build`

This command will create artifact in folder /build

# Contribute

Please check https://portal.sidenis.com/client/projects/guild-Dashboard/managers and contact anyone from the list
