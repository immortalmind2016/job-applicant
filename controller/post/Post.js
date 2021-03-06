const Post=require("../../model/Post")
const {url} = require("../../config");
const uploadPost=(req,res,err)=>{
    new Post({
        ...req.body.data
    }).save((err,post)=>{
        if(err){
            return res.status(500).json({error:err})
        }
        res.json({post})
    })
}
const editPost=(req,res,err)=>{
    try{
        
        Post.updateOne({_id:req.params.id},{...req.body.data},(err,post)=>{
            res.json({post})
        })
    }catch(e){
        return res.status(500).json({error:e})
    }
}
const deletePost=(req,res,err)=>{
    try{
        Post.findOneAndDelete({_id:req.params.id},(err)=>{
            res.sendStatus(200)
        })
    }catch(e){
        return res.status(500).json({error:e})
    }

}

const getPost=(req,res,err)=>{
    try{
        Post.findOne({_id:req.body.data.id},(err,posts),(err,posts)=>{
            res.json({posts})
        })
    }catch(e){
        return res.status(500).json({error:e})
    }
 
}
const getPosts=(req,res,err)=>{
    
    try{
        Post.find({},(err,posts)=>{
            res.json({posts})
        }).limit(50)
    
    }catch(e){
        return res.status(500).json({error:e})
    }
}
const getMorePosts=(req,res,err)=>{

    try{
        Post.find({},(err,posts)=>{
            res.json({posts})
        }).skip(Number.parseInt(req.params.skip)).limit(5)
        
    
    }catch(e){
        return res.status(500).json({error:e})
    }
}

module.exports={
    uploadPost,editPost,deletePost,getPost,getPosts,getMorePosts

}
