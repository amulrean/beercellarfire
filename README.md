# Beercellarfire

## Angular Dev Setup

- Using the template src/environments/environment-secrets.ts-template Create src/src/environments/environment-secrets.ts with Fiberbase keys filled in.
- $ npm install
- $ ng serve

## Node Server Dev Setup

Must set up a node serve to pass through search requests to BreweryDB to get around coors restrictions

- Obtain brewerydb api key
- export BREWERYDB_API_KEY=123key
- export ALLOW_DOMAIN=http://localhost:4200
- $ node server/server.js 

## Node Server Production

I set up a standard Ubuntu 16.04 ec2 instance on AWS

- Follow (Node Setup)[
- $ export BREWERYDB_API_KEY=123Key
- export ALLOW_DOMAIN=(Production App)
- $ vi ~/bashrc
- Add export statement to bottom
- create file ~/server.js copy from server/server.js
- create file ~/package.json copy from server/package.json
- $ sudo npm install
- $ pm2 start server.js

## Resources

- Angular 2: https://angular.io/
- Angular 2 CLI: https://github.com/angular/angular-cli
- AngularFire2: https://github.com/angular/angularfire2
- Angular Material 2: https://github.com/angular/material2
- Material 2 Demo App: https://github.com/jelbourn/material2-app
- BreweryDB: http://www.brewerydb.com/developers
- BreweryDB Node Server Setup: http://52.40.59.238/code.html
- Setup Node on Ubuntu 16.04: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
- Authentication for Angular2: https://blog.khophi.co/angularfire2-authentication/

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


Started Security Rules
{
  "rules": {
    "users2": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    ".read": "true",
    ".write": "auth != null"
  }
}
