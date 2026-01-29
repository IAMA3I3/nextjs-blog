import getAuthUser from "@/lib/auth/getAuthUser";
import Sidebar from "./Sidebar";

export default async function SidebarServer() {

    const authUser = await getAuthUser()

    if (!authUser) {
        throw new Error("User not found")
    }

    return <Sidebar authUser={authUser} />
}