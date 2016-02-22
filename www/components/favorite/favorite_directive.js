angular.module('conf.favorites').

directive('favoriteSession', function(){
    return {
        restrict: 'E',
        templateUrl: 'components/favorite/favorite.html',
        controller:'favoriteCtrl',
        scope: {
            session: '='
        }
    };
});