import Comment, {CommentDocument} from "../models/Comments";

const createComment = async (comment: CommentDocument): Promise<CommentDocument> => {
    return comment.save();
};

const getFirstCommentByProductId = async (productId: string) : Promise<CommentDocument[]> => {
    return Comment.find({ productId: productId, parentCommentId: 'first comment' }).populate('userId', 'email').sort({ date: -1 });
};

const getCommentByParentId = async (parentId: string) : Promise<CommentDocument[]> => {
    return Comment.find({ parentCommentId: parentId }).populate('userId', 'email').sort({ date: -1 });
};

const getCommentByProductId = async (productId: string) : Promise<CommentDocument[]> => {
    return Comment.find({ productId: productId }).populate('userId', 'email').sort({ date: -1 });
};

export default { createComment,getFirstCommentByProductId, getCommentByParentId, getCommentByProductId };