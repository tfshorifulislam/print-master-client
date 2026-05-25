'use client'
import { Magnifier } from '@gravity-ui/icons';
import LoginModal from './LoginModal';


const Navbar = () => {
    return (
        <nav className="w-full top-0 sticky hidden sm:flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">

            {/* Left - Logo */}
            <div className="shrink-0 cursor-pointer">
                <h1 className="text-xl font-bold text-[#0055ff] tracking-wide">
                    Print-marser
                </h1>
            </div>

            {/* Center - Pinterest style full search */}
            <div className="flex-1 mx-6">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search designs, projects, creators..."
                        className="w-full py-3 pl-12 pr-4 rounded-sm md:rounded-lg bg-gray-100 text-black placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-[#0055ff] transition"
                    />

                    {/* Search icon */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <Magnifier />
                    </div>
                </div>
            </div>

            {/* Right - Login Button */}
            <div className="shrink-0">
                <LoginModal/>
            </div>
        </nav>
    );
};

export default Navbar;