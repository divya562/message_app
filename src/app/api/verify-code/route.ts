import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from 'zod'
import { usernameValidation } from "@/schemas/signupSchema";

export async function POST(request: Request){
    await dbConnect()

    try {
        const {username, code} = await request.json()
        const decodeUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username: decodeUsername})

        if(!user){
            return Response.json({
                message: "User not found",
                status:'false'
            }, {status:500})
        }

        const isCodeVerify = user.isVerified === code
        const isCodeNotExpiry = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeVerify && isCodeNotExpiry){
           user.isVerified = true,
           await user.save()

           return Response.json({
            message: "Account Verified Succesfully",
            status: 'true'
        }, { status: 200 })

        } 
        else if(!isCodeNotExpiry)
        {
            return Response.json({
                message: "Verified Code expired, Please Sign up again for new code",
                status: 'false'
            }, { status: 400 })
        }
        else
        {
            return Response.json({
                message: "Incorrect  Verification code",
                status: 'false'
            }, { status: 400 })
        }
        
    } catch (error) {
            console.log("Error Verifying User", error)
            return Response.json({
                message: "Error Verifying User",
                status:'false'
            }, {status:500})
    }
}