(function (angular) {
    angular
        .module('app')
        .factory('userService', ($http, $q) => {
            let factory = {};
            const self = this;
            self.user = firebase.auth().currentUser;
            console.log(self.user);
            factory.getUser = function () {
                return self.user;
            };
            factory.loginUser = function (provider) {
                return $q((resolve, reject) => {
                    let firebaseProvider;
                    switch (provider){
                        case 'facebook': {firebaseProvider = new firebase.auth.FacebookAuthProvider();break;}
                        case 'google': {firebaseProvider = new firebase.auth.GoogleAuthProvider(); break;}
                        case 'twitter': {firebaseProvider = new firebase.auth.TwitterAuthProvider(); break;}
                        case 'github': {firebaseProvider = new firebase.auth.GithubAuthProvider(); break;}
                    }
                    firebase.auth().signInWithPopup(firebaseProvider).then((result) => {
                        let token = result.credential.accessToken;
                        let user = result.user;
                        $http.get('/login', {params: {provider}}).then((res) => {
                            self.user = user;
                            resolve(self.user);
                        })
                            .catch(reject);
                    }).catch((error) => {

                    });
                });
            };
            factory.logoutUser = function () {
                return $q((resolve, reject) => {
                    firebase.auth().signOut().then(() => {
                        $http.get('/logout').then((res) => {
                            self.user = {};
                            resolve(self.user);
                        })
                            .catch(reject);
                    })
                });
            };
            return factory;
        });
})(window.angular);