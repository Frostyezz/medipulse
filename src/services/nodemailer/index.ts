import nodemailer from "nodemailer";
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./src/common/templates/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./src/common/templates/"),
  extName: ".handlebars",
};

export const transporter = nodemailer.createTransport({
  port: 465,
  secure: true,
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  from: process.env.MAIL_USER,
  tls: { rejectUnauthorized: false },
});

transporter.use("compile", hbs(handlebarOptions));
