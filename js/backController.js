app.controller("backController",["$scope", function($scope)
{
    $scope.goBack = function()
    {
        window.history.back();
    };
}]);