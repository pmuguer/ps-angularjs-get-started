(function() {

    var app = angular.module("getStartedExample1");

    var github = function($http) {

        var getUser = function(username) {
            return $http.get("https://api.github.com/search/users?q=" + username)
                .then(function(response) {
                    return response.data.items[0];
                });
        };

        var getRepos = function(username) {
            return $http.get("https://api.github.com/users/" + username + "/repos")
                .then(function(response) {
                    return response.data;
                })
        }

        return {
            getUser: getUser,
            getRepos: getRepos
        }
    }

    app.service("github", github);

}());