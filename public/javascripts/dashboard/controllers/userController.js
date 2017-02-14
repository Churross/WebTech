dashboardApp.controller('userController', ['$scope', 'userService', function($scope, userService) {
    fetchAllUsers();

    function fetchAllUsers() {
        userService.all().then(function(data) {
            $scope.users = data.data;
        });
    }

    $scope.deleteUser = function(user) {
        userService.destroy(user._id);
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1);
    };
}]);
