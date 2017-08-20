angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '='
        },
        template:   '<td class="col-md-9">{{upgrade}}</td>' +
                    '<td class="col-md-3">{{upgrade}}</td>',
        controller: function($scope){
            console.log($scope.upgrade);
        }
    }
})