const express = require('express');
const router = express.Router();

const checkAuth = require ('../middlewares/check-auth');
const transactionsControllers = require('../controllers/transactionsController');


router.post('/addexpense', checkAuth, transactionsControllers.create_expense);
router.post('/addpaymethod', checkAuth, transactionsControllers.create_payment_method);
// router.post('/addsupplier', checkAuth, usersControlllers.add_new_supplier);
// router.post('/addcustomer', checkAuth, usersControlllers.add_new_customer);
// router.patch('/updatepassword', checkAuth, usersControlllers.change_password);

module.exports = router;