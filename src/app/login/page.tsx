import SignInGithubButton from "@/components/sign-in-github-button";

export default function Page() {
  return (
    <div className="container mx-auto mt-[30vh] flex justify-center">
      <div className="flex max-w-sm flex-col rounded-md border p-6 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm">Sign in to access your account</p>
        </div>
        <div className="my-4 space-y-4">
          <SignInGithubButton />
        </div>
      </div>
    </div>
  );
}
