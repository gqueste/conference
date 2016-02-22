angular.module('conf.session')
    .controller('sessionController', ['$scope', '$sce', 'savedDataService', function($scope, $sce, savedDataService){
        $scope.session = app.navi.getCurrentPage().options.session;

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

        $scope.getSessionDesc = function(){
            return $sce.trustAsHtml($scope.session.desc);
        };

        $scope.goToNotes = function(){
            var object = {session : $scope.session};
            app.navi.pushPage('modules/session/note.html', object);
        };

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

    }]);