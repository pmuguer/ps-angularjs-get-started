(function () {

    // Defino el módulo getStartedExample1
    // 
    // Es importante incluir el segundo parámetro (empty array = []),
    // porque de lo contrario no se estaría definiendo el módulo, sino
    // que sólo se estaría incluyendo una referencia
    var app = angular.module("getStartedExample1", []);

    var MainController = function ($scope, $http) {

        $scope.commentId = "1";

        var onHTTPRequestComplete = function(response) {
            $scope.comment = response.data;
        };

        var onHTTPRequestError = function(reason) {
            $scope.error = "Error accediendo al recurso REST";
        };
    
        $http.get("https://jsonplaceholder.typicode.com/comments/" + $scope.commentId)
            .then(onHTTPRequestComplete, onHTTPRequestError);

        $scope.message = "Json Placeholder Search";

    };

    // Registro el controller en el módulo recién creado
    app.controller("MainController", MainController);

}());