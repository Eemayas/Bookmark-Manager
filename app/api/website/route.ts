import { connectToDB } from "@/lib/mongoose";
import Website from "@/models/Website";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();
    const {
      id,
      name,
      url,
      description,
      tags,
      categories,
      isFavorities,
      email_address,
    } = body;

    // Validate required fields
    if (!id || !name || !url || !tags || !categories) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create and save new website
    const newWebsite = new Website({
      id,
      name,
      url,
      description,
      tags,
      categories,
      isFavorities,
      email_address,
    });

    const savedWebsite = await newWebsite.save();

    return NextResponse.json(
      { message: "Website created successfully", website: savedWebsite },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating website:", error);
    return NextResponse.json(
      { error: "Failed to create website" },
      { status: 500 },
    );
  }
}
export async function GET(req: Request) {
  try {
    await connectToDB();

    const websites = await Website.find(); // Fetch all websites

    return NextResponse.json(
      { message: "Websites retrieved successfully", websites },

      { status: 200 },
    );
  } catch (error) {
    console.error("Error retrieving websites:", error);
    return NextResponse.json(
      { error: "Failed to retrieve websites" },
      { status: 500 },
    );
  }
}
