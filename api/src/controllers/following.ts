import { Request, Response } from "express";

import Following from "../models/Following";
import FollowingServices from '../services/following';

export const createFollwingController = async (req: Request, res: Response) => {
    try {
        const newFollowing = new Following({
            userId: req.params.userId,
            followingId: req.body.followingId,
        })

        const status = await FollowingServices.createFollwing(newFollowing)
            
        if(status){
            res.json({
                message: 'added to the following'
            })
        }
        else{
            res.json({
                message: 'already exist in following'
            })
        }
        
    } catch (error) {
        console.log(error)
    }
};

export const getUserFollowingsController = async(
    req: Request,
    res: Response,
) => {
    try {
        const userId= req.params.userId;
        const following = await FollowingServices.getUserFollowings(userId)
        
        res.json(following)
    } catch (error) {

        console.log(error)
        
    }
};

export const getUserFollowersController = async(
    req: Request,
    res: Response,
) => {
    try {
        const userId = req.params.userId;
        const followers = await FollowingServices.getUserFollowers(userId)
        
        res.json(followers)
    } catch (error) {
        console.log(error)
    }
}