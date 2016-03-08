app.controller("editThemeController", function($scope, $http, userService)
{
    $scope.themeTitle = "";
    $scope.themeDescription = "";
    $scope.themeWaring = "";
    $scope.pictureUrls = ["img/default_theme.png", "img/l_theme.png", "img/music_theme.png", "img/skull_theme.png", "img/star_theme.png", "img/paper_theme.png"];
    $scope.imageUrl = "img/default_theme.png";
    $scope.titleMaxChars = 150;
    $scope.descriptionMaxChars = 2000;
    $scope.descriptionCharsLeft = 2000;
    $scope.showThis = false;
    $scope.themeData = [];
    $scope.themeId;

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
            $scope.themeTitle = $scope.themeData[1];
            $scope.themeDescription = $scope.themeData[2];
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
    
    $scope.setImage = function(url)
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
            };
        });
    };
    
    $scope.updateDescriptionCharsLeft = function()
    {
        $scope.descriptionCharsLeft = userService.calculateChars($scope.descriptionMaxChars, $scope.themeDescription);
    };
    
    $scope.updateTheme = function()
    {
        if($scope.themeTitle.length <= $scope.titleMaxChars && $scope.themeDescription.length <= $scope.descriptionMaxChars && $scope.themeTitle !== "")
        {
            $scope.themeWarning = "";
            var data =
            {
                 title: $scope.themeTitle,
                 description: $scope.themeDescription,
                 picture: $scope.imageUrl,
                 owner: userService.currentUser,
                 id: $scope.themeId,
                 token: userService.token
            };
            
            $http.post("server/updateTheme.php", data)
            .success(function(response)
            {
                if(response)
                {
                    $scope.themeWarning = "";
                    $scope.themeTitle = "";
                    $scope.themeDescription = "";
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
    
});

