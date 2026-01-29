import { DashboardFooter } from "@/components/layout/Footer";
import SidebarServer from "@/components/layout/Sidebar.server";
import TopbarServer from "@/components/layout/Topbar.server";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className=" h-screen overflow-hidden">
            <div className="flex h-screen">
                {/* Sidebar */}
                <SidebarServer />
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Topbar */}
                    <TopbarServer />
                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>
                </div>
            </div>
            <DashboardFooter />
        </main>
    )
}