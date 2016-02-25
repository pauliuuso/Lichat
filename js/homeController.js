app.controller("homeController", function($scope, $location)
{
    if(localStorage["username"] === undefined)
    {
        $location.path("/login");
    }
    else
    {
        $location.path("/home");
    }
});

