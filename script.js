(function () {

    // Defino el módulo getStartedExample1
    // 
    // Es importante incluir el segundo parámetro (empty array = []),
    // porque de lo contrario no se estaría definiendo el módulo, sino
    // que sólo se estaría incluyendo una referencia
    var app = angular.module("getStartedExample1", []);

    var MainController = function ($scope, $http, $interval, $log,
            $anchorScroll, $location) {

        $scope.url = "https://jsonplaceholder.typicode.com/posts/" + $scope.postId + "/comments/";
        $scope.sortOrder = "+email";
        $scope.countdown = 5;

        var countdownInterval = null;
        // Función asociada via ng-click al submit
        // Notar que no necesito el parámetro, porque ya está en el $scope (postId)
        $scope.search = function() {
            $scope.url = "https://jsonplaceholder.typicode.com/posts/" + $scope.postId + "/comments/"
            $log.info("Searching for: " + $scope.url);
            $http.get($scope.url)
            .then(onHTTPRequestComplete, onHTTPRequestError);
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
            }
        }

        var onHTTPRequestComplete = function(response) {
            $scope.comments = response.data;
            // De forma análoga al caso de error, si el request fue exitoso tengo
            // que resetear error
            $scope.error = "";
            // Seteo la URL a la sección a la que quiero scrollear
            $location.hash("searchResults");
            // Hago que el browser scrollee al anchor recién indicado en la URL
            $anchorScroll();
        };

        var onHTTPRequestError = function(reason) {
            $scope.error = "Error accediendo al recurso REST";
            // Si no pude obtener datos, dejo en blanco para que no se muestren los
            // obtenidos en el último request válido
            $scope.comments = "";
        };

        var decrementCountdown = function() {
            $scope.countdown -= 1;
            if ($scope.countdown == 0) {
                var randomInt = Math.floor((Math.random() * 100 + 1));
                $scope.postId = randomInt;
                $scope.search();
            }
        }

        var startCountdown = function() {
            countdownInterval = $interval(decrementCountdown, 1000, 5);
        }

        $scope.message = "Json Placeholder Search";
        startCountdown();

    };

    // Registro el controller en el módulo recién creado
    app.controller("MainController", ["$scope", "$http", "$interval", "$log",
                   "$anchorScroll", "$location", MainController]);

}());
