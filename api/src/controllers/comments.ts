import { Request, Response } from "express";

import CommentServices from '../services/comments';
import Comment from "../models/Comments";

export const createCommentController = async (req: Request, res: Response) => {
    try {
        const newComment = new Comment({
            comment: req.body.comment,
            userId: req.params.userId,
            productId: req.body.productId,
            parentCommentId: req.body.parentCommentId

        });
        const comment = await CommentServices.createComment(newComment);
        res.json(comment)
    } catch (error) {
        console.log(error);
    }
};


export const getParentCommentByProductIdController = async(
    req: Request,
    res: Response,
) => {
    try {
        const productId = req.params.productId;
        const comments = await CommentServices.getFirstCommentByProductId(productId);

        
        res.json(comments)
    } catch (error) {
        console.log(error);
    }
}

export const getCommentByParentIdController = async(
    req: Request,
    res: Response,
) =>{
    try {
        const parentId = req.params.parentId;
        const comments = await CommentServices.getCommentByParentId(parentId);
        
        res.json(comments)
    } catch (error) {
        console.log(error)
    }
}


export const getCommentByProductIdController = async(
    req: Request,
    res: Response,
) => {
    try {
        const productId = req.params.productId;
        const comments = await CommentServices.getCommentByProductId(productId);

        
        res.json(comments)
    } catch (error) {
        console.log(error);
    }
}