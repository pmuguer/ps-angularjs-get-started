(function () {

    // Defino el módulo getStartedExample1
    // 
    // Es importante incluir el segundo parámetro (empty array = []),
    // porque de lo contrario no se estaría definiendo el módulo, sino
    // que sólo se estaría incluyendo una referencia
    var app = angular.module("getStartedExample1", []);

    var person = {
        firstName: "Juan Domingo",
        lastName: "Perón",
        imgSrc: "https://lamarcaeditora.com/admin/files/libros/1028/978-950-889-136-5.jpg"
    };

    var MainController = function ($scope) {

        $scope.message = "Hello AngularJS!";
        $scope.person = person;

    };

    // Registro el controller en el módulo recién creado
    app.controller("MainController", MainController);

}());