angular.module('pepeTrader.controllers', [])

.controller('NavCtrl', function($rootScope, $scope, $location, RegistrationService, PepesService, UpgradesService, $window) {
  /*$scope.logout = function() {
    RegistrationService.logout();
    $location.path("/register");
  }
  $scope.timeleft = '0 secs';*/
    var pow=Math.pow, floor=Math.floor, abs=Math.abs, log=Math.log, precision = 2;
    function round(n, precision) {
        var prec = Math.pow(10, precision);
        return Math.floor(n*prec)/prec;
    }
    //PepesService.get().then(function() {
        //fade in score
        var pepes = PepesService.getPepes();//$window.localStorage.getItem('pepes');
        if(pepes) {
            $scope.pepes = pepes;
        }
        else {
            PepesService.getPepes(0);//$window.localStorage.setItem('pepes', 0)
            $scope.pepes = 0;
        }

    //});
    $scope.increasePepes = function() {
        $scope.pepes++;
        PepesService.setPepes($scope.pepes);//$window.localStorage.setItem('pepes', $scope.pepes);
    };
    $scope.parsePepes = $rootScope.parsePepes;

    $scope.switchPage = $rootScope.switchPage;

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };

    if(($location.path() != '/tappage' || $rootScope.lightened) && $location.path() != '') {
        if(!$rootScope.lightened) {
            $rootScope.lightened = true;
        }
        $("#navbar").css({ opacity: 1 });
    }
})


.controller('QuizCtrl', function($scope, SocketIO, Question, Answer,
                                 AuthenticationService, RegistrationService, UserResponse) {
  $scope.q = {};
  $scope.q.answers = ['one', 'two', 'three'];
  $scope.answer = null;
  $scope.show_leaders = false;
  $scope.correct_answer = null;
  $scope.answerIndex = false;
  $scope.is_admin = AuthenticationService.isAdmin;

  $scope.hasAnswered = function() {
    // Has the user answered the current question already?
    return UserResponse.get($scope.q.id) !== undefined;
  };

  $scope.userAnswerCorrect = function(index) {
    // Is this the index of the user's response, and is it the right answer
    index = index + 1;
    return UserResponse.get($scope.q.id) === index && index === $scope.q.answer_index;
  };

  $scope.userAnswerWrong = function(index) {
    // Is this the index of the user's response, and is it the wrong answer
    index = index + 1;
    return UserResponse.get($scope.q.id) === index && index !== $scope.q.answer_index;
  };

  $scope.isCorrectAnswer = function(index) {
    // Is this the index of the correct answer
    index = index + 1;
    return index === $scope.q.answer_index;
  };

  $scope.saveChoice = function(index) {
    UserResponse.set($scope.q.id, index + 1);
    var a = new Answer({
      question_id: $scope.q.id,
      user_id: '1',
      answer_index: index + 1
    });
    a.$save(function() {
      // Right answer
      $scope.q.answer_index = index + 1;
      $scope.answerIndex = true;
      showLeaders();
    }, function(q) {
      // Wrong answer
      $scope.q.answer_index = q.data.answer_index;
      $scope.answerIndex = true;
      showLeaders();
    });
  };

  Question.query({
    show: true,
    select: ['question', 'answers']
  }, function(rows) {
    $scope.q = rows[0];
    $scope.answerIndex = true;
    check_start();
  });

  function check_start() {
    if ($scope.q.question == 'end') {
      showLeaders();
    }
  }

  SocketIO.on('questions', function(msg) {
    $scope.answerIndex = false;
    $scope.correct_answer = null;

    msg = JSON.parse(msg);

    if (msg.question === 'start') {
      UserResponse.reset();
      return;
    } else if (msg.question === 'end') {
      showLeaders();
      $scope.timer = 1;
      UserResponse.reset();
      return;
    }

    $scope.timer = 3;


    var timer = setInterval(function() {
      $scope.timer--;


      if ($scope.timer <= 0) {
        clearInterval(timer);
        if (msg.question != 'end') {
          hideLeaders();
        }

        $scope.q = msg;
        check_start();
        $scope.$apply();
      }
    }, 1000);
  });

  SocketIO.on('answer', function(msg) {
    var packet = JSON.parse(msg);
    $scope.correct_answer = packet;
  });

  $scope.$on('$destroy', function(event) {
    SocketIO.removeAllListeners('questions');
    SocketIO.removeAllListeners('answer');
  });

  function showLeaders() {
    $scope.show_leaders = true;
    $scope.leaders = Answer.leaders();
  }

  function hideLeaders() {
    $scope.show_leaders = false;
  }
})

.controller('RegisterCtrl', function($scope, $location, RegistrationService) {
  $scope.user = {
    name: '',
    email: '',
    password: '',
    password2: ''
  };

  $scope.$parent.logout_text = 'Logout';

  $scope.register = function() {
    RegistrationService.register($scope.user).then(function() {
      $location.path("/");
    })
  }
})

.controller('LoginCtrl', function($scope, $location, RegistrationService) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.$parent.logout_text = 'Register';

  $scope.login = function() {
    RegistrationService.login($scope.user.email, $scope.user.password).then(function() {
      $location.path("/");
    });
  }

})

.controller('LeadersCtrl', function($scope, SocketIO, Answer) {
  $scope.leaders = Answer.leaders();

  SocketIO.on('answer', function(msg) {
    $scope.leaders = Answer.leaders();
  });

  $scope.$on('$destroy', function(event) {
    SocketIO.removeAllListeners('answer');
  });

})

.controller('TapPageCtrl', function($rootScope, $scope, $location, PepesService) {
    //document.addEventListener('mousemove', function(e) {e.preventDefault()}, false);
    //document.addEventListener('touchmove', function(e) {e.preventDefault()}, false);
    $(document).scrollTop(0);
    $(document).bind('touchmove', false);
    $scope.onUpgradeStore = false;
    $scope.lightened = $rootScope.lightened;

    $scope.lightenUp = function() {
        $("#bg").animate({ opacity: 0 }, 1500);
        $("#navbar").animate({ opacity: 1 }, 1500);
        $rootScope.lightened = true;
    }
})

.controller('UpgradeStoreCtrl', function($scope, $location, PepesService, UpgradesService) {
    $scope.upgradeObject = [];
    $(document).unbind('touchmove');

    UpgradesService.get('../lib/objects/upgrades.json').then(function(upgradesJson) {
        angular.forEach(upgradesJson.data, function(upgrade, key) {
            if(upgrade['name'] && upgrade['button'] && (upgrade['cost'] || upgrade['cost-fn'])) {
                var nextCost;
                if(upgrade['cost']) {
                    nextCost = upgrade['cost'];
                }
                else {
                    nextCost = eval('UpgradesService.' + upgrade['cost-fn'] + '()');
                }
                if(typeof nextCost !== 'undefined') {
                    $scope.upgradeObject.push([upgrade['name'], upgrade['description'], upgrade['button'], nextCost])
                }
            }
        });
    });
})