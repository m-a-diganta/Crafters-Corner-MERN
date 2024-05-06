const express = require('express');
const {check} = require('express-validator');

const router = express.Router();

const sellersController = require('../controllers/sellers-controller');
const customersController = require('../controllers/customers-controller');

router.get('/', sellersController.getSellers);

router.post('/signupSeller',[
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 6})
], sellersController.signupSeller );

router.post('/loginSeller', sellersController.loginSeller);
router.delete('/:sid', sellersController.deleteSeller);

module.exports = router;