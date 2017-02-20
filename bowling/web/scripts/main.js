var app = angular.module("myapp",['ngRoute']);
 

app.config(function($routeProvider){
	//
	//$routeProvider.when('url', {templateUrl : '', controller : ''});
    
    /* Used ng-route because we nbow just have a view and we dont have a nested Views within
    *Flexible to use ui-router in case we have nested views in near future. 
    * 
    * 
    * */
	$routeProvider.when('/', {
        templateUrl : 'views/home.html',
        controller  : 'homeController'
    })
});