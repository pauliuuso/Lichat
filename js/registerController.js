app.controller("registerController", function($scope, $http)
{
    
    $scope.registerInfo = 
    {
        username: undefined,
        password: undefined,
        email: undefined
    };
    
    $scope.registerUser = function()
    {
        var data = 
        {
            username: $scope.registerInfo.username,
            password: $scope.registerInfo.password,
            email: $scope.registerInfo.email
        };
        
        $http.post("server/register.php", data)
        .success(function(response)
        {
            console.log(response);
        });
        error(function(error)
        {
            console.error(error);
        });
        
    };

});