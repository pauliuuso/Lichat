app.controller("themeController", function($scope, $http, $location, userService)
{
   $scope.allMessages = [];
   $scope.themeData;
   $scope.id = $location.search().id;
   $scope.messageText = "";
   $scope.messageMaxChars = 5000;
   $scope.messageCharsLeft = $scope.messageMaxChars;
   $scope.messageWarning = "";
   $scope.lastMessageCount = 0;
   $scope.messageCount = 0;
   $scope.firstMessagesLoaded = false;
   $scope.messageLoadStep = 10;
   $scope.messagesToLoad = 10; //First load step is bigger to fill full message board screen
   $scope.messageLoadInterval = 1000;
   $scope.loaderVisible = true;
   
   var messageLoadInterval = setInterval(function()
   {
       $scope.messageQuery();
   }, $scope.messageLoadInterval);
   
   var checkForNewMessages = setInterval(function()
   {
       $scope.getNewMessages();
   }, $scope.messageLoadInterval);
   
    $scope.messageQuery = function()
    {
       var messageBoard = $(".message-board");
       var startFrom = $scope.lastMessageCount - $scope.messagesToLoad;
       if(messageBoard.scrollTop() < 20)
       {
           if(startFrom >= 0)
           {
                if($scope.lastMessageCount > 0)
                {
                    $scope.getMessages("old", startFrom, $scope.messageLoadStep);
                    $scope.messageLoadStep = 5;
                }
                if(startFrom === 0)
                {
                    $scope.loaderVisible = false;
                }
           }
           else
           {
                $scope.messageLoadStep = $scope.messageLoadStep + startFrom;
                startFrom = 0;
                $scope.getMessages("old", startFrom, $scope.messageLoadStep);
                $scope.messageLoadStep = 5;
                clearInterval(messageLoadInterval);
                $scope.loaderVisible = false;
           }
       };
    };
    
    $scope.getNewMessages = function()
    {
        var messageBoard = $(".message-board");
        var startFrom = $scope.lastMessageCount;
        if($scope.lastMessageCount < $scope.messageCount)
        {
            var messageCount = $scope.messageCount - $scope.lastMessageCount;
            $scope.getMessages("new", startFrom, messageCount);
            $scope.lastMessageCount = $scope.messageCount;
        }
        $scope.getMessageCount();
    };
   
    $scope.goToBottom = function(amount)
    {
        var messageBoard = $(".message-board");
        if(!amount)
        {
            messageBoard.scrollTop(messageBoard.prop("scrollHeight"));
        }
        else
        {
            messageBoard.scrollTop(amount);
        }
    };
   
    $scope.getTheme = function()
    {
        $http.post("server/getTheme.php", $scope.id)
        .success(function(response)
        {
            $scope.themeData = JSON.parse(JSON.stringify(response));
        })
        .error(function(error)
        {
            console.error(error);
        });
    };
   
    $scope.getMessages = function(type, startFrom, count)
    {
        var data =
        {
            id: $scope.id,
            startFrom: startFrom,
            count: count
        };

        $http.post("server/getMessages.php", data)
        .success(function(response)
        {
            $scope.messagesToLoad += $scope.messageLoadStep;
            if(type === "old")
            {
               if($scope.allMessages.length === 0)
               {
                   $scope.allMessages = JSON.parse(JSON.stringify(response));
               }
               else
               {
                   $scope.allMessages = $.merge(JSON.parse(JSON.stringify(response)), $scope.allMessages);
                   $scope.goToBottom(100);
               }
            }
            else if(type === "new")
            {
                $scope.allMessages = $.merge($scope.allMessages, JSON.parse(JSON.stringify(response)));
            }
            console.log(startFrom + " " + count);
            console.log($scope.allMessages); //kartais erroras ir isejus is sito page interval nesustoja
        })
        .error(function(error)
        {
            console.error(error);
        });
    };
   
    $scope.getMessageCount = function()
    {
        $http.post("server/getMessageCount.php", $scope.id)
        .success(function(response)
        {
            $scope.messageCount = parseInt(response);
            if($scope.lastMessageCount === 0)
            {
                $scope.lastMessageCount = $scope.messageCount;
                if(!$scope.firstMessagesLoaded)
                {
                    $scope.firstMessagesLoaded = true;
                    $scope.messageQuery();
                }
            }
        })
        .error(function(error)
        {
            console.error(error);
        });
    };
   
    $scope.sendMessage = function()
    {
        if($scope.messageText.length < 5000 && $scope.messageText !== "")
        {
            $scope.messageWarning = "";

            var data =
            {
                  username: userService.currentUser,
                  message: $scope.messageText,
                  theme: $scope.id
            };
            
            $http.post("server/sendMessage.php", data)
            .success(function(response)
            {
                $scope.messageText = "";
                $scope.messageWarning = "";
                $scope.messageCharsLeft = $scope.messageMaxChars;
                $scope.messageCount++; // This is needed display message that user sent faster for him
                $scope.getNewMessages();
            })
            .error(function(error)
            {
                $scope.messageWarning = "Error while sendind message";
                console.error(error);
            });
        }
        else
        {
            if($scope.messageText.length >= 5000)
            {
                 $scope.messageWarning = "Your message is too long!";
            }
            else
            {
                $scope.messageWarning = "Your message is too short!";
            }

        }
    };
   
    $scope.updateMessageChars = function()
    {
        $scope.messageCharsLeft = userService.calculateChars($scope.messageMaxChars, $scope.messageText);
    };

    $scope.$on("lastElement", function()
    {
        $scope.goToBottom();
    });
    
    $scope.$on("$destroy", function()
    {
        clearInterval(messageLoadInterval);
        clearInterval(checkForNewMessages);
    });

    $scope.getTheme();
    $scope.getMessageCount();
   
});
