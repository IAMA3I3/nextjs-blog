import { DashboardFooter } from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className=" h-screen overflow-hidden">
            <div className="flex h-screen">
                {/* Sidebar */}
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Topbar */}
                    <Topbar />
                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>
                </div>
            </div>
            <DashboardFooter />
        </main>
    )
}