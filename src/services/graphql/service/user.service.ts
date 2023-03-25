import { ApolloError } from "apollo-server-micro";
import UserModel, {
  CreateUserInput,
  LoginInput,
  VerifyEmailInput,
} from "../schemas/user.schema";
import { Context } from "../types/context";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { signJwt } from "@/common/utils/jwt";
import { transporter } from "@/services/nodemailer";
import i18next from "i18next";

class UserService {
  async createUser(input: CreateUserInput, context: Context) {
    const user = await UserModel.find().findByEmail(input.email).lean();
    if (user) throw new ApolloError("register.error.emailAlreadyUsed");

    const newUser = await UserModel.create({
      ...input,
      validationCode: Math.floor(Math.random() * 9000 + 1000),
    });

    i18next.changeLanguage(newUser.language);

    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(success);
        }
      });
    });

    await new Promise((resolve, reject) => {
      transporter.sendMail(
        {
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
        },
        (err, info) => {
          if (err) {
            console.error(err);
            reject(err);
            throw new ApolloError(`${err}`);
          }
          console.log(info);
          resolve(info);
        }
      );
    });

    const token = await signJwt({ _id: newUser._id, role: newUser.role });
    const serialised = serialize("MediPulseJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3.154e10,
      path: "/",
    });
    context.res.setHeader("Set-Cookie", serialised);
    return newUser;
  }

  async resendValidationCode(context: Context) {
    const newValidationCode = Math.floor(Math.random() * 9000 + 1000);
    const user = await UserModel.findByIdAndUpdate(context.userId, {
      validationCode: newValidationCode,
    });
    if (!user) throw new ApolloError("register.error");

    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(success);
        }
      });
    });

    await new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: process.env.MAIL_USER,
          to: user.email,
          subject: i18next.t("email.validationCode.subject") as string,
          // @ts-ignore-next-line
          template: "validation-code",
          context: {
            validationCode: newValidationCode,
            title: i18next.t("email.validationCode.title"),
            subtitle: i18next.t("email.validationCode.subtitle"),
            caption: i18next.t("email.validationCode.caption"),
          },
        },
        (err, info) => {
          if (err) {
            console.error(err);
            reject(err);
            throw new ApolloError(`${err}`);
          }
          console.log(info);
          resolve(info);
        }
      );
    });

    return true;
  }

  async verifyEmail(input: VerifyEmailInput, context: Context) {
    const { validationCode } = (await UserModel.findById(context.userId)) ?? {};
    if (validationCode !== input.validationCode)
      throw new ApolloError("verify.errors.invalidCode");
    await UserModel.findByIdAndUpdate(context.userId, {
      isEmailVerified: true,
      registerStep: 2,
    });
    return true;
  }

  async deleteUser(context: Context) {
    await UserModel.findByIdAndRemove(context.userId);
    const serialised = serialize("MediPulseJWT", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    context.res.setHeader("Set-Cookie", serialised);
    return true;
  }

  async logout(context: Context) {
    const serialised = serialize("MediPulseJWT", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    context.res.setHeader("Set-Cookie", serialised);
    return true;
  }

  async login(input: LoginInput, context: Context) {
    const user = await UserModel.find().findByEmail(input.email).lean();
    if (!user) throw new ApolloError("login.error.failed");

    const isValidPassword = bcrypt.compareSync(input.password, user.password);
    if (!isValidPassword) throw new ApolloError("login.error.failed");

    const token = await signJwt({ _id: user._id, role: user.role });
    const serialised = serialize("MediPulseJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3.154e10,
      path: "/",
    });
    context.res.setHeader("Set-Cookie", serialised);

    return true;
  }

  async getUser(context: Context) {
    const user = await UserModel.findById(context.userId).lean();
    return user;
  }

  async completeFTU(context: Context) {
    await UserModel.findByIdAndUpdate(context?.userId, { completedFTU: true });

    return true;
  }
}

export default UserService;
