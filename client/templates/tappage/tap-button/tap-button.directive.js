angular.module('pepeTrader.tap', [])

.directive('tapButton', function(){
    return {
        restrict: 'E',
        scope: true,
        template: '<div class="tapbutton" layout-align="center center" ng-click="tapButton()"></div>',
        controller: function($scope, $element){
            $scope.tapbutton = function(){

            }
        }
    }
})