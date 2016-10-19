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
            console.log('click');
            serialService.waiting('show');
            serialService.getNextSeries().then((series) => {
                serialService.waiting('hide');
                self.series = series;
                console.log(series);
            });
        };
        self.changeProvider = function (provider) {
            serialService.waiting('show');
            serialService.getSerial(null, provider).then((series) => {
                serialService.waiting('hide');
                self.series = series;
                console.log(series);
            });
        }
    }
})(window.angular);