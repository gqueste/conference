angular.module('conf.session')
    .controller('noteController', ['$scope', '$sce', '$cordovaSQLite', '$cordovaCamera', '$cordovaCapture', '$cordovaActionSheet',
        function($scope, $sce, $cordovaSQLite, $cordovaCamera, $cordovaCapture, $cordovaActionSheet){

        $scope.session = app.navi.getCurrentPage().options.session;
        $scope.session.photos = [];
        $scope.session.audios = [];
        $scope.session.videos = [];

        var db = $cordovaSQLite.openDB({ name: "conference.db" });

        var loadPhotos = function(){
            var query = "CREATE TABLE IF NOT EXISTS session_photos (id text, url text primary key)";
            $cordovaSQLite.execute(db, query, []).then(function(res){
                var selectQuery = "SELECT * from session_photos where id=?";
                $cordovaSQLite.execute(db, selectQuery, [$scope.session.id]).then(function(res){
                    for(var i = 0; i < res.rows.length; i++){
                        $scope.session.photos.push(res.rows.item(i).url);
                    }
                }, function(err){
                    console.error(err);
                });
            }, function(err){
                console.error(err);
            });
        };

        var loadMedia = function(){
            var query = "CREATE TABLE IF NOT EXISTS session_media (id text, url text primary key, type text)";
            $cordovaSQLite.execute(db, query, []).then(function(res){
                var selectQuery = "SELECT * from session_media where id=?";
                $cordovaSQLite.execute(db, selectQuery, [$scope.session.id]).then(function(res){
                    for(var i = 0; i < res.rows.length; i++){
                        var item = res.rows.item(i);
                        if(item.type == 'audio'){
                            $scope.session.audios.push(item.url);
                        }
                        else{
                            $scope.session.videos.push(item.url);
                        }
                    }
                }, function(err){
                    console.error(err);
                });
            }, function(err){
                console.error(err);
            });
        };

        var loadNote = function() {
            var query = "CREATE TABLE IF NOT EXISTS session_notes (id text primary key, notes text)";
            $cordovaSQLite.execute(db, query, []).then(function(res){
                var selectQuery = "SELECT * from session_notes where id=?";
                $cordovaSQLite.execute(db, selectQuery, [$scope.session.id]).then(function(res){
                    if(res.rows.length > 0){
                        $scope.session.notes = res.rows.item(0).notes;
                    }
                    else {
                        $scope.session.notes = "Mes notes";
                    }
                    loadPhotos();
                }, function(err){
                    console.error(err);
                });
            }, function(err){
                console.error(err);
            });
        };

        loadNote();
        loadPhotos();
        loadMedia();

        var insertNote = function(id, notes){
            var query = "INSERT OR REPLACE INTO session_notes VALUES (?,?)";
            $cordovaSQLite.execute(db, query, [id, notes]).then(function(res){
            }, function(err){
                console.error(err);
            });
        };

        $scope.enregistrerNote = function(){
            insertNote($scope.session.id, $scope.session.notes);
        };

        var savePhoto = function(photo){
            var query = "INSERT OR REPLACE INTO session_photos VALUES (?,?)";
            $cordovaSQLite.execute(db, query, [$scope.session.id, photo]).then(function(res){

            }, function(err){
                console.error(err);
            });
        };

        var saveMedia = function(url, type){
            var query = "INSERT OR REPLACE INTO session_media VALUES (?,?,?)";
            $cordovaSQLite.execute(db, query, [$scope.session.id, url, type]).then(function(res){

            }, function(err){
                console.error(err);
            });
        };

        var enregistrerImage = function(options){
            $cordovaCamera.getPicture(options).then(function(imageURI) {
                $scope.session.photos.push(imageURI);
                savePhoto(imageURI);
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
            var query = "DELETE from session_photos where  id = ? and url = ?";
            $cordovaSQLite.execute(db, query, [$scope.session.id, photo]).then(function(res){
                $scope.session.photos.splice($scope.session.photos.indexOf(photo), 1);
            }, function(err){
                console.error(err);
            });
        };

        $scope.openActionSheet = function(photo){
            var options = {
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

    }]);