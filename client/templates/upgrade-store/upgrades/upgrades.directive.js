angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '@'
        },
        template:   '<td ng-class="\'col-md-9\'">{{description}}</td>' +
                    '<td ng-class="\'col-md-3\'"><img src="{{button}}" style="width: 59px; height: auto;"></td>',
        controller: function($scope){
            $scope.upgrade = JSON.parse($scope.upgrade);
            $scope.description = $scope.upgrade[0];
            $scope.button = '../../../img/upgrades/' + $scope.upgrade[2];
        }
    }
})