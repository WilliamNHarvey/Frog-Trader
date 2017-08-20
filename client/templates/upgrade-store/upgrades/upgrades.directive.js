angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '='
        },
        template:   '<td class="col-md-9">description</td>' +
                    '<td class="col-md-3">button</td>',
        controller: function($scope){
            console.log($scope.upgrade);
        }
    }
})