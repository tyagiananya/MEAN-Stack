var Mongoose= require('mongoose')
var Schema=Mongoose.Schema

var productschema =  new Schema({
    pname:{required:true,type:String},
    price:{required:true,type:Number},
    company:{type:String,required:true},
    image:{type:String},  
    pid:{type:Number,unique:true,required:true},
    category:{type:String,required:true},
    quantity:{type:Number,default:10},
    rating:{type:Number,default:4},
    reviews:{type:String,default:0},
    seller:{type:String,required:true}
    
})
module.exports = Mongoose.model('product',productschema)