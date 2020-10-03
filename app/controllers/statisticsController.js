const {Sequelize,Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });
var multer = require('multer');
const db = require('../../models');

//user Create
const {CompanyRecord,CompanyUser,UsersRight,Debtor,ProductGroup,ProductCosting,OtherIncome,
    MeasureType, Expense,PaymentMethod,Customer, Creditor, Product,SellingType, Supplier} = require('../../models/index');
    

exports.expenseotherincome = async (req,res,next)=>{
    // console.log(req.body)
    let expense = await Expense.findAll({
        where:{
            [Op.and]:[
                {expenseActive: true},
                {companyId:req.userData.companyId}
            ]
        }
    })

    if(expense){
        return res.status(201).json({
            message:'Found',
            expense:expense
        }); 
    }
    return res.status(406).json({
        message:'Fail'
    });

}

exports.usersandright = async (req,res,next)=>{
    let users = await CompanyUser.findAll({
        where:{
            [Op.and]:[
                {userActive: true},
                {companyId:req.userData.companyId}
            ]
        },
        include:{
            model:UsersRight,
            as: 'right',
        }
    })

    if(users){
        return res.status(201).json({
            message:'Found',
            users:users
        }); 
    }
    return res.status(406).json({
        message:'Fail'
    });

}

exports.sellingconfig = async (req,res,next)=>{
    let paymentMethod = await PaymentMethod.findAll({
        where:{
            [Op.and]:[
                {isActive: true},
                {companyId:req.userData.companyId}
            ]
        }
    })
    
    let measureType = await MeasureType.findAll({
        where:{
            [Op.and]:[
                {isActive: true},
                {companyId:req.userData.companyId}
            ]
        }
    })

    let sellingType = await SellingType.findAll({
        where:{
            [Op.and]:[
                {isActive: true},
                {companyId:req.userData.companyId}
            ]
        }
    })

    if(sellingType && measureType && paymentMethod){
        return res.status(201).json({
            message:'Found',
            paymentMethod:paymentMethod,
            measureType:measureType,
            sellingType:sellingType
        }); 
    }
    return res.status(406).json({
        message:'Fail'
    });

}

exports.creditdebt = async (req,res,next)=>{
    let creditor = await Creditor.findAll({
        where:{
            [Op.and]:[
                {creditActive: true},
                {companyId:req.userData.companyId}
            ]
        }
    })

    let debtor = await Debtor.findAll({
        where:{
            [Op.and]:[
                {debtActive: true},
                {companyId:req.userData.companyId}
            ]
        }
    })

    let otherincome = await OtherIncome.findAll({
        where:{
            [Op.and]:[
                {incomeActive: true},
                {companyId:req.userData.companyId}
            ]
        }
    })

    if(creditor && debtor && otherincome){
        return res.status(201).json({
            message:'Found',
            creditors:creditor,
            debtors:debtor,
            otherincome:otherincome
        }); 
    }
    return res.status(406).json({
        message:'Fail'
    });

}

exports.suppliercustomer = async (req,res,next)=>{
    let customer = await Customer.findAll({
        where:{
            [Op.and]:[
                {customerActive: true},
                {companyId:req.userData.companyId}
            ]
        }
    })

    let supplier = await Supplier.findAll({
        where:{
            [Op.and]:[
                {supplierActive: true},
                {companyId:req.userData.companyId}
            ]
        }
    })

    if(supplier && customer){
        return res.status(201).json({
            message:'Found',
            supplier:supplier,
            customer:customer
        }); 
    }
    return res.status(406).json({
        message:'Fail'
    });

}
// exports.expenseotherincome = async (req,res,next)=>{
//     try {
//         const company = await CompanyRecord.findOne({
//             where:{id: req.userData.companyId},
//             include: [
//                 {
//                     model:Supplier,
//                     as: 'supplier',
//                     required:false,
//                     where: {supplierActive: true}
//                 },
//                 {
//                     model:CompanyUser,
//                     as: 'users',
//                     where: {userActive: true},
//                     include:{
//                         model:UsersRight,
//                         as: 'right',
//                     }
//                 },
//                 {
//                     model:Customer,
//                     as: 'customer',
//                     required:false,
//                     where: {customerActive: true}
//                 },
//                 {
//                     model:PaymentMethod,
//                     as: 'paytype',
//                     required:false,
//                     where: {isActive: true}
//                 },
//                 {
//                     model:MeasureType,
//                     as: 'measuretype',
//                     required:false,
//                     where: {isActive: true}
//                 },
//                 {
//                     model:SellingType,
//                     as: 'sellingtype',
//                     required:false,
//                     where: {isActive: true}
//                 },
//                 {
//                     model:Expense,
//                     as: 'expense',
//                     required:false,
//                     where: {expenseActive: true}
//                 },
//                 {
//                     model:Creditor,
//                     as: 'creditors',
//                     required:false,
//                     where: {creditActive: true}
//                 },
//                 {
//                     model:Debtor,
//                     as: 'debtors',
//                     required:false,
//                     where: {debtActive: true}
//                 }
//             ]
            
//         })
//         if(company){
//             return res.status(201).json({
//                 message:'Found',
//                 company:company
//             }); 
//         }
//         return res.status(406).json({
//             message:'Fail'
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message:'Fail',
//             error:error.name
//         });
//     }
// }