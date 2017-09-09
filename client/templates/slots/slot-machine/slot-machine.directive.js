angular.module('pepeTrader.slot-machine', [])

.directive('slot-machine', function(){
    return {
        restrict: 'AE',
        scope: {

        },
        templateUrl: 'slots-template.html',
        controller: function($scope, PepesService, $rootScope){
            $(document).ready(function(){
                var machine1 = $("#machine1").slotMachine({
                    active	: 0,
                    delay	: 500
                });
                var machine2 = $("#machine2").slotMachine({
                    active	: 1,
                    delay	: 500,
                    direction: 'down'
                });
                var machine3 = $("#machine3").slotMachine({
                    active	: 2,
                    delay	: 500
                });
                function onComplete(active){
                    switch(this.element[0].id){
                        case 'machine1':
                            $("#machine1Result").text("Index: "+this.active);
                            break;
                        case 'machine2':
                            $("#machine2Result").text("Index: "+this.active);
                            break;
                        case 'machine3':
                            $("#machine3Result").text("Index: "+this.active);
                            break;
                    }
                }
                $("#randomizeButton").click(function(){
                    machine1.shuffle(5, onComplete);
                    setTimeout(function(){
                        machine2.shuffle(5, onComplete);
                    }, 500);
                    setTimeout(function(){
                        machine3.shuffle(5, onComplete);
                    }, 1000);
                })
            });
        }
    }
})