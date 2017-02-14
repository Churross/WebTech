dashboardApp.service('orderService', function ($http) {
    var service = this;
    var path = '../api/orders/';

    function getUrl() {
        return path;
    }

    function getUrlForId(itemId) {
        return getUrl(path) + itemId;
    }

    service.all = function () {
        return $http.get(getUrl());
    };

    service.fetch = function (itemId) {
        return $http.get(getUrlForId(itemId));
    };

    service.create = function (item) {
        return $http.post(getUrl(), item);
    };

    service.update = function (itemId) {
        return $http.put(getUrlForId(itemId), null);
    }

    service.destroy = function (itemId) {
        return $http.delete(getUrlForId(itemId));
    };
});