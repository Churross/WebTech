/**
 * Created by youri on 14-1-16.
 */
itemController.directive('itemDisplay', function(){
    return{
        scope: {
            item: '=',
            eventHandler: '&ngClick'
        },
        templateUrl: 'javascripts/itemDisplay.html'
    };
});