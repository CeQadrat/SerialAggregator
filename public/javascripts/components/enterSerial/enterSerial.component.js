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
            $('#waiting').modal('show');
            serialService.getSerial(self.serialName, self.provider).then((series) => {
                $('#waiting').modal('hide');
                self.series = series;
            });
        }
    }
})(window.angular);