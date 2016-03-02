app.controller("passwordController", function($scope, $http, userService)
{
    $scope.changeResponse = "";
    $scope.newPassword;
    $scope.newPassword2;
    $scope.currentUser = userService.currentUser;
    
    $scope.changePassword = function()
    {
        if($scope.newPassword === $scope.newPassword2)
        {
            var data2 = {username: $scope.currentUser, newPassword: $scope.newPassword};

            $http.post("server/changePassword.php", data2)
            .success(function(response)
            {
                $scope.changeResponse = response;
                $scope.newPassword = "";
                $scope.newPassword2 = "";
            })
            .error(function(error)
            {
                console.error(error);
            });
        }
        else
        {
            $scope.changeResponse = "Your passwords doesn't match!";
        }

    };
    
});

