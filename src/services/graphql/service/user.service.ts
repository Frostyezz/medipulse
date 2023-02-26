import { ApolloError } from "apollo-server-micro";
import UserModel, { CreateUserInput, LoginInput } from "../schemas/user.schema";
import { Context } from "../types/context";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { signJwt } from "@/common/utils/jwt";
import { transporter } from "@/services/nodemailer";
import i18next from "i18next";

class UserService {
  async createUser(input: CreateUserInput) {
    const user = await UserModel.find().findByEmail(input.email).lean();
    if (user) throw new ApolloError("register.error.emailAlreadyUsed");
    const newUser = await UserModel.create({
      ...input,
      validationCode: Math.floor(Math.random() * 9000 + 1000),
    });
    i18next.changeLanguage(newUser.language);
    try {
      transporter.sendMail({
        from: process.env.MAIL_USER,
        to: newUser.email,
        subject: i18next.t("email.validationCode.subject") as string,
        // @ts-ignore-next-line
        template: "validation-code",
        context: {
          validationCode: newUser.validationCode,
          title: i18next.t("email.validationCode.title"),
          subtitle: i18next.t("email.validationCode.subtitle"),
          caption: i18next.t("email.validationCode.caption"),
        },
      });
    } catch (err) {
      throw new ApolloError(`${err}`);
    }
    return newUser;
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
