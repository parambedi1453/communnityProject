var mongoose = require('mongoose')


var communitySchema = new mongoose.Schema({
    commname : String,
    commrule : String,
    commlocation : String,
    commowner : String,
    // commpic : {type : String, default : ""}
    commpic : String,
    commdesc : String,
    commdate :String,
    commstatus : String,
    ownerid : {type : mongoose.Schema.Types.ObjectId , ref : 'users'},
    memberno : Number,
    commjoin : [{type : mongoose.Schema.Types.ObjectId , ref : 'users'}],
    commasktojoin : [{type : mongoose.Schema.Types.ObjectId , ref : 'users'}],
    comminvite : [{type : mongoose.Schema.Types.ObjectId , ref : 'users'}],
    commdiscussion :  { type : Array , "default" : [] },
})

let comminstance = mongoose.model('communities', communitySchema);
module.exports = comminstance