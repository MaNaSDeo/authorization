import User from "@/models/User.model";
import { connectToDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectToDB();

    const { username, email, password, confirmPassword } = await req.json();

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    let newUser;
    if (password === confirmPassword) {
      newUser = new User({ username, email, password });
    } else {
      return NextResponse.json(
        {
          message: "Passwords don't match",
        },
        { status: 400 }
      );
    }

    await newUser.save();

    return NextResponse.json(
      {
        message: "User registered successfully",
        data: { username, email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Registration Error api: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    //Disconnect from database
    await mongoose.disconnect();
  }
}
