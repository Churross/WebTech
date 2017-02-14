dashboardApp.controller('categoryController', ['$scope', 'categoryService', function($scope, categoryService) {
    fetchAllCategories();

    function fetchAllCategories() {
        categoryService.all().then(function(data) {
            $scope.categories = data.data;
        });
    }

    $scope.deleteCategory = function(category) {
        categoryService.destroy(category._id);
        var index = $scope.categories.indexOf(category);
        $scope.categories.splice(index, 1);
    };

    $scope.createCategory = function() {
        categoryService.create($scope.newCategory).then(function (data, status) {
            $scope.categories.push(data.data);
            $scope.newCategory = null;
        });
    };
}]);
