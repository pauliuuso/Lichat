app.controller("homeController", function($scope, $http)
{
    
    $scope.allThemes;
    
    $scope.getThemes = function()
    {
        $http.post("server/getThemes.php")
        .success(function(response)
        {
            $scope.allThemes = JSON.parse(JSON.stringify(response));
            console.log($scope.allThemes);
        });
    };
    
    $scope.getThemes();
    
});

