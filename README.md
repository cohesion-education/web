# web

[![wercker status](https://app.wercker.com/status/2c145d68d070b85252b59738ee1d7f75/s/master "wercker status")](https://app.wercker.com/project/byKey/2c145d68d070b85252b59738ee1d7f75)

## Setup

This is a React project created using the [create-react-app](https://github.com/facebookincubator/create-react-app) utility. We are using yarn instead of npm, so we recommend [installing yarn](https://yarnpkg.com/lang/en/docs/install/).

Optionally, you may also install the [Wercker CLI](http://devcenter.wercker.com/docs/cli) to run the Wercker build locally.

## Run locally

First, install the project.

  yarn install

Once the dependencies for the project have been installed, you can run it locally.

  yarn start


## Build locally
To run tests:

    yarn test -- --coverage

Build locally using the Wercker CLI:

    wercker build
