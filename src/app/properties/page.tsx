import EmptyState from "@/components/EmptyState"

import {getCurrentUser} from "../actions/getCurrentUser"
import getListings from "../actions/getListings"
import PropertiesClient from "./PropertiesClient"

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
        <EmptyState title="Unauthorized" subtitle="Please login" />
    )
  }

  const listings = await getListings({
    //@ts-expect-error code working
    userId: currentUser.id,
  })

  if (listings.length === 0) {
    return (
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
    )
  }

  return (
        <PropertiesClient
          listings={listings}
          //@ts-expect-error code working
          currentUser={currentUser} 
        />
  )
}