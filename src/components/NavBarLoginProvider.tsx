import { getCurrentSession } from "@/lib/session";
import NavBar from "@/components/NavBar";

export default async function NavBarLoginProvider() {
  const { user } = await getCurrentSession();

  return <NavBar user={user} />;
}
