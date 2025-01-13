import Image from "next/image";

import githubIcon from "../../public/github.svg";
import { Button } from "./ui/button";

export default function SignInGithubButton() {
  return (
    <Button asChild variant="outline">
      <a href="/login/github" className="text-[#181717]">
        <Image src={githubIcon} alt="Github logo" className="-ml-1 h-5 w-5" />
        Sign in with GitHub
      </a>
    </Button>
  );
}
