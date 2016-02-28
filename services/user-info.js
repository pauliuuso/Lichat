app.service("userService", ["$http", "$location", "authenticationService", function($http, $location)
{
    $this = this;
    $this.userUrl = "user";
    $this.username;
    
    $this.displayName = function()
    {
        alert("hi");
    };
    
}]);