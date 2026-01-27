import { MainFooter } from "@/components/layout/Footer";
import NavbarServer from "@/components/layout/Navbar.server";

export default function MainLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className=" flex flex-col min-h-screen">
            <NavbarServer />
            <div className=" flex-1 flex flex-col">
                {children}
            </div>
            <MainFooter />
        </main>
    )
}