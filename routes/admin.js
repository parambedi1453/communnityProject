const express = require('express')
const router = express.Router()
const logger = require('../middlewares/logger')
const instance = require('../models/user')


router.get('/profilePage',logger,(req,res) =>{

    res.render('profile',{obj : req.session.data});

})

module.exports = router
