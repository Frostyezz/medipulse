import { transporter } from "@/services/nodemailer";
import { ApolloError } from "apollo-server-micro";
import InviteModel, { CreateInviteInput } from "../schemas/invite.schema";
import ProfileModel from "../schemas/profile.schema";
import { Context } from "../types/context";
import i18next from "i18next";

class InviteService {
  async createInvite(input: CreateInviteInput, context: Context) {
    const alreadySent = !!(await InviteModel.find({ email: input.email }))
      .length;
    if (alreadySent) throw new ApolloError("invite.already.sent");

    const profile = await ProfileModel.find().findByContextId(
      context.userId ?? ""
    );

    const invite = await InviteModel.create(input);

    i18next.changeLanguage(input.language);
    await transporter.sendMail(
      {
        from: process.env.MAIL_USER,
        to: input.email,
        subject: i18next.t("invite.mail.subject") as string,
        // @ts-ignore-next-line
        template: "validation-code",
        context: {
          title: i18next.t("invite.mail.title"),
          name: [
            i18next.t(`roles.${context.role}`),
            profile?.firstName,
            profile?.lastName,
          ].join(" "),
          button: i18next.t("invite.mail.button"),
          avatar: !!profile?.avatar
            ? profile?.avatar
            : "https://refine.dev/img/generic-profile.png",
          link:
            process.env.NODE_ENV !== "production"
              ? `http://localhost:3000/register?id=${invite._id}`
              : "https://medipulse.vercel.app/register?id=${invite._id}",
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
}

export default InviteService;
