app.controller("registerController", function($scope, $http)
{
    $scope.loginUrl = "login";
    $scope.registered = false;
    $scope.registerShow = true;
    $scope.registerInfo = 
    {
        username: undefined,
        password: undefined,
        email: undefined
    };
    
    $scope.registerResponse = "";
    
    $scope.registerUser = function()
    {
        var data = 
        {
            username: $scope.registerInfo.username,
            password: $scope.registerInfo.password,
            email: $scope.registerInfo.email
        };
        
        if(data.username !== undefined && data.password !== undefined && data.email !== undefined)
        {
            $http.post("server/register.php", data)
            .success(function(response)
            {
                if(response === "created")
                {
                    $scope.registerShow = false;
                    $scope.registered = true;
                    //Redirect to user created
                }
                else
                {
                    $scope.registerResponse = response;
                }
            })
            .error(function(error)
            {
                console.error(error);
            });
        }
        
    };

});