(function (angular) {
    angular
        .module('app')
        .factory('serialService', ($http, $q) => {
            let factory = {};
            let serialName;
            const self = this;
            factory.getSeries = function () {
                return Promise.resolve(self.series);
            };
            factory.getSerial = function (name, provider) {
                if (name) serialName = name;
                return $q((resolve, reject) => {
                    $http.get('/getSeries', {params: {serialName, provider}}).then((res) => {
                        resolve(res.data);
                    })
                        .catch(reject);
                });
            };
            factory.getNextSeries = function () {
                return $q((resolve, reject) => {
                    $http.get('/getSeries/next').then((res) => {
                        resolve(res.data);
                    })
                        .catch(reject);
                });
            };
            return factory;
        });
})(window.angular);