const express = require('express')
const router = express.Router()

// login router
router.get('/',(req,res)=>{
    // res.send("STARTING WEB AGain")

    res.render('loginPage')
})

module.exports = router