(function (angular) {
    angular
        .module('app')
        .factory('serialService', ($http, $q) => {
            let factory = {};
            let serialName;
            const self = this;
            const generator = 'generator' + Math.random() * 1000;
            factory.getSeries = function () {
                return Promise.resolve(self.series);
            };
            factory.getSerial = function (name, provider) {
                if (name) serialName = name;
                return $q((resolve, reject) => {
                    $http.get('/getSeries', {params: {serialName, provider, generator}}).then((res) => {
                        resolve(res.data);
                    })
                        .catch(reject);
                });
            };
            factory.getNextSeries = function () {
                return $q((resolve, reject) => {
                    $http.get('/getSeries/next', {params: {generator}}).then((res) => {
                        resolve(res.data);
                    })
                        .catch(reject);
                });
            };
            factory.waiting = function (param) {
                if (param == 'show') document.getElementById('waiting').setAttribute('class', '');
                if (param == 'hide') document.getElementById('waiting').setAttribute('class', 'ng-hide');
            };
            return factory;
        });
})(window.angular);