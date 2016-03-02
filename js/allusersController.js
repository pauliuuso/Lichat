app.controller("allusersController", function($scope, $http)
{
    $scope.allUsers;
    $scope.getAllUsers = function()
    {
        $http.post("server/getAllUsers.php")
        .success(function(response)
        {
            if(response)
            {
                $scope.allUsers = JSON.parse(JSON.stringify(response));
            }
        })
        .error(function(error)
        {
            console.error(error);
        });
    };
    
    //functions that are called on init
    $scope.getAllUsers();
    
});

