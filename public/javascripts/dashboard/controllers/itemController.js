dashboardApp.controller('itemController', ['$scope', 'itemService', 'categoryService', function($scope, itemService, categoryService) {
    fetchAllItems();
    fetchAllCategories();

    function fetchAllItems() {
        itemService.all().then(function(data) {
            $scope.items = data.data;
        });
    }

    function fetchAllCategories() {
        categoryService.all().then(function(data) {
            $scope.categories = data.data;
        });
    }

    $scope.deleteItem = function(item) {
        itemService.destroy(item._id);
        var index = $scope.items.indexOf(item);
        $scope.items.splice(index, 1);
    };

    $scope.createItem = function() {
        itemService.create($scope.newItem).then(function (data) {
            $scope.categories.push(data.data);
            $scope.newItem = null;
        });
    };
}]);
