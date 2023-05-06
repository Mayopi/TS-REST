import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  email: string;
  username: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },

    salt: {
      type: String,
      select: false,
    },

    sessionToken: {
      type: String,
      select: false,
    },
  },
});

UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("authentication.password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.authentication.password, salt);
    user.authentication.password = hash;
    user.authentication.salt = salt;
    return next();
  } catch (error) {
    return next(error);
  }
});

export const User = model<IUser>("User", UserSchema);

export const getUser = async (): Promise<IUser[]> => {
  return await User.find();
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};
