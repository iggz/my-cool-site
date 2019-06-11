const express = require('express'),
  router = express.Router();

const UsersControllers = require('../controllers/users');

/* GET users listing. */
router.get('/', UsersControllers.index_get);

router.get('/signup', UsersControllers.signup_get);

router.post('/signup', UsersControllers.signup_post);

router.get('/login', UsersControllers.login_get);

router.post('/login', UsersControllers.login_post);

router.get('/logout', UsersControllers.logout_get);

module.exports = router;