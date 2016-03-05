app.controller("themeController", function($scope, $http, $location, userService)
{
   $scope.allMessages;
   $scope.themeData;
   $scope.id = $location.search().id;
   $scope.messageText = "";
   $scope.messageMaxChars = 5000;
   $scope.messageCharsLeft = $scope.messageMaxChars;
   $scope.messageWarning;
   $scope.messageCount;
   
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
   
   $scope.getMessages = function()
   {
       $http.post("server/getMessages.php", $scope.id)
       .success(function(response)
       {
            $scope.allMessages = JSON.parse(JSON.stringify(response));
            console.log($scope.allMessages);
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
   
   $scope.getTheme();
   $scope.getMessages();
   $scope.getMessageCount();

});
