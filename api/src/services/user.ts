import User, { UserDocument } from '../models/User';

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save();
};

const findUserById = async (id: string): Promise<UserDocument | null> => {
  return User.findById(id);
};

const getUserList = async (): Promise<UserDocument[]> => {
  return User.find();
};

// for login
const findUserByEmail = async (
  userEmail: string
): Promise<UserDocument | null> => {
  return User.findOne({ email: userEmail });
};

const createOrFindUserByEmail = async (
  payload: Partial<UserDocument>
): Promise<UserDocument | null> => {
  console.log(payload, 'user service payload');
  const userEmail = payload.email;
  const result = await User.findOne({ email: userEmail });
  if (result) {
    return result;
  } else {
    // if no user with that email -> create new user
    const user = new User({
      fullName: payload.fullName,
      email: userEmail,
    });
    return user.save();
  }
};

const updateUserById = async (
  userId: string,
  updateData: Partial<UserDocument>
): Promise<UserDocument | null> => {
  return User.findByIdAndUpdate(userId, updateData, { new: true });
};

export default {
  createUser,
  findUserById,
  getUserList,
  findUserByEmail,
  createOrFindUserByEmail,
  updateUserById
};
