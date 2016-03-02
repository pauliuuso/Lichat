app.controller("pictureController", function($scope, $http, userService) //Controls directory which allows user to change it's picture
{
    $scope.pictureBoxShow = false;
    $scope.pictureUrl = userService.pictureUrl;
    $scope.pictureUrls = [];
    
    $scope.showChangePicture = function()
    {
        if(!$scope.pictureBoxShow)
        {
            $scope.pictureBoxShow = true;
            $scope.markSelectedPicture();
        }
        else
        {
            $scope.pictureBoxShow = false;
        }
    };
    
    $scope.markSelectedPicture = function() //This highlights currently selected profile image
    {
        $(".choose-picture img").each(function(index)
        {
            if ($(this).attr("src") === $scope.pictureUrl)
            {
                $(this).attr("class", "selected-picture");
            }
            else
            {
                $(this).attr("class", "");
            };
        });
    };
    
    $scope.getPicNames = function()
    {
        $http.post("server/getPicNames.php")
        .success(function(response)
        {
            $scope.pictureUrls = JSON.parse(JSON.stringify(response));
        }); 
    };
    
    $scope.setImage = function(url)
    {
        data = {pictureUrl: url, username: userService.currentUser};
        $http.post("server/setPicture.php", data)
        .success(function(response)
        {
            if(response)
            {
                $scope.pictureUrl = url;
                $scope.markSelectedPicture();
            }
        })
        .error(function(error)
        {

        });
    };
    
    $scope.getPicNames();
    
});
