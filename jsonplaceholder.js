(function() {

    var jsonPlaceholder = function ($http) {
        // Implementación del servicio

        var getComments = function (postId) {
            // Esta función sigue siendo asincrónica; devuelvo un objeto promise. Pero hay
            // que tener en cuenta lo siguiente:
            //
            // * Cuando se llama a 'getComments', esto dispara una llamada a $http.get(),
            //   (la siguiente línea).
            // * $http.get() retornará una promise
            // * Y se llamará a .then() sobre esa promise, de manera que cuando la llamada
            //   http se haya completado, se llame a la función (anónima) que recibe response
            //   y devuelve response.data
            // 
            // Lo que no es intuitivo es que cuando se devuelve algo desde una función
            // que es invocada por .then(), lo que sea que se retorne va a ser "envuelto"
            // por .then() dentro de otra promise, que es la que se devuelve al llamador
            // (en este caso, 'getComments')
            // 
            // Es decir: getComments no recibe una promise que será completada cuando 
            // la llamada HTTP se haya completado, sino una promise que representa la
            // compleción de la llamada http, MÁS la compleción de esta funcion particular
            // (en este caso, anómima) que obtiene los datos, accediendo a response.data
            return $http.get("https://jsonplaceholder.typicode.com/posts/" + 
                    postId + "/comments/")
                .then(function(response) {
                    return response.data;
                });
        }

        return {
            getComments: getComments
        };

    };

    // Notar que no se está creando un módulo; sólo se esta obteniendo
    // una referencia al módulo correspondiente a la app; por eso no se
    // agrega un segundo parámetro con una lista vacía
    var module = angular.module("getStartedExample1");
                                 
    // Registro el servicio en la app
    module.factory("jsonPlaceholder", jsonPlaceholder);

}());