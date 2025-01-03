import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { listingId, imageUrl } = body;

    // Validate inputs
    if (!listingId || !imageUrl) {
      return NextResponse.json({ error: "Listing ID and Image URL are required" }, { status: 400 });
    }

    // Update the imageSrc field of the specified listing
    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data: { imageSrc: imageUrl },
    });

    return NextResponse.json({ success: true, data: updatedListing });
  } catch (error) {
    console.error("Error updating listing image:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
