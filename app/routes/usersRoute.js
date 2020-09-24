const express = require('express');
const router = express.Router();

const checkAuth = require ('../middlewares/check-auth');
const usersControlllers = require('../controllers/usersController');

router.post('/newcompany', usersControlllers.create_new_company);
router.post('/login', usersControlllers.user_login);
router.post('/addmoreuser', checkAuth, usersControlllers.add_user_to_company);
router.post('/addsupplier', checkAuth, usersControlllers.add_new_supplier);
router.post('/addcustomer', checkAuth, usersControlllers.add_new_customer);
router.patch('/updatepassword', checkAuth, usersControlllers.change_password);
router.delete('/suppliers/delete', checkAuth, usersControlllers.delete_supplier);
router.patch('/suppliers/update', checkAuth, usersControlllers.update_supplier);

module.exports = router;