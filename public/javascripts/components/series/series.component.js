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
        self.error = null;
        self.next = function () {
            $('#waiting').modal('show');
            serialService.getNextSeries().then((series) => {
                $('#waiting').modal('hide');
                if(series.error) self.error = series.error;
                else {
                    self.series = series;
                    self.error = null;
                }
            });
        };
        self.changeProvider = function (provider) {
            $('#waiting').modal('show');
            serialService.getSerial(null, provider).then((series) => {
                $('#waiting').modal('hide');
                if(series.error) self.error = series.error;
                else {
                    self.series = series;
                    self.error = null;
                }
            });
        }
    }
})(window.angular);