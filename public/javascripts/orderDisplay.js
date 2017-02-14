/**
 * Created by Youri on 15-1-2016.
 */
itemController.directive('orderDisplay', function(){
    return{
        scope: {
            item: '=',
            eventHandler: '&ngClick'
        },
        templateUrl: 'javascripts/orderDisplay.html'
    };
});