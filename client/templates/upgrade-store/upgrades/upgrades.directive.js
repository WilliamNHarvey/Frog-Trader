angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '='
        },
        template:   '<td class="col-md-9">{{upgrade["name"]}}</td>' +
                    '<td class="col-md-3">{{upgrade["button"]}}</td>',
        controller: function($scope){

        }
    }
})