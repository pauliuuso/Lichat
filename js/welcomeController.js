app.controller("welcomeController", function($scope, $location, $http)
{
    $scope.welcomeUsername = localStorage["name"];
    var token = localStorage["token"];
    
    $scope.logout = function()
    {
        var data =
        {
            token: token,
            username: $scope.welcomeUsername
        };
        
        $http.post("server/logout.php", data)
        .success(function(response)
        {
            console.log(response);
            localStorage.clear();
            $location.path("/login");
        })
        .error(function(error)
        {
            console.error(error);
        });
    };
    
});

