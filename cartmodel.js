var Mongoose = require('mongoose')
var Schema = Mongoose.Schema

var cartSchema= new Schema({
    email:{type:String,required:true},
    pname:{type:String,require:true},
    image:{type:String,required:true},
    quantity:{type:Number,default:1},
    price:{type:Number,required:true},
    pid:{type:Number,required:true}
})
module.exports = Mongoose.model('cart',cartSchema)