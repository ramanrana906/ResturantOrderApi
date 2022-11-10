const {User,validate}= require("../models/User" )
const Order = require('../models/Order');
const { Query } = require("mongoose");

module.exports.Create = async function(req,res){


    try{

        let user = await User.findById(req.params.id);

        console.log(user.name);

        let order = await Order.create({
            sub_total: req.body.sub_total,
            phonenumber:req.body.phonenumber,
            user: user
        });
        res.status(201).send({
                data: {
                    order: order
                },
                message: "Order created!"
            });
        


    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    console.log(error);
    }
  





}


module.exports.show = async function(req,res){

try{
    
        let user = req.params.id;
        var query  = Order.where({ user: req.params.id }); 
    let orders = await query.find({});
        
    

    return res.json(200, {
        message: "List of Orders",
        orders: orders
    })

       
      } catch (err) {
        console.log(`Error creating all  : ${err}`);
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }



}