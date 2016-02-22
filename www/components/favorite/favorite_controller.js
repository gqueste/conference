angular.module('conf.favorites').

controller('favoriteCtrl', function($scope, savedDataService){

    $scope.classFavorite = 'heart-o';

    var loadFavorite = function(){
        savedDataService.isInFavorites($scope.session.id).then(function(res){
            if(res.rows.length > 0){
                $scope.classFavorite = 'heart';
            }
            else {
                $scope.classFavorite = 'heart-o';
            }
        }, function(err){
            console.log(err);
        })
    };

    loadFavorite();

    $scope.toogleFavorite = function(){
        if($scope.classFavorite == 'heart'){
            //removeFavorite
            savedDataService.removeFavorite($scope.session.id).then(function(){
                $scope.classFavorite = 'heart-o';
            }, function(err){
                console.log(err);
            })
        }
        else {
            savedDataService.addFavorite($scope.session.id).then(function(){
                $scope.classFavorite = 'heart';
            }, function(err){
                console.log(err);
            })
        }
    }

});