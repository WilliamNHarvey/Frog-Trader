angular.module('pepeTrader.tap', [])

.directive('tapButton', function(){
    return {
        restrict: 'AE',
        scope: true,
        template: '<div id="tapbutton" class="tapbutton" layout-align="" ng-click="tapButton($event)"></div>',
        controller: function($rootScope, $scope, $element){
            if($rootScope.sad) {
                var sad = true;
                $('#tapbutton').addClass('sad').animate({ opacity: 1 }, 1000);
            }
            else {
                var sad = false;
                $('#tapbutton').addClass('happy').animate({ opacity: 1 }, 1000);
            }
            var sadTimer;
            $scope.tapButton = function(e){

                $('#tapbutton').stop(true);
                if($('#tapbutton').width() != 300) {
                    $('#tapbutton').css('width', '300px');
                    $('#tapbutton').css('height', '300px');
                    $('#tapbutton').css('top', '50vh');
                    $('#tapbutton').css('left', '50vw');
                }
                /*clearTimeout(sadTimer);
                sadTimer = setTimeout(function(){ makeSad(); }, 5000);*/

                if(sad) {
                    makeHappy();
                    $scope.lightenUp();
                    $rootScope.sad = false;
                }
                var hue = 'hue-rotate('+Math.random()*360+'deg)';

                var newpep = $('<div class="pepimg fadeupandout"></div>')
                    .css({
                        'position': 'absolute',
                        'left': e.pageX - 25 + 'px',
                        'top': e.pageY - 25 + 'px',
                        'filter': hue,
                        '-webkit-filter': hue,
                        '-moz-filter': hue,
                        '-o-filter': hue,
                        '-ms-filter': hue

                    }).appendTo(document.body);

                setTimeout(function(){ newpep.remove() }, 1450);
                bounce();
                $scope.increasePepes();
            }

            function bounce() {
                $('#tapbutton').animate({

                    'width': "-=20",
                    'height': "-=20",
                    'top': parseInt($('#tapbutton').css('top')) + 10,
                    'left': parseInt($('#tapbutton').css('left')) + 10

                }, 150);
                $('#tapbutton').animate({

                    'width': "+=30",
                    'height': "+=30",
                    'top': "-=15",
                    'left': "-=15"

                }, 150);
                $('#tapbutton').animate({

                    'width': "-=20",
                    'height': "-=20",
                    'top': parseInt($('#tapbutton').css('top')) + 5,
                    'left': parseInt($('#tapbutton').css('left')) + 5

                }, 150);
                $('#tapbutton').animate({

                    'width': "+=10",
                    'height': "+=10",
                    'top': "-=5",
                    'left': "-=5"

                }, 150);
            }

            function makeHappy() {
                sad = false;
                $('#tapbutton').addClass('sadtohappy');
                setTimeout(function(){
                    $('#tapbutton').removeClass('sad');
                }, 200);
                setTimeout(function(){
                    $('#tapbutton').addClass('happy');
                    setTimeout(function(){
                        $('#tapbutton').removeClass('sadtohappy');
                    }, 200);
                }, 1400);
            }

            function makeSad() {
                sad = true;
                $('#tapbutton').addClass('happytosad');
                setTimeout(function(){
                    $('#tapbutton').removeClass('happy');
                }, 200);
                setTimeout(function(){
                    $('#tapbutton').addClass('sad');
                    setTimeout(function(){
                        $('#tapbutton').removeClass('happytosad');
                    }, 200);
                }, 1450);
            }
        }
    }
})