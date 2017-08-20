angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '@'
        },
        template:   '<td ng-class="\'col-md-10\'" class="upgrade-description-td">' +
                        '<span class="upgrade-name">{{name}}</span>' +
                        '<span class="upgrade-description">{{description}}</span>' +
                    '</td>' +
                    '<td ng-class="\'col-md-2\'" class="upgrade-button-td"><img src="{{button}}" class="upgrade-button"></td>',
        controller: function($scope){
            $scope.upgrade = JSON.parse($scope.upgrade);
            $scope.name = $scope.upgrade[0];
            $scope.description = $scope.upgrade[1];
            $scope.button = '../../../img/upgrades/' + $scope.upgrade[2];
        }
    }
})