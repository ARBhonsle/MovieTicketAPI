const { walletSchema } = require("../models/userWallet");
const {validateRegisterInput,
  validateLoginInput,}=require('../auth-util/validator')
var money;

const createWallet=()=>{
    money=100;
    return {
        walletMoney=money,
        id:user.id
    }
}

const addMoney=async(...props)=>{
    const {transactionAmount, user}=props;    
    return {
    money:money+transactionAmount,    
    id: user.id,
    }
}
const payTransaction=async(...props)=>{
    const {transactionAmount, user}=props;
    if(transactionAmount<money){
        console.log("Transaction running");
    }
    if(money<100){
        console.log("Add money");
        throw new Error("Money less than 100");
    }
    return {
        money:money,
        id:user.id,
    }
}

modules.export= {createWallet,addMoney,payTransaction}