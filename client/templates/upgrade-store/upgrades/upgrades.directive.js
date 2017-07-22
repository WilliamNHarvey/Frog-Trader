angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '='
        },
        template: '<div col-sm-6>description</div><div col-sm-6>button</div>',
        controller: function($scope, scope){

        }
    }
})