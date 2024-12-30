import type { Metadata } from "next";
import { Nunito } from "next/font/google"
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/modals/AuthModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";

const font = Nunito({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Airbnb Clone by Ayush Tomar",
  description: "Airbnb Clone created by Ayush Tomar",
};

export default async function RootLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode;
  session: any
}>) {

  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body
        className={font.className}
      >
            <AuthModal/>
            <RentModal/>
            <Navbar currentUser={currentUser}/>
            {children}
      </body>
    </html>
  );
}
