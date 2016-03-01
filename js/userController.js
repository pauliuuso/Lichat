app.controller("userController", function($scope, $location, $http)
{
    $scope.pictureUrl = "";
    $scope.username = $location.search().username;
    $scope.currentUser = localStorage["name"];
    $scope.level;
    $scope.lastVisit;
    $scope.changeShow = false; // if true it will show password change fields
    $scope.changePictureShow = false; // if ture it will show change picture button
    $scope.pictureBoxShow = false;
    $scope.changeResponse = "";
    $scope.newPassword;
    $scope.newPassword2;
    $scope.pictureUrls = ["default", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    
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
                $scope.level = userInfo.level;
                $scope.lastVisit = userInfo.visited;
            }
        })
        .error(function(error)
        {
            console.error(error);
        });
    };
    
    $scope.getUserInfo();
    
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
            };
        });
    };
    
    $scope.setImage = function()
    {
                    // Reikia gaut reference to this ir updeitint url serveryje, tada issaukt markSelected
    };
    
});

