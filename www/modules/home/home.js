angular.module('conf.home', [])
    .controller('homeController', function($scope){
        this.title = 'Application Conference';

        $scope.goToSessions = function(){
            app.menu.setMainPage('modules/session/sessions.html', {closeMenu: true})();
        };

        $scope.goToSpeakers = function(){
            app.menu.setMainPage('modules/speaker/speakers.html', {closeMenu: true})();
        }

    });



