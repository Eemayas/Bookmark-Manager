import { connectToDB } from "@/lib/mongoose";
import PopularLinks from "@/models/PopularWebsite";
import PopularWebsite from "@/models/PopularWebsite";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDB();

  const { category, newLink } = await req.json();

  try {
    // Check if a link with the same name or URL already exists in the specified category
    const existingLink = await PopularLinks.findOne({
      [`data.${category}`]: {
        $elemMatch: { $or: [{ name: newLink.name }, { url: newLink.url }] },
      },
    });

    if (existingLink) {
      return NextResponse.json(
        { message: "Duplicate link found", category },
        { status: 400 },
      );
    }

    // If no duplicate is found, proceed with adding the new link
    const updatedData = await PopularLinks.findOneAndUpdate(
      {},
      { $push: { [`data.${category}`]: newLink } },
      { new: true, upsert: true },
    );

    return NextResponse.json({ message: `Added to ${category}`, updatedData });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding link", error },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  await connectToDB();
  const url = new URL(req.url);
  const category = url.searchParams.get("category");

  try {
    const data = await PopularLinks.findOne();
    const responseData = category ? data?.data.get(category) : data?.data;
    return NextResponse.json(responseData || {});
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data", error },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  await connectToDB();

  const { category, _id, updateData } = await req.json();

  try {
    // Convert _id to ObjectId
    const objectId = new Types.ObjectId(_id);

    // Check if a link with the same name or URL already exists in the specified category
    const existingLink = await PopularLinks.findOne({
      [`data.${category}`]: {
        $elemMatch: {
          $or: [{ name: updateData.name }, { url: updateData.url }],
        },
      },
    });

    if (existingLink) {
      return NextResponse.json(
        { message: "Duplicate link found", category },
        { status: 400 },
      );
    }

    const updatedData = await PopularLinks.findOneAndUpdate(
      { [`data.${category}._id`]: _id },
      { $set: { [`data.${category}.$`]: updateData } },
      // { new: true },
    );

    return NextResponse.json({
      message: `Updated in ${category}`,
      updatedData,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating link", error },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  await connectToDB();

  const { category, _id } = await req.json();

  try {
    // Convert _id to ObjectId
    const objectId = new Types.ObjectId(_id);

    // Filter to locate the document containing the specified category and _id
    const updatedData = await PopularLinks.findOneAndUpdate(
      { [`data.${category}._id`]: objectId },
      { $pull: { [`data.${category}`]: { _id: objectId } } },
      { new: true },
    );

    if (!updatedData) {
      return NextResponse.json(
        {
          message: `No link found in category "${category}" with the given _id`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: `Removed from ${category}`,
      updatedData,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting link", error },
      { status: 500 },
    );
  }
}
