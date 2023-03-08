import { transporter } from "@/services/nodemailer";
import { ApolloError } from "apollo-server-micro";
import InviteModel, { CreateInviteInput } from "../schemas/invite.schema";
import ProfileModel from "../schemas/profile.schema";
import { Context } from "../types/context";
import i18next from "i18next";
import UserModel from "../schemas/user.schema";
import { INVITATION_STATUS } from "../types/enums";

class InviteService {
  async createInvite(input: CreateInviteInput, context: Context) {
    const alreadySent = !!(await InviteModel.find({ email: input.email }))
      .length;
    if (alreadySent) throw new ApolloError("invite.error.alreadySent");

    const emailTaken = !!(await UserModel.find()
      .findByEmail(input.email)
      .lean());
    if (emailTaken) throw new ApolloError("invite.error.emailTaken");

    const profile = await ProfileModel.find().findByContextId(
      context.userId ?? ""
    );

    const invite = await InviteModel.create({
      ...input,
      medicId: context.userId,
      status: INVITATION_STATUS.SENT,
    });

    i18next.changeLanguage(input.language);
    await transporter.sendMail(
      {
        from: process.env.MAIL_USER,
        to: input.email,
        subject: i18next.t("invite.mail.subject") as string,
        // @ts-ignore-next-line
        template: "invite",
        context: {
          title: i18next.t("invite.mail.title", {
            role: context.role?.toLowerCase(),
          }),
          name: [
            i18next.t(`roles.short.${context.role}`, {
              role: context.role?.toLowerCase(),
            }),
            profile?.firstName,
            profile?.lastName,
          ].join(" "),
          button: i18next.t("invite.mail.button"),
          avatar: !!profile?.avatar
            ? profile?.avatar
            : "https://refine.dev/img/generic-profile.png",
          link:
            process.env.NODE_ENV !== "production"
              ? `http://localhost:3000/register?id=${invite._id}&type=${invite.role}`
              : "https://medipulse.vercel.app/register?id=${invite._id}&type=${invite.role}",
        },
      },
      (err, info) => {
        if (err) {
          console.error(err);
          throw new ApolloError(`${err}`);
        }
        console.info(info);
      }
    );

    return invite;
  }

  async getInvites(context: Context) {
    const invites = await InviteModel.find({ medicId: context?.userId ?? "" });

    return invites;
  }
}

export default InviteService;
