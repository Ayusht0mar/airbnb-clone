import {prisma} from "@/lib/prismadb"

import {getCurrentUser} from "./getCurrentUser"

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return []
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          //@ts-expect-error code working
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    })

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }))

    return safeFavorites
  } catch (error: unknown) {
    throw new Error(error as string)
  }
}