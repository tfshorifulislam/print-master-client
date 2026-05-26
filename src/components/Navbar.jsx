'use client'
import { Magnifier } from '@gravity-ui/icons';
import LoginModal from './LoginModal';
import { signOut, useSession } from '@/lib/auth-client';
import CreatePost from './CreatePost';
import ProfileDropdown from './ProfileDropDownIcon';
import { Avatar } from '@heroui/react';
import { Link } from '@heroui/react';


const Navbar = () => {

    const { data: user, isPending } = useSession()
    console.log(user)

    const handleSignOut = async () => {
        await signOut();
        alert('logout')
    }
    return (
        <nav className="w-full top-0 sticky z-9999 bg-white border-b border-gray-200">
            <div className='w-11/12 mx-auto bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3'>

                {/* Left - Logo */}
                <div className="shrink-0 cursor-pointer">
                    <h1>
                        <Link
                            href="/"
                            className="text-xl no-underline font-bold text-[#0055ff] tracking-wide"
                        >
                            Print-marser
                        </Link>
                    </h1>
                </div>

                {/* Center - Pinterest style full search */}
                <div className="flex-1 mx-6 hidden sm:block">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search designs, projects, creators..."
                            className="w-full py-2 pl-12 pr-4 rounded-sm md:rounded-lg bg-gray-100 text-black placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-[#0055ff] transition"
                        />

                        {/* Search icon */}
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <Magnifier />
                        </div>
                    </div>
                </div>

                {/* Right - Login Button */}
                <div className="shrink-0 hidden sm:flex justify-center items-center">
                    {isPending ?
                        (
                            <Avatar
                                size="lg"
                                className="bg-linear-to-br from-blue-500 to-indigo-600 cursor-pointer ring-2 ring-transparent hover:ring-emerald-500 transition">
                            </Avatar>
                        )
                        : user ?
                            <ProfileDropdown handleSignOut={handleSignOut} />
                            :
                            <LoginModal />
                    }
                </div>
                <div className='hidden sm:flex  fixed bottom-6 right-6 bg-[#0055ff] rounded-full'>
                    <CreatePost />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;