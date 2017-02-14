dashboardApp.controller('orderController', ['$scope', 'orderService', 'itemService', 'userService', function($scope, orderService, itemService, userService) {
    fetchAllOrders();

    function fetchAllOrders() {
        orderService.all().then(function(data) {
            $scope.orders = data.data;
            fetchTableNr();
            fetchItemNames();
        });
    }

    function fetchTableNr() {
        $scope.orders.forEach(function (order, orderIndex) {
            userService.fetch(order.user).then(function(data) {
                $scope.orders[orderIndex].user = data.data.table;
            });
        });
    }

    function fetchItemNames() {
        $scope.orders.forEach(function (order, orderIndex) {
            order.items.forEach(function (item, index) {
                itemService.fetch(item.id).then(function(data) {
                    $scope.orders[orderIndex].items[index].name = data.data.name;
                });
            });
        });
    }

    $scope.updateStatus = function(order) {
        orderService.update(order._id);
        order.status = true;
    };
}]);
