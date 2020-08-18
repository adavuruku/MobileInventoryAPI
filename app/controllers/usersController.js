const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var multer = require('multer');
const db = require('../../models');

//generating webtoken
const token = (email, id) =>{
    return jwt.sign({
        email:email,
        userId: id
    },
    process.env.MY_HASH_SECRET);
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
            if(userExist){
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
                                pos:true,suppliers:true,customers:true,
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


exports.add_user_to_company = async (req,res,next)=>{
    try {
        //search to be username dont exist

        const hash = await bcrypt.hash("user",10)
        if(hash){

            const {user, created} = await CompanyUser.findOrCreate(
                {
                    userName:req.body.userName.trim()
                },
                {
                    companyId : req.body.companyId.trim(),
                    userFullName : req.body.userFullName.trim(),
                    userAddress : req.body.userAddress.trim(),
                    userEmail : req.body.userEmail.trim().toLowerCase(),
                    userPhone : req.body.userPhone.trim(),
                    userPassword : hash,
                    userName : req.body.userName.trim()
                }
            );
            if(created){
                return res.status(201).json({
                    message:'Created',
                    user:user
                });
            }else{
                return res.status(406).json({
                    message:'UserName Already Exist !!'
                });
            }
        }

    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error
        });
    }
}