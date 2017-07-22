angular.module('pepeTrader.controllers', [])

.controller('NavCtrl', function($rootScope, $scope, $location, RegistrationService, PepesService, $window) {
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
    PepesService.get().then(function() {
        //fade in score
        var pepes = $window.localStorage.getItem('pepes');
        if(pepes) {
            $scope.pepes = pepes;
        }
        else {
            $window.localStorage.setItem('pepes', 0)
            $scope.pepes = 0;
        }

    });
    $scope.increasePepes = function() {
        $scope.pepes++;
        $window.localStorage.setItem('pepes', $scope.pepes);
    };
    $scope.parsePepes = function(n){
        if(n == 0) return n + ' pepes';
        var base = floor(log(abs(n))/log(1000));
        var suffix = ' ' + ['', 'kilo','Mega','Giga','Tera','Peta','Exa','Zetta','Yotta'][base];
        round(n/pow(1000,base), precision) == 1 ? suffix += 'pepe' : suffix += 'pepes';
        return suffix ? round(n/pow(1000,base), precision)+suffix : ''+n;
    };

    $scope.go = function (path, pageAnimationClass) {

        if (typeof(pageAnimationClass) === 'undefined') { // Use a default, your choice
            $scope.pageAnimationClass = 'crossFade';
        }

        else { // Use the specified animation
            $scope.pageAnimationClass = pageAnimationClass;
        }

        if (path === 'back') { // Allow a 'back' keyword to go to previous page
            $window.history.back();
        }

        else { // Go to the specified path
            $location.path(path);;
        }
    };
})


.controller('QuizCtrl', function($scope, $ionicPopup, $ionicLoading, SocketIO, Question, Answer, 
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
    $ionicLoading.show({
      template: 'Next question in 3 seconds...'
    });

    var timer = setInterval(function() {
      $scope.timer--;
      $ionicLoading.show({
        template: 'Next question in ' + $scope.timer + ' seconds...'
      });

      if ($scope.timer <= 0) {
        clearInterval(timer);
        if (msg.question != 'end') {
          hideLeaders();
        }
        $ionicLoading.hide();
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

.controller('TapPageCtrl', function($scope, $location, PepesService) {
    document.addEventListener('mousemove', function(e) {e.preventDefault()}, false);
    document.addEventListener('touchmove', function(e) {e.preventDefault()}, false);
    $scope.onUpgradeStore = false;

    $scope.lightenUp = function() {
        $("#bg").animate({ opacity: 0 }, 1500)
        $("#pepeCount").animate({ opacity: 1 }, 1500)
    }
    $scope.upgrades = 'test';
})

.controller('UpgradeStoreCtrl', function($scope, $location, PepesService) {
    $scope.onUpgradeStore = true;
    $scope.upgrades = 'test';
})