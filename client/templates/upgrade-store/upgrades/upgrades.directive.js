angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '@'
        },
        template:   '<td ng-class="\'col-md-10\'" class="upgrade-description-td">' +
                        '<span class="upgrade-name">{{name}}</span>' +
                        '<br/>' +
                        '<span class="upgrade-description">{{description}}</span>' +
                    '</td>' +
                    '<td ng-class="\'col-md-2\', \'disabled\' : disabled" class="upgrade-button-td" ng-click="tapUpgrade($event)"><img src="{{button}}" class="upgrade-button"></td>',
        controller: function($scope, PepesService){
            $scope.upgrade = JSON.parse($scope.upgrade);
            $scope.name = $scope.upgrade[0];
            $scope.description = $scope.upgrade[1];
            $scope.button = '../../../img/upgrades/' + $scope.upgrade[2];
            $scope.cost = $scope.upgrade[3];

            //$scope.pepes = PepesService.getPepes();

            $scope.disabled = setInterval(PepesService.getPepes() < $scope.cost, 2000);

            $scope.tapUpgrade = function(e){

            }
        }
    }
})