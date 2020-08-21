const {Sequelize,Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });
var multer = require('multer');
const db = require('../../models');

//user Create
const {CompanyRecord,CompanyUser,UsersRight,Supplier,Customer,
    MeasureType, Expense,PaymentMethod, SellingType} = require('../../models/index');

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
        let paymethod = await PaymentMethod.create({
            payType : req.body.payType.trim().toUpperCase(),
            companyId : req.userData.companyId,
            regBy : req.userData.id,
            updatedBy : req.userData.id
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

exports.create_measure_type = async (req,res,next)=>{
    try {
        //add payment method
        let measure = await MeasureType.create({
            measureType : req.body.measureType.trim().toUpperCase(),
            companyId : req.userData.companyId,
            regBy : req.userData.id,
            updatedBy : req.userData.id
        });

        if(measure){
            return res.status(201).json({
                message:'Created',
                measure:measure
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

exports.create_selling_type = async (req,res,next)=>{
    try {
        //add payment method
        let sellingtype = await SellingType.create({
            sellingType : req.body.sellingType.trim().toUpperCase(),
            companyId : req.userData.companyId,
            regBy : req.userData.id,
            updatedBy : req.userData.id
        });

        if(sellingtype){
            return res.status(201).json({
                message:'Created',
                sellingtype:sellingtype
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

exports.create_product = async (req,res,next)=>{
    try {
        //add payment method
        let sellingtype = await SellingType.create({
            // productCode productDescription productImage productName totalStock reorderLevel
            // measureTypeId
            sellingType : req.body.sellingType.trim().toUpperCase(),
            companyId : req.userData.companyId,
            regBy : req.userData.id,
            updatedBy : req.userData.id
        });

        if(sellingtype){
            return res.status(201).json({
                message:'Created',
                sellingtype:sellingtype
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