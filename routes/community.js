const express = require('express')
const router = express.Router()
const logger = require('../middlewares/logger')



router.get('/communityPanel',logger,function(req,res){
    res.render('communitypanel',{obj : req.session.data});
})

router.get('/addCommunitySwitch',logger,function(req,res){
    res.render('addcommunityswitch',{obj : req.session.data});
})

module.exports = router