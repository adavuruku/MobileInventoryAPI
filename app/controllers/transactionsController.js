const {Sequelize,Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });
var multer = require('multer');
const db = require('../../models');

//user Create
const {CompanyRecord,CompanyUser,UsersRight,Debtor,ProductGroup,ProductCosting,
    MeasureType, Expense,PaymentMethod,Customer, Creditor, Product,SellingType, Supplier} = require('../../models/index');

//create expenses
exports.create_expense = async (req,res,next)=>{
    try {
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

//create debt
exports.create_debt = async (req,res,next)=>{
    try {
        let debt = await Debtor.create({
            debtorName : req.body.debtorName.trim(),
            debtorPhone : req.body.debtorPhone.trim(),
            debtDescription : req.body.debtDescription.trim(),
            debtAmount : req.body.debtAmount,
            debtDate : req.body.debtDate,
            debtTime : req.body.debtTime,
            companyId : req.userData.companyId,
            regBy : req.userData.id,
            updatedBy : req.userData.id
        });

        if(debt){
            return res.status(201).json({
                message:'Created',
                debt:debt
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

//create credit
exports.create_credit = async (req,res,next)=>{
    try {
        let credit = await Creditor.create({
            creditorName : req.body.creditorName.trim(),
            creditorPhone : req.body.creditorPhone.trim(),
            creditDescription : req.body.creditDescription.trim(),
            creditAmount : req.body.creditAmount,
            creditDate : req.body.creditDate,
            creditTime : req.body.creditTime,
            companyId : req.userData.companyId,
            regBy : req.userData.id,
            updatedBy : req.userData.id
        });

        if(credit){
            return res.status(201).json({
                message:'Created',
                credit:credit
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

//create payment method
exports.create_payment_method = async (req,res,next)=>{
    try {
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

//create measure types
exports.create_measure_type = async (req,res,next)=>{
    try {
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

//create selling types
exports.create_selling_type = async (req,res,next)=>{
    try {
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

//create product groups
exports.create_product_group= async (req,res,next)=>{
    try {
        let productgroupExit = await ProductGroup.findOne({
            where:{
                [Op.and]:[
                    {groupTitle:req.body.groupTitle.trim().toUpperCase()},
                    {companyId:req.userData.companyId}
                ]
            }
        })
        
        if(!productgroupExit){
            let productGroup = await ProductGroup.create({
                groupTitle : req.body.groupTitle.trim().toUpperCase(),
                companyId : req.userData.companyId,
                regBy : req.userData.id,
                updatedBy : req.userData.id
            });
            if(productGroup){
                return res.status(201).json({
                    message:'Created',
                    productGroup:productGroup
                });
            }
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

exports.all_statistic = async (req,res,next)=>{
    try {
        const company = await CompanyRecord.findOne({
            where:{id: req.userData.companyId},
            include: [
                {
                    model:Supplier,
                    as: 'supplier',
                    required:false,
                    where: {supplierActive: true}
                },
                {
                    model:CompanyUser,
                    as: 'users',
                    where: {userActive: true},
                    include:{
                        model:UsersRight,
                        as: 'right',
                    }
                },
                {
                    model:Customer,
                    as: 'customer',
                    required:false,
                    where: {customerActive: true}
                },
                {
                    model:PaymentMethod,
                    as: 'paytype',
                    required:false,
                    where: {isActive: true}
                },
                {
                    model:MeasureType,
                    as: 'measuretype',
                    required:false,
                    where: {isActive: true}
                },
                {
                    model:SellingType,
                    as: 'sellingtype',
                    required:false,
                    where: {isActive: true}
                },
                {
                    model:Expense,
                    as: 'expense',
                    required:false,
                    where: {expenseActive: true}
                },
                {
                    model:Creditor,
                    as: 'creditors',
                    required:false,
                    where: {creditActive: true}
                },
                {
                    model:Debtor,
                    as: 'debtors',
                    required:false,
                    where: {debtActive: true}
                }
            ]
            
        })
        if(company){
            return res.status(201).json({
                message:'Found',
                company:company
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


exports.all_product_statistic = async (req,res,next)=>{
    try {
        const company = await CompanyRecord.findOne({
            where:{id: req.userData.companyId},
            include: [
                {
                    model:ProductGroup,
                    as: 'productgroups',
                    required:false,
                    where: {isActive: true},
                    include:{
                        model:Product,
                        as: 'products',
                        required:false,
                        where: {productActive: true},
                        include:{
                            model:ProductCosting,
                            as: 'productcost',
                            required:false
                        }
                    }
                }
            ]
        })
        if(company){
            return res.status(201).json({
                message:'Found',
                company:company
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