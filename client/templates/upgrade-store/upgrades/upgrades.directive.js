angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '='
        },
        template:   '<td class="col-md-9">{{upgrade[0]}}</td>' +
                    '<td class="col-md-3">{{upgrade[2]}}</td>',
        controller: function($scope){

        }
    }
})