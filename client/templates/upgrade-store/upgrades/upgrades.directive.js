angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '@'
        },
        template:   '<td ng-class="\'col-md-10\'" class="upgrade-description-td">{{description}}</td>' +
                    '<td ng-class="\'col-md-2\'" class="upgrade-button-td"><img src="{{button}}" class="upgrade-button"></td>',
        controller: function($scope){
            $scope.upgrade = JSON.parse($scope.upgrade);
            $scope.description = $scope.upgrade[0];
            $scope.button = '../../../img/upgrades/' + $scope.upgrade[2];
        }
    }
})