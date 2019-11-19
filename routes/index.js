const express = require('express')
const router = express.Router()
const logger = require('../middlewares/logger')
const instance = require('../models/user')
const nodemailer = require('nodemailer')
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


//create new user route
router.post('/createuser',function(req,res){
    // console.log(req.body);
    instance.create(req.body,function(error,result){
        if(error)
        throw error;
        else {
            console.log(result);
            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.MAILER_ID,
            pass: process.env.MAILER_PASSWORD
            }
            });

            var mailOptions = {
                from: 'parambedi1453@gmail.com',
                to: req.body.email,
                subject: 'This Mail Is From CQ',
                text: 'Hi you are enrolled to cq with username'+req.body.email+'and password'+req.body.password
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            console.log(result)
            res.send(result)
            }
            });
        }
    })

})

module.exports = router