var mongoose = require('mongoose')

// var userSchema = new mongoose.Schema({
//     name : String,
//     email: String,
//     password :String,
//     phone : Number,
//     city : String,
//     dob : String,
//     role : String,
//     gender : String,
//     status: String,
//     state:String,
//     interest:String,
//     journey:String,
//     expectations:String,
//     photoname:String,
//     isupdate:String,
// })
var userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    phone : Number,
    city : String,
    dob : String,
    role : String,
    gender : String,
    status: String,
    state:String,
    interest:String,
    journey:String,
    expectations:String,
    githubid:String,
    photoname:String,
    isupdate:String,
    ownedcomm : [{type : mongoose.Schema.Types.ObjectId , ref : 'communities'}],
    joincomm :  [{type : mongoose.Schema.Types.ObjectId , ref : 'communities'}],
    asktojoincomm : [{type : mongoose.Schema.Types.ObjectId , ref : 'communities'}],
})

let instance =  mongoose.model('users',userSchema);
//module.exports = mongoose.model('user',userSchema);
module.exports = instance;