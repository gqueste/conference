angular.module('conf.savedData', [])
    .factory('savedDataService', function($cordovaSQLite, $q){

        var db = undefined;

        return {
            loadMedia : loadMedia,
            loadNotes : loadNotes,
            insertNote : insertNote,
            insertMedia : insertMedia,
            deleteMedia : deleteMedia,
            saveMark : saveMark,
            getMark : getMark,
            getFavorites : getFavorites,
            addFavorite : addFavorite,
            isInFavorites : isInFavorites,
            removeFavorite : removeFavorite
        };

        function createFavorites(){
            return $q(function(resolve, reject){
               openDB();
               var query = "CREATE TABLE IF NOT EXISTS session_favorites (id text primary key)";
               $cordovaSQLite.execute(db, query, []).then(function(res){
                    resolve(res);
               }, function(err){
                    reject(err);
               });
            });
        }

        function openDB(){
            if(db === undefined){
                db = $cordovaSQLite.openDB({ name: "conference.db" })
            }
        }

        function loadMedia(session_id){
            return $q(function(resolve, reject){
                openDB();
                var query = "CREATE TABLE IF NOT EXISTS session_media (id text, url text primary key, type text)";
                $cordovaSQLite.execute(db, query, []).then(function(res){
                    var selectQuery = "SELECT * from session_media where id=?";
                    $cordovaSQLite.execute(db, selectQuery, [session_id]).then(function(res){
                        resolve(res);
                    }, function(err){
                        reject(err);
                    });
                }, function(err){
                    reject(err);
                });
            });
        }

        function loadNotes(session_id){
            return $q(function(resolve, reject){
                openDB();
                var query = "CREATE TABLE IF NOT EXISTS session_notes (id text primary key, notes text)";
                $cordovaSQLite.execute(db, query, []).then(function(res){
                    var selectQuery = "SELECT * from session_notes where id=?";
                    $cordovaSQLite.execute(db, selectQuery, [session_id]).then(function(res){
                        resolve(res);
                    }, function(err){
                        reject(err);
                    });
                }, function(err){
                    reject(err);
                });
            });
        }

        function insertNote(session_id, notes){
            openDB();
            var query = "INSERT OR REPLACE INTO session_notes VALUES (?,?)";
            $cordovaSQLite.execute(db, query, [session_id, notes]).then(function(res){
            }, function(err){
                console.error(err);
            });
        }

        function insertMedia(session_id, url, type){
            openDB();
            var query = "INSERT OR REPLACE INTO session_media VALUES (?,?,?)";
            $cordovaSQLite.execute(db, query, [session_id, url, type]).then(function(res){
            }, function(err){
                console.error(err);
            });
        }

        function deleteMedia(session_id, photo){
            return $q(function(resolve, reject){
                openDB();
                var query = "DELETE from session_media where  id = ? and url = ?";
                $cordovaSQLite.execute(db, query, [session_id, photo]).then(function(res){
                    resolve(res);
                }, function(err){
                    reject(err);
                });
            });
        }

        function getMark(session_id){
            return $q(function(resolve, reject){
                openDB();
                var query = "CREATE TABLE IF NOT EXISTS session_mark (id text primary key, mark text)";
                $cordovaSQLite.execute(db, query, []).then(function(res){
                    var selectQuery = "SELECT * from session_mark where id=?";
                    $cordovaSQLite.execute(db, selectQuery, [session_id]).then(function(res){
                        resolve(res);
                    }, function(err){
                        reject(err);
                    });
                }, function(err){
                    reject(err);
                });
            });
        }

        function saveMark(session_id, mark){
            return $q(function(resolve, reject){
                openDB();
                var query = "INSERT OR REPLACE INTO session_mark VALUES (?,?)";
                $cordovaSQLite.execute(db, query, [session_id, mark]).then(function(res){
                    resolve(res);
                }, function(err){
                    reject(err);
                });
            });
        }

        function getFavorites(){
            return $q(function(resolve, reject){
                createFavorites().then(function(){
                    var selectQuery = "SELECT * from session_favorites";
                    $cordovaSQLite.execute(db, selectQuery, []).then(function(res){
                        resolve(res);
                    }, function(err){
                        reject(err);
                    });
                }, function(err){
                    reject(err);
                });
            });
        }

        function addFavorite(session_id){
            return $q(function(resolve, reject){
                openDB();
                var query = "INSERT OR REPLACE INTO session_favorites VALUES (?)";
                $cordovaSQLite.execute(db, query, [session_id]).then(function(res){
                    resolve(res);
                }, function(err){
                    reject(err);
                });
            });
        }

        function isInFavorites(session_id){
            return $q(function(resolve, reject){
                createFavorites().then(function(){
                    var selectQuery = "SELECT * from session_favorites where id = ?";
                    $cordovaSQLite.execute(db, selectQuery, [session_id]).then(function(res){
                        resolve(res);
                    }, function(err){
                        reject(err);
                    });
                }, function(err){
                    reject(err);
                });
            });
        }

        function removeFavorite(session_id){
            return $q(function(resolve, reject){
                openDB();
                var query = "DELETE from session_favorites where  id = ?";
                $cordovaSQLite.execute(db, query, [session_id]).then(function(res){
                    resolve(res);
                }, function(err){
                    reject(err);
                });
            });
        }
    });