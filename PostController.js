(function () {

    var app = angular.module("getStartedExample1");

    var PostController = function ($scope, jsonPlaceholder, $routeParams) {

        $scope.sortOrder = "+email";
        // Obtengo el postId de la ruta
        $scope.postId = $routeParams.postId;
        
        var onHTTPRequestComplete = function(data) {
            $scope.comments = data;
            // De forma análoga al caso de error, si el request fue exitoso tengo
            // que resetear error
            $scope.error = "";
        };

        var onHTTPRequestError = function(reason) {
            $scope.error = "Error accediendo al recurso REST";
            // Si no pude obtener datos, dejo en blanco para que no se muestren los
            // obtenidos en el último request válido
            $scope.comments = "";
        };

        // Notar que no es necesario asociar la búsqueda mediante el servicio
        // a un evento, porque lo que dispara la búsqueda es el cambio de URL
        // y de esto se encarga MainController
        jsonPlaceholder.getComments($scope.postId)
            .then(onHTTPRequestComplete,
                  onHTTPRequestError);

    };

    // Registro el controller en el módulo recién creado
    app.controller("PostController", ["$scope", "jsonPlaceholder", "$routeParams",
                   PostController]);

}());