import getAuthUser from "@/lib/auth/getAuthUser";
import Topbar from "./Topbar";

export default async function TopbarServer() {

    const authUser = await getAuthUser()

    if (!authUser) {
        throw new Error("User not found")
    }

    return <Topbar authUser={authUser} />
}