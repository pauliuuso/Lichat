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
                var rawToken = localStorage["token"];
                var token;
                
                if(rawToken)
                {
                    token = JSON.parse(localStorage["token"]);
                    checkToken();
                }
                else
                {
                    $location.path("/login"); //If rawToken is false, it probably means that someone is messing with it.
                }
                
                function checkToken()
                {
                    var data = {token: token};
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
        },
        transclude: true,
        controller: "homeController",
        templateUrl: "templates/home.html"
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

    
    //set true to remove # tag from url
    $locationProvider.html5Mode(false);
});