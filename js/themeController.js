app.controller("themeController", function($scope, $http, $location, userService)
{
   $scope.allMessages = [];
   $scope.themeData;
   $scope.id = $location.search().id;
   $scope.messageText = "";
   $scope.messageMaxChars = 5000;
   $scope.messageCharsLeft = $scope.messageMaxChars;
   $scope.messageWarning;
   $scope.lastMessageCount = 0;
   $scope.messageCount;
   $scope.firstMessagesLoaded = false;
   $scope.messageLoadStep = 5;
   $scope.messagesLoaded = $scope.messageLoadStep;
   
   setInterval(function()
   {
       $scope.messageQuery();
   }, 500);
   
   $scope.messageQuery = function()
   {
       var messageBoard = $(".message-board");
       var startFrom = $scope.lastMessageCount - $scope.messagesLoaded;
       if(messageBoard.scrollTop() < 20)
       {
           if(startFrom >= 0)
           {

                if($scope.lastMessageCount > 0)
                {
                    $scope.getMessages("old", startFrom, $scope.messageLoadStep);
                }
           }
           else
           {
               clearInterval();
           }

       };
       $scope.getMessageCount();
   };
   
   $scope.goToBottom = function()
   {
       var messageBoard = $(".message-board");
       messageBoard.scrollTop(messageBoard.prop("scrollHeight"));
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
           type: type,
           startFrom: startFrom,
           count: count
       };
       
       $http.post("server/getMessages.php", data)
       .success(function(response)
       {
            $scope.messagesLoaded += $scope.messageLoadStep;
            if($scope.allMessages.length === 0)
            {
                $scope.allMessages = JSON.parse(JSON.stringify(response));
            }
            else
            {
                $scope.allMessages = $.merge(JSON.parse(JSON.stringify(response)), $scope.allMessages);
            }
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
           else if($scope.MessageCount > $scope.lastMessageCount)
           {
               $scope.getMessages("new", $scope.messageCount - $scope.lastMessageCount);
               $scope.lastMessageCount = $scope.messageCount;
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
                $scope.getMessages();
                $scope.goToBottom();
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
   
   $scope.getTheme();
   $scope.getMessageCount();
   
});
