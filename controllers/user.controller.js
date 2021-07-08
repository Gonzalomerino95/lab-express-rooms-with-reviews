const User = require("../models/User.model");
const mongoose = require("mongoose");
//const passport = require("passport");

module.exports.registerNewUser = (req, res, next) => {
    res.render("registrationForm")
}

module.exports.doRegisterNewUser = (req, res, next) => {
    //comprobación de usuario existente 
    User.findOne({email:req.body.email})
        .then((user) => {
            if(!user){
                console.log(req.body)
                User.create(req.body)
                    .then(() => {
                        res.redirect('/')
                    })
                    .catch(e => {
                        if(e instanceof mongoose.Error.ValidationError){
                            console.log(e)
                            res.render("registrationForm", { user: req.body, errors: e.errors })
                        } else {
                            next(e);
                        }
                    })
                }

            else{
                res.render("registrationForm", { user: req.body, errors: { email: "There is already an account using this email" } })   
            }          
                
        })
        .catch(e=> next(e))
}

module.exports.login = (req, res, next) => {
    res.render("login")
}