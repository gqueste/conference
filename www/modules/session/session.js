angular.module('conf.session')
    .controller('sessionController', ['$scope', '$sce', function($scope, $sce){
        $scope.session = app.navi.getCurrentPage().options.session;

        $scope.getSessionDesc = function(){
            return $sce.trustAsHtml($scope.session.desc);
        };

        $scope.goToNotes = function(){
            var object = {session : $scope.session};
            app.navi.pushPage('modules/session/note.html', object);
        };

    }]);