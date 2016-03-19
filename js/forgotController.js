app.controller("forgotController", function($scope, $http)
{
    $scope.loginUrl = "login";
    $scope.reseted = false;
    $scope.forgotShow = true;
    $scope.username;
    $scope.email;
    $scope.forgotResponse = "";
    
    $scope.resetPassword = function()
    {
        var data = {username: $scope.username, email: $scope.email};
        
        $http.post("server/forgotLogin.php", data)
        .success(function(response)
        {
            if(response)
            {
                $scope.reseted = true;
                $scope.forgotShow = false;
            }
            else
            {
                $scope.forgotResponse = "Could not find this user or email";
            }
        });
    };

});