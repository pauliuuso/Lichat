var app = angular.module("Lichat", ["ngRoute", "ngSanitize"]);

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
    .when("/theme", 
    {
        resolve:
        {
            "check": function($location, $http)
            {
                checkToken($location, $http);
            }
        },
        transclude: true,
        controller: "themeController",
        templateUrl: "templates/theme.html"
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
    .when("/privileges",
    {
        resolve:
        {
            "check": function($location, $http)
            {
                checkToken($location, $http);
            }
        },
        transclude: true,
        controller: "privilegesController",
        templateUrl: "templates/privileges.html"
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
    .when("/forgot",
    {
        transclude: true,
        controller: "forgotController",
        templateUrl: "templates/forgot.html"
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
            token = rawToken;
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

app.directive("levels", function() // This is directive displays welcome user and logout function
{
    return{
        restrict: "E",
        transclude: true,
        templateUrl: "templates/levels.html",
        controller: "levelsController"
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

app.directive("addtheme", function()
{
    return{
        restrict: "E",
        transclude: true,
        templateUrl: "templates/addTheme.html",
        controller: "addThemeController"
    };
});

app.directive("edittheme", function()
{
    return{
        restrict: "E",
        transclude: true,
        templateUrl: "templates/editTheme.html",
        controller: "editThemeController"
    };
});

app.directive("onRepeatFinish", function() //This is used to create even on ng-repeat finish
{
    return function($scope)
    {
        if($scope.$last)
        {
            $scope.$emit("lastElement");
        }
    };
});