const express = require('express')
const router = express.Router()
const logger = require('../middlewares/logger')
const instance = require('../models/user')
// login router
router.get('/',(req,res)=>{
    // res.send("STARTING WEB AGain")
    res.render('loginPage')
})


router.post('/login',function(req,res){
    console.log(req.body);
    instance.findOne({
        email : req.body.email,
        password : req.body.password
    })
    .then(data => {
        console.log(data)
        //res.send(data);
        if(data)
        {
            console.log("user is valid");

                req.session.isLogin=1;
                var ob = new Object();
                ob.name = data.name;
                ob.email = data.email;
                ob.password = data.password;
                ob.phone = data.phone;
                ob.city = data.city;
                ob.dob = data.dob;
                ob.role = data.role;
                ob.gender = data.gender;
                ob.status = data.status;
                ob.state  = data.state;
                ob.interest = data.interest;
                ob.journey = data.journey;
                ob.expectations = data.expectations;
                ob._id = data._id;
                ob.photoname = data.photoname;
                ob.isupdate = data.isupdate,
                req.session.data = ob;
                res.send(data);
        }
        else {
            res.send("INVALID USER");
        }

    })
    .catch(err => {
        console.error(err)
        res.send(err)
      })

})
module.exports = router