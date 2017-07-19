//var myApp = angular.module('blogApp', ['ngRoute']);

myApp.config( [ '$routeProvider', function ( $routeProvider ) {
  $routeProvider
    .when( '/', {
      // location of the template
      templateUrl: 'views/index-view.html',
      // Which controller it should use
      controller: 'mainController',
      // what is the alias of that controller.
      controllerAs: 'myMatch'
    } )
    .when( '/2015-2016/:matchDay/:team1/:team2/:score1/:score2/:date', {
      templateUrl: 'views/match-view.html',
      controller: 'singleMatchController',
      controllerAs: 'mySingleMatch'
    } )
    .when( '/2016-2017/:matchDay/:team1/:team2/:score1/:score2/:date', {
      templateUrl: 'views/match-view.html',
      controller: 'singleMatchController',
      controllerAs: 'mySingleMatch'
    } )
    .when( '/statistics', {
      templateUrl: 'views/statistics.html',
      controller: 'mainController',
      controllerAs: 'myMatch'
    } )

  .otherwise( {
    //redirectTo:'/'
    template: '<h1>404 page not found</h1>'
  } );
} ] );
