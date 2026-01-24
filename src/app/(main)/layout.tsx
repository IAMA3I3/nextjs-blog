import { MainFooter } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className=" flex flex-col min-h-screen">
            <Navbar />
            <div className=" flex-1">
                {children}
            </div>
            <MainFooter />
        </main>
    )
}