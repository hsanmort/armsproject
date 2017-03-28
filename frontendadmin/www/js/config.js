angular.module('starter.config', [])
.constant('WORDPRESS_API_URL', 'https://wordpress.startapplabs.com/blog/api/')

.constant('GCM_SENDER_ID', '574597432927')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
  admin: 'admin_role',
  adminvoyage: 'admin_role',
  adminpaiement: 'adminpayrole_role',
  guichetier: 'guichetier_role',
  chefsecteur: 'chefsecteur_role'
})

.constant('API_ENDPOINT', {
  url: 'http://127.0.0.1:3000/'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
})
