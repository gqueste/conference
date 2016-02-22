angular.module('conf.session')
    .controller('noteController', function($scope, $sce, $cordovaCamera, $cordovaCapture, $cordovaActionSheet, $cordovaSocialSharing, savedDataService){

        $scope.session = app.navi.getCurrentPage().options.session;
        $scope.session.photos = [];
        $scope.session.audios = [];
        $scope.session.videos = [];

        var loadMedia = function(){
            savedDataService.loadMedia($scope.session.id).then(function(res){
                $scope.session.photos = [];
                $scope.session.audios = [];
                $scope.session.videos = [];
                for(var i = 0; i < res.rows.length; i++){
                    var item = res.rows.item(i);
                    if(item.type == 'audio'){
                        $scope.session.audios.push(item.url);
                    }
                    if(item.type == 'photo'){
                        $scope.session.photos.push(item.url);
                    }
                    if(item.type == 'video'){
                        $scope.session.videos.push(item.url);
                    }
                }
            }, function(err){
                console.error(err);
            });
        };

        var loadNote = function() {
            savedDataService.loadNotes($scope.session.id).then(function(res){
                if(res.rows.length > 0){
                    $scope.session.notes = res.rows.item(0).notes;
                }
                else {
                    $scope.session.notes = "Mes notes";
                }
            }, function(err){
                console.error(err);
            });
        };

        loadNote();
        loadMedia();

        var insertNote = function(id, notes){
            savedDataService.insertNote(id, notes);
        };

        $scope.enregistrerNote = function(){
            insertNote($scope.session.id, $scope.session.notes);
        };

        var saveMedia = function(url, type){
            savedDataService.insertMedia($scope.session.id, url, type);
        };

        var enregistrerImage = function(options){
            $cordovaCamera.getPicture(options).then(function(imageURI) {
                $scope.session.photos.push(imageURI);
                saveMedia(imageURI, 'photo');
            }, function(err) {
                // error
            });
        };

        $scope.addPhotoFromLibrary = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:false
            };

            enregistrerImage(options);
        };

        $scope.addPhotoFromCamera = function(){
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                correctOrientation:false
            };

            enregistrerImage(options);
        };

        $scope.addAudio = function(){
            var options = { limit: 1, duration: 10 };

            $cordovaCapture.captureAudio(options).then(function(audioData) {
                $scope.session.audios.push(audioData[0].fullPath);
                saveMedia(audioData[0].fullPath, 'audio');
            }, function(err) {
                // An error occurred. Show a message to the user
            });
        };

        $scope.addVideo = function(){
            var options = { limit: 1, duration: 15 };
            $cordovaCapture.captureVideo(options).then(function(videoData) {
                $scope.session.videos.push(videoData[0].fullPath);
                saveMedia(videoData[0].fullPath, 'video');
            }, function(err) {
                // An error occurred. Show a message to the user
            });
        };

        var removePhoto = function(photo){
            savedDataService.deleteMedia($scope.session.id, photo).then(function(){
                $scope.session.photos.splice($scope.session.photos.indexOf(photo), 1);
            }, function(err){
                console.log(err);
            });
        };

        var sharePhoto = function(photo){
            $cordovaSocialSharing
                .share($scope.session.notes, $scope.session.title, photo,null)
                .then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });
        };

        $scope.openActionSheet = function(photo){
            var options = {
                androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
                title: "Que faire avec l'image ?",
                buttonLabels: ['Supprimer', 'Partager'],
                addCancelButtonWithLabel: 'Annuler',
                androidEnableCancelButton : true,
                winphoneEnableCancelButton : true
            };
            $cordovaActionSheet.show(options).then(function(btnIndex){
                switch(btnIndex){
                    case 1:
                        removePhoto(photo);
                        break;
                    case 2:
                        sharePhoto(photo);
                        break;
                }
            });
        }

    });