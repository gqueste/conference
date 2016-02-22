angular.module('conf.shared', [])
    .controller('menuController', function(){

        var changePage = function(pageLocation) {
            console.log('changing location ', pageLocation);
            app.menu.setMainPage(pageLocation, {closeMenu: true});
        }


        this.goToSessions = function() { changePage('modules/session/sessions.html');}
        this.goToSpeakers = function() { changePage('modules/speaker/speakers.html');}
        this.goToHome = function() { changePage('modules/home/home.html');}
        this.goToTechniques = function() { changePage('modules/technique/techniques.html');}
        this.goToAbout = function() { changePage('modules/about/about.html');}
        this.goToFavorites = function() { changePage('modules/favorites/favorites.html');}
        this.goToSchedule = function() { changePage('modules/schedule/schedule.html');}

    })

    .factory('dataService', ['$http', '$q', function($http, $q) {

        var data;

        return {
            getData: getData
        };

        function getData() {
            return $q(function(resolve, reject){
                if(data != undefined){
                    resolve(data);
                }
                else {
                    var localData = window.localStorage['gdg'];
                    if(localData == undefined){
                        $http.get('./data/devfest-2015.json').
                        success(function(result, status, headers, config) {
                            data = result;
                            window.localStorage['gdg'] = JSON.stringify(data);
                            resolve(data);
                        }).
                        error(function(result, status, headers, config) {
                            reject(result);
                        });
                    }
                    else {
                        data = JSON.parse(window.localStorage['gdg']);
                    }
                }
            });
        }
    }]);