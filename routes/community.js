const express = require('express')
const router = express.Router()
const logger = require('../middlewares/logger')
const instance  = require('../models/user')
const comminstance = require('../models/community')


router.get('/communityPanel',logger,function(req,res){
    res.render('communitypanel',{obj : req.session.data});
})

router.get('/addCommunitySwitch',logger,function(req,res){
    res.render('addcommunityswitch',{obj : req.session.data});
})

// app.get('/userSearch',logger,function(req,res){
//     res.render('usersearch',{obj : req.session.data});
// })
router.get('/communitySearch',logger,function(req,res){
    res.render('communitysearch',{obj : req.session.data});
})


router.get('/manageCommunity/:pro',logger,function(req,res){
    var aid = req.params.pro;
    comminstance.findOne({"_id" : aid} ,function(error,result){
        if(error)
        throw error;
        else {
            res.render('managecommunity',{ objcomm : result , obj : req.session.data });
        }
    })
})

router.get('/discussions/:pro',logger,function(req,res){
    var aid = req.params.pro;
    comminstance.findOne({"_id" : aid} ,function(error,result){
        if(error)
        throw error;
        else {
            res.render('discussion',{ objcomm : result , obj : req.session.data });
        }
    })
})

router.get('/communityMembers/:pro',logger,function(req,res){
    var aid = req.params.pro;
    comminstance.findOne({"_id":aid},function(error,result){
        if(error)
        throw error;
        else
        {
            res.render('communitymembers',{objcomm:result,obj:req.session.data});
        }
    })
})

router.get('/communityProfile/:pro',logger,function(req,res){

    var aid = req.params.pro;
    comminstance.findOne({"_id" : aid} ,function(error,result){
        if(error)
        throw error;
        else {
            res.render('communityprofile',{ objcomm : result , obj : req.session.data });
        }
    })

})

module.exports = router