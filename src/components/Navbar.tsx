"use client"
import Container from "./Container";
import Image from "next/image"
import { BiSearch } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import Categories from "./Categories";
import { useRouter } from "next/navigation";
import useRentModal from "@/hooks/useRentModal";

const Navbar = () => {
    return ( 
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className=" py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo/>
                        <Search/>
                        <UserMenu/>
                    </div>
                </Container>
            </div>
            <Categories/>
        </div>
     );
};

export default Navbar;

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

const Search = () => {
    return (
        <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row items-center justify-center">
                <div className="text-sm font-semibold px-6">Anywhere</div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">Any week</div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">Add Guest</div>
                    <div className="p-2 bg-rose-500 rounded-full text-white"><BiSearch size={18}/></div>
                </div>
            </div>
        </div>
    )
}

const UserMenu = () => {
    const registerModal = useRegisterModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return ( 
        <div className="relative">
            <div className="flex items-center gap-3">
                <div onClick={rentModal.onOpen} className="hidden md:block text-sm fotn-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Airbnb your home
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 bottom-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avatar/>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        <MenuItem 
                            onClick={registerModal.onOpen}
                            label="Login"
                         />
                        <MenuItem
                            onClick={registerModal.onOpen}
                            label="Sign Up"
                         />
                         <MenuItem 
                            onClick={() => {}}
                            label=""
                        />
                    </div>
                </div>
            )}
        </div>
     );
}

interface MenuItemProps {
    onClick: () => void;
    label: string;
}
 
const MenuItem: React.FC<MenuItemProps> = ({
    onClick, label
}) => {
    return (
        <div 
        onClick={onClick}
        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
            {label}
        </div>
     );
}
 
