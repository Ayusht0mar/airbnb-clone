import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";

interface CurrentUser {
  id: string;
  name: string | null; // Updated to allow null
  email: string | null; // Updated to allow null
  image: string | null; // Updated to allow null
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
  favoriteIds: string[]; // Optional if it's nullable in your database
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    // Get session from Auth.js
    const session = await auth();

    if (!session?.user?.email) {
      return null; // No user is logged in
    }

    // Fetch user from Prisma database
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null; // User not found in the database
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: unknown) {
    // Log the error for debugging
    console.error("Error fetching current user:", error);

    // Handle error properly
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while fetching the current user.");
  }
}
