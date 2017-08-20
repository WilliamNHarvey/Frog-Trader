angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '='
        },
        template:   '<td class="col-md-9">{{description}}</td>' +
                    '<td class="col-md-3">{{button}}</td>',
        controller: function($scope){
            $scope.upgrade = JSON.parse($scope.upgrade);
            console.log($scope.upgrade);
            $scope.description = $scope.upgrade[0];
            $scope.button = $scope.upgrade[2];
        }
    }
})