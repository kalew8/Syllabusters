
angular.module("scotchApp")

    .service("httpService", ["$http", function ($http) {

        var url = "/";


        this.addUser = function (user) {
            return $http.post(url, user)
        };
        this.showUser = function () {
            return $http.get(url)
        };
        this.removeUser = function (id) {
            return $http.delete(url + "/" + id)
        }

    }]);
