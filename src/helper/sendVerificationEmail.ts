
import VerificationEmail from "../../emails/verificationEMails";
import { ApiResponse } from "@/types/ApiResponse";
import { resend } from '@/lib/resend';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'divyabagul48@gmail.com',
            subject: 'Verification Code',
            react: VerificationEmail({username, otp:verifyCode})

          });
        return {success: true, message: 'Verification email send Successfully'}
    } catch (emailError) {
        console.log("Error Sending verification email", emailError)
        return {success: false, message:'failed to send verification email'}
    }
}