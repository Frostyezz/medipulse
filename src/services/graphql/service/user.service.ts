import { ApolloError } from "apollo-server-micro";
import UserModel, { CreateUserInput, LoginInput } from "../schemas/user.schema";
import { Context } from "../types/context";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { signJwt } from "@/common/utils/jwt";

class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const user = await UserModel.find().findByEmail(input.email).lean();
    if (!user) throw new ApolloError("login.error.failed");

    const isValidPassword = bcrypt.compareSync(input.password, user.password);
    if (!isValidPassword) throw new ApolloError("login.error.failed");

    const token = signJwt(user);
    const serialised = serialize("MediPulseJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3.154e10,
      path: "/",
    });
    context.res.setHeader("Set-Cookie", serialised);

    return token;
  }
}

export default UserService;
