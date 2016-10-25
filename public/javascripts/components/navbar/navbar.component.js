(function(angular){

    angular
        .module('app')
        .component('navbar',{
            controller: navbarCtrl,
            controllerAs: 'ctrl',
            templateUrl: '/javascripts/components/navbar/navbar.html'
        });

    function navbarCtrl(userService) {
        const self = this;
        $('#waiting').modal('show');
        userService.getUser().then((user) => {
            $('#waiting').modal('hide');
            self.user = user;
        }).catch(console.log);
    }
})(window.angular);