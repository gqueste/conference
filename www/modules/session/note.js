angular.module('conf.session')
    .controller('noteController', ['$scope', '$sce', '$cordovaSQLite', function($scope, $sce, $cordovaSQLite){

        var db = $cordovaSQLite.openDB({ name: "conference.db" });

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
                }, function(err){
                    console.error(err);
                });
            }, function(err){
                console.error(err);
            });
        };


        $scope.session = app.navi.getCurrentPage().options.session;
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
        }

    }]);