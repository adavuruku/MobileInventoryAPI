const {Sequelize,Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });
var multer = require('multer');
const db = require('../../models');

//generating webtoken
const token = (user) =>{
    return jwt.sign({
        user:user
    },
   'SherifAdavurukuApp');
}
//user Create
const {CompanyRecord,CompanyUser,UsersRight,Supplier,Customer} = require('../../models/index');

exports.create_new_company = async (req,res,next)=>{
    const t = await db.sequelize.transaction();
    // try {
        //add company
        let company = await CompanyRecord.create({
            companyName : req.body.companyName.trim(),
            companyAddress : req.body.companyAddress.trim(),
            companyPhone : req.body.companyPhone.trim(),
            companyEmail : req.body.companyEmail.trim().toLowerCase(),
            companyState : req.body.companyState.trim(),
            companyLocalGov : req.body.companyLocalGov.trim()
        },{transaction:t});

        if(company){
            //add user
            let hash = await bcrypt.hash("user",10)
            let userExist = await CompanyUser.findOne({ where: {userName: req.body.userName.trim()}})
            if(!userExist && hash){
               let user = await CompanyUser.create(
                    {
                        companyId : company.id,
                        userFullName : req.body.userFullName.trim(),
                        userAddress : req.body.userAddress.trim(),
                        userEmail : req.body.userEmail.trim().toLowerCase(),
                        userPhone : req.body.userPhone.trim(),
                        userPassword : hash,
                        userName : req.body.userName.trim()
                    },{transaction:t});
                if(user){
                    //add useRight
                    const tokenValue = token(user)
                    let userRight = await UsersRight.create(
                        {
                                userId:user.id,
                                regBy:user.id,
                                updatedBy:user.id,
                                pos:true,adduser:true,suppliers:true,customers:true,
                                products:true,settings:true,
                                expense:true,debtors:true,creditors:true,reports:true,
                                companyId : company.id
                        },{transaction: t});
                    if(userRight){
                        await t.commit();
                        return res.status(201).json({
                            message:'Created',
                            token:tokenValue,
                            company:company,
                            user:user,
                            userRight:userRight
                        });
                    }
                }
            }
                
        }

        await t.rollback();
        return res.status(406).json({
            message:'User Already Exist !!'
        });

    // } catch (error) {
    //     await t.rollback();
    //     return res.status(500).json({
    //         message:'Fail',
    //         error:error.name
    //     });
    // }
}

exports.user_login = async (req,res,next)=>{
    try {
        //check if username exist
        const user = await CompanyUser.findOne({ 
            where: { 
                [Op.and]: [
                    { userName: req.body.userName.trim() },
                    { userActive: true }
                  ]
            }
        });
        
        if(user){
            const hash = await bcrypt.compare(req.body.userPassword.trim(),user.userPassword)
            if(hash){
                const company = await user.getCompany();
                const supplier =  await company.getSupplier();
                const customer =  await company.getCustomer();
                if(company.companyActive){
                    const userRight = await user.getRight();
                    const tokenValue = token(user)
                    return res.status(201).json({
                        message:'Found',
                        token:tokenValue,
                        user:user,
                        company:company,
                        supplier:supplier,
                        customer:customer,
                        right:userRight
                    });
                } 
            }
            
        }
        return res.status(401).json({
            message:'Record Not Found'
        });
    }catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }

}

exports.add_user_to_company = async (req,res,next)=>{
    const t = await db.sequelize.transaction();
    try {
        let hash = await bcrypt.hash("user",10)
        let userExist = await CompanyUser.findOne({ where: {userName: req.body.userName.trim()}})
        if(!userExist && hash){
            let user = await CompanyUser.create(
                {
                    companyId : req.userData.companyId,
                    userFullName : req.body.userFullName.trim(),
                    userAddress : req.body.userAddress.trim(),
                    userEmail : req.body.userEmail.trim().toLowerCase(),
                    userPhone : req.body.userPhone.trim(),
                    userPassword : hash,
                    userName : req.body.userName.trim()
                },{transaction:t});
                if(user){
                    //add useRight
                    let userRight = await UsersRight.create(
                        {
                                userId:user.id,
                                regBy:user.id,
                                updatedBy:user.id,
                                pos:true
                        },{transaction: t});
                    if(userRight){
                        await t.commit();
                        return res.status(201).json({
                            message:'Created',
                            user:user,
                            userRight:userRight
                        });
                    }
                }
        }
        
        await t.rollback();
        return res.status(406).json({
            message:'User Already Exist !!'
        });
    } catch (error) {
        await t.rollback();
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}

exports.add_new_supplier = async (req,res,next)=>{
    try {
        let newSupplier = await Supplier.create(
            {
                companyId : req.userData.companyId,
                supplierName : req.body.supplierName.trim(),
                supplierAddress : req.body.supplierAddress.trim(),
                supplierEmail : req.body.supplierEmail.trim().toLowerCase(),
                supplierPhone : req.body.supplierPhone.trim(),
                supplierState : req.body.supplierState.trim(),
                supplierLocalGov : req.body.supplierLocalGov.trim(),
                regBy : req.userData.id,
                updatedBy : req.userData.id
            });
            if(newSupplier){
                return res.status(201).json({
                    message:'Created',
                    supplier:newSupplier
                });
            }
        return res.status(406).json({
            message:'Fail'
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}

exports.add_new_customer = async (req,res,next)=>{
    try {
        let customerPhone = req.body.customerPhone? req.body.customerPhone.trim() : null
        let customerEmail = req.body.customerEmail? req.body.customerEmail.trim().toLowerCase() : null
        let customerAddress = req.body.customerAddress? req.body.customerAddress.trim() : null

        let newCustomer = await Customer.create(
            {
                companyId : req.userData.companyId,
                customerName : req.body.customerName.trim(),
                customerAddress : customerAddress,
                customerEmail : customerEmail,
                customerPhone : customerPhone,
                regBy : req.userData.id,
                updatedBy : req.userData.id
            });
            if(newCustomer){
                return res.status(201).json({
                    message:'Created',
                    customer:newCustomer
                });
            }
        return res.status(406).json({
            message:'Fail'
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}

exports.change_password = async (req,res,next)=>{
    try {
        let userExist = await CompanyUser.findByPk(req.userData.id)
        const company = await userExist.getCompany();
        if(userExist && userExist.userActive && company.companyActive){
            const hashCompare = await bcrypt.compare(req.body.oldPassword.trim(),userExist.userPassword)
            if(hashCompare){
                let hash = await bcrypt.hash(req.body.newPassword.trim(),10)
                const updatedPassword = await userExist.update({
                    userPassword : hash,
                    changePassword:true
                })
                if(updatedPassword){
                    return res.status(201).json({
                        message:'Updated',
                        user:userExist
                    });
                }
            }else{
                return res.status(406).json({
                    message:'Previous Password Is Invalid'
                });
            }
            
        }

        return res.status(406).json({
            message:'Fail'
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}