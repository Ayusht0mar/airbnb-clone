import EmptyState from "@/components/EmptyState"

import {getCurrentUser} from "@/app/actions/getCurrentUser"
import getReservations from "@/app/actions/getResevations"
import ReservationsClient from "./ReservationsClient"

export default async function Reservations() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
        <EmptyState title="Unauthorized" subtitle="please login" />
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id })

  if (reservations.length === 0) {
    return (
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties"
        />
    )
  }
  return (
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
  )
}