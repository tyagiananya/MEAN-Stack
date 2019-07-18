var Mongoose= require('mongoose')
var Schema=Mongoose.Schema

var userschema =  new Schema({
    name:{required:true,type:String},
    email:{required:true,unique:true,type:String},
    wallet:{type:Number, default:100},
    password:{required:true,type:String},
    profileimage:{type:String},
    phone:{unique:true,type:Number,required:true},
    isverified:{type:Boolean,default:false},
    role:{type:String,default:'user'},
    dob:{type:Date}
})
module.exports = Mongoose.model('user',userschema)