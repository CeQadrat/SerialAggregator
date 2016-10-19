(function(angular){

    angular
        .module('app')
        .component('enterSerial',{
            controller: enterSerialCtrl,
            controllerAs: 'ctrl',
            templateUrl: '/javascripts/components/enterSerial/enterSerial.html',
            bindings:{
                series: '='
            }
        });

    function enterSerialCtrl(serialService) {
        const self = this;
        self.send = function () {
            serialService.waiting('show');
            serialService.getSerial(self.serialName, self.provider).then((series) => {
                serialService.waiting('hide');
                self.series = series;
                console.log(series);
            });
        }
    }
})(window.angular);