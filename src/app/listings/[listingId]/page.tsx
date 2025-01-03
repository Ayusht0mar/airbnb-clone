import {getCurrentUser} from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingByIds"
import EmptyState from "@/components/EmptyState"
import ListingClient from "./ListingClient"
import getReservations from "@/app/actions/getResevations"
import { SafeUser } from "@/types"

interface IParams {
  listingId?: string
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser() as SafeUser | null | undefined

  if (!listing) {
    return (
        <EmptyState />
    )
  }
  return (
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
  )
}