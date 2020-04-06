

const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Event=new Schema({
   title:{
       type:String
   },
   desc:{
    type:String
},
   image_link:{
       type:String
   },
   speakers:Array

   /*
   {
       name,
       image_link
   }
   */,
   agenda:Array,
   going_counter:{
       type:Number,
       default:0
   }

   /*
     title,
     desc
   */

})


module.exports=mongoose.model("Event",Event)