(function(angular){

    angular
        .module('app')
        .component('auth',{
            controller: authCtrl,
            controllerAs: 'ctrl',
            templateUrl: '/javascripts/components/auth/auth.html'
        });

    function authCtrl(userService) {
        const self = this;
        self.logged = false;
        self.loginWindow = function (param) {
            if(param == 'hide') document.getElementById('loginWindow').setAttribute('style','display: none');
            if(param == 'show') document.getElementById('loginWindow').setAttribute('style','display: block');
        };
        self.logoutUser = function () {
            userService.logoutUser().then((user) => {
                self.user = user;
                self.logged = false;
            })
        };
        self.loginUser = function (provider) {
            userService.loginUser(provider).then((user) => {
                self.user = user;
                self.logged = true;
            });
        }
    }
})(window.angular);