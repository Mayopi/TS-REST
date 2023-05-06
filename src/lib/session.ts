import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUser, getUserByEmail } from "../models/User";
interface Payload {
  email: string;
  password: string;
}

export const createToken = async (payload: Payload, secret = process.env.SECRET_ACCESS_TOKEN): Promise<string | Response> => {
  const user = await getUserByEmail(payload.email, true);

  if (!user) throw new Error(`User with email ${payload.email} is not found`);

  const auth = await bcrypt.compare(payload.password, user.authentication.password);

  if (!auth) throw new Error("Invalid email or password");

  const accessToken = sign({ user }, secret, { expiresIn: "30d" });

  user.authentication.sessionToken = accessToken;
  await user.save();

  return accessToken;
};
