app.controller("homeController", function($scope, $location, $http, authenticationService)
{
    var rawToken = localStorage["token"];
    var token;
    
    if(rawToken)
    {
        token = JSON.parse(rawToken);
    }
    else
    {
        token = "Forbidden";
    }
    
    authenticationService.checkToken(token);

    $scope.logout = function()
    {
        var data =
        {
            token: token        
        };
        
        $http.post("server/logout.php", data)
        .success(function(response)
        {
            console.log(response);
            localStorage.clear();
            $location.path("/login");
        })
        .error(function(error)
        {
            console.error(error);
        });
        
        
    };
    
});

