import nodemailer from "nodemailer";
import environments from "../../environments/environments";

export const transforter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: environments.SMTP_EMAIL,
    pass: environments.SMTP_PASSWORD,
  },
});
