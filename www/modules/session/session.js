angular.module('conf.session')
    .controller('sessionController', ['$scope', '$sce', function($scope, $sce){
        $scope.session = app.navi.getCurrentPage().options.session;

        $scope.getSessionDesc = function(){
            return $sce.trustAsHtml($scope.session.desc);
        }

    }]);