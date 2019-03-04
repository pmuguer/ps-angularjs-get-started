(function () {
    // Obtengo la instancia del módulo definido en app.js
    var app = angular.module("getStartedExample1");

    // MainController pasa a tener una funcionalidad más reducida.
    // Sólo se encarga de la búsqueda y de disparar la búsqueda por
    // timeout (countdown)
    var MainController = function ($scope, $interval, $location) {

        $scope.countdown = 30;

        var countdownInterval = null;
        // Función asociada via ng-click al submit
        // Notar que no necesito el parámetro, porque ya está en el $scope
        // 
        // Lo único que hace el search es cambiar la ruta, para que el controller
        // UserController acceda al servicio en base al id provisto en la URL
        $scope.search = function() {
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
            }
            $location.path("/user/" + $scope.username)
        }

        var decrementCountdown = function() {
            $scope.countdown -= 1;
            if ($scope.countdown == 0) {
                $scope.username = "pepe";
                $scope.search();
            }
        }

        var startCountdown = function() {
            countdownInterval = $interval(decrementCountdown, 1000, 30);
        }

        startCountdown();

    };

    // Registro el controller en el módulo
    app.controller("MainController", ["$scope", "$interval",
                   "$location", MainController]);

}());