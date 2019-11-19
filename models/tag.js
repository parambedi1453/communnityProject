var mongoose = require('mongoose')

var tagSchema = new mongoose.Schema({
    tagname : String,
    createdby : String,
    createdate : String,
    deleteaction : String
})

module.exports =  mongoose.model('tags',tagSchema);