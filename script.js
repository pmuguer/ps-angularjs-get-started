(function () {
    // Obtengo la instancia del módulo definido en app.js
    var app = angular.module("getStartedExample1");

    // MainController pasa a tener una funcionalidad más reducida.
    // Sólo se encarga de la búsqueda y de disparar la búsqueda por
    // timeout (countdown)
    var MainController = function ($scope, $interval, $location) {

        $scope.countdown = 5;

        var countdownInterval = null;
        // Función asociada via ng-click al submit
        // Notar que no necesito el parámetro, porque ya está en el $scope (postId)
        // 
        // En la parte 6 del tutorial, la llamada al servicio pasa a PostController.js
        // Lo único que hace el search es cambiar la ruta, para que el controller
        // PostController acceda al servicio en base al id provisto en la URL
        $scope.search = function() {
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
            }
            $location.path("/post/" + $scope.postId)
        }

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

        startCountdown();

    };

    // Registro el controller en el módulo
    app.controller("MainController", ["$scope", "$interval",
                   "$location", MainController]);

}());