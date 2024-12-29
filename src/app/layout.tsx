import type { Metadata } from "next";
import { Nunito } from "next/font/google"
import "./globals.css";
import Navbar from "@/components/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import RentModal from "@/components/modals/RentModal";

const font = Nunito({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Airbnb Clone by Ayush Tomar",
  description: "Airbnb Clone created by Ayush Tomar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <RentModal/>
        <RegisterModal/>
        <ToasterProvider/>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
