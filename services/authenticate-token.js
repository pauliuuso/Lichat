app.service("authenticationService", ["$http", "$location", function($http, $location)
{
    var $this = this;
    
    $this.checkToken = function(token)
    {
        var data = {token: token};
        $http.post("server/checkToken.php", data)
        .success(function(response)
        {
            if(response === "unauthorized")
            {
                $location.path("/login");
            }
            else
            {
                $location.path("/home");
            }
        })
        .error(function(error)
        {
            console.error(error);
            $location.path("/login");
            return false;
        });
    };
    
}]);
