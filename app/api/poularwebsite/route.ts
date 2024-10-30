import { connectToDB } from "@/lib/mongoose";
import PopularLinks from "@/models/PopularWebsite";
import PopularWebsite from "@/models/PopularWebsite";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDB();

  const { category, newLink } = await req.json();

  try {
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

  const { category, id, updateData } = await req.json();

  try {
    const updatedData = await PopularLinks.findOneAndUpdate(
      { [`data.${category}.id`]: id },
      { $set: { [`data.${category}.$`]: updateData } },
      { new: true },
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

  const { category, id } = await req.json();

  try {
    const updatedData = await PopularLinks.findOneAndUpdate(
      {},
      { $pull: { [`data.${category}`]: { id } } },
      { new: true },
    );

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
