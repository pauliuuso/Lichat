app.controller("themeController",["$scope", "$http", "$location", "$sce", "userService", function($scope, $http, $location, $sce, userService)
{
   $scope.oldMessages = [];
   $scope.allMessages = [];
   $scope.onlineUsers = [];
   $scope.themeData = [];
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
   $scope.messageLoadInterval = 1540;
   $scope.checkForMessagesInt = 1250;
   $scope.loaderVisible = true;
   $scope.editOrEnter = "Enter";
   $scope.editing = false;
   $scope.displayCancel = false;
   $scope.editId = 0;
   $scope.editIndex = 0;
   $scope.firstLoad = true;

   
   var messageLoadInterval = setInterval(function()
   {
       $scope.messageQuery();
   }, $scope.messageLoadInterval);
   
   var checkForNewMessages = setInterval(function()
   {
       $scope.getNewMessages();
       $scope.setVisitDate();
       $scope.checkOnline();
   }, $scope.checkForMessagesInt);
   
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
       }
    };

    
    $scope.showEditMessage = function(owner)
    {
        if(owner === userService.currentUser || userService.userLevel >= 2)
        {
            return true;
        }
        else
        {
            return false;
        }
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
    
    $scope.setVisitDate = function()
    {
        var data = {username: userService.currentUser, token: userService.token};
        $http.post("server/setVisitDate.php", data);
    };
    
    $scope.checkOnline = function()
    {
        $http.post("server/checkOnline.php")
        .success(function(response)
        {
            $scope.onlineUsers = JSON.parse(JSON.stringify(response));
        });
    };
   
    $scope.goToBottom = function(amount, time)
    {
        var bottomTimer = window.setTimeout(function(){$scope.goBottom(amount);}, time);
    };
    
    $scope.goBottom = function(amount)
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
            var newMessages = [];
            newMessages = JSON.parse(JSON.stringify(response));
            if(type === "old")
            {
               if($scope.allMessages.length === 0)
               {
                   $scope.allMessages = newMessages;
               }
               else
               {
                   $scope.allMessages = $.merge(newMessages, $scope.allMessages);
                   $scope.goToBottom(100, 200);
               }
            }
            else if(type === "new")
            {   
                $scope.allMessages = $.merge($scope.allMessages, newMessages);
            }
        })
        .error(function(error)
        {
            console.error(error);
        });
    };
   
    $scope.getMessageCount = function()
    {
        window.setTimeout(function(){$scope.parseMessageCount();}, 100);
    };
    
    $scope.parseMessageCount = function()
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
   
    $scope.sendMessage = function($index)
    {
        if($scope.messageText.length <= 5000 && $scope.messageText !== "")
        {
            $scope.messageWarning = "";
            var serverUrl = "server/sendMessage.php";
            if($scope.editing) serverUrl = "server/updateMessage.php";

            var data =
            {
                  username: userService.currentUser,
                  message: $scope.messageText,
                  theme: $scope.id,
                  token: userService.token,
                  messageId: $scope.editId,
                  level: userService.userLevel
            };
            
            $http.post(serverUrl, data)
            .success(function(response)
            {
                if($scope.editing)
                {
                    $scope.allMessages[$scope.editIndex][2] = $scope.messageText;
                }
                $scope.messageText = "";
                $scope.messageWarning = "";
                $scope.messageCharsLeft = $scope.messageMaxChars;
                $scope.messageCount++; // This is needed display message that user sent faster for him
                $scope.getNewMessages();
                $scope.cancelEdit();
                $scope.goToBottom(null, 250);
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
    
    $scope.editMessage = function(id, message, $index)
    {
        $scope.editOrEnter = "Edit";
        $scope.editing = true;
        $scope.displayCancel = true;
        $scope.messageText = message;
        $scope.editId = id;
        $scope.editIndex = $index;
    };
    
    $scope.cancelEdit = function()
    {
        $scope.editOrEnter = "Enter";
        $scope.editing = false;
        $scope.displayCancel = false;
        $scope.messageText = "";
        $scope.editId = 0;
        $scope.editIndex = 0;
    };
    
    $scope.deleteMessage = function(id, index)
    {
        var data = {username: userService.currentUser, token: userService.token, id: id, level: userService.userLevel};
        $http.post("server/deleteMessage.php", data)
        .success(function(response)
        {
            $scope.allMessages.splice(index, 1);
        })
        .error(function(error)
        {
            console.error(error);
        });
    };

    $scope.$on("lastElement", function()
    {
        var messageBoard = $(".message-board");
        if(messageBoard.prop("scrollHeight") === messageBoard.scrollTop() + 400 || $scope.firstLoad)
        {
            $scope.firstLoad = false;
            $scope.goToBottom(null, 800);
        }
    });
    
    $scope.$on("$destroy", function()
    {
        clearInterval(messageLoadInterval);
        clearInterval(checkForNewMessages);
    });
    
    $(document).keypress(function(e)
    {
        if(e.which === 13)
        {
            $scope.sendMessage();
        }
        
    });

    $scope.getTheme();
    $scope.getMessageCount();
}]);
