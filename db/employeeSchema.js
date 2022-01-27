const mongoose=require('mongoose');
const empSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("empdata",empSchema);