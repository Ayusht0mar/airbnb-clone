import { NextResponse } from "next/server"
import {prisma} from "@/lib/prismadb"
import {getCurrentUser} from "@/app/actions/getCurrentUser"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body

  Object.keys(body).forEach((value) => {
    if (!body[value]) {
      NextResponse.error()
    }
  })

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      //@ts-expect-error code working
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}