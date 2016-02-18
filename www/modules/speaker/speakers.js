angular.module('conf.speaker',[])
    .controller('speakersController', ['dataService', '$scope', '$filter', '$sce', function(dataService, $scope, $filter, $sce){
        $scope.speakers = [];

        dataService.getData().then(function(data){
            $scope.speakers = data.speakers;
            $scope.speakers = $filter('orderBy')($scope.speakers, "firstname");
        });

        $scope.getSpeakerAbout = function(speaker){
            var about = $filter('limitTo')(speaker.about, 100);
            about += "...";
            return $sce.trustAsHtml(about);
        };

        $scope.goToSpeaker = function(speaker){
            var object = {speaker : speaker};
            app.speakers.pushPage('modules/speaker/speaker.html', object);
        }
    }]);