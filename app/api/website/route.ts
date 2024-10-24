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

export async function PUT(req: Request) {
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

    // Update website
    const updatedWebsite = await Website.findByIdAndUpdate(
      id,
      {
        name,
        url,
        description,
        tags,
        categories,
        isFavorities,
        email_address,
      },
      { new: true },
    );

    if (!updatedWebsite) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Website updated successfully", website: updatedWebsite },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating website:", error);
    return NextResponse.json(
      { error: "Failed to update website" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDB();

    const { id } = await req.json();

    // Validate required field
    if (!id) {
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 },
      );
    }

    // Delete website
    const deletedWebsite = await Website.findByIdAndDelete(id);

    if (!deletedWebsite) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Website deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting website:", error);
    return NextResponse.json(
      { error: "Failed to delete website" },
      { status: 500 },
    );
  }
}
