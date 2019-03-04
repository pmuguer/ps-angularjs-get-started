(function(){
    
    var app = angular.module("getStartedExercise1");

    var RepoController = function($scope, github, $routeParams) {

        $scope.username = $routeParams.username
        $scope.reponame = $routeParams.reponame
        
        github.getRepo($scope.username, $scope.reponame)
            .then(setRepoData(repo))

        var setRepoData = function (repo) {
            $scope.repo = repo;
        };

        // Para obtener los collaborators se requiere autenticación,
        // en lugar de eso obtengo los followers
        github.getFollowers($scope.username)
            .then(setFollowersData);

        var setFollowersData = function(followers) {
            Object.keys(followers).forEach(function(follower) {
                github.getUser(follower)
                    .then(appendFollower)
            });
        };

        var appendFollower = function(follower) {
            $scope.collaborators[follower.login] = follower;
        };

    };

    app.controller("RepoController", RepoController);

}());