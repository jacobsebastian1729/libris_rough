import Following, {FollowingDocument} from "../models/Following";



const createFollwing = async (following: FollowingDocument): Promise<boolean> => {
    const findUserId = await Following.findOne({ userId: following.userId });
    const findFollowingId = await Following.findOne({ followingId: following.followingId });
  
    if (findUserId && findFollowingId) {
      return false;
    }
    await following.save();
    return true;
  };


const getUserFollowings = async (userId: string): Promise<FollowingDocument[]> => {
    return Following.find({userId: userId}).populate('followingId', 'email').exec()
}

const getUserFollowers = async (userId: string): Promise<FollowingDocument[]> => {
    return Following.find({followingId: userId}).populate('userId', 'email')
}


export default { getUserFollowings, getUserFollowers, createFollwing}