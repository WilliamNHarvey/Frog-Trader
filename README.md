# Frog Trader

Trade frogs, get rich

## Documentation

Tech documents: 

* Feature development progress
* MVP's
* Business documents

https://drive.google.com/drive/folders/0B7qbEg69j00Ea2ZZdEIwNjhkb28

## Deployment

The app can be deployed to Heroku, and distributed to the mobile device either through
the mobile web browser, or by compiling the AngularJS application into a native app
using an Apache Cordova container.

## Deploy to Heroku

When you are ready to share the app, just create a new Heroku app, provision a Postgres
database addon for your app, and then deploy the code. After you deploy you should
bootstrap the database:

    $ heroku run ./bootstrap.sh

## Front-end app

The front-end app is an AngularJS single page application. Thus all the HTML and Javascripted
are loaded and run in a single WebView control on the phone. Different screens and navigation
are all drawn in the browser DOM.

Angular

## Debugging

Install `node-debug` to use the Chrome debugger with Node.js:

    $ npm install node-debug

And to use, just run with `node-debugger`. After the Chrome debugger opens, make sure to click `Run`
so the server starts:

    $ node-debug server.js


## Building a native app

To bundle your client app as a native mobile app, you can use the Cordova tool. Note that to build
a native app you will need the corresponding native build tools. So for iOS apps you will need
Xcode installed, and for Android apps you will need to have the Android SDK installed.

Install Cordova:

    $ sudo npm install -g cordova

Install an application simulator:

    $ sudo npm install -g ios-sim

Initialize the wrapper:

    $ mkdir wrapper
    $ cd wrapper
    $ cordova create . FrogTrader
    $ rm -rf www
    $ ln -s ../client www

Now add one or more platform targets:

    $ cordova platform add ios
    $ cordova platform add android

Now build the native app:

    $ cordova compile ios

And run in the emulator:

    $ cordova run --emulator

## Fixing AJAX calls

The Ajax calls used in the Angular client are written using simple relative paths. This means that they automatically use the `host` value inferred from the domain which served the client JS files. This all works properly when the client app is served from a web server.

However, when you package the client files into the Cordova wrapper, then they are provided to the mobile device from the local filesystem, rather than being served from the web. As a result there is no `domain` to tell the Ajax calls where to go. To correct this, you need to specify your web domain explicitly in all client Ajax calls, such as the login call:

https://github.com/WilliamNHarvey/Frog-Trader/blob/master/client/js/services.js#L93

## Contact

William Harvey <william.n.harvey@gmail.com>

Christiaan Oostenbrug <Christiaan_Oostenbrug@yahoo.com>

## License

See LICENSE. This code is available under the MIT license.

