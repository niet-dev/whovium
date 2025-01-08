import { redirect } from "next/navigation";

import { auth } from "@/auth";

const Page = async () => {
  const session = await auth();
  if (!session) {
    redirect(`/api/auth/signin`);
  }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default Page;
