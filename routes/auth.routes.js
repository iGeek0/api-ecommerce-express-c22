const { Router } = require('express');
const router = Router();
const {
    login,
    verify
} = require('../controllers/auth.controller');
const chkToken = require('../middlewares/auth.middleware');

router.post('/auth/login', login);
router.get('/auth/verify', chkToken ,verify);

module.exports = router;