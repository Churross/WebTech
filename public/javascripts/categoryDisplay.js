/**
 * Created by s147878 on 16-1-2016.
 */
itemController.directive('categoryDisplay', function(){
    return{
        scope: {
            category: '=',
            eventHandler: '&ngClick'
        },
        templateUrl: 'javascripts/categoryDisplay.html'
    };
});