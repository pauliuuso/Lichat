app.controller("userController", function($scope, $location, $http, userService)
{
    $scope.pictureUrl = "";
    $scope.username = $location.search().username;
    $scope.currentUser = userService.currentUser;
    $scope.level;
    $scope.lastVisit;
    $scope.changeShow = false; // if true it will show password change fields
    $scope.changePictureShow = false; // if ture it will show change picture button
    
    var data = 
    {
        username: $scope.username    
    };

    $scope.getUserInfo = function()
    {
        $http.post("server/getUserInfo.php", data)
        .success(function(response)
        {
            if(response)
            {
                var userInfo = JSON.parse(JSON.stringify(response));
                if($scope.currentUser === userInfo.username)
                {
                    $scope.changeShow = true; // If currently logged in user views this page we will display password change fields
                    $scope.changePictureShow = true;
                }
                $scope.pictureUrl = userInfo.picture;
                userService.pictureUrl = userInfo.picture;
                $scope.level = userInfo.level;
                $scope.lastVisit = userInfo.visited;
            }
        })
        .error(function(error)
        {
            console.error(error);
        });
    };
    
    //functions that are called on init
    $scope.getUserInfo();
    
});

