# Beercellarfire

## Angular Dev Setup

- Using the template src/environments/environment-secrets.ts-template Create src/src/environments/environment-secrets.ts with Fiberbase keys filled in.
- $ npm install
- $ ng serve

## Node Server Dev Setup

Must set up a node serve to pass through search requests to BreweryDB to get around coors restrictions

- Obtain brewerydb api key
- $ node server/server.js 123key

## Resources

- Angular 2: https://angular.io/
- Angular 2 CLI: https://github.com/angular/angular-cli
- AngularFire2: https://github.com/angular/angularfire2
- Angular Material 2: https://github.com/angular/material2
- Material 2 Demo App: https://github.com/jelbourn/material2-app
- BreweryDB: http://www.brewerydb.com/developers
- BreweryDB Node Server Setup: http://52.40.59.238/code.html


## Firebase Hosting

```
$ npm install -g firebase-tools
$ firebase login
$ firebase init
$ firebase deploy
```

## Update Firebase Production

```
$ ng build --prod
$ firebase deploy
```
