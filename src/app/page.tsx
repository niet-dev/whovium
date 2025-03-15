import Link from "next/link";

import { montserrat } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="container mx-auto">
      <div className="mt-32 flex flex-col items-center justify-center space-y-8 p-4">
        <h2
          className={cn(
            "col-span-2 w-[35%] text-center text-4xl/relaxed font-semibold",
            montserrat.className,
          )}
        >
          Play Guess Who With Your Friends. Create Your Own Custom Boards
        </h2>
        <section className="w-[35%] text-center">
          Whovium is a place to create and play with custom Guess Who boards
          from your favorite TV shows, books, or anything else you can think of.
        </section>
        <section className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/boards">Explore</Link>
          </Button>
          <p className="px-4 text-sm">or</p>
          <Button variant="outline" asChild>
            <Link href="/login">Sign Up</Link>
          </Button>
        </section>
        <p className="text-sm">(it&apos;s free!)</p>
      </div>
    </main>
  );
}
