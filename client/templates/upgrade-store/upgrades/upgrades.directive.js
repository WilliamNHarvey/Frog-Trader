angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '='
        },
        template: '<table class="table table-striped"><tbody><tr><td>description</td><td>button</td></tr><tr><td>description</td><td>button</td></tr><tr><td>description</td><td>button</td></tr></tbody></table>',
        controller: function($scope){

        }
    }
})