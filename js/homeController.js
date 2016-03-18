app.controller("homeController", function($scope, $http, userService)
{
    $scope.allThemes;
    $scope.showFrom = 0;
    $scope.themeCount = 0;
    $scope.showCount = 10;
    $scope.paginationArray = [];

    $scope.getThemes = function()
    {
        var startFrom = $scope.showFrom * $scope.showCount;
        $http.post("server/getThemes.php", startFrom)
        .success(function(response)
        {
            $scope.allThemes = JSON.parse(JSON.stringify(response));
            $scope.getThemeCount();
        });
    };
    
    $scope.getThemeCount = function()
    {
        $http.post("server/getThemeCount.php")
        .success(function(response)
        {
            $scope.themeCount = parseInt(response);
            $scope.buildPagination();
        });
    };
    
    $scope.ifCurrent = function(page)
    {
        if(page === $scope.showFrom)
        {
            return "active";
        }
    };
    
    $scope.gotoPage = function(page)
    {
        $scope.showFrom = page;
        $scope.getThemes();
    };
    
    $scope.buildPagination = function()
    {
        $scope.paginationArray = [];
        var paginationCount = Math.ceil($scope.themeCount / $scope.showCount);
        if(paginationCount > 1)
        {
            for(var a = 0; a < paginationCount; a++)
            {
                $scope.paginationArray.push(a);
            }
        }
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

