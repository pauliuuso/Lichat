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
    
    $scope.deleteTheme = function(id)
    {
        var choose = confirm("Are you sure?");
        if(choose === true)
        {
            $scope.removeTheme(id);
        }
    };
    
    $scope.removeTheme = function(id)
    {
        var data = {username: userService.currentUser, level: userService.userLevel, token: userService.token, id: id};
        $http.post("server/deleteTheme.php", data)
        .success(function(response)
        {
            $scope.getThemes();
        })
        .error(function(error)
        {
            console.error(error);
        });
    };
    
    $scope.getThemes();
    
});

