

const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Company_profile=new Schema({
    cover_image:{
        type:String,
        defualt:""
  
    },
    company_about:{type:String,default:""},
    subribe:{
      type:String,
      default:"None"
    },
    branding_video:{
      type:String
    },
    last_update:{
      type:Date,
      default:null
  },
    social_links:{
      type:Object,
      default:{
        facebook:String,
        twitter:String,
        insta:String,
        linkedin:String
      }
    },
    image:{
        type:String,
        default:null
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    subscribe:{
      type:Object,
      default:{
        count:Number
          ,
          type:"none"
      },   //0 for month , 1 for year
      period:Number,
  
      endDate:Date
    }
    
})


module.exports=mongoose.model("Company_profile",Company_profile)