var Mongoose = require('mongoose')
var Schema = Mongoose.Schema

var hotelsschema = new Schema({
    name:{type:String,required:true},
    city:{type:String,required:true},
    acrooms:{type:Number,default:0},
    nonacroom:{type:Number,default:10},
    address:{type:String},
    category:{type:Number,required:true},
    reviews:{type:String},
    wifi:{type:Boolean,deafult:false},
    vehicle:{type:Boolean,default:false},
    cost:{type:Number},
    id:{type:Number,required:true,unique:true}


})
module.exports= Mongoose.model('hotel',hotelsschema)