angular.module('pepeTrader.upgrades', [])

.directive('upgrades', function(){
    return {
        restrict: 'AE',
        scope: {
            upgrade: '='
        },
        template:   '<table class="table table-striped">' +
                        '<tbody>' +
                            '<tr>' +
                                '<td class="col-md-9">description</td>' +
                                '<td class="col-md-3">button</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="col-md-9">description</td>' +
                                '<td class="col-md-3">button</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="col-md-9">description</td>' +
                                '<td class="col-md-3">button</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="col-md-9">description</td>' +
                                '<td class="col-md-3">button</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="col-md-9">description</td>' +
                                '<td class="col-md-3">button</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="col-md-9">description</td>' +
                                '<td class="col-md-3">button</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="col-md-9">description</td>' +
                                '<td class="col-md-3">button</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="col-md-9">description</td>' +
                                '<td class="col-md-3">button</td>' +
                            '</tr>' +
                        '</tbody>' +
                    '</table>',
        controller: function($scope){

        }
    }
})