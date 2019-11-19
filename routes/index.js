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

// login route
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


//CHANGE PASSWORD OPERATION
router.post('/editpassword',function (req,res)
{
    serverobject = req.body;
    if(serverobject.oldp!=req.session.data.password)
    {
       res.send("INCORRECT OLD PASSWORD");
    }
    else {
       instance.updateOne({ "_id" : req.session.data._id} , { $set: { "password" : serverobject.newp }} , function(error,result)
       {
           if(error)
           throw error;
           else {
               req.session.data.password = serverobject.newp
               console.log(req.session.data.password);
               res.send("PASSWORD CHANGED");
           }
       })
       //res.send("PASSWORD CHANGED");
    }
})

// Logout route
router.get('/exit',function(req,res){
    req.session.data.isLogin = 0;
    req.session.destroy();
    res.redirect('/');
})

router.post('/getpaginationtable',function (req, res) {
    // console.log(req.body);
    // console.log(req.body.order[0].column);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    var count;

    if(req.body.order[0].column==0)
    {
      if(req.body.order[0].dir=="asc")
      getdata("email",1);
      else
      getdata("email",-1);
    }
    else if(req.body.order[0].column==1)
    {
      if(req.body.order[0].dir=="asc")
      getdata("phone",1);
      else
      getdata("phone",-1);
    }
    else if(req.body.order[0].column==2)
    {
      if(req.body.order[0].dir=="asc")
      getdata("city",1);
      else
      getdata("city",-1);
    }
    else if(req.body.order[0].column==3)
    {
      if(req.body.order[0].dir=="asc")
      getdata("status",1);
      else
      getdata("status",-1);
    }
    else if(req.body.order[0].column==4)
    {
      if(req.body.order[0].dir=="asc")
      getdata("role",1);
      else
      getdata("role",-1);
    }

    else {
      getdata("email",1);
    }


    function getdata(colname,sortorder)
    {
        instance.countDocuments(function(e,count){
          var start=parseInt(req.body.start);
          var len=parseInt(req.body.length);
          var role=req.body.role;
          var status=req.body.status;
          var search=req.body.search.value;
          var getcount=10;
         // console.log(req.body.search.value.length);


        var findobj={};
          console.log(role,status);
          if(role!="all")
             { findobj.role=role;
             }
          else{
              delete findobj["role"];
          }
          if(status!="all")
              {findobj.status=status;}
          else{
              delete findobj["status"];
          }
          if(search!='')
              findobj["$or"]= [{
              "email":  { '$regex' : search, '$options' : 'i' }
          }, {
              "city": { '$regex' : search, '$options' : 'i' }
          }
          ,{
              "status":  { '$regex' : search, '$options' : 'i' }
          }
          ,{
              "role": { '$regex' : search, '$options' : 'i' }
          }]
          else{
              delete findobj["$or"];
          }


          instance.find(findobj).countDocuments(function(e,coun){
          getcount=coun;
        }).catch(err => {
          console.error(err)
          res.send(err)
        })

          instance.find(findobj).skip(start).limit(len).sort({[colname] : sortorder})
          .then(data => {
              res.send({"recordsTotal" : count,"recordsFiltered" :getcount,data})
            })
            .catch(err => {
              console.error(err)
            //  res.send(error)
            })
        });
      }
});

module.exports = router