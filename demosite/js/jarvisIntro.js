var jarvisIntro = angular.module('jarvisIntro',[]);

//routes section
jarvisIntro.config(function ($routeProvider) {
        $routeProvider
        .when('/',{
                controller:'rootCtrl',
                templateUrl: 'views/intro.html'
        })
        .when('/Tutorial',{
                controller:'rootCtrl',
                templateUrl: 'views/tutorial.html'
        })
        .when('/Why',{
                controller:'rootCtrl',
                templateUrl: 'views/why.html'
        })
        .when('/Api',{
                controller:'rootCtrl',
                templateUrl: 'views/api.html'
        })
        .otherwise({redirectTo:'/'});
});


// controlers section
var controllers = {};

controllers.rootCtrl = function ($scope) {
        $scope.users = [
                {id:"1",firstName:"dean",lastName:"shub"},
                {id:"2",firstName:"lior",lastName:"bentov"},
                {id:"3",firstName:"yotam",lastName:"roth"},
                {id:"4",firstName:"shirit",lastName:"vaxman"},
                {id:"5",firstName:"talya",lastName:"ronen"}];
};

controllers.navbarCtrl = function ($scope) {
        $scope.links = [
                {title:"Intro"},
                {title:"Why"},
                {title:"Tutorial"},
                {title:"Api"}];
};

jarvisIntro.controller(controllers);