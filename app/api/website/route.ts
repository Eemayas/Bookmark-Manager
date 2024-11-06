import { PersonalWebsiteType } from "@/app/types";
import { connectToDB } from "@/lib/mongoose";
import Website from "@/models/Website";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body: PersonalWebsiteType = await req.json();
    const {
      name,
      url,
      description,
      tags,
      folderPath,
      isFavorities,
      email_address,
    } = body;

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!url) missingFields.push("url");
    if (!tags) missingFields.push("tags");
    if (!folderPath) missingFields.push("folderPath");
    if (!email_address) missingFields.push("email_address");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 },
      );
    }

    // Check if the URL and name already exist
    const existingWebsite = await Website.findOne({ url, name, email_address });
    if (existingWebsite) {
      return NextResponse.json(
        { error: "Website with this URL already exists" },
        { status: 400 },
      );
    }

    // Create and save new website
    const newWebsite = new Website({
      name,
      url,
      description,
      tags,
      folderPath,
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
      { error: "Failed to create website", details: `${error}` },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const email_address = searchParams.get("email_address");

    if (!email_address) {
      return NextResponse.json(
        { error: "Missing required query parameter: email_address" },
        { status: 400 },
      );
    }

    // Fetch websites for the specific email address
    const websites = await Website.find({ email_address }); // Filter by email_address
    return NextResponse.json(
      { message: "Websites retrieved successfully", websites },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error retrieving websites:", error);
    return NextResponse.json(
      { error: `Failed to retrieve websites`, details: `${error}` },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();
    const {
      _id,
      name,
      url,
      description,
      tags,
      folderPath,
      isFavorities,
      email_address,
    } = body;

    // Validate required fields
    const missingFields = [];
    if (!_id) missingFields.push("_id");
    if (!name) missingFields.push("name");
    if (!url) missingFields.push("url");
    if (!tags) missingFields.push("tags");
    if (!folderPath) missingFields.push("folderPath");
    if (!email_address) missingFields.push("email_address");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 },
      );
    }

    // Update website
    const updatedWebsite = await Website.findByIdAndUpdate(_id, {
      name,
      url,
      description,
      tags,
      folderPath,
      isFavorities,
      email_address,
    });

    if (!updatedWebsite) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Website updated successfully", website: body },
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

    const { _id } = await req.json();

    // Validate required field
    if (!_id) {
      return NextResponse.json(
        { error: "Missing required field: _id" },
        { status: 400 },
      );
    }

    // Delete website
    const deletedWebsite = await Website.findByIdAndDelete(_id);

    if (!deletedWebsite) {
      return NextResponse.json(
        { error: `Website with _id "${_id}" not found` },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Website deleted successfully", website: deletedWebsite },
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
