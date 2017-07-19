// first we have to declare the module. note that [] is where we will declare the dependecies later. Right now we are leaving it blank
var myApp = angular.module( 'leagueApp', [ 'ngRoute' ] );

myApp.controller( 'mainController', [ '$http', function ( $http ) {

  var main = this;

  this.games;
  this.gamesNext;
  this.temp1;
  this.temp2;
  this.index1 = 0;
  this.index2 = 0;
  this.index3 = 0;
  this.index4 = 0;
  this.teamsList;

  this.baseUrl =
    'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  this.nextUrl =
    'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';

  this.loadMatches = function () {
    $http( {
      method: 'GET',
      url: main.baseUrl
    } ).then( function successCallback( response ) {

      main.games = response.data;
      console.log( main.games );

    }, function errorCallback( response ) {

      alert( "some error occurred. Check the console." );
      console.log( response );

    } );

  }

  this.loadNextMatches = function () {
    $http( {
      method: 'GET',
      url: main.nextUrl
    } ).then( function successCallback( response ) {

      main.gamesNext = response.data;
      console.log( main.gamesNext );

    }, function errorCallback( response ) {

      alert( "some error occurred. Check the console." );
      console.log( response );

    } );

  }

  this.teams = new Set();

  this.teamNames = function () {
    $http( {
      method: 'GET',
      url: main.nextUrl
    } ).then( function successCallback( response ) {
      main.temp1 = response.data;

      for ( i in main.temp1[ 'rounds' ] ) {

        for ( j in main.temp1[ 'rounds' ][ i ][ 'matches' ] ) {

          main.teams.add( main.temp1[ 'rounds' ][ i ][ 'matches' ][
              j
            ]
            [
              'team1'
            ][ 'name' ] );
          main.teams.add( main.temp1[ 'rounds' ][ i ][ 'matches' ][
              j
            ]
            [
              'team2'
            ][ 'name' ] );

        }
      }

    } );

  }

  this.nextTeamNames = function () {
    $http( {
      method: 'GET',
      url: main.baseUrl
    } ).then( function successCallback( response ) {
      main.temp2 = response.data;

      for ( i in main.temp2[ 'rounds' ] ) {

        for ( j in main.temp2[ 'rounds' ][ i ][ 'matches' ] ) {

          main.teams.add( main.temp2[ 'rounds' ][ i ][ 'matches' ][
              j
            ]
            [
              'team1'
            ][ 'name' ] );
          main.teams.add( main.temp2[ 'rounds' ][ i ][ 'matches' ][
              j
            ]
            [
              'team2'
            ][ 'name' ] );

        }
      }

      main.teamsList = Array.from( main.teams );

      for ( var k = 0; k < 20; k++ ) {
        for ( i in main.temp2[ 'rounds' ] ) {

          for ( j in main.temp2[ 'rounds' ][ i ][ 'matches' ] ) {
            if ( main.teamsList[ k ] == main.temp2[ 'rounds' ][ i ]
              [ 'matches' ][ j ][ 'team2' ][ 'name' ] ) {
              main.matchCount[ k ]++;
              main.totalGoals[ k ] = main.totalGoals[ k ] + main.temp1[
                  'rounds' ][ i ]
                [ 'matches' ][ j ][ 'score2' ];
              if ( main.temp2[ 'rounds' ][ i ]
                [ 'matches' ][ j ][ 'score2' ] > main.temp2[
                  'rounds' ][ i ]
                [ 'matches' ][ j ][ 'score1' ] ) {
                main.wonCount[ k ]++;
              } else {
                main.lostCount[ k ]++;
              }
            }
            if ( main.teamsList[ k ] == main.temp2[ 'rounds' ][ i ]
              [ 'matches' ][ j ][ 'team1' ][ 'name' ] ) {
              main.matchCount[ k ]++;
              main.totalGoals[ k ] = main.totalGoals[ k ] + main.temp1[
                  'rounds' ][ i ]
                [ 'matches' ][ j ][ 'score1' ];
              if ( main.temp2[ 'rounds' ][ i ]
                [ 'matches' ][ j ][ 'score1' ] > main.temp2[
                  'rounds' ][ i ]
                [ 'matches' ][ j ][ 'score2' ] ) {
                main.wonCount[ k ]++;
              } else {
                main.lostCount[ k ]++;
              }
            }
          }
        }
      }
      for ( var k = 0; k < 20; k++ ) {
        for ( i in main.temp1[ 'rounds' ] ) {

          for ( j in main.temp1[ 'rounds' ][ i ][ 'matches' ] ) {
            if ( main.teamsList[ k ] == main.temp1[ 'rounds' ][ i ]
              [ 'matches' ][ j ][ 'team2' ][ 'name' ] ) {
              main.matchCount[ k ]++;
              main.totalGoals[ k ] = main.totalGoals[ k ] + main.temp1[
                  'rounds' ][ i ]
                [ 'matches' ][ j ][ 'score2' ];
              if ( main.temp1[ 'rounds' ][ i ]
                [ 'matches' ][ j ][ 'score2' ] > main.temp1[
                  'rounds' ][ i ]
                [ 'matches' ][ j ][ 'score1' ] ) {
                main.wonCount[ k ]++;
              } else {
                main.lostCount[ k ]++;
              }
            }
            if ( main.teamsList[ k ] == main.temp1[ 'rounds' ][ i ]
              [ 'matches' ][ j ][ 'team1' ][ 'name' ] ) {
              main.matchCount[ k ]++;
              main.totalGoals[ k ] = main.totalGoals[ k ] + main.temp1[
                  'rounds' ][ i ]
                [ 'matches' ][ j ][ 'score1' ];
              if ( main.temp1[ 'rounds' ][ i ]
                [ 'matches' ][ j ][ 'score1' ] > main.temp1[
                  'rounds' ][ i ]
                [ 'matches' ][ j ][ 'score2' ] ) {
                main.wonCount[ k ]++;
              } else {
                main.lostCount[ k ]++;
              }
            }
          }
        }
      }

    } );

  }

  this.loadMatches();
  this.teamNames();
  this.loadNextMatches();
  this.nextTeamNames();

  this.years = [ '2015', '2016', '2017' ];
  this.selectedYear;
  this.scores1 = [ null, '0', '1', '2', '3' ];
  this.scores2 = [ null, '0', '1', '2', '3' ];
  this.selectedScore1;
  this.selectedScore2;
  this.selectedTeam;
  this.matchCount = new Array( 20 );
  this.wonCount = new Array( 20 );
  this.lostCount = new Array( 20 );
  this.totalGoals = new Array( 20 );
  for ( var i = 0; i < 20; i++ ) {
    this.matchCount[ i ] = 0;
    //console.log( this.matchCount[ i ] );
    this.wonCount[ i ] = 0;
    //console.log( this.wonCount[ i ] );
    this.lostCount[ i ] = 0;
    //console.log( this.lostCount[ i ] );
    this.totalGoals[ i ] = 0;
    //console.log( this.totalGoals[ i ] );
  }
  /*for ( var i = 0; i < 20; i++ ) {
    console.log( this.teamsList[ i ] );
  }*/
  //console.log( this.teamsList );

} ] ); // end controller



myApp.controller( 'singleMatchController', [ '$http', '$routeParams', function (
  $http, $routeParams ) {

  this.team1 = $routeParams.team1;
  this.team2 = $routeParams.team2;
  this.score1 = $routeParams.score1;
  this.score2 = $routeParams.score2;
  this.date = $routeParams.date;
  this.matchDay = $routeParams.matchDay;

  console.log( this.team1 );
  console.log( this.team2 );
  console.log( this.score1 );
  console.log( this.score2 );
  console.log( this.date );
  console.log( this.matchDay );

} ] ); // end controller
