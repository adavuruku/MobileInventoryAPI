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
const {CompanyRecord,CompanyUser,UsersRight} = require('../../models/index');

exports.create_new_company = async (req,res,next)=>{
    const t = await db.sequelize.transaction();
    try {
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
            let userExist = CompanyUser.findOne({ where: {userName: req.body.userName.trim()}})
            if(userExist && hash){
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

    } catch (error) {
        await t.rollback();
        return res.status(500).json({
            message:'Fail',
            error:error.name
        });
    }
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
        const hash = await bcrypt.compare(req.body.userPassword.trim(),user.userPassword)
        if(user && hash){
            const company = await user.getCompany();
            if(company.companyActive){
                const userRight = await user.getRight();
                const tokenValue = token(user)
                return res.status(201).json({
                    message:'Found',
                    token:tokenValue,
                    user:user,
                    company:company,
                    right:userRight
                });
            }else{
                return res.status(401).json({
                    message:'Record Not Found'
                });
            }
            
        }else{
            return res.status(401).json({
                message:'Record Not Found'
            });
        }
    }catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }

}

exports.add_user_to_company = async (req,res,next)=>{
    try {
        let hash = await bcrypt.hash("user",10)
        let userExist = CompanyUser.findOne({ where: {userName: req.body.userName.trim()}})
        if(userExist && hash){
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
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}