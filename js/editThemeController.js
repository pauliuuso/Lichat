app.controller("editThemeController",["$scope", "$http", "userService", function($scope, $http, userService)
{
    $scope.editTitle = "";
    $scope.editDescription = "";
    $scope.themeWaring = "";
    $scope.pictureUrls = ["img/default_theme.png", "img/l_theme.png", "img/music_theme.png", "img/skull_theme.png", "img/star_theme.png", "img/paper_theme.png"];
    $scope.imageUrl = "img/default_theme.png";
    $scope.titleMaxChars = 150;
    $scope.descriptionMaxChars = 2000;
    $scope.editCharsLeft = 2000;
    $scope.showThis = false;
    $scope.themeData = [];
    $scope.themeId = 0;

    $scope.editTheme = function(id)
    {
        $scope.getTheme(id);
        $scope.themeId = id;
    };
    
    $scope.getTheme = function(id)
    {
        $http.post("server/getTheme.php", id)
        .success(function(response)
        {
            $scope.themeData = JSON.parse(JSON.stringify(response));
            $scope.editTitle = $scope.themeData[1];
            $scope.editDescription = $scope.themeData[2];
            $scope.imageUrl = $scope.themeData[3];
            $scope.markSelectedPicture();
            $scope.showThis = true;
            setTimeout(function(){$scope.goToBottom();}, 200);
        })
        .error(function(error)
        {
            console.error(error);
        });
    };
    
    $scope.goToBottom = function(amount)
    {
        var board = $("html, body");
        if(!amount)
        {
            board.scrollTop(board.prop("scrollHeight"));
        }
        else
        {
            board.scrollTop(amount);
        }
    };
    
    $scope.hideEditTheme = function()
    {
        $scope.showThis = false;
        $scope.themeWarning = "";
        $scope.editTitle = "";
        $scope.editDescription = "";
        $scope.imageUrl = "img/default_theme.png";
        $scope.showAddTheme = false;
    };
    
    $scope.setEditImage = function(url)
    {
        $scope.imageUrl = url;
        $scope.markSelectedPicture();
    };
    
    $scope.markSelectedPicture = function() //This highlights currently selected profile image
    {
        $(".choose-theme-picture img").each(function(index)
        {
            if ($(this).attr("src") === $scope.imageUrl)
            {
                $(this).attr("class", "selected-picture");
            }
            else
            {
                $(this).attr("class", "");
            }
        });
    };
    
    $scope.updateEditCharsLeft = function()
    {
        $scope.editCharsLeft = userService.calculateChars($scope.descriptionMaxChars, $scope.editDescription);
    };
    
    $scope.updateTheme = function()
    {
        if($scope.editTitle.length <= $scope.titleMaxChars && $scope.editDescription.length <= $scope.descriptionMaxChars && $scope.editTitle !== "")
        {
            $scope.themeWarning = "";
            var data =
            {
                 title: $scope.editTitle,
                 description: $scope.editDescription,
                 picture: $scope.imageUrl,
                 owner: userService.currentUser,
                 id: $scope.themeId,
                 token: userService.token,
                 level: userService.userLevel
            };
            
            $http.post("server/updateTheme.php", data)
            .success(function(response)
            {
                if(response)
                {
                    $scope.themeWarning = "";
                    $scope.editTitle = "";
                    $scope.editDescription = "";
                    $scope.imageUrl = "img/default_theme.png";
                    $scope.showThis = false;
                    $scope.getThemes();
                }
                else
                {
                    $scope.themeWarning = "Couldn't update this theme";
                }
            })
            .error(function(error)
            {
                console.log(error);
            });
            
        }
        else
        {
            $scope.themeWarning = "Either theme title or description is too long or no theme title!";
        }
    };
    
}]);

