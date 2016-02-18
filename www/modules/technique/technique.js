angular.module('conf.technique',[])
    .controller('techController',['$scope', '$cordovaDevice', '$cordovaNetwork', function($scope, $cordovaDevice, $cordovaNetwork){

        $scope.available = "";
        $scope.platform = "";
        $scope.version = "";
        $scope.uuid = "";
        $scope.cordova = "";
        $scope.model = "";
        $scope.manufacturer = "";
        $scope.connexion = "";

        document.addEventListener("deviceready", function () {
            $scope.available = $cordovaDevice.getDevice().available;
            $scope.platform = $cordovaDevice.getPlatform();
            $scope.version = $cordovaDevice.getVersion();
            $scope.uuid = $cordovaDevice.getUUID();
            $scope.cordova = $cordovaDevice.getCordova();
            $scope.model = $cordovaDevice.getDevice().model;
            $scope.manufacturer = $cordovaDevice.getDevice().manufacturer;
            $scope.connexion = $cordovaNetwork.getNetwork();
        }, false);

    }]);