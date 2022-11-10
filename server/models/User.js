const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require("joi-password-complexity");




const userSchema = new mongoose.Schema({
    name:{
        type:'String',
        required:'true'
    },
    phonenumber:{
        type:'Number',
        required:'true'
    },
    password:{
        type:'String',
        required:'true'
    }, orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
    
})

userSchema.methods.generateAuthtoken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"});
    return token;
};

const User = mongoose.model("User",userSchema);

const validate =(data) =>{
    const schema = joi.object({
        name:joi.string().required().label("name"),
        phonenumber:joi.string().required().label("phonenumber"),
        password:passwordComplexity().required().label("password")
    })
    return schema.validate(data);
}

module.exports ={User,validate};