const express = require("express")
const {UserModel} = require("../model/user.model")
const bcrypt = require("bcrypt")

const userRoute = express.Router()

//Register
userRoute.post("/register", async (req, res)=>{
    const {name, email, password} = req.body;
    try {
        bcrypt.hash(password, 5,async (err, securePassword)=>{
            if(err){
                console.log(err);
                res.send("Something went wrong")
            }else{
                let user = new UserModel({name, email, password: securePassword})
                await user.save()
                res.status(201).send("User has been successfully registered");
            }
        })
    } catch (error) {
        console.log(error);
        res.send("User Register failed", {message: error})
    }
})

//login
userRoute.post("/login", async (req,res)=>{
    const {email, password} = req.body
    try {
        let user = await UserModel.findOne({email});
        let hash_pass = user?.password;
        console.log(user);
        if(!user){
            res.send("Please Register First")
        }else{
            bcrypt.compare(password, hash_pass, (err, result)=>{
                if(result){
                    res.status(201).send("User Login Success")
                }else{
                    console.log(err);
                    res.send("Something went wrong", {message: err})
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.send("User Login failed", {message: error})
    }
})

module.exports = {userRoute}

