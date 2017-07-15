angular.module('pepeTrader.tap', [])

.directive('tapButton', function(){
    return {
        restrict: 'AE',
        scope: true,
        template: '<div class="tapbutton" layout-align="center center" ng-click="tapButton()"></div>',
        controller: function($scope, $element){
            $scope.tapButton = function(){
                $('.red').animate({
                    'width': "-=50",
                    'height': "-=50" }, 2000);
                $('.tapbutton').animate({

                    'width': "-=50",
                    'height': "-=50"

                }, 200);
                $('.tapbutton').animate({

                    'width': "+=50",
                    'height': "+=50"

                }, 200);
            }
        }
    }
})