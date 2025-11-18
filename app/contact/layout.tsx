import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: {
        default: "Contact Us",
        template: "%s | ICFAI Startup Center"
    },
    description: "Get in touch with ICFAI Startup & Incubation Center. We\'re here to help with your entrepreneurial journey and answer any questions about our programs.",
    keywords: ["startup", "incubation", "entrepreneurship", "innovation", "ICFAI", "Tripura", "university"],
    authors: [{ name: "ICFAI University Tripura" }],
    creator: "ICFAI University Tripura",
    openGraph: {
        title: "ICFAI Startup & Incubation Center",
        description: "Fostering entrepreneurship and innovation at ICFAI University Tripura",
        url: "https://startup.icfai.ac.in",
        siteName: "ICFAI Startup Center",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "ICFAI Startup & Incubation Center",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ICFAI Startup & Incubation Center",
        description: "Fostering entrepreneurship and innovation at ICFAI University Tripura",
        images: ["/images/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function ContactLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NextTopLoader
                color="#2563eb"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
            />
            <Navbar />
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow">
                    {children}
                </main>
            </div>
            <Footer />

        </>
    );
}
