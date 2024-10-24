import { Button } from "@/components/ui/button";
import { signOut } from 'next-auth/react';
import Image from "next/image";

const Navbar = () => {
    return (
        <header className="w-full py-4 bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
                <h1 className="text-xl font-bold text-gray-800"><Image src={'/logo.png'} alt='not found' width={40} height={40}/></h1>
                <div className="space-x-4">
                    <Button variant={"outline"} onClick={() => signOut({ callbackUrl: '/' })}>
                        Sign Out
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
