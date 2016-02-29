app.controller("backController", function($scope)
{
    $scope.goBack = function()
    {
        window.history.back();
    };
});