import { Resend } from "resend";

export const resend = new Resend(process.env.RESENDGRID_API_KEY)

