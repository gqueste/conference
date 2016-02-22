angular.module('conf.favorites',[])
    .controller('favoritesController', function(dataService, $scope, savedDataService){
        $scope.sessions = [];

        dataService.getData().then(function(data){
            var allSessions = data.sessions;
            savedDataService.getFavorites().then(function(res){
                $scope.sessions = [];
                for(var i = 0; i < res.rows.length; i++){
                    var currentSessionId = res.rows.item(i).id;
                    for( var j = 0; j < allSessions.length; j++){
                        if(allSessions[j].id == currentSessionId){
                            $scope.sessions.push(allSessions[j]);
                            break;
                        }
                    }
                }
            }, function(err){
                console.log(err);
            });
        }, function(err){
            console.log(err);
        });

        $scope.goToSessionDetails = function(session){
            var object = {session : session};
            app.navi.pushPage('modules/session/session.html', object);
        }
    });