# angular-web-handhistory
AngularJS application for displaying hand history for poker games.

This AngularJS 1.6 single page application was built with Component architecture, file structure, one-way data flow, and lifecycle hooks in mind.

Functionallity:
+ Displays player's hand history
+ Filtering hand history items based on game type (tournament or cash game)
+ Filtering hand history items based on game outcome (hands won or hands lost)
+ Infinite scroll for available hand history

Application was written in ES6, [Webpack](https://webpack.github.io/) and [Babel](https://babeljs.io/) were used transpile and bundle all of the source code to ES2015.

# Installation
Run the following command to install all dependencies
```
$ npm install
```

# Run the application
```
$npm start
```
App runs on http://localhost:3000. [Webpack dev server](https://webpack.github.io/docs/webpack-dev-server.html) will open new page in default browser when application loads.
