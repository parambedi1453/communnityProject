var mongoose  = require('mongoose')

var commentSchema  = new mongoose.Schema({

    ctitle : String,
    cdate:String,
    cdel : String,
    cowner:String,
    discussionid : [{type : mongoose.Schema.Types.ObjectId , ref :'discussions'}],

})

let commentinstance  = mongoose.model('comments',commentSchema)
module.exports = commentinstance