import Link from "next/link";

import { auth } from "@/auth";

import { SignIn, SignOut } from "@/components/AuthComponents";

const HomePage = async () => {
  const session = await auth();

  return (
    <div>
      <h1>Whovium</h1>
      {!session?.user ? <SignIn /> : <SignOut />}
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
      <Link href="/boards">View Boards</Link>
    </div>
  );
};

export default HomePage;
