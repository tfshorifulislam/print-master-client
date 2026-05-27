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
        <nav className="w-full top-0 sticky z-[9999] bg-white dark:bg-[#0A0A0A] border-b border-gray-100 dark:border-zinc-800 transition-colors duration-200 hidden sm:flex">
            <div className='w-11/12 mx-auto flex items-center justify-between py-3.5 gap-4'>

                <div className="shrink-0 cursor-pointer select-none">
                    <h1>
                        <Link
                            href="/"
                            className="text-xl md:text-2xl no-underline font-extrabold bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent tracking-tight"
                        >
                            Print-master
                        </Link>
                    </h1>
                </div>

                <div className="flex-1 max-w-2xl mx-2 md:mx-6">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search designs, projects, creators..."
                            className="w-full py-2 pl-12 pr-4 rounded-full bg-gray-50 dark:bg-zinc-900 text-[#0A0A0A] dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 border border-transparent focus:outline-none focus:bg-white dark:focus:bg-[#0A0A0A] focus:ring-2 focus:ring-[#7C3AED] transition-all text-sm"
                        />


                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500">
                            <Magnifier className="w-4 h-4" />
                        </div>
                    </div>
                </div>


                <div className="shrink-0 flex items-center gap-3 md:gap-4">


                    {
                        user &&
                        <div className='bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-2py-2 font-semibold text-sm transition shadow-sm cursor-pointer flex items-center justify-center'>
                            <CreatePost />
                        </div>
                    }


                    <div className="flex items-center justify-center">
                        {isPending ? (
                            <Avatar
                                size="md"
                                className="bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] cursor-pointer animate-pulse"
                            />
                        ) : user ? (
                            <ProfileDropdown handleSignOut={handleSignOut} />
                        ) : (
                            <div className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold rounded-full transition shadow-sm">
                                <LoginModal />
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;