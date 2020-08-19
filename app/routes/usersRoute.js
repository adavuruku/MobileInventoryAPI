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


// router.post('/create', usersControlllers.create_new_user);
// router.post('/login', usersControlllers.login_user);

// //follow someone
// router.get('/createfollow',checkAuth, usersControlllers.create_following);
// //unfollow someone
// router.get('/unfollow',checkAuth, usersControlllers.unfollow_user);
// //people you are following
// router.get('/following',checkAuth, usersControlllers.list_following);
// //people following you
// router.get('/followers',checkAuth, usersControlllers.list_followers);

// //updating users record
// router.patch('/updateuser',checkAuth, usersControlllers.users_update_information);
// router.patch('/changeprofileimage',checkAuth, usersControlllers.users_update_profileImage); 
// router.patch('/changecoverimage',checkAuth, usersControlllers.users_update_coverImage);

//export the servlet to the server
module.exports = router;