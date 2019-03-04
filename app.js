(function(){

    // Se pasa la definición del módulo de script.js a este archivo.
    var app = angular.module("getStartedExample1", ["ngRoute"]);

    app.config(function($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainController"
            })
            .when("/user/:username", {
                templateUrl: "user.html",
                controller: "UserController"
            })
            .when("/repo/:username/:reponame", {
                templateUrl: "repo.html",
                controller: "RepoController"
            })            
            .otherwise({redirectTo: "/main"});
    });

    app.config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist(['**']);
    });

}());