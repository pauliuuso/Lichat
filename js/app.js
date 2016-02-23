var app = angular.module("Lichat", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider)
{

    $routeProvider
            .when("/", 
            {
                restrict: "E",
                transclude: true,
                url: "/",
                controller: "loginController",
                templateUrl: "templates/login.html"
            })
            .when("/register",
            {
                restrict: "E",
                transclude: true,
                url: "/",
                controller: "registerController",
                templateUrl: "templates/register.html"
            });
    
    //set true to remove # tag from url
    $locationProvider.html5Mode(false);
});