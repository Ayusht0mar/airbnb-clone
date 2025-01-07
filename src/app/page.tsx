export const dynamic = "force-dynamic"
import {getCurrentUser} from "@/app/actions/getCurrentUser"
import getListings, { IListingsParams } from "@/app/actions/getListings"
import Container from "@/components/Container"
import EmptyState from "@/components/EmptyState"
import ListingCard from "@/components/listings/ListingCard"

interface HomeProps {
  searchParams: Promise<IListingsParams>
}

export default async function Home({ searchParams }: HomeProps) {

  const resolvedParams = await searchParams;

  const listings = await getListings(resolvedParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
        <EmptyState showReset />
    )
  }

  return (
    <>
      <Container>
        <div
          className="
          pt-48
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
          pb-24
        "
        >
          {listings.map((listing) => {
            return (
              <ListingCard
              //@ts-expect-error code working
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            )
          })}
        </div>
      </Container>
    </>
  )
}
