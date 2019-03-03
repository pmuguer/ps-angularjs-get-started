(function(){

    // Se pasa la definición del módulo de script.js a este archivo.
    var app = angular.module("getStartedExample1", ["ngRoute"]);

    app.config(function($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainController"
            })
            .otherwise({redirectTo: "/main"});
    });

}());