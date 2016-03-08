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
                    localStorage.setItem("token", JSON.parse(JSON.stringify(response)));
                    userService.token = localStorage["token"];
                    localStorage.setItem("name", data.username);
                    userService.setVisitDate(data.username);
                    userService.getUserInfo(data.username);
                    $location.path("/");
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