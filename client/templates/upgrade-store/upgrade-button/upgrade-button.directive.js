angular.module('pepeTrader.upgradeButton', [])

.directive('upgradeButton', function(){
    return {
        restrict: 'AE',
        scope: true,
        data: {upgrade: '='},
        template: '<div>button</div>',
        controller: function($scope, $element){

        }
    }
})