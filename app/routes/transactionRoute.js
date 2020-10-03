const express = require('express');
const router = express.Router();

const checkAuth = require ('../middlewares/check-auth');
const transactionsControllers = require('../controllers/transactionsController');


router.post('/addexpense', checkAuth, transactionsControllers.create_expense);
router.patch('/deleteexpense', checkAuth, transactionsControllers.delete_expense);
router.patch('/expense/update', checkAuth, transactionsControllers.update_expense);

router.post('/adddebt', checkAuth, transactionsControllers.create_debt);
router.patch('/debt/update', checkAuth, transactionsControllers.update_debt);
router.patch('/deletedebt', checkAuth, transactionsControllers.delete_debt);

router.post('/addcredit', checkAuth, transactionsControllers.create_credit);
router.patch('/deletecredit', checkAuth, transactionsControllers.delete_credit);
router.patch('/credit/update', checkAuth, transactionsControllers.update_credit);

router.post('/addotherincome', checkAuth, transactionsControllers.create_other_income);
router.patch('/deleteotherincome', checkAuth, transactionsControllers.delete_other_income);
router.patch('/otherincome/update', checkAuth, transactionsControllers.update_other_income);

router.post('/addpaymethod', checkAuth, transactionsControllers.create_payment_method);
router.post('/addmeasure', checkAuth, transactionsControllers.create_measure_type);
router.post('/addselling', checkAuth, transactionsControllers.create_selling_type);
router.post('/addproductgroup', checkAuth, transactionsControllers.create_product_group);

router.post('/addproduct', checkAuth, transactionsControllers.create_product);
router.get('/allstatistics', checkAuth, transactionsControllers.all_statistic);
router.get('/allproducts', checkAuth, transactionsControllers.all_product_statistic);
// router.post('/addsupplier', checkAuth, usersControlllers.add_new_supplier);
// router.post('/addcustomer', checkAuth, usersControlllers.add_new_customer);
// router.patch('/updatepassword', checkAuth, usersControlllers.change_password);

module.exports = router;