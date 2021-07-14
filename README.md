# Restify Example at HTW Berlin

## What is this project about?

This is a simple demo application for showing the core functionalities
of [Restify](https://www.npmjs.com/package/restify). On starting the application, laureate and Nobel Prize data are
loaded from [the official Nobel Prize API](https://api.nobelprize.org). The data are then stored in a fake database (
simple array since the amount of data is relatively small).

The aim of this project is not to make a lot of sense, but rather to provide some samples of the presented framework.

## How do I set up this project locally?

After pulling this repository you have two (or rather 2,5) options for setting up the project locally.

### Option 1: Node

#### A: Productive mode

```shell
npm run start:dev
```

#### B: Dev mode

```shell
npm run build
npm run start:prod
```

### Option 2: Docker

```shell
docker build -t htw-gr7-restify-example .
docker run -d -p 8080:8080 --name nobel-prize-api htw-gr7-restify-example
```

### How to explore the API/code?

The three basic functions of this API are:

- Request random Nobel Prize Data (no authorization required)
- (Fake) Authorization returning an, also faked, token
- Request laureate details (requires token)

A [Postman collection](./restify-nobel-prizes.postman_collection.json) is added to this repository that will guide you
through the code you want to explore (you might have to change the variable `url`). In the code, all functionalities are
described in comments.
