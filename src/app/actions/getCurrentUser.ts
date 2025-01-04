import { auth } from "@/auth"
import { prisma } from "@/lib/prismadb";

export async function getCurrentUser() {
  try {
    // Get session from Auth.js
    const session = await auth()

    if (!session?.user?.email) {
      return null; // No user is logged in
    }

    // Fetch user from Prisma database
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
        return null
    }

    return {
        ...currentUser,
        createdAt: currentUser.createdAt.toISOString(),
        updatedAt: currentUser.updatedAt.toISOString(),
        emailVerified: currentUser.emailVerified?.toISOString() || null,
      }
    } catch (error) {
      return error;
    }
}
