import getAuthUser from "@/lib/auth/getAuthUser";
import Navbar from "./Navbar";

export default async function NavbarServer() {
    const authUser = await getAuthUser()

    return <Navbar authUser={authUser} />
}