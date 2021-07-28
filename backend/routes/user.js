const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const passwordStrong = require('../middleware/passwordStrong');

router.post('/signup', passwordStrong, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;