"use client"

// Navbar
import Container from "@/components/Container";
import Categories from "@/components/categories/Categories";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/types"

//Logo
import Image from "next/image"

//Search bar 
import { differenceInDays } from "date-fns"
import { Search } from 'lucide-react';
import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";

//Common
import {  FC, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface NavbarProps {
    currentUser?: SafeUser | null
  }



const Navbar: FC<NavbarProps> = ({ currentUser }) => {
    return ( 
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className=" py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo/>
                        <SearchBar/>
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Categories/>
        </div>
     );
};

const Logo = () => {
    const router = useRouter();
    
    return (
        <Image
            onClick={() => router.push("/")}
            alt="Airbnb Logo"
            src="/images/logo.png"
            width={100}
            height={100}
            className="hidden md:block cursor-pointer"
        />
    )
}

const SearchBar = () => {

    const searchModal = useSearchModal()
    const params = useSearchParams()
    const { getByValue } = useCountries()

    const locationValue = params?.get("locationValue")
    const startDate = params?.get("startDate")
    const endDate = params?.get("endDate")
    const guestCount = params?.get("guestCount")

    const locationLabel = useMemo(() => {
        if (locationValue) {
          return getByValue(locationValue as string)?.label
        }
        return "Anywhere"
      }, [getByValue, locationValue])

      const durationLabel = useMemo(() => {
        if (startDate && endDate) {
          const start = new Date(startDate as string)
          const end = new Date(endDate as string)
          let diff = differenceInDays(end, start)
    
          if (diff === 0) {
            diff = 1
          }
    
          return `${diff} Days`
        }
    
        return "Any Week"
      }, [startDate, endDate])
    
      const guestLabel = useMemo(() => {
        if (guestCount) {
          return `${guestCount} Guests`
        }
    
        return "Add Guests"
      }, [guestCount])
      return (
        <div
          onClick={searchModal.onOpen}
          className="
          border-[1px]
          w-full
          md:w-auto
          py-2
          rounded-full
          shadow-sm
          hover:shadow-md
          transition
          cursor-pointer
        "
        >
          <div
            className="
            flex
            flex-row
            items-center
            justify-between
          "
          >
            <div className="text-sm font-semibold px-6">{locationLabel}</div>
            <div
              className="
            hidden
            sm:block
            text-sm
            font-semibold
            px-6
            border-x-[1px]
            flex-1
            text-center
            "
            >
              {durationLabel}
            </div>
            <div
              className="
              text-sm
              pl-6
              pr-2
              text-gray-600
              flex
              flex-row
              items-center
              gap-3
            "
            >
              <div className="hidden sm:block">{guestLabel}</div>
              <div
                className="
                p-2
                bg-rose-500
                rounded-full
                text-white
              "
              >
                <Search size={18} />
              </div>
            </div>
          </div>
        </div>
      )
    }

export default Navbar