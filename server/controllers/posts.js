import mongoose from "mongoose";
import express from 'express';
import PostMessage from "../models/postMessage.js";

const router = express.Router();
export const getPosts = async(req, res) => {
    // Your logic here
    try{
        const postMessage =await PostMessage.find();
        res.status(200).json(postMessage);
    }catch(error){
        res.status(404).json({message : error.message});
    }
    console.log("this is working antha raa babu")
};

export const creatorPost = async (req, res) => {
    const body = req.body;

    const newPost = new PostMessage(body);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    console.log("new post created")
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    console.log(_id);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, { new: true });
        console.log(updatePost);
        res.json(updatedPost);
    } catch (error) {
        res.status(500).send(` ${error.message} Something went wrong`);
    }
    console.log("hai ra update");
};

export const deletePost=async (req,res) => {
    const {id} =req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }
    await PostMessage.findByIdAndDelete(id);
    console.log("post delected")
    res.json({message:'post delected successfully'});
    
    
}

export const  likePost=async(req,res)=>{
    const {id} =req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }
    const post =await PostMessage.findById(id);
    const updatedPost=await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});
    console.log("this post is liked ")

    res.json(updatedPost);


}

export default router;