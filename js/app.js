var app = angular.module("Lichat", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider)
{

    $routeProvider
            .when("/", 
            {
                restrict: "E",
                transclude: true,
                controller: "homeController",
                template: "templates/home.html"
            })
            .when("/home", 
            {
                restrict: "E",
                transclude: true,
                controller: "homeController",
                templateUrl: "templates/home.html"
            })
            .when("/register",
            {
                restrict: "E",
                transclude: true,
                controller: "registerController",
                templateUrl: "templates/register.html"
            })
            .when("/login",
            {
                restrict: "E",
                transclude: true,
                controller: "loginController",
                templateUrl: "templates/login.html"
            });
    
    //set true to remove # tag from url
    $locationProvider.html5Mode(false);
});