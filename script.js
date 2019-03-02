(function () {

    // Defino el módulo getStartedExample1
    // 
    // Es importante incluir el segundo parámetro (empty array = []),
    // porque de lo contrario no se estaría definiendo el módulo, sino
    // que sólo se estaría incluyendo una referencia
    var app = angular.module("getStartedExample1", []);

    var MainController = function ($scope, $http) {

        // Inicializo commentId para que al ingresar se muestre el primer comentario
        $scope.commentId = "1";

        // Función asociada via ng-click al submit
        // Notar que no necesito el parámetro, porque ya está en el $scope (commentId)
        $scope.search = function() {
            $http.get("https://jsonplaceholder.typicode.com/comments/" + $scope.commentId)
            .then(onHTTPRequestComplete, onHTTPRequestError);
        }

        var onHTTPRequestComplete = function(response) {
            $scope.comment = response.data;
            // De forma análoga al caso de error, si el request fue exitoso tengo
            // que resetear error
            $scope.error = "";
        };

        var onHTTPRequestError = function(reason) {
            $scope.error = "Error accediendo al recurso REST";
            // Si no pude obtener datos, dejo en blanco para que no se muestren los
            // obtenidos en el último request válido
            $scope.comment = "";
        };
    
        $http.get("https://jsonplaceholder.typicode.com/comments/" + $scope.commentId)
            .then(onHTTPRequestComplete, onHTTPRequestError);

        $scope.message = "Json Placeholder Search";

    };

    // Registro el controller en el módulo recién creado
    app.controller("MainController", MainController);

}());