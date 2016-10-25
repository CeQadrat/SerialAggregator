(function(angular){

    angular
        .module('app')
        .component('series',{
            controller: seriesController,
            controllerAs: 'ctrl',
            templateUrl: '/javascripts/components/series/series.html',
            bindings:{
                series: '='
            }
        });

    function seriesController(serialService) {
        const self = this;
        self.next = function () {
            $('#waiting').modal('show');
            serialService.getNextSeries().then((series) => {
                $('#waiting').modal('hide');
                self.series = series;
            });
        };
        self.changeProvider = function (provider) {
            $('#waiting').modal('show');
            serialService.getSerial(null, provider).then((series) => {
                $('#waiting').modal('hide');
                self.series = series;
            });
        }
    }
})(window.angular);