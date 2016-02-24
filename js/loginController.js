app.controller("loginController", function($scope, $http)
{

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
                    //login user
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