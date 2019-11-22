var mongoose = require('mongoose')

var discussionSchema = new mongoose.Schema({

    dtitle : String,
    ddetail:String,
    downer : String,
    ddate:String,
    dtag:String,
    commid : [{type : mongoose.Schema.Types.ObjectId, ref:'communities'}],
    dcomment:[{type : mongoose.Schema.Types.ObjectId,ref :'comments'}]
})

let dinstance = mongoose.model('discussions',discussionSchema)
module.exports = dinstance