import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signupSchema";

const usernameQuesrySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };

    //validation with zod
    const result = usernameQuesrySchema.safeParse(queryParams);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];

      return Response.json(
        {
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(",")
              : "Invalid Query parameters",
          success: false,
        },
        { status: 400 }
      );
    }

    const { username } = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          message: "Username is Already taken",
          success: false,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        message: "Username is Available",
        success: true,
      },
      { status: 400 }
    );
  } catch (error) {
    console.log("Error checking username", error);
    return Response.json(
      {
        message: "Error Checking Message",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
