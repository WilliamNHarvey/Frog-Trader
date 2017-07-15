angular.module('pepeTrader.tap', [])

.directive('tapButton', function(){
    return {
        restrict: 'AE',
        scope: true,
        template: '<div class="tapbutton" layout-align="center center" ng-click="tapButton()"></div>',
        controller: function($scope, $element){
            $scope.tapButton = function(){
                $element.animate({

                    width: "-=10",
                    height: "+=10"

                }, 200, function() {

                    width: "+=10",
                    height: "+=10"

                });
            }
        }
    }
})