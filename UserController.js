(function () {

    var app = angular.module("getStartedExample1");

    var UserController = function ($scope, github, $routeParams) {

        //$scope.sortOrder = "+email";
        $scope.username = $routeParams.username;
        
        var onHTTPUserRequestComplete = function(data) {
            $scope.user = data;
            // De forma análoga al caso de error, si el request fue exitoso tengo
            // que resetear error
            $scope.error = "";
            // Notar que sólo se buscan los datos de los repos si fue exitoso el
            // request por los datos del usuario.
            // Es decir, si se completó el request 1, se dispara el request 2,
            // y se asocia el callback onHTTPReposRequestComplete, para cargar los
            // datos de los repos en el scope
            github.getRepos($scope.username)
                .then(onHTTPReposRequestComplete,
                      onHTTPRequestError);
        };

        var onHTTPReposRequestComplete = function(data) {
            $scope.repos = data;
            $scope.error = ""
        }

        // Notar que uso el mismo callback de error para la obtencion
        // de los datos del usuario y los datos de los repos
        var onHTTPRequestError = function(reason) {
            $scope.error = "Error accediendo al recurso REST";
            // Si no pude obtener datos, dejo en blanco para que no se muestren los
            // obtenidos en el último request válido
            $scope.user = "";
        };

        // Notar que no es necesario asociar la búsqueda mediante el servicio
        // a un evento, porque lo que dispara la búsqueda es el cambio de URL
        // y de esto se encarga MainController
        github.getUser($scope.username)
            .then(onHTTPUserRequestComplete,
                  onHTTPRequestError);

    };

    // Registro el controller en el módulo recién creado
    app.controller("UserController", ["$scope", "github", "$routeParams",
                   UserController]);

}());