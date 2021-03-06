const {Sequelize,Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });
var multer = require('multer');
const db = require('../../models');

//user Create
const {CompanyRecord,CompanyUser,UsersRight,Debtor,ProductGroup,ProductCosting,OtherIncome,
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

exports.delete_expense = async (req,res,next)=>{
    try {
        let expenseExist = await Expense.findByPk(req.body.expenseId)
        if(expenseExist && req.userData.companyId == expenseExist.companyId){
            const updatedExpense = await expenseExist.update({
                expenseActive:false,
                updatedBy:req.userData.id
            })
            if(updatedExpense){
                return res.status(201).json({
                    message:'Deleted',
                    expense:updatedExpense
                });
            }
        }
        return res.status(500).json({
            message:'Fail'
        });
    } catch (error) {
        return res.status(400).json({
            message:'Fail',
            error:error
        });
    }
}
exports.update_expense = async (req,res,next)=>{
    try {
        let expenseExist = await Expense.findByPk(req.body.expenseId)
        if(expenseExist && req.userData.companyId == expenseExist.companyId){
            const updatedExpense = await expenseExist.update({
                expenseName : req.body.expenseName.trim(),
                expenseDescription : req.body.expenseDescription.trim(),
                expenseAmount : req.body.expenseAmount,
                expenseDate : req.body.expenseDate,
                expenseTime : req.body.expenseTime,
                updatedBy : req.userData.id
            })
            if(updatedExpense){
                return res.status(201).json({
                    message:'Updated',
                    expense:updatedExpense
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
        console.log(error)
        return res.status(500).json({
            message:'Fail',
            error:error.name
        });
    }
}
exports.update_debt = async (req,res,next)=>{
    try {
        let debtExist = await Debtor.findByPk(req.body.debtId)
        if(debtExist && req.userData.companyId == debtExist.companyId){
            const updatedDebtor = await debtExist.update({
                debtorName : req.body.debtorName.trim(),
                debtorPhone : req.body.debtorPhone.trim(),
                debtDescription : req.body.debtDescription.trim(),
                debtAmount : req.body.debtAmount,
                debtDate : req.body.debtDate,
                debtTime : req.body.debtTime,
                updatedBy : req.userData.id
            })
            if(updatedDebtor){
                return res.status(201).json({
                    message:'Updated',
                    debt:updatedDebtor
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

exports.delete_debt = async (req,res,next)=>{
    try {
        let debtExist = await Debtor.findByPk(req.body.debtId)
        if(debtExist && req.userData.companyId == debtExist.companyId){
            const updatedDebtor = await debtExist.update({
                debtActive:false,
                updatedBy:req.userData.id
            })
            if(updatedDebtor){
                return res.status(201).json({
                    message:'Deleted',
                    debt:updatedDebtor
                });
            }
        }
        return res.status(500).json({
            message:'Fail'
        });
    } catch (error) {
        return res.status(400).json({
            message:'Fail',
            error:error
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

exports.update_credit = async (req,res,next)=>{
    try {
        let creditExist = await Creditor.findByPk(req.body.creditId)
        if(creditExist && req.userData.companyId == creditExist.companyId){
            const updatedCreditor = await creditExist.update({
                creditorName : req.body.creditorName.trim(),
                creditorPhone : req.body.creditorPhone.trim(),
                creditDescription : req.body.creditDescription.trim(),
                creditAmount : req.body.creditAmount,
                creditDate : req.body.creditDate,
                creditTime : req.body.creditTime,
                updatedBy : req.userData.id
            })
            if(updatedCreditor){
                return res.status(201).json({
                    message:'Updated',
                    creditor:updatedCreditor
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

exports.delete_credit = async (req,res,next)=>{
    try {
        let creditExist = await Creditor.findByPk(req.body.creditorId)
        if(creditExist && req.userData.companyId == creditExist.companyId){
            const updatedCreditor = await creditExist.update({
                creditActive:false,
                updatedBy:req.userData.id
            })
            if(updatedCreditor){
                return res.status(201).json({
                    message:'Deleted',
                    creditor:creditExist
                });
            }
        }
        return res.status(500).json({
            message:'Fail'
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:'Fail',
            error:error
        });
    }
}

//other incomes
exports.create_other_income = async (req,res,next)=>{
    try {
        let otherincome = await OtherIncome.create({
            incomeName : req.body.incomeName.trim(),
            incomeDescription : req.body.incomeDescription.trim(),
            incomeAmount : req.body.incomeAmount,
            incomeDate : req.body.incomeDate,
            incomeTime : req.body.incomeTime,
            companyId : req.userData.companyId,
            regBy : req.userData.id,
            updatedBy : req.userData.id
        });

        if(otherincome){
            return res.status(201).json({
                message:'Created',
                otherincome:otherincome
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
exports.delete_other_income = async (req,res,next)=>{
    try {
        let otherincomeExist = await OtherIncome.findByPk(req.body.otherIncomeId)
        if(otherincomeExist && req.userData.companyId == otherincomeExist.companyId){
            const updatedOtherIncome = await otherincomeExist.update({
                incomeActive:false,
                updatedBy:req.userData.id
            })
            if(updatedOtherIncome){
                return res.status(201).json({
                    message:'Deleted',
                    otherincome:updatedOtherIncome
                });
            }
        }
        return res.status(500).json({
            message:'Fail'
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:'Fail',
            error:error
        });
    }
}
exports.update_other_income = async (req,res,next)=>{
    try {
        let otherincomeExist = await OtherIncome.findByPk(req.body.otherIncomeId)
        if(otherincomeExist && req.userData.companyId == otherincomeExist.companyId){
            const updatedOtherIncome = await otherincomeExist.update({
                incomeName : req.body.incomeName.trim(),
                incomeDescription : req.body.incomeDescription.trim(),
                incomeAmount : req.body.incomeAmount,
                incomeDate : req.body.incomeDate,
                incomeTime : req.body.incomeTime,
                updatedBy:req.userData.id
            })
            if(updatedOtherIncome){
                return res.status(201).json({
                    message:'Updated',
                    otherincome:updatedOtherIncome
                });
            }
        }
        return res.status(500).json({
            message:'Fail'
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:'Fail',
            error:error
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
exports.delete_payment_method = async (req,res,next)=>{
    try {
        let itemExist = await PaymentMethod.findByPk(req.body.paymentTypeId)
        if(itemExist && req.userData.companyId == itemExist.companyId){
            const updateRecord = await itemExist.update({
                isActive:false,
                updatedBy:req.userData.id
            })
            if(updateRecord){
                return res.status(201).json({
                    message:'Deleted',
                    paymethod:updateRecord
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
exports.delete_selling_type = async (req,res,next)=>{
    try {
        let itemExist = await SellingType.findByPk(req.body.sellingTypeId)
        if(itemExist && req.userData.companyId == itemExist.companyId){
            const updateRecord = await itemExist.update({
                isActive:false,
                updatedBy:req.userData.id
            })
            if(updateRecord){
                return res.status(201).json({
                    message:'Deleted',
                    sellingtype:updateRecord
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
exports.delete_measure_type = async (req,res,next)=>{
    try {
        let itemExist = await SellingType.findByPk(req.body.measureId)
        if(itemExist && req.userData.companyId == itemExist.companyId){
            const updateRecord = await itemExist.update({
                isActive:false,
                updatedBy:req.userData.id
            })
            if(updateRecord){
                return res.status(201).json({
                    message:'Deleted',
                    measuretype:updateRecord
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
exports.delete_product_group = async (req,res,next)=>{
    try {
        let itemExist = await ProductGroup.findByPk(req.body.groupId)
        if(itemExist && req.userData.companyId == itemExist.companyId){
            const updateRecord = await itemExist.update({
                isActive:false,
                updatedBy:req.userData.id
            })
            if(updateRecord){
                return res.status(201).json({
                    message:'Deleted',
                    productGroup:updateRecord
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