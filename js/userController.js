app.controller("userController", function($scope, $location, $http)
{
    $scope.pictureUrl = "";
    $scope.username = $location.search().username;
    $scope.level;
    
    var data = 
    {
        username: $scope.username    
    };
    
    $http.post("server/getUserInfo.php", data)
    .success(function(response)
    {
        if(response)
        {
            var userInfo = JSON.parse(JSON.stringify(response));
            $scope.pictureUrl = userInfo.picture;
            $scope.level = userInfo.level;
        }
    })
    .error(function(error)
    {
        console.error(error);
    });
    
});

