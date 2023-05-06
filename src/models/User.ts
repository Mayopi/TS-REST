import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
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

export const getUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const getUserByEmail = async (email: string, select = false): Promise<IUser | null> => {
  if (!select) return await User.findOne({ email });

  return await User.findOne({ email }).select("+authentication.sessionToken +authentication.password");
};

export const getUserById = async (id: string, select = false): Promise<IUser | null> => {
  if (!select) return await User.findById(id);

  return await User.findById(id).select("+authentication.sessionToken +authentication.password");
};

export const getUserBySessionToken = async (sessionToken: string, select = false): Promise<IUser | null> => {
  if (!select) return await User.findOne({ "authentication.sessionToken": sessionToken });

  return await User.findOne({ "authentication.sessionToken": sessionToken }).select("+authentication.password +authentication.sessionToken");
};
