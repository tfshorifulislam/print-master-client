import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";


const syneHeading = Syne({
    variable: "--font-syne",
    subsets: ["latin"],
    display: "swap",
    width: ['400', '500', '600', '700', '800', '900']
});


const interBody = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
    width: ['400', '500', '600', '700', '800', '900']
});

// 🛠️ প্রিমিয়াম পোর্টফোলিওর জন্য মেটাডেটা ফিক্স
export const metadata = {
    title: {
        default: "Creata — Premium Creative Portfolio & Showcase",
        template: "%s | Creata"
    },
    description: "A minimal, high-end platform for designers, visual artists, and creators to showcase their elite work.",
    keywords: ["portfolio", "behance clone", "contra", "designers", "creative showcase", "nextjs"],
    icons: {
        icon: "/favicon.ico", // আপনার ফেভিকন পাথ
    },
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${syneHeading.className} ${interBody.className} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-screen font-sans">
                <Providers>
                    <div className="flex w-full min-h-screen max-w-[1400px] mx-auto">
                        <main className="flex-1 w-full min-h-screen">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}