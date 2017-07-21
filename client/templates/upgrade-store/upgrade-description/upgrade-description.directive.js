angular.module('pepeTrader.upgradeDescription', [])

.directive('upgradeDescription', function(){
    return {
        restrict: 'AE',
        scope: true,
        data: {upgrade: '='},
        template: '<div>description</div>',
        controller: function($scope, data){

        }
    }
})