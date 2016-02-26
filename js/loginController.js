app.controller("loginController", function($scope, $http, $location, userService)
{
    $scope.loginResponse = "";
    $scope.registerUrl = "register";

    $scope.loginInfo = 
    {
        username: undefined,
        password: undefined
    };
    
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
                if(response.charAt(0) === "S") //If everything went fine in backend, it returns a token, token always Starts with S
                {
                    localStorage.setItem("token", JSON.stringify(response));
                    userService.username = data.username;
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