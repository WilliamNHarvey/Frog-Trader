angular.module('pepeTrader.tap', [])

.directive('tapButton', function(){
    return {
        restrict: 'AE',
        scope: true,
        template: '<div id="tapbutton" class="tapbutton" layout-align="center center" ng-click="tapButton()"></div>',
        controller: function($scope, $element){
            $scope.transforming = false;
            $scope.tapButton = function(){


                //$('#tapbutton').stop(true).fadeTo('fast',1);
                /*$('#tapbutton').css('width', '300px');
                $('#tapbutton').css('height', '300px');
                $('#tapbutton').css('top', '50%');
                $('#tapbutton').css('left', '50%');*/
                if(!$scope.transforming) {
                    $scope.transforming = true;
                    $('#tapbutton').animate({

                        'width': "-=20",
                        'height': "-=20",
                        'top': parseInt($('#tapbutton').css('top')) + 10,
                        'left': parseInt($('#tapbutton').css('left')) + 10

                    }, 150);
                    $('#tapbutton').animate({

                        'width': "+=30",
                        'height': "+=30",
                        'top': "-=15",
                        'left': "-=15"

                    }, 150);
                    $('#tapbutton').animate({

                        'width': "-=20",
                        'height': "-=20",
                        'top': parseInt($('#tapbutton').css('top')) + 5,
                        'left': parseInt($('#tapbutton').css('left')) + 5

                    }, 150);
                    $('#tapbutton').animate({

                        'width': "+=10",
                        'height': "+=10",
                        'top': "-=5",
                        'left': "-=5"

                    }, 150);
                    $scope.transforming = false;
                }

            }
        }
    }
})