const express = require('express');
const router = express.Router();

const checkAuth = require ('../middlewares/check-auth');
const statisticsControllers = require('../controllers/statisticsController');


router.get('/expenseotherincome', checkAuth, statisticsControllers.expenseotherincome);
router.get('/usersandright', checkAuth, statisticsControllers.usersandright);
router.get('/sellingconfig', checkAuth, statisticsControllers.sellingconfig);
router.get('/creditdebt', checkAuth, statisticsControllers.creditdebt);
router.get('/suppliercustomer', checkAuth, statisticsControllers.suppliercustomer);

// router.post('/adddebt', checkAuth, transactionsControllers.create_debt);

// router.post('/addcredit', checkAuth, transactionsControllers.create_credit);
// router.patch('/deletecredit', checkAuth, transactionsControllers.delete_credit);

// router.post('/addpaymethod', checkAuth, transactionsControllers.create_payment_method);
// router.post('/addmeasure', checkAuth, transactionsControllers.create_measure_type);
// router.post('/addselling', checkAuth, transactionsControllers.create_selling_type);
// router.post('/addproductgroup', checkAuth, transactionsControllers.create_product_group);

// router.post('/addproduct', checkAuth, transactionsControllers.create_product);
// router.get('/allstatistics', checkAuth, transactionsControllers.all_statistic);
// router.get('/allproducts', checkAuth, transactionsControllers.all_product_statistic);
// router.post('/addsupplier', checkAuth, usersControlllers.add_new_supplier);
// router.post('/addcustomer', checkAuth, usersControlllers.add_new_customer);
// router.patch('/updatepassword', checkAuth, usersControlllers.change_password);

module.exports = router;