(function (angular) {
    angular.module('app',[]);

    let config = {
        apiKey: "AIzaSyAhakVLFaHKRDWNQjDvcUEqgzBnjgzz4YM",
        authDomain: "seagexpress.firebaseapp.com",
        databaseURL: "https://seagexpress.firebaseio.com",
        storageBucket: "seagexpress.appspot.com",
        messagingSenderId: "498080584894"
    };
    firebase.initializeApp(config);

    angular.module('app')
        .controller('MainController', mainCtrl);

    function mainCtrl() {
        const self = this;
        // self.series = {};
    }
})(window.angular);