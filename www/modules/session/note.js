angular.module('conf.session')
    .controller('noteController', ['$scope', '$sce', '$cordovaSQLite', '$cordovaCamera', function($scope, $sce, $cordovaSQLite, $cordovaCamera){
        $scope.session = app.navi.getCurrentPage().options.session;
        $scope.session.photos = [];

        var db = $cordovaSQLite.openDB({ name: "conference.db" });

        var loadPhotos = function(){
            var query = "CREATE TABLE IF NOT EXISTS session_photos (id text, url text)";
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
        }

    }]);