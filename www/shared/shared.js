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
                    $http.get('./data/devfest-2015.json').
                    success(function(result, status, headers, config) {
                        data = result;
                        resolve(data);
                    }).
                    error(function(result, status, headers, config) {
                        reject(result);
                    });
                }
            });
        }
    }]);