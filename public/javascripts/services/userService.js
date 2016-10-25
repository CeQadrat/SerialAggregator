(function (angular) {
    angular
        .module('app')
        .factory('userService', ($http, $q) => {
            let factory = {};
            const self = this;
            factory.getUser = function () {
                return $q((resolve, reject) => {
                    $http.get('/currentUser').then((res) => {
                        self.user = res.data;
                        console.log(self.user);
                        resolve(self.user);
                    })
                        .catch(reject);
                });
            };
            return factory;
        });
})(window.angular);