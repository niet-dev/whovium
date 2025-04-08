import Image from "next/image";

import { Button } from "@/components/ui/button";

import githubIcon from "../../public/github.svg";

export default function SignInGithubButton() {
  return (
    <Button
      asChild
      variant="outline"
      aria-label="Login with Github"
      type="button"
      className="hover:bg-background/75 flex w-full items-center justify-center space-x-4 rounded-md border p-6 text-[#181717]"
    >
      <a href="/login/github">
        <Image
          src={githubIcon}
          alt="Github logo"
          className="h-5 w-5 fill-current"
        />
        <p>Sign in with GitHub</p>
      </a>
    </Button>
  );
}
