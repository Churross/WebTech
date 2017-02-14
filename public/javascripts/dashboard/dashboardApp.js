var dashboardApp = angular.module('dashboardApp', ['ngRoute']);

dashboardApp.config(function($interpolateProvider){
    $interpolateProvider.startSymbol("{[");
    $interpolateProvider.endSymbol("]}");
});

dashboardApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '../javascripts/dashboard/pages/orders.html',
            controller  : 'orderController'
        })

        .when('/items', {
            templateUrl : '../javascripts/dashboard/pages/items.html',
            controller  : 'itemController'
        })

        .when('/orders', {
            templateUrl : '../javascripts/dashboard/pages/orders.html',
            controller  : 'orderController'
        })

        .when('/users', {
            templateUrl : '../javascripts/dashboard/pages/users.html',
            controller  : 'userController'
        })

        .when('/categories', {
            templateUrl : '../javascripts/dashboard/pages/categories.html',
            controller  : 'categoryController'
        });
});

dashboardApp.filter('titlecase', function() {
    return function (input) {
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

        input = input.toLowerCase();
        return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }

            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
        });
    }
});

dashboardApp.filter('dateLessThanNow', function() {
    return function (items) {
        if(!items) {
            return;
        }
        var newItems = new Array();
        items.forEach(function(item) {
            if (new Date().toISOString() < item.expiresAt) {
                newItems.push(item);
            }
        });
        return newItems;
    }
});