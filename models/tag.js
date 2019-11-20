var mongoose = require('mongoose')

var tagSchema = new mongoose.Schema({
    tagname : String,
    createdby : String,
    createdate : String,
    deleteaction : String
})

let taginstance = mongoose.model('tags',tagSchema);

module.exports =  taginstance