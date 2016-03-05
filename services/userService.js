app.service("userService", ["$http", "$location", function($http, $location)
{
    $this = this;
    $this.pictureUrl = "";
    $this.currentUser = localStorage["name"];
    
    $this.setVisitDate = function(user)
    {
        var data = {username: user};
        $http.post("server/setVisitDate.php", data)
        .success(function(response)
        {
            if(response)
            {
                console.log("date set");
            }
        })
        .error(function(error)
        {
            console.error(error);
        });
    };
    
    $this.calculateChars = function(maxChars, currentLength)
    {
        var count = maxChars - parseInt(currentLength.length);
        return count;
    };
    
}]);