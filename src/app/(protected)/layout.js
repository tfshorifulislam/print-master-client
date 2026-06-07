import Asidebar from "@/components/Asidebar";
import MobileScreenBottomNavbar from "@/components/MobileNavbar";
import RightSideBar from "@/components/RightSideBar";

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex max-w-[1920px] mx-auto">
      <Asidebar />
      <main
        className="flex-1 min-h-screen">
        {children}
      </main>
      <MobileScreenBottomNavbar />
      <RightSideBar />
    </div>
  );
}
