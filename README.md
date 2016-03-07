# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm`
* Ensure you're running the latest versions Node `v4.1.x`+ and NPM `2.14.x`+

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies

## Running the app
After you have installed all dependencies you can now run the app. Run `npm start` to start a local server using `webpack-dev-server` 
which will watch, build (in-memory), and reload for you. Please make sure you have started the backend project.

### server
```bash
# development
npm run server
# production
npm run build:prod
npm run server:prod
```

## Other commands

### build files
```bash
# development
npm run build:dev
# production
npm run build:prod
```

### watch and build files
```bash
npm run watch
```

### run tests
```bash
npm run test
```

### watch and run our tests
```bash
npm run watch:test
```

### special note
Thanks to the angular class team for having a starter kit I can work with.