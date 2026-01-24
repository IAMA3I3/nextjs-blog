import { PageCard } from "@/components/container/Card";
import { DashboardFooter } from "@/components/layout/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className=" h-screen w-screen overflow-hidden p-6 flex justify-center items-center">
            <PageCard>
                {children}
            </PageCard>
            <DashboardFooter />
        </main>
    )
}