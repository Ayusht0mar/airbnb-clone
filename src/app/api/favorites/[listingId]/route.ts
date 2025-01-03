import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { prisma } from "@/lib/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(
  request: Request,
  context: { params: Promise<IParams> } // Adjusted to match expected type
) {
  try {
    const { listingId } = await context.params; // Await params to resolve Promise

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json(
        { error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    const favoriteIds = [...(currentUser.favoriteIds || []), listingId];

    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<IParams> } // Adjusted to match expected type
) {
  try {
    const { listingId } = await context.params; // Await params to resolve Promise

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json(
        { error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    const favoriteIds = (currentUser.favoriteIds || []).filter(
      (id) => id !== listingId
    );

    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in DELETE:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
