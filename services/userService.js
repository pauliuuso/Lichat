app.service("userService", ["$http", "$location", function($http, $location)
{
    $this = this;
    $this.pictureUrl = "";
    $this.currentUser = localStorage["name"];
    $this.userLevel = localStorage["level"];
    $this.token = localStorage["token"];
    $this.userData = [];
    
    $this.getUserInfo = function(user)
    {
        var data = {username: user};
        $http.post("server/getUserInfo.php", data)
        .success(function(response)
        {
            $this.userData = JSON.parse(JSON.stringify(response));
            $this.userLevel = $this.userData.level;
            $this.currentUser = $this.userData.username;
            $this.token = $this.userData.token;
            localStorage.setItem("level", $this.userLevel);
        })
        .error(function(error)
        {
            console.error(error);
        });
    };
    
    $this.setVisitDate = function(user)
    {
        var data = {username: user, token: $this.token};
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