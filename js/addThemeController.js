app.controller("addThemeController", function($scope, $http, userService)
{
    $scope.showAddTheme = false;
    $scope.themeTitle;
    $scope.themeDescription;
    $scope.themeWaring;
    $scope.pictureUrls = ["img/default_theme.png", "img/l_theme.png", "img/music_theme.png", "img/skull_theme.png", "img/star_theme.png", "img/paper_theme.png"];
    $scope.imageUrl = "img/default_theme.png";
    $scope.titleMaxChars = 150;
    $scope.descriptionMaxChars = 2000;
    $scope.descriptionCharsLeft = 2000;
    
    $scope.toogleAddTheme = function()
    {
        if(!$scope.showAddTheme)
        {
            $scope.showAddTheme = true;
            $scope.markSelectedPicture();
        }
        else
        {
            $scope.showAddTheme = false;
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
    
    $scope.addTheme = function()
    {
        if($scope.themeTitle.length < $scope.titleMaxChars && $scope.themeDescription.length < $scope.descriptionMaxChars)
        {
            $scope.themeWaring = "";
            var data =
            {
                 title: $scope.themeTitle,
                 description: $scope.themeDescription,
                 picture: $scope.imageUrl,
                 owner: userService.currentUser
            };
            
            $http.post("server/addTheme.php", data)
            .success(function(response)
            {
                if(response)
                {
                    $scope.themeWarning = "";
                    $scope.themeTitle = "";
                    $scope.themeDescription = "";
                    $scope.imageUrl = "img/default_theme.png";
                    $scope.showAddTheme = false;
                    $scope.getThemes();
                }
                else
                {
                    $scope.themeWarning = "Couldn't insert this theme";
                }
            })
            .error(function(error)
            {
                console.log(error);
            });
            
        }
        else
        {
            $scope.themeWaring = "Either theme title or description is too long!";
        }
    };
    
});

