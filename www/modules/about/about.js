angular.module('conf.about', [])
    .controller('aboutController', function($scope, $sce, $cordovaInAppBrowser){
        $scope.description = $sce.trustAsHtml("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum");
        $scope.version = $sce.trustAsHtml("V 1.0.0");
        $scope.auteur = $sce.trustAsHtml("Gabriel Queste");

        $scope.goToGithub = function(){

            var options = {
                location: 'no',
                clearcache: 'no',
                toolbar: 'no'
            };

            $cordovaInAppBrowser.open('https://github.com/gqueste', '_blank', options)
                .then(function(event) {
                    // success
                })
                .catch(function(event) {
                    // error
                });
        };
    });



