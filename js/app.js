var app = angular.module("Lichat", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider)
{

    $routeProvider
    .when("/", 
    {
        resolve:
        {
            "check": function($location, $http)
            {
                checkToken($location, $http);
            }
        },
        transclude: true,
        controller: "homeController",
        templateUrl: "templates/home.html"
    })
    .when("/user",
    {
        resolve:
        {
            "check": function($location, $http)
            {
                checkToken($location, $http);
            }
        },
        transclude: true,
        controller: "userController",
        templateUrl: "templates/user.html"
    })
    .when("/allusers",
    {
        resolve:
        {
            "check": function($location, $http)
            {
                checkToken($location, $http);
            }
        },
        transclude: true,
        controller: "allusersController",
        templateUrl: "templates/allUsers.html"
    })
    .when("/register",
    {
        transclude: true,
        controller: "registerController",
        templateUrl: "templates/register.html"
    })
    .when("/login",
    {
        transclude: true,
        controller: "loginController",
        templateUrl: "templates/login.html"
    })
    .otherwise
    ({
        redirectTo: "/"
    });
    
    function checkToken($location, $http) // This function checks if token is correct
    {
        var rawToken = localStorage["token"];
        var username = localStorage["name"];
        var token;

        if(rawToken)
        {
            token = JSON.parse(localStorage["token"]);
            checkTokenServer($location, $http);
        }
        else
        {
            $location.path("/login"); //If rawToken is false, it probably means that someone is messing with it.
        }

        function checkTokenServer($location, $http)
        {
            var data = {token: token, user: username};
            $http.post("server/checkToken.php", data)
            .success(function(response)
            {
                if (response === "okay")
                {

                }
                else
                {
                    $location.path("/login");
                }
            })
            .error(function(error)
            {
                console.error(error);
                $location.path("/login");
            });
        }
    }

    
    //set true to remove # tag from url
    $locationProvider.html5Mode(false);
});

app.directive("welcome", function() // This is directive displays welcome user and logout function
{
    return{
        restrict: "E",
        transclude: true,
        templateUrl: "templates/welcome.html",
        controller: "welcomeController"
    };
});

app.directive("back", function() // Displays back button
{
    return{
        restrict: "E",
        transclude: true,
        templateUrl: "templates/back.html",
        controller: "backController"
    };
});

app.directive("changepassword", function()
{
    return{
        restrict: "E",
        transclude: true,
        templateUrl: "templates/changePassword.html",
        controller: "passwordController"
    };
});

app.directive("changepicture", function()
{
    return{
        restrict: "E",
        transclude: true,
        templateUrl: "templates/changePicture.html",
        controller: "pictureController"
    };
});