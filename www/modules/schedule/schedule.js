angular.module('conf.schedule',[])
    .controller('scheduleController', function(dataService, $scope){
        $scope.hours = [];
        $scope.sessions = [];

        dataService.getData().then(function(res){
            $scope.hours = res.hours;
            $scope.sessions = res.sessions;
        }, function(err){
            console.log(err);
        });

        $scope.goToSessionDetail = function(session){
            var object = {session : session};
            app.navi.pushPage('modules/session/session.html', object);
        };

        $scope.getHour = function(hour){
            return hour.hourStart + ":" + hour.minStart;
        };

        $scope.getDuration = function(hour){
            var start = parseInt(hour.hourStart) * 60 + parseInt(hour.minStart);
            var end = parseInt(hour.hourEnd) * 60 + parseInt(hour.minEnd);
            var duration = end - start;
            var min = duration%60 === 0 ? "00" : duration%60;
            return Math.floor(duration/60) + "h" + min;
        }


    });