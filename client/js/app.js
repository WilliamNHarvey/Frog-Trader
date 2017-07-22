// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('pepeTrader', ['ionic', 'pepeTrader.controllers', 'pepeTrader.services', 'pepeTrader.tap', 'pepeTrader.upgrades', 'ngResource'])

.run(function($window, $location, $ionicPlatform, $rootScope, AuthenticationService) {
  $rootScope.user = {
    name: $window.sessionStorage.name,
    is_admin: $window.sessionStorage.is_admin
  };

  if ($rootScope.user.is_admin) {
    AuthenticationService.isAdmin = true;
  }

  $rootScope.$on("$stateChangeStart", function(event, toState) {
    //redirect only if both isAuthenticated is false and no token is set

    if (['tappage', 'upgrade-store'].indexOf(toState.name) === -1) {
      if (!AuthenticationService.isAuthenticated && !$window.localStorage.token) {
        event.preventDefault();
        $location.path("/tappage");
      }
    }

  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

    function preload(arrayOfImages, arrayOfClasses) {
        $(arrayOfImages).each(function(){
            $('<img/>')[0].src = this;
            // Alternatively you could use:
            // (new Image()).src = this;
        });
        $(arrayOfClasses).each(function(){
            $('<img/>')[0].className = this;
        });
    }
    preload([
        '../img/happytosadpepe.gif',
        '../img/sadtohappypepe.gif',
        '../img/happypepe.png',
        '../img/sadpepe.png'
    ],[
        'happytosad',
        'sadtohappy',
        'happy',
        'sad'
    ]);
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider.state('tappage', {
    url: "/tappage",
    templateUrl: "templates/tappage/tappage.html",
    controller: 'TapPageCtrl'
    })

    .state('register', {
    url: "/register",
    templateUrl: "templates/register.html",
    controller: 'RegisterCtrl'
    })

    .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
    })

    .state('upgrade-store', {
      url: "/upgrade-store",
      templateUrl: "templates/upgrade-store/upgrade-store.html",
      controller: 'UpgradeStoreCtrl'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs-container.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.quiz', {
    url: '/quiz',
    views: {
      'tab-quiz': {
        templateUrl: 'templates/tab-quiz.html',
        controller: 'QuizCtrl'
      }
    }
    })

    .state('tab.leaders', {
    url: '/leaders',
    views: {
      'tab-leaders': {
        templateUrl: 'templates/tab-leaders.html',
        controller: 'LeadersCtrl'
      }
    }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/quiz');

    // Register middleware to ensure our auth token is passed to the server
    $httpProvider.interceptors.push('TokenInterceptor');
})