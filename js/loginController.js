app.controller("loginController", function($scope, $http, $location)
{
    
    if(localStorage["username"] !== undefined)
    {
        $location.path("/home");
    }

    $scope.loginInfo = 
    {
        username: undefined,
        password: undefined
    };
    
    $scope.loginResponse = "";
    
    $scope.loginUser = function()
    {
        var data = 
        {
            username: $scope.loginInfo.username,
            password: $scope.loginInfo.password
        };
        
        if(data.username !== undefined && data.password !== undefined)
        {
            $http.post("server/login.php", data)
            .success(function(response)
            {
                if(response === "login")
                {
                    localStorage.setItem("username", JSON.stringify({user: data.username}));
                    $location.path("/home");
                }
                else
                {
                    $scope.loginResponse = response;
                }
            })
            .error(function(error)
            {
                console.error(error);
            });
        }
        
    };

});