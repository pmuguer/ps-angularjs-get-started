(function () {

    // Defino el módulo getStartedExample1
    // 
    // Es importante incluir el segundo parámetro (empty array = []),
    // porque de lo contrario no se estaría definiendo el módulo, sino
    // que sólo se estaría incluyendo una referencia
    var app = angular.module("getStartedExample1", []);

    var MainController = function ($scope) {

        $scope.message = "Hello AngularJS!";

    };

    // Registro el controller en el módulo recién creado
    app.controller("MainController", MainController);

}());