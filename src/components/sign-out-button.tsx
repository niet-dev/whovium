import { signout } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <Button
      variant="ghost"
      className="text-text-strong hover:bg-fill/60 w-full cursor-pointer"
      onClick={signout}
    >
      Sign out
    </Button>
  );
}
