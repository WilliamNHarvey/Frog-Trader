angular.module('pepeTrader.slotMachine', [])

.directive('slotMachine', function(){
    return {
        restrict: 'AE',
        template: '<div id="randomize">'+
        '    <div class="content container" style="text-align: center;max-width: 900px;">'+
            '        <h1>Meme Machine</h1>'+
        ''+
        '        <div class="row">'+
        '            <div class="col-xs-4">'+
        '                <div>'+
        '                    <div id="machine1" class="randomizeMachine">'+
        '                        <div><img src="../../../img/pepe.png" /></div>'+
        '                        <div><img src="../../../img/sadpepe.png" /></div>'+
        '                        <div><img src="../../../img/veryhappypepe.png" /></div>'+
        '                        <div><img src="../../../img/mad.png" /></div>'+
        '                        <div><img src="../../../img/minion-pepe.png" /></div>'+
        '                        <div><img src="../../../img/sonicpepe.png" /></div>'+
        '                    </div>'+
        '                </div>'+
        '            </div>'+
        ''+
        '            <div class="col-xs-4">'+
        '                <div>'+
        '                    <div id="machine2" class="randomizeMachine">'+
        '                        <div><img src="../../../img/pepe.png" /></div>'+
        '                        <div><img src="../../../img/sadpepe.png" /></div>'+
        '                        <div><img src="../../../img/veryhappypepe.png" /></div>'+
        '                        <div><img src="../../../img/mad.png" /></div>'+
        '                        <div><img src="../../../img/minion-pepe.png" /></div>'+
        '                        <div><img src="../../../img/sonicpepe.png" /></div>'+
        '                    </div>'+
        '                </div>'+
        '            </div>'+
        ''+
        '            <div class="col-xs-4">'+
        '                <div>'+
        '                    <div id="machine3" class="randomizeMachine">'+
        '                        <div><img src="../../../img/pepe.png" /></div>'+
        '                        <div><img src="../../../img/sadpepe.png" /></div>'+
        '                        <div><img src="../../../img/veryhappypepe.png" /></div>'+
        '                        <div><img src="../../../img/mad.png" /></div>'+
        '                        <div><img src="../../../img/minion-pepe.png" /></div>'+
        '                        <div><img src="../../../img/sonicpepe.png" /></div>'+
        '                    </div>'+
        '                </div>'+
        '                <!--<div id="machine1Result" class="col-xs-4 machineResult">Index: 0</div>'+
        '                <div id="machine2Result" class="col-xs-4 machineResult">Index: 1</div>'+
        '                <div id="machine3Result" class="col-xs-4 machineResult">Index: 2</div>-->'+
        '            </div>'+
        '        </div>'+
        ''+
        '        <div>'+
        '            <div class="btn-group btn-group-justified btn-group-randomize" role="group">'+
        '                <div id="randomizeButton" type="button" class="btn btn-danger btn-lg">Shuffle</div>'+
        '            </div>'+
        '        </div>'+
        '    </div>'+
        '</div>',
        controller: function($scope, PepesService, $rootScope){
            $(document).ready(function(){
                var machine1 = $("#machine1").slotMachine({
                    active	: 0,
                    delay	: 500
                });
                var machine2 = $("#machine2").slotMachine({
                    active	: 0,
                    delay	: 500,
                    direction: 'down'
                });
                var machine3 = $("#machine3").slotMachine({
                    active	: 0,
                    delay	: 500
                });
                function onComplete(active){
                    switch(this.element[0].id){
                        case 'machine1':
                            console.log(this.active);
                            $("#machine1Result").text("Index: "+this.active);
                            break;
                        case 'machine2':
                            console.log(this.active);
                            $("#machine2Result").text("Index: "+this.active);
                            break;
                        case 'machine3':
                            console.log(this.active);
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