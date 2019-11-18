module.exports = function(req,res,next){

    console.log("In Logger Function")
    if(req.session.isLogin)
    {
        next()
    }
    else
    {
        res.redirect('/loginPage')
    }
}