angular.module('conf.speaker')
    .controller('DetailSpeakerController', ['$scope', '$filter', '$sce', '$cordovaContacts', function($scope, $filter, $sce, $cordovaContacts){
        $scope.speaker = app.speakers.getCurrentPage().options.speaker;

        var isSpeakerInContacts = function(){
            var opts = {
                filter : $scope.speaker.id,
                multiple: true,
                fields:  [ 'nickname' ]
            };

            $cordovaContacts.find(opts).then(function (contactsFound) {
                $scope.isInContacts = contactsFound.length > 0;
            });
        };

        $scope.isInContacts = false;
        isSpeakerInContacts();

        $scope.getSpeakerAbout = function(){
            return $sce.trustAsHtml($scope.speaker.about);
        };

        $scope.getUrls = function(){
            var ret = [];
            $scope.speaker.socials.forEach(function(element){
                ret.push(new ContactField('url', element.link));
            });
            return ret;
        };

        $scope.getOrganizations = function(){
            var ret = [];
            ret.push(new ContactOrganization(false, 'home', $scope.speaker.company, '', ''));
            return ret;
        };

        $scope.toogleSpeakerInContacts = function(){
            if(!$scope.isInContacts){
                //remove
                var opts = {
                    filter : $scope.speaker.id,
                    multiple: false,
                    fields:  [ 'nickname' ]
                };

                $cordovaContacts.find(opts).then(function (contactsFound) {
                    var contact = contactsFound[0];
                    $cordovaContacts.remove(contact).then(function(result){

                    }, function(err){

                    });
                });

            }
            else {
                //create
                var contact = {
                    displayName : $scope.speaker.firstname + ' ' + $scope.speaker.lastname,
                    name : $scope.speaker.firstname + ' ' + $scope.speaker.lastname,
                    note : $scope.speaker.about,
                    nickname :  $scope.speaker.id,
                    urls : $scope.getUrls(),
                    organizations : $scope.getOrganizations()
                };
                $cordovaContacts.save(contact).then(function(result) {

                }, function(err) {
                    // Contact error
                });
            }
        };
    }]);