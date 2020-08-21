const express = require('express');
const router = express.Router();

const checkAuth = require ('../middlewares/check-auth');
const transactionsControllers = require('../controllers/transactionsController');


router.post('/addexpense', checkAuth, transactionsControllers.create_expense);
router.post('/addpaymethod', checkAuth, transactionsControllers.create_payment_method);
router.post('/addmeasure', checkAuth, transactionsControllers.create_measure_type);
router.post('/addselling', checkAuth, transactionsControllers.create_selling_type);
router.post('/addproduct', checkAuth, transactionsControllers.create_product);
// router.post('/addsupplier', checkAuth, usersControlllers.add_new_supplier);
// router.post('/addcustomer', checkAuth, usersControlllers.add_new_customer);
// router.patch('/updatepassword', checkAuth, usersControlllers.change_password);

module.exports = router;