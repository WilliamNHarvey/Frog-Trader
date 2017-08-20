angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '@'
        },
        template:   '<td ng-class="" class="upgrade-description-td">' +
                        '<span class="upgrade-name">{{name}}</span>' +
                        '<br/>' +
                        '<span class="upgrade-description">{{description}}</span>' +
                    '</td>' +
                    '<td style="" class="upgrade-button-td" ng-click="tapUpgrade($event)"><span class="cost">{{displayCost}}</span><img src="{{button}}" class="upgrade-button" ng-class="{disabled: disabled}"></td>',
        controller: function($scope, PepesService, $rootScope){
            $scope.upgrade = JSON.parse($scope.upgrade);
            $scope.name = $scope.upgrade[0];
            $scope.description = $scope.upgrade[1];
            $scope.button = '../../../img/upgrades/' + $scope.upgrade[2];
            $scope.cost = $scope.upgrade[3];
            $scope.displayCost = $rootScope.parsePepes($scope.cost);

            $scope.disabled = PepesService.getPepes() < $scope.cost;
            setInterval(function(){
                $scope.disabled = PepesService.getPepes() < $scope.cost;
            }, 2000);

            $scope.tapUpgrade = function(e){

            }
        }
    }
})