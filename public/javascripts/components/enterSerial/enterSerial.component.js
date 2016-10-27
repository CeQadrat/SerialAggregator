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
        self.error = null;
        self.send = function () {
            $('#waiting').modal('show');
            serialService.getSerial(self.serialName, self.provider).then((series) => {
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