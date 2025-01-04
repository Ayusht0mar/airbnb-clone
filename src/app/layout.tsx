import type { Metadata } from "next";
import { Nunito } from "next/font/google"
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/modals/AuthModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";

const font = Nunito({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Airbnb Clone by Ayush Tomar",
  description: "Airbnb Clone created by Ayush Tomar",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body
        className={font.className}
      >
            <AuthModal/>
            <RentModal/>
            <SearchModal/>            
            <Navbar
            //@ts-expect-error code working

             currentUser={currentUser}/>
            {children}
      </body>
    </html>
  );
}
