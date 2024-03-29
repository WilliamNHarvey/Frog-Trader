// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('pepeTrader', ['ui.router', 'ngAnimate', 'pepeTrader.controllers', 'pepeTrader.services', 'pepeTrader.tap', 'pepeTrader.upgrades', 'pepeTrader.slotMachine', 'ngResource'])

.run(function($window, $location, $rootScope, AuthenticationService) {
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
      //if (!AuthenticationService.isAuthenticated && !$window.localStorage.token) {
        event.preventDefault();
        $location.path("/tappage");
      //}
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
    $rootScope.removeSlideLeft = false;
    $rootScope.switchPage = function (path, pageAnimationClass) {

        if (typeof(pageAnimationClass) === 'undefined') { // Use a default, your choice
            $rootScope.pageAnimationClass = 'crossFade';
        }

        else { // Use the specified animation
            $rootScope.pageAnimationClass = pageAnimationClass;
            if(pageAnimationClass == 'slideLeft') {
                $rootScope.removeSlideLeft = true;
            }
        }

        if (path === 'back') { // Allow a 'back' keyword to go to previous page
            $window.history.back();
        }

        else { // Go to the specified path
            $location.path(path);;
        }
    };

    $rootScope.lightened = false;
    $rootScope.sad = true;
    $rootScope.showSuccessAlert = false;

    var pow=Math.pow, floor=Math.floor, abs=Math.abs, log=Math.log, precision = 2;
    function round(n, precision) {
        var prec = Math.pow(10, precision);
        return Math.floor(n*prec)/prec;
    }

    $rootScope.parsePepes = function(n){
        if(n == 0) return n + ' pepes';
        var base = floor(log(abs(n))/log(1000));
        var suffix = ' ' + ['', 'kilo','Mega','Giga','Tera','Peta','Exa','Zetta','Yotta'][base];
        round(n/pow(1000,base), precision) == 1 ? suffix += 'pepe' : suffix += 'pepes';
        return suffix ? round(n/pow(1000,base), precision)+suffix : ''+n;
    };


    $rootScope.switchBool = function(value) {
        $rootScope[value] = !$rootScope[value];
    };
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

    $stateProvider.state('slots', {
        url: "/slots",
        templateUrl: "templates/slots/slots.html",
        controller: 'SlotsCtrl'
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
    $urlRouterProvider.otherwise('/tappage');

    // Register middleware to ensure our auth token is passed to the server
    $httpProvider.interceptors.push('TokenInterceptor');
})