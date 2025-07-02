const mongoose =require('mongoose');
const otpschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{type:Date,default:Date.now,index:{expires:120}}
})


module.exports=otpmodel=mongoose.model('otpmodel', otpschema)