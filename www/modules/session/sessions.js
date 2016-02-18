angular.module('conf.session',[])
    .controller('sessionsController', ['dataService', '$scope', function(dataService, $scope){
        $scope.sessions = [];
        $scope.categories = [];

        dataService.getData().then(function(data){
            $scope.sessions = data.sessions;
            $scope.categories = data.categories;
        });

        $scope.goToSessionDetails = function(session){
            var object = {session : session};
            app.navi.pushPage('modules/session/session.html', object);
        }
    }]);