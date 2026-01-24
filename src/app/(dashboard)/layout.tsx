import { DashboardFooter } from "@/components/layout/Footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className=" h-screen overflow-hidden">
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Topbar */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>
                </div>
            </div>
            <DashboardFooter />
        </main>
    )
}