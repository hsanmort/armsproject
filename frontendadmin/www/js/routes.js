angular.module('starter.routes', ['starter.config'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, USER_ROLES) {
  $stateProvider

  //INTRO
  .state('auth', {
    url: "/auth",
    templateUrl: "views/auth/auth.html",
    abstract: true,
    controller: 'AuthCtrl'
  })

  .state('auth.walkthrough', {
    url: '/walkthrough',
    templateUrl: "views/auth/walkthrough.html"
  })

  .state('auth.login', {
    url: '/login',
    templateUrl: "views/auth/login.html",
    controller: 'LoginCtrl'
  })

  .state('auth.signup', {
    url: '/signup',
    templateUrl: "views/auth/signup.html",
    controller: 'SignupCtrl'
  })

  .state('auth.forgot-password', {
    url: "/forgot-password",
    templateUrl: "views/auth/forgot-password.html"
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl',
  })

  //MISCELLANEOUS

  .state('app.maps', {
    url: "/miscellaneous/maps",
    views: {
      'menuContent': {
        templateUrl: "views/app/miscellaneous/maps.html",
        controller: 'MapsCtrl'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.adminpaiement]
    }
  })
  // comptes de paiement
  .state('app.comptes', {
    url: "comptes_paiement/comptes",
    views: {
      'menuContent': {
        templateUrl: "views/app/comptes_paiement/comptes.html",
        controller: 'comptepayCtrl'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.adminpaiement]
    }
  })
  //Station

  .state('app.station', {
    url: "/station",
    views: {
      'menuContent': {
        templateUrl: "views/app/station/station.html",
        controller: 'StationCtrl'
        }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/walkthrough');
});
