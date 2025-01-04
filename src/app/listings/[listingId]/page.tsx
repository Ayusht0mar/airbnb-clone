import {getCurrentUser} from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingByIds"
import EmptyState from "@/components/EmptyState"
import ListingClient from "./ListingClient"
import getReservations from "@/app/actions/getResevations"
import { SafeUser } from "@/types"

interface IParams {
  listingId?: string;
}


export default async function ListingPage({ params }: {  params: Promise<IParams>} ) {

  const resolvedParams = await params;
  const { listingId } = resolvedParams;

  if (!listingId) {
    return <EmptyState/>;
  }

  const listing = await getListingById({listingId})
  const reservations = await getReservations({listingId})
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