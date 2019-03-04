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
                });
        }

        var getRepo = function(username, reponame) {
            return $http.get("https://api.github.com/repos/" +
                    username + "/" + reponame)
                .then(function(response){
                    return response.data;
                });
        }

        var getFollowers = function(username) {
            return $http.get("https://api.github.com/users/" +
                    username + "/followers")
                .then(function(response){
                    return response.data;
                });
        }

        //https://api.github.com/repos/pmuguer/ps-angularjs-get-started/collaborators/

        //https://api.github.com/repos/encode/django-rest-framework/collaborators/


        return {
            getUser: getUser,
            getRepos: getRepos,
            getRepo: getRepo,
            getFollowers: getFollowers
        };
    }

    app.service("github", github);

}());