angular.module('pepeTrader.tap', [])

.directive('tapButton', function(){
    return {
        restrict: 'AE',
        scope: true,
        template: '<div id="tapbutton" class="tapbutton" layout-align="center center" ng-click="tapButton()"></div>',
        controller: function($scope, $element){
            $scope.tapButton = function(){
                $('#tapbutton').stop(true).fadeTo('fast',1);
                $('#tapbutton').animate({

                    'width': "-=20",
                    'height': "-=20",
                    'top': parseInt($('#tapbutton').css('top')) + 10,
                    'left': parseInt($('#tapbutton').css('left')) + 10

                }, 200);
                $('#tapbutton').animate({

                    'width': "+=30",
                    'height': "+=30",
                    'top': -=30/2,
                    'left': -=30/2

                }, 200);
                $('#tapbutton').animate({

                    'width': "-=20",
                    'height': "-=20",
                    'top': parseInt($('#tapbutton').css('top')) + 10,
                    'left': parseInt($('#tapbutton').css('left')) + 10

                }, 200);
                $('#tapbutton').animate({

                    'width': "+=10",
                    'height': "+=10",
                    'top': -=10/2,
                    'left': -=5/2

                }, 200);
            }
        }
    }
})