angular.module('starter.routes', ['starter.config'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, USER_ROLES) {
  $stateProvider

  //INTRO
  
  .state('app', {
    url: "/app",
    abstract: true,
    cache: false,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl'
  })

  
  .state('app.login', {
    url: "/login",
    cache: false,

    views: {
      'menuContent': {
        templateUrl: "views/app/auth/login.html",
        controller: 'LoginCtrl'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.visiteur_role]
    }
  })
  .state('app.signup', {
    url: "/signup",

    views: {
      'menuContent': {
        templateUrl: "views/app/auth/signup.html",
        controller: 'SignupCtrl'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.visiteur_role]
    }
  })

 

  .state('app.forgot-password', {
    url: "/forgot-password",
    templateUrl: "views/app/auth/forgot-password.html"
  })


  //MISCELLANEOUS

  .state('app.profile', {
    url: "/profile",

    views: {
      'menuContent': {
        templateUrl: "views/app/profile.html",
        controller: 'ProfileCtrl'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.voyageur_role]
    }
  })
  .state('app.reclamation', {
    url: "/reclamation",

    views: {
      'menuContent': {
        templateUrl: "views/app/reclamation/reclamation.html",
        controller: 'ReclamationCtrl'
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.voyageur_role]
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
  })
    //Recherche

  .state('app.recherche', {
    url: "/recherche",
    views: {
      'menuContent': {
        templateUrl: "views/app/recherche/recherche.html",
        controller: 'RechercheCtrl'
        }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/station');
});
