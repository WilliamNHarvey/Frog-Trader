angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '='
        },
        template: '<span col-sm-6>description</span><span col-sm-6>button</span>',
        controller: function($scope){

        }
    }
})