import {prisma} from "@/lib/prismadb"


export default async function getListingById({ listingId }: { listingId?: string }) {
  try {

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    })
    if (!listing) {
      return null
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    }
  } catch (error: unknown) {
    console.error("Error fetching listing by id", error)
  } 
}