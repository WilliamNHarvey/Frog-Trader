angular.module('pepeTrader.tap', [])

.directive('tapButton', function(){
    return {
        restrict: 'AE',
        scope: true,
        template: '<div id="tapbutton" class="tapbutton sad" layout-align="center center" ng-click="tapButton($event)"></div>',
        controller: function($scope, $element){
            var sad = true;
            var sadTimer;
            $scope.tapButton = function(e){

                $('#tapbutton').stop(true);
                if($('#tapbutton').width() != 300) {
                    $('#tapbutton').css('width', '300px');
                    $('#tapbutton').css('height', '300px');
                    $('#tapbutton').css('top', '50%');
                    $('#tapbutton').css('left', '50%');
                }
                clearTimeout(sadTimer);
                sadTimer = setTimeout(function(){ makeSad(); }, 5000);
                if(sad) {
                    makeHappy();
                }
                var hue = 'hue-rotate('+Math.random()*360+'deg)';

                var newpep = $('<div class="pepimg fadeupandout"></div>')
                    .css({
                        'position': 'absolute',
                        'left': e.pageX - 25 + 'px',
                        'top': e.pageY - 25 + 'px',
                        'filter': hue,
                        '-webkit-filter': hue,
                        '-moz-filter': hue,
                        '-o-filter': hue,
                        '-ms-filter': hue

                    }).appendTo(document.body);

                setTimeout(function(){ newpep.remove() }, 1450);
                bounce();
                $scope.increasePepes();
            }

            function bounce() {
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
            }

            function preload(arrayOfImages, arrayOfClasses) {
                $(arrayOfImages).each(function(){
                    $('<img/>')[0].src = this;
                    // Alternatively you could use:
                    // (new Image()).src = this;
                });
                $(arrayOfClasses).each(function(){
                    $('<img/>')[0].className = this;
                });
            }

            function makeHappy() {
                sad = false;
                $('#tapbutton').addClass('sadtohappy');
                var img = document.createElement('img');
                img.src = "https://pepetrader.herokuapp.com/img/sadtohappypepe.gif?p" + new Date().getTime();

                /* Once the image has loaded, set it as the background-image */
                $(img).on('load', function(){
                    $('#tapbutton').css({backgroundImage: "url("+img.src+")"});
                });


                //$('#tapbutton').css('background-image', "url(../img/sadtohappypepe.gif?a="+Math.random()+')');
                setTimeout(function(){
                    $('#tapbutton').removeClass('sad');
                }, 200);
                setTimeout(function(){
                    $('#tapbutton').css({backgroundImage: "none"});
                    $('#tapbutton').addClass('happy');
                    setTimeout(function(){
                        //$('#tapbutton').css('background-image', "");
                        $('#tapbutton').removeClass('sadtohappy');
                    }, 200);
                }, 1450);
            }

            function makeSad() {
                sad = true;
                $('#tapbutton').addClass('happytosad');
                var img = document.createElement('img');
                img.src = "https://pepetrader.herokuapp.com/img/happytosadpepe.gif?p" + new Date().getTime();

                /* Once the image has loaded, set it as the background-image */
                $(img).on('load', function(){
                    $('#tapbutton').css({backgroundImage: "url("+img.src+")"});
                });

                //$('#tapbutton').css('background-image', "url(../img/happytosadpepe.gif?x="+Math.random()+')');
                setTimeout(function(){
                    $('#tapbutton').removeClass('happy');
                }, 200);
                setTimeout(function(){
                    $('#tapbutton').css({backgroundImage: "none"});
                    $('#tapbutton').addClass('sad');
                    setTimeout(function(){
                        //$('#tapbutton').css('background-image', "");
                        $('#tapbutton').removeClass('happytosad');
                    }, 200);
                }, 1450);
            }
        }
    }
})