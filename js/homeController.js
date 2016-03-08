app.controller("homeController", function($scope, $http, userService)
{
    $scope.allThemes;
    
    $scope.getThemes = function()
    {
        $http.post("server/getThemes.php")
        .success(function(response)
        {
            $scope.allThemes = JSON.parse(JSON.stringify(response));
        });
    };

    $scope.showEdit = function(owner)
    {
        if(owner === userService.currentUser || userService.userLevel >= 2)
        {
            return true;
        }
        else
        {
            return false;
        }
    };
    
    $scope.getThemes();
    
});

