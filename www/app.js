var app = ons.bootstrap('conferenceApp', [
    'onsen',
    'conf.shared',
    'conf.home',
    'conf.session',
    'conf.speaker',
    'conf.about',
    'conf.technique',
    'ngCordova'
])
.config(function($compileProvider){
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
});