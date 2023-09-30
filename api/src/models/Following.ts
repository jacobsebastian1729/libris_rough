import mongoose, {Document} from "mongoose";

export type FollowingDocument = Document & {
    userId: string;
    followingId:string;
    accept: boolean;
};

const FollowingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    accept: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model<FollowingDocument>("Following", FollowingSchema)