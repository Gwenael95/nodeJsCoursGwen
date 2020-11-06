const Router = require('express').Router
const router = Router()

const controllers = require('./controllers')
const { checkAuth, reqAuth } = require('./middlewares')

router.get('/resources/:id', controllers.resources.getResource)
router.post('/resources', controllers.resources.postResource)
router.put('/resources/:id', controllers.resources.replaceResource)
router.patch('/resources/:id', controllers.resources.patchResource)
router.delete('/resources/:id', controllers.resources.deleteResource)

/* Auth section */
router.post('/auth/register', controllers.auth.postRegister)
router.post('/auth/login', controllers.auth.postLogin)
router.get('/auth/me', checkAuth, reqAuth, controllers.auth.getMe)

module.exports = router