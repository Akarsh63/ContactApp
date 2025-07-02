const mongoose =require('mongoose');

const contactsschema=new mongoose.Schema({
    contactname:{
        type:String,
        required:true
    },
    contactnumber:{
         type:Number,
         required:true
    },
    contactemail:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "usersmodel"
    }
})


module.exports=contactsmodel=mongoose.model("contactsmodel",contactsschema)