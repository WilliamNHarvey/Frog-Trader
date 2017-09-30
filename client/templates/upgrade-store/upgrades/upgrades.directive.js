angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '@',
            showSuccessAlert: '=',
            successTextAlert: '='
        },
        template:   '<td style="" class="upgrade-image-td">' +
                        //'<span class="cost pointer-none">{{displayCost}}</span>' +
                        '<img src="{{button}}" class="upgrade-image" ng-class="{disabled: disabled}">' +
                    '</td>' +
                    '<td ng-class="" class="upgrade-description-td">' +
                        '<span class="upgrade-name">{{name}}</span>' +
                        '<br/>' +
                        '<span class="upgrade-description">{{description}}</span>' +
                    '</td>' +
                    '<td class="upgrade-purchase-td">' +
                        '<span class="cost pointer-none">{{displayCost}}</span>' +
                        '<img src="../../../img/purchase.png" ng-click="tapUpgrade($event)" class="upgrade-purchase" ng-class="{disabled: disabled}">' +
                    '</td>',
        controller: function($scope, PepesService, $rootScope){
            $scope.upgrade = JSON.parse($scope.upgrade);
            $scope.name = $scope.upgrade[0];
            $scope.description = $scope.upgrade[1];
            $scope.button = '../../../img/upgrades/' + $scope.upgrade[2];
            $scope.cost = $scope.upgrade[3];
            $scope.success = $scope.upgrade[4];
            if($scope.success) $scope.successMessage = $scope.upgrade[5];
            $scope.displayCost = $rootScope.parsePepes($scope.cost);

            $scope.disabled = PepesService.getPepes() < $scope.cost;
            setInterval(function(){
                $scope.disabled = PepesService.getPepes() < $scope.cost;
            }, 2000);

            $scope.tapUpgrade = function(e){
                if($scope.disabled) return;

                if($scope.success) {
                    $rootScope.successTextAlert = $scope.successMessage;
                    $rootScope.showSuccessAlert = true;
                }
            }
        }
    }
});