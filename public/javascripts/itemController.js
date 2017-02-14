/**
 * Created by Youri on 13-1-2016.
 */
var itemController = angular.module('itemController', ['ui.router'])

    .service('orderService', function OrderService(){
        var orderList = [];
        var filterName;
        var tableNr;
        var tableID;
        var addItem = function(newItem){
            var updated = false;
            //search if the item is already present, if so increase amount, else add it
            for(var i = 0; i < orderList.length; i++){
                if (orderList[i].name === newItem.name){
                    orderList[i].amount = orderList[i].amount + 1;
                    updated = true;
                }
            } if(!updated){
                orderList.push({_id: newItem._id, name: newItem.name, amount: 1});
            }
        };
        var getItems = function(){
            return orderList;
        };
        var getFilter = function(){
            return filterName;
        };
        var settableNr = function(tablenr){
            tableNr = tablenr;
        };
        var gettableNr = function(){
            return tableNr;
        };
        var settableID = function(tableId){
            tableID = tableId;
        };
        var gettableID = function(){
            return tableID;
        };
        var setFilter = function(filter){
            filterName = filter;
        };

        var removeItem = function(item, index){
            orderList.splice(index,1);
        };

        var clearOrder = function(){
            orderList = [];
            console.log(orderList);
        }

        return {
            addItem: addItem,
            getItems: getItems,
            getFilter: getFilter,
            setFilter: setFilter,
            gettableNr: gettableNr,
            settableNr: settableNr,
            gettableID: gettableID,
            settableID: settableID,
            removeItem: removeItem,
            clearOrder: clearOrder
        }
    })

    .filter('typeFilter', function(orderService){
        return function(item){
            var out = [];
            var filter = orderService.getFilter();
            for(var i = 0; i < item.length; i++){
                if(item[i].category == filter){
                    out.push(item[i]);
                }
            }
            return out;
        }
    })

    .controller('itemsController', function($rootScope, $http, $scope, orderService){
        //Get item categories
        checkCookie();
        //get categories
        $http.get('/api/items/categories').success(function(data){
            $scope.categories=data;
            orderService.setFilter(data[0].category_name);
        }).error(function(data){
            console.log("Error " + data);
        });
        //get items
        $http.get('/api/items').success(function(data){
            $scope.items=data;
        }).error(function(data){
            console.log("Error "+ data);
        });

        $scope.itemClick = function (name) {
            orderService.addItem(name);
        }

        $scope.filterSet = function(filter){
            orderService.setFilter(filter);
        }

        function setCookie(cname, cvalue) {
            var d = new Date();
            d.setTime(d.getTime() + (2*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
            orderService.settableNr(cvalue);
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        }

        function checkCookie() {
            var user = getCookie("username");
            if (user != "") {
                orderService.settableID(user);
            } else {
                user = prompt("Please enter your unique code:", "");
                if (user != "" && user != null) {
                    $http.post('/api/users', {table: user, duration: 2.5}).success(function(data){
                        orderService.settableID(data._id);
                        setCookie("username", orderService.gettableID());
                    }).error(function(data){
                        alert("Something is wrong, please ask for assistance");
                    });

                }
            }
        }


    })

    .controller('orderController', function($rootScope,$http, $scope, orderService){
        $scope.items = orderService.getItems();

        $scope.postOrder = function(){
            var oldOrderList = orderService.getItems();
            var orderList = [];
            for(var i = 0; i < oldOrderList.length; i++){
                item = {
                    id: oldOrderList[i]._id,
                    amount: oldOrderList[i].amount
                }
                orderList.push(item);
            }
            var newOrder  = {
                user: orderService.gettableID(),
                items: orderList

            };
            $http.post('/api/orders',newOrder).success(function(data){
                alert("Your order has been sent to the kitchen");
            }).error(function(data){
                alert("Something went wrong, please call for assistance")
            });
            orderService.clearOrder();
            $scope.items = orderService.getItems();
            console.log("order cleared");
        };

        $scope.buttonDisable = function(){
            if (orderService.getItems().length == 0){
                return true;
            }
            return false;
        }

        $scope.changeAmount = function(item){
            var items = orderService.getItems();
            var amount;
            for(var i = 0; i < items.length; i++){
                if (items[i].name === item.name){
                    amount = items[i].amount;
                }
            }
            amount = prompt("Please specify how many you would like:");
            //update the amount of the selected item
            for(var i = 0; i < items.length; i++){
                if (items[i].name === item.name){
                    if(amount === null){
                        items[i].amount = items[i].amount;
                    } else if(amount == 0){
                        orderService.removeItem(item, i);
                    } else {
                        items[i].amount = amount;
                    }
                }
            }
        }
    });
