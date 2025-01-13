import SignInGithubButton from "@/components/SignInGithubButton";

export default function Page() {
  return (
    <div className="container mx-auto mt-[40vh] flex max-w-sm flex-col space-y-5 rounded-md border p-4">
      <h1 className="text-center text-lg font-bold">Sign in</h1>
      <SignInGithubButton />
    </div>
  );
}
