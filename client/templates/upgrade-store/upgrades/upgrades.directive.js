angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        data: {upgrade: '='},
        template: '<div col-sm-6>description</div><div col-sm-6>button</div>',
        controller: function($scope, data){

        }
    }
})