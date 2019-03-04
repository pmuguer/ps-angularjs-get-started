(function(){
    
    var app = angular.module("getStartedExample1");

    var RepoController = function($scope, github, $routeParams) {

        $scope.username = $routeParams.username;
        $scope.reponame = $routeParams.reponame;
        $scope.collaborators = {};
        $scope.error = "";
        
        var setRepoData = function(repo) {
            $scope.repo = repo;
        };

        var onHTTPRequestError = function(reason) {
            $scope.error = "Error accediendo al recurso REST";
            // Si no pude obtener datos, dejo en blanco para que no se muestren los
            // obtenidos en el último request válido
            $scope.user = "";
        };

        var setFollowersData = function(followers) {
            $scope.followers = followers;
            Object.keys(followers).forEach(function(follower) {
                github.getUser(follower)
                    .then(appendFollower, onHTTPRequestError)
            });
        };

        var appendFollower = function(follower) {
            $scope.collaborators[follower.login] = follower;
        };

        github.getRepo($scope.username, $scope.reponame)
            .then(setRepoData, onHTTPRequestError);

        // Para obtener los collaborators se requiere autenticación,
        // en lugar de eso obtengo los followers
        github.getFollowers($scope.username)
            .then(setFollowersData, onHTTPRequestError);

    };

    app.controller("RepoController", RepoController);

}());