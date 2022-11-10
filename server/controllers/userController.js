const {User,validate}= require("../models/User" )
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken')



module.exports.login = async function(req,res){
    

try{

    const {error}= validate(req.body);
    if(error){
        return res.status(400).send({message:error.details[0].message});
    }
    const user = await User.findOne({phonenumber:req.body.phonenumber});

    if(!user){
        return res.status(401).send({message:"Invalid number or password"})
    }

    const validPassword = await bcrypt.compare(
        req.body.password,user.password
    );
    if(!validPassword){
        return res.status(401).send({message:"Invalid number or password"})
    }

    const token = await user.generateAuthtoken();
    
    res.status(200).send({data:token,message:"Logged in Succesfully"});

   

}
catch(error){
    res.status(500).send({message:"Internal Server Error"});
    console.log(error);
}






}

module.exports.register = async function(req,res){

   
    try{
        const{error}=validate(req.body);
        if(error){
          
            return res.status(400).send({message:error.details[0].message});
        }
        const user = await User.findOne({phonenumber:req.body.phonenumber});
        if(user){
            return res.status(409).send({message:"User already exists"})
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,salt);

            await new User ({...req.body,password:hashPassword}).save();

            res.status(201).send({message:"User Created Successfully"});
            
            return res.redirect('/');
    }
    catch(error){
        res.status(500).send({message:"Internal Server Error"});

    }

 


}
