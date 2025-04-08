import SignInGithubButton from "@/components/sign-in-github-button";

export default function Page() {
  return (
    <div className="relative container mx-auto flex justify-center px-4 py-42">
      <div className="bg-fill inset-ring-stroke-weak flex flex-col space-y-4 rounded-md p-8 text-center inset-ring-2">
        <h1 className="text-text-strong text-3xl font-bold">Sign in</h1>
        <p className="text-text-weak text-sm">Sign in to access your account</p>
        <SignInGithubButton />
      </div>
    </div>
  );
}
