const {Sequelize,Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });
var multer = require('multer');
const db = require('../../models');

//user Create
const {CompanyRecord,CompanyUser,UsersRight,Supplier,Customer,Expense,PaymentMethod} = require('../../models/index');

exports.create_expense = async (req,res,next)=>{
    try {
        //add company
        let expense = await Expense.create({
            expenseName : req.body.expenseName.trim(),
            expenseDescription : req.body.expenseDescription.trim(),
            expenseAmount : req.body.expenseAmount,
            expenseDate : req.body.expenseDate,
            expenseTime : req.body.expenseTime,
            companyId : req.userData.companyId,
            regBy : req.userData.id,
            updatedBy : req.userData.id
        });

        if(expense){
            return res.status(201).json({
                message:'Created',
                expense:expense
            });
        }
        return res.status(406).json({
            message:'Fail'
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error.name
        });
    }
}

exports.create_payment_method = async (req,res,next)=>{
    try {
        //add payment method
        let {paymethod, created} = await PaymentMethod.findOrCreate({
            where:{
                payType : req.body.payType.trim().toUppercase()
            },
            defaults:{
                payType : req.body.payType.trim().toUppercase(),
                companyId : req.userData.companyId,
                regBy : req.userData.id,
                updatedBy : req.userData.id
            }
        });

        if(paymethod){
            return res.status(201).json({
                message:'Created',
                paymethod:paymethod
            });
        }
        return res.status(406).json({
            message:'Fail'
        });
    } catch (error) {
        return res.status(500).json({
            message:'Fail',
            error:error.name
        });
    }
}