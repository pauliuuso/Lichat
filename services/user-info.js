app.service("userService", ["$http", "$location", "authenticationService", function($http, $location, authenticationService)
{
    $this = this;
    $this.userUrl = "user";
    $this.username;
    $this.token;
    
    $this.checkUser = function()
    {
        authenticationService.checkToken($this.token);
    };

    
    $this.displayName = function()
    {
        alert("hi");
    };
    
}]);