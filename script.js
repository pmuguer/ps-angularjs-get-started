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
        $scope.search = function() {
            jsonPlaceholder.getComments($scope.postId)
                .then(onHTTPRequestComplete, onHTTPRequestError);
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
            }
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

    // Registro el controller en el módulo recién creado
    app.controller("MainController", ["$scope", "$interval",
                   "$location", MainController]);

}());