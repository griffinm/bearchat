/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const SessionnsController = () => import('#controllers/sessions_controller')

router.resource('sessions', SessionnsController)
