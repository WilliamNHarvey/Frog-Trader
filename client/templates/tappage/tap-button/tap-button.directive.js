angular.module('pepeTrader.tap', [])

.directive('tapButton', function(){
    return {
        restrict: 'AE',
        scope: true,
        template: '<div id="tapbutton" class="tapbutton" layout-align="center center" ng-click="tapButton($event)"></div>',
        controller: function($scope, $element){
            var pepimg = $('<div class="pepimg fadeupandout"></div>');

            $scope.tapButton = function(e){

                $('#tapbutton').stop(true).fadeTo('fast',1);
                $('#tapbutton').css('width', '300px');
                $('#tapbutton').css('height', '300px');
                $('#tapbutton').css('top', '50%');
                $('#tapbutton').css('left', '50%');
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

                var newpep = pepimg.css({
                        "left": e.pageX + 'px',
                        "top": e.pageY + 'px'

                    })
                    .appendTo(document.body);

                console.log(newpep);
                console.log(e);

            }
        }
    }
})