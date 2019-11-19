const express = require('express')
const router = express.Router()
const logger = require('../middlewares/logger')
const instance = require('../models/user')


router.get('/profilePage',logger,(req,res) =>{

    res.render('profile',{obj : req.session.data});

})

router.get('/addUser',logger,function(req,res){
    res.render('adduser',{obj : req.session.data});
})


router.get('/changePassword',logger,function(req,res){
    res.render('changepassword',{obj : req.session.data})
})
module.exports = router