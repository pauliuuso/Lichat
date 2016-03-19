app.controller("privilegesController", function($scope, $http, userService)
{
    $scope.allUsers;
    $scope.selectedUser = 1;
    $scope.selectedLevel = 1;
    $scope.allLevels = [];
    $scope.showWarning = false;
    
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
    
    $scope.setLevel = function()
    {
        var data = 
        {
            setUser: $scope.selectedUser,
            setLevel: $scope.selectedLevel,
            username: userService.currentUser,
            token: userService.token,
            level: userService.userLevel
        };
        
        $http.post("server/setLevel.php", data)
        .success(function(response)
        {
            if(response)
            {
                $scope.getAllUsers();
                $scope.buildLevels();
                $scope.showWarning = true;
            }
        });
        
    };
    
    $scope.buildLevels = function()
    {
        $scope.allLevels = [];
        $scope.allLevels = [0, 1, 2, 3];
    };

    $scope.getAllUsers();
    $scope.buildLevels();
    
});

